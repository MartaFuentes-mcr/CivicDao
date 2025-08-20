/**
 * Modal Component
 * Handles modal functionality across the site
 */

class Modal {
  constructor(modalId) {
    this.modalId = modalId;
    this.modal = document.getElementById(modalId);
    this.closeButtons = null;
    this.contentContainer = null;
  }
  
  init() {
    if (!this.modal) return;
    
    // Find close buttons
    this.closeButtons = this.modal.querySelectorAll('.modal__close, [data-close-modal]');
    
    // Find content container
    this.contentContainer = this.modal.querySelector('.modal__body');
    
    // Initialize close buttons
    this.initCloseButtons();
    
    // Initialize click outside
    this.initClickOutside();
    
    // Initialize escape key
    this.initEscapeKey();
  }
  
  initCloseButtons() {
    this.closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.close();
      });
    });
  }
  
  initClickOutside() {
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }
  
  initEscapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }
  
  open() {
    this.modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
  
  isOpen() {
    return this.modal.classList.contains('is-active');
  }
  
  setContent(content) {
    if (this.contentContainer) {
      this.contentContainer.innerHTML = content;
    }
  }
  
  static initAll() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
      const modalId = modal.id;
      const modalInstance = new Modal(modalId);
      modalInstance.init();
      
      // Find open triggers
      const openTriggers = document.querySelectorAll(`[data-open-modal="${modalId}"]`);
      
      openTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          modalInstance.open();
        });
      });
    });
  }
}

// Export for use in other files
window.Modal = Modal;

// Initialize all modals when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Modal.initAll();
});