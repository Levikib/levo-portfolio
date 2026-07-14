"use client";
import { useEffect, useRef } from "react";

export default function JungleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Leaf SVG paths — organic shapes
    const leafShapes = [
      "M10,30 Q20,0 30,10 Q40,20 35,35 Q25,50 10,30Z",
      "M5,25 Q15,-5 28,8 Q38,18 32,38 Q20,52 5,25Z",
      "M8,20 Q22,-8 35,5 Q48,18 40,35 Q28,48 8,20Z",
      "M0,20 Q12,0 25,5 Q38,10 35,28 Q30,45 15,42 Q0,38 0,20Z",
      "M5,15 Q18,-5 32,8 Q42,20 38,35 Q30,50 12,45 Q-2,38 5,15Z",
    ];

    const leaves: { el: HTMLDivElement; x: number; y: number; vx: number; vy: number; rot: number; vrot: number; scale: number; opacity: number }[] = [];

    for (let i = 0; i < 18; i++) {
      const el = document.createElement("div");
      const shape = leafShapes[Math.floor(Math.random() * leafShapes.length)];
      const hue = Math.random() > 0.5 ? "26,92,46" : "77,173,106";
      const isPurple = Math.random() > 0.75;
      const color = isPurple ? "124,58,237" : hue;
      const size = Math.random() * 40 + 20;
      const opacity = Math.random() * 0.06 + 0.02;

      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 50 55"><path d="${shape}" fill="rgba(${color},${opacity * 8})" /></svg>`;
      el.style.cssText = `position:fixed;pointer-events:none;z-index:1;will-change:transform;`;

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const vx = (Math.random() - 0.5) * 0.3;
      const vy = (Math.random() - 0.5) * 0.2 - 0.08;
      const rot = Math.random() * 360;
      const vrot = (Math.random() - 0.5) * 0.3;
      const scale = Math.random() * 0.8 + 0.6;

      el.style.left = x + "px";
      el.style.top = y + "px";
      container.appendChild(el);
      leaves.push({ el, x, y, vx, vy, rot, vrot, scale, opacity });
    }

    // Organic blob shapes — very subtle, slow morphing
    const blobs: { el: HTMLDivElement; x: number; y: number; phase: number; size: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const el = document.createElement("div");
      const isPurple = i % 2 === 0;
      const color = isPurple ? "124,58,237" : "45,122,69";
      const size = Math.random() * 300 + 200;
      el.style.cssText = `
        position:fixed;pointer-events:none;z-index:0;
        width:${size}px;height:${size}px;
        border-radius:60% 40% 55% 45% / 45% 55% 45% 55%;
        background:radial-gradient(ellipse, rgba(${color},0.04) 0%, transparent 70%);
        filter:blur(40px);
        will-change:transform,border-radius;
      `;
      const x = Math.random() * window.innerWidth - size / 2;
      const y = Math.random() * window.innerHeight - size / 2;
      el.style.left = x + "px";
      el.style.top = y + "px";
      container.appendChild(el);
      blobs.push({ el, x, y, phase: Math.random() * Math.PI * 2, size });
    }

    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.005;

      // Animate leaves
      leaves.forEach((leaf) => {
        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.rot += leaf.vrot;

        // Wrap around screen
        if (leaf.y < -80) { leaf.y = window.innerHeight + 40; leaf.x = Math.random() * window.innerWidth; }
        if (leaf.y > window.innerHeight + 80) { leaf.y = -40; leaf.x = Math.random() * window.innerWidth; }
        if (leaf.x < -80) leaf.x = window.innerWidth + 40;
        if (leaf.x > window.innerWidth + 80) leaf.x = -40;

        leaf.el.style.transform = `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rot}deg) scale(${leaf.scale})`;
      });

      // Animate blobs — slow, organic morphing
      blobs.forEach((blob, i) => {
        const drift = Math.sin(t + blob.phase) * 30;
        const driftY = Math.cos(t * 0.7 + blob.phase) * 20;
        const r1 = 55 + Math.sin(t + i) * 8;
        const r2 = 45 + Math.cos(t * 0.8 + i) * 8;
        const r3 = 50 + Math.sin(t * 0.6 + i) * 10;
        const r4 = 45 + Math.cos(t * 0.9 + i) * 8;
        blob.el.style.transform = `translate(${drift}px, ${driftY}px)`;
        blob.el.style.borderRadius = `${r1}% ${100-r1}% ${r3}% ${100-r3}% / ${r2}% ${r4}% ${100-r4}% ${100-r2}%`;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(frame);
      leaves.forEach(l => l.el.remove());
      blobs.forEach(b => b.el.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} />;
}
