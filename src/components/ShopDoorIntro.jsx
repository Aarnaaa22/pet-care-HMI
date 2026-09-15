import React, { useState, useEffect, useRef } from 'react';
import PetHeroAnimation from './PetHeroAnimation';

/**
 * ShopDoorIntro — full-screen exterior shop scene with a Sign In form on the right.
 * Submitting the form triggers the 3D swing open and reveals the app interior.
 */
export default function ShopDoorIntro({ onEnter }) {
  const [phase, setPhase] = useState('idle'); // idle → opening → hidden
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const scrollRef = useRef(null);

  useEffect(() => {
    // If mobile, wait briefly then scroll down to the sign-in form
    if (window.innerWidth < 768) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (phase !== 'idle') return;
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }
    
    // If on mobile and scrolled down, scroll back up first
    if (window.innerWidth < 768 && scrollRef.current && scrollRef.current.scrollTop > 0) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => triggerOpen(), 600); // wait for scroll to finish
    } else {
      triggerOpen();
    }
  };

  const triggerOpen = () => {
    setPhase('opening');
    setTimeout(() => {
      setPhase('hidden');
      onEnter();
    }, 1050);
  };

  if (phase === 'hidden') return null;

  return (
    <div
      id="shop-exterior"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        overflow: 'hidden',
        cursor: 'default',
        opacity: phase === 'opening' ? 0 : 1,
        visibility: phase === 'opening' ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease 0.6s, visibility 0.5s ease 0.6s',
      }}
    >
      {/* ── Fixed Full-Screen Background ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        {/* Sky */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F2A65A 0%, #FCE2B0 55%, #F7D8A0 100%)' }} />
        {/* Sun */}
        <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #FFE9BD, #F6B25E 70%)', boxShadow: '0 0 60px 20px rgba(255,206,120,.5)' }} />
        {/* Clouds */}
        <div style={{ position: 'absolute', width: 90, height: 26, top: '14%', left: '12%', background: '#fff', opacity: 0.75, borderRadius: 100, filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', width: 70, height: 20, top: '20%', left: '70%', background: '#fff', opacity: 0.75, borderRadius: 100, filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', width: 50, height: 16, top: '12%', left: '55%', background: '#fff', opacity: 0.55, borderRadius: 100, filter: 'blur(1px)' }} />
        {/* Birds */}
        <div style={{ position: 'absolute', top: '18%', left: '30%', fontSize: 14, color: '#2B1E14', opacity: 0.5 }}>〰</div>
        <div style={{ position: 'absolute', top: '22%', left: '34%', fontSize: 14, color: '#2B1E14', opacity: 0.5 }}>〰</div>
        
        {/* Street Lamps (Left only) */}
        {['8%'].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', bottom: '14%', left: pos, width: 8, height: '16%', background: 'linear-gradient(180deg, #3a3a3a, #1e1e1e)' }}>
            <div style={{ position: 'absolute', top: -22, left: -11, width: 30, height: 26, background: '#2b2b2b', borderRadius: '6px 6px 2px 2px', boxShadow: '0 0 20px 6px rgba(255,220,140,.55)' }} />
          </div>
        ))}
        {/* Ground */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '14%', background: 'repeating-linear-gradient(90deg, #B9AE93 0 60px, #AFA386 60px 62px)' }} />
      </div>

      {/* ── Scrolling Container ── */}
      <div 
        ref={scrollRef}
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}
      >
        {/* ── Two Column Layout (On Top of Background) ── */}
        <div className="flex flex-col md:flex-row min-h-full" style={{ position: 'relative' }}>
          
          {/* ── Left Half: Shop Building ── */}
          <div 
            className="h-[100dvh] md:h-auto w-full md:w-[60%] flex-shrink-0"
            style={{ 
            position: 'relative', 
          perspective: '1400px',
          transform: phase === 'opening' ? 'translateX(calc(50vw - 50%)) scale(1.05)' : 'translateX(0) scale(1)',
          transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          
          {/* Brick Building */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '12%', width: 'min(760px, 92%)', height: '62%', background: 'repeating-linear-gradient(0deg, #8B5A42 0 18px, #6E4433 18px 20px), #8B5A42', borderRadius: '6px 6px 0 0', boxShadow: '0 30px 60px rgba(0,0,0,.35)' }} />

          {/* Roofline */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 'calc(12% + 62% - 4px)', width: 'min(800px, 96%)', height: 22, background: '#23402E', borderRadius: 3, boxShadow: '0 4px 0 #1A3022' }} />

          {/* Awning */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 'calc(12% + 62% - 26px)', width: 'min(560px, 78%)', height: 56, background: 'repeating-linear-gradient(90deg, #A63D2F 0 28px, #FBF3E1 28px 56px)', clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0% 100%)', boxShadow: '0 8px 14px rgba(0,0,0,.25)' }} />
          {/* Awning scallop */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 'calc(12% + 62% - 38px)', width: 'min(560px, 78%)', height: 14, backgroundImage: 'radial-gradient(circle at 50% 0, #A63D2F 0 7px, transparent 7px)', backgroundSize: '28px 14px', backgroundRepeat: 'repeat-x' }} />

          {/* Hanging Sign */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '7.5%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, opacity: phase === 'opening' ? 0 : 1, transition: 'opacity 0.4s ease' }}>
            <div style={{ width: 2, height: 26, background: '#9A7526' }} />
            <div style={{ marginTop: 2, background: '#FBF3E1', border: '4px solid #7C5028', padding: '10px 26px', borderRadius: 4, boxShadow: '0 10px 18px rgba(0,0,0,.3)', transform: 'rotate(-1.4deg)' }}>
              <h1 style={{ margin: 0, fontSize: 'clamp(18px,2.5vw,26px)', color: '#832E23', fontFamily: 'Kalam, cursive', whiteSpace: 'nowrap' }}>
                PetCare — Paws &amp; Pals
              </h1>
              <p style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '.04em', color: '#23402E', textAlign: 'center' }}>
                SERVICES · GROOMING · FOOD · VET
              </p>
            </div>
          </div>

          {/* Left Window */}
          <div style={{ position: 'absolute', bottom: 'calc(12% + 8%)', right: 'calc(50% + 85px)', width: 'clamp(50px, 12vw, 110px)', height: 'clamp(70px, 18vw, 130px)', background: 'linear-gradient(180deg, #DCEEF0, #BFE0E3)', border: 'clamp(4px, 1vw, 8px) solid #7C5028', borderRadius: 8, boxShadow: 'inset 0 0 0 3px #C68F52, 0 6px 14px rgba(0,0,0,.25)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, background: '#C68F52', transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, background: '#C68F52', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, height: '60%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', fontSize: 'clamp(14px, 2.5vw, 24px)' }}>🐾 <span>🦴</span></div>
          </div>

          {/* Right Window */}
          <div style={{ position: 'absolute', bottom: 'calc(12% + 8%)', left: 'calc(50% + 85px)', width: 'clamp(50px, 12vw, 110px)', height: 'clamp(70px, 18vw, 130px)', background: 'linear-gradient(180deg, #DCEEF0, #BFE0E3)', border: 'clamp(4px, 1vw, 8px) solid #7C5028', borderRadius: 8, boxShadow: 'inset 0 0 0 3px #C68F52, 0 6px 14px rgba(0,0,0,.25)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, background: '#C68F52', transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, background: '#C68F52', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, height: '60%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', fontSize: 'clamp(14px, 2.5vw, 24px)' }}>🐟 <span>🧸</span></div>
          </div>

          {/* Door Frame + Door */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '12%', width: 140, height: 210, background: '#7C5028', borderRadius: '10px 10px 0 0', padding: 8, boxShadow: '0 10px 26px rgba(0,0,0,.35)', perspective: 1400, zIndex: 10 }}>
            {/* The Door */}
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(120deg, #C68F52, #A9713B 55%, #7C5028)', borderRadius: '6px 6px 0 0', position: 'relative', transformOrigin: 'left center', transformStyle: 'preserve-3d', transform: phase === 'opening' ? 'rotateY(-108deg)' : 'rotateY(0deg)', transition: 'transform 1.1s cubic-bezier(.6,-0.1,.35,1.2)', boxShadow: 'inset 0 0 0 6px #7C5028' }}>
              {/* OPEN sign */}
              <div style={{ position: 'absolute', top: 8, right: 8, background: '#FBF3E1', color: '#832E23', fontFamily: 'Kalam, cursive', fontSize: 10, fontWeight: 700, padding: '2px 5px', borderRadius: 3, transform: 'rotate(4deg)', boxShadow: '0 2px 4px rgba(0,0,0,.25)' }}>OPEN</div>
              {/* Top panel */}
              <div style={{ position: 'absolute', left: '14%', right: '14%', top: '10%', height: '34%', border: '4px solid #7C5028', borderRadius: 4, background: 'rgba(255,255,255,.06)' }} />
              {/* Bottom panel */}
              <div style={{ position: 'absolute', left: '14%', right: '14%', bottom: '8%', height: '38%', border: '4px solid #7C5028', borderRadius: 4, background: 'rgba(255,255,255,.06)' }} />
              {/* Handle */}
              <div style={{ position: 'absolute', right: 10, top: '52%', width: 14, height: 14, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #F3D98B, #C89B3C 60%, #9A7526)', boxShadow: '0 2px 4px rgba(0,0,0,.4)' }} />
              {/* Door glow */}
              <div style={{ position: 'absolute', inset: 8, background: 'radial-gradient(circle, rgba(255,235,180,.9), rgba(255,235,180,0) 70%)', opacity: phase === 'opening' ? 1 : 0, transition: 'opacity 0.6s ease 0.3s', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Welcome Mat */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 'calc(12% - 14px)', width: 160, height: 20, background: 'repeating-linear-gradient(90deg, #A63D2F 0 10px, #FBF3E1 10px 20px)', borderRadius: 4, boxShadow: '0 4px 8px rgba(0,0,0,.2)', zIndex: 12 }} />

          {/* ── Foreground Animals Running Loop ── */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: '2%', zIndex: 20, pointerEvents: 'none' }}>
            <PetHeroAnimation doorOpening={phase === 'opening'} lazyLoad={true} />
          </div>

          {/* Paw trail */}
          <div style={{ position: 'absolute', bottom: '13%', left: '50%', fontSize: 14, opacity: phase === 'opening' ? 0 : 0.55, transition: 'opacity 0.4s ease', zIndex: 11 }}>🐾&nbsp;&nbsp;🐾&nbsp;&nbsp;🐾</div>
        </div>

        {/* ── Right Half: Sign In Form ── */}
        <div 
          className="h-[100dvh] md:h-auto w-full md:w-[40%] flex-shrink-0 flex items-center justify-center"
          style={{ 
            position: 'relative',
            paddingRight: '2vw',
            transform: phase === 'opening' ? 'translateX(100%)' : 'translateX(0)',
            opacity: phase === 'opening' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease'
          }}
        >
          {/* subtle glow behind the form for pop */}
          <div style={{ position: 'absolute', inset: '10%', background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

          <div style={{
            position: 'relative',
            background: 'var(--paper)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,.25), 0 0 0 4px rgba(255,255,255,0.3)',
            width: '90%', 
            maxWidth: '380px',
            border: '2px solid var(--wood)',
            zIndex: 10
          }}>
            <h2 style={{ fontFamily: 'Kalam, cursive', fontSize: '32px', color: 'var(--awning-dark)', textAlign: 'center', margin: '0 0 8px 0' }}>
              Welcome Back!
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--ink)', marginBottom: '32px', fontSize: '15px', opacity: 0.8 }}>
              Please sign in to enter the shop.
            </p>
            
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--pine-dark)', marginBottom: '8px' }}>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="paws@example.com"
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '8px', 
                    border: '1px solid #d1c8b8', background: '#fff', color: 'var(--ink)',
                    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                    fontSize: '15px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--awning)'}
                  onBlur={(e) => e.target.style.borderColor = '#d1c8b8'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--pine-dark)', marginBottom: '8px' }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '8px', 
                    border: '1px solid #d1c8b8', background: '#fff', color: 'var(--ink)',
                    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                    fontSize: '15px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--awning)'}
                  onBlur={(e) => e.target.style.borderColor = '#d1c8b8'}
                />
              </div>
              <button 
                type="submit"
                style={{
                  marginTop: '12px',
                  background: 'var(--awning)',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 0 var(--awning-dark)',
                  transform: 'translateY(0)',
                  transition: 'all 0.1s',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '16px'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(4px)';
                  e.currentTarget.style.boxShadow = '0 0 0 var(--awning-dark)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 0 var(--awning-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 0 var(--awning-dark)';
                }}
              >
                Sign In &amp; Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
