# AR Product Visualizer

Camera-first AI experience for visualizing electronics in your space

---

## ✨ Features

- **Room Scan** — Visualize large appliances and electronics in your living space
- **Selfie Scan** — Visualize wearables and personal devices on yourself
- **Realistic Integration** — AI-powered product placement with lighting and shadow matching
- **Hold-to-Compare** — Quickly toggle between original and AI-enhanced views
- **One-Click Download** — Save visualized scenes directly to your device

---

## 🛠️ Tech Stack

- **React 19** + TypeScript for component architecture
- **Vite 6** for lightning-fast development and building
- **Tailwind CSS** for dark-themed HUD interface design
- **Gemini 2.5 Flash** for advanced image generation and editing
- **Custom CSS Animations** for scanning effects and interactive overlays

---

## 🎯 How It Works

1. **Select Mode** — Choose between Room Scan or Selfie Scan
2. **Capture** — Camera captures a real-time photo of your space or yourself
3. **Pick Category** — Select from available product categories
4. **AI Enhancement** — Photo is sent to generative AI for realistic product insertion
5. **View & Download** — Review the enhanced scene and save if satisfied

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. Clone the repository and navigate to the project:
   ```bash
   npm install
   ```

2. Set up your API key:
   - Create a `.env.local` file in the project root
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`
   - Allow camera permissions when prompted

---

## 📸 Screenshots

<!-- Add demo screenshots here -->

---

**Built as a creative technology POC exploring AI-powered augmented commerce experiences.**
