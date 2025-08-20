/**
 * Main JavaScript file for CivicVault
 * Contains common functionality used across the site
 */

// Smooth scroll to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  
  if (hamburger && navMenu) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
});

// Initialize tooltips
function initTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltipEl = document.createElement('div');
      tooltipEl.classList.add('tooltip');
      tooltipEl.textContent = tooltipText;
      document.body.appendChild(tooltipEl);
      
      const rect = this.getBoundingClientRect();
      tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
      tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
      tooltipEl.style.opacity = '1';
    });
    
    tooltip.addEventListener('mouseleave', function() {
      const tooltipEl = document.querySelector('.tooltip');
      if (tooltipEl) {
        tooltipEl.remove();
      }
    });
  });
}

// Format currency
function formatCurrency(amount, currency = 'EUR') {
  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  });
  
  return formatter.format(amount);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Document ready function
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// Export functions for use in other files
window.CivicVault = {
  scrollToSection,
  formatCurrency,
  formatDate,
  initTooltips,
  docReady
};