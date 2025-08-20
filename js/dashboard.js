/**
 * Dashboard JavaScript
 * Handles functionality specific to the dashboard page
 */

// Project data (would come from an API in a real application)
const projects = [
  {
    id: 'huertos',
    name: 'Red de Huertos Urbanos Comunitarios',
    category: 'Sostenibilidad',
    status: 'En Votación',
    description: 'Crear una red de 12 huertos comunitarios en azoteas y solares vacíos, proporcionando alimentos frescos, educación ambiental y espacios de encuentro vecinal.',
    budget: 45000,
    raised: 40050,
    progress: 89,
    votes: {
      favor: 1108,
      against: 139
    },
    contributors: 1247,
    daysLeft: 5,
    location: 'Varios distritos',
    beneficiaries: '2,500 familias',
    image: '../assets/images/projects/huertos.jpg',
    updates: [
      {
        date: '2025-05-10',
        title: 'Identificados todos los espacios',
        content: 'Hemos completado la identificación de los 12 espacios para los huertos urbanos.'
      }
    ]
  },
  {
    id: 'energia',
    name: 'Centro de Formación en Energías Renovables',
    category: 'Educación',
    status: 'En Votación',
    description: 'Establecer un centro de formación técnica en instalación de placas solares, eólica doméstica y eficiencia energética. Incluye talleres gratuitos para vecinos.',
    budget: 28500,
    raised: 26790,
    progress: 94,
    votes: {
      favor: 712,
      against: 44
    },
    contributors: 756,
    daysLeft: 12,
    location: 'Centro Cívico Municipal',
    beneficiaries: '500 personas al año',
    image: '../assets/images/projects/energia.jpg',
    updates: []
  },
  {
    id: 'reciclaje',
    name: 'Programa de Reciclaje Comunitario',
    category: 'Sostenibilidad',
    status: 'En Progreso',
    description: 'Implementación de un sistema de reciclaje comunitario con puntos de recogida selectiva y programa educativo para escuelas y centros comunitarios.',
    budget: 32750,
    raised: 14738,
    progress: 45,
    votes: {
      favor: 892,
      against: 76
    },
    contributors: 423,
    daysLeft: 0,
    location: 'Todo el municipio',
    beneficiaries: 'Toda la comunidad',
    image: '../assets/images/projects/reciclaje.jpg',
    updates: [
      {
        date: '2024-05-08',
        title: 'Instalados 8 puntos de recogida',
        content: 'Se han instalado 8 de los 20 puntos de recogida previstos.'
      }
    ],
    completedTasks: '8 de 20 puntos instalados'
  },
  {
    id: 'taller',
    name: 'Taller de Reparación Comunitario',
    category: 'Tecnología',
    status: 'Propuesta',
    description: 'Espacio comunitario equipado con herramientas y conocimiento para reparar electrodomésticos, bicicletas y otros objetos, promoviendo la economía circular.',
    budget: 18500,
    raised: 0,
    progress: 0,
    votes: {
      favor: 234,
      against: 12
    },
    contributors: 0,
    daysLeft: 0,
    location: 'Antiguo local municipal',
    beneficiaries: 'Todos los vecinos',
    image: '../assets/images/projects/taller.jpg',
    updates: [],
    author: 'Ana Martínez',
    proposedDays: 2
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca de Herramientas y Objetos',
    category: 'Cultura',
    status: 'Completado',
    description: 'Sistema de préstamo comunitario de herramientas, equipamiento y otros objetos de uso ocasional para reducir el consumo y fomentar la economía colaborativa.',
    budget: 15000,
    raised: 15000,
    progress: 100,
    votes: {
      favor: 645,
      against: 23
    },
    contributors: 378,
    daysLeft: 0,
    location: 'Centro Cultural',
    beneficiaries: 'Todos los vecinos',
    image: '../assets/images/projects/biblioteca.jpg',
    updates: [
      {
        date: '2025-04-15',
        title: 'Proyecto completado',
        content: 'La biblioteca de herramientas está operativa con más de 200 objetos disponibles.'
      }
    ],
    completionDate: '2025-04-15'
  }
];

// User contributions (would come from an API in a real application)
const userContributions = [
  {
    projectId: 'huertos',
    amount: 50,
    date: '2025-05-01'
  },
  {
    projectId: 'energia',
    amount: 25,
    date: '2025-04-20'
  }
];

