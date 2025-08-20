/**
 * Wallet JavaScript
 * Handles functionality specific to the wallet page
 */

// Wallet data (would come from an API in a real application)
const walletData = {
  totalBalance: 3247.85,
  monthlyChange: 127.45,
  monthlyChangePercent: 4.1,
  currencies: [
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      type: 'fiat',
      balance: 1847.23,
      change: 23.45,
      color: '#3b82f6'
    },
    {
      name: 'Bitcoin',
      code: 'BTC',
      symbol: '₿',
      type: 'crypto',
      balance: 987.45,
      cryptoBalance: 0.0234,
      change: 87.23,
      color: '#f97316'
    },
    {
      name: 'USD Coin',
      code: 'USDC',
      symbol: '$',
      type: 'crypto',
      balance: 413.17,
      cryptoBalance: 456.78,
      change: 16.77,
      color: '#10b981'
    }
  ],
  transactions: [
    {
      id: 'tx1',
      type: 'receive',
      amount: 250,
      currency: 'EUR',
      date: '2024-01-15',
      from: 'Depósito Bancario',
      status: 'completed'
    },
    {
      id: 'tx2',
      type: 'send',
      amount: 50,
      currency: 'EUR',
      date: '2024-01-12',
      to: 'Proyecto Comunitario',
      status: 'completed'
    },
    {
      id: 'tx3',
      type: 'exchange',
      amount: 100,
      fromCurrency: 'EUR',
      toCurrency: 'BTC',
      toAmount: 0.0025,
      date: '2024-01-10',
      status: 'completed'
    }
  ],
  stakingPools: [
    {
      id: 'pool1',
      name: 'Fondo Comunitario',
      apy: 5.2,
      description: 'Contribuye al fondo comunitario y gana intereses mientras financias proyectos locales.',
      stakedAmount: 500,
      rewards: 26,
      totalStakers: 1245
    },
    {
      id: 'pool2',
      name: 'Reserva de Liquidez',
      apy: 3.8,
      description: 'Proporciona liquidez para intercambios y gana comisiones por cada operación.',
      stakedAmount: 250,
      rewards: 9.5,
      totalStakers: 876
    }
  ]
};

// Initialize wallet
function initWallet() {
  setupNavbar();
  updateBalanceDisplay();
  setupCurrencyList();
  setupTransactionList();
  setupStakingPools();
  setupActionButtons();
  setupModals();
  setupNotifications();
  setupFilters();
  initCharts();
}

// Setup navbar
function setupNavbar() {
  // Inicialización personalizada para el menú hamburguesa de wallet
  const hamburger = document.getElementById("walletHamburger");
  const navMenu = document.getElementById("walletMobileMenu");
  
  if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    
    // Close menu when clicking on a link (mobile)
    navMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
  
  // También inicializamos la clase Navbar para mantener otras funcionalidades
  const navbar = new Navbar('wallet');
  navbar.init();
}

// Update balance display
function updateBalanceDisplay() {
  const totalBalanceElement = document.getElementById('totalBalance');
  
  if (totalBalanceElement) {
    totalBalanceElement.textContent = formatCurrency(walletData.totalBalance);
  }
  
  // Setup balance visibility toggle
  const toggleBalanceBtn = document.getElementById('toggleBalanceVisibility');
  if (toggleBalanceBtn) {
    toggleBalanceBtn.addEventListener('click', function() {
      const balanceElement = document.getElementById('totalBalance');
      if (balanceElement.classList.contains('balance-hidden')) {
        balanceElement.classList.remove('balance-hidden');
        balanceElement.textContent = formatCurrency(walletData.totalBalance);
        toggleBalanceBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        balanceElement.classList.add('balance-hidden');
        balanceElement.textContent = '••••••';
        toggleBalanceBtn.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  }
  
  // Setup balance refresh button
  const refreshBalanceBtn = document.getElementById('refreshBalance');
  if (refreshBalanceBtn) {
    refreshBalanceBtn.addEventListener('click', function() {
      refreshBalanceBtn.classList.add('rotating');
      
      // Simulate API call delay
      setTimeout(function() {
        refreshBalanceBtn.classList.remove('rotating');
        showNotification('Balance actualizado correctamente', 'success');
      }, 1000);
    });
  }
  
  // Setup balance period selector
  const balancePeriodSelect = document.getElementById('balancePeriod');
  if (balancePeriodSelect) {
    balancePeriodSelect.addEventListener('change', function() {
      updateBalanceChart(this.value);
    });
  }
  
  // Setup balance tabs
  const balanceTabs = document.querySelectorAll('.wallet-balance__tab');
  if (balanceTabs.length > 0) {
    balanceTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        balanceTabs.forEach(t => t.classList.remove('wallet-balance__tab--active'));
        // Add active class to clicked tab
        this.classList.add('wallet-balance__tab--active');
        
        // Update chart based on selected period
        const period = this.getAttribute('data-period');
        updateBalanceChart(period);
      });
    });
  }
}

