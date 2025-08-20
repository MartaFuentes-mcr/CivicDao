/**
 * Advanced Filters Component
 * Maneja los filtros avanzados y la búsqueda
 */

class AdvancedFilters {
  constructor() {
    // Elementos del DOM
    this.advancedFiltersBtn = document.getElementById('advancedFiltersBtn');
    this.advancedFiltersPanel = document.getElementById('advancedFiltersPanel');
    this.advancedFiltersClose = document.querySelector('.dashboard-filters__advanced-close');
    this.searchInput = document.getElementById('searchProjects');
    this.searchButton = document.getElementById('searchButton');
    this.searchSuggestions = document.getElementById('searchSuggestions');
    this.searchSuggestionsClose = document.querySelector('.search-box__suggestions-close');
    this.budgetSlider = document.getElementById('budgetSlider');
    this.budgetValue = document.querySelector('.range-slider__value');
    this.sortSelect = document.getElementById('sortProjects');
    
    // Inicializar
    this.init();
  }
  
  init() {
    // Configurar panel de filtros avanzados
    if (this.advancedFiltersBtn && this.advancedFiltersPanel) {
      this.advancedFiltersBtn.addEventListener('click', () => this.toggleAdvancedFilters());
      
      // Cerrar al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!this.advancedFiltersPanel.contains(e.target) && 
            e.target !== this.advancedFiltersBtn && 
            !this.advancedFiltersBtn.contains(e.target)) {
          this.closeAdvancedFilters();
        }
      });
      
      // Botón de cerrar
      if (this.advancedFiltersClose) {
        this.advancedFiltersClose.addEventListener('click', () => this.closeAdvancedFilters());
      }
    }
    
    // Configurar búsqueda
    if (this.searchInput) {
      this.searchInput.addEventListener('focus', () => this.showSearchSuggestions());
      this.searchInput.addEventListener('input', () => this.handleSearchInput());
      
      // Cerrar sugerencias al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!this.searchSuggestions.contains(e.target) && 
            e.target !== this.searchInput && 
            e.target !== this.searchButton) {
          this.closeSearchSuggestions();
        }
      });
      
      // Botón de cerrar sugerencias
      if (this.searchSuggestionsClose) {
        this.searchSuggestionsClose.addEventListener('click', () => this.closeSearchSuggestions());
      }
      
      // Botón de búsqueda
      if (this.searchButton) {
        this.searchButton.addEventListener('click', () => this.performSearch());
      }
      
      // Tecla Enter para buscar
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.performSearch();
        }
      });
    }
    
    // Configurar slider de presupuesto
    if (this.budgetSlider && this.budgetValue) {
      this.budgetSlider.addEventListener('input', () => {
        const value = this.budgetSlider.value;
        this.budgetValue.textContent = `Hasta €${parseInt(value).toLocaleString()}`;
      });
    }
    
    // Configurar ordenación
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => this.handleSort());
    }
  }
  
  toggleAdvancedFilters() {
    console.log('toggleAdvancedFilters llamado');
    
    if (!this.advancedFiltersPanel) {
      console.error('Error: advancedFiltersPanel es null o undefined');
      return;
    }
    
    if (this.advancedFiltersPanel.classList.contains('active')) {
      console.log('Cerrando panel de filtros avanzados');
      this.closeAdvancedFilters();
    } else {
      console.log('Abriendo panel de filtros avanzados');
      this.openAdvancedFilters();
    }
  }
  
  openAdvancedFilters() {
    console.log('openAdvancedFilters llamado');
    
    if (!this.advancedFiltersPanel || !this.advancedFiltersBtn) {
      console.error('Error: advancedFiltersPanel o advancedFiltersBtn es null o undefined');
      return;
    }
    
    this.advancedFiltersPanel.classList.add('active');
    this.advancedFiltersBtn.classList.add('active');
    console.log('Panel de filtros avanzados abierto');
  }
  
  closeAdvancedFilters() {
    console.log('closeAdvancedFilters llamado');
    
    if (!this.advancedFiltersPanel || !this.advancedFiltersBtn) {
      console.error('Error: advancedFiltersPanel o advancedFiltersBtn es null o undefined');
      return;
    }
    
    this.advancedFiltersPanel.classList.remove('active');
    this.advancedFiltersBtn.classList.remove('active');
    console.log('Panel de filtros avanzados cerrado');
  }
  
  showSearchSuggestions() {
    if (this.searchSuggestions) {
      this.searchSuggestions.classList.add('active');
    }
  }
  
  closeSearchSuggestions() {
    if (this.searchSuggestions) {
      this.searchSuggestions.classList.remove('active');
    }
  }
  
  handleSearchInput() {
    const query = this.searchInput.value.trim().toLowerCase();
    
    if (query.length > 0) {
      this.showSearchSuggestions();
      
      // Aquí se podrían filtrar las sugerencias según la consulta
      // Por ahora, simplemente mostramos todas las sugerencias
    } else {
      this.closeSearchSuggestions();
    }
  }
  
  performSearch() {
    const query = this.searchInput.value.trim();
    
    if (query.length > 0) {
      // En una aplicación real, esto enviaría la consulta al servidor
      // o filtraría los proyectos en el cliente
      
      console.log('Buscando proyectos con:', query);
      
      // Mostrar notificación
      if (typeof showNotification === 'function') {
        showNotification(`Buscando proyectos que coincidan con "${query}"`, 'info');
      }
      
      // Cerrar sugerencias
      this.closeSearchSuggestions();
      
      // Simular búsqueda
      this.simulateSearch(query);
    }
  }
  
  simulateSearch(query) {
    // Obtener todos los proyectos
    const projectCards = document.querySelectorAll('.project-card');
    let matchCount = 0;
    
    // Filtrar proyectos
    projectCards.forEach(card => {
      const title = card.querySelector('.project-card__title').textContent.toLowerCase();
      const description = card.querySelector('.project-card__description').textContent.toLowerCase();
      const category = card.querySelector('.project-card__category').textContent.toLowerCase();
      
      if (title.includes(query.toLowerCase()) || 
          description.includes(query.toLowerCase()) || 
          category.includes(query.toLowerCase())) {
        card.style.display = 'block';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Mostrar notificación con resultados
    if (typeof showNotification === 'function') {
      showNotification(`Se encontraron ${matchCount} proyectos que coinciden con "${query}"`, 'success');
    }
  }
  
  handleSort() {
    const sortValue = this.sortSelect.value;
    
    // Obtener todos los proyectos
    const projectGrid = document.querySelector('.project-grid');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    
    // Ordenar proyectos según el criterio seleccionado
    switch (sortValue) {
      case 'recent':
        // Ordenar por más recientes (simulado)
        projectCards.sort((a, b) => {
          return Math.random() - 0.5; // Simulación
        });
        break;
        
      case 'popular':
        // Ordenar por popularidad (número de contribuyentes)
        projectCards.sort((a, b) => {
          const aContributors = parseInt(a.querySelector('.project-card__meta-item:first-child span').textContent);
          const bContributors = parseInt(b.querySelector('.project-card__meta-item:first-child span').textContent);
          return bContributors - aContributors;
        });
        break;
        
      case 'funded':
        // Ordenar por mayor financiación (porcentaje)
        projectCards.sort((a, b) => {
          const aPercentage = parseInt(a.querySelector('.project-card__progress-percentage').textContent);
          const bPercentage = parseInt(b.querySelector('.project-card__progress-percentage').textContent);
          return bPercentage - aPercentage;
        });
        break;
        
      case 'ending':
        // Ordenar por los que finalizan pronto
        projectCards.sort((a, b) => {
          const aText = a.querySelector('.project-card__meta-item:nth-child(2) span').textContent;
          const bText = b.querySelector('.project-card__meta-item:nth-child(2) span').textContent;
          
          const aDays = parseInt(aText.match(/\d+/)[0]);
          const bDays = parseInt(bText.match(/\d+/)[0]);
          
          return aDays - bDays;
        });
        break;
    }
    
    // Reordenar en el DOM
    projectCards.forEach(card => {
      projectGrid.appendChild(card);
    });
    
    // Mostrar notificación
    if (typeof showNotification === 'function') {
      showNotification(`Proyectos ordenados por: ${this.sortSelect.options[this.sortSelect.selectedIndex].text}`, 'info');
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando AdvancedFilters...');
  
  // Verificar si los elementos existen
  const advancedFiltersBtn = document.getElementById('advancedFiltersBtn');
  const advancedFiltersPanel = document.getElementById('advancedFiltersPanel');
  
  if (!advancedFiltersBtn) {
    console.error('Error: No se encontró el botón de filtros avanzados (advancedFiltersBtn)');
  } else {
    console.log('Botón de filtros avanzados encontrado:', advancedFiltersBtn);
  }
  
  if (!advancedFiltersPanel) {
    console.error('Error: No se encontró el panel de filtros avanzados (advancedFiltersPanel)');
  } else {
    console.log('Panel de filtros avanzados encontrado:', advancedFiltersPanel);
  }
  
  // Inicializar el componente
  try {
    const advancedFilters = new AdvancedFilters();
    console.log('AdvancedFilters inicializado correctamente');
    
    // Agregar manejador de eventos directamente
    if (advancedFiltersBtn) {
      console.log('Agregando evento click al botón de filtros...');
      advancedFiltersBtn.addEventListener('click', function() {
        console.log('Botón de filtros avanzados clickeado');
        if (advancedFiltersPanel) {
          if (advancedFiltersPanel.classList.contains('active')) {
            advancedFiltersPanel.classList.remove('active');
            console.log('Panel de filtros cerrado');
          } else {
            advancedFiltersPanel.classList.add('active');
            console.log('Panel de filtros abierto');
          }
        }
      });
    }
  } catch (error) {
    console.error('Error al inicializar AdvancedFilters:', error);
  }
});