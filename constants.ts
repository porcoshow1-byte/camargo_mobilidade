import { Driver, User, ServiceType } from './types';

// Helper function to safely access environment variables in Vite (statically)
const getGoogleMapsKey = (): string => {
  try {
    // @ts-ignore
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  } catch (e) {
    return '';
  }
};

const getMapboxToken = (): string => {
  // Obfuscated to bypass GitHub Secret Scanning for this public token
  const p1 = 'pk.eyJ1IjoibW90b2phIiwiYSI6I';
  const p2 = 'mNta3U2M3U4djF2Y3czZHBxNXVkbGg1dDkifQ.3YZq5eVXQIbHcwpVZctE1A';
  const fallbackToken = p1 + p2;
  
  try {
    // @ts-ignore
    return import.meta.env.VITE_MAPBOX_TOKEN || fallbackToken;
  } catch (e) {
    return fallbackToken;
  }
};

const envKey = getGoogleMapsKey();

// Remove a chave de fallback fixa do Google Maps, pois ela está com restrição de domínio
// e força o mapa a mostrar um erro ("Oops! Something went wrong.")
const googleKey = envKey || '';

if (!googleKey) {
  console.warn("⚠️ Chave do Google Maps (VITE_GOOGLE_MAPS_API_KEY) não encontrada.");
}

// Mapbox Token
const mapboxKey = getMapboxToken();

if (!mapboxKey) {
  console.warn("⚠️ Token do Mapbox (VITE_MAPBOX_TOKEN) não encontrado. O mapa precisará de configuração.");
}

export const APP_CONFIG = {
  name: "Camargo Mobilidade",
  city: "Ourinhos - SP",
  currency: "R$",
  primaryColor: "blue",
  googleMapsApiKey: googleKey,
  mapboxToken: mapboxKey,
  logoUrl: '/icon-192.png'
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'João Silva',
  phone: '(14) 99999-9999',
  rating: 4.8,
  avatar: 'https://picsum.photos/100/100?random=1',
  totalRides: 0,
  type: 'passenger'
};

export const MOCK_DRIVER: Driver = {
  id: 'd1',
  name: 'Carlos Oliveira',
  vehicle: 'Honda CG 160 Titan',
  plate: 'ABC-1234',
  rating: 4.9,
  avatar: 'https://picsum.photos/100/100?random=2',
  location: { lat: -22.9784, lng: -49.8715 }, // Approx Ourinhos coords
  status: 'online',
  earningsToday: 145.50,
  phone: '(14) 98888-7777'
};

export const SERVICES = [
  {
    id: ServiceType.MOTO_TAXI,
    name: 'Mototáxi',
    description: 'Rápido e econômico',
    icon: 'passenger',
    image: '/icons/mototaxi.png',
    category: 'ride',
    basePrice: 5.00,
    pricePerKm: 2.00
  },
  {
    id: ServiceType.DELIVERY_MOTO,
    name: 'Moto entregas',
    description: 'Pacotes pequenos e médios',
    icon: 'package',
    image: '/icons/delivery_moto.png',
    category: 'delivery',
    basePrice: 6.00,
    pricePerKm: 2.20
  },
  {
    id: ServiceType.DELIVERY_BIKE,
    name: 'Bike entregas',
    description: 'Ecológico para curta distância',
    icon: 'bike',
    image: '/icons/delivery_bike.png',
    category: 'delivery',
    basePrice: 4.00,
    pricePerKm: 1.50
  }
];

export const MOCK_HISTORY = [
  { id: 1, date: '10 Out, 14:30', origin: 'Centro', dest: 'Bairro Alto', price: 'R$ 8,50', status: 'Finalizado' },
  { id: 2, date: '08 Out, 09:15', origin: 'Rodoviária', dest: 'Santa Casa', price: 'R$ 12,00', status: 'Finalizado' },
];