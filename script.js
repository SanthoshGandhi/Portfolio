const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() {
  canvas.width = innerWidth; canvas.height = innerHeight;
  particles = Array.from({length: Math.min(70, Math.floor(innerWidth/18))}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22, r:Math.random()*1.4+.2
  }));
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(184,255,90,.55)";ctx.fill();
  });
  requestAnimationFrame(draw);
}
resize(); addEventListener("resize",resize); draw();

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow = document.querySelector(".cursor-glow");
addEventListener("pointermove", e => {
  glow.style.cssText = `position:fixed;pointer-events:none;z-index:0;width:220px;height:220px;border-radius:50%;left:${e.clientX-110}px;top:${e.clientY-110}px;background:radial-gradient(circle,rgba(184,255,90,.07),transparent 65%);`;
});
