import React from 'react';
import { AI_LENS_SVG } from '../constants';

interface HUDProps {
  mode: 'ROOM' | 'SELFIE';
  isScanning?: boolean;
}

const HUDOverlay: React.FC<HUDProps> = ({ mode, isScanning = true }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Grid Overlay - Minimal Tech */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-32 left-8 w-8 h-8 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-32 right-8 w-8 h-8 border-b-2 border-r-2 border-white/30" />

      {/* Moving Scan Line - Red */}
      {isScanning && <div className="absolute left-0 right-0 h-0.5 bg-red-500/50 shadow-[0_0_15px_rgba(227,30,36,0.6)] animate-scan z-20" />}

      {/* Smart Tip */}
      <div className="absolute bottom-40 left-0 right-0 text-center">
        <p className="inline-block bg-black/60 backdrop-blur-xl text-white/90 text-[10px] px-4 py-1.5 rounded border border-white/10 font-rajdhani tracking-[0.2em] uppercase">
          {mode === 'ROOM' ? 'Align Camera with Room' : 'Align Face in Frame'}
        </p>
      </div>

      {/* Background Watermark - Lens */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
        <div dangerouslySetInnerHTML={{ __html: AI_LENS_SVG }} />
      </div>
    </div>
  );
};

export default HUDOverlay;