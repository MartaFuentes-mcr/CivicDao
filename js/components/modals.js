/**
 * Modal Component
 * Handles modal functionality across the site
 */

class Modal {
  constructor(modalId) {
    this.modalId = modalId;
    this.modal = document.getElementById(modalId);
    this.isOpen = false;
  }
  
  init() {
    if (!this.modal) {
      console.error(`Modal with ID "${this.modalId}" not found`);
      return;
    }
    
    // Close button functionality
    const closeButtons = this.modal.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });
    
    // Close on click outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  open() {
    if (!this.modal) return;
    
    this.modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this.isOpen = true;
    
    // Focus first input if exists
    const firstInput = this.modal.querySelector('input, button, select, textarea');
    if (firstInput) {
      setTimeout(() => {
        firstInput.focus();
      }, 100);
    }
  }
  
  close() {
    if (!this.modal) return;
    
    this.modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.isOpen = false;
  }
  
  setContent(content) {
    if (!this.modal) return;
    
    const contentContainer = this.modal.querySelector('[data-modal-content]');
    if (contentContainer) {
      contentContainer.innerHTML = content;
    }
  }
}

// Contribution modal specific functionality
function openContribution(projectName) {
  const modal = new Modal('contributionModal');
  document.getElementById("modalProjectName").innerText = projectName;
  modal.open();
}

function closeContribution() {
  const modal = new Modal('contributionModal');
  modal.close();
}

function setQuickAmount(amount) {
  document.getElementById("amountInput").value = amount;
}

// Project details modal
function openProjectDetails(projectId) {
  const modal = new Modal('projectDetailsModal');
  
  // Here you would fetch project details based on ID
  // For now, we'll use placeholder content
  const content = `
    <h2 class="text-xl font-bold mb-4">${projectId} Details</h2>
    <p>Project details would be loaded here based on the project ID.</p>
  `;
  
  modal.setContent(content);
  modal.open();
}

function closeProjectDetails() {
  const modal = new Modal('projectDetailsModal');
  modal.close();
}

// New proposal modal
function openNewProposal() {
  const modal = new Modal('newProposalModal');
  modal.open();
}

function closeNewProposal() {
  const modal = new Modal('newProposalModal');
  modal.close();
}

// Update character count for proposal description
function updateCharCount() {
  const textarea = document.getElementById('proposalDescription');
  const charCount = document.getElementById('charCount');
  
  if (textarea && charCount) {
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute('maxlength');
    charCount.textContent = `(${currentLength}/${maxLength} caracteres)`;
  }
}

// Wallet modals
function openExchangeModal() {
  alert('Exchange modal would open here');
  // Implementation will come later
}

function openSendModal() {
  alert('Send modal would open here');
  // Implementation will come later
}

function openReceiveModal() {
  alert('Receive modal would open here');
  // Implementation will come later
}

function openStakingModal() {
  alert('Staking modal would open here');
  // Implementation will come later
}

function openAddCurrencyModal() {
  alert('Add currency modal would open here');
  // Implementation will come later
}

// Export for use in other files
window.Modal = Modal;
window.openContribution = openContribution;
window.closeContribution = closeContribution;
window.setQuickAmount = setQuickAmount;
window.openProjectDetails = openProjectDetails;
window.closeProjectDetails = closeProjectDetails;
window.openNewProposal = openNewProposal;
window.closeNewProposal = closeNewProposal;
window.updateCharCount = updateCharCount;
window.openExchangeModal = openExchangeModal;
window.openSendModal = openSendModal;
window.openReceiveModal = openReceiveModal;
window.openStakingModal = openStakingModal;
window.openAddCurrencyModal = openAddCurrencyModal;