// Chart data for statistics
const chartData = {
  funds: [12500, 18700, 22400, 28900, 32600, 38200, 45000, 52300, 58700, 65200, 72800, 78500],
  projects: [5, 8, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30],
  contributors: [120, 180, 250, 320, 410, 480, 560, 650, 780, 920, 1050, 1245],
  completed: [2, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 18]
};

// Initialize dashboard
function initDashboard() {
  setupMobileMenu();
  setupProjectCards();
  setupModals();
  setupSearch();
  setupFilterTabs(); // Añadido para activar los filtros
  setupViewToggle(); // Añadido para activar la vista
  initCharts();
}

// Setup mobile menu
function setupMobileMenu() {
  // Inicialización directa del menú hamburguesa
  const hamburger = document.getElementById("dashboardHamburger");
  const mobileMenu = document.getElementById("dashboardMobileMenu");
  
  if (hamburger && mobileMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", function() {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      console.log("Hamburger clicked - Menu toggled");
    });
    
    // Close menu when clicking on a link (mobile)
    mobileMenu.addEventListener("click", function(e) {
      if (e.target.tagName === "A") {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });
  } else {
    console.error("Hamburger menu elements not found:", 
                 hamburger ? "Hamburger found" : "Hamburger NOT found", 
                 mobileMenu ? "Mobile menu found" : "Mobile menu NOT found");
  }
  
  // También inicializamos la clase Navbar para mantener otras funcionalidades
  const navbar = new Navbar('dashboard');
  navbar.init();
}

// Setup project cards
function setupProjectCards() {
  // In a real application, this would dynamically create all project cards
  // For now, we'll just enhance the existing ones with proper data
  console.log('Project cards initialized');
}

// Setup all modals
function setupModals() {
  // Contribution modal
  const contributionModal = new Modal('contributionModal');
  contributionModal.init();
  
  // Setup contribution form submission
  const confirmContributionBtn = document.querySelector('#contributionModal .btn--primary');
  if (confirmContributionBtn) {
    confirmContributionBtn.addEventListener('click', function() {
      submitContribution();
    });
  }
  
  // Cancel contribution button
  const cancelContributionBtn = document.getElementById('cancelContribution');
  if (cancelContributionBtn) {
    cancelContributionBtn.addEventListener('click', function() {
      contributionModal.close();
    });
  }
  
  // Close contribution modal button
  const closeContributionModalBtn = document.getElementById('closeContributionModal');
  if (closeContributionModalBtn) {
    closeContributionModalBtn.addEventListener('click', function() {
      contributionModal.close();
    });
  }
  
  // Project details modal
  const projectDetailsModal = new Modal('projectDetailsModal');
  projectDetailsModal.init();
  
  // Close project details buttons
  const closeProjectDetailsBtn = document.getElementById('closeProjectDetails');
  const closeProjectDetailsModalBtn = document.getElementById('closeProjectDetailsModal');
  
  if (closeProjectDetailsBtn) {
    closeProjectDetailsBtn.addEventListener('click', function() {
      projectDetailsModal.close();
    });
  }
  
  if (closeProjectDetailsModalBtn) {
    closeProjectDetailsModalBtn.addEventListener('click', function() {
      projectDetailsModal.close();
    });
  }
  
  // New proposal modal
  const newProposalModal = new Modal('newProposalModal');
  newProposalModal.init();
  
  // New proposal button
  const newProposalBtn = document.getElementById('newProposalBtn');
  if (newProposalBtn) {
    newProposalBtn.addEventListener('click', function() {
      newProposalModal.open();
    });
  }
  
  // Submit proposal button
  const submitProposalBtn = document.querySelector('#newProposalModal .btn--primary');
  if (submitProposalBtn) {
    submitProposalBtn.addEventListener('click', function() {
      submitProposal();
    });
  }
  
  // Cancel proposal button
  const cancelProposalBtn = document.getElementById('cancelProposal');
  if (cancelProposalBtn) {
    cancelProposalBtn.addEventListener('click', function() {
      newProposalModal.close();
    });
  }
  
  // Close new proposal modal button
  const closeNewProposalModalBtn = document.getElementById('closeNewProposalModal');
  if (closeNewProposalModalBtn) {
    closeNewProposalModalBtn.addEventListener('click', function() {
      newProposalModal.close();
    });
  }
  
  // Setup "Ver Todo" button in activity section
  const viewAllActivityBtn = document.querySelector('.dashboard-activity__header .btn');
  if (viewAllActivityBtn) {
    viewAllActivityBtn.addEventListener('click', function() {
      showAllActivity();
    });
  }
  
  // Setup "Ver Todos los Proyectos" button
  const viewAllProjectsBtn = document.querySelector('.text-center .btn--outline');
  if (viewAllProjectsBtn) {
    viewAllProjectsBtn.addEventListener('click', function() {
      showAllProjects();
    });
  }
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchProjects');
  if (searchInput) {
    // Create search instance with project data
    const searchOptions = {
      inputElement: searchInput,
      searchData: projects.map(project => ({
        id: project.id,
        title: project.name,
        subtitle: project.category,
        description: project.description,
        type: 'project'
      })),
      onSearch: function(query) {
        searchProjects(query);
      },
      onSelect: function(id) {
        viewProjectDetails(id);
      }
    };
    
    const search = new Search(searchOptions);
  }
  
  // Setup sort dropdown
  const sortSelect = document.querySelector('.dashboard-filters__sort select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      sortProjects(this.value);
    });
  }
}

