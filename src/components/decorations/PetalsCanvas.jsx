import React, { useEffect, useRef } from 'react';

export default function PetalsCanvas({ count = 35, speedMultiplier = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = Math.max(18, count);

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = Math.random() * 8 + 4;
        this.color = Math.random() < 0.55 ? '#7A1F2D' : '#D4AF37';
        this.speedY = (Math.random() * 0.8 + 0.4) * speedMultiplier;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.oscillation = Math.random() * Math.PI * 2;
        this.oscSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y += this.speedY;
        this.oscillation += this.oscSpeed;
        this.x += Math.sin(this.oscillation) * 0.7 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size * 0.8, -this.size * 1.2, this.size * 0.8, 0, this.size * 1.4);
        ctx.bezierCurveTo(this.size * 1.2, this.size * 0.8, this.size, -this.size * 0.8, 0, 0);
        ctx.fill();

        ctx.restore();
      }
    }

    const particles = Array.from({ length: petalCount }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
    />
  );
}
