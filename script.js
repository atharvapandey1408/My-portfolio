const IMG={
 "photo": "images/photo.jpg",
 "c0": "images/certificate-1.jpg",
 "c1": "images/certificate-2.jpg",
 "c2": "images/certificate-3.jpg",
 "c3": "images/certificate-4.jpg"
};
/* ===== EDIT YOUR INFORMATION HERE ===== */
const ME={
 name:"Atharva Pandey",
 role:"Data Analyst and Web Developer",
 tagline:"B.Tech CSE (Data Science and AI) student who turns data into insight and ideas into clean, fast web products.",
 about:["I’m pursuing a B.Tech in Computer Science with a specialisation in Data Science and Artificial Intelligence at Shri Ramswaroop Memorial University. Python is my main language. I also work with C, HTML, CSS and JavaScript, and I keep adding to that list.","I lead and work well in teams. I took part in the Adobe University Hackathon as a team leader, and in Smart India Hackathon 2026 and Viveka. I’m always working on my skills and knowledge."],
 facts:[["Python","Main language"],["3","Hackathons and events"],["4","Certificates"]],
 skills:{"Languages":["Python","C","HTML","CSS","JavaScript"],"Focus areas":["Data analysis","Web development","Data science","Artificial intelligence"],"Working style":["Leadership","Teamwork","Critical thinking","Design thinking"]},
 projects:[
  {t:"Adobe University Hackathon",d:"Took part as a team leader, organised by Adobe on Unstop, August 2026.",s:["Leadership","Teamwork"]},
  {t:"Smart India Hackathon 2026",d:"Took part in the internal round at Shri Ramswaroop Memorial University.",s:["Problem solving","Teamwork"]},
  {t:"Viveka",d:"Took part in Viveka, along with other college events.",s:["College events"]}],
 certs:[
  {t:"Adobe University Hackathon",d:"Certificate of Participation, Adobe and Unstop, 9 August 2026"},
  {t:"Smart India Hackathon 2026",d:"Certificate of Participation, internal round, SRMU"},
  {t:"IT World Essentials",d:"L&T EduTech, First Class, Oct to Dec 2025"},
  {t:"Critical Thinking, Design Thinking, Leadership and Teamwork",d:"L&T EduTech, First Class, Jan to May 2026"}],
 experience:[
  {when:"Currently pursuing",t:"B.Tech CSE (Data Science and AI), SRMU",d:"Shri Ramswaroop Memorial University, Lucknow-Deva Road, Barabanki."},
  {when:"28 Jan 2026 – 15 May 2026",t:"Critical Thinking, Design Thinking, Leadership and Teamwork",d:"L&T EduTech CollegeConnect Programme. Completed with First Class."},
  {when:"21 Oct 2025 – 31 Dec 2025",t:"IT World Essentials",d:"L&T EduTech CollegeConnect Programme. Completed with First Class."}],
 email:"atharva.pandey006@gmail.com",
 links:[]
};
/* ===== END OF YOUR INFORMATION ===== */

const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
document.title=ME.name+" – "+ME.role;
$("logo").textContent=ME.name;
$("name").textContent=ME.name+" – "+ME.role;
$("photo").src=IMG.photo;
$("tagline").textContent=ME.tagline;
$("aboutText").innerHTML=ME.about.map(p=>"<p>"+esc(p)+"</p>").join("");
$("facts").innerHTML=ME.facts.map(f=>"<div><b>"+esc(f[0])+"</b><span>"+esc(f[1])+"</span></div>").join("");
$("skillList").innerHTML=Object.entries(ME.skills).map(([k,v])=>"<div><h3>"+esc(k)+"</h3><div class='chips'>"+v.map(s=>"<span class='chip'>"+esc(s)+"</span>").join("")+"</div></div>").join("");
$("projects").innerHTML=ME.projects.map(p=>"<div class='card'><div><h3>"+esc(p.t)+"</h3><p>"+esc(p.d)+"</p><div class='chips'>"+p.s.map(s=>"<span class='chip'>"+esc(s)+"</span>").join("")+"</div></div></div>").join("");
$("certList").innerHTML=ME.certs.map((c,i)=>"<div class='card'><div><img src='"+IMG["c"+i]+"' data-i='"+i+"' tabindex='0' alt='Certificate: "+esc(c.t)+"'><h3>"+esc(c.t)+"</h3><p>"+esc(c.d)+"</p></div></div>").join("");
const lb=$("lb"),open_=i=>{$("lbi").src=IMG["c"+i];lb.hidden=false};
$("certList").addEventListener("click",e=>{if(e.target.dataset.i)open_(e.target.dataset.i)});
$("certList").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.dataset.i)open_(e.target.dataset.i)});
lb.onclick=()=>lb.hidden=true;addEventListener("keydown",e=>{if(e.key==="Escape")lb.hidden=true});
$("timeline").innerHTML=ME.experience.map(e=>"<article><time>"+esc(e.when)+"</time><h3>"+esc(e.t)+"</h3><p>"+esc(e.d)+"</p></article>").join("");
$("links").innerHTML="<a href='mailto:"+esc(ME.email)+"'>"+esc(ME.email)+"</a>"+ME.links.map(l=>"<a href='"+esc(l[1])+"'>"+esc(l[0])+"</a>").join("");
$("foot").textContent="© "+new Date().getFullYear()+" "+ME.name;
$("form").addEventListener("submit",e=>{e.preventDefault();const f=e.target;
 location.href="mailto:"+ME.email+"?subject="+encodeURIComponent("Portfolio message from "+f.n.value)+"&body="+encodeURIComponent(f.m.value+"\n\n"+f.n.value+" ("+f.e.value+")");});

