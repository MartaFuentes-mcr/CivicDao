/**
 * Dashboard Enhanced JavaScript
 * -----------------------------
 * This file consolidates all the JavaScript functionality for the dashboard page,
 * including event handling, modal management, filtering, sorting, and dynamic updates.
 * It follows a class-based approach for better organization and maintainability.
 */

class Dashboard {
  constructor() {
    // Data (in a real app, this would be fetched from an API)
    this.projects = window.civicDaoData.projects;
    this.userContributions = window.civicDaoData.userContributions;
    this.chartData = window.civicDaoData.chartData;

    // DOM Elements
    this.elements = {
      projectGrid: document.querySelector('.project-grid'),
      filterTabs: document.querySelectorAll('.dashboard-filters__tab'),
      sortSelect: document.getElementById('sortProjects'),
      viewButtons: document.querySelectorAll('.dashboard-filters__view .btn'),
      newProposalBtn: document.getElementById('newProposalBtn'),
      searchInput: document.getElementById('searchProjects'),
      searchButton: document.getElementById('searchButton'),
      simpleFilterBtn: document.getElementById('simpleFilterBtn'),
      simpleFilterPanel: document.getElementById('simpleFilterPanel'),
      applyFiltersBtn: document.querySelector('#simpleFilterPanel .btn--primary'),
      resetFiltersBtn: document.querySelector('#simpleFilterPanel .btn--outline'),
      viewAllActivityBtn: document.getElementById('viewAllActivityBtn'),
      viewAllProjectsBtn: document.querySelector('.text-center .btn--outline'),
    };

    // Modals
    this.modals = {
      contribution: new Modal('contributionModal'),
      projectDetails: new Modal('projectDetailsModal'),
      newProposal: new Modal('newProposalModal'),
    };

    // Initial state
    this.currentFilter = 'all';
    this.currentSort = 'recent';
    this.currentView = 'grid';
  }

