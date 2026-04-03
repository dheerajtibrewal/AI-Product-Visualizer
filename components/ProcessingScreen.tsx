import React, { useEffect, useState } from 'react';
import { AI_LENS_SVG, BRAND_LOGO } from '../constants';

const STEPS = [
  "Analyzing Environment...",
  "Identifying Surfaces...",
  "Accessing Inventory...",
  "Calculating Lighting & Shadows...",
  "Applying AI Enhancements...",
  "Rendering Your Upgrade..."
];

const ProcessingScreen: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Fixed Logo Position Top Left */}
      <div 
        className="absolute top-0 left-0 right-0 px-6 z-20"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
      >
         <div className="w-40 h-auto" dangerouslySetInnerHTML={{ __html: BRAND_LOGO }} />
      </div>

      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center z-10 w-full max-w-md px-6">
        
        {/* Central Spinner */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
          {/* Tech Rings */}
          <div className="absolute inset-0 border-t-2 border-red-600 rounded-full animate-spin" />
          <div className="absolute inset-3 border-r-2 border-gray-700 rounded-full animate-spin animation-delay-200 duration-[2s]" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-6 border-l-2 border-blue-600 rounded-full animate-spin duration-[3s]" />
          
          {/* Lens Center */}
          <div className="w-24 h-24 text-gray-400 opacity-50 animate-pulse">
              <div dangerouslySetInnerHTML={{ __html: AI_LENS_SVG }} />
          </div>
        </div>

        {/* Text Steps */}
        <div className="text-center w-full h-24">
          <h2 className="text-2xl font-rajdhani font-bold text-white tracking-wider animate-pulse leading-tight">
            {STEPS[stepIndex]}
          </h2>
          <div className="flex gap-1 justify-center mt-6">
             {STEPS.map((_, i) => (
               <div 
                 key={i} 
                 className={`h-1 rounded-full transition-all duration-300 ${i <= stepIndex ? 'w-8 bg-gradient-to-r from-red-600 to-blue-600' : 'w-2 bg-gray-800'}`} 
               />
             ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Branding */}
      <div 
        className="absolute bottom-0 text-gray-500 text-[10px] font-mono tracking-widest uppercase"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)' }}
      >
        AI POWERED SHOPPING EXPERIENCE
      </div>
    </div>
  );
};

export default ProcessingScreen;