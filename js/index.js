/**
 * Index JavaScript
 * Handles functionality specific to the home page
 */

// Initialize home page
function initHomePage() {
  setupNavbar();
  setupHeroSection();
  setupMetricsSection();
  setupFeaturesSection();
  setupCTA();
  setupFooter();
}

// Setup navbar
function setupNavbar() {
  const navbar = new Navbar('index');
  navbar.init();
  
  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
}

// Setup hero section
function setupHeroSection() {
  // Animation for hero title or other interactive elements
  console.log('Hero section initialized');
}

// Setup metrics section
function setupMetricsSection() {
  // This would fetch real metrics in a production environment
  animateMetricsCountUp();
}

// Animate metrics with count-up effect
function animateMetricsCountUp() {
  const metricValues = document.querySelectorAll('.card__value');
  
  metricValues.forEach(metric => {
    const targetValue = metric.textContent;
    
    // Simple animation for demonstration
    // In a real app, you'd use a proper animation library
    let startValue = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    if (targetValue.includes('$')) {
      // Handle currency format
      const numericValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
      
      function updateValue(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = progress * numericValue;
        
        metric.textContent = '$' + currentValue.toFixed(1) + 'B';
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      }
      
      requestAnimationFrame(updateValue);
    } else if (targetValue.includes('%')) {
      // Handle percentage format
      const numericValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
      
      function updateValue(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = progress * numericValue;
        
        metric.textContent = currentValue.toFixed(1) + '%';
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      }
      
      requestAnimationFrame(updateValue);
    } else {
      // Handle numeric format
      const numericValue = parseInt(targetValue.replace(/,/g, ''));
      
      function updateValue(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * numericValue);
        
        metric.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      }
      
      requestAnimationFrame(updateValue);
    }
  });
}

// Setup features section
function setupFeaturesSection() {
  // Add any interactive elements or animations
  console.log('Features section initialized');
}

// Setup CTA section
function setupCTA() {
  // Add any interactive elements or animations
  console.log('CTA section initialized');
}

// Setup footer
function setupFooter() {
  const footer = new Footer();
  footer.init();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHomePage);