/**
 * Chart Utilities
 * Simple chart drawing utilities for dashboard statistics
 */

class ChartUtils {
  /**
   * Create a mini line chart
   * @param {string} elementId - The canvas element ID
   * @param {Array} data - Array of data points
   * @param {string} color - Line color (hex or rgba)
   * @param {Object} options - Additional options
   */
  static createMiniLineChart(elementId, data, color, options = {}) {
    const canvas = document.getElementById(elementId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Default options
    const defaults = {
      fillArea: true,
      showDots: true,
      lineWidth: 2,
      dotRadius: 3,
      fillOpacity: 0.2
    };
    
    // Merge options
    const settings = { ...defaults, ...options };
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find min and max values for scaling
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    // Draw filled area if requested
    if (settings.fillArea) {
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        ctx.lineTo(x, y);
      });
      
      ctx.lineTo(width, height);
      ctx.closePath();
      
      // Fill with semi-transparent color
      const fillColor = color.startsWith('#') 
        ? this.hexToRgba(color, settings.fillOpacity)
        : color.replace(')', `, ${settings.fillOpacity})`).replace('rgb', 'rgba');
      
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = settings.lineWidth;
    
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Add dots for data points if requested
    if (settings.showDots) {
      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, settings.dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }
  
  /**
   * Create a mini bar chart
   * @param {string} elementId - The canvas element ID
   * @param {Array} data - Array of data points
   * @param {string} color - Bar color (hex or rgba)
   * @param {Object} options - Additional options
   */
  static createMiniBarChart(elementId, data, color, options = {}) {
    const canvas = document.getElementById(elementId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Default options
    const defaults = {
      barSpacing: 2,
      barOpacity: 0.8
    };
    
    // Merge options
    const settings = { ...defaults, ...options };
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find max value for scaling
    const max = Math.max(...data);
    
    // Calculate bar width based on data length and spacing
    const barWidth = (width - (settings.barSpacing * (data.length - 1))) / data.length;
    
    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / max) * height;
      const x = index * (barWidth + settings.barSpacing);
      const y = height - barHeight;
      
      // Fill with semi-transparent color
      const fillColor = color.startsWith('#') 
        ? this.hexToRgba(color, settings.barOpacity)
        : color.replace(')', `, ${settings.barOpacity})`).replace('rgb', 'rgba');
      
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Add border
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, barHeight);
    });
  }
  
  /**
   * Create a mini donut chart
   * @param {string} elementId - The canvas element ID
   * @param {Array} data - Array of data values
   * @param {Array} colors - Array of colors
   * @param {Object} options - Additional options
   */
  static createMiniDonutChart(elementId, data, colors, options = {}) {
    const canvas = document.getElementById(elementId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;
    
    // Default options
    const defaults = {
      innerRadius: radius * 0.5,
      centerX: width / 2,
      centerY: height / 2
    };
    
    // Merge options
    const settings = { ...defaults, ...options };
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate total
    const total = data.reduce((sum, value) => sum + value, 0);
    
    // Draw segments
    let startAngle = -Math.PI / 2; // Start at top
    
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * (Math.PI * 2);
      const endAngle = startAngle + sliceAngle;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(settings.centerX, settings.centerY);
      ctx.arc(settings.centerX, settings.centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // Draw inner circle for donut effect
      ctx.beginPath();
      ctx.moveTo(settings.centerX + settings.innerRadius, settings.centerY);
      ctx.arc(settings.centerX, settings.centerY, settings.innerRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b'; // Background color
      ctx.fill();
      
      startAngle = endAngle;
    });
  }
  
  /**
   * Convert hex color to rgba
   * @param {string} hex - Hex color code
   * @param {number} opacity - Opacity value (0-1)
   * @returns {string} RGBA color string
   */
  static hexToRgba(hex, opacity) {
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}

// Export for use in other files
window.ChartUtils = ChartUtils;