import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Palette, Clock, Disc, Shield, Scroll, Gem, Crown, Feather, Hexagon } from 'lucide-react';
import data from '../../data.json';

export default function CountdownSection() {
  const countdownData = data.countdown;
  const targetDate = new Date(countdownData.date).getTime();

  
  const [activeStyle, setActiveStyle] = useState('rosegold'); 

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  
  const styleOptions = [
    {
      id: 'mandala',
      name: 'Mandala Sun Dial',
      icon: Disc,
      desc: 'Rotating golden mandala wheel with concentric glowing rings',
    },
    {
      id: 'flip',
      name: 'Mechanical Flip Clock',
      icon: Clock,
      desc: 'Split-flap mechanical flip animation with brass & leather trim',
    },
    {
      id: 'orbs',
      name: 'Floating Pearl Orbs',
      icon: Shield,
      desc: '3D floating glass orbs with radial glow & orbital rings',
    },
    {
      id: 'parchment',
      name: 'Parchment & Wax Seals',
      icon: Scroll,
      desc: 'Parchment scroll cards pinned with imperial wax seals',
    },
    {
      id: 'crystal',
      name: 'Crystal Prism',
      icon: Sparkles,
      desc: 'Elegant translucent crystal blocks with shimmering highlights',
    },
    {
      id: 'emerald',
      name: 'Emerald Heritage',
      icon: Gem,
      desc: 'Rich emerald green blocks with intricate gold filigree embossing',
    },
    {
      id: 'crimson',
      name: 'Crimson Hearts',
      icon: Crown,
      desc: 'Luxurious deep crimson velvet heart cards embroidered with gold threads',
    },
    {
      id: 'sapphire',
      name: 'Sapphire Peacock',
      icon: Feather,
      desc: 'Sapphire archways adorned with intricate gold filigree',
    },
    {
      id: 'ivory',
      name: 'Ivory Marble',
      icon: Hexagon,
      desc: 'Pristine white marble tiles bordered by elegant rose gold trimmings',
    },
    {
      id: 'rosegold',
      name: 'Rose Gold Celestial',
      icon: Sparkles,
      desc: 'Floating blush-pink aura cards with pulsing rose gold rings and twinkling stars',
    },
  ];

  return (
    <section id="countdown" className="py-20 px-4 bg-countdown-mobile relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 card-paper-embossed border-2 border-[#D4AF37]/80 rounded-3xl p-6 md:p-12 shadow-2xl text-center">

        
        <div className="flex flex-col items-center mb-6">
          <span className="font-rozha text-base sm:text-lg md:text-xl text-[#4A231A] tracking-wide mb-1">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </span>
        </div>

        <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide my-2">
          The Countdown
        </h2>

        
        <div className="my-10 relative">
          <AnimatePresence mode="wait">

            
            {activeStyle === 'mandala' && (
              <motion.div
                key="mandala"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative py-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto relative z-10">
                  {timeUnits.map((unit) => (
                    <motion.div
                      key={unit.label}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#FFFBF8] to-[#FFF3E0] border-2 border-[#C09A6B] shadow-xl relative overflow-hidden card-gold-glow"
                    >
                      <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#FFFBF8] shadow-inner mb-2">
                        <span className="font-cinzel-dec text-3xl md:text-4xl font-black text-[#4A231A]">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#C09A6B]">
                        {unit.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            
            {activeStyle === 'flip' && (
              <motion.div
                key="flip"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center bg-[#1C1612] border-2 border-[#D4AF37] p-5 rounded-2xl shadow-2xl relative overflow-hidden group"
                  >
                    
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#000000] z-20 shadow-xs" />
                    <div className="absolute top-1/2 left-1 right-1 h-[1px] bg-[#D4AF37]/40 z-20" />

                    <div className="relative z-10 my-1">
                      <motion.span
                        key={unit.value}
                        initial={{ rotateX: -90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="font-mono text-4xl md:text-5xl font-black text-[#FCEADE] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      >
                        {String(unit.value).padStart(2, '0')}
                      </motion.span>
                    </div>

                    <span className="font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mt-3">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'orbs' && (
              <motion.div
                key="orbs"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit, idx) => (
                  <motion.div
                    key={unit.label}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3 + idx * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex flex-col items-center justify-center w-36 h-36 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-[#FFFBF8] via-[#FFF3E0] to-[#E2C39B] border-2 border-[#D4AF37] shadow-2xl relative p-4 group"
                  >
                    
                    <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/30 animate-pulse pointer-events-none" />

                    <span className="font-cinzel-dec text-3xl md:text-4xl font-black text-[#4A231A]">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#C09A6B] mt-1">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'parchment' && (
              <motion.div
                key="parchment"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center bg-[#FFF8EE] border-2 border-[#C09A6B]/70 p-5 rounded-2xl shadow-xl relative card-paper-embossed"
                  >
                    
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gradient-to-r from-[#A81C1C] to-[#5E0808] border border-[#D4AF37] flex items-center justify-center text-[10px] text-[#FFD700] shadow-md font-serif font-bold">
                      ॐ
                    </div>

                    <span className="font-cinzel-dec text-4xl md:text-5xl font-extrabold text-[#2D473B] tracking-wider my-1">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#C09A6B] border-t border-[#C09A6B]/30 pt-2 w-full">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'crystal' && (
              <motion.div
                key="crystal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FFFBF8]/50 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_8px_32px_rgba(212,175,55,0.15)] relative overflow-hidden group hover:scale-[1.02] transition-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#D4AF37]/10 pointer-events-none" />

                    <span className="font-cinzel-dec text-4xl md:text-5xl font-black text-[#2D473B] drop-shadow-sm mb-1 relative z-10">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#C09A6B] relative z-10">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'emerald' && (
              <motion.div
                key="emerald"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#1C3325] to-[#0A1A12] border-2 border-[#D4AF37] shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform"
                  >
                    
                    <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#C09A6B]"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#C09A6B]"></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#C09A6B]"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#C09A6B]"></div>

                    <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay pointer-events-none" />

                    <span className="font-cinzel-dec text-4xl md:text-5xl font-extrabold text-[#F3E5C8] drop-shadow-md mb-1 relative z-10">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#C09A6B] relative z-10">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'crimson' && (
              <motion.div
                key="crimson"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-6 relative group hover:-translate-y-1 transition-transform w-[140px] h-[140px] md:w-[150px] md:h-[150px] mx-auto text-center"
                  >
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_10px_20px_rgba(94,8,8,0.5)] z-0" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 88.9L16.7 54.3C4.2 41.3 4.2 20.3 16.7 7.3C29.2-5.7 49-2 50 14.5C51-2 70.8-5.7 83.3 7.3C95.8 20.3 95.8 41.3 83.3 54.3L50 88.9Z" fill="url(#crimson-grad)" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="4 2" />
                      <defs>
                        <radialGradient id="crimson-grad" cx="50%" cy="30%" r="60%">
                          <stop offset="0%" stopColor="#991B1B" />
                          <stop offset="50%" stopColor="#800C0C" />
                          <stop offset="100%" stopColor="#450A0A" />
                        </radialGradient>
                      </defs>
                    </svg>

                    <span className="font-cinzel-dec text-4xl md:text-5xl font-black text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-1 relative z-10 pt-3">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#F3E5C8] relative z-10 opacity-90">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'sapphire' && (
              <motion.div
                key="sapphire"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0A192F] to-[#040C18] border-2 border-[#D4AF37] shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform rounded-t-full rounded-b-lg"
                  >
                    
                    <div className="absolute inset-1 border border-[#D4AF37]/40 rounded-t-full rounded-b-md pointer-events-none" />
                    <div className="absolute top-2 w-4 h-4 text-[#D4AF37] opacity-60 pointer-events-none">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /></svg>
                    </div>

                    <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay pointer-events-none" />

                    <span className="font-cinzel-dec text-4xl md:text-5xl font-bold text-[#F3E5C8] drop-shadow-md mb-0.5 relative z-10 pt-4">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#C09A6B] relative z-10">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'ivory' && (
              <motion.div
                key="ivory"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto py-4"
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFFFFF] via-[#FCF9F2] to-[#F3EBDA] border-[4px] border-[#D4AF37]/50 shadow-[0_12px_24px_rgba(212,175,55,0.1)] relative overflow-hidden group hover:-translate-y-1 transition-transform"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    <div className="absolute inset-2 border-2 border-[#D4AF37]/30 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                    <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay pointer-events-none" />

                    <span className="font-cinzel-dec text-4xl md:text-5xl font-black text-[#4A231A] drop-shadow-sm mb-1 relative z-10 pt-2">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#C09A6B] relative z-10">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            
            {activeStyle === 'rosegold' && (
              <motion.div
                key="rosegold"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto py-8"
              >
                {timeUnits.map((unit, idx) => (
                  <motion.div
                    key={unit.label}
                    animate={{
                      y: [0, -12, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: idx * 0.4,
                      ease: "easeInOut"
                    }}
                    className="flex flex-col items-center justify-center p-4 md:p-8 rounded-full bg-gradient-to-tr from-[#FFF2F2] via-[#FFE3E8] to-[#FFD1DA] border border-[#DE93A4]/60 shadow-[0_15px_35px_rgba(222,147,164,0.3)] relative group w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] mx-auto"
                  >
                    
                    <div className="absolute inset-0 rounded-full border-2 border-[#DE93A4] opacity-30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: `${idx * 0.5}s` }} />
                    <div className="absolute -inset-4 rounded-full border border-[#DE93A4] opacity-20 animate-[spin_10s_linear_infinite]" />

                    <div className="absolute inset-2 rounded-full border border-white/80 pointer-events-none" />



                    <span className="font-cinzel-dec text-3xl md:text-5xl font-black text-[#5C2E3C] drop-shadow-sm mb-1 relative z-10 pt-2 md:pt-0">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-cinzel text-[9px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#A65E6F] relative z-10">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="font-cormorant text-lg text-[#2C221E] italic max-w-lg mx-auto">
          "Counting down every moment until two families become one and celebration begins."
        </p>
      </div>
    </section>
  );
}

