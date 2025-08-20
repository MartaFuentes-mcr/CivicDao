// Función para inicializar el botón de filtros
function initFilterButton() {
    console.log('Inicializando botón de filtros...');
    
    // Obtener referencias a los elementos
    var filterButton = document.getElementById('advancedFiltersBtn');
    var filterPanel = document.getElementById('advancedFiltersPanel');
    var closeButton = document.querySelector('.dashboard-filters__advanced-close');
    
    console.log('Botón de filtros:', filterButton);
    console.log('Panel de filtros:', filterPanel);
    console.log('Botón de cerrar:', closeButton);
    
    // Verificar si los elementos existen
    if (!filterButton) {
        console.error('Error: No se encontró el botón de filtros (advancedFiltersBtn)');
        return;
    }
    
    if (!filterPanel) {
        console.error('Error: No se encontró el panel de filtros (advancedFiltersPanel)');
        return;
    }
    
    // Asegurarse de que el panel esté oculto inicialmente
    filterPanel.style.display = 'none';
    
    // Función para mostrar/ocultar el panel
    function togglePanel(event) {
        // Evitar que el evento se propague
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        console.log('Alternando panel de filtros');
        
        if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
            // Mostrar el panel
            filterPanel.style.display = 'block';
            filterButton.classList.add('active');
            console.log('Panel mostrado');
            
            // Añadir un pequeño retraso para evitar que el evento de clic se propague
            setTimeout(function() {
                // Añadir evento para cerrar al hacer clic fuera
                document.addEventListener('click', outsideClickHandler);
            }, 10);
        } else {
            // Ocultar el panel
            filterPanel.style.display = 'none';
            filterButton.classList.remove('active');
            console.log('Panel ocultado');
            
            // Eliminar el evento de clic fuera
            document.removeEventListener('click', outsideClickHandler);
        }
    }
    
    // Función para cerrar el panel
    function closePanel(event) {
        // Evitar que el evento se propague
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        console.log('Cerrando panel de filtros');
        filterPanel.style.display = 'none';
        filterButton.classList.remove('active');
        
        // Eliminar el evento de clic fuera
        document.removeEventListener('click', outsideClickHandler);
    }
    
    // Función para manejar clics fuera del panel
    function outsideClickHandler(event) {
        if (!filterPanel.contains(event.target) && event.target !== filterButton) {
            closePanel();
        }
    }
    
    // Asignar eventos usando addEventListener
    filterButton.addEventListener('click', togglePanel);
    
    if (closeButton) {
        closeButton.addEventListener('click', closePanel);
    }
    
    console.log('Inicialización del botón de filtros completada');
    
    // Exponer funciones globalmente
    window.toggleFilterPanel = togglePanel;
    window.closeFilterPanel = closePanel;
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilterButton);
} else {
    // Si el DOM ya está cargado, inicializar inmediatamente
    initFilterButton();
}

// Exponer funciones globalmente para poder llamarlas desde HTML
window.toggleFilterPanel = function() {
    console.log('toggleFilterPanel llamado desde HTML');
    var filterButton = document.getElementById('advancedFiltersBtn');
    var filterPanel = document.getElementById('advancedFiltersPanel');
    
    if (filterPanel.style.display === 'none') {
        filterPanel.style.display = 'block';
        filterButton.classList.add('active');
    } else {
        filterPanel.style.display = 'none';
        filterButton.classList.remove('active');
    }
};

window.closeFilterPanel = function() {
    console.log('closeFilterPanel llamado desde HTML');
    var filterButton = document.getElementById('advancedFiltersBtn');
    var filterPanel = document.getElementById('advancedFiltersPanel');
    
    filterPanel.style.display = 'none';
    filterButton.classList.remove('active');
};