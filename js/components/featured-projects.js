/**
 * Featured Projects Component
 * Maneja el carrusel de proyectos destacados
 */

class FeaturedProjects {
  constructor() {
    this.slider = document.querySelector('.featured-projects__slider');
    this.projects = document.querySelectorAll('.featured-project');
    this.prevBtn = document.querySelector('.featured-projects__prev');
    this.nextBtn = document.querySelector('.featured-projects__next');
    this.indicators = document.querySelectorAll('.featured-projects__indicator');
    this.currentIndex = 0;
    this.totalProjects = this.projects.length;
    
    this.init();
  }
  
  init() {
    if (!this.slider || this.projects.length === 0) return;
    
    // Configurar botones de navegación
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.goToPrev());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToNext());
    }
    
    // Configurar indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Iniciar autoplay
    this.startAutoplay();
    
    // Pausar autoplay al pasar el mouse
    this.slider.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Configurar gestos táctiles
    this.setupTouchEvents();
  }
  
  goToSlide(index) {
    // Validar índice
    if (index < 0) {
      index = this.totalProjects - 1;
    } else if (index >= this.totalProjects) {
      index = 0;
    }
    
    // Actualizar clases activas
    this.projects.forEach(project => project.classList.remove('active'));
    this.indicators.forEach(indicator => indicator.classList.remove('active'));
    
    this.projects[index].classList.add('active');
    this.indicators[index].classList.add('active');
    
    // Actualizar índice actual
    this.currentIndex = index;
  }
  
  goToNext() {
    this.goToSlide(this.currentIndex + 1);
  }
  
  goToPrev() {
    this.goToSlide(this.currentIndex - 1);
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.goToNext();
    }, 5000);
  }
  
  pauseAutoplay() {
    clearInterval(this.autoplayInterval);
  }
  
  setupTouchEvents() {
    let startX, endX;
    const minSwipeDistance = 50;
    
    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      
      const distance = endX - startX;
      
      if (Math.abs(distance) >= minSwipeDistance) {
        if (distance > 0) {
          // Swipe derecha
          this.goToPrev();
        } else {
          // Swipe izquierda
          this.goToNext();
        }
      }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  new FeaturedProjects();
});