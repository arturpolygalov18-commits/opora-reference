/* Вся сцена внутри карточки, за верхним краем только настоящая кровля. */
const scene=document.querySelector('.hero-scene');
const photo=scene?.querySelector('img');
function fitRoof(){
 if(!scene||!photo?.naturalWidth)return;
 if(matchMedia('(max-width:600px)').matches){photo.removeAttribute('style');scene.style.clipPath='none';return;}
 const w=scene.clientWidth,h=scene.clientHeight,bleed=55;
 const scale=Math.max(w/photo.naturalWidth,(h-bleed)/photo.naturalHeight);
 const iw=photo.naturalWidth*scale,ih=photo.naturalHeight*scale;
 const ox=w-iw,oy=4-153*scale;
 const n=v=>Math.round(v*100)/100;
 const pt=(x,y)=>`${n(ox+x*scale)} ${n(oy+y*scale)}`;
 // Top ridge of this source: (54,442) -> (626,151) -> (1122,570).
 // Trace slightly inside to avoid the pale sky fringe.
 const apexX=ox+626*scale,apexY=oy+153*scale;
 const leftX=apexX+(56-626)*scale*(bleed-apexY)/((444-153)*scale);
 const rightX=apexX+(1122-626)*scale*(bleed-apexY)/((572-153)*scale);
 const path=`M 0 ${bleed} H ${n(w-28)} Q ${n(w)} ${bleed} ${n(w)} ${bleed+28} V ${n(h-28)} Q ${n(w)} ${n(h)} ${n(w-28)} ${n(h)} H 0 Z M ${n(leftX)} ${bleed+.5} L ${pt(626,153)} L ${n(rightX)} ${bleed+.5} Z`;
 // Use one image at one scale; the union mask does not duplicate the building.
 Object.assign(photo.style,{width:iw+'px',height:ih+'px',left:ox+'px',right:'auto',top:oy+'px',objectFit:'fill'});
 scene.style.clipPath=`path('${path}')`;
}
if(scene&&photo){new ResizeObserver(fitRoof).observe(scene);photo.addEventListener('load',fitRoof);fitRoof();}
