import React, { useState } from 'react';
import { ScanResult } from '../types';
import { ICONS, BRAND_LOGO } from '../constants';

interface ResultScreenProps {
  result: ScanResult;
  onReset: () => void;
  onRegenerate: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onReset, onRegenerate }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = async () => {
    // Create a temporary canvas to composite the logo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the generated image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = result.generatedImage;
    
    await new Promise((resolve) => {
        img.onload = resolve;
    });

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image
    ctx.drawImage(img, 0, 0);

    // Load the Logo SVG
    const logoImg = new Image();
    const svgBlob = new Blob([BRAND_LOGO], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    logoImg.src = url;

    await new Promise((resolve) => {
        logoImg.onload = resolve;
    });

    // Calculate logo position (Top Left ONLY)
    // Logo is 35% of image width
    const logoWidth = canvas.width * 0.35; 
    const logoHeight = (logoWidth / 220) * 50; // Aspect ratio
    const margin = canvas.width * 0.05;

    ctx.drawImage(logoImg, margin, margin, logoWidth, logoHeight);

    // Generate Filename
    const now = new Date();
    const timestamp = now.getTime();

    // Generate Download Link
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ai-vision-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleVisitWebsite = () => {
    window.open('https://www.vijaysales.com', '_blank');
  };

  return (
    <div className="h-[100dvh] w-full bg-black relative flex flex-col font-inter select-none overflow-hidden">
      
      {/* Header (Branding) */}
      <div 
        className="absolute top-0 left-0 right-0 px-6 flex items-start justify-between z-30 pointer-events-none"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
      >
         <div className="flex flex-col">
             <div className="w-40 h-auto drop-shadow-lg" dangerouslySetInnerHTML={{ __html: BRAND_LOGO }} />
         </div>
         <button onClick={onReset} className="text-gray-300 text-sm font-medium hover:text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto transition-colors">
            New Scan
         </button>
      </div>

      {/* Main Image Area */}
      <div 
        className="flex-1 relative w-full bg-gray-900 overflow-hidden"
        onMouseDown={() => setShowOriginal(true)}
        onMouseUp={() => setShowOriginal(false)}
        onTouchStart={() => setShowOriginal(true)}
        onTouchEnd={() => setShowOriginal(false)}
      >
        <img 
            src={showOriginal ? result.originalImage : result.generatedImage} 
            alt="Result" 
            className="w-full h-full object-cover"
        />
        
        {/* Hold to Compare Overlay */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none" style={{ marginTop: 'calc(env(safe-area-inset-top) + 20px)' }}>
             <div className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <div className={`w-1.5 h-1.5 rounded-full ${showOriginal ? 'bg-gray-400' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-white text-[10px] font-bold tracking-wide uppercase">
                    {showOriginal ? 'Original' : 'AI Generated'}
                </span>
             </div>
        </div>
        
        {/* Floating Regenerate Button */}
        <div 
            className="absolute right-6 z-20"
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 240px)' }}
        >
            <button 
                onClick={onRegenerate}
                className="bg-black/40 backdrop-blur-xl border border-white/20 text-white p-3 rounded-full shadow-lg hover:bg-white/20 active:scale-95 transition-all group"
                title="Regenerate Variation"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>
        </div>
      </div>

      {/* Product Details Card */}
      <div 
        className="bg-gray-900 border-t border-white/10 shrink-0 z-30"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
      >
         {/* Simplified Gradient Line (Red) */}
         <div className="h-0.5 w-full bg-gradient-to-r from-red-600 via-white to-red-600 opacity-50" />
         
         <div className="p-5">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/10 text-gray-300 rounded uppercase tracking-wider inline-block">
                            {result.product.category}
                        </span>
                        {/* Discount Highlight Tag - Red Gradient */}
                        {result.product.discount && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gradient-to-r from-red-700 to-red-600 text-white rounded uppercase tracking-wider inline-block shadow-sm">
                                {result.product.discount}
                            </span>
                        )}
                    </div>
                    <h2 className="text-lg font-bold text-white font-rajdhani leading-tight">
                        {result.product.name}
                    </h2>
                </div>
                {/* Download Button */}
                <button 
                    onClick={handleDownload}
                    className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95"
                    title="Download Image"
                >
                    <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: ICONS.download }} />
                </button>
            </div>

            <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">
                {result.product.description}
            </p>
            
            <div className="flex gap-3">
            </div>

            <div className="mt-4 flex justify-center">
                <p className="text-[10px] text-gray-600">Hold image to see original</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ResultScreen;