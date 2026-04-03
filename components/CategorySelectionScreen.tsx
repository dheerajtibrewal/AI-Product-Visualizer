import React from 'react';
import { ScanMode } from '../types';
import { BRAND_LOGO } from '../constants';

interface CategorySelectionScreenProps {
  image: string;
  mode: ScanMode;
  onSelectCategory: (category: string) => void;
  onRetake: () => void;
}

const ROOM_CATEGORIES = [
  { id: 'Televisions', label: 'Smart TVs', description: 'OLED, QLED & 4K', icon: '📺' },
  { id: 'Large Appliances', label: 'Home Appliances', description: 'Fridges & Washing Machines', icon: '❄️' },
  { id: 'Entertainment', label: 'Gaming & Audio', description: 'Consoles & Soundbars', icon: '🎮' },
];

const SELFIE_CATEGORIES = [
  { id: 'Smartphones', label: 'Smartphones', description: 'Latest Flagships', icon: '📱' },
  { id: 'Audio & Wearables', label: 'Wearables', description: 'Headphones & Watches', icon: '🎧' },
  { id: 'Personal Care', label: 'Personal Care', description: 'Styling & Grooming', icon: '💇' },
];

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({ image, mode, onSelectCategory, onRetake }) => {
  const categories = mode === ScanMode.ROOM ? ROOM_CATEGORIES : SELFIE_CATEGORIES;

  return (
    <div className="h-[100dvh] w-full bg-black relative flex flex-col font-inter overflow-hidden">
      
      {/* Background Image (Darkened & Blurred) */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt="Background" className="w-full h-full object-cover blur-2xl opacity-40 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Header */}
      <div 
        className="relative z-10 px-6 flex justify-between items-center shrink-0"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
      >
        <div className="w-24 opacity-90" dangerouslySetInnerHTML={{ __html: BRAND_LOGO }} />
        <button 
            onClick={onRetake}
            className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md shadow-sm"
        >
            Retake
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center w-full max-w-md mx-auto overflow-y-auto no-scrollbar px-6 pt-6">
        
        {/* Title Section */}
        <div className="mb-8 text-center w-full">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-gray-300 text-[10px] font-bold tracking-widest uppercase">Scan Complete</span>
            </div>
            <h2 className="text-3xl font-rajdhani font-bold text-white mb-2 leading-none drop-shadow-lg">
                Select Your Upgrade
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
                Choose a category to realistically place products into your photo.
            </p>
        </div>

        {/* Cards Grid */}
        <div 
            className="w-full grid gap-4"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 60px)' }}
        >
            {categories.map((cat, idx) => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="group relative flex items-center justify-between p-1 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-red-500/50 rounded-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden shadow-lg backdrop-blur-sm"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    
                    <div className="relative flex items-center gap-5 p-4 w-full">
                        <div className="w-12 h-12 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            {cat.icon}
                        </div>
                        <div className="text-left flex-1">
                            <span className="block text-lg font-bold text-white font-rajdhani group-hover:text-red-400 transition-colors">{cat.label}</span>
                            <span className="text-[11px] text-gray-400 tracking-wide group-hover:text-gray-300">{cat.description}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-red-500 group-hover:border-red-500 group-hover:bg-red-500/10 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </button>
            ))}
        </div>

      </div>

      {/* Footer Branding */}
      <div 
        className="absolute bottom-0 left-0 right-0 text-center shrink-0 pointer-events-none z-20 bg-gradient-to-t from-black via-black/80 to-transparent"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)', paddingTop: '40px' }}
      >
      </div>
    </div>
  );
};

export default CategorySelectionScreen;