// Update balance chart based on selected period
function updateBalanceChart(period) {
  console.log(`Updating chart for period: ${period}`);
  
  // In a real application, this would fetch data for the selected period
  // and update the chart accordingly
  
  // For demo purposes, we'll just show a notification
  showNotification(`Mostrando datos para el período: ${period}`, 'info');
}

// Setup currency list
function setupCurrencyList() {
  // This would dynamically create currency items in a real application
  console.log('Currency list initialized');
  
  // Add currency button
  const addCurrencyBtn = document.querySelector('.add-currency-btn');
  if (addCurrencyBtn) {
    addCurrencyBtn.addEventListener('click', openAddCurrencyModal);
  }
}

// Setup transaction list
function setupTransactionList() {
  // This would dynamically create transaction items in a real application
  console.log('Transaction list initialized');
  
  // Setup copy hash buttons
  const copyHashBtns = document.querySelectorAll('.copy-hash-btn');
  copyHashBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const hashValue = this.previousElementSibling.textContent;
      navigator.clipboard.writeText(hashValue).then(() => {
        showNotification('ID de transacción copiado al portapapeles', 'success');
      });
    });
  });
  
  // Setup transaction pagination
  const prevPageBtn = document.querySelector('.pagination-btn--prev');
  const nextPageBtn = document.querySelector('.pagination-btn--next');
  
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', function() {
      if (!this.disabled) {
        showNotification('Cargando página anterior...', 'info');
      }
    });
  }
  
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', function() {
      showNotification('Cargando página siguiente...', 'info');
    });
  }
}

// Setup staking pools
function setupStakingPools() {
  // This would dynamically create staking pool items in a real application
  console.log('Staking pools initialized');
  
  // Setup pool action buttons
  const poolActionBtns = document.querySelectorAll('.pool-actions button');
  poolActionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.textContent.trim();
      const poolTitle = this.closest('.staking-pool').querySelector('.pool-title').textContent;
      
      showNotification(`Acción "${action}" para el pool "${poolTitle}"`, 'info');
    });
  });
  
  // Setup explore pools button
  const explorePoolsBtn = document.getElementById('explorePoolsBtn');
  if (explorePoolsBtn) {
    explorePoolsBtn.addEventListener('click', function() {
      showNotification('Explorando más pools de staking...', 'info');
    });
  }
}

