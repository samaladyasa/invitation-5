import React, { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';


export default function ConfettiManager({
  trigger = false,
  colors = ['#DC2626', '#991B1B', '#7F1D1D', '#000000', '#18181B', '#27272A', '#D4AF37', '#EF4444', '#B91C1C'],
  particleCount = 120,
  duration = 2500,
  origin = { x: 0.5, y: 0.5 },
  preset = 'red-black',
  onComplete,
}) {
  const fireConfettiBurst = useCallback(() => {
    const selectedColors =
      preset === 'red-black'
        ? ['#DC2626', '#991B1B', '#7F1D1D', '#000000', '#18181B', '#27272A', '#D4AF37', '#EF4444', '#B91C1C']
        : colors;

    
    confetti({
      particleCount: Math.round(particleCount * 0.6),
      spread: 90,
      startVelocity: 45,
      origin: origin,
      colors: selectedColors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    
    confetti({
      particleCount: Math.round(particleCount * 0.35),
      angle: 60,
      spread: 55,
      startVelocity: 55,
      origin: { x: 0.1, y: 0.6 },
      colors: selectedColors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    
    confetti({
      particleCount: Math.round(particleCount * 0.35),
      angle: 120,
      spread: 55,
      startVelocity: 55,
      origin: { x: 0.9, y: 0.6 },
      colors: selectedColors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: Math.round(particleCount * 0.4),
        spread: 120,
        startVelocity: 35,
        origin: { x: origin.x, y: Math.max(0.2, origin.y - 0.1) },
        colors: selectedColors,
        zIndex: 9999,
        scalar: 1.2,
      });
    }, 400);

    const timer2 = setTimeout(() => {
      confetti({
        particleCount: Math.round(particleCount * 0.3),
        spread: 100,
        startVelocity: 30,
        origin: { x: origin.x, y: origin.y },
        colors: selectedColors,
        zIndex: 9999,
        scalar: 0.8,
      });

      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [colors, particleCount, duration, origin, preset, onComplete]);

  useEffect(() => {
    if (trigger) {
      fireConfettiBurst();
    }
  }, [trigger, fireConfettiBurst]);

  return null; 
}
