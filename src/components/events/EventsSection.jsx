import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { downloadIcsFile, getGoogleCalendarUrl } from '../../utils/calendar';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Shirt,
  Sparkle,
  Navigation,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  Layout,
  ListFilter,
  Sliders,
  Grid,
  Maximize2,
} from 'lucide-react';
import data from '../../data.json';

export default function EventsSection() {
  const eventDetails = data.eventDetails || {};
  const events = eventDetails.events || [];
  const sectionRef = useRef(null);
  const [activeDay, setActiveDay] = useState('all');
  const [styleMode, setStyleMode] = useState('accordion'); 
  const [expandedAccordionId, setExpandedAccordionId] = useState(null);
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(3); 

  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 85%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const filteredEvents = activeDay === 'all'
    ? events
    : events.filter((evt) => evt.day === activeDay);

  const filterTabs = [
    { id: 'all', label: 'All Celebrations', count: '5 Events' },
    { id: 'day1', label: 'Day 1 • Nov 23', count: 'Mehendi & Sangeet' },
    { id: 'day2', label: 'Day 2 • Nov 24', count: 'Haldi & Vivah' },
    { id: 'day3', label: 'Day 3 • Nov 25', count: 'Reception' },
  ];

  const designOptions = [
    { id: 'cards', label: '1. Connected Path Cards', icon: Grid, desc: 'Interactive Gold Thread Grid' },
    { id: 'accordion', label: '2. Elegant Accordion', icon: ListFilter, desc: 'Expandable Clean Journal' },
    { id: 'spotlight', label: '3. Ceremony Spotlight', icon: Maximize2, desc: 'Tabbed Stage View' },
    { id: 'bento', label: '4. Luxe Bento Grid', icon: Sliders, desc: 'High-Density Masonry' },
  ];

  return (
    <section ref={sectionRef} id="events" className="py-24 px-4 bg-events relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#85B09A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C09A6B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-8">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C09A6B] uppercase font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C09A6B]" />
            <span>{eventDetails.tag || 'Sacred Ceremonies & Itinerary'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C09A6B]" />
          </span>
          <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide mt-2">
            {eventDetails.headline || 'Wedding Celebrations'}
          </h2>
          <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent mx-auto my-3" />
          <p className="font-cormorant text-lg md:text-xl text-[#2D473B] italic max-w-xl mx-auto">
            "{eventDetails.description || 'Three days of rituals, music, and joy.'}"
          </p>
        </div>

        
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeDay === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDay(tab.id)}
                className={`px-5 py-2.5 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2D473B] to-[#4A231A] text-[#FFFBF8] border-[#D4AF37] shadow-lg scale-105'
                    : 'bg-[#FFFBF8]/90 text-[#2D473B] border-[#C09A6B]/40 hover:border-[#C09A6B] hover:bg-[#85B09A]/10'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] opacity-80 ${isActive ? 'text-[#D4AF37]' : 'text-[#85B09A]'}`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        
        {styleMode === 'cards' && (
          <div className="relative">
            
            <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 1200" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C09A6B" />
                    <stop offset="50%" stopColor="#85B09A" />
                    <stop offset="100%" stopColor="#2D473B" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 250 120 C 350 120, 650 120, 750 120 C 850 120, 850 360, 750 360 C 650 360, 350 360, 250 360"
                  stroke="url(#goldGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: smoothProgress }}
                />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
              >
                {filteredEvents.map((event, index) => {
                  const isSingleOrLast =
                    filteredEvents.length % 2 !== 0 && index === filteredEvents.length - 1;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`card-paper-embossed border-2 border-[#C09A6B]/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#C09A6B] transition-all group flex flex-col justify-between relative bg-[#F7FAF8] ${
                        isSingleOrLast ? 'md:col-span-2 md:max-w-2xl md:mx-auto w-full' : ''
                      }`}
                    >
                      
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="bg-[#2D473B]/90 backdrop-blur-md text-[#FFFBF8] border border-[#D4AF37] rounded-full px-3 py-1 text-[10px] font-cinzel font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
                            <Sparkle className="w-2.5 h-2.5 text-[#D4AF37]" />
                            <span>Ceremony {event.step}</span>
                          </span>
                          <span className="bg-[#FFFBF8]/90 backdrop-blur-md text-[#2D473B] border border-[#C09A6B]/50 rounded-full px-3 py-1 text-[10px] font-cinzel font-bold tracking-wider uppercase">
                            {event.dayLabel}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="font-cinzel text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
                            {event.date}
                          </span>
                          <h3 className="font-cinzel-dec text-2xl font-bold leading-tight text-white mt-0.5">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      
                      <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="space-y-2 mb-4 text-xs font-sans text-[#2D473B]">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#C09A6B] shrink-0" />
                              <span className="font-semibold text-[#2D473B]">{event.time}</span>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-[#C09A6B] shrink-0 mt-0.5" />
                              <span className="text-[#2D473B]/90 font-medium">{event.venue}</span>
                              <a
                                href={event.mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-auto text-[#C09A6B] hover:text-[#2D473B] transition-colors p-1"
                                title="Open Map"
                              >
                                <Navigation className="w-3.5 h-3.5" />
                              </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#C09A6B]/20">
                              <Shirt className="w-4 h-4 text-[#C09A6B] shrink-0" />
                              <span className="font-semibold text-[#2D473B]">
                                Dress Code:{' '}
                              <span className="font-normal text-[#2D473B]/90">{event.dressCode}</span>
                              </span>
                              <div className="flex items-center gap-1.5 ml-auto">
                                {event.dressColors.map((col, i) => (
                                  <span
                                    key={i}
                                    title={col.name}
                                    className="block w-4 h-4 rounded-full border border-black/10 shadow-xs"
                                    style={{ backgroundColor: col.hex }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

<p className="font-cormorant text-base text-[#2D473B] italic mb-4 leading-relaxed">
                            "{event.description}"
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {(event.highlights || []).map((item, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2.5 py-1 rounded-md bg-[#85B09A]/15 border border-[#85B09A]/40 text-[#2D473B]"
                              >
                                <CheckCircle2 className="w-3 h-3 text-[#C09A6B]" />
                                <span>{item}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        
                        <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[#C09A6B]/30 mt-auto">
                          <button
                            onClick={() =>
                              downloadIcsFile({
                                title: event.title,
                                description: event.description,
                                location: event.venue,
                                startDate: event.startDate,
                                endDate: event.endDate,
                              })
                            }
                            className="flex-1 py-2.5 px-3 rounded-full bg-[#FFFBF8] border border-[#C09A6B] font-cinzel text-[11px] font-bold text-[#2D473B] hover:bg-[#2D473B] hover:text-white transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <Calendar className="w-3.5 h-3.5 text-[#C09A6B]" />
                            <span>Download .ICS</span>
                          </button>

                          <a
                            href={getGoogleCalendarUrl({
                              title: event.title,
                              description: event.description,
                              location: event.venue,
                              startDate: event.startDate,
                              endDate: event.endDate,
                            })}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2.5 px-4 rounded-full bg-gold-gradient text-[#2D473B] font-cinzel text-[11px] font-bold uppercase tracking-wider hover:brightness-105 transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#2D473B]" />
                            <span>Google Cal</span>
                            <ExternalLink className="w-3 h-3 text-[#2D473B]" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        
        {styleMode === 'accordion' && (
          <div className="space-y-5 max-w-5xl mx-auto">
            {filteredEvents.map((event) => {
              const isExpanded = expandedAccordionId === event.id;

              return (
                <div
                  key={event.id}
                  className={`bg-[#FFFDF9] rounded-3xl overflow-hidden transition-all duration-300 card-paper-embossed relative group ${
                    isExpanded
                      ? 'border-2 border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-[0_16px_40px_rgba(212,175,55,0.18)]'
                      : 'border-2 border-[#C09A6B]/40 hover:border-[#D4AF37] shadow-lg hover:shadow-xl'
                  }`}
                >
                  
                  <button
                    onClick={() => setExpandedAccordionId(isExpanded ? null : event.id)}
                    className="w-full p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between text-left gap-4 bg-gradient-to-r from-[#FFFDF9] via-[#FDFBF5] to-[#FFFDF9] cursor-pointer"
                  >
                    <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-cinzel text-[10px] font-bold text-[#D4AF37] bg-[#2D473B] px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-[#D4AF37]/50 shadow-xs">
                            {event.dayLabel}
                          </span>
                          <span className="font-sans text-xs font-semibold text-[#2D473B]/80 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#C09A6B]" />
                            {event.time}
                          </span>
                          {event.id === 'wedding' && (
                            <span className="font-cinzel text-[9px] font-bold text-[#2D473B] bg-gold-gradient px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                              ✦ MAIN CEREMONY
                            </span>
                          )}
                        </div>

                        <h3 className="font-cinzel-dec text-xl md:text-2xl font-bold text-[#2D473B] tracking-wide">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#C09A6B]/20">
                      
                      <div className="text-left md:text-right space-y-1">
                        <span className="font-sans text-xs text-[#2D473B] font-semibold flex items-center md:justify-end gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C09A6B]" />
                          {event.venue.split(',')[0]}
                        </span>
                        
                        <div className="flex items-center md:justify-end gap-1.5">
                          <span className="font-sans text-[10px] text-[#2D473B]/60">Dress Code:</span>
                          <div className="flex items-center gap-1">
                            {event.dressColors.map((color, idx) => (
                              <span
                                key={idx}
                                className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-xs"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="hidden sm:inline font-cinzel text-[9px] font-bold uppercase tracking-[0.22em] text-[#4A231A]/70">
                          {isExpanded ? 'Hide' : 'View'}
                        </span>
                        <motion.div
                          aria-hidden="true"
                          whileTap={{ scale: 0.96 }}
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="relative h-11 w-11 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#FFFDF9] via-[#F7F1E6] to-[#F3E6C8] shadow-[0_10px_22px_rgba(45,71,59,0.12)] flex items-center justify-center text-[#2D473B] overflow-hidden group"
                        >
                          <span className="absolute inset-[1.5px] rounded-full bg-gradient-to-br from-white/70 to-transparent opacity-80" />
                          <ChevronDown className="relative w-5 h-5 text-[#2D473B] transition-transform duration-300 group-hover:text-[#4A231A]" />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="border-t border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFDF9] via-[#F9F4EE] to-[#FFFDF9] relative overflow-hidden"
                      >
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-transparent via-[#C09A6B]/8 to-transparent" />
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 md:p-8">
                          <div className="lg:col-span-5">
                            <div className="mt-4 p-4 rounded-2xl bg-[#FFFBF8] border border-[#C09A6B]/40 shadow-[0_8px_18px_rgba(45,71,59,0.05)]">
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D473B] flex items-center gap-2">
                                  <Shirt className="w-3.5 h-3.5 text-[#C09A6B]" />
                                  Dress Code
                                </span>
                                <span className="font-sans text-[11px] font-semibold text-[#C09A6B]">
                                  {event.dressCode}
                                </span>
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-[#C09A6B]/20">
                                {event.dressColors.map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F5F2] border border-[#C09A6B]/30 text-[10px] font-sans font-medium text-[#2D473B]"
                                  >
                                    <span
                                      className="w-3 h-3 rounded-full border border-black/20 shadow-xs"
                                      style={{ backgroundColor: color.hex }}
                                    />
                                    <span>{color.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          
                          <div className="lg:col-span-7 flex flex-col justify-between">
                            <div className="space-y-5">
                              <div className="rounded-[1.5rem] border border-[#C09A6B]/30 bg-[#FFFDF9] p-4 shadow-[0_10px_22px_rgba(45,71,59,0.04)]">
                                <p className="font-cormorant text-lg md:text-xl italic font-semibold text-[#2D473B] leading-relaxed">
                                  “{event.description}”
                                </p>
                              </div>

                              <div>
                                <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.22em] text-[#2D473B] block mb-3">
                                  Highlights
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {event.highlights.map((h, i) => (
                                    <span
                                      key={i}
                                      className="px-2.5 py-1 rounded-full bg-[#85B09A]/15 border border-[#85B09A]/40 text-[#2D473B] text-[10px] font-medium font-sans flex items-center gap-1.5"
                                    >
                                      <Sparkle className="w-3 h-3 text-[#C09A6B]" />
                                      {h}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-2xl border border-[#C09A6B]/30 bg-[#FFFBF8] px-4 py-3 text-sm text-[#2D473B]">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#C09A6B]" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2 text-[#2D473B]/85">
                                  <MapPin className="w-4 h-4 text-[#C09A6B]" />
                                  <span>{event.venue}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-[#C09A6B]/30">
                              <button
                                onClick={() =>
                                  downloadIcsFile({
                                    title: event.title,
                                    description: event.description,
                                    location: event.venue,
                                    startDate: event.startDate,
                                    endDate: event.endDate,
                                  })
                                }
                                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2D473B] to-[#1E332A] text-white border border-[#D4AF37] hover:brightness-110 transition-all font-cinzel text-[10px] font-bold uppercase tracking-[0.18em] shadow-md flex items-center gap-2"
                              >
                                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                                Save Calendar
                              </button>

                              <a
                                href={getGoogleCalendarUrl({
                                  title: event.title,
                                  description: event.description,
                                  location: event.venue,
                                  startDate: event.startDate,
                                  endDate: event.endDate,
                                })}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-full bg-gold-soft border border-[#C09A6B] text-[#2D473B] hover:bg-[#C09A6B]/20 transition-all font-cinzel text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5 shadow-xs"
                              >
                                Google Calendar <ExternalLink className="w-3.5 h-3.5 text-[#C09A6B]" />
                              </a>

                              <a
                                href={event.mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-full border border-[#C09A6B] text-[#2D473B] hover:bg-[#2D473B] hover:text-white transition-all font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                              >
                                Google Maps <Navigation className="w-3.5 h-3.5 text-[#C09A6B]" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        
        {styleMode === 'spotlight' && (
          <div className="space-y-8">
            
            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {events.map((evt, idx) => (
                <button
                  key={evt.id}
                  onClick={() => setActiveSpotlightIndex(idx)}
                  className={`px-4 py-2 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border whitespace-nowrap ${
                    activeSpotlightIndex === idx
                      ? 'bg-gradient-to-r from-[#2D473B] to-[#4A231A] text-white border-[#D4AF37] shadow-xl scale-105'
                      : 'bg-[#FFFBF8] text-[#2D473B] border-[#C09A6B]/40 hover:border-[#C09A6B]'
                  }`}
                >
                  <span>{evt.step}.</span>
                  <span>{evt.title.split('&')[0]}</span>
                </button>
              ))}
            </div>

            
            {(() => {
              const evt = events[activeSpotlightIndex];
              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FFFBF8] border-2 border-[#D4AF37] rounded-3xl p-6 md:p-10 shadow-2xl card-paper-embossed relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#C09A6B] shadow-xl">
                      <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white">
                        <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4 text-[#2D473B]">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#2D473B] text-white font-cinzel text-[10px] font-bold uppercase">
                          {evt.dayLabel}
                        </span>
                        <span className="font-cinzel text-xs font-bold text-[#C09A6B]">
                          {evt.date} • {evt.time}
                        </span>
                      </div>

                      <h3 className="font-cinzel-dec text-3xl font-bold text-[#2D473B]">
                        {evt.title}
                      </h3>

                      <p className="font-cormorant text-xl italic font-semibold text-[#2D473B]">
                        "{evt.description}"
                      </p>

                      <div className="space-y-1.5 text-xs font-sans">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C09A6B]" />
                          <span className="font-medium">{evt.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shirt className="w-4 h-4 text-[#C09A6B]" />
                          <span className="font-medium">Dress Code: {evt.dressCode}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() =>
                            downloadIcsFile({
                              title: evt.title,
                              description: evt.description,
                              location: evt.venue,
                              startDate: evt.startDate,
                              endDate: evt.endDate,
                            })
                          }
                          className="px-5 py-2.5 rounded-full bg-gold-gradient text-[#2D473B] font-cinzel text-xs font-bold uppercase shadow-sm"
                        >
                          Download Calendar Event
                        </button>
                        <a
                          href={evt.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-full border border-[#2D473B] text-[#2D473B] font-cinzel text-xs font-bold uppercase flex items-center gap-1"
                        >
                          Google Maps <Navigation className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}

        
        {styleMode === 'bento' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredEvents.map((evt, idx) => {
              const isLarge = idx === 3 || idx === 0; 
              const Icon = evt.icon;

              return (
                <div
                  key={evt.id}
                  className={`bg-[#FFFBF8] border-2 border-[#C09A6B]/60 rounded-3xl p-6 shadow-xl card-paper-embossed relative overflow-hidden flex flex-col justify-between ${
                    isLarge ? 'md:col-span-8' : 'md:col-span-4'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cinzel text-[10px] font-bold text-[#C09A6B] uppercase tracking-widest">
                        {evt.dayLabel}
                      </span>
                      <Icon className="w-5 h-5 text-[#2D473B]" />
                    </div>

                    <h3 className="font-cinzel-dec text-xl font-bold text-[#2D473B] mb-1">
                      {evt.title}
                    </h3>

                    <p className="font-sans text-xs text-[#2D473B]/85 mb-3">
                      {evt.time} • {evt.venue.split(',')[0]}
                    </p>

                    <p className="font-cormorant text-sm italic text-[#2D473B] mb-4">
                      "{evt.description}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#C09A6B]/30 flex items-center justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#2D473B]">{evt.dressCode.split('/')[0]}</span>
                    <button
                      onClick={() =>
                        downloadIcsFile({
                          title: evt.title,
                          description: evt.description,
                          location: evt.venue,
                          startDate: evt.startDate,
                          endDate: evt.endDate,
                        })
                      }
                      className="text-[#C09A6B] font-bold uppercase font-cinzel hover:underline"
                    >
                      + Calendar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}


