/**
 * Script para solucionar el problema del botón de filtros avanzados
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando fix para el botón de filtros...');
  
  // Obtener elementos
  const advancedFiltersBtn = document.getElementById('advancedFiltersBtn');
  const advancedFiltersPanel = document.getElementById('advancedFiltersPanel');
  const advancedFiltersClose = document.querySelector('.dashboard-filters__advanced-close');
  
  // Verificar si los elementos existen
  if (!advancedFiltersBtn) {
    console.error('Error: No se encontró el botón de filtros avanzados');
    return;
  }
  
  if (!advancedFiltersPanel) {
    console.error('Error: No se encontró el panel de filtros avanzados');
    return;
  }
  
  console.log('Elementos encontrados, configurando eventos...');
  
  // Función para abrir/cerrar el panel
  function togglePanel() {
    console.log('Toggle panel llamado');
    if (advancedFiltersPanel.classList.contains('active')) {
      advancedFiltersPanel.classList.remove('active');
      advancedFiltersBtn.classList.remove('active');
      console.log('Panel cerrado');
    } else {
      advancedFiltersPanel.classList.add('active');
      advancedFiltersBtn.classList.add('active');
      console.log('Panel abierto');
    }
  }
  
  // Agregar evento al botón
  advancedFiltersBtn.addEventListener('click', function(e) {
    console.log('Botón de filtros clickeado');
    e.stopPropagation(); // Evitar que el evento se propague
    togglePanel();
  });
  
  // Cerrar al hacer clic en el botón de cerrar
  if (advancedFiltersClose) {
    advancedFiltersClose.addEventListener('click', function(e) {
      console.log('Botón de cerrar clickeado');
      e.stopPropagation(); // Evitar que el evento se propague
      advancedFiltersPanel.classList.remove('active');
      advancedFiltersBtn.classList.remove('active');
    });
  }
  
  // Cerrar al hacer clic fuera del panel
  document.addEventListener('click', function(e) {
    if (advancedFiltersPanel.classList.contains('active') &&
        !advancedFiltersPanel.contains(e.target) &&
        e.target !== advancedFiltersBtn) {
      console.log('Clic fuera del panel detectado');
      advancedFiltersPanel.classList.remove('active');
      advancedFiltersBtn.classList.remove('active');
    }
  });
  
  // Agregar estilos inline para asegurar que funcione
  advancedFiltersPanel.style.display = 'none';
  
  // Modificar la función toggle para usar display
  const originalToggle = togglePanel;
  togglePanel = function() {
    originalToggle();
    if (advancedFiltersPanel.classList.contains('active')) {
      advancedFiltersPanel.style.display = 'block';
    } else {
      advancedFiltersPanel.style.display = 'none';
    }
  };
  
  console.log('Fix para el botón de filtros inicializado correctamente');
});