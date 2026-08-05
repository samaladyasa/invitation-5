import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Quote,
  ChevronRight,
  ChevronLeft,
  Layout,
  BookOpen,
  Grid,
  Layers,
  Sparkle,
  Bookmark,
} from 'lucide-react';
import data from '../../data.json';
import { getImageUrl } from '../../imageMap';

export default function StorySection() {
  const [styleMode, setStyleMode] = useState('manuscript'); 
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const storyData = data.story;
  const storyChapters = storyData.chapters.map((chapter) => ({
    ...chapter,
    step: chapter.chapter,
    date: chapter.year,
    quote: chapter.description,
    highlights: chapter.highlights || [],
    image: getImageUrl(chapter.imageKey),
  }));

  const designOptions = [
    { id: 'timeline', label: '1. Timeline', icon: Layers, desc: 'Alternating Zig-Zag Thread' },
    { id: 'archway', label: '2. Palace Archway', icon: BookOpen, desc: 'Interactive Storybook' },
    { id: 'manuscript', label: '3. Vintage Manuscript', icon: Bookmark, desc: 'Heritage Polaroid Cards' },
    { id: 'glass', label: '4. Emerald Glass', icon: Grid, desc: 'Modern Luxury Grid' },
  ];

  return (
    <section id="story" className="py-24 px-4 bg-story relative overflow-hidden">
      
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#C09A6B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#85B09A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 text-[#2D473B] mb-2">
            <Sparkles className="w-4 h-4 text-[#C09A6B]" />
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-bold text-[#C09A6B]">
              {storyData.tag}
            </span>
            <Sparkles className="w-4 h-4 text-[#C09A6B]" />
          </div>

          <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide">
            {storyData.headline}
          </h2>
          <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent mx-auto my-3" />
          <p className="font-cormorant text-lg md:text-xl text-[#2D473B] italic max-w-xl mx-auto">
            {storyData.subtitle}
          </p>
        </div>

        
        {styleMode === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16 md:space-y-24 relative"
          >
            
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#C09A6B] to-transparent -translate-x-1/2" />

            {storyChapters.map((chapter, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 ${isEven ? '' : 'md:flex-row-reverse'
                    }`}
                >
                  
                  <div className="w-full md:w-1/2">
                    <div className="relative p-3 card-paper-embossed border-2 border-[#C09A6B] rounded-3xl shadow-xl group overflow-hidden">
                      <div className="overflow-hidden rounded-2xl aspect-[4/3] relative">
                        <img
                          src={chapter.image}
                          alt={chapter.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="font-cinzel text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                            {chapter.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="w-full md:w-1/2 space-y-3.5 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#8B4130] text-[#FFE7D8] font-cinzel text-[10px] font-bold tracking-widest uppercase border border-[#B76F56]">
                        {chapter.step}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#F3D1BB] border border-[#B8745F]/40 text-[#4A261C] font-cinzel text-xs font-bold tracking-wider flex items-center gap-1 shadow-xs">
                        <MapPin className="w-3 h-3 text-[#B76F56]" />
                        {chapter.location}
                      </span>
                    </div>

                    <h3 className="font-cinzel-dec text-2xl md:text-3xl font-bold text-[#2D473B]">
                      {chapter.title}
                    </h3>

                    <p className="font-cormorant text-lg md:text-xl text-[#2D473B] italic font-semibold leading-snug">
                      "{chapter.quote}"
                    </p>

                    <p className="font-sans text-sm text-[#4A261C]/95 leading-relaxed">
                      {chapter.description}
                    </p>

                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                      {chapter.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] font-sans px-2.5 py-1 rounded-md bg-[#85B09A]/15 text-[#2D473B] border border-[#85B09A]/40 font-medium"
                        >
                          <Sparkle className="w-3 h-3 text-[#C09A6B]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        
        {styleMode === 'archway' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            
            <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto py-2">
              {storyChapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`px-5 py-2.5 rounded-2xl font-cinzel text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 border ${activeChapterIndex === idx
                      ? 'bg-gradient-to-r from-[#2D473B] to-[#4A231A] text-white border-[#D4AF37] shadow-xl scale-105'
                      : 'bg-[#FFFBF8] text-[#2D473B] border-[#C09A6B]/40 hover:border-[#C09A6B]'
                    }`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#C09A6B]/20 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{ch.title}</span>
                </button>
              ))}
            </div>

            
            <div className="card-paper-embossed border-2 border-[#C09A6B] rounded-3xl p-6 md:p-10 shadow-2xl bg-[#FFFBF8] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapterIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  
                  <div className="lg:col-span-6 relative">
                    <div className="relative aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#C09A6B]/80 shadow-2xl group">
                      <img
                        src={storyChapters[activeChapterIndex].image}
                        alt={storyChapters[activeChapterIndex].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                        <span className="font-cinzel text-xs text-[#D4AF37] font-bold uppercase tracking-widest">
                          {storyChapters[activeChapterIndex].location}
                        </span>
                        <h4 className="font-cinzel-dec text-2xl font-bold">
                          {storyChapters[activeChapterIndex].title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  
                  <div className="lg:col-span-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#C09A6B]/30 pb-3">
                      <span className="font-cinzel text-xs font-bold text-[#C09A6B] uppercase tracking-widest">
                        {storyChapters[activeChapterIndex].step}
                      </span>
                      <span className="font-sans text-xs font-semibold text-[#2D473B] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C09A6B]" />
                        {storyChapters[activeChapterIndex].date}
                      </span>
                    </div>

                    <div className="relative pl-6 border-l-2 border-[#C09A6B]">
                      <Quote className="w-8 h-8 text-[#C09A6B]/30 absolute -top-2 left-0 -translate-x-1/2 bg-[#FFFBF8]" />
                      <p className="font-cormorant text-2xl text-[#2D473B] italic font-semibold leading-relaxed">
                        "{storyChapters[activeChapterIndex].quote}"
                      </p>
                    </div>

                      <p className="font-sans text-sm text-[#4A261C]/85 leading-relaxed">
                      {storyChapters[activeChapterIndex].description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="font-cinzel text-xs font-bold text-[#2D473B] uppercase tracking-wider block">
                        Memorable Moments:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {storyChapters[activeChapterIndex].highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-xl bg-[#85B09A]/20 border border-[#85B09A]/50 text-[#2D473B] text-xs font-medium"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    
                    <div className="flex items-center justify-between pt-4 border-t border-[#C09A6B]/30">
                      <button
                        onClick={() =>
                          setActiveChapterIndex((prev) => (prev > 0 ? prev - 1 : storyChapters.length - 1))
                        }
                        className="px-4 py-2 rounded-full border border-[#C09A6B] text-[#2D473B] font-cinzel text-xs font-bold uppercase hover:bg-[#2D473B] hover:text-white transition-all flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button
                        onClick={() =>
                          setActiveChapterIndex((prev) => (prev < storyChapters.length - 1 ? prev + 1 : 0))
                        }
                        className="px-4 py-2 rounded-full bg-gold-gradient text-[#2D473B] font-cinzel text-xs font-bold uppercase hover:brightness-105 transition-all flex items-center gap-1 shadow-sm"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        
        {styleMode === 'manuscript' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          >
            {storyChapters.map((chapter, index) => {
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`bg-[#CE7D5D] border-2 border-[#8B4130]/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-between group card-paper-embossed hover:scale-[1.02]`}
                >
                  <div className="pt-2">
                    
                    <div className="relative p-3 pb-7 bg-gradient-to-b from-[#F3D1BB] to-[#E4AC88] border border-[#B8745F] shadow-[0_6px_16px_rgba(0,0,0,0.12)] rounded-sm mb-5 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-shadow">
                      
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#A15A3C] z-20 pointer-events-none" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#A15A3C] z-20 pointer-events-none" />
                      <div className="absolute bottom-6 left-2 w-3 h-3 border-b-2 border-l-2 border-[#A15A3C] z-20 pointer-events-none" />
                      <div className="absolute bottom-6 right-2 w-3 h-3 border-b-2 border-r-2 border-[#A15A3C] z-20 pointer-events-none" />

                      
                      <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#8B4130]/60">
                        <img
                          src={chapter.image}
                          alt={chapter.title}
                          className="w-full h-full object-cover saturate-[1.08] transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#8B4A2E]/90 backdrop-blur-md text-[#FFE7D8] border border-[#D4AF37]/60 font-cinzel text-[9px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                          <Sparkle className="w-2.5 h-2.5 text-[#D4AF37]" />
                          <span>{chapter.step}</span>
                        </div>

                        
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-xs border border-[#8C4A31]/80 bg-[#4B2B1F]/80 backdrop-blur-xs text-[#F8E2D3] font-cinzel text-[8px] tracking-widest uppercase rotate-[-6deg]">
                          VERIFIED • 2026
                        </div>
                      </div>

                      
                      <div className="pt-2 text-center">
                        <p className="font-cormorant text-sm text-[#4A231A] font-bold italic tracking-wide">
                          {chapter.location} • {chapter.date}
                        </p>
                      </div>
                    </div>

                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Bookmark className="w-3.5 h-3.5 text-[#8B4130] shrink-0" />
                        <span className="font-cinzel text-[10px] font-bold text-[#B76F56] uppercase tracking-widest">
                          {chapter.step} • SACRED MEMORY
                        </span>
                      </div>

                      <h3 className="font-cinzel-dec text-xl font-bold text-[#4A261C] tracking-wide">
                        {chapter.title}
                      </h3>

                      <div className="relative pl-3 border-l-2 border-[#8C4A31]/60 my-2">
                        <p className="font-cormorant text-base text-[#4A261C] italic font-semibold leading-snug">
                          "{chapter.quote}"
                        </p>
                      </div>

                      <p className="font-sans text-sm text-[#4A261C]/95 leading-relaxed">
                        {chapter.description}
                      </p>

                      
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {chapter.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#F4C8A2] border border-[#A45B3D]/30 text-[#4A261C] text-[10px] font-medium font-sans flex items-center gap-1"
                          >
                            <span className="text-[#8B4130]">✦</span> {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  
                  <div className="mt-5 pt-3 border-t border-dashed border-[#8C4A31]/40 flex items-center justify-between text-[11px] font-sans font-semibold text-[#4A261C]">
                    <span className="flex items-center gap-1.5 text-[10px] text-[#2D473B]/70">
                      <Calendar className="w-3.5 h-3.5 text-[#C09A6B]" />
                      {chapter.date}
                    </span>
                    <span className="font-cinzel text-[10px] text-[#C09A6B] font-bold tracking-wider">
                      FOLIO NO. 0{chapter.id}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        
        {styleMode === 'glass' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {storyChapters.map((chapter, index) => {
              const isHero = index === 0;
              return (
                <div
                  key={chapter.id}
                  className={`rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#1E332A] via-[#2D473B] to-[#1E332A] text-white border-2 border-[#D4AF37]/60 shadow-2xl flex flex-col justify-between relative overflow-hidden group ${isHero ? 'lg:col-span-12' : 'lg:col-span-6'
                    }`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className={`grid grid-cols-1 ${isHero ? 'lg:grid-cols-12' : ''} gap-6 items-center`}>
                    <div className={`${isHero ? 'lg:col-span-5' : ''}`}>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl">
                        <img
                          src={chapter.image}
                          alt={chapter.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37] text-[#2D473B] font-cinzel text-[10px] font-bold uppercase">
                          {chapter.step}
                        </span>
                      </div>
                    </div>

                    <div className={`${isHero ? 'lg:col-span-7' : ''} space-y-3`}>
                      <span className="text-[#D4AF37] font-cinzel text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {chapter.location} • {chapter.date}
                      </span>

                      <h3 className="font-cinzel-dec text-2xl md:text-3xl font-bold text-white">
                        {chapter.title}
                      </h3>

                      <p className="font-cormorant text-lg text-[#F3E5C8] italic">
                        "{chapter.quote}"
                      </p>

                      <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed">
                        {chapter.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {chapter.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-xs border border-white/20 text-white text-[11px]"
                          >
                            ✦ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
