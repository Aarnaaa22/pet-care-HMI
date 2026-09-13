# PetCare React Frontend Shell (Vite + Tailwind CSS)

Production-ready, fully responsive frontend shell for the **PetCare ("Paws & Pals")** application built using **React 18 (Vite)** and **Tailwind CSS**.

This repository provides a canonical, reusable layout system and component library that adapts dynamically across **Mobile (375x812)**, **Tablet (768x1024)**, **Desktop (1440x900)**, and Large Desktop viewports without layout rework.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm / yarn / pnpm

### Installation & Running Locally

```bash
# 1. Navigate to project root
cd C:\Users\nevaa\.gemini\antigravity-ide\scratch\pet-care-react-app

# 2. Install dependencies
npm install

# 3. Start local Vite development server
npm run dev
```

Open `http://localhost:5173` in your web browser.

---

## 🎨 Theme Tokens & Tailwind Configuration

File: [`tailwind.config.js`](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/tailwind.config.js)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        pet: {
          green: '#7BD389',
          'green-light': '#EBF8EE',
          'green-dark': '#5BB369',
          pink: '#F7C6D7',
          'pink-soft': '#FFF0F5',
          'pink-dark': '#FF85A1',
          lavender: '#9D72FF',
          blue: '#4EA8DE',
          dark: '#2A2F2B',
          muted: '#8E9890',
          bg: '#FAF9F6',
        }
      },
      borderRadius: {
        'card': '24px',
        'pill': '100px',
      }
    },
  },
  plugins: [],
}
```

---

## 📱 Responsive Layout Rules & Behavior

1. **Global Container ([Container.jsx](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/components/Container.jsx))**:
   - Centered container with responsive horizontal padding (`px-4 sm:px-6 lg:px-8 max-w-7xl`).

2. **Header Navigation ([Header.jsx](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/components/Header.jsx))**:
   - **Desktop (`lg: 1024px+`)**: Topbar with logo left, search input center, pet switcher & nav links right.
   - **Tablet (`md: 768px`)**: Search remains visible, nav drawer toggle.
   - **Mobile (`sm: <640px`)**: Search expandable toggle, hamburger drawer menu, and fixed bottom sticky navigation bar.

3. **Page Layout & Columns ([ServicesPage.jsx](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/pages/ServicesPage.jsx))**:
   - **Desktop (`lg`)**: 2/3 column for Services Grid + 1/3 column for Persistent Interactive Map (`MapPanel`).
   - **Tablet (`md`)**: Split or stacked view (`md:grid-cols-2`).
   - **Mobile (`sm`)**: Single column stack + Map Bottom Sheet modal toggle (`BottomSheet`).

4. **Responsive Card Grids ([ResponsiveGrid.jsx](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/components/ResponsiveGrid.jsx))**:
   - 1 column on Mobile (`sm:grid-cols-1`).
   - 2 columns on Tablet (`md:grid-cols-2`).
   - 3 columns on Desktop (`lg:grid-cols-3`).

5. **Modals & Bottom Sheets ([BookingModal.jsx](file:///C:/Users/nevaa/.gemini/antigravity-ide/scratch/pet-care-react-app/src/components/BookingModal.jsx))**:
   - **Desktop (`lg`)**: Centered modal with backdrop blur overlay, ESC key listener, and keyboard focus trap.
   - **Mobile (`sm`)**: Full-width slide-up bottom sheet with grab handle.

6. **Tap Targets & Accessibility**:
   - All interactive touch targets are minimum **44×44 px** (`min-h-[44px] min-w-[44px]`).
   - Focus outline indicators (`focus-visible:ring-2 focus-visible:ring-[#7BD389]`).
   - ARIA roles (`role="dialog"`, `aria-label`, `aria-expanded`).

---

## 📁 Repository Structure

```
pet-care-react-app/
├── public/
│   ├── mockups/
│   │   ├── services_mobile_375x812.png
│   │   ├── services_tablet_768x1024.png
│   │   ├── services_desktop_1440x900.png
│   │   └── feeding_mobile_375x812.png
│   └── placeholders/
│       ├── icon_placeholder_vet.svg
│       ├── icon_placeholder_feeding.svg
│       ├── icon_placeholder_grooming.svg
│       ├── icon_placeholder_store.svg
│       └── icon_placeholder_emergency.svg
├── src/
│   ├── components/
│   │   ├── Container.jsx
│   │   ├── ResponsiveGrid.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── MapPanel.jsx
│   │   ├── BookingModal.jsx
│   │   ├── BottomSheet.jsx
│   │   ├── FAQAccordion.jsx
│   │   ├── ChatWidget.jsx
│   │   └── ResponsiveDemoTester.jsx
│   ├── pages/
│   │   ├── ServicesPage.jsx
│   │   ├── FeedingPage.jsx
│   │   ├── ActivityPage.jsx
│   │   ├── HealthPage.jsx
│   │   └── GroomingPage.jsx
│   ├── mockData.js
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🖼️ Swapping Placeholder Assets & Per-Screen Integration

When adding new high-fidelity assets or screen mockups:
1. Place SVG/PNG icons inside `public/placeholders/` or `src/assets/`.
2. In components like `ServiceCard.jsx` or `ServicesPage.jsx`, swap placeholder references:
   ```jsx
   // Replace placeholder SVG name:
   <img src="/placeholders/icon_placeholder_vet.svg" alt="Vet Icon" className="w-10 h-10" />
   ```
3. Drop screen mockup exports in `public/mockups/`.

---

## ♿ Accessibility & Responsive Testing Checklist

- [x] Tested at 375px (Mobile portrait)
- [x] Tested at 768px (Tablet portrait)
- [x] Tested at 1024px & 1440px (Desktop wide)
- [x] Keyboard focus visible across all buttons & inputs
- [x] ESC key closes modals & bottom sheets
- [x] Minimum 44x44px touch targets enforced
- [x] ARIA attributes (`aria-modal`, `aria-label`, `aria-expanded`) verified
