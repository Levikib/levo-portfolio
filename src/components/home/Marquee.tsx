const items = [
  {text:"TypeScript",color:"#ff4d00"},{text:"·",color:"#444"},{text:"Next.js",color:"#00ff88"},{text:"·",color:"#444"},
  {text:"SaaS Founder",color:"#ff0080"},{text:"·",color:"#444"},{text:"Paystack",color:"#ffe600"},{text:"·",color:"#444"},
  {text:"PostgreSQL",color:"#ff4d00"},{text:"·",color:"#444"},{text:"React",color:"#00ff88"},{text:"·",color:"#444"},
  {text:"Graphic Design",color:"#ff0080"},{text:"·",color:"#444"},{text:"Node.js",color:"#ffe600"},{text:"·",color:"#444"},
  {text:"VPS / Nginx",color:"#ff4d00"},{text:"·",color:"#444"},{text:"Nairobi → World",color:"#00ff88"},{text:"·",color:"#444"},
];
export default function Marquee() {
  const doubled = [...items,...items];
  return(
    <div className="relative z-10 overflow-hidden border-t border-b border-[#1a1a1a] py-4" style={{background:"#0e0e0e"}}>
      <div className="flex w-max" style={{animation:"marquee 25s linear infinite"}}>
        {doubled.map((item,i)=>(
          <span key={i} className="px-8 whitespace-nowrap" style={{fontFamily:"var(--font-syne)",fontWeight:800,fontSize:"12px",letterSpacing:"0.2em",textTransform:"uppercase",color:item.color}}>{item.text}</span>
        ))}
      </div>
    </div>
  );
}
