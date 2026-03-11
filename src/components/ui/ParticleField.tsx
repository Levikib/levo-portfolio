"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#ff4d00", "#00ff88", "#ff0080", "#ffe600", "#0088ff"];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduce particle count heavily on mobile — 90 particles with quadratic
    // connection checks (~4000/frame) freezes mobile browsers
    const isMobile = window.innerWidth <= 768;
    const COUNT = isMobile ? 25 : 75;
    // On very small screens skip connections entirely (too expensive)
    const CONNECT_DIST = isMobile ? 0 : 120;

    interface Particle { x:number; y:number; vx:number; vy:number; r:number; color:string; opacity:number; }
    const particles: Particle[] = [];

    let animId: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.3 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connections (desktop only)
      if (CONNECT_DIST > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255,77,0,${0.04 * (1 - dist / CONNECT_DIST)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const hex = Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = p.color + hex;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
