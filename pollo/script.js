class Galeria {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.actual = 0;
    this.reproduciendo = true;
    this.intervalo = null;
    
    this.btnAnterior = document.getElementById('anterior');
    this.btnSiguiente = document.getElementById('siguiente');
    this.btnPlayPause = document.getElementById('playpause');
    this.audio = document.getElementById('audio');
    this.spanActual = document.getElementById('actual');
    this.spanTotal = document.getElementById('total');
    
    this.spanTotal.textContent = this.slides.length;
    this.inicializar();
  }

  inicializar() {
    this.btnAnterior.addEventListener('click', () => this.anterior());
    this.btnSiguiente.addEventListener('click', () => this.siguiente());
    this.btnPlayPause.addEventListener('click', () => this.togglePlayPause());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.siguiente();
      if (e.key === 'ArrowLeft') this.anterior();
      if (e.key === ' ') {
        e.preventDefault();
        this.togglePlayPause();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.siguiente();
      }
    });

    this.iniciarAutoplay();
    this.iniciarAudio();
  }

  mostrar(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.slides[index].classList.add('active');
    this.actual = index;
    this.spanActual.textContent = index + 1;
  }

  siguiente() {
    const next = (this.actual + 1) % this.slides.length;
    this.mostrar(next);
  }

  anterior() {
    const prev = (this.actual - 1 + this.slides.length) % this.slides.length;
    this.mostrar(prev);
  }

  iniciarAudio() {
    if (!this.audio) return;
    this.audio.volume = 0.4;
    this.audio.play().catch(() => {
      document.addEventListener('click', () => {
        if (this.audio.paused) {
          this.audio.play().catch(() => {});
        }
      }, { once: true });
    });
  }

  iniciarAutoplay() {
    if (this.intervalo) clearInterval(this.intervalo);
    if (this.reproduciendo) {
      this.intervalo = setInterval(() => this.siguiente(), 2500);
      this.btnPlayPause.textContent = '⏸ Pausar';
    }
  }

  togglePlayPause() {
    this.reproduciendo = !this.reproduciendo;
    if (this.reproduciendo) {
      this.iniciarAutoplay();
      if (this.audio) {
        this.audio.play().catch(() => {});
      }
    } else {
      clearInterval(this.intervalo);
      this.btnPlayPause.textContent = '▶ Reanudar';
      if (this.audio) {
        this.audio.pause();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Galeria();
});