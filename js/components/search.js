/**
 * Search Component
 * Maneja la funcionalidad de búsqueda en todo el sitio
 */

class Search {
  constructor(options = {}) {
    this.searchInput = options.inputElement || document.querySelector('.search-box input');
    this.searchButton = options.buttonElement || document.querySelector('.search-box__button');
    this.resultsContainer = options.resultsContainer || null;
    this.minChars = options.minChars || 3;
    this.debounceTime = options.debounceTime || 300;
    this.searchEndpoint = options.searchEndpoint || '/api/search';
    this.searchData = options.searchData || null;
    this.onSearch = options.onSearch || null;
    this.onSelect = options.onSelect || null;
    
    this.debounceTimeout = null;
    
    if (this.searchInput) {
      this.init();
    }
  }
  
  init() {
    // Inicializar eventos de búsqueda
    this.initSearchEvents();
    
    // Inicializar autocompletado si hay un contenedor de resultados
    if (this.resultsContainer) {
      this.initAutocomplete();
    }
  }
  
  initSearchEvents() {
    // Evento de input para búsqueda en tiempo real
    this.searchInput.addEventListener('input', () => {
      this.debounceSearch();
    });
    
    // Evento de botón de búsqueda
    if (this.searchButton) {
      this.searchButton.addEventListener('click', () => {
        this.search();
      });
    }
    
    // Evento de tecla Enter
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.search();
      }
    });
  }
  
  initAutocomplete() {
    // Crear contenedor de resultados si no existe
    if (!this.resultsContainer) {
      this.resultsContainer = document.createElement('div');
      this.resultsContainer.className = 'search-box__results';
      this.searchInput.parentNode.appendChild(this.resultsContainer);
    }
    
    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.resultsContainer.contains(e.target)) {
        this.hideResults();
      }
    });
    
    // Navegación con teclado
    this.searchInput.addEventListener('keydown', (e) => {
      if (!this.resultsContainer.children.length) return;
      
      const items = this.resultsContainer.querySelectorAll('.search-box__result-item');
      const activeItem = this.resultsContainer.querySelector('.search-box__result-item.active');
      let activeIndex = -1;
      
      if (activeItem) {
        activeIndex = Array.from(items).indexOf(activeItem);
      }
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (activeIndex < items.length - 1) {
            if (activeItem) activeItem.classList.remove('active');
            items[activeIndex + 1].classList.add('active');
            items[activeIndex + 1].scrollIntoView({ block: 'nearest' });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (activeIndex > 0) {
            if (activeItem) activeItem.classList.remove('active');
            items[activeIndex - 1].classList.add('active');
            items[activeIndex - 1].scrollIntoView({ block: 'nearest' });
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (activeItem) {
            this.selectResult(activeItem);
          } else {
            this.search();
          }
          break;
        case 'Escape':
          e.preventDefault();
          this.hideResults();
          break;
      }
    });
  }
  
  debounceSearch() {
    clearTimeout(this.debounceTimeout);
    
    this.debounceTimeout = setTimeout(() => {
      const query = this.searchInput.value.trim();
      
      if (query.length >= this.minChars) {
        this.searchAutocomplete(query);
      } else {
        this.hideResults();
      }
    }, this.debounceTime);
  }
  
  search() {
    const query = this.searchInput.value.trim();
    
    if (query.length === 0) return;
    
    if (this.onSearch) {
      // Usar callback personalizado
      this.onSearch(query);
    } else {
      // Redirigir a página de resultados
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }
  
  async searchAutocomplete(query) {
    if (this.searchData) {
      // Búsqueda en datos locales
      this.renderResults(this.filterLocalData(query));
    } else {
      // Búsqueda en API
      try {
        const response = await fetch(`${this.searchEndpoint}?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.results) {
          this.renderResults(data.results);
        }
      } catch (error) {
        console.error('Error en búsqueda:', error);
        this.hideResults();
      }
    }
  }
  
  filterLocalData(query) {
    if (!this.searchData || !Array.isArray(this.searchData)) return [];
    
    query = query.toLowerCase();
    
    return this.searchData.filter(item => {
      const title = (item.title || '').toLowerCase();
      const subtitle = (item.subtitle || '').toLowerCase();
      const description = (item.description || '').toLowerCase();
      
      return title.includes(query) || subtitle.includes(query) || description.includes(query);
    }).slice(0, 5); // Limitar a 5 resultados
  }
  
  renderResults(results) {
    if (!this.resultsContainer) return;
    
    this.resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-box__no-results">
          No se encontraron resultados
        </div>
      `;
    } else {
      results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-box__result-item';
        item.dataset.id = result.id;
        
        let icon = '<i class="fas fa-search"></i>';
        
        if (result.type === 'project') {
          icon = '<i class="fas fa-project-diagram"></i>';
        } else if (result.type === 'proposal') {
          icon = '<i class="fas fa-lightbulb"></i>';
        } else if (result.type === 'user') {
          icon = '<i class="fas fa-user"></i>';
        }
        
        item.innerHTML = `
          <div class="search-box__result-icon">${icon}</div>
          <div class="search-box__result-content">
            <div class="search-box__result-title">${result.title}</div>
            <div class="search-box__result-subtitle">${result.subtitle || ''}</div>
          </div>
        `;
        
        item.addEventListener('click', () => {
          this.selectResult(item);
        });
        
        this.resultsContainer.appendChild(item);
      });
    }
    
    this.showResults();
  }
  
  selectResult(item) {
    const id = item.dataset.id;
    
    if (this.onSelect) {
      // Usar callback personalizado
      this.onSelect(id);
    } else {
      // Redirigir a la página del resultado
      window.location.href = `/item/${id}`;
    }
    
    this.hideResults();
  }
  
  showResults() {
    if (this.resultsContainer) {
      this.resultsContainer.style.display = 'block';
    }
  }
  
  hideResults() {
    if (this.resultsContainer) {
      this.resultsContainer.style.display = 'none';
    }
  }
}

// Exportar para uso en otros archivos
window.Search = Search;