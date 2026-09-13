import React, { useState } from 'react';

/**
 * ShopDoorIntro — full-screen exterior shop scene.
 * Click / press the door to trigger the 3D swing open and reveal the app interior.
 * Mirrors the whisker-and-wag.html exterior scene exactly.
 */
export default function ShopDoorIntro({ onEnter }) {
  const [phase, setPhase] = useState('idle'); // idle → opening → hidden

  const handleEnter = () => {
    if (phase !== 'idle') return;
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
      onClick={handleEnter}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        overflow: 'hidden',
        perspective: '1400px',
        cursor: 'default',
        opacity: phase === 'opening' ? 0 : 1,
        visibility: phase === 'opening' ? 'hidden' : 'visible',
        transition: 'opacity 0.9s ease, visibility 0.9s ease',
      }}
    >
      {/* ── Sky ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #F2A65A 0%, #FCE2B0 55%, #F7D8A0 100%)',
      }} />

      {/* ── Sun ── */}
      <div style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 120, borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 35%, #FFE9BD, #F6B25E 70%)',
        boxShadow: '0 0 60px 20px rgba(255,206,120,.5)',
      }} />

      {/* ── Clouds ── */}
      <div style={{ position: 'absolute', width: 90, height: 26, top: '14%', left: '12%', background: '#fff', opacity: 0.75, borderRadius: 100, filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', width: 70, height: 20, top: '20%', left: '70%', background: '#fff', opacity: 0.75, borderRadius: 100, filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', width: 50, height: 16, top: '12%', left: '55%', background: '#fff', opacity: 0.55, borderRadius: 100, filter: 'blur(1px)' }} />

      {/* ── Birds ── */}
      <div style={{ position: 'absolute', top: '18%', left: '30%', fontSize: 14, color: '#2B1E14', opacity: 0.5 }}>〰</div>
      <div style={{ position: 'absolute', top: '22%', left: '34%', fontSize: 14, color: '#2B1E14', opacity: 0.5 }}>〰</div>

      {/* ── Street Lamps ── */}
      {['8%', 'calc(100% - 8% - 8px)'].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: '14%', left: i === 0 ? pos : 'auto', right: i === 1 ? '8%' : 'auto',
          width: 8, height: '16%',
          background: 'linear-gradient(180deg, #3a3a3a, #1e1e1e)',
        }}>
          <div style={{
            position: 'absolute', top: -22, left: -11,
            width: 30, height: 26, background: '#2b2b2b',
            borderRadius: '6px 6px 2px 2px',
            boxShadow: '0 0 20px 6px rgba(255,220,140,.55)',
          }} />
        </div>
      ))}

      {/* ── Ground (cobblestone pavement) ── */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '14%',
        background: 'repeating-linear-gradient(90deg, #B9AE93 0 60px, #AFA386 60px 62px)',
      }} />

      {/* ── Brick Building ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: '12%', width: 'min(760px, 92vw)', height: '62%',
        background: 'repeating-linear-gradient(0deg, #8B5A42 0 18px, #6E4433 18px 20px), #8B5A42',
        borderRadius: '6px 6px 0 0',
        boxShadow: '0 30px 60px rgba(0,0,0,.35)',
      }} />

      {/* ── Roofline ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 'calc(12% + 62% - 4px)', width: 'min(800px, 96vw)', height: 22,
        background: '#23402E', borderRadius: 3, boxShadow: '0 4px 0 #1A3022',
      }} />

      {/* ── Awning ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 'calc(12% + 62% - 26px)', width: 'min(560px, 78vw)', height: 56,
        background: 'repeating-linear-gradient(90deg, #A63D2F 0 28px, #FBF3E1 28px 56px)',
        clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0% 100%)',
        boxShadow: '0 8px 14px rgba(0,0,0,.25)',
      }} />
      {/* Awning scallop */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 'calc(12% + 62% - 38px)', width: 'min(560px, 78vw)', height: 14,
        backgroundImage: 'radial-gradient(circle at 50% 0, #A63D2F 0 7px, transparent 7px)',
        backgroundSize: '28px 14px', backgroundRepeat: 'repeat-x',
      }} />

      {/* ── Hanging Sign ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: '7.5%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5,
        opacity: phase === 'opening' ? 0 : 1, transition: 'opacity 0.4s ease',
      }}>
        <div style={{ width: 2, height: 26, background: '#9A7526' }} />
        <div style={{
          marginTop: 2, background: '#FBF3E1', border: '4px solid #7C5028',
          padding: '10px 26px', borderRadius: 4, boxShadow: '0 10px 18px rgba(0,0,0,.3)',
          transform: 'rotate(-1.4deg)',
        }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(18px,3.5vw,30px)', color: '#832E23', fontFamily: 'Kalam, cursive', whiteSpace: 'nowrap' }}>
            PetCare — Paws &amp; Pals
          </h1>
          <p style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '.04em', color: '#23402E', textAlign: 'center' }}>
            SERVICES · GROOMING · FOOD · VET · SUPPLIES
          </p>
        </div>
      </div>

      {/* ── Left Window ── */}
      <div style={{
        position: 'absolute', bottom: 'calc(12% + 8%)',
        left: 'calc(50% - 300px)', width: 130, height: 150,
        background: 'linear-gradient(180deg, #DCEEF0, #BFE0E3)',
        border: '10px solid #7C5028', borderRadius: 8,
        boxShadow: 'inset 0 0 0 3px #C68F52, 0 6px 14px rgba(0,0,0,.25)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 6, background: '#C68F52', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 6, background: '#C68F52', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, height: '60%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 6, fontSize: 28 }}>
          🐾 <span>🦴</span>
        </div>
      </div>

      {/* ── Right Window ── */}
      <div style={{
        position: 'absolute', bottom: 'calc(12% + 8%)',
        right: 'calc(50% - 300px)', width: 130, height: 150,
        background: 'linear-gradient(180deg, #DCEEF0, #BFE0E3)',
        border: '10px solid #7C5028', borderRadius: 8,
        boxShadow: 'inset 0 0 0 3px #C68F52, 0 6px 14px rgba(0,0,0,.25)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 6, background: '#C68F52', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 6, background: '#C68F52', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, height: '60%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 6, fontSize: 28 }}>
          🐟 <span>🧸</span>
        </div>
      </div>

      {/* ── Door Frame + Door ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: '12%', width: 150, height: 230,
        background: '#7C5028', borderRadius: '10px 10px 0 0',
        padding: 10, boxShadow: '0 10px 26px rgba(0,0,0,.35)',
        perspective: 1400,
      }}>
        {/* The Door itself */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Open the shop door and enter"
          onClick={(e) => { e.stopPropagation(); handleEnter(); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEnter(); } }}
          style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(120deg, #C68F52, #A9713B 55%, #7C5028)',
            borderRadius: '6px 6px 0 0',
            position: 'relative',
            cursor: 'pointer',
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            transform: phase === 'opening' ? 'rotateY(-108deg)' : 'rotateY(0deg)',
            transition: 'transform 1.1s cubic-bezier(.6,-0.1,.35,1.2)',
            boxShadow: 'inset 0 0 0 6px #7C5028',
          }}
        >
          {/* OPEN sign */}
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: '#FBF3E1', color: '#832E23',
            fontFamily: 'Kalam, cursive', fontSize: 11, fontWeight: 700,
            padding: '3px 6px', borderRadius: 3, transform: 'rotate(4deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,.25)',
          }}>OPEN</div>

          {/* Top panel */}
          <div style={{
            position: 'absolute', left: '14%', right: '14%', top: '10%', height: '34%',
            border: '4px solid #7C5028', borderRadius: 4,
            background: 'rgba(255,255,255,.06)',
          }} />
          {/* Bottom panel */}
          <div style={{
            position: 'absolute', left: '14%', right: '14%', bottom: '8%', height: '38%',
            border: '4px solid #7C5028', borderRadius: 4,
            background: 'rgba(255,255,255,.06)',
          }} />
          {/* Handle */}
          <div style={{
            position: 'absolute', right: 12, top: '52%',
            width: 16, height: 16, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #F3D98B, #C89B3C 60%, #9A7526)',
            boxShadow: '0 2px 4px rgba(0,0,0,.4)',
          }} />

          {/* Door glow (warm light from inside) */}
          <div style={{
            position: 'absolute', inset: 10,
            background: 'radial-gradient(circle, rgba(255,235,180,.9), rgba(255,235,180,0) 70%)',
            opacity: phase === 'opening' ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* ── Welcome Mat ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 'calc(12% - 14px)', width: 170, height: 22,
        background: 'repeating-linear-gradient(90deg, #A63D2F 0 10px, #FBF3E1 10px 20px)',
        borderRadius: 4, boxShadow: '0 4px 8px rgba(0,0,0,.2)',
      }} />

      {/* ── Paw trail ── */}
      <div style={{
        position: 'absolute', bottom: '13%', left: '50%',
        fontSize: 16, opacity: phase === 'opening' ? 0 : 0.55,
        transition: 'opacity 0.4s ease',
      }}>
        🐾&nbsp;&nbsp;🐾&nbsp;&nbsp;🐾
      </div>

      {/* ── Enter Prompt ── */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: '6%', textAlign: 'center',
        color: '#2B1E14',
        background: 'rgba(251,243,225,.9)',
        padding: '8px 18px', borderRadius: 20,
        fontWeight: 700, fontSize: 14,
        boxShadow: '0 6px 14px rgba(0,0,0,.2)',
        animation: 'door-bob 2.2s ease-in-out infinite',
        whiteSpace: 'nowrap',
        opacity: phase === 'opening' ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}>
        Push the door to come in →
      </div>

      {/* ── Bob keyframes injected via style tag ── */}
      <style>{`
        @keyframes door-bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