// Setup action buttons
function setupActionButtons() {
  // Exchange button
  const exchangeBtn = document.getElementById('exchangeBtn');
  if (exchangeBtn) {
    exchangeBtn.addEventListener('click', function() {
      openModal('exchangeModal');
    });
  }
  
  // Send button
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      openModal('sendModal');
    });
  }
  
  // Receive button
  const receiveBtn = document.getElementById('receiveBtn');
  if (receiveBtn) {
    receiveBtn.addEventListener('click', function() {
      openModal('receiveModal');
    });
  }
  
  // Staking button
  const stakingBtn = document.getElementById('stakingBtn');
  if (stakingBtn) {
    stakingBtn.addEventListener('click', function() {
      // Scroll to staking section
      const stakingSection = document.querySelector('.staking-pools');
      if (stakingSection) {
        stakingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Setup modals
function setupModals() {
  // Exchange modal
  setupExchangeModal();
  
  // Send modal
  setupSendModal();
  
  // Receive modal
  setupReceiveModal();
  
  // Close buttons for all modals
  const closeModalBtns = document.querySelectorAll('.modal__close, .modal__footer .btn--outline');
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
}

// Setup exchange modal
function setupExchangeModal() {
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');
  const fromAmountInput = document.getElementById('fromAmount');
  const toAmountInput = document.getElementById('toAmount');
  const exchangeRateElement = document.getElementById('exchangeRate');
  const swapCurrenciesBtn = document.getElementById('swapCurrencies');
  const confirmExchangeBtn = document.getElementById('confirmExchange');
  
  // Update exchange rate when currencies change
  function updateExchangeRate() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    
    // In a real app, this would fetch the current exchange rate
    let rate;
    if (fromCurrency === 'EUR' && toCurrency === 'BTC') {
      rate = 0.000025;
    } else if (fromCurrency === 'EUR' && toCurrency === 'USDC') {
      rate = 1.1;
    } else if (fromCurrency === 'BTC' && toCurrency === 'EUR') {
      rate = 40000;
    } else if (fromCurrency === 'BTC' && toCurrency === 'USDC') {
      rate = 44000;
    } else if (fromCurrency === 'USDC' && toCurrency === 'EUR') {
      rate = 0.91;
    } else if (fromCurrency === 'USDC' && toCurrency === 'BTC') {
      rate = 0.000023;
    } else {
      rate = 1;
    }
    
    exchangeRateElement.textContent = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
    return rate;
  }
  
  // Calculate and update the to amount
  function updateToAmount() {
    const fromAmount = parseFloat(fromAmountInput.value) || 0;
    const rate = updateExchangeRate();
    const toAmount = fromAmount * rate;
    toAmountInput.value = toAmount.toFixed(6);
  }
  
  // Event listeners
  if (fromCurrencySelect && toCurrencySelect) {
    fromCurrencySelect.addEventListener('change', updateToAmount);
    toCurrencySelect.addEventListener('change', updateToAmount);
  }
  
  if (fromAmountInput) {
    fromAmountInput.addEventListener('input', updateToAmount);
  }
  
  if (swapCurrenciesBtn) {
    swapCurrenciesBtn.addEventListener('click', function() {
      const fromValue = fromCurrencySelect.value;
      const toValue = toCurrencySelect.value;
      
      fromCurrencySelect.value = toValue;
      toCurrencySelect.value = fromValue;
      
      updateToAmount();
    });
  }
  
  if (confirmExchangeBtn) {
    confirmExchangeBtn.addEventListener('click', function() {
      const fromAmount = parseFloat(fromAmountInput.value) || 0;
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
      const toAmount = parseFloat(toAmountInput.value) || 0;
      
      if (fromAmount <= 0) {
        showNotification('Por favor, introduce una cantidad válida', 'error');
        return;
      }
      
      // In a real app, this would submit the exchange to the backend
      showNotification(`Intercambio de ${fromAmount} ${fromCurrency} a ${toAmount.toFixed(6)} ${toCurrency} completado`, 'success');
      closeModal('exchangeModal');
      
      // Reset form
      fromAmountInput.value = '';
      toAmountInput.value = '';
    });
  }
}

// Setup send modal
function setupSendModal() {
  const sendCurrencySelect = document.getElementById('sendCurrency');
  const recipientAddressInput = document.getElementById('recipientAddress');
  const sendAmountInput = document.getElementById('sendAmount');
  const networkFeeElement = document.getElementById('networkFee');
  const sendTotalElement = document.getElementById('sendTotal');
  const confirmSendBtn = document.getElementById('confirmSend');
  
  // Update total amount when currency or amount changes
  function updateSendTotal() {
    const amount = parseFloat(sendAmountInput.value) || 0;
    const currency = sendCurrencySelect.value;
    
    // In a real app, this would calculate the network fee based on the currency
    let fee;
    if (currency === 'BTC') {
      fee = 0.0001;
    } else if (currency === 'USDC') {
      fee = 5;
    } else {
      fee = 0.25;
    }
    
    const total = amount + fee;
    
    if (currency === 'BTC') {
      networkFeeElement.textContent = `${fee} BTC`;
      sendTotalElement.textContent = `${total.toFixed(6)} BTC`;
    } else if (currency === 'USDC') {
      networkFeeElement.textContent = `${fee} USDC`;
      sendTotalElement.textContent = `${total.toFixed(2)} USDC`;
    } else {
      networkFeeElement.textContent = formatCurrency(fee);
      sendTotalElement.textContent = formatCurrency(total);
    }
  }
  
  // Event listeners
  if (sendCurrencySelect) {
    sendCurrencySelect.addEventListener('change', updateSendTotal);
  }
  
  if (sendAmountInput) {
    sendAmountInput.addEventListener('input', updateSendTotal);
  }
  
  if (confirmSendBtn) {
    confirmSendBtn.addEventListener('click', function() {
      const amount = parseFloat(sendAmountInput.value) || 0;
      const currency = sendCurrencySelect.value;
      const address = recipientAddressInput.value.trim();
      
      if (amount <= 0) {
        showNotification('Por favor, introduce una cantidad válida', 'error');
        return;
      }
      
      if (!address) {
        showNotification('Por favor, introduce una dirección de destino', 'error');
        return;
      }
      
      // In a real app, this would submit the transaction to the backend
      showNotification(`Envío de ${amount} ${currency} a ${address.substring(0, 8)}... completado`, 'success');
      closeModal('sendModal');
      
      // Reset form
      sendAmountInput.value = '';
      recipientAddressInput.value = '';
    });
  }
  
  // Initialize
  updateSendTotal();
}

// Setup receive modal
function setupReceiveModal() {
  const receiveCurrencySelect = document.getElementById('receiveCurrency');
  const receiveAddressElement = document.getElementById('receiveAddress');
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  
  // Update address when currency changes
  function updateReceiveAddress() {
    const currency = receiveCurrencySelect.value;
    
    // In a real app, this would fetch the appropriate address for the selected currency
    let address;
    if (currency === 'BTC') {
      address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    } else if (currency === 'USDC') {
      address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    } else {
      address = 'ES91 2100 0418 4502 0005 1332';
    }
    
    receiveAddressElement.textContent = address;
    
    // In a real app, this would also update the QR code
    console.log(`Updated QR code for ${currency} address: ${address}`);
  }
  
  // Event listeners
  if (receiveCurrencySelect) {
    receiveCurrencySelect.addEventListener('change', updateReceiveAddress);
  }
  
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', function() {
      const address = receiveAddressElement.textContent;
      navigator.clipboard.writeText(address).then(() => {
        showNotification('Dirección copiada al portapapeles', 'success');
      });
    });
  }
}

