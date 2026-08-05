import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PetalsCanvas from './components/decorations/PetalsCanvas';
import CustomCursor from './components/common/CustomCursor';

import HeroSection from './components/hero/HeroSection';
import OpeningIntroModal from './components/invitation/OpeningIntroModal';
import StorySection from './components/story/StorySection';
import RevealDateSection from './components/reveal/RevealDateSection';
import CountdownSection from './components/countdown/CountdownSection';
import EventsSection from './components/events/EventsSection';
import GallerySection from './components/gallery/GallerySection';
import FamilySection from './components/family/FamilySection';
import Footer from './components/footer/Footer';

import {
  MountainDivider,
  HeroRevealDivider,
} from './components/decorations/Dividers';
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [showHeroOnly, setShowHeroOnly] = useState(false);
  const [showRestOfExperience, setShowRestOfExperience] = useState(false);

  const handleIntroComplete = () => {
    setIsIntroVisible(false);
    setShowHeroOnly(true);

    window.setTimeout(() => {
      setShowRestOfExperience(true);
    }, 1200);
  };

  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateGSAP = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGSAP);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGSAP);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative isolate min-h-screen bg-[#85B09A] text-[#2D473B] font-sans overflow-x-hidden selection:bg-[#C09A6B] selection:text-white">
      
      <PetalsCanvas count={35} />

      
      <CustomCursor />

      <OpeningIntroModal
        isVisible={isIntroVisible}
        onComplete={handleIntroComplete}
        onClose={handleIntroComplete}
      />

      {showHeroOnly && (
        <main className="relative z-10">
          <HeroSection />
        </main>
      )}

      {showRestOfExperience && (
        <>
          <main className="relative z-10">
            <HeroRevealDivider topColor="#85B09A" bottomColor="#F6EFE5" height={118} />

            <RevealDateSection />

            <MountainDivider prevColor="#F6EFE5" fillColor="#F2F4EE" height={120} variant="soft" strokeColor="rgba(255,255,255,0.75)" />

            <StorySection />

            <div
              className="relative w-full overflow-hidden leading-none"
              style={{ backgroundColor: '#F2F4EE', marginTop: 0, marginBottom: 0 }}
            >
              <svg
                className="block w-full"
                viewBox="0 0 1200 160"
                preserveAspectRatio="none"
                style={{ height: '124px', display: 'block', margin: 0 }}
                aria-hidden="true"
              >
                <path
                  d="M0,0 H1200 V26 C1096,34 1014,20 910,26 C794,32 702,12 588,22 C470,32 396,68 284,66 C168,64 88,40 0,46 Z"
                  fill="#F2F4EE"
                />
                <path
                  d="M0,34 C154,78 286,18 436,60 C590,102 696,26 850,68 C1000,108 1096,52 1200,78 L1200,160 L0,160 Z"
                  fill="#F5F3EC"
                />
                <path
                  d="M0,34 C154,78 286,18 436,60 C590,102 696,26 850,68 C1000,108 1096,52 1200,78"
                  fill="none"
                  stroke="rgba(255,255,255,0.72)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <CountdownSection />

            <MountainDivider
              prevColor="#F5F3EC"
              fillColor="#EFF4ED"
              height={96}
              variant="classic"
              strokeColor="rgba(120,150,140,0.45)"
            />

            <EventsSection />

            <div
              className="relative w-full overflow-hidden leading-none"
              style={{ backgroundColor: '#F0F5F2', marginTop: 0, marginBottom: 0 }}
            >
              <svg
                className="block w-full"
                viewBox="0 0 1200 160"
                preserveAspectRatio="none"
                style={{ height: '118px', display: 'block', margin: 0 }}
                aria-hidden="true"
              >
                <path
                  d="M0,0 H1200 V24 C1082,30 980,16 864,18 C734,20 642,8 524,12 C392,16 286,54 162,52 C102,50 52,42 0,46 Z"
                  fill="#F0F5F2"
                />
                <path
                  d="M0,34 C164,84 292,18 436,58 C582,98 716,26 874,66 C1012,100 1098,52 1200,76 L1200,160 L0,160 Z"
                  fill="#85B09A"
                />
                <path
                  d="M0,34 C164,84 292,18 436,58 C582,98 716,26 874,66 C1012,100 1098,52 1200,76"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <GallerySection />

            <MountainDivider prevColor="#85B09A" fillColor="#F0F5F2" height={110} variant="soft" strokeColor="rgba(255,255,255,0.7)" />

            <FamilySection />

            <div
              className="relative w-full overflow-hidden leading-none"
              style={{ backgroundColor: '#F0F5F2', marginTop: 0, marginBottom: 0 }}
            >
              <svg
                className="block w-full"
                viewBox="0 0 1200 160"
                preserveAspectRatio="none"
                style={{ height: '156px', display: 'block', margin: 0 }}
                aria-hidden="true"
              >
                <path
                  d="M0,0 H1200 V22 C1074,26 968,12 854,18 C726,24 632,8 506,12 C372,16 282,54 160,52 C100,50 54,40 0,42 Z"
                  fill="#F0F5F2"
                />
                <path
                  d="M0,32 C164,90 292,18 448,58 C600,96 716,24 882,64 C1014,96 1098,48 1200,82 L1200,160 L0,160 Z"
                  fill="#2D473B"
                />
                <path
                  d="M0,32 C164,90 292,18 448,58 C600,96 716,24 882,64 C1014,96 1098,48 1200,82"
                  fill="none"
                  stroke="rgba(244,235,225,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
