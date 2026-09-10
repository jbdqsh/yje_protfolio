/** Native scrolling remains usable without JavaScript; enhancement adds selection and controls. */
class ProjectGallery extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const track = this.querySelector<HTMLElement>('.gallery-track');
    const slides = [...this.querySelectorAll<HTMLElement>('.gallery-slide')];
    const controls = this.querySelector<HTMLElement>('[data-gallery-controls]');
    if (!track || !controls || slides.length < 2) return;
    const thumbnails = [...this.querySelectorAll<HTMLButtonElement>('[data-gallery-index]')];
    const previous = this.querySelector<HTMLButtonElement>('[data-gallery-prev]')!;
    const next = this.querySelector<HTMLButtonElement>('[data-gallery-next]')!;
    const count = this.querySelector<HTMLElement>('[data-gallery-count]')!;
    let current = 0;
    let frame = 0;

    const select = (index: number) => {
      current = index;
      thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      // Offscreen source links must not appear in the keyboard tab sequence.
      slides.forEach((slide, i) => {
        slide.inert = i !== index;
      });
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };
    const move = (index: number) => {
      const bounded = Math.max(0, Math.min(slides.length - 1, index));
      track.scrollTo({
        left: bounded * track.clientWidth,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    };
    thumbnails.forEach((button, index) => button.addEventListener('click', () => move(index)));
    previous.addEventListener('click', () => move(current - 1));
    next.addEventListener('click', () => move(current + 1));
    track.addEventListener('keydown', (event) => {
      if (event.target !== track) return;
      const destinations: Record<string, number> = {
        ArrowLeft: current - 1,
        ArrowRight: current + 1,
        Home: 0,
        End: slides.length - 1,
      };
      if (event.key in destinations) {
        event.preventDefault();
        move(destinations[event.key]);
      }
    });
    track.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const index = Math.max(
            0,
            Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)),
          );
          if (index !== current) select(index);
        });
      },
      { passive: true },
    );
    select(0);
    controls.hidden = false;
  }
}

if (!customElements.get('project-gallery'))
  customElements.define('project-gallery', ProjectGallery);
