"use client";
import { useEffect, useRef } from "react";
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx=useRef(0),my=useRef(0),rx=useRef(0),ry=useRef(0);
  const rafRef=useRef<number>(0);
  useEffect(()=>{
    const onMove=(e:MouseEvent)=>{mx.current=e.clientX;my.current=e.clientY;if(dotRef.current){dotRef.current.style.left=mx.current-5+"px";dotRef.current.style.top=my.current-5+"px";}};
    const animate=()=>{rx.current+=(mx.current-rx.current-18)*0.1;ry.current+=(my.current-ry.current-18)*0.1;if(ringRef.current){ringRef.current.style.left=rx.current+"px";ringRef.current.style.top=ry.current+"px";}rafRef.current=requestAnimationFrame(animate);};
    document.addEventListener("mousemove",onMove);
    rafRef.current=requestAnimationFrame(animate);
    return()=>{document.removeEventListener("mousemove",onMove);cancelAnimationFrame(rafRef.current);};
  },[]);
  return(
    <>
      <div ref={dotRef} className="fixed w-2.5 h-2.5 rounded-full pointer-events-none z-[9999]" style={{top:0,left:0,background:"var(--purple)"}}/>
      <div ref={ringRef} className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998]" style={{top:0,left:0,border:"1.5px solid var(--purple)",opacity:0.5}}/>
    </>
  );
}
