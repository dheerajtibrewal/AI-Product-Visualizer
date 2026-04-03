import React from 'react';
import { ScanMode } from '../types';
import { AI_LENS_SVG, BRAND_LOGO } from '../constants';

interface LandingScreenProps {
  onStart: (mode: ScanMode) => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col relative overflow-hidden">
      
      {/* Top Branding Bar */}
      <div 
        className="absolute top-0 left-0 right-0 px-6 flex justify-between items-center z-20"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
      >
         <div className="w-40 h-auto" dangerouslySetInnerHTML={{ __html: BRAND_LOGO }} />
      </div>

      {/* Background Decor - Red/Blue Tech */}
      <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-red-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-lg mx-auto">
        
        {/* Animated Centerpiece - Futuristic Lens */}
        <div className="mb-10 relative group">
            <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                 <div className="w-16 h-16 text-red-500/80 animate-spin-slow group-hover:text-red-500 transition-colors duration-700">
                    <div dangerouslySetInnerHTML={{ __html: AI_LENS_SVG }} />
                 </div>
            </div>
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse-border" />
        </div>

        <h1 className="text-5xl font-rajdhani font-bold text-white mb-4 leading-[0.9] text-center">
          Experience <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-400">
            The Future
          </span>
        </h1>
        
        {/* Badge */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-gray-300 font-medium tracking-widest text-[10px] uppercase">AI-Powered Virtual Try-On</span>
        </div>
        
        <p className="text-gray-400 mb-8 text-center text-sm leading-relaxed max-w-xs mx-auto">
          Visualize premium electronics in your own space before you buy.
        </p>

        {/* Buttons */}
        <div className="w-full space-y-4">
          <button 
            onClick={() => onStart(ScanMode.ROOM)}
            className="group relative w-full h-20 rounded-2xl overflow-hidden bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-red-500 transition-all duration-300 active:scale-95 shadow-lg"
          >
             <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-500" />
             <div className="flex items-center justify-between px-6 h-full relative z-10">
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold font-rajdhani text-white">Scan Room</span>
                  <span className="text-[10px] text-gray-400">TVs • Soundbars • Appliances</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                   </svg>
                </div>
             </div>
          </button>

          <button 
            onClick={() => onStart(ScanMode.SELFIE)}
             className="group relative w-full h-20 rounded-2xl overflow-hidden bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-blue-500 transition-all duration-300 active:scale-95 shadow-lg"
          >
             <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />
             <div className="flex items-center justify-between px-6 h-full relative z-10">
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold font-rajdhani text-white">Scan Selfie</span>
                  <span className="text-[10px] text-gray-400">iPhone • Galaxy • Headphones</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                   </svg>
                </div>
             </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="px-6 text-center z-10"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
      >
      </div>
    </div>
  );
};

export default LandingScreen;