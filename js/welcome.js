(() => {
  const popup=document.getElementById('welcomePopup');
  const petals=document.getElementById('sakuraLayer');
  if(popup) window.setTimeout(()=>popup.classList.add('is-hidden'),8000);
  if(!petals || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const makePetal=()=>{
    const p=document.createElement('i');p.className='sakura-petal';
    p.style.left=(Math.random()*100)+'vw';p.style.setProperty('--drift',((Math.random()*180)-90)+'px');
    p.style.animationDuration=(7+Math.random()*7)+'s';p.style.opacity=(.35+Math.random()*.5).toFixed(2);
    p.style.transform=`scale(${.55+Math.random()*.8})`;
    petals.appendChild(p);window.setTimeout(()=>p.remove(),15000);
  };
  for(let i=0;i<9;i++)window.setTimeout(makePetal,i*260);
  window.setInterval(makePetal,650);
})();
