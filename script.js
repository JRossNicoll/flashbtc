// Initialize Lucide icons
lucide.createIcons();

// Format number to currency
const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};

// Format number to compact currency (e.g., $1.2B)
const formatCompactCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short'
    }).format(number);
};

// Format percentage
const formatPercentage = (number) => {
    const formatted = number.toFixed(2);
    return `${number >= 0 ? '+' : ''}${formatted}%`;
};

// Update price colors based on change
const updatePriceColor = (element, change) => {
    element.className = `${element.className.split(' ')[0]} ${change >= 0 ? 'text-green-500' : 'text-red-500'}`;
};

// Simulate real-time price updates
const generatePrice = (basePrice) => {
    const variance = basePrice * 0.02; // 2% variance
    return basePrice + (Math.random() * variance * 2 - variance);
};

// Update crypto prices and stats
const updateCryptoPrices = () => {
    // BTC simulation
    const btcPrice = generatePrice(48000);
    const btcChange = (Math.random() * 6) - 3; // -3% to +3%
    
    document.querySelector('.btc-price').textContent = formatCurrency(btcPrice);
    const btcChangeElement = document.querySelector('.btc-change');
    btcChangeElement.textContent = formatPercentage(btcChange);
    updatePriceColor(btcChangeElement, btcChange);
    
    document.querySelector('.btc-volume').textContent = formatCompactCurrency(42.8e9);
    document.querySelector('.btc-market-cap').textContent = formatCompactCurrency(921.6e9);
    document.querySelector('.btc-high').textContent = formatCurrency(btcPrice * 1.02);
    document.querySelector('.btc-low').textContent = formatCurrency(btcPrice * 0.98);

    // ETH simulation
    const ethPrice = generatePrice(2800);
    const ethChange = (Math.random() * 6) - 3;
    
    document.querySelector('.eth-price').textContent = formatCurrency(ethPrice);
    const ethChangeElement = document.querySelector('.eth-change');
    ethChangeElement.textContent = formatPercentage(ethChange);
    updatePriceColor(ethChangeElement, ethChange);
    
    document.querySelector('.eth-volume').textContent = formatCompactCurrency(18.2e9);
    document.querySelector('.eth-market-cap').textContent = formatCompactCurrency(342.8e9);
    document.querySelector('.eth-high').textContent = formatCurrency(ethPrice * 1.02);
    document.querySelector('.eth-low').textContent = formatCurrency(ethPrice * 0.98);
};

// Update security indicators
const updateSecurityStatus = () => {
    const indicators = document.querySelectorAll('.security-indicator');
    indicators.forEach(indicator => {
        indicator.classList.toggle('animate-pulse');
    });
};

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for elements
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-hover').forEach(el => observer.observe(el));
};

// Initialize everything
const initialize = () => {
    updateCryptoPrices();
    updateSecurityStatus();
    observeElements();
    
    // Set up intervals for updates
    setInterval(updateCryptoPrices, 3000);
    setInterval(updateSecurityStatus, 2000);
};

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);
