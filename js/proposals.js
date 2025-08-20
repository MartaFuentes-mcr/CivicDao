/**
 * Proposals Page JavaScript
 * Funcionalidad para la página de propuestas
 */

// Estado de la aplicación
let currentFilter = 'all';
let currentView = 'grid';
let searchTerm = '';

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeProposals();
});

function initializeProposals() {
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar vistas
    initializeViews();
    
    // Inicializar modal de nueva propuesta
    initializeNewProposalModal();
    
    // Inicializar navegación móvil
    initializeMobileNavigation();
    
    console.log('Proposals page initialized');
}

// Filtros
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.proposals-filters__tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
            filterProposals(filter);
        });
    });
}

function setActiveFilter(filter) {
    // Remover clase activa de todos los tabs
    document.querySelectorAll('.proposals-filters__tab').forEach(tab => {
        tab.classList.remove('proposals-filters__tab--active');
    });
    
    // Agregar clase activa al tab seleccionado
    const activeTab = document.querySelector(`[data-filter="${filter}"]`);
    if (activeTab) {
        activeTab.classList.add('proposals-filters__tab--active');
    }
    
    currentFilter = filter;
}

function filterProposals(filter) {
    const proposals = document.querySelectorAll('.proposal-card');
    
    proposals.forEach(proposal => {
        const badge = proposal.querySelector('.badge');
        const badgeText = badge ? badge.textContent.toLowerCase() : '';
        
        let shouldShow = false;
        
        switch(filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'voting':
                shouldShow = badgeText.includes('votación');
                break;
            case 'approved':
                shouldShow = badgeText.includes('aprobada');
                break;
            case 'completed':
                shouldShow = badgeText.includes('completada');
                break;
            case 'rejected':
                shouldShow = badgeText.includes('rechazada');
                break;
        }
        
        if (shouldShow) {
            proposal.style.display = 'flex';
            proposal.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            proposal.style.display = 'none';
        }
    });
    
    updateProposalCount();
}

function updateProposalCount() {
    const visibleProposals = document.querySelectorAll('.proposal-card[style*="flex"]').length;
    const totalProposals = document.querySelectorAll('.proposal-card').length;
    
    // Actualizar contadores en los tabs si es necesario
    console.log(`Showing ${visibleProposals} of ${totalProposals} proposals`);
}

// Búsqueda
function initializeSearch() {
    const searchInput = document.getElementById('searchProposals');
    const searchButton = document.querySelector('.search-box__button');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase();
            searchProposals();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchProposals();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            searchProposals();
        });
    }
}

function searchProposals() {
    const proposals = document.querySelectorAll('.proposal-card');
    
    proposals.forEach(proposal => {
        const title = proposal.querySelector('.proposal-card__title')?.textContent.toLowerCase() || '';
        const description = proposal.querySelector('.proposal-card__description')?.textContent.toLowerCase() || '';
        const category = proposal.querySelector('.proposal-card__category span')?.textContent.toLowerCase() || '';
        
        const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            description.includes(searchTerm) || 
                            category.includes(searchTerm);
        
        if (matchesSearch) {
            proposal.style.display = 'flex';
        } else {
            proposal.style.display = 'none';
        }
    });
    
    // Aplicar filtro actual después de la búsqueda
    if (currentFilter !== 'all') {
        filterProposals(currentFilter);
    }
}

// Vistas
function initializeViews() {
    const viewButtons = document.querySelectorAll('[data-view]');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            setActiveView(view);
            switchView(view);
        });
    });
}

function setActiveView(view) {
    // Remover clase activa de todos los botones
    document.querySelectorAll('[data-view]').forEach(button => {
        button.classList.remove('active');
    });
    
    // Agregar clase activa al botón seleccionado
    const activeButton = document.querySelector(`[data-view="${view}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    currentView = view;
}

function switchView(view) {
    const proposalsContainer = document.querySelector('.proposals-grid');
    
    if (proposalsContainer) {
        if (view === 'list') {
            proposalsContainer.classList.add('proposals-grid--list');
        } else {
            proposalsContainer.classList.remove('proposals-grid--list');
        }
    }
}

// Acciones de propuestas
function viewProposalDetails(proposalId) {
    console.log(`Viewing details for proposal: ${proposalId}`);
    
    // Aquí se abriría un modal o se navegaría a una página de detalles
    showNotification('Funcionalidad de detalles en desarrollo', 'info');
}

function voteForProposal(proposalId, inFavor) {
    console.log(`Voting ${inFavor ? 'for' : 'against'} proposal: ${proposalId}`);
    
    // Simular votación
    const voteType = inFavor ? 'a favor' : 'en contra';
    showNotification(`Voto ${voteType} registrado correctamente`, 'success');
    
    // Aquí se haría la llamada a la API para registrar el voto
    // updateVoteCount(proposalId, inFavor);
}

function updateVoteCount(proposalId, inFavor) {
    // Actualizar contadores de votos en la interfaz
    const proposalCard = document.querySelector(`[onclick*="${proposalId}"]`)?.closest('.proposal-card');
    
    if (proposalCard) {
        const favorCount = proposalCard.querySelector('.proposal-card__vote-item--favor span');
        const againstCount = proposalCard.querySelector('.proposal-card__vote-item--against span');
        
        if (inFavor && favorCount) {
            const currentCount = parseInt(favorCount.textContent.match(/\\d+/)[0]);
            favorCount.textContent = `${currentCount + 1} a favor`;
        } else if (!inFavor && againstCount) {
            const currentCount = parseInt(againstCount.textContent.match(/\\d+/)[0]);
            againstCount.textContent = `${currentCount + 1} en contra`;
        }
    }
}

// Modal de nueva propuesta
function initializeNewProposalModal() {
    const newProposalBtn = document.getElementById('newProposalBtn');
    
    if (newProposalBtn) {
        newProposalBtn.addEventListener('click', function() {
            openNewProposalModal();
        });
    }
}

function openNewProposalModal() {
    console.log('Opening new proposal modal');
    
    // Crear modal dinámicamente
    const modal = createNewProposalModal();
    document.body.appendChild(modal);
    
    // Mostrar modal
    setTimeout(() => {
        modal.classList.add('modal--active');
    }, 10);
}

function createNewProposalModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'newProposalModal';
    modal.innerHTML = `
        <div class="modal__backdrop" onclick="closeNewProposalModal()"></div>
        <div class="modal__content">
            <div class="modal__header">
                <h2 class="modal__title">Nueva Propuesta</h2>
                <button class="modal__close" onclick="closeNewProposalModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal__body">
                <form id="newProposalForm" class="proposal-form">
                    <!-- Pasos del formulario -->
                    <div class="proposal-form__steps">
                        <div class="proposal-form__step proposal-form__step--active" data-step="1">
                            <div class="proposal-form__step-number">1</div>
                            <div class="proposal-form__step-title">Información Básica</div>
                        </div>
                        <div class="proposal-form__step" data-step="2">
                            <div class="proposal-form__step-number">2</div>
                            <div class="proposal-form__step-title">Detalles</div>
                        </div>
                        <div class="proposal-form__step" data-step="3">
                            <div class="proposal-form__step-number">3</div>
                            <div class="proposal-form__step-title">Revisión</div>
                        </div>
                    </div>
                    
                    <!-- Paso 1: Información Básica -->
                    <div class="proposal-form__step-content proposal-form__step-content--active" data-step-content="1">
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Título de la propuesta</label>
                            <input type="text" class="proposal-form__input" name="title" id="proposalTitle" required>
                            <div class="proposal-form__hint">Elige un título claro y descriptivo (máx. 100 caracteres)</div>
                        </div>
                        
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Categoría</label>
                            <select class="proposal-form__select" name="category" id="proposalCategory" required>
                                <option value="">Seleccionar categoría</option>
                                <option value="sostenibilidad">Sostenibilidad</option>
                                <option value="educacion">Educación</option>
                                <option value="cultura">Cultura</option>
                                <option value="salud">Salud</option>
                                <option value="deporte">Deporte</option>
                                <option value="infraestructura">Infraestructura</option>
                                <option value="tecnologia">Tecnología</option>
                                <option value="social">Social</option>
                            </select>
                        </div>
                        
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Descripción breve</label>
                            <textarea class="proposal-form__textarea" name="shortDescription" id="proposalShortDescription" maxlength="250" required></textarea>
                            <div class="proposal-form__hint">Resumen breve de tu propuesta (máx. 250 caracteres)</div>
                        </div>
                        
                        <div class="proposal-form__row">
                            <div class="proposal-form__group">
                                <label class="proposal-form__label">Presupuesto solicitado (€)</label>
                                <input type="number" class="proposal-form__input" name="budget" id="proposalBudget" min="1000" step="100" required>
                            </div>
                            
                            <div class="proposal-form__group">
                                <label class="proposal-form__label">Duración estimada</label>
                                <select class="proposal-form__select" name="duration" id="proposalDuration" required>
                                    <option value="">Seleccionar duración</option>
                                    <option value="1-3">1-3 meses</option>
                                    <option value="3-6">3-6 meses</option>
                                    <option value="6-12">6-12 meses</option>
                                    <option value="12+">Más de 12 meses</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Paso 2: Detalles -->
                    <div class="proposal-form__step-content" data-step-content="2">
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Descripción detallada</label>
                            <textarea class="proposal-form__textarea" name="description" id="proposalDescription" rows="6" required></textarea>
                            <div class="proposal-form__hint">Explica en detalle tu propuesta, objetivos, beneficios para la comunidad, etc.</div>
                        </div>
                        
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Ubicación</label>
                            <input type="text" class="proposal-form__input" name="location" id="proposalLocation" placeholder="Ej: Barrio Norte, Parque Central, etc.">
                        </div>
                        
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Beneficiarios estimados</label>
                            <input type="text" class="proposal-form__input" name="beneficiaries" id="proposalBeneficiaries" placeholder="Ej: 500 familias, 3 escuelas, etc.">
                        </div>
                        
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">Imagen de la propuesta</label>
                            <label class="proposal-form__file-button" for="proposalImage">
                                <i class="fas fa-upload"></i> Subir imagen
                            </label>
                            <input type="file" class="proposal-form__file-input" name="image" id="proposalImage" accept="image/*">
                            <div class="proposal-form__hint">Imagen representativa de tu propuesta (opcional)</div>
                            <div id="imagePreviewContainer" class="proposal-form__file-preview" style="display: none;">
                                <img id="imagePreview" src="#" alt="Vista previa">
                                <div class="proposal-form__file-info">
                                    <div class="proposal-form__file-name" id="imageName"></div>
                                    <div class="proposal-form__file-size" id="imageSize"></div>
                                </div>
                                <button type="button" class="proposal-form__file-remove" id="removeImage">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Paso 3: Revisión -->
                    <div class="proposal-form__step-content" data-step-content="3">
                        <div class="proposal-preview">
                            <h3 class="proposal-preview__title">Vista previa de tu propuesta</h3>
                            <div class="proposal-preview__content">
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Título</div>
                                    <div class="proposal-preview__value" id="previewTitle"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Categoría</div>
                                    <div class="proposal-preview__value" id="previewCategory"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Descripción breve</div>
                                    <div class="proposal-preview__value" id="previewShortDescription"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Presupuesto</div>
                                    <div class="proposal-preview__value" id="previewBudget"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Duración</div>
                                    <div class="proposal-preview__value" id="previewDuration"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Ubicación</div>
                                    <div class="proposal-preview__value" id="previewLocation"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Beneficiarios</div>
                                    <div class="proposal-preview__value" id="previewBeneficiaries"></div>
                                </div>
                                
                                <div class="proposal-preview__item">
                                    <div class="proposal-preview__label">Descripción detallada</div>
                                    <div class="proposal-preview__description" id="previewDescription"></div>
                                </div>
                                
                                <div class="proposal-preview__item" id="previewImageContainer" style="display: none;">
                                    <div class="proposal-preview__label">Imagen</div>
                                    <img id="previewImage" src="#" alt="Imagen de la propuesta" style="max-width: 100%; border-radius: var(--border-radius-md);">
                                </div>
                            </div>
                        </div>
                        
                        <div class="proposal-form__group">
                            <label class="proposal-form__label">
                                <input type="checkbox" name="terms" required>
                                Acepto los términos y condiciones para la presentación de propuestas
                            </label>
                        </div>
                    </div>
                    
                    <!-- Navegación entre pasos -->
                    <div class="proposal-form__navigation">
                        <button type="button" class="btn btn--outline" id="prevStepBtn" style="display: none;">
                            <i class="fas fa-arrow-left"></i> Anterior
                        </button>
                        <button type="button" class="btn btn--outline" onclick="closeNewProposalModal()">Cancelar</button>
                        <button type="button" class="btn btn--primary" id="nextStepBtn">
                            Siguiente <i class="fas fa-arrow-right"></i>
                        </button>
                        <button type="submit" class="btn btn--primary" id="submitProposalBtn" style="display: none;">
                            <i class="fas fa-check"></i> Enviar Propuesta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Agregar event listeners
    const form = modal.querySelector('#newProposalForm');
    form.addEventListener('submit', handleNewProposalSubmit);
    
    // Navegación entre pasos
    const nextBtn = modal.querySelector('#nextStepBtn');
    const prevBtn = modal.querySelector('#prevStepBtn');
    const submitBtn = modal.querySelector('#submitProposalBtn');
    
    nextBtn.addEventListener('click', () => {
        const currentStep = parseInt(modal.querySelector('.proposal-form__step--active').dataset.step);
        if (validateStep(currentStep)) {
            goToStep(currentStep + 1);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        const currentStep = parseInt(modal.querySelector('.proposal-form__step--active').dataset.step);
        goToStep(currentStep - 1);
    });
    
    // Previsualización de imagen
    const imageInput = modal.querySelector('#proposalImage');
    const imagePreview = modal.querySelector('#imagePreview');
    const imagePreviewContainer = modal.querySelector('#imagePreviewContainer');
    const imageName = modal.querySelector('#imageName');
    const imageSize = modal.querySelector('#imageSize');
    const removeImageBtn = modal.querySelector('#removeImage');
    
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreviewContainer.style.display = 'flex';
                imageName.textContent = file.name;
                imageSize.textContent = formatFileSize(file.size);
                
                // Actualizar vista previa en el paso 3
                const previewImage = modal.querySelector('#previewImage');
                const previewImageContainer = modal.querySelector('#previewImageContainer');
                previewImage.src = e.target.result;
                previewImageContainer.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    removeImageBtn.addEventListener('click', function() {
        imageInput.value = '';
        imagePreviewContainer.style.display = 'none';
        
        // Actualizar vista previa en el paso 3
        const previewImageContainer = modal.querySelector('#previewImageContainer');
        previewImageContainer.style.display = 'none';
    });
    
    // Actualizar vista previa en tiempo real
    const titleInput = modal.querySelector('#proposalTitle');
    const categorySelect = modal.querySelector('#proposalCategory');
    const shortDescInput = modal.querySelector('#proposalShortDescription');
    const budgetInput = modal.querySelector('#proposalBudget');
    const durationSelect = modal.querySelector('#proposalDuration');
    const locationInput = modal.querySelector('#proposalLocation');
    const beneficiariesInput = modal.querySelector('#proposalBeneficiaries');
    const descriptionInput = modal.querySelector('#proposalDescription');
    
    const previewTitle = modal.querySelector('#previewTitle');
    const previewCategory = modal.querySelector('#previewCategory');
    const previewShortDesc = modal.querySelector('#previewShortDescription');
    const previewBudget = modal.querySelector('#previewBudget');
    const previewDuration = modal.querySelector('#previewDuration');
    const previewLocation = modal.querySelector('#previewLocation');
    const previewBeneficiaries = modal.querySelector('#previewBeneficiaries');
    const previewDescription = modal.querySelector('#previewDescription');
    
    // Actualizar vista previa cuando se cambia al paso 3
    function updatePreview() {
        previewTitle.textContent = titleInput.value || 'No especificado';
        previewCategory.textContent = categorySelect.options[categorySelect.selectedIndex]?.text || 'No especificado';
        previewShortDesc.textContent = shortDescInput.value || 'No especificado';
        previewBudget.textContent = budgetInput.value ? `€${budgetInput.value}` : 'No especificado';
        previewDuration.textContent = durationSelect.options[durationSelect.selectedIndex]?.text || 'No especificado';
        previewLocation.textContent = locationInput.value || 'No especificado';
        previewBeneficiaries.textContent = beneficiariesInput.value || 'No especificado';
        previewDescription.textContent = descriptionInput.value || 'No especificado';
    }
    
    // Función para validar cada paso
    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            // Validar campos del paso 1
            if (!titleInput.value) {
                titleInput.classList.add('error');
                isValid = false;
            } else {
                titleInput.classList.remove('error');
            }
            
            if (!categorySelect.value) {
                categorySelect.classList.add('error');
                isValid = false;
            } else {
                categorySelect.classList.remove('error');
            }
            
            if (!shortDescInput.value) {
                shortDescInput.classList.add('error');
                isValid = false;
            } else {
                shortDescInput.classList.remove('error');
            }
            
            if (!budgetInput.value || budgetInput.value < 1000) {
                budgetInput.classList.add('error');
                isValid = false;
            } else {
                budgetInput.classList.remove('error');
            }
            
            if (!durationSelect.value) {
                durationSelect.classList.add('error');
                isValid = false;
            } else {
                durationSelect.classList.remove('error');
            }
        } else if (step === 2) {
            // Validar campos del paso 2
            if (!descriptionInput.value) {
                descriptionInput.classList.add('error');
                isValid = false;
            } else {
                descriptionInput.classList.remove('error');
            }
        }
        
        if (!isValid) {
            showNotification('Por favor, completa todos los campos obligatorios', 'error');
        }
        
        return isValid;
    }
    
    // Función para cambiar de paso
    function goToStep(step) {
        // Ocultar todos los pasos
        modal.querySelectorAll('.proposal-form__step').forEach(s => {
            s.classList.remove('proposal-form__step--active');
            s.classList.remove('proposal-form__step--completed');
        });
        
        modal.querySelectorAll('.proposal-form__step-content').forEach(c => {
            c.classList.remove('proposal-form__step-content--active');
        });
        
        // Marcar pasos anteriores como completados
        for (let i = 1; i < step; i++) {
            modal.querySelector(`.proposal-form__step[data-step="${i}"]`).classList.add('proposal-form__step--completed');
        }
        
        // Activar paso actual
        modal.querySelector(`.proposal-form__step[data-step="${step}"]`).classList.add('proposal-form__step--active');
        modal.querySelector(`.proposal-form__step-content[data-step-content="${step}"]`).classList.add('proposal-form__step-content--active');
        
        // Actualizar botones de navegación
        if (step === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        } else if (step === 3) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            updatePreview();
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
    
    // Función para formatear tamaño de archivo
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    }
    
    return modal;
}

function closeNewProposalModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function handleNewProposalSubmit(e) {
    e.preventDefault();
    
    // Validar el formulario completo
    if (!validateStep(3)) {
        return;
    }
    
    const formData = new FormData(e.target);
    const proposalData = {
        title: formData.get('title'),
        category: formData.get('category'),
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        budget: formData.get('budget'),
        duration: formData.get('duration'),
        location: formData.get('location'),
        beneficiaries: formData.get('beneficiaries'),
        image: formData.get('image')
    };
    
    console.log('New proposal data:', proposalData);
    
    // Simular envío al servidor
    showLoadingState();
    
    // Simular tiempo de procesamiento
    setTimeout(() => {
        // Simular respuesta exitosa
        hideLoadingState();
        
        // Mostrar confirmación
        showProposalConfirmation(proposalData);
        
        // Cerrar modal después de 5 segundos
        setTimeout(() => {
            closeNewProposalModal();
            
            // Mostrar notificación de éxito
            showNotification('¡Propuesta enviada con éxito! Será revisada por el equipo.', 'success');
            
            // Simular adición de la nueva propuesta a la lista
            addNewProposalToList(proposalData);
        }, 5000);
    }, 2000);
}

// Mostrar estado de carga durante el envío
function showLoadingState() {
    const modal = document.getElementById('newProposalModal');
    if (!modal) return;
    
    // Crear y mostrar overlay de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Enviando propuesta...</div>
    `;
    
    modal.querySelector('.modal__content').appendChild(loadingOverlay);
    
    // Deshabilitar botones
    const buttons = modal.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Ocultar estado de carga
function hideLoadingState() {
    const modal = document.getElementById('newProposalModal');
    if (!modal) return;
    
    // Eliminar overlay de carga
    const loadingOverlay = modal.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
    
    // Habilitar botones
    const buttons = modal.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Mostrar confirmación de propuesta enviada
function showProposalConfirmation(proposalData) {
    const modal = document.getElementById('newProposalModal');
    if (!modal) return;
    
    // Ocultar contenido del formulario
    const formContent = modal.querySelector('.modal__body');
    formContent.innerHTML = `
        <div class="proposal-confirmation">
            <div class="proposal-confirmation__icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 class="proposal-confirmation__title">¡Propuesta enviada con éxito!</h3>
            <p class="proposal-confirmation__message">
                Tu propuesta "${proposalData.title}" ha sido recibida y será revisada por el equipo.
                Te notificaremos cuando comience el proceso de votación.
            </p>
            <div class="proposal-confirmation__details">
                <div class="proposal-confirmation__detail">
                    <span class="proposal-confirmation__label">ID de Propuesta:</span>
                    <span class="proposal-confirmation__value">#${Math.floor(Math.random() * 10000)}</span>
                </div>
                <div class="proposal-confirmation__detail">
                    <span class="proposal-confirmation__label">Fecha de envío:</span>
                    <span class="proposal-confirmation__value">${new Date().toLocaleDateString()}</span>
                </div>
            </div>
            <div class="proposal-confirmation__progress">
                <div class="proposal-confirmation__progress-label">Redirigiendo al dashboard en 5 segundos...</div>
                <div class="proposal-confirmation__progress-bar">
                    <div class="proposal-confirmation__progress-value"></div>
                </div>
            </div>
        </div>
    `;
    
    // Animar barra de progreso
    setTimeout(() => {
        const progressBar = modal.querySelector('.proposal-confirmation__progress-value');
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
    }, 100);
}

// Añadir nueva propuesta a la lista
function addNewProposalToList(proposalData) {
    // Crear elemento de propuesta
    const proposalElement = document.createElement('div');
    proposalElement.className = 'proposal-card';
    proposalElement.innerHTML = `
        <div class="proposal-card__header">
            <div class="proposal-card__category">
                <i class="fas fa-lightbulb"></i>
                <span>${getCategoryDisplayName(proposalData.category)}</span>
            </div>
            <span class="badge badge--warning">Propuesta</span>
        </div>
        
        <div class="proposal-card__content">
            <h3 class="proposal-card__title">${proposalData.title}</h3>
            <p class="proposal-card__description">${proposalData.shortDescription}</p>
            
            <div class="proposal-card__budget">
                <span class="proposal-card__budget-label">Presupuesto solicitado</span>
                <span class="proposal-card__budget-value">€${proposalData.budget}</span>
            </div>
            
            <div class="proposal-card__progress">
                <div class="proposal-card__progress-info">
                    <span class="proposal-card__progress-label">0 de 500 votos necesarios</span>
                    <span class="proposal-card__progress-percentage">0%</span>
                </div>
                <div class="proposal-card__progress-bar">
                    <div class="proposal-card__progress-value" style="width: 0%"></div>
                </div>
            </div>
            
            <div class="proposal-card__votes">
                <div class="proposal-card__vote-item proposal-card__vote-item--favor">
                    <i class="fas fa-thumbs-up"></i>
                    <span>0 a favor</span>
                </div>
                <div class="proposal-card__vote-item proposal-card__vote-item--against">
                    <i class="fas fa-thumbs-down"></i>
                    <span>0 en contra</span>
                </div>
            </div>
            
            <div class="proposal-card__meta">
                <div class="proposal-card__meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Propuesta el ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div class="proposal-card__meta-item">
                    <i class="fas fa-clock"></i>
                    <span>30d para votación</span>
                </div>
            </div>
        </div>
        
        <div class="proposal-card__footer">
            <button class="btn btn--outline btn--sm" onclick="viewProposalDetails('nueva-propuesta')">Ver Detalles</button>
            <div class="proposal-card__actions">
                <button class="btn btn--success btn--sm" onclick="voteForProposal('nueva-propuesta', true)">
                    <i class="fas fa-thumbs-up"></i> Votar
                </button>
                <button class="btn btn--error btn--sm" onclick="voteForProposal('nueva-propuesta', false)">
                    <i class="fas fa-thumbs-down"></i> Contra
                </button>
            </div>
        </div>
    `;
    
    // Añadir al principio de la lista
    const proposalsGrid = document.querySelector('.proposals-grid');
    if (proposalsGrid) {
        proposalsGrid.insertBefore(proposalElement, proposalsGrid.firstChild);
        
        // Aplicar animación
        proposalElement.style.animation = 'fadeInDown 0.8s ease-out';
    }
    
    // Actualizar contadores
    updateProposalCount();
}

// Obtener nombre de categoría para mostrar
function getCategoryDisplayName(categoryValue) {
    const categories = {
        'sostenibilidad': 'Sostenibilidad',
        'educacion': 'Educación',
        'cultura': 'Cultura',
        'salud': 'Salud',
        'deporte': 'Deporte',
        'infraestructura': 'Infraestructura',
        'tecnologia': 'Tecnología',
        'social': 'Social'
    };
    
    return categories[categoryValue] || categoryValue;
}

// Navegación móvil
function initializeMobileNavigation() {
    const hamburger = document.getElementById('proposalsHamburger');
    const mobileMenu = document.getElementById('proposalsMobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Utilidades
function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('notification--show');
    }, 10);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('notification--show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Exportar funciones para uso global
window.viewProposalDetails = viewProposalDetails;
window.voteForProposal = voteForProposal;
window.closeNewProposalModal = closeNewProposalModal;