// Setup notifications
function setupNotifications() {
  const notificationButton = document.getElementById('notificationButton');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const closeNotificationsBtn = document.getElementById('closeNotifications');
  
  if (notificationButton && notificationDropdown) {
    notificationButton.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationDropdown.classList.toggle('active');
    });
    
    closeNotificationsBtn.addEventListener('click', function() {
      notificationDropdown.classList.remove('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!notificationDropdown.contains(e.target) && e.target !== notificationButton) {
        notificationDropdown.classList.remove('active');
      }
    });
  }
  
  // Mark all as read button
  const markAllReadBtn = document.querySelector('.notification-dropdown__footer .btn:first-child');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function() {
      const unreadItems = document.querySelectorAll('.notification-item--unread');
      unreadItems.forEach(item => {
        item.classList.remove('notification-item--unread');
      });
      
      const badge = document.querySelector('.notification-bell__badge');
      if (badge) {
        badge.textContent = '0';
      }
      
      showNotification('Todas las notificaciones marcadas como leídas', 'success');
    });
  }
}

// Setup filters
function setupFilters() {
  // Transaction type filter
  const transactionTypeFilter = document.getElementById('transactionTypeFilter');
  if (transactionTypeFilter) {
    transactionTypeFilter.addEventListener('change', function() {
      const filterValue = this.value;
      const transactions = document.querySelectorAll('.transaction-item');
      
      transactions.forEach(transaction => {
        if (filterValue === 'all' || transaction.getAttribute('data-type') === filterValue) {
          transaction.style.display = 'flex';
        } else {
          transaction.style.display = 'none';
        }
      });
      
      showNotification(`Mostrando transacciones de tipo: ${filterValue}`, 'info');
    });
  }
  
  // Staking filter
  const stakingFilter = document.getElementById('stakingFilter');
  if (stakingFilter) {
    stakingFilter.addEventListener('change', function() {
      const filterValue = this.value;
      showNotification(`Filtrando pools de staking por: ${filterValue}`, 'info');
      
      // In a real app, this would filter the staking pools
    });
  }
  
  // Activity filter
  const activityFilter = document.getElementById('activityFilter');
  if (activityFilter) {
    activityFilter.addEventListener('change', function() {
      const filterValue = this.value;
      const activities = document.querySelectorAll('.activity-item');
      
      activities.forEach(activity => {
        if (filterValue === 'all' || activity.getAttribute('data-type') === filterValue) {
          activity.style.display = 'flex';
        } else {
          activity.style.display = 'none';
        }
      });
      
      showNotification(`Mostrando actividades de tipo: ${filterValue}`, 'info');
    });
  }
}