/* theme */
const root=document.documentElement,mq=matchMedia("(prefers-color-scheme: dark)");
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":mq.matches;
$("theme").onclick=()=>{root.dataset.theme=isDark()?"light":"dark";paint()};

/* tilt on project cards (responds to the pointer) */
document.querySelectorAll(".card").forEach(c=>{const i=c.firstChild;
 c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;i.style.transform="rotateY("+x*10+"deg) rotateX("+-y*10+"deg)"});
 c.addEventListener("pointerleave",()=>i.style.transform="")});

/* 3D scene */
let paint=()=>{};
try{
const cv=$("gl"),hero=$("top"),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100),A=0x8F83FF,B=0xFFB547,net=new THREE.Group();S.add(net);S.position.y=.5;
const P=[];for(let i=0;i<120;i++){const r=3.2+Math.random()*.7,t=Math.random()*6.283,p=Math.acos(2*Math.random()-1);P.push(new THREE.Vector3(r*Math.sin(p)*Math.cos(t),r*Math.sin(p)*Math.sin(t),r*Math.cos(p)))}
const E=[],lp=[];
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++)if(P[i].distanceTo(P[j])<1.9){E.push([i,j]);lp.push(P[i].x,P[i].y,P[i].z,P[j].x,P[j].y,P[j].z)}
const lg=new THREE.BufferGeometry();lg.setAttribute("position",new THREE.Float32BufferAttribute(lp,3));
net.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:A,transparent:true,opacity:.32})));
net.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(P),new THREE.PointsMaterial({color:0xffffff,size:.09,transparent:true,opacity:.9})));
const K=36,pul=Array.from({length:K},()=>({e:E[Math.random()*E.length|0],t:Math.random(),s:.004+Math.random()*.01})),pp=new Float32Array(K*3),pgm=new THREE.BufferGeometry();
pgm.setAttribute("position",new THREE.BufferAttribute(pp,3));
net.add(new THREE.Points(pgm,new THREE.PointsMaterial({color:B,size:.22,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})));
const rings=[1,2].map(k=>{const m=new THREE.Mesh(new THREE.TorusGeometry(2.4+k*.55,.01,8,160),new THREE.MeshBasicMaterial({color:k==1?B:A,transparent:true,opacity:.55}));m.rotation.x=1.2*k;S.add(m);return m});
const tc=document.createElement("canvas");tc.width=1400;tc.height=360;
const x=tc.getContext("2d"),tex=new THREE.CanvasTexture(tc);
const spr=new THREE.Mesh(new THREE.PlaneGeometry(5.6,1.44),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthTest:false}));spr.renderOrder=5;S.add(spr);
const NAME=ME.name.toUpperCase(),ROLES=["DATA ANALYST","WEB DEVELOPER","DATA SCIENCE + AI"],calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
let ni=calm?NAME.length:0,ri=0,rc=calm?ROLES[0].length:0,lt=0,hold=0;
function draw(){x.clearRect(0,0,1400,360);x.textBaseline="middle";x.textAlign="left";
 let f=150;x.font="800 "+f+"px 'Bricolage Grotesque',sans-serif";
 while(x.measureText(NAME).width>1300&&f>50){f-=6;x.font="800 "+f+"px 'Bricolage Grotesque',sans-serif"}
 const w=x.measureText(NAME).width,g=x.createLinearGradient(0,0,1400,0);g.addColorStop(0,"#fff");g.addColorStop(1,"#C9C3FF");
 x.fillStyle=g;x.shadowColor="rgba(143,131,255,.9)";x.shadowBlur=28;x.fillText(NAME.slice(0,ni)+(ni<NAME.length?"▌":""),(1400-w)/2,150);
 x.shadowBlur=0;x.font="700 86px 'DM Sans',sans-serif";x.fillStyle="#FFB547";
 const r=ROLES[ri].slice(0,rc)+(ni>=NAME.length?"▌":""),rw=x.measureText(ROLES[ri]).width;x.fillText(r,(1400-rw)/2,290);tex.needsUpdate=true}
function tick(n){if(calm||n-lt<80)return;lt=n;
 if(ni<NAME.length)ni++;
 else if(rc<ROLES[ri].length){rc++;if(rc==ROLES[ri].length)hold=n}
 else if(n-hold>1600){rc=0;ri=(ri+1)%ROLES.length}
 else return;draw()}
draw();document.fonts.ready.then(draw);
function size(){const w=hero.clientWidth,h=hero.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.position.z=Math.max(11,11.8/(.828*C.aspect));C.updateProjectionMatrix()}
size();addEventListener("resize",size);
let mx=0,my=0,vis=true;
hero.addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(hero);
const clock=new THREE.Clock();
(function loop(n){requestAnimationFrame(loop);if(!vis)return;const t=calm?0:clock.getElapsedTime();tick(n);
 net.rotation.y+=(t*.12+mx*.9-net.rotation.y)*.06;net.rotation.x+=(my*.6-net.rotation.x)*.06;
 rings[0].rotation.z=t*.3;rings[1].rotation.z=-t*.2;rings[0].rotation.y=t*.15;rings[1].rotation.y=mx;
 pul.forEach((u,i)=>{u.t+=calm?0:u.s;if(u.t>1){u.t=0;u.e=E[Math.random()*E.length|0]}const a=P[u.e[0]],b=P[u.e[1]];pp.set([a.x+(b.x-a.x)*u.t,a.y+(b.y-a.y)*u.t,a.z+(b.z-a.z)*u.t],i*3)});
 pgm.attributes.position.needsUpdate=true;R.render(S,C)})();
}catch(e){document.getElementById("gl").style.display="none"}
