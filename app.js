const countdown = document.querySelector('.countdown');
if (countdown) {
  // Count down to the start of the wedding date in Utah (Mountain Daylight Time).
  const weddingTime = Date.parse('2027-03-27T00:00:00-06:00');
  const updateCountdown = () => {
    const total = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
    const values = { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60 };
    for (const [unit, value] of Object.entries(values)) document.getElementById(unit).textContent = String(value).padStart(2, '0');
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
const lightbox=document.querySelector('#lightbox');
let opener;
document.querySelectorAll('.photo-card').forEach(card=>card.addEventListener('click',()=>{opener=card;const content=document.querySelector('#lightbox-content');content.replaceChildren(card.querySelector('.photo-placeholder').cloneNode(true));const heading=document.createElement('h2');heading.textContent=card.dataset.caption;const note=document.createElement('p');note.textContent='A favorite memory will go here. This frame is ready for a photo of the happy couple.';content.append(heading);if(!card.querySelector('img'))content.append(note);lightbox.showModal();}));
lightbox.querySelector('.close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>opener?.focus());
const carousel = document.querySelector('.photo-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  let index = 0;
  const show = next => {
    slides[index].hidden = true;
    index = (next + slides.length) % slides.length;
    slides[index].hidden = false;
    carousel.querySelector('.carousel-count').textContent = `${index + 1} / ${slides.length}`;
  };
  carousel.querySelector('.carousel-prev').addEventListener('click', () => show(index - 1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => show(index + 1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let startX = 0, startY = 0;
  const stage = carousel.querySelector('.carousel-stage');
  stage.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; startY = event.changedTouches[0].clientY; }, {passive:true});
  stage.addEventListener('touchend', event => {
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
  }, {passive:true});
}
