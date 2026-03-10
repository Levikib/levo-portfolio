"use client";
import { useEffect, useRef } from "react";
const COLORS = ["#7c3aed","#a855f7","#2d7a45","#4ead6a","#d97706"];
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let animId: number;
    const particles: any[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    for (let i = 0; i < 70; i++) particles.push({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
      r:Math.random()*1.2+0.3,
      color:COLORS[Math.floor(Math.random()*COLORS.length)],
      opacity:Math.random()*0.2+0.05
    });
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(124,58,237,${0.04*(1-d/140)})`;ctx.lineWidth=0.5;ctx.stroke();}
      }
      particles.forEach(p=>{
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color+Math.floor(p.opacity*255).toString(16).padStart(2,"0");
        ctx.fill();p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>canvas.width)p.vx*=-1;
        if(p.y<0||p.y>canvas.height)p.vy*=-1;
      });
      animId=requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(animId);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
}