  /**
   * Initializes the dashboard functionality.
   */
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMLoaded());
    } else {
      this.onDOMLoaded();
    }
  }

  /**
   * Executes when the DOM is fully loaded.
   */
  onDOMLoaded() {
    this.setupEventListeners();
    this.initCharts();
    this.renderProjects();
    console.log('Dashboard Enhanced Initialized');
  }

  /**
   * Sets up all event listeners for the dashboard.
   */
  setupEventListeners() {
    // Filter tabs
    this.elements.filterTabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.handleFilterClick(e));
    });

    // Sort dropdown
    if (this.elements.sortSelect) {
      this.elements.sortSelect.addEventListener('change', (e) => this.handleSortChange(e));
    }

    // View toggle buttons
    this.elements.viewButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleViewToggle(e));
    });

    // "New Proposal" button
    if (this.elements.newProposalBtn) {
      this.elements.newProposalBtn.addEventListener('click', () => this.modals.newProposal.open());
    }

    // Search functionality
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
    if (this.elements.searchButton) {
        this.elements.searchButton.addEventListener('click', () => this.handleSearch(this.elements.searchInput.value));
    }

    // Advanced filters
    if (this.elements.simpleFilterBtn) {
      this.elements.simpleFilterBtn.addEventListener('click', () => this.toggleSimpleFilters());
    }
    if (this.elements.applyFiltersBtn) {
      this.elements.applyFiltersBtn.addEventListener('click', () => this.applyAdvancedFilters());
    }
    if (this.elements.resetFiltersBtn) {
      this.elements.resetFiltersBtn.addEventListener('click', () => this.resetAdvancedFilters());
    }

    // Modal actions
    this.setupModalEventListeners();

    // Other buttons
    if (this.elements.viewAllActivityBtn) {
        this.elements.viewAllActivityBtn.addEventListener('click', () => this.showAllActivity());
    }
    if (this.elements.viewAllProjectsBtn) {
        this.elements.viewAllProjectsBtn.addEventListener('click', () => this.showAllProjects());
    }

    // Event delegation for project cards
    if (this.elements.projectGrid) {
        this.elements.projectGrid.addEventListener('click', (e) => this.handleProjectCardClick(e));
    }
    document.body.addEventListener('click', (e) => this.handleFeaturedProjectClick(e));
  }

  /**
   * Sets up event listeners for modals.
   */
  setupModalEventListeners() {
    // Contribution Modal
    document.getElementById('contributionModal').addEventListener('click', (e) => {
      if (e.target.matches('.btn--primary')) this.submitContribution();
      if (e.target.matches('#cancelContribution, #closeContributionModal')) this.modals.contribution.close();
      if (e.target.matches('.quick-amount-buttons .btn')) {
        this.setQuickAmount(e.target.textContent.replace('€', ''));
      }
    });

    // Project Details Modal
    document.getElementById('projectDetailsModal').addEventListener('click', (e) => {
      if (e.target.matches('#closeProjectDetails, #closeProjectDetailsModal')) this.modals.projectDetails.close();
    });

    // New Proposal Modal
    document.getElementById('newProposalModal').addEventListener('click', (e) => {
      if (e.target.matches('.btn--primary')) this.submitProposal();
      if (e.target.matches('#cancelProposal, #closeNewProposalModal')) this.modals.newProposal.close();
    });
  }

  /**
   * Renders the project cards in the grid.
   */
  renderProjects() {
    if (!this.elements.projectGrid) return;

    const filteredProjects = this.getFilteredProjects();
    const sortedProjects = this.getSortedProjects(filteredProjects);

    this.elements.projectGrid.innerHTML = sortedProjects.map(project => this.createProjectCardHTML(project)).join('');
    
    showNotification(`Mostrando ${sortedProjects.length} proyectos.`, 'info');
  }

  /**
   * Creates the HTML for a single project card.
   * @param {object} project - The project data.
   * @returns {string} The HTML string for the project card.
   */
  createProjectCardHTML(project) {
    const statusBadges = {
      'En Votación': 'badge--primary',
      'En Progreso': 'badge--success',
      'Propuesta': 'badge--warning',
      'Completado': 'badge--secondary',
    };

    return `
      <div class="project-card" data-id="${project.id}">
        <div class="project-card__header">
          <div class="project-card__category">
            <i class="fas fa-leaf"></i>
            <span>${project.category}</span>
          </div>
          <span class="badge ${statusBadges[project.status] || 'badge--secondary'}">${project.status}</span>
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">${project.name}</h3>
          <p class="project-card__description">${project.description.substring(0, 100)}...</p>
          <div class="project-card__progress">
            <div class="project-card__progress-info">
              <span class="project-card__progress-label">${this.formatCurrency(project.raised)} de ${this.formatCurrency(project.budget)}</span>
              <span class="project-card__progress-percentage">${project.progress}%</span>
            </div>
            <div class="project-card__progress-bar">
              <div class="project-card__progress-value" style="width: ${project.progress}%"></div>
            </div>
          </div>
          <div class="project-card__meta">
            <div class="project-card__meta-item">
              <i class="fas fa-users"></i>
              <span>${project.contributors} contribuyentes</span>
            </div>
            <div class="project-card__meta-item">
              <i class="fas fa-calendar-alt"></i>
              <span>${project.daysLeft > 0 ? `Finaliza en ${project.daysLeft} días` : 'Finalizado'}</span>
            </div>
          </div>
        </div>
        <div class="project-card__footer">
          <button class="btn btn--outline btn--sm" data-action="view-details" data-id="${project.id}">
            <i class="fas fa-info-circle"></i> Ver Detalles
          </button>
          <div class="project-card__actions">
            ${project.status !== 'Completado' ? `
              <button class="btn btn--success btn--sm" data-action="vote" data-id="${project.id}">
                <i class="fas fa-thumbs-up"></i> Votar
              </button>
              <button class="btn btn--primary btn--sm" data-action="contribute" data-id="${project.id}">
                <i class="fas fa-heart"></i> Contribuir
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Handles clicks on the filter tabs.
   * @param {Event} e - The click event.
   */
  handleFilterClick(e) {
    const tab = e.currentTarget;
    this.elements.filterTabs.forEach(t => t.classList.remove('dashboard-filters__tab--active'));
    tab.classList.add('dashboard-filters__tab--active');
    this.currentFilter = tab.dataset.filter;
    this.renderProjects();
  }

  /**
   * Handles changes in the sort dropdown.
   * @param {Event} e - The change event.
   */
  handleSortChange(e) {
    this.currentSort = e.target.value;
    this.renderProjects();
  }

  /**
   * Handles clicks on the view toggle buttons.
   * @param {Event} e - The click event.
   */
  handleViewToggle(e) {
    const button = e.currentTarget;
    this.elements.viewButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    this.currentView = button.dataset.view;

    if (this.currentView === 'list') {
      this.elements.projectGrid.classList.add('project-grid--list');
    } else {
      this.elements.projectGrid.classList.remove('project-grid--list');
    }
    showNotification(`Vista de ${this.currentView === 'list' ? 'lista' : 'cuadrícula'} activada.`, 'info');
  }

  /**
   * Handles search input.
   * @param {string} query - The search query.
   */
  handleSearch(query) {
    this.currentSearchQuery = query.toLowerCase();
    this.renderProjects();
  }

  /**
   * Toggles the simple filters panel.
   */
  toggleSimpleFilters() {
    const panel = this.elements.simpleFilterPanel;
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
  }
  
  /**
   * Applies advanced filters and re-renders the project list.
   */
  applyAdvancedFilters() {
    // In a real app, you would get values from the filter inputs
    showNotification('Filtros avanzados aplicados.', 'success');
    this.toggleSimpleFilters();
    this.renderProjects();
  }

  /**
   * Resets advanced filters.
   */
  resetAdvancedFilters() {
    // In a real app, you would reset the filter inputs
    showNotification('Filtros restablecidos.', 'info');
    this.renderProjects();
  }

  /**
   * Handles clicks within the project grid using event delegation.
   * @param {Event} e - The click event.
   */
  handleProjectCardClick(e) {
    const target = e.target.closest('button[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const projectId = target.dataset.id;
    const project = this.projects.find(p => p.id === projectId);

    if (!project) return;

    switch (action) {
      case 'view-details':
        this.viewProjectDetails(project);
        break;
      case 'contribute':
        this.openContribution(project.name);
        break;
      case 'vote':
        this.voteForProject(project.id, true);
        break;
    }
  }

  /**
   * Handles clicks on featured projects.
   */
  handleFeaturedProjectClick(e) {
    const target = e.target.closest('.featured-project__actions button');
    if (!target) return;

    const projectElement = e.target.closest('.featured-project');
    const projectId = projectElement.dataset.id;
    const project = this.projects.find(p => p.id === projectId);

    if (!project) return;

    if (target.textContent.includes('Contribuir')) {
        this.openContribution(project.name);
    } else if (target.textContent.includes('Ver Detalles')) {
        this.viewProjectDetails(project);
    } else if (target.querySelector('.fa-share-alt')) {
        this.shareProject(project.id);
    }
  }

  /**
   * Filters the projects based on the current filter and search query.
   * @returns {Array} The filtered list of projects.
   */
  getFilteredProjects() {
    let filtered = this.projects;

    // Filter by tab
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(project => {
        switch (this.currentFilter) {
          case 'voting':
            return project.status === 'En Votación' || project.status === 'Propuesta';
          case 'progress':
            return project.status === 'En Progreso';
          case 'completed':
            return project.status === 'Completado';
          case 'my-contributions':
            return this.userContributions.some(c => c.projectId === project.id);
          default:
            return true;
        }
      });
    }

    // Filter by search query
    if (this.currentSearchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(this.currentSearchQuery) ||
        project.description.toLowerCase().includes(this.currentSearchQuery)
      );
    }

    return filtered;
  }

  /**
   * Sorts the projects based on the current sort order.
   * @param {Array} projects - The list of projects to sort.
   * @returns {Array} The sorted list of projects.
   */
  getSortedProjects(projects) {
    const sorted = [...projects];
    switch (this.currentSort) {
      case 'popular':
        sorted.sort((a, b) => b.contributors - a.contributors);
        break;
      case 'funded':
        sorted.sort((a, b) => b.progress - a.progress);
        break;
      case 'ending':
        sorted.sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case 'recent':
      default:
        // Assuming default order is recent
        break;
    }
    return sorted;
  }

  /**
   * Displays the project details in a modal.
   * @param {object} project - The project to display.
   */
  viewProjectDetails(project) {
    const detailsContent = `
      <div class="project-details">
        <h2 class="text-xl font-bold mb-3">${project.name}</h2>
        <p class="text-slate-300 mb-4">${project.description}</p>
        <!-- Add more detailed info here -->
        <div class="grid grid-cols-2 gap-4">
            <div><strong>Categoría:</strong> ${project.category}</div>
            <div><strong>Estado:</strong> ${project.status}</div>
            <div><strong>Presupuesto:</strong> ${this.formatCurrency(project.budget)}</div>
            <div><strong>Recaudado:</strong> ${this.formatCurrency(project.raised)} (${project.progress}%)</div>
            <div><strong>Contribuyentes:</strong> ${project.contributors}</div>
            <div><strong>Días restantes:</strong> ${project.daysLeft}</div>
        </div>
      </div>
    `;
    this.modals.projectDetails.setContent(detailsContent);
    this.modals.projectDetails.open();
  }

  /**
   * Opens the contribution modal for a project.
   * @param {string} projectName - The name of the project.
   */
  openContribution(projectName) {
    const modalProjectName = document.getElementById('modalProjectName');
    if (modalProjectName) {
      modalProjectName.textContent = projectName;
    }
    document.getElementById('amountInput').value = '';
    this.modals.contribution.open();
  }

  /**
   * Sets a predefined amount in the contribution modal.
   * @param {number|string} amount - The amount to set.
   */
  setQuickAmount(amount) {
    document.getElementById('amountInput').value = amount;
  }

  /**
   * Submits a contribution.
   */
  submitContribution() {
    const projectName = document.getElementById('modalProjectName').textContent;
    const amount = document.getElementById('amountInput').value;

    if (!amount || amount < 5) {
      showNotification('Por favor, introduce una cantidad válida (mínimo 5€).', 'error');
      return;
    }

    this.modals.contribution.close();
    showNotification(`¡Gracias por tu contribución de ${this.formatCurrency(amount)} a "${projectName}"!`, 'success');
    // Here you would typically send data to a server
  }

  /**
   * Submits a new proposal.
   */
  submitProposal() {
    const title = document.getElementById('proposalTitle').value;
    if (!title) {
      showNotification('Por favor, introduce un título para la propuesta.', 'error');
      return;
    }

    this.modals.newProposal.close();
    showNotification(`Tu propuesta "${title}" ha sido enviada para revisión.`, 'success');
    // Here you would typically send data to a server
  }

  /**
   * Votes for a project.
   * @param {string} projectId - The ID of the project.
   * @param {boolean} inFavor - True if the vote is in favor, false otherwise.
   */
  voteForProject(projectId, inFavor) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      showNotification(`Has votado ${inFavor ? 'a favor' : 'en contra'} de "${project.name}".`, 'success');
      // Here you would typically send data to a server
    }
  }

  /**
   * Shares a project.
   * @param {string} projectId - The ID of the project.
   */
  shareProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      if (navigator.share) {
        navigator.share({
          title: project.name,
          text: `Echa un vistazo a este proyecto: ${project.name}`,
          url: window.location.href,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showNotification('Enlace del proyecto copiado al portapapeles.', 'success');
        });
      }
    }
  }

  /**
   * Shows more activity items.
   */
  showAllActivity() {
    showNotification('Cargando más actividad...', 'info');
    // In a real app, this would fetch more data
  }

  /**
   * Shows all projects (e.g., navigates to a new page or loads more).
   */
  showAllProjects() {
    showNotification('Mostrando todos los proyectos.', 'info');
    // In a real app, this might remove pagination or load all items
  }

  /**
   * Initializes the charts on the dashboard.
   */
  initCharts() {
    if (typeof ChartUtils === 'undefined') {
      console.error('ChartUtils is not loaded.');
      return;
    }
    ChartUtils.createMiniLineChart('fundsChart', this.chartData.funds, '#3b82f6');
    ChartUtils.createMiniBarChart('projectsChart', this.chartData.projects, '#10b981');
    ChartUtils.createMiniLineChart('contributorsChart', this.chartData.contributors, '#f59e0b');
    ChartUtils.createMiniLineChart('completedChart', this.chartData.completed, '#8b5cf6');
  }

  /**
   * Formats a number as currency.
   * @param {number} amount - The amount to format.
   * @returns {string} The formatted currency string.
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  }
}

// Dummy data - in a real app, this would be loaded from an API or be in its own file.
window.civicDaoData = {
    projects: [
        { id: 'huertos', name: 'Red de Huertos Urbanos Comunitarios', category: 'Sostenibilidad', status: 'En Votación', description: 'Crear una red de 12 huertos comunitarios...', budget: 45000, raised: 40050, progress: 89, contributors: 1247, daysLeft: 5 },
        { id: 'energia', name: 'Centro de Formación en Energías Renovables', category: 'Educación', status: 'En Votación', description: 'Establecer un centro de formación técnica...', budget: 28500, raised: 26790, progress: 94, contributors: 756, daysLeft: 12 },
        { id: 'reciclaje', name: 'Programa de Reciclaje Comunitario', category: 'Sostenibilidad', status: 'En Progreso', description: 'Implementación de un sistema de reciclaje...', budget: 32750, raised: 14738, progress: 45, contributors: 423, daysLeft: 0 },
        { id: 'taller', name: 'Taller de Reparación Comunitario', category: 'Tecnología', status: 'Propuesta', description: 'Espacio comunitario equipado con herramientas...', budget: 18500, raised: 0, progress: 0, contributors: 0, daysLeft: 0 },
        { id: 'biblioteca', name: 'Biblioteca de Herramientas y Objetos', category: 'Cultura', status: 'Completado', description: 'Sistema de préstamo comunitario de herramientas...', budget: 15000, raised: 15000, progress: 100, contributors: 378, daysLeft: 0 }
    ],
    userContributions: [
        { projectId: 'huertos', amount: 50 },
        { projectId: 'energia', amount: 25 }
    ],
    chartData: {
        funds: [12500, 18700, 22400, 28900, 32600, 38200, 45000, 52300, 58700, 65200, 72800, 78500],
        projects: [5, 8, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30],
        contributors: [120, 180, 250, 320, 410, 480, 560, 650, 780, 920, 1050, 1245],
        completed: [2, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 18]
    }
};

// Instantiate and initialize the dashboard
const dashboard = new Dashboard();
dashboard.init();
