import { GoogleGenAI } from "@google/genai";
import { ProductDetails, ScanMode } from "../types";

const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';

// Expanded Inventory of premium electronics
const SELFIE_PRODUCTS: ProductDetails[] = [
  {
    id: 'iphone-16-pro',
    name: 'Apple iPhone 16 Pro',
    category: 'Mobiles',
    description: 'The newest titanium powerhouse. Experience the camera control button and A18 Pro chip.',
    discount: '₹5000 Instant Cashback',
  },
  {
    id: 'samsung-z-fold6',
    name: 'Samsung Galaxy Z Fold6',
    category: 'Premium Mobile',
    description: 'Unfold your world with the lightest, most compact Galaxy Fold ever. Galaxy AI integrated.',
    discount: 'Free Galaxy Watch',
  },
  {
    id: 'dyson-airwrap',
    name: 'Dyson Airwrap Multi-styler',
    category: 'Personal Care',
    description: 'Curl, shape, smooth, and hide flyaways. With no extreme heat.',
    discount: 'Gift Edition Available',
  },
  {
    id: 'sony-xm5',
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    description: 'Industry-leading noise cancellation. Your world, uninterrupted.',
    discount: 'Best Seller',
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'Wearables',
    description: 'The most rugged and capable Apple Watch. Designed for outdoor adventure.',
    discount: 'Flat 10% OFF',
  },
  {
    id: 'bose-quietcomfort-ultra',
    name: 'Bose QuietComfort Ultra',
    category: 'Audio',
    description: 'World-class noise cancellation, quieter than ever before. Breakthrough spatial audio.',
    discount: 'New Launch',
  }
];

const ROOM_PRODUCTS: ProductDetails[] = [
  {
    id: 'sony-bravia-x90l',
    name: 'Sony Bravia XR X90L Full Array LED',
    category: 'Television',
    description: 'Rediscover the thrill of the cinema. High brightness and contrast with XR Contrast Booster.',
    discount: 'Limited Time Deal',
  },
  {
    id: 'lg-instaview-fridge',
    name: 'LG InstaView Door-in-Door Refrigerator',
    category: 'Home Appliances',
    description: 'Knock twice to see inside without opening the door. Keep food fresh for longer.',
    discount: 'Exchange Offer Available',
  },
  {
    id: 'ps5-slim',
    name: 'Sony PlayStation 5 Slim',
    category: 'Gaming',
    description: 'Play Like Never Before. Slimmer design, same immense power.',
    discount: 'Special Price Drop',
  },
  {
    id: 'samsung-soundbar-q990c',
    name: 'Samsung Q-Series Soundbar Q990C',
    category: 'Home Audio',
    description: 'Wireless Dolby Atmos. World’s first wireless Dolby Atmos connection.',
    discount: 'Combo Offer with TV',
  },
  {
    id: 'dyson-purifier-cool',
    name: 'Dyson Purifier Cool Gen1',
    category: 'Home Appliances',
    description: 'Automatically senses, captures and traps pollutants for cleaner air.',
    discount: '₹8000 OFF',
  },
  {
    id: 'ifb-washing-machine',
    name: 'IFB AI Eco Front Load Washer',
    category: 'Home Appliances',
    description: 'AI powered wash logic detects fabric type and weight for optimized washing.',
    discount: 'No Cost EMI',
  },
  {
    id: 'lg-oled-c4',
    name: 'LG OLED evo C4 55"',
    category: 'Television',
    description: 'The world’s #1 OLED TV. Advanced Alpha 9 AI Processor for supreme picture quality.',
    discount: 'Mega Deal',
  }
];

// Helper to filter products based on user selection
const filterProducts = (products: ProductDetails[], categoryGroup: string): ProductDetails[] => {
  if (!categoryGroup) return products;

  // Map UI Category Groups to Internal Categories
  switch (categoryGroup) {
    // Room Categories
    case 'Televisions':
      return products.filter(p => p.category === 'Television');
    case 'Large Appliances':
      return products.filter(p => p.category === 'Home Appliances');
    case 'Entertainment':
      return products.filter(p => p.category === 'Gaming' || p.category === 'Home Audio');
    
    // Selfie Categories
    case 'Smartphones':
      return products.filter(p => p.category === 'Mobiles' || p.category === 'Premium Mobile');
    case 'Audio & Wearables':
      return products.filter(p => p.category === 'Audio' || p.category === 'Wearables');
    case 'Personal Care':
      return products.filter(p => p.category === 'Personal Care');
      
    default:
      return products;
  }
};

// Helper to get prompt text based on product
const getPromptItem = (product: ProductDetails, mode: ScanMode): string => {
  if (mode === ScanMode.SELFIE) {
    if (product.category === 'Mobiles') return `holding a realistic ${product.name} in their hand`;
    if (product.category === 'Premium Mobile') return `holding a realistic ${product.name} in their hand`;
    if (product.category === 'Audio') return `wearing ${product.name} headphones`;
    if (product.category === 'Wearables') return `wearing a ${product.name} on their wrist`;
    if (product.category === 'Personal Care') return `holding a ${product.name} styling tool`;
    return `holding a ${product.name}`;
  } else {
    if (product.category === 'Television') return `a massive ${product.name} TV mounted on the wall`;
    if (product.category === 'Home Appliances') return `a modern ${product.name} placed naturally in the room`;
    if (product.category === 'Gaming') return `a ${product.name} console placed on a media unit`;
    if (product.category === 'Home Audio') return `a premium ${product.name} soundbar setup below the TV`;
    return `a ${product.name} placed in the room`;
  }
};

export const generateUpgrade = async (
  base64Image: string, 
  mode: ScanMode, 
  categoryGroup: string
): Promise<{ generatedImage: string, product: ProductDetails }> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 1. FRESH & GUIDED SELECTION LOGIC
  const allProducts = mode === ScanMode.ROOM ? ROOM_PRODUCTS : SELFIE_PRODUCTS;
  const filteredProducts = filterProducts(allProducts, categoryGroup);
  
  // Fallback to all products if filter is too strict (shouldn't happen with current data)
  const products = filteredProducts.length > 0 ? filteredProducts : allProducts;
  
  // Random selection from the filtered list to allow "Regenerate" to show variations within the same category
  const selectedProduct = products[Math.floor(Math.random() * products.length)];
  
  const promptItem = getPromptItem(selectedProduct, mode);

  // Clean base64 string
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

  // 2. Construct prompt for Realistic Insertion
  const prompt = `
  Task: Edit this photo to add a premium electronic product.
  
  Instructions:
  1. KEEP THE IMAGE EXACTLY AS IS. Do not change the background, the person's face, the lighting, or the room layout.
  2. ONLY add this product: ${selectedProduct.name}.
  3. Placement: The user/room features ${promptItem}.
  4. Realism: The product must cast realistic shadows and match the grain/lighting of the original photo.
  5. RESTRICTION: Do NOT add any text, logos, or watermarks to the image. Do NOT add any light leaks or color filters.
  
  Output Requirements:
  - Photorealistic.
  - Portrait orientation (9:16).
  - High fidelity to the original image structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "9:16"
        }
      }
    });

    let generatedImageBase64 = null;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          generatedImageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (!generatedImageBase64) {
      throw new Error("No image generated by Gemini.");
    }

    return {
      generatedImage: `data:image/png;base64,${generatedImageBase64}`,
      product: selectedProduct // Return the full product object including discount
    };

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    // Fallback: Return original image if generation fails
    return {
      generatedImage: base64Image, 
      product: selectedProduct
    };
  }
};