// Search projects
function searchProjects(query) {
  query = query.toLowerCase();
  
  const projectCards = document.querySelectorAll('.project-card');
  let found = false;
  
  projectCards.forEach(card => {
    const title = card.querySelector('.project-card__title').textContent.toLowerCase();
    const description = card.querySelector('.project-card__description').textContent.toLowerCase();
    const category = card.querySelector('.project-card__category span').textContent.toLowerCase();
    
    if (title.includes(query) || description.includes(query) || category.includes(query)) {
      card.style.display = 'block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show notification if no results
  if (!found) {
    showNotification('No se encontraron proyectos que coincidan con tu búsqueda.', 'info');
  }
}

// Sort projects
function sortProjects(sortBy) {
  const projectGrid = document.querySelector('.project-grid');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  
  switch (sortBy) {
    case 'recent':
      // Sort by most recent (for demo, we'll just reverse the current order)
      projectCards.reverse();
      break;
    case 'popular':
      // Sort by number of contributors (highest first)
      projectCards.sort((a, b) => {
        const aContributors = parseInt(a.querySelector('.project-card__meta-item span').textContent);
        const bContributors = parseInt(b.querySelector('.project-card__meta-item span').textContent);
        return bContributors - aContributors;
      });
      break;
    case 'funded':
      // Sort by funding percentage (highest first)
      projectCards.sort((a, b) => {
        const aProgress = a.querySelector('.project-card__progress-value') ? 
          parseInt(a.querySelector('.project-card__progress-value').style.width) : 0;
        const bProgress = b.querySelector('.project-card__progress-value') ? 
          parseInt(b.querySelector('.project-card__progress-value').style.width) : 0;
        return bProgress - aProgress;
      });
      break;
    case 'ending':
      // Sort by days left (lowest first)
      projectCards.sort((a, b) => {
        const aDays = a.querySelector('.project-card__meta-item:nth-child(2) span').textContent.includes('días') ? 
          parseInt(a.querySelector('.project-card__meta-item:nth-child(2) span').textContent) : 999;
        const bDays = b.querySelector('.project-card__meta-item:nth-child(2) span').textContent.includes('días') ? 
          parseInt(b.querySelector('.project-card__meta-item:nth-child(2) span').textContent) : 999;
        return aDays - bDays;
      });
      break;
  }
  
  // Clear and re-append sorted cards
  projectCards.forEach(card => {
    projectGrid.appendChild(card);
  });
  
  showNotification('Proyectos ordenados correctamente.', 'success');
}

// Initialize charts
function initCharts() {
  // Use ChartUtils to create mini charts
  ChartUtils.createMiniLineChart('fundsChart', chartData.funds, '#3b82f6', {
    fillArea: true,
    showDots: true,
    lineWidth: 2,
    fillOpacity: 0.2
  });
  
  ChartUtils.createMiniBarChart('projectsChart', chartData.projects, '#10b981', {
    barSpacing: 2,
    barOpacity: 0.8
  });
  
  ChartUtils.createMiniLineChart('contributorsChart', chartData.contributors, '#f59e0b', {
    fillArea: true,
    showDots: false,
    lineWidth: 2,
    fillOpacity: 0.2
  });
  
  ChartUtils.createMiniLineChart('completedChart', chartData.completed, '#8b5cf6', {
    fillArea: false,
    showDots: true,
    lineWidth: 2
  });
}

// Vote for a project
function voteForProject(projectId, inFavor) {
  // Find the project
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    // Update vote count in the data
    if (inFavor) {
      project.votes.favor++;
    } else {
      project.votes.against++;
    }
    
    // In a real app, this would send the vote to the backend
    
    // Show success notification
    showNotification(`Has votado ${inFavor ? 'a favor' : 'en contra'} del proyecto "${project.name}".`, 'success');
    
    // Update UI vote count
    const projectCard = document.querySelector(`.project-card[data-id="${projectId}"]`);
    if (projectCard) {
      const voteCount = projectCard.querySelector(inFavor ? 
        '.project-card__vote-item--favor span' : 
        '.project-card__vote-item--against span');
      
      if (voteCount) {
        const currentCount = parseInt(voteCount.textContent);
        voteCount.textContent = `${currentCount + 1} ${inFavor ? 'a favor' : 'en contra'}`;
      }
    }
  }
}



// Función para cargar imágenes de la galería
function loadProjectGallery(projectId) {
  // En una aplicación real, estas imágenes se cargarían desde el servidor
  // Para esta demo, usamos imágenes de placeholder
  const placeholderImages = [
    '../assets/images/projects/huertos.jpg',
    '../assets/images/projects/energia.jpg',
    '../assets/images/projects/reciclaje.jpg',
    '../assets/images/projects/taller.jpg'
  ];
  
  // Devolver 3 imágenes aleatorias para cada proyecto
  return [
    placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
  ];
}

// Función mejorada para ver detalles del proyecto
function viewProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const detailsHTML = `
        <div class="project-details">
            <!-- Cabecera con imagen -->
            <div class="project-details__hero">
                <img src="${project.image}" alt="${project.name}" class="project-details__image">
                <div class="project-details__overlay">
                    <span class="badge badge--${project.status.toLowerCase()}">${project.status}</span>
                </div>
            </div>

            <!-- Información principal -->
            <div class="project-details__main">
                <h2 class="project-details__title">${project.name}</h2>
                <p class="project-details__category">
                    <i class="fas fa-tag"></i> ${project.category}
                </p>
                
                <!-- Métricas clave -->
                <div class="project-details__metrics">
                    <div class="metric">
                        <i class="fas fa-coins"></i>
                        <span class="metric__value">€${project.budget.toLocaleString()}</span>
                        <span class="metric__label">Presupuesto</span>
                    </div>
                    <div class="metric">
                        <i class="fas fa-users"></i>
                        <span class="metric__value">${project.contributors}</span>
                        <span class="metric__label">Contribuyentes</span>
                    </div>
                    <div class="metric">
                        <i class="fas fa-clock"></i>
                        <span class="metric__value">${project.daysLeft}</span>
                        <span class="metric__label">Días restantes</span>
                    </div>
                </div>

                <!-- Barra de progreso -->
                <div class="project-details__progress">
                    <div class="progress">
                        <div class="progress__bar" style="width: ${project.progress}%"></div>
                    </div>
                    <div class="progress__stats">
                        <span class="progress__amount">€${project.raised.toLocaleString()} recaudados</span>
                        <span class="progress__percentage">${project.progress}%</span>
                    </div>
                </div>

                <!-- Descripción -->
                <div class="project-details__description">
                    <h3>Sobre el proyecto</h3>
                    <p>${project.description}</p>
                </div>

                <!-- Información adicional -->
                <div class="project-details__info">
                    <div class="info-grid">
                        <div class="info-item">
                            <h4><i class="fas fa-map-marker-alt"></i> Ubicación</h4>
                            <p>${project.location}</p>
                        </div>
                        <div class="info-item">
                            <h4><i class="fas fa-users"></i> Beneficiarios</h4>
                            <p>${project.beneficiaries}</p>
                        </div>
                        <div class="info-item">
                            <h4><i class="fas fa-vote-yea"></i> Votos</h4>
                            <p>
                                <span class="vote vote--up">${project.votes.favor} <i class="fas fa-thumbs-up"></i></span>
                                <span class="vote vote--down">${project.votes.against} <i class="fas fa-thumbs-down"></i></span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Actualizaciones -->
                ${project.updates && project.updates.length ? `
                    <div class="project-details__updates">
                        <h3>Actualizaciones recientes</h3>
                        <div class="timeline">
                            ${project.updates.map(update => `
                                <div class="timeline__item">
                                    <div class="timeline__date">${update.date}</div>
                                    <div class="timeline__content">
                                        <h4>${update.title}</h4>
                                        <p>${update.content}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    document.getElementById('projectDetailsContent').innerHTML = detailsHTML;
    
    // Actualizar los botones de acción
    const contributeButton = document.getElementById('contributeButton');
    const shareButton = document.getElementById('shareButton');
    
    contributeButton.onclick = () => openContribution(project.name);
    shareButton.onclick = () => shareProjectDetails(project.id);
    
    // Abrir el modal
    const modal = new Modal('projectDetailsModal');
    modal.open();
}

// Función mejorada para contribuir
function openContribution(projectName) {
    const contributionModal = new Modal('contributionModal');
    document.querySelector('#contributionModal .modal__title').textContent = 
        `Contribuir a: ${projectName}`;
    contributionModal.open();
}

// Función para compartir proyecto
function shareProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const shareURL = `${window.location.origin}/proyecto/${projectId}`;
    
    // Crear menú de compartir
    const shareMenu = document.createElement('div');
    shareMenu.className = 'share-menu';
    shareMenu.innerHTML = `
        <button onclick="shareVia('twitter', '${shareURL}')">
            <i class="fab fa-twitter"></i> Twitter
        </button>
        <button onclick="shareVia('facebook', '${shareURL}')">
            <i class="fab fa-facebook"></i> Facebook
        </button>
        <button onclick="shareVia('copy', '${shareURL}')">
            <i class="fas fa-copy"></i> Copiar enlace
        </button>
    `;
    
    // Mostrar menú de compartir
    document.body.appendChild(shareMenu);
}

// Función para compartir vía diferentes plataformas
function shareVia(platform, url) {
    switch(platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
            break;
        case 'copy':
            navigator.clipboard.writeText(url)
                .then(() => showNotification('Enlace copiado al portapapeles', 'success'));
            break;
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Submit contribution
function submitContribution() {
  const projectName = document.getElementById('modalProjectName').textContent;
  const amount = document.getElementById('amountInput').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const isAnonymous = document.querySelector('#contributionModal input[type="checkbox"]').checked;
  
  // Validate amount
  if (!amount || amount < 5) {
    showNotification('Por favor, introduce una cantidad válida (mínimo 5€).', 'error');
    return;
  }
  
  // In a real app, this would send the contribution to the backend
  
  // Close modal
  const modal = new Modal('contributionModal');
  modal.close();
  
  // Show success notification
  showNotification(`¡Gracias por tu contribución de ${formatCurrency(amount)} al proyecto "${projectName}"!`, 'success');
  
  // Update UI (in a real app, this would be more sophisticated)
  // For demo purposes, we'll just update the first project that matches the name
  const project = projects.find(p => p.name === projectName);
  if (project) {
    project.raised += parseFloat(amount);
    project.progress = Math.min(100, Math.round((project.raised / project.budget) * 100));
    project.contributors++;
    
    // Add to user contributions
    userContributions.push({
      projectId: project.id,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0]
    });
  }
  
  // Add to recent activity
  addRecentActivity({
    type: 'contribution',
    user: 'Tú',
    project: projectName,
    amount: amount,
    time: 'Ahora mismo'
  });
}

// Set quick amount in contribution modal
function setQuickAmount(amount) {
  const amountInput = document.getElementById('amountInput');
  if (amountInput) {
    amountInput.value = amount;
  }
}

// Submit new proposal
function submitProposal() {
  const title = document.getElementById('proposalTitle').value;
  const category = document.getElementById('proposalCategory').value;
  const description = document.getElementById('proposalDescription').value;
  const budget = document.getElementById('proposalBudget').value;
  const beneficiaries = document.getElementById('proposalBeneficiaries').value;
  const location = document.getElementById('proposalLocation').value;
  
  // Validate form
  if (!title || !category || !description || !budget || !beneficiaries || !location) {
    showNotification('Por favor, completa todos los campos del formulario.', 'error');
    return;
  }
  
  // In a real app, this would send the proposal to the backend
  
  // Close modal
  const modal = new Modal('newProposalModal');
  modal.close();
  
  // Show success notification
  showNotification(`Tu propuesta "${title}" ha sido enviada correctamente y está pendiente de revisión.`, 'success');
  
  // Add to recent activity
  addRecentActivity({
    type: 'proposal',
    user: 'Tú',
    project: title,
    time: 'Ahora mismo'
  });
  
  // Reset form
  document.getElementById('proposalTitle').value = '';
  document.getElementById('proposalCategory').value = '';
  document.getElementById('proposalDescription').value = '';
  document.getElementById('proposalBudget').value = '';
  document.getElementById('proposalBeneficiaries').value = '';
  document.getElementById('proposalLocation').value = '';
}

// Setup filter tabs
function setupFilterTabs() {
  const tabs = document.querySelectorAll('.dashboard-filters__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('dashboard-filters__tab--active'));
      // Add active class to clicked tab
      this.classList.add('dashboard-filters__tab--active');
      
      // Filter projects based on selected tab
      const filter = this.getAttribute('data-filter');
      filterProjects(filter);
    });
  });
}

// Filter projects
function filterProjects(filter) {
  const projectCards = document.querySelectorAll('.project-card');
  let visibleCount = 0;
  
  projectCards.forEach(card => {
    const status = card.querySelector('.badge').textContent;
    const projectId = card.getAttribute('data-id');
    
    switch (filter) {
      case 'all':
        card.style.display = 'block';
        visibleCount++;
        break;
      case 'voting':
        if (status === 'En Votación' || status === 'Propuesta') {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
        break;
      case 'progress':
        if (status === 'En Progreso') {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
        break;
      case 'completed':
        if (status === 'Completado') {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
        break;
      case 'my-contributions':
        // Check if user has contributed to this project
        const hasContributed = userContributions.some(c => c.projectId === projectId);
        if (hasContributed) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
        break;
    }
  });
  
  // Show notification with count
  showNotification(`Mostrando ${visibleCount} proyectos.`, 'info');
}

// Cambia la vista de proyectos
function toggleProjectView(view) {
  const grid = document.querySelector('.project-grid');
  if (view === 'list') {
    grid.classList.add('project-grid--list');
  } else {
    grid.classList.remove('project-grid--list');
  }
}

// Inicialización de eventos
document.addEventListener('DOMContentLoaded', function() {
  // Nueva Propuesta
  const newProposalBtn = document.getElementById('newProposalBtn');
  if (newProposalBtn) {
    newProposalBtn.onclick = function() {
      const modal = new Modal('newProposalModal');
      modal.open();
    };
  }

  // Filtros
  document.querySelectorAll('.dashboard-filters__tab').forEach(tab => {
    tab.onclick = function() {
      filterProjects(this.dataset.filter);
    };
  });

  // Vista de proyectos
  document.getElementById('viewGrid').onclick = () => toggleProjectView('grid');
  document.getElementById('viewList').onclick = () => toggleProjectView('list');

  // Ver todos los proyectos
  const viewAllBtn = document.getElementById('viewAllProjectsBtn');
  if (viewAllBtn) {
    viewAllBtn.onclick = showAllProjects;
  }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initDashboard();
  
  // Add data-id attributes to project cards for filtering
  document.querySelectorAll('.project-card').forEach((card, index) => {
    const title = card.querySelector('.project-card__title').textContent;
    const project = projects.find(p => p.name === title);
    if (project) {
      card.setAttribute('data-id', project.id);
    } else {
      card.setAttribute('data-id', `project-${index}`);
    }
  });
});

function initFilterButton() {
    const filterButtons = document.querySelectorAll('.dashboard-filters__tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('dashboard-filters__tab--active'));
            
            // Agregar clase activa al botón clickeado
            button.classList.add('dashboard-filters__tab--active');
            
            // Obtener el filtro seleccionado
            const filter = button.dataset.filter;
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                const status = card.dataset.status.toLowerCase();
                
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (filter === 'voting' && status === 'en votación') {
                        card.style.display = 'block';
                    } else if (filter === 'progress' && status === 'en progreso') {
                        card.style.display = 'block';
                    } else if (filter === 'completed' && status === 'completado') {
                        card.style.display = 'block';
                    } else if (filter === 'proposal' && status === 'propuesta') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Animación suave
            projectCards.forEach(card => {
                if (card.style.display === 'block') {
                    card.classList.add('fade-in');
                    setTimeout(() => card.classList.remove('fade-in'), 500);
                }
            });
        });
    });
}

// Asegurarse de que la función se ejecute cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initFilterButton);