import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import LuxuryButton from '../common/LuxuryButton';
import { MapPin, Navigation, Sun, Plane, ExternalLink, Sparkles, Home } from 'lucide-react';
import data from '../../data.json';

export default function VenueSection() {
  const venue = data.venue;
  const [isPinHovered, setIsPinHovered] = useState(false);
  const [isPinClicked, setIsPinClicked] = useState(false);
  const sectionRef = useRef(null);

  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'center center'],
  });
  const routePathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  const showTooltip = isPinHovered || isPinClicked;

  return (
    <section ref={sectionRef} id="venue" className="py-20 px-4 bg-venue relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C09A6B] uppercase font-bold">
            {venue.tag}
          </span>
          <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide mt-2">
            {venue.headline}
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent mx-auto my-4" />
          <p className="font-cormorant text-lg md:text-xl text-[#5C09A6B] italic max-w-xl mx-auto">
            "{venue.description}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 card-paper-embossed border-2 border-[#C09A6B] rounded-3xl p-8 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-[#4A231A] font-cinzel text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-4 h-4 text-[#C09A6B]" />
                <span>{venue.locationShort}</span>
              </div>

              <h3 className="font-cinzel-dec text-3xl font-bold text-[#4A231A] mb-4">
                {venue.venueName}
              </h3>

              <p className="font-sans text-sm text-[#5C2C1E]/90 leading-relaxed mb-6">
                {venue.venueDescription}
              </p>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#F7EFEA] border border-[#C09A6B]/40 flex items-center gap-3">
                  <Sun className="w-8 h-8 text-[#C09A6B]" />
                  <div>
                    <span className="font-cinzel text-xs font-bold text-[#4A231A] uppercase block">
                      {venue.climate.label}
                    </span>
                    <span className="font-sans text-xs text-[#5C09A6B]">
                      {venue.climate.value}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7EFEA] border border-[#C09A6B]/40 flex items-center gap-3">
                  <Plane className="w-8 h-8 text-[#C09A6B]" />
                  <div>
                    <span className="font-cinzel text-xs font-bold text-[#4A231A] uppercase block">
                      {venue.airport.label}
                    </span>
                    <span className="font-sans text-xs text-[#5C09A6B]">
                      {venue.airport.value}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C09A6B]/30 flex flex-wrap gap-4">
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
              >
                <LuxuryButton variant="gold" icon={Navigation} className="w-full">
                  Open Google Maps
                </LuxuryButton>
              </a>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 card-paper-embossed border-2 border-[#C09A6B] rounded-3xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#C09A6B]/40 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
                alt="Palace Venue"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              
              <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/45" />

              
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="routeGoldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFF3D6" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                  <filter id="glowPath" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                
                <path
                  d="M 70 420 C 110 320, 130 260, 200 230"
                  stroke="#C09A6B"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  opacity="0.4"
                  fill="none"
                />

                
                <motion.path
                  d="M 70 420 C 110 320, 130 260, 200 230"
                  stroke="url(#routeGoldGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glowPath)"
                  fill="none"
                  style={{ pathLength: routePathLength }}
                />
              </svg>

              
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-10 h-10 rounded-full bg-[#2D473B] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center text-[#D4AF37]"
                >
                  <Home className="w-5 h-5 text-[#D4AF37]" />
                </motion.div>

                <div className="bg-black/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg">
                  <span className="font-cinzel text-[10px] font-bold text-white uppercase block tracking-wider">
                    Home / UDR Airport
                  </span>
                  <span className="font-sans text-[10px] text-white block">
                    Starting Point • 22 km
                  </span>
                </div>
              </div>

              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute left-[130px] bottom-[220px] z-20 bg-[#D4AF37] p-1.5 rounded-full text-[#2D473B] shadow-[0_0_15px_#D4AF37] -rotate-45 animate-pulse"
              >
                <Plane className="w-3.5 h-3.5 text-[#2D473B] fill-[#2D473B]" />
              </motion.div>

              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 2.2, 3],
                      opacity: [0.8, 0.3, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute w-12 h-12 rounded-full bg-[#D4AF37] blur-xs pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.8, 2.4],
                      opacity: [0.9, 0.4, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: 0.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute w-10 h-10 rounded-full bg-[#C09A6B] pointer-events-none"
                  />

                  
                  <motion.button
                    onMouseEnter={() => setIsPinHovered(true)}
                    onMouseLeave={() => setIsPinHovered(false)}
                    onClick={() => setIsPinClicked(!isPinClicked)}
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#2D473B] via-[#4A231A] to-[#2D473B] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.9)] flex items-center justify-center text-[#D4AF37] cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                    aria-label="View Venue Address & Directions"
                  >
                    <MapPin className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]/30" />
                  </motion.button>
                </div>

                
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute bottom-full mb-3 w-72 bg-[#FFFBF8]/95 backdrop-blur-md border-2 border-[#C09A6B] rounded-2xl p-4 shadow-2xl text-center z-30 card-paper-embossed"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-[#C09A6B] font-cinzel text-[10px] font-bold uppercase tracking-widest mb-1">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>Wedding Location</span>
                      </div>

                      <h5 className="font-cinzel-dec text-base font-bold text-[#4A231A] mb-1">
                        {venue.venueName}
                      </h5>

                      <p className="font-sans text-xs text-[#5C09A6B]/90 leading-snug mb-3">
                        {venue.address}
                      </p>

                      <a
                        href={venue.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-full bg-gold-gradient text-[#4A231A] font-cinzel text-[11px] font-bold uppercase tracking-wider hover:brightness-105 transition-all shadow-md"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#4A231A]" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-3 h-3 text-[#4A231A]" />
                      </a>

                      
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#C09A6B]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none z-10">
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#F8E5B9] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {venue.overlayBadge || 'Heritage Residence'}
                </span>
                <h4 className="font-cinzel-dec text-2xl font-bold text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
                  {venue.overlayTitle || 'The Heritage Courtyard'}
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

