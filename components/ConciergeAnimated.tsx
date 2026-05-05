import React, { useEffect, useState } from 'react';
import ConciergeChat from './BusinessExtras';
import { Sparkles } from 'lucide-react';

const ConfettiPiece: React.FC<{ left: number; delay: number; color: string }> = ({ left, delay, color }) => (
  <span
    style={{ left: `${left}%`, animationDelay: `${delay}ms`, background: color }}
    className="absolute w-2 h-3 rounded-sm opacity-90 animate-fall"
  />
);

const ConciergeAnimated: React.FC<{ businessName: string; businessDescription: string }> = ({ businessName, businessDescription }) => {
  const [open, setOpen] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!open) setShowConfetti(false);
  }, [open]);

  const handleUserSend = () => {
    // trigger a short confetti burst when user sends their first message
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1400);
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto ${open ? 'animate-scaleIn' : 'opacity-0'} bg-black/60 border border-white/5 rounded-2xl p-4`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
          <Sparkles size={18} className="text-gold-400 animate-bounce" />
        </div>
        <div>
          <div className="text-white font-serif text-lg">LH Concierge</div>
          <div className="text-gray-300 text-sm">Need assistance or recommendations? Our concierge can assist discreetly.</div>
        </div>
        <div className="ml-auto">
          <button onClick={() => setOpen(o => !o)} className="text-sm text-gray-300/70">{open ? 'Close' : 'Open'}</button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-black/40 p-3" style={{ minHeight: 220 }}>
        <ConciergeChat businessName={businessName} businessDescription={businessDescription} onUserSend={handleUserSend} />
      </div>

      {showConfetti && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0">
            {Array.from({ length: 18 }).map((_, i) => (
              <ConfettiPiece key={i} left={5 + i * 5} delay={i * 40} color={['#D4AF37', '#FFD700', '#F5E6A6'][i % 3]} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(220px) rotate(360deg);opacity:0} }
        .animate-fall{ animation: fall 1100ms linear forwards; }
        @keyframes scaleIn { 0%{transform:scale(.98);opacity:0} 100%{transform:scale(1);opacity:1} }
        .animate-scaleIn{ animation: scaleIn 260ms ease-out both; }
      `}</style>
    </div>
  );
};

export default ConciergeAnimated;
