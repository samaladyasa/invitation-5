import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import glossyRedHeartImg from '../../assets/images/glossy_red_heart_1785603157999.jpg';
import ConfettiManager from '../common/ConfettiManager';
import data from '../../data.json';

export default function RevealDateSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const initialOpaquePixelsRef = useRef(0);
  const lastPointRef = useRef(null);
  const heartImageRef = useRef(null);

  const heartRevealData = data.heartReveal || {};
  const coupleNames = data.hero?.names?.join(' & ') || 'Aarav & Ananya';
  const CANVAS_WIDTH = 340;
  const CANVAS_HEIGHT = 320;

  const [heartMaskDataUrl, setHeartMaskDataUrl] = useState(null);
  const [activeFoilStyle, setActiveFoilStyle] = useState('red-heart');
  const [brushType, setBrushType] = useState('coin');
  const [isScratching, setIsScratching] = useState(false);
  const [scratchCursor, setScratchCursor] = useState({ visible: false, x: 0, y: 0 });
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [scratchParticles, setScratchParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = glossyRedHeartImg;
    img.onload = () => {
      try {
        const w = img.width;
        const h = img.height;
        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
        offCtx.drawImage(img, 0, 0);

        const imgData = offCtx.getImageData(0, 0, w, h);
        const data = imgData.data;

        const queue = [];
        for (let x = 0; x < w; x++) {
          queue.push([x, 0], [x, h - 1]);
        }
        for (let y = 0; y < h; y++) {
          queue.push([0, y], [w - 1, y]);
        }
        const visited = new Uint8Array(w * h);

        while (queue.length > 0) {
          const [x, y] = queue.pop();
          if (x < 0 || x >= w || y < 0 || y >= h) continue;
          const pixelIdx = y * w + x;
          if (visited[pixelIdx]) continue;
          visited[pixelIdx] = 1;

          const dataIdx = pixelIdx * 4;
          const r = data[dataIdx];
          const g = data[dataIdx + 1];
          const b = data[dataIdx + 2];

          const isBg = Math.abs(r - g) < 28 && Math.abs(g - b) < 28 && Math.min(r, g, b) > 160;
          if (isBg) {
            data[dataIdx + 3] = 0;
            queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
          }
        }

        offCtx.putImageData(imgData, 0, 0);

        let minX = w, minY = h, maxX = 0, maxY = 0;
        let found = false;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] > 30) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              found = true;
            }
          }
        }

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = CANVAS_WIDTH;
        finalCanvas.height = CANVAS_HEIGHT;
        const finalCtx = finalCanvas.getContext('2d', { willReadFrequently: true });

        if (found && maxX > minX && maxY > minY) {
          const heartW = maxX - minX + 1;
          const heartH = maxY - minY + 1;
          const padding = 10;
          const targetW = CANVAS_WIDTH - padding * 2;
          const targetH = CANVAS_HEIGHT - padding * 2;
          const scale = Math.min(targetW / heartW, targetH / heartH);

          const drawW = heartW * scale;
          const drawH = heartH * scale;
          const drawX = (CANVAS_WIDTH - drawW) / 2;
          const drawY = (CANVAS_HEIGHT - drawH) / 2;

          finalCtx.drawImage(offCanvas, minX, minY, heartW, heartH, drawX, drawY, drawW, drawH);
        } else {
          finalCtx.drawImage(offCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        heartImageRef.current = finalCanvas;
        setHeartMaskDataUrl(finalCanvas.toDataURL());
      } catch (err) {
        console.error(err);
        heartImageRef.current = img;
      }

      if (activeFoilStyle === 'red-heart') {
        initCanvas();
      }
    };
  }, []);

  const foilConfigs = {
    'red-heart': {
      id: 'red-heart',
      name: '1. Glossy Red Heart',
      badge: '3D Glossy Red Heart',
      gradient: ['#7F1D1D', '#DC2626', '#991B1B', '#EF4444', '#450A0A'],
      borderColor: '#D4AF37',
      particleColor: '#EF4444',
      title: 'SCRATCH RED HEART',
      subtitle: '3D Glossy Red Heart Foil',
      shape: 'heart',
      bgGlow: 'from-[#FEF2F2] via-[#FEE2E2] to-[#FECACA]',
      cardBg: 'bg-gradient-to-br from-[#FFF5F5] via-[#FEE2E2] to-[#FECACA] border-2 border-[#B91C1C]',
      textColor: '#7F1D1D',
      icon: '❤️',
      desc: '3D Glossy Red Heart scratch card. Scratch away the heart to reveal the wedding date.',
    },
    'lotus-petal': {
      id: 'lotus-petal',
      name: '2. Lotus Petal Mask',
      badge: 'Lotus Flower Mask',
      gradient: ['#E0A96D', '#FCEADE', '#C48344', '#F4D3B8', '#9B5B22'],
      borderColor: '#A85A2A',
      particleColor: '#F2A07B',
      title: 'SCRATCH PETAL MASK',
      subtitle: 'Lotus Mask Over Date',
      shape: 'lotus-petal',
      bgGlow: 'from-[#FFFAF5] via-[#FDF0E6] to-[#F7DECE]',
      cardBg: 'bg-gradient-to-br from-[#FFFBF8] via-[#FFF5EC] to-[#F2D0C2] border-2 border-[#C09A6B]',
      textColor: '#4A231A',
      icon: '🪷',
      desc: 'Scratch area acts as an organic lotus petal mask over the auspicious wedding date.',
    },
    'embossed-seal': {
      id: 'embossed-seal',
      name: '3. Embossed Wax Seal',
      badge: 'Imperial Ruby Wax',
      gradient: ['#A81C1C', '#E65C5C', '#800C0C', '#D94343', '#5E0808'],
      borderColor: '#D4AF37',
      particleColor: '#FF4D4D',
      title: 'BREAK WAX SEAL',
      subtitle: 'Embossed Seal',
      shape: 'seal',
      bgGlow: 'from-[#FFF8F8] via-[#FDE8E8] to-[#F5D0D0]',
      cardBg: 'bg-gradient-to-br from-[#FFFBF8] via-[#FDE8E8] to-[#F0C0C0] border-2 border-[#A81C1C]',
      textColor: '#5E0808',
      icon: '👑',
      desc: 'Appears as an embossed wax seal that shatters and breaks away upon scratching.',
    },
  };

  const drawHeartPath = (ctx, w, h) => {
    ctx.beginPath();
    const cx = w / 2;
    const cy = h * 0.42;
    const size = Math.min(w, h) * 0.38;

    ctx.moveTo(cx, cy + size * 1.15);
    ctx.bezierCurveTo(
      cx - size * 1.35, cy + size * 0.3,
      cx - size * 1.3, cy - size * 0.85,
      cx, cy - size * 0.35
    );
    ctx.bezierCurveTo(
      cx + size * 1.3, cy - size * 0.85,
      cx + size * 1.35, cy + size * 0.3,
      cx, cy + size * 1.15
    );
    ctx.closePath();
  };

  const drawPaperPath = (ctx, w, h) => {
    const r = 24;
    ctx.beginPath();
    ctx.moveTo(r, 12);
    ctx.lineTo(w - r, 12);
    ctx.quadraticCurveTo(w - 12, 12, w - 12, r);
    ctx.lineTo(w - 12, h - r);
    ctx.quadraticCurveTo(w - 12, h - 12, w - r, h - 12);
    ctx.lineTo(r, h - 12);
    ctx.quadraticCurveTo(12, h - 12, 12, h - r);
    ctx.lineTo(12, r);
    ctx.quadraticCurveTo(12, 12, r, 12);
    ctx.closePath();
  };

  const drawLotusPath = (ctx, w, h) => {
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.45, 0, Math.PI * 2);
    ctx.closePath();
  };

  const drawSealPath = (ctx, w, h) => {
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.44, 0, Math.PI * 2);
    ctx.closePath();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const config = foilConfigs[activeFoilStyle] || foilConfigs['red-heart'];

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();

    if (config.id === 'red-heart' && heartImageRef.current) {
      ctx.drawImage(heartImageRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else {
      ctx.save();
      if (config.shape === 'layered-paper') {
        drawPaperPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else if (config.shape === 'lotus-petal') {
        drawLotusPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else if (config.shape === 'heart') {
        drawHeartPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        drawSealPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      ctx.clip();

      const foilGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      config.gradient.forEach((color, idx) => {
        foilGrad.addColorStop(idx / (config.gradient.length - 1), color);
      });

      ctx.fillStyle = foilGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    if (config.shape === 'layered-paper') {
      ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
      for (let i = -CANVAS_WIDTH; i < CANVAS_WIDTH * 2; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 4, 0);
        ctx.lineTo(i - CANVAS_HEIGHT + 4, CANVAS_HEIGHT);
        ctx.lineTo(i - CANVAS_HEIGHT, CANVAS_HEIGHT);
        ctx.fill();
      }
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, CANVAS_WIDTH - 44, CANVAS_HEIGHT - 44);
    } else if (config.shape === 'lotus-petal') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.beginPath();
        ctx.ellipse(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2,
          65,
          110,
          angle,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    } else if (config.shape === 'seal') {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 110, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (config.id !== 'red-heart') {
      ctx.strokeStyle = config.borderColor;
      ctx.lineWidth = 4;
      if (config.shape === 'layered-paper') {
        drawPaperPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else if (config.shape === 'lotus-petal') {
        drawLotusPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else if (config.shape === 'heart') {
        drawHeartPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        drawSealPath(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      ctx.stroke();
      ctx.restore();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (config.id !== 'red-heart') {
      ctx.font = '32px sans-serif';
      ctx.fillStyle = config.shape === 'seal' ? '#FFD700' : '#4A231A';
      ctx.fillText(config.icon, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.36);
    }

    ctx.restore();
    ctx.restore();

    const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const pixels = imageData.data;
    let opaqueCount = 0;
    for (let i = 0; i < pixels.length; i += 16) {
      if (pixels[i + 3] > 10) opaqueCount++;
    }
    initialOpaquePixelsRef.current = opaqueCount || 1;

    setIsFullyRevealed(false);
    setTriggerConfetti(false);
  };

  useEffect(() => {
    initCanvas();
  }, [activeFoilStyle]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const pixels = imageData.data;
    let currentOpaqueCount = 0;

    for (let i = 0; i < pixels.length; i += 16) {
      if (pixels[i + 3] > 10) {
        currentOpaqueCount++;
      }
    }

    const cleared = Math.max(0, initialOpaquePixelsRef.current - currentOpaqueCount);
    const percent = Math.min(100, Math.round((cleared / initialOpaquePixelsRef.current) * 100));

    if (percent >= 75 && !isFullyRevealed) {
      triggerFullReveal();
    }
  };

  const triggerFullReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.restore();

    setIsFullyRevealed(true);
    setTriggerConfetti(true);

    const confettiColors = ['#DC2626', '#991B1B', '#000000', '#18181B', '#EF4444', '#27272A', '#D4AF37', '#7F1D1D'];
    const newConfetti = Array.from({ length: 65 }).map((_, i) => ({
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `confetti-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 9)}`,
      x: CANVAS_WIDTH / 2 + (Math.random() * 240 - 120),
      y: CANVAS_HEIGHT / 2 + (Math.random() * 240 - 120),
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      scale: Math.random() * 1.0 + 0.4,
      rotation: Math.random() * 360,
    }));
    setConfetti(newConfetti);
  };

  const scratchAtPoint = (x, y, prevX, prevY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = brushType === 'wand' ? 28 : brushType === 'finger' ? 22 : 16;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    if (prevX !== undefined && prevY !== undefined) {
      const distance = Math.hypot(x - prevX, y - prevY);
      const steps = Math.max(1, Math.ceil(distance / Math.max(radius * 0.5, 4)));

      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps;
        const px = prevX + (x - prevX) * t;
        const py = prevY + (y - prevY) * t;

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const currentConfig = foilConfigs[activeFoilStyle] || foilConfigs['gold-ivory'];
    setScratchParticles((prev) => [
      ...prev.slice(-20),
      {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        x,
        y,
        color: currentConfig.particleColor,
        size: Math.random() * 8 + 4,
      },
    ]);

    checkScratchPercentage();
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleStart = (e) => {
    const { x, y } = getCanvasCoordinates(e);
    setIsScratching(true);
    setScratchCursor({ visible: true, x, y });
    lastPointRef.current = { x, y };
    scratchAtPoint(x, y);
  };

  const handleMove = (e) => {
    const { x, y } = getCanvasCoordinates(e);
    setScratchCursor((prev) => ({ ...prev, visible: prev.visible || isScratching, x, y }));

    if (!isScratching) return;
    const prev = lastPointRef.current || { x, y };
    scratchAtPoint(x, y, prev.x, prev.y);
    lastPointRef.current = { x, y };
  };

  const handleEnd = () => {
    setIsScratching(false);
    setScratchCursor((prev) => ({ ...prev, visible: false }));
    lastPointRef.current = null;
  };

  const activeConfig = foilConfigs[activeFoilStyle] || foilConfigs['gold-ivory'];

  return (
    <section id="reveal-date" className="py-20 px-4 bg-reveal-date relative overflow-hidden">
      <ConfettiManager
        trigger={triggerConfetti}
        preset="red-black"
        particleCount={140}
        onComplete={() => setTriggerConfetti(false)}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C09A6B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C09A6B] uppercase font-bold">
            {heartRevealData.tag || 'The Heart of Our Celebration'}
          </span>
          <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide mt-2">
            {heartRevealData.headline || 'Scratch To Reveal Date'}
          </h2>
          <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent mx-auto my-3" />
        </div>



        <div className="flex flex-col items-center justify-center">
          <div
            ref={containerRef}
            className={`relative w-[340px] h-[320px] my-2 select-none touch-none transition-transform duration-300 hover:scale-[1.02] ${activeConfig.id === 'red-heart'
                ? 'filter drop-shadow-[0_0_12px_rgba(212,175,55,0.7)] drop-shadow-[0_10px_20px_rgba(127,29,29,0.35)]'
                : 'filter drop-shadow-2xl'
              }`}
          >
            <div
              className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br ${activeConfig.bgGlow
                } ${activeConfig.id === 'red-heart'
                  ? 'rounded-none'
                  : activeConfig.shape === 'layered-paper'
                    ? 'rounded-2xl border-2 border-[#D4AF37]'
                    : 'rounded-full border-2 border-[#D4AF37]'
                } shadow-inner overflow-hidden`}
              style={{
                clipPath:
                  activeConfig.id !== 'red-heart'
                    ? activeConfig.shape === 'layered-paper'
                      ? 'inset(3% round 20px)'
                      : 'circle(45% at 50% 50%)'
                    : undefined,
                maskImage: activeConfig.id === 'red-heart' && heartMaskDataUrl ? `url("${heartMaskDataUrl}")` : undefined,
                WebkitMaskImage: activeConfig.id === 'red-heart' && heartMaskDataUrl ? `url("${heartMaskDataUrl}")` : undefined,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
              }}
            >
              <div className="absolute inset-0 bg-gold-soft opacity-40 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-1">
                <h3 className="font-cinzel-dec text-2xl font-bold text-[#4A231A] mt-1 leading-tight">
                  {coupleNames}
                </h3>

                <div className="my-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2D473B] to-[#4A231A] text-[#FFFBF8] border border-[#D4AF37] shadow-md">
                  <span className="font-cinzel font-bold text-sm md:text-base tracking-widest uppercase block">
                    {heartRevealData.date} {heartRevealData.year}
                  </span>
                </div>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className={`absolute inset-0 z-20 cursor-none transition-opacity duration-500 ${isFullyRevealed ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
            />

            <div
              className={`absolute z-30 pointer-events-none rounded-full border-2 border-[#D4AF37]/80 bg-[#D4AF37]/10 shadow-[0_0_18px_rgba(212,175,55,0.7)] transition-opacity duration-150 ${scratchCursor.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                left: scratchCursor.x,
                top: scratchCursor.y,
                width: brushType === 'wand' ? 54 : brushType === 'finger' ? 44 : 32,
                height: brushType === 'wand' ? 54 : brushType === 'finger' ? 44 : 32,
                transform: 'translate(-50%, -50%)',
              }}
            />

            <AnimatePresence>
              {scratchParticles.map((pt) => (
                <motion.div
                  key={pt.id}
                  initial={{ opacity: 1, scale: 0.5, y: 0 }}
                  animate={{ opacity: 0, scale: 1.6, y: -25, x: (Math.random() - 0.5) * 20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute pointer-events-none z-30"
                  style={{ left: pt.x, top: pt.y }}
                >
                  <Sparkles
                    className="w-4 h-4"
                    style={{ color: pt.color, fill: pt.color }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isFullyRevealed &&
                confetti.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, y: 0, x: 0, scale: 0.2 }}
                    animate={{
                      opacity: 0,
                      y: (Math.random() - 0.5) * 220,
                      x: (Math.random() - 0.5) * 220,
                      scale: item.scale,
                      rotate: item.rotation,
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute pointer-events-none z-40 w-3 h-3 rounded-full"
                    style={{
                      left: item.x,
                      top: item.y,
                      backgroundColor: item.color,
                    }}
                  />
                ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

