import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import data from '../../data.json';

import LuxuryButton from '../common/LuxuryButton';
import posterImg from '../../assets/images/glossy_red_heart_1785603157999.jpg';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hero = data.hero;
  const [groom, bride] = hero.names;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 bg-hero">
      
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/xzimezus/video/upload/v1785607770/TensorPix_-_Bride_and_groom_animation_sequence_202608012052_online-video-cutter_yyyqth.mp4"
        poster={posterImg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
        className="relative z-20 max-w-4xl w-full mx-auto text-center p-6 md:p-10 my-auto"
      >
        

        <span className="font-cormorant text-xl md:text-2xl italic text-white block mb-2">
          Together with their beloved families
        </span>

        
        <div className="py-4">
          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-wider leading-none drop-shadow-sm">
            {groom}
          </h1>
          <span className="font-script text-4xl sm:text-6xl text-white my-2 block">
            &
          </span>
          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-wider leading-none drop-shadow-sm">
            {bride}
          </h1>
        </div>

        <p className="font-cormorant text-lg md:text-xl text-white italic max-w-xl mx-auto my-4">
          {hero.subtitle}
        </p>
        <span className="font-cormorant text-sm md:text-base text-white/90 uppercase tracking-[0.24em] block">
          {hero.location}
        </span>

        
            

        
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <a href="#events">
            <LuxuryButton variant="gold">
              View Celebrations
            </LuxuryButton>
          </a>
        </div>
      </motion.div>

      
    </section>
  );
}
