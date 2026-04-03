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

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/dbb4cfaf-d821-447e-a060-4fa236105f46" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/56b3516b-6088-4d89-a1a4-7c5d90e842bc" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/6f66144f-2acf-4839-ad0b-a5dbc33dc7ed" width="250"/></td>
  </tr>
  <tr>
    <td align="center"><em>Landing Page</em></td>
    <td align="center"><em>Upload / Camera</em></td>
    <td align="center"><em>Select Your Upgrade</em></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/137d2e94-9fd0-4072-9da7-2f7a223ae10b" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/46f8eca5-ac85-4bf6-9c5a-4b340d115761" width="250"/></td>
    <td></td>
  </tr>
  <tr>
    <td align="center"><em>AI Generation</em></td>
    <td align="center"><em>Final Result + Download</em></td>
    <td></td>
  </tr>
</table>




**Built as a creative technology POC exploring AI-powered augmented commerce experiences.**
