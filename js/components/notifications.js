/**
 * Notifications Component
 * Maneja la funcionalidad de notificaciones en todo el sitio
 */

class Notifications {
  constructor(options = {}) {
    this.position = options.position || 'top-right';
    this.duration = options.duration || 3000;
    this.container = null;
    this.notifications = [];
    
    this.init();
  }
  
  init() {
    // Crear contenedor de notificaciones si no existe
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'notifications-container';
      document.body.appendChild(this.container);
    }
  }
  
  show(message, type = 'info', options = {}) {
    const id = 'notification-' + Date.now();
    const duration = options.duration || this.duration;
    const position = options.position || this.position;
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type} notification--${position}`;
    notification.id = id;
    
    // Crear contenido de la notificación
    let icon = '';
    switch (type) {
      case 'success':
        icon = '<i class="fas fa-check-circle"></i>';
        break;
      case 'warning':
        icon = '<i class="fas fa-exclamation-triangle"></i>';
        break;
      case 'error':
        icon = '<i class="fas fa-times-circle"></i>';
        break;
      default:
        icon = '<i class="fas fa-info-circle"></i>';
    }
    
    notification.innerHTML = `
      <div class="notification__icon">${icon}</div>
      <div class="notification__content">
        <div class="notification__message">${message}</div>
      </div>
      <button class="notification__close">&times;</button>
    `;
    
    // Añadir al contenedor
    this.container.appendChild(notification);
    
    // Añadir a la lista de notificaciones
    this.notifications.push({
      id,
      element: notification,
      timeout: null
    });
    
    // Mostrar notificación
    setTimeout(() => {
      notification.classList.add('notification--visible');
    }, 10);
    
    // Configurar cierre automático
    const timeout = setTimeout(() => {
      this.close(id);
    }, duration);
    
    // Actualizar timeout en la lista
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications[index].timeout = timeout;
    }
    
    // Configurar botón de cierre
    const closeButton = notification.querySelector('.notification__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.close(id);
      });
    }
    
    return id;
  }
  
  close(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    
    if (index !== -1) {
      const { element, timeout } = this.notifications[index];
      
      // Limpiar timeout si existe
      if (timeout) {
        clearTimeout(timeout);
      }
      
      // Ocultar notificación
      element.classList.remove('notification--visible');
      
      // Eliminar elemento después de la transición
      element.addEventListener('transitionend', () => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      
      // Eliminar de la lista
      this.notifications.splice(index, 1);
    }
  }
  
  closeAll() {
    this.notifications.forEach(notification => {
      this.close(notification.id);
    });
  }
  
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }
  
  info(message, options = {}) {
    return this.show(message, 'info', options);
  }
  
  warning(message, options = {}) {
    return this.show(message, 'warning', options);
  }
  
  error(message, options = {}) {
    return this.show(message, 'error', options);
  }
}

// Crear instancia global
window.notifications = new Notifications();

// Función de ayuda para mostrar notificaciones
function showNotification(message, type = 'info', duration = 3000) {
  return window.notifications.show(message, type, { duration });
}