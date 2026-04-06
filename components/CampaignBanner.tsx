import React, { useState, useEffect } from 'react';
import { CampaignBanner as CampaignBannerType } from '../services/settings';

interface CampaignBannerProps {
    campaigns: CampaignBannerType[];
    activeBannerId: string | null;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ campaigns, activeBannerId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter active campaigns
    // Rule 08: Fail Safe - Ensure we always have an array
    const activeCampaigns = campaigns?.filter(c => c.active) || [];

    // Default Banner (Fallback)
    const banners = activeCampaigns.length > 0 ? activeCampaigns : [
        {
            id: 'default-invite',
            title: 'Indique amigos e ganhe!',
            imageUrl: '',
            linkUrl: '',
            active: true,
            showCta: true,
            ctaType: 'saiba_mais'
        } as CampaignBannerType
    ];

    // Carousel Logic (Rule 02: Async/Interval)
    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="w-full h-full relative group bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {banners.map((banner, idx) => {
                const isActive = idx === currentIndex;
                // Rule 02: Performant Transitions (CSS based, not JS driven animations)
                const isVisible = isActive;

                return (
                    <div
                        key={banner.id || idx}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                    >
                        {banner.imageUrl ? (
                            <img
                                src={banner.imageUrl}
                                alt={banner.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Rule 08: Error Handling for missing images
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        ) : (
                            // Default Gradient Fallback
                            <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-600 flex flex-col items-center justify-center text-white p-4">
                                <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Mototaxi Millenio</span>
                                <h4 className="text-lg font-bold text-center mt-1">{banner.title}</h4>
                                {banner.showCta !== false && (
                                    <button className="mt-2 px-4 py-1.5 bg-white text-primary-600 rounded-full text-xs font-bold shadow-sm pointer-events-auto hover:bg-primary-50 transition-colors">
                                        Saiba mais
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Click Link Overlay */}
                        {banner.linkUrl && isVisible && (
                            <a
                                href={banner.linkUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute inset-0 z-30"
                            >
                                <span className="sr-only">{banner.title}</span>
                            </a>
                        )}

                        {/* CTA Button Layer - Custom Banner */}
                        {banner.imageUrl && banner.showCta && isVisible && (
                            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                                <button className="bg-white text-primary-600 px-6 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide transform hover:scale-105 transition-transform pointer-events-auto cursor-pointer border-2 border-white/50">
                                    {formatCtaLabel(banner.ctaType)}
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Carousel Indicators */}
            {banners.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-30 pointer-events-none">
                    {banners.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Helper for labels
function formatCtaLabel(type?: string) {
    switch (type) {
        case 'saiba_mais': return 'Saiba mais';
        case 'ligar': return 'Ligar';
        case 'whatsapp': return 'WhatsApp';
        case 'chamar_zap': return 'Chamar no zap';
        case 'zap': return 'Zap';
        case 'chama': return 'Chama';
        case 'eu_quero': return 'Eu quero!';
        case 'comprar': return 'Comprar';
        case 'pedir_agora': return 'Pedir agora';
        default: return 'Saiba mais';
    }
}
