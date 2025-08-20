/**
 * Navbar Component
 * Handles navigation functionality across the site
 */

class Navbar {
  constructor(activePage = '') {
    this.activePage = activePage;
    this.hamburger = null;
    this.navMenu = null;
  }
  
  init() {
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("navMenu");
    
    if (this.hamburger && this.navMenu) {
      // Toggle menu on hamburger click
      this.hamburger.addEventListener("click", () => {
        this.hamburger.classList.toggle("active");
        this.navMenu.classList.toggle("active");
      });
      
      // Close menu when clicking on a link (mobile)
      this.navMenu.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          this.hamburger.classList.remove("active");
          this.navMenu.classList.remove("active");
        }
      });
    }
    
    // Set active link
    this.setActiveLink();
  }
  
  setActiveLink() {
    if (!this.activePage) return;
    
    const links = document.querySelectorAll(".navbar__menu a");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && href.includes(this.activePage)) {
        link.classList.add("active");
      }
    });
  }
  
  // For dashboard/proposals pages with different navbar structure
  initAlternateNavbar(mobileMenuId, hamburgerBtnId) {
    const hamburger = document.getElementById(hamburgerBtnId);
    const mobileMenu = document.getElementById(mobileMenuId);
    
    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
      });
      
      // Close menu when clicking on a link (mobile)
      mobileMenu.addEventListener("click", function(e) {
        if (e.target.tagName === "A") {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("active");
        }
      });
    }
  }
}

// Export for use in other files
window.Navbar = Navbar;