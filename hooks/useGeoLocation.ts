import { useState, useEffect, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const DEFAULT_LOCATION = { lat: -23.5505, lng: -46.6333 }; // São Paulo (Fallback)
const MAX_WAIT_TIME = 5000; // 5 seconds max wait

export const useGeoLocation = () => {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0); // Trigger re-run

  // Ref to track if we already resolved the initial loading state
  const resolvedRef = useRef(false);
  const watcherIdRef = useRef<string | null>(null);

  const retry = () => {
    setLoading(true);
    setError(null);
    resolvedRef.current = false;
    setRetryCount(prev => prev + 1);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startLocationTracking = async () => {
      // 1. Race Condition: Timeout vs Low Accuracy vs High Accuracy

      // Failsafe Timer: Force resolution after 5s
      timer = setTimeout(() => {
        if (!resolvedRef.current) {
          console.warn('[useGeoLocation] 🚨 Timeout (5s) triggered! Forcing DEFAULT_LOCATION.');

          // Force updates in batch
          setError('timeout');
          setLocation(DEFAULT_LOCATION);
          setLoading(false);

          resolvedRef.current = true;
        }
      }, MAX_WAIT_TIME);

      try {
        // Check Permissions
        // Check Permissions (Skip on Web if not implemented)
        try {
          const permission = await Geolocation.checkPermissions();
          if (permission.location !== 'granted') {
            const requested = await Geolocation.requestPermissions();
            if (requested.location !== 'granted') {
              throw new Error("Permissão negada");
            }
          }
        } catch (err: any) {
          // Ignore "Not implemented" on web, let the browser handle it during watchPosition
          if (err.message && err.message.includes("Not implemented")) {
            console.log("Geolocation permissions skipped (Web/Not Implemented). Proceeding...");
          } else {
            throw err;
          }
        }

        // 2. Start Watcher (Best for moving vehicles/users)
        // We use watchPosition because it keeps updating
        const id = await Geolocation.watchPosition(
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          },
          (position, err) => {
            if (position) {
              const newLoc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setLocation(newLoc);

              // If this is the first fix, resolve loading
              if (!resolvedRef.current) {
                resolvedRef.current = true;
                setLoading(false);
                clearTimeout(timer);
              }
            } else if (err) {
              console.warn('[useGeoLocation] Watcher error:', err);
              // Don't set error state here immediately as timer handles the "no location" case
            }
          }
        );
        watcherIdRef.current = id;

      } catch (err: any) {
        console.error('[useGeoLocation] Setup error:', err);
        // If we fail specifically on permissions or setup, fail fast (if not timed out yet)
        if (!resolvedRef.current) {
          setError(err.message || 'Error init location');
          setLocation(DEFAULT_LOCATION);
          setLoading(false);
          resolvedRef.current = true;
          clearTimeout(timer);
        }
      }
    };

    startLocationTracking();

    return () => {
      clearTimeout(timer);
      if (watcherIdRef.current) {
        Geolocation.clearWatch({ id: watcherIdRef.current });
      }
    };
  }, [retryCount]);

  return { location, error, loading, getCurrentLocation: retry };
};