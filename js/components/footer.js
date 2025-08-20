/**
 * Footer Component
 * Handles footer functionality across the site
 */

class Footer {
  constructor() {
    this.currentYear = new Date().getFullYear();
  }
  
  init() {
    this.updateCopyright();
  }
  
  updateCopyright() {
    const copyrightElements = document.querySelectorAll('.footer__copy');
    
    copyrightElements.forEach(element => {
      // Replace year in copyright text if it exists
      const text = element.textContent;
      if (text.includes('2025')) {
        element.textContent = text.replace('2025', this.currentYear);
      }
    });
  }
}

// Export for use in other files
window.Footer = Footer;