/**
 * Comments Component
 * Maneja la funcionalidad de comentarios en los proyectos
 */

class Comments {
  constructor(options = {}) {
    this.projectId = options.projectId || null;
    this.container = options.container || null;
    this.comments = options.initialComments || [];
    this.onSubmit = options.onSubmit || null;
    this.maxLength = options.maxLength || 500;
    
    if (this.container) {
      this.init();
    }
  }
  
  init() {
    // Crear estructura de comentarios
    this.createCommentForm();
    this.renderComments();
    
    // Inicializar eventos
    this.initEvents();
  }
  
  createCommentForm() {
    const formHtml = `
      <div class="comments-form">
        <h3 class="comments-form__title">Añadir comentario</h3>
        <div class="comments-form__content">
          <textarea 
            class="comments-form__textarea" 
            placeholder="Escribe tu comentario..." 
            maxlength="${this.maxLength}"
          ></textarea>
          <div class="comments-form__footer">
            <span class="comments-form__counter">0/${this.maxLength}</span>
            <button class="comments-form__submit btn btn--primary btn--sm">
              <i class="fas fa-paper-plane"></i> Enviar
            </button>
          </div>
        </div>
      </div>
    `;
    
    this.container.insertAdjacentHTML('beforeend', formHtml);
  }
  
  renderComments() {
    // Limpiar comentarios existentes
    const existingComments = this.container.querySelector('.comments-list');
    if (existingComments) {
      existingComments.remove();
    }
    
    // Crear lista de comentarios
    const commentsListHtml = `
      <div class="comments-list">
        <h3 class="comments-list__title">Comentarios (${this.comments.length})</h3>
        ${this.comments.length === 0 ? 
          '<p class="comments-list__empty">No hay comentarios todavía. ¡Sé el primero en comentar!</p>' : 
          `<div class="comments-list__items">
            ${this.comments.map(comment => this.renderCommentItem(comment)).join('')}
          </div>`
        }
      </div>
    `;
    
    // Insertar antes del formulario
    const form = this.container.querySelector('.comments-form');
    if (form) {
      form.insertAdjacentHTML('beforebegin', commentsListHtml);
    } else {
      this.container.insertAdjacentHTML('beforeend', commentsListHtml);
    }
  }
  
  renderCommentItem(comment) {
    return `
      <div class="comment" data-id="${comment.id}">
        <div class="comment__header">
          <span class="comment__author">${comment.author}</span>
          <span class="comment__time">${comment.time}</span>
        </div>
        <div class="comment__content">${comment.text}</div>
        ${comment.isOwn ? `
          <div class="comment__actions">
            <button class="comment__action comment__action--edit" data-action="edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="comment__action comment__action--delete" data-action="delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  initEvents() {
    // Contador de caracteres
    const textarea = this.container.querySelector('.comments-form__textarea');
    const counter = this.container.querySelector('.comments-form__counter');
    
    if (textarea && counter) {
      textarea.addEventListener('input', () => {
        const length = textarea.value.length;
        counter.textContent = `${length}/${this.maxLength}`;
      });
    }
    
    // Envío de comentario
    const submitButton = this.container.querySelector('.comments-form__submit');
    
    if (submitButton && textarea) {
      submitButton.addEventListener('click', () => {
        const text = textarea.value.trim();
        
        if (text) {
          this.submitComment(text);
          textarea.value = '';
          counter.textContent = `0/${this.maxLength}`;
        }
      });
      
      // Enviar con Ctrl+Enter
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          submitButton.click();
        }
      });
    }
    
    // Acciones de comentarios (editar, eliminar)
    this.container.addEventListener('click', (e) => {
      const actionButton = e.target.closest('[data-action]');
      
      if (actionButton) {
        const action = actionButton.dataset.action;
        const comment = actionButton.closest('.comment');
        
        if (comment) {
          const commentId = comment.dataset.id;
          
          switch (action) {
            case 'edit':
              this.editComment(commentId);
              break;
            case 'delete':
              this.deleteComment(commentId);
              break;
          }
        }
      }
    });
  }
  
  submitComment(text) {
    // Crear nuevo comentario
    const newComment = {
      id: Date.now().toString(),
      author: 'Tú', // En una app real, sería el usuario actual
      text: text,
      time: 'Ahora mismo',
      isOwn: true
    };
    
    // Añadir al principio de la lista
    this.comments.unshift(newComment);
    
    // Actualizar UI
    this.renderComments();
    
    // Llamar al callback si existe
    if (this.onSubmit) {
      this.onSubmit(newComment, this.projectId);
    }
    
    // Mostrar notificación
    if (window.showNotification) {
      window.showNotification('Comentario añadido correctamente', 'success');
    }
  }
  
  editComment(commentId) {
    const comment = this.comments.find(c => c.id === commentId);
    
    if (comment) {
      // En una app real, esto abriría un formulario de edición
      const newText = prompt('Editar comentario:', comment.text);
      
      if (newText && newText.trim() !== '') {
        comment.text = newText.trim();
        comment.time = 'Editado ahora';
        
        // Actualizar UI
        this.renderComments();
        
        // Mostrar notificación
        if (window.showNotification) {
          window.showNotification('Comentario actualizado correctamente', 'success');
        }
      }
    }
  }
  
  deleteComment(commentId) {
    // Confirmar eliminación
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      // Eliminar comentario
      this.comments = this.comments.filter(c => c.id !== commentId);
      
      // Actualizar UI
      this.renderComments();
      
      // Mostrar notificación
      if (window.showNotification) {
        window.showNotification('Comentario eliminado correctamente', 'success');
      }
    }
  }
  
  addComment(comment) {
    this.comments.unshift(comment);
    this.renderComments();
  }
  
  getComments() {
    return this.comments;
  }
  
  clearComments() {
    this.comments = [];
    this.renderComments();
  }
}

// Exportar para uso en otros archivos
window.Comments = Comments;