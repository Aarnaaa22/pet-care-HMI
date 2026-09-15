# PetCare React Frontend Application (Vite + React + Tailwind CSS)

Production-ready, responsive, ultra-polished application for **PetCare ("PetShop — Local Care & Supplies")** featuring a Framer Motion Landing Page, OpenStreetMap React-Leaflet integration with `react-leaflet-cluster`, multi-screen dashboards, and a Dedicated Checkout Gateway.

---
## ⚠️ Important Dependency & Markercluster Note

If a machine errors on `react-leaflet-markercluster`, **do NOT install it**; use `react-leaflet-cluster` or `supercluster` instead.

### Installed NPM Packages & Installation Command

```bash
npm install leaflet@^1.9.4 react-leaflet@^4.2.1 react-leaflet-cluster@^2.1.0 supercluster@^8.0.1 framer-motion@^13.2.0 lottie-react@^3.1.2 axios@^1.20.0 canvas-confetti@^1.6.0 --legacy-peer-deps
```

---

## 🎨 Theme Palette & Design Tokens

- **Primary Accent**: `#7BD389` (Soft Green)
- **Secondary Accent**: `#F7C6D7` (Pastel Pink)
- **Background**: `#FAF9F6` (Warm Off-White)
- **Dark Text**: `#111827` / `#2A2F2B`
- **Typography**: Inter / system sans-serif with rounded cards (`border-radius: 24px`) and soft shadows.

---

## 🗺️ React-Leaflet Map Panel & Marker Clustering (`MapPanel.jsx`)

File: [`src/components/MapPanel.jsx`](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/components/MapPanel.jsx)

- **OpenStreetMap Tiles**: Renders live OpenStreetMap tile layer (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).
- **Cluster Group**: Uses `react-leaflet-cluster` (v2.1.0) compatible with React 18 & `react-leaflet` v4.
- **Custom Paw Markers**: Custom `L.divIcon` HTML markers with soft green styling.
- **Pin Popups**: Clicking a marker reveals a mini-card popup with Book Now, Call, and Directions actions.

---

## 🐱 Silver (Silver Tabby Cat) Default Profile

- **Default Pet ID**: `silver` (Silver Tabby Cat • 2.5 yrs • 4.5 kg • Mood: Playful & Curious ✨).
- **Multi-Pet Support**: Easily switch patient profile inside [`BookingSheet.jsx`](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/components/BookingSheet.jsx) between Silver, Luna, Milo, and Coco.

---

## 🚀 Quick Start Guide

### Installation & Running Locally

```bash
# 1. Navigate to project root
cd C:\Users\nevaa\.gemini\antigravity-ide\scratch\pet-care-react-app

# 2. Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build Production Bundle

```bash
npm run build
```

---

## 📁 Repository Structure

```
pet-care-react-app/
├── public/
│   ├── assets/
│   │   └── petshop.png                <-- PetShop Storefront Illustration
│   ├── mockups/
│   │   ├── leaflet_desktop.png
│   │   ├── leaflet_mobile.png
│   │   ├── services_enhanced_desktop.png
│   │   └── landing_desktop_1440x900.png
│   └── placeholders/
│       ├── icon_placeholder_vet.svg
│       └── icon_placeholder_grooming.svg
├── src/
│   ├── assets/
│   │   └── petPlaceholders.jsx        <-- Pet SVGs & Animation Placeholders
│   ├── components/
│   │   ├── MapPanel.jsx               <-- OpenStreetMap + react-leaflet-cluster
│   │   ├── ServiceCard.jsx            <-- Reusable card with 60x60 logo & verified badge
│   │   ├── FilterModal.jsx            <-- Distance slider, rating, and open now filters
│   │   ├── BookingSheet.jsx           <-- Multi-pet quick booking sheet with SMS toggle
│   │   ├── BusinessDetail.jsx         <-- Detail drawer with photo carousel & reviews filter
│   │   ├── ChatWidget.jsx             <-- Live chat popup with photo attachment simulation
│   │   ├── LandingHero.jsx            <-- Cinematic opening hero
│   │   ├── DoorPanel.jsx
│   │   ├── PetRunner.jsx
│   │   └── CloudDrifter.jsx
│   ├── pages/
│   │   ├── ServicesPage.jsx           <-- Main discovery page with emergency banner
│   │   ├── FeedingPage.jsx
│   │   ├── ActivityPage.jsx
│   │   ├── HealthPage.jsx
│   │   └── GroomingPage.jsx
│   ├── mockData.js                    <-- Silver Tabby Cat default pet & mock services
│   ├── App.jsx
│   ├── index.css                      <-- Imports leaflet/dist/leaflet.css
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ♿ Accessibility & Performance Features

- [x] Full `prefers-reduced-motion` support and manual motion toggle
- [x] GPU-accelerated Framer Motion transforms (`transform`, `opacity`)
- [x] Minimum 44×44px touch targets across all buttons and inputs
- [x] Visible focus rings (`focus:ring-2 focus:ring-[#7BD389]`)
- [x] Tested at 375px (Mobile), 768px (Tablet), and 1440px (Desktop)
