export enum AppScreen {
  LANDING = 'LANDING',
  CAMERA = 'CAMERA',
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
}

export enum ScanMode {
  ROOM = 'ROOM',
  SELFIE = 'SELFIE',
}

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  category: string;
  discount?: string; // Optional field for sales info
}

export interface ScanResult {
  originalImage: string;
  generatedImage: string;
  mode: ScanMode;
  product: ProductDetails;
  selectedCategory: string; // Track which category was used
}