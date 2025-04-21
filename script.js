// Mock Data Generator
function generateMockData(count) {
    const regions = ['North', 'South', 'East', 'West'];
    const distributors = Array.from({ length: count }, (_, i) => ({
        id: `DIST-${1000 + i}`,
        name: `Distributor ${i + 1}`,
        region: regions[Math.floor(Math.random() * regions.length)],
        lastMonthQuantity: Math.floor(Math.random() * 12000) + 3000,
        forecastedQuantity: Math.floor(Math.random() * 15000) + 4000,
        ytdAverage: Math.floor(Math.random() * 10000) + 5000,
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
        performance: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)]
    }));

    return {
        distributors,
        lastUpdated: new Date().toISOString(),
        summary: {
            totalDistributors: count,
            averageYTD: Math.floor(distributors.reduce((acc, curr) => acc + curr.ytdAverage, 0) / count),
            totalLastMonth: distributors.reduce((acc, curr) => acc + curr.lastMonthQuantity, 0),
            totalForecast: distributors.reduce((acc, curr) => acc + curr.forecastedQuantity, 0)
        }
    };
}

// Format Number with Commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update Summary Cards
function updateSummaryCards(data) {
    document.getElementById('total-distributors').textContent = formatNumber(data.summary.totalDistributors);
    document.getElementById('average-ytd').textContent = formatNumber(data.summary.averageYTD);
    document.getElementById('last-month-total').textContent = formatNumber(data.summary.totalLastMonth);
    document.getElementById('forecast-total').textContent = formatNumber(data.summary.totalForecast);
}

// Get Trend Icon
function getTrendIcon(trend) {
    switch (trend) {
        case 'up':
            return '<i class="fas fa-arrow-up trend-up"></i>';
        case 'down':
            return '<i class="fas fa-arrow-down trend-down"></i>';
        default:
            return '<i class="fas fa-minus trend-stable"></i>';
    }
}

// Get Performance Badge
function getPerformanceBadge(performance) {
    return `<span class="performance-badge performance-${performance}">${performance}</span>`;
}

// Update Distributors Table
function updateDistributorsTable(distributors) {
    const tbody = document.getElementById('distributors-table-body');
    tbody.innerHTML = distributors.map(distributor => `
        <tr>
            <td>${distributor.name}</td>
            <td>${distributor.region}</td>
            <td>${formatNumber(distributor.lastMonthQuantity)}</td>
            <td>${formatNumber(distributor.forecastedQuantity)}</td>
            <td>${formatNumber(distributor.ytdAverage)}</td>
            <td>${getTrendIcon(distributor.trend)}</td>
            <td>${getPerformanceBadge(distributor.performance)}</td>
        </tr>
    `).join('');
}

// Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    let currentData = null;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (!currentData) return;

        const filteredDistributors = currentData.distributors.filter(distributor =>
            distributor.name.toLowerCase().includes(searchTerm) ||
            distributor.region.toLowerCase().includes(searchTerm)
        );

        updateDistributorsTable(filteredDistributors);
    });
}

// Export Functionality
function setupExport() {
    const exportBtn = document.querySelector('.export-btn');
    exportBtn.addEventListener('click', () => {
        // In a real implementation, this would export the data to CSV or Excel
        alert('Export functionality will be implemented when backend is ready');
    });
}

// Filter Functionality
function setupFilters() {
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn.addEventListener('click', () => {
        // In a real implementation, this would open a filter modal
        alert('Filter functionality will be implemented when backend is ready');
    });
}

// Simulate Real-time Updates
function simulateUpdates() {
    setInterval(() => {
        const newData = generateMockData(20);
        updateSummaryCards(newData);
        updateDistributorsTable(newData.distributors);
    }, 5000); // Update every 5 seconds
}

// Initialize Dashboard
function initDashboard() {
    const mockData = generateMockData(20);
    updateSummaryCards(mockData);
    updateDistributorsTable(mockData.distributors);
    setupSearch();
    setupExport();
    setupFilters();
    simulateUpdates();
}

// Start the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard); 