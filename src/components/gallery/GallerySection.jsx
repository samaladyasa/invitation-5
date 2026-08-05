import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Maximize2, Camera } from 'lucide-react';
import data from '../../data.json';
import { getImageUrl } from '../../imageMap';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  const galleryImages = data.gallery.images.map((img) => ({
    ...img,
    url: getImageUrl(img.imageKey),
    category: img.location || 'Memories',
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((cardContainer, idx) => {
        if (!cardContainer) return;
        const imgElem = cardContainer.querySelector('img');

        
        gsap.fromTo(
          cardContainer,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0.2,
            y: 40,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardContainer,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 0.6,
            },
          }
        );

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-20 px-4 bg-gallery-mobile sm:bg-gallery-desktop relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C09A6B] uppercase font-bold flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[#C09A6B]" />
            <span>{data.gallery.tag}</span>
          </span>
          <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide mt-2">
            {data.gallery.headline}
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent mx-auto my-4" />
          <p className="font-cormorant text-lg md:text-xl text-[#5C2C1E] italic max-w-xl mx-auto">
            {data.gallery.description}
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              ref={(el) => (imageRefs.current[idx] = el)}
              onClick={() => setSelectedImage(img)}
              className="card-paper-embossed border-2 border-[#C09A6B]/50 rounded-2xl p-3 shadow-lg group cursor-pointer overflow-hidden relative"
              style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="font-cinzel text-[10px] text-[#C09A6B] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#C09A6B]" />
                    <span>{img.category}</span>
                  </span>
                  <p className="font-cormorant text-lg italic text-white">
                    {img.caption}
                  </p>
                </div>
                <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full card-paper-embossed border-2 border-[#C09A6B] rounded-3xl p-4 md:p-6 shadow-2xl bg-[#FFFBF8]"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#5C2C1E] text-white hover:bg-[#4A231A] transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-[16/10] max-h-[75vh]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <span className="font-cinzel text-xs text-[#C09A6B] font-bold uppercase tracking-widest">
                  {selectedImage.category}
                </span>
                <h3 className="font-cormorant text-2xl text-[#4A231A] font-bold italic mt-1">
                  {selectedImage.caption}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

