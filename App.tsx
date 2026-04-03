import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import CameraScreen from './components/CameraScreen';
import CategorySelectionScreen from './components/CategorySelectionScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultScreen from './components/ResultScreen';
import { AppScreen, ScanMode, ScanResult } from './types';
import { generateUpgrade } from './services/geminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LANDING);
  const [mode, setMode] = useState<ScanMode>(ScanMode.ROOM);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleStart = (selectedMode: ScanMode) => {
    setMode(selectedMode);
    setCapturedImage(null);
    setSelectedCategory('');
    setResult(null);
    setCurrentScreen(AppScreen.CAMERA);
  };

  // STEP 1: Capture Image -> Go to Category Selection
  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setCurrentScreen(AppScreen.CATEGORY_SELECTION);
  };

  // STEP 2: Select Category -> Start Processing
  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setCurrentScreen(AppScreen.PROCESSING);
    
    if (capturedImage) {
        await processImage(capturedImage, mode, category);
    }
  };

  // Shared Processing Logic
  const processImage = async (image: string, scanMode: ScanMode, category: string) => {
    // Simulate minimum loading time for the animation experience
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 3000));
    
    // Call Gemini Image Generation API with Category
    const generationPromise = generateUpgrade(image, scanMode, category);
    
    try {
      const [_, upgradeData] = await Promise.all([minLoadTime, generationPromise]);
      
      setResult({
        originalImage: image,
        generatedImage: upgradeData.generatedImage,
        mode: scanMode,
        product: upgradeData.product,
        selectedCategory: category
      });
      
      setCurrentScreen(AppScreen.RESULT);
    } catch (error) {
      console.error("Analysis failed", error);
      // Even on failure, generateUpgrade returns fallback data
      setCurrentScreen(AppScreen.CAMERA);
    }
  };

  // STEP 3: Regenerate (Same Image, Same Category, New Variation)
  const handleRegenerate = async () => {
    if (capturedImage && selectedCategory) {
        setCurrentScreen(AppScreen.PROCESSING);
        await processImage(capturedImage, mode, selectedCategory);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCapturedImage(null);
    setSelectedCategory('');
    setCurrentScreen(AppScreen.LANDING);
  };

  const handleBackToLanding = () => {
    setCurrentScreen(AppScreen.LANDING);
  };
  
  const handleRetake = () => {
      setCapturedImage(null);
      setCurrentScreen(AppScreen.CAMERA);
  };

  return (
    <main className="w-full h-[100dvh] bg-black text-white overflow-hidden relative">
      {currentScreen === AppScreen.LANDING && (
        <LandingScreen onStart={handleStart} />
      )}
      
      {currentScreen === AppScreen.CAMERA && (
        <CameraScreen 
          mode={mode} 
          onCapture={handleCapture} 
          onBack={handleBackToLanding} 
        />
      )}

      {currentScreen === AppScreen.CATEGORY_SELECTION && capturedImage && (
        <CategorySelectionScreen 
            image={capturedImage}
            mode={mode}
            onSelectCategory={handleCategorySelect}
            onRetake={handleRetake}
        />
      )}
      
      {currentScreen === AppScreen.PROCESSING && (
        <ProcessingScreen />
      )}
      
      {currentScreen === AppScreen.RESULT && result && (
        <ResultScreen 
            result={result} 
            onReset={handleReset} 
            onRegenerate={handleRegenerate}
        />
      )}
    </main>
  );
};

export default App;