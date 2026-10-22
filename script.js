
(()=>{'use strict';
const $=s=>document.querySelector(s),nav=$('.nav'),menu=$('.menu'),links=$('.navlinks'),topBtn=$('.topbtn'),progress=$('.progress');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function scrollState(){const y=window.scrollY;nav.classList.toggle('scrolled',y>40);topBtn.classList.toggle('visible',y>650);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?y/max*100:0)+'%'}
addEventListener('scroll',scrollState,{passive:true});addEventListener('resize',scrollState);scrollState();
function closeMenu(){links.classList.remove('open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'}));
if('IntersectionObserver' in window){const sections=[...links.querySelectorAll('a')];const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){sections.forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}})},{rootMargin:'-15% 0px -65% 0px',threshold:0});sections.forEach(a=>{const el=$(a.hash);if(el)observer.observe(el)})}
const shots=[...document.querySelectorAll('[data-image]')],unique=shots.filter((x,i,a)=>a.findIndex(y=>y.dataset.image===x.dataset.image)===i),box=$('#lightbox'),preview=$('#preview');let current=0,lastFocus=null;
function show(i){current=(i+unique.length)%unique.length;const item=unique[current];preview.src=item.dataset.image;preview.alt=item.dataset.title;$('.lb-caption span').textContent=item.dataset.title;$('.lb-caption small').textContent=String(current+1).padStart(2,'0')+' / '+unique.length+' · ← → 切换图片'}
function close(){box.classList.remove('open');box.hidden=true;document.body.classList.remove('lock');if(lastFocus)lastFocus.focus({preventScroll:true})}
shots.forEach(btn=>btn.addEventListener('click',()=>{lastFocus=btn;show(unique.findIndex(x=>x.dataset.image===btn.dataset.image));box.hidden=false;box.classList.add('open');document.body.classList.add('lock');$('.lb-close').focus()}));
$('.lb-close').addEventListener('click',close);$('.lb-prev').addEventListener('click',()=>show(current-1));$('.lb-next').addEventListener('click',()=>show(current+1));box.addEventListener('click',e=>{if(e.target===box)close()});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(!box.hidden)close();closeMenu()}if(box.hidden)return;if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);if(e.key==='Tab'){const f=[...box.querySelectorAll('button')],first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();
