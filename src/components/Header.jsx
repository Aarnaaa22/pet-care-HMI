import React, { useState, useEffect } from 'react';
import Container from './Container';

export default function Header({ activeRoute, onNavigate, searchQuery, onSearchChange, activePet, onPetChange, pets }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services', label: 'Services', icon: '🩺' },
    { id: 'feeding', label: 'Feeding', icon: '🥣' },
    { id: 'activity', label: 'Activity', icon: '🐾' },
    { id: 'health', label: 'Health', icon: '🩺' },
    { id: 'grooming', label: 'Grooming', icon: '🛁' },
    { id: 'checkout', label: 'Checkout', icon: '🛒' },
  ];

  return (
    <>
      {/* Top Sticky Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft-md border-b border-[#EBF8EE]'
            : 'bg-[#FAF9F6] border-b border-transparent'
        }`}
      >
        <Container classNames="">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('services')}>
              <div className="w-10 h-10 rounded-xl bg-[#EBF8EE] text-[#7BD389] flex items-center justify-center text-xl shadow-soft-sm font-extrabold">
                🐾
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#4EA8DE] to-[#7BD389] bg-clip-text text-transparent hidden sm:inline-block">
                PetCare <span className="text-xs text-[#8E9890] font-semibold block">Paws & Pals</span>
              </span>
            </div>

            {/* Desktop & Tablet Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
              <span className="absolute left-3 text-[#8E9890]">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search vets, groomers, supplies, foods..."
                className="w-full pl-9 pr-4 py-2.5 rounded-pill bg-white border border-[#DCEBE0] text-sm font-medium focus:outline-none focus:border-[#7BD389] focus:ring-2 focus:ring-[#7BD389]/30 transition"
              />
            </div>

            {/* Pet Switcher & Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Pet Selector */}
              <div className="relative">
                <select
                  value={activePet.id}
                  onChange={(e) => onPetChange(e.target.value)}
                  className="appearance-none bg-white border border-[#DCEBE0] rounded-pill px-4 py-2 pr-8 text-xs font-bold text-[#2A2F2B] shadow-soft-sm focus:outline-none cursor-pointer"
                >
                  <option value="luna">🐱 Luna (Ragdoll)</option>
                  <option value="milo">🐶 Milo (Golden)</option>
                  <option value="coco">🐰 Coco (Lop)</option>
                </select>
                <span className="absolute right-3 top-2.5 text-xs text-[#8E9890] pointer-events-none">▼</span>
              </div>

              {/* Nav Links */}
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3.5 py-2 rounded-pill text-sm font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                      activeRoute === link.id
                        ? 'bg-[#EBF8EE] text-[#7BD389] shadow-soft-sm'
                        : 'text-[#525C54] hover:text-[#7BD389] hover:bg-white'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tablet/Mobile Action Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="w-10 h-10 rounded-xl bg-white border border-[#DCEBE0] flex items-center justify-center text-base min-h-[44px] min-w-[44px]"
                aria-label="Toggle Search"
              >
                🔍
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-white border border-[#DCEBE0] flex items-center justify-center text-xl min-h-[44px] min-w-[44px]"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>

          </div>

          {/* Expandable Search Input for Mobile */}
          {mobileSearchOpen && (
            <div className="md:hidden py-3 border-t border-[#DCEBE0]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search vets, groomers, supplies..."
                className="w-full px-4 py-2.5 rounded-pill bg-white border border-[#DCEBE0] text-sm font-medium focus:outline-none focus:border-[#7BD389]"
                autoFocus
              />
            </div>
          )}
        </Container>

        {/* Mobile Hamburger Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#DCEBE0] px-4 py-4 space-y-3 shadow-soft-lg animate-fadeIn">
            {/* Pet Switcher for Mobile Drawer */}
            <div className="pb-3 border-b border-[#DCEBE0]">
              <label className="text-xs font-bold text-[#8E9890] block mb-1">Active Pet</label>
              <select
                value={activePet.id}
                onChange={(e) => {
                  onPetChange(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#FAF9F6] border border-[#DCEBE0] rounded-xl px-3 py-2 text-sm font-bold text-[#2A2F2B]"
              >
                <option value="luna">🐱 Luna (Ragdoll Cat)</option>
                <option value="milo">🐶 Milo (Golden Puppy)</option>
                <option value="coco">🐰 Coco (Lop Bunny)</option>
              </select>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-extrabold text-sm flex items-center justify-between ${
                    activeRoute === link.id
                      ? 'bg-[#EBF8EE] text-[#7BD389]'
                      : 'text-[#525C54] hover:bg-[#FAF9F6]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </span>
                  <span>→</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCEBE0] px-2 py-1.5 flex items-center justify-around shadow-soft-lg">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`flex flex-col items-center gap-0.5 min-w-[56px] min-h-[44px] justify-center rounded-xl transition ${
              activeRoute === link.id ? 'text-[#7BD389] font-extrabold' : 'text-[#8E9890]'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-[10px]">{link.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