// Initialize charts
function initCharts() {
  // Balance chart
  initBalanceChart();
  
  // Assets distribution chart
  initAssetsDistributionChart();
}

// Initialize balance chart
function initBalanceChart() {
  const balanceChartCanvas = document.getElementById('balanceChart');
  
  if (!balanceChartCanvas) {
    console.error('Balance chart canvas not found');
    return;
  }
  
  // Sample data for the balance chart
  const balanceData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [{
      label: 'Balance (€)',
      data: [2800, 2950, 3100, 3050, 3200, 3150, 3250, 3300, 3150, 3200, 3100, 3247.85],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#3b82f6',
      tension: 0.4,
      fill: true
    }]
  };
  
  // Chart configuration
  const balanceChartConfig = {
    type: 'line',
    data: balanceData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return formatCurrency(context.raw);
            }
          }
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false,
          beginAtZero: false
        }
      }
    }
  };
  
  // Create the chart
  try {
    // Check if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
      new Chart(balanceChartCanvas, balanceChartConfig);
    } else {
      console.error('Chart.js is not loaded');
      
      // Fallback: create a simple visual representation
      const ctx = balanceChartCanvas.getContext('2d');
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      
      const width = balanceChartCanvas.width;
      const height = balanceChartCanvas.height;
      
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      ctx.lineTo(width * 0.2, height * 0.6);
      ctx.lineTo(width * 0.4, height * 0.5);
      ctx.lineTo(width * 0.6, height * 0.55);
      ctx.lineTo(width * 0.8, height * 0.4);
      ctx.lineTo(width, height * 0.3);
      ctx.stroke();
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    }
  } catch (error) {
    console.error('Error creating balance chart:', error);
  }
}

// Initialize assets distribution chart
function initAssetsDistributionChart() {
  const assetsChartCanvas = document.getElementById('assetsDistributionChart');
  
  if (!assetsChartCanvas) {
    console.error('Assets distribution chart canvas not found');
    return;
  }
  
  // Sample data for the assets distribution chart
  const assetsData = {
    labels: ['Euro', 'Bitcoin', 'USD Coin'],
    datasets: [{
      data: [57, 30, 13],
      backgroundColor: ['#3b82f6', '#f97316', '#10b981'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };
  
  // Chart configuration
  const assetsChartConfig = {
    type: 'doughnut',
    data: assetsData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            boxWidth: 12,
            color: '#64748b'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      cutout: '70%'
    }
  };
  
  // Create the chart
  try {
    // Check if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
      new Chart(assetsChartCanvas, assetsChartConfig);
    } else {
      console.error('Chart.js is not loaded');
      
      // Fallback: create a simple visual representation
      const ctx = assetsChartCanvas.getContext('2d');
      
      // Draw a simple pie chart
      const centerX = assetsChartCanvas.width / 2;
      const centerY = assetsChartCanvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      const colors = ['#3b82f6', '#f97316', '#10b981'];
      const data = [57, 30, 13];
      let startAngle = 0;
      
      for (let i = 0; i < data.length; i++) {
        const endAngle = startAngle + (data[i] / 100) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[i];
        ctx.fill();
        
        startAngle = endAngle;
      }
      
      // Draw a white circle in the middle for the doughnut effect
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  } catch (error) {
    console.error('Error creating assets distribution chart:', error);
  }
}

// Helper function to open a modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('modal--open');
    document.body.classList.add('modal-open');
  }
}

// Helper function to close a modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('modal--open');
    document.body.classList.remove('modal-open');
  }
}

// Helper function to show a notification
function showNotification(message, type = 'info') {
  // Check if the notifications module is available
  if (typeof showToast === 'function') {
    showToast(message, type);
    return;
  }
  
  // Fallback notification
  console.log(`[${type.toUpperCase()}] ${message}`);
  
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__icon">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    </div>
    <div class="notification__content">${message}</div>
    <button class="notification__close">&times;</button>
  `;
  
  // Add to the document
  document.body.appendChild(notification);
  
  // Show the notification
  setTimeout(() => {
    notification.classList.add('notification--show');
  }, 10);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('notification--show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
  
  // Close button
  const closeBtn = notification.querySelector('.notification__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('notification--show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
  }
}

// Format currency helper
function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Load Chart.js if needed
  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = initWallet;
    document.head.appendChild(script);
  } else {
    initWallet();
  }
});