import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const INTRO_VIDEO_URL =
  'https://res.cloudinary.com/htbk0ni0/video/upload/v1785668717/TensorPix_-_Animate_doors_opening_with_Ganesha_202608021537_online-video-cutter_n5c4e0.mp4';

export default function OpeningIntroModal({ onComplete, isVisible, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.muted = true;
    video.play().catch(() => {});
  }, [isVisible]);

  const handleVideoEnd = () => {
    if (onComplete) onComplete();
  };

  const handleClose = () => {
    if (onClose) onClose();
    else if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)', transition: { duration: 1.1, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[60] overflow-hidden bg-[#140d0b]"
        >
          <motion.div
            initial={{ opacity: 0.8, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={INTRO_VIDEO_URL}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14),_transparent_45%,_rgba(10,8,7,0.62)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#160d0b]/15 via-transparent to-[#1d120f]/55" />

          <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
