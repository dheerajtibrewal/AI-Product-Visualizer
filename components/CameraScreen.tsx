import React, { useRef, useEffect, useState } from 'react';
import HUDOverlay from './HUDOverlay';
import { ScanMode } from '../types';
import { ICONS } from '../constants';

interface CameraScreenProps {
  mode: ScanMode;
  onCapture: (image: string) => void;
  onBack: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ mode, onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
    mode === ScanMode.SELFIE ? 'user' : 'environment'
  );
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // New state for confirmation preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // If we have a preview image, stop the camera to save resources
    if (previewImage) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      return;
    }

    let localStream: MediaStream | null = null;

    const startCamera = async () => {
      setCameraError(null);
      try {
        const isPortrait = window.innerHeight > window.innerWidth;
        
        // Smart constraints: Prefer portrait resolution
        const constraints = {
          video: {
            facingMode: facingMode,
            width: { ideal: isPortrait ? 1080 : 1920 },
            height: { ideal: isPortrait ? 1920 : 1080 }
          }
        };
        
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        localStream = newStream;
        setStream(newStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError("Could not access camera. Please allow permissions or upload a photo.");
      }
    };

    startCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [facingMode, previewImage]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      
      // Stop stream and show preview
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
      }
      setPreviewImage(dataUrl);
    }
  };

  const handleConfirm = () => {
    if (previewImage) {
      onCapture(previewImage);
    }
  };

  const handleRetake = () => {
    setPreviewImage(null);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    if (stream) {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities() as any; 
      if (capabilities.torch) {
        track.applyConstraints({
          advanced: [{ torch: !flashOn }] as any
        }).catch(e => console.log('Flash not supported', e));
      }
    }
  };

  // --- RENDER PREVIEW MODE (Immersive) ---
  if (previewImage) {
    return (
      <div className="relative h-[100dvh] w-full bg-black overflow-hidden">
        {/* Full Screen Preview Image */}
        <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

        {/* Top Header */}
        <div 
            className="absolute top-0 left-0 right-0 px-6 flex justify-between z-10"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
        >
             <button 
                onClick={handleRetake}
                className="px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white text-sm font-bold hover:bg-black/60 transition-colors shadow-lg"
             >
                Retake
             </button>
        </div>

        {/* Bottom Controls */}
        <div 
            className="absolute bottom-0 left-0 right-0 px-6 z-20 flex flex-col gap-5 items-center bg-gradient-to-t from-black via-black/80 to-transparent"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)', paddingTop: '40px' }}
        >
           <h2 className="text-white font-rajdhani font-bold text-2xl tracking-wide drop-shadow-md">
             Use this photo?
           </h2>
           <div className="w-full max-w-sm flex gap-4">
              <button 
                onClick={handleRetake}
                className="flex-1 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold border border-white/10 active:scale-95 transition-all hover:bg-white/20 shadow-lg"
              >
                Discard
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold shadow-lg shadow-red-900/40 active:scale-95 transition-all flex items-center justify-center gap-2 hover:brightness-110"
              >
                <span>Continue</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- RENDER CAMERA MODE ---
  return (
    <div className="relative h-[100dvh] w-full bg-black flex flex-col overflow-hidden">
      {/* Top Bar - Minimal */}
      <div 
        className="absolute top-0 left-0 right-0 z-50 px-6 flex justify-between items-start"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
      >
        <div /> 
        
        {/* Controls (Back & Flash) */}
        <div className="flex gap-4 items-center">
            <button onClick={toggleFlash} className="text-white p-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 active:scale-95 transition-transform hover:bg-black/50 shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: flashOn ? ICONS.flashOn : ICONS.flashOff }} className="w-6 h-6" />
            </button>
            <button onClick={onBack} className="text-white p-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 active:scale-95 transition-transform hover:bg-black/50 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-black">
        {!cameraError ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
            <p className="mb-4 text-red-500">{cameraError}</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-red-600 px-6 py-3 rounded-full font-bold"
            >
              Upload Photo Instead
            </button>
          </div>
        )}
        <HUDOverlay mode={mode} />
      </div>

      {/* Controls Container - Gradient for legibility */}
      <div 
        className="absolute bottom-0 left-0 right-0 px-8 bg-gradient-to-t from-black via-black/60 to-transparent z-50"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)', paddingTop: '60px' }}
      >
        <div className="flex justify-between items-center max-w-md mx-auto px-4">
          {/* Gallery Button */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 active:scale-90 transition-transform hover:bg-white/20 shadow-lg"
          >
             <div dangerouslySetInnerHTML={{ __html: ICONS.image }} className="w-6 h-6 text-white/90" />
             <input 
               type="file" 
               accept="image/*" 
               ref={fileInputRef} 
               onChange={handleFileUpload} 
               className="hidden" 
             />
          </button>

          {/* Capture Button - Larger */}
          <button 
            onClick={captureFrame}
            className="w-20 h-20 rounded-full border-[3px] border-white flex items-center justify-center relative animate-pulse-border active:scale-90 transition-transform shadow-[0_0_20px_rgba(227,30,36,0.3)]"
          >
            <div className="w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-inner" />
          </button>

          {/* Swap Camera */}
          <button 
            onClick={toggleCamera}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 active:scale-90 transition-transform hover:bg-white/20 shadow-lg"
          >
            <div dangerouslySetInnerHTML={{ __html: ICONS.cameraSwap }} className="w-6 h-6 text-white/90" />
          </button>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraScreen;