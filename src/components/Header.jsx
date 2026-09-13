import React, { useState, useEffect } from 'react';
import Container from './Container';

export default function Header({ activeRoute, onNavigate, searchQuery, onSearchChange, activePet, onPetChange, pets }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services',  label: 'Services',  icon: '🩺' },
    { id: 'feeding',   label: 'Feeding',   icon: '🥣' },
    { id: 'activity',  label: 'Activity',  icon: '🐾' },
    { id: 'health',    label: 'Health',    icon: '💊' },
    { id: 'grooming',  label: 'Grooming',  icon: '🛁' },
    { id: 'checkout',  label: 'Checkout',  icon: '🛒' },
  ];

  const navBase   = 'px-3.5 py-2 rounded-md text-sm font-bold transition-all min-h-[44px] flex items-center gap-1.5 border';
  const navActive = 'border-ww-brass bg-ww-brass text-ww-ink font-extrabold';
  const navIdle   = 'border-transparent text-ww-cream opacity-80 hover:opacity-100 hover:bg-white/10 hover:border-white/20';

  return (
    <>
      {/* ══ STICKY HEADER BAR ══ */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 border-b-[5px] border-ww-brass-dark ${isScrolled ? 'shadow-warm-md' : ''}`}
        style={{ backgroundColor: 'var(--pine-dark)' }}
      >
        <Container classNames="">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">

            {/* Brand */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('services')}>
              <span className="text-2xl select-none">🐾</span>
              <div className="hidden sm:block">
                <span className="font-kalam text-xl leading-none" style={{ color: 'var(--cream)' }}>PetCare</span>
                <span className="block font-nunito font-bold text-[10px] tracking-widest uppercase" style={{ color: 'var(--brass)' }}>Paws &amp; Pals</span>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center flex-1 max-w-sm mx-4 relative">
              <span className="absolute left-3 text-sm" style={{ color: 'var(--wood-light)' }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search vets, groomers, supplies…"
                className="w-full pl-9 pr-4 py-2 rounded-md text-sm font-medium focus:outline-none transition"
                style={{ backgroundColor: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(200,155,60,0.4)', color: 'var(--cream)' }}
                onFocus={e => e.target.style.borderColor = 'var(--brass)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(200,155,60,0.4)'}
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <select
                  value={activePet.id}
                  onChange={(e) => onPetChange(e.target.value)}
                  className="appearance-none rounded-md px-4 py-2 pr-8 text-xs font-bold focus:outline-none cursor-pointer border"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(200,155,60,0.4)', color: 'var(--cream)' }}
                >
                  <option value="silver">🐱 Silver (Tabby Cat)</option>
                  <option value="luna">🐱 Luna (Ragdoll)</option>
                  <option value="milo">🐶 Milo (Golden)</option>
                  <option value="coco">🐰 Coco (Lop)</option>
                </select>
                <span className="absolute right-3 top-2.5 text-xs pointer-events-none" style={{ color: 'var(--brass)' }}>▾</span>
              </div>

              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`${navBase} ${activeRoute === link.id ? navActive : navIdle}`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="w-10 h-10 rounded-md flex items-center justify-center text-base min-h-[44px] min-w-[44px] border"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(200,155,60,0.3)', color: 'var(--cream)' }}
                aria-label="Toggle Search"
              >🔍</button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-md flex items-center justify-center text-xl min-h-[44px] min-w-[44px] border"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(200,155,60,0.3)', color: 'var(--cream)' }}
                aria-label="Open Navigation Menu"
              >{mobileMenuOpen ? '✕' : '☰'}</button>
            </div>
          </div>

          {/* Mobile Search Expand */}
          {mobileSearchOpen && (
            <div className="md:hidden py-3" style={{ borderTop: '1px solid rgba(200,155,60,0.25)' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search vets, groomers, supplies…"
                className="w-full px-4 py-2.5 rounded-md text-sm font-medium focus:outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(200,155,60,0.4)', color: 'var(--cream)' }}
                autoFocus
              />
            </div>
          )}
        </Container>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-4 space-y-3 animate-fadeIn border-t" style={{ backgroundColor: 'var(--pine)', borderColor: 'rgba(200,155,60,0.25)' }}>
            <div className="pb-3" style={{ borderBottom: '1px solid rgba(200,155,60,0.25)' }}>
              <label className="text-[10px] font-bold uppercase tracking-widest block mb-1.5" style={{ color: 'var(--brass)' }}>Active Pet</label>
              <select
                value={activePet.id}
                onChange={(e) => { onPetChange(e.target.value); setMobileMenuOpen(false); }}
                className="w-full rounded-md px-3 py-2 text-sm font-bold focus:outline-none border"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(200,155,60,0.35)', color: 'var(--cream)' }}
              >
                <option value="silver">🐱 Silver (Silver Tabby Cat)</option>
                <option value="luna">🐱 Luna (Ragdoll Cat)</option>
                <option value="milo">🐶 Milo (Golden Puppy)</option>
                <option value="coco">🐰 Coco (Lop Bunny)</option>
              </select>
            </div>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-md font-bold text-sm flex items-center justify-between transition min-h-[44px]"
                  style={{
                    backgroundColor: activeRoute === link.id ? 'var(--brass)' : 'transparent',
                    color: activeRoute === link.id ? 'var(--ink)' : 'var(--cream)',
                    opacity: activeRoute === link.id ? 1 : 0.85,
                  }}
                >
                  <span className="flex items-center gap-3"><span className="text-lg">{link.icon}</span><span>{link.label}</span></span>
                  <span style={{ color: activeRoute === link.id ? 'var(--ink)' : 'var(--brass)' }}>→</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t px-2 py-1.5 flex items-center justify-around shadow-warm-lg"
        style={{ backgroundColor: 'rgba(26,48,34,0.97)', borderColor: 'rgba(200,155,60,0.3)' }}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className="flex flex-col items-center gap-0.5 min-w-[48px] min-h-[44px] justify-center rounded-md transition"
            style={{ color: activeRoute === link.id ? 'var(--brass)' : 'var(--cream)', opacity: activeRoute === link.id ? 1 : 0.6 }}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-[9px] font-bold">{link.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
