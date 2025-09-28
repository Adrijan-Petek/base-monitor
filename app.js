// Base Monitor Dashboard JavaScript
class RewardMonitorDashboard {
    constructor() {
        this.charts = {};
        this.lastUpdate = null;
        this.historicalData = null;
        this.init();
    }

    async init() {
        this.showLoading();
        await this.loadData();
        this.setupAutoRefresh();
        this.setupModalEvents();
    }

    showLoading() {
        document.getElementById('lastUpdate').innerHTML = '<span class="loading"></span> Loading data...';
        document.getElementById('statusDot').style.background = '#ffaa00';
    }

    async loadData() {
        try {
            const response = await fetch('/api/analysis');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            this.updateDashboard(data);
            this.updateLastUpdate();
            document.getElementById('statusDot').style.background = 'var(--success-color)';

        } catch (error) {
            console.error('Failed to load data:', error);
            this.showError('Failed to load analysis data. Retrying...');
            document.getElementById('statusDot').style.background = 'var(--danger-color)';

            // Retry after 30 seconds
            setTimeout(() => this.loadData(), 30000);
        }
    }

    updateDashboard(data) {
        if (data.baseBlockchain) {
            this.updateBaseBlockchain(data.baseBlockchain);
        }
        if (data.farcaster) {
            this.updateFarcaster(data.farcaster);
        }
        if (data.baseBuilder) {
            this.updateBaseBuilder(data.baseBuilder);
        }
        if (data.baseApp) {
            this.updateBaseApp(data.baseApp);
        }
    }

    updateBaseBlockchain(data) {
        // Update metrics
        document.getElementById('baseGini').textContent = data.gini.toFixed(4);
        document.getElementById('baseTop10').textContent = data.top10Share.toFixed(2) + '%';
        document.getElementById('baseRecipients').textContent = data.uniqueRecipients.toLocaleString();

        // Update risk score
        const riskElement = document.getElementById('baseRisk');
        riskElement.textContent = `${data.manipulationScore}/8`;
        riskElement.className = 'metric-value risk-score';

        if (data.manipulationScore >= 5) {
            riskElement.classList.add('critical');
        } else if (data.manipulationScore >= 3) {
            riskElement.classList.add('warning');
        } else {
            riskElement.classList.add('normal');
        }

        // Update alert badge
        const alertElement = document.getElementById('baseAlert');
        if (data.manipulationScore >= 5) {
            alertElement.textContent = 'CRITICAL RISK';
            alertElement.className = 'alert-badge critical';
        } else if (data.manipulationScore >= 3) {
            alertElement.textContent = 'HIGH RISK';
            alertElement.className = 'alert-badge warning';
        } else {
            alertElement.textContent = 'MONITORING';
            alertElement.className = 'alert-badge';
        }

        // Update chart
        this.updateBaseChart(data);

        // Update top recipients
        this.updateTopRecipients(data.topRecipients);
    }

    updateBaseChart(data) {
        const ctx = document.getElementById('baseChart').getContext('2d');

        if (this.charts.baseChart) {
            this.charts.baseChart.destroy();
        }

        const labels = ['Top 1%', 'Top 5%', 'Top 10%', 'Bottom 90%'];
        const values = [
            data.top1Share,
            data.top5Share,
            data.top10Share,
            100 - data.top10Share
        ];

        this.charts.baseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#FF4444', // Critical red for top 1%
                        '#FFAA00', // Warning orange for top 5%
                        '#0052FF', // Primary blue for top 10%
                        '#44FF44'  // Success green for bottom 90%
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    updateTopRecipients(recipients) {
        const container = document.querySelector('#baseTopRecipients .recipients-list');
        container.innerHTML = '';

        recipients.slice(0, 10).forEach((recipient, index) => {
            const item = document.createElement('div');
            item.className = 'recipient-item';

            item.innerHTML = `
                <span class="recipient-rank">#${index + 1}</span>
                <span class="recipient-address">${recipient.address}</span>
                <span class="recipient-amount">${recipient.percentage.toFixed(4)}%</span>
            `;

            container.appendChild(item);
        });
    }

    updateFarcaster(data) {
        // Update metrics from blockchain-detected Farcaster data
        document.getElementById('farcasterTransfers').textContent = data.totalCasts?.toLocaleString() || '0';
        document.getElementById('farcasterRecipients').textContent = data.uniqueAuthors?.toLocaleString() || '0';
        document.getElementById('farcasterVolume').textContent = data.totalVolume ? parseFloat(data.totalVolume).toFixed(2) : '0.00';

        const statusElement = document.getElementById('farcasterStatus');
        if (data.totalCasts > 0) {
            statusElement.textContent = 'Active Detection';
            statusElement.style.background = 'var(--success-color)';
            statusElement.style.color = 'black';
        } else {
            statusElement.textContent = 'Monitoring';
            statusElement.style.background = 'var(--warning-color)';
        }

        // Update Farcaster chart
        this.updateFarcasterChart(data);

        // Update top Farcaster recipients
        this.updateFarcasterTopRecipients(data.farcasterTopRecipients || []);
    }

    updateFarcasterChart(data) {
        const ctx = document.getElementById('farcasterChart').getContext('2d');

        if (this.charts.farcasterChart) {
            this.charts.farcasterChart.destroy();
        }

        // Create a simple bar chart showing Farcaster transfers vs total transfers
        const totalTransfers = data.totalTransfers || 0;
        const farcasterTransfers = data.totalCasts || 0;
        const otherTransfers = totalTransfers - farcasterTransfers;

        this.charts.farcasterChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Farcaster Transfers', 'Other Transfers'],
                datasets: [{
                    data: [farcasterTransfers, otherTransfers],
                    backgroundColor: [
                        '#00D4FF', // Farcaster blue
                        '#444444'  // Other transfers
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                return context.label + ': ' + context.parsed.toLocaleString() + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    updateFarcasterTopRecipients(recipients) {
        const container = document.querySelector('#farcasterTopRecipients .recipients-list');
        container.innerHTML = '';

        if (!recipients || recipients.length === 0) {
            container.innerHTML = '<div class="no-data">No Farcaster recipients detected yet</div>';
            return;
        }

        recipients.slice(0, 10).forEach((recipient, index) => {
            const item = document.createElement('div');
            item.className = 'recipient-item';

            item.innerHTML = `
                <span class="recipient-rank">#${index + 1}</span>
                <span class="recipient-address">${recipient.address}</span>
                <span class="recipient-amount">${recipient.percentage.toFixed(2)}%</span>
            `;

            container.appendChild(item);
        });
    }

    updateBaseBuilder(data) {
        // For now, we'll show all blockchain data as "Base Builder" since we don't have separate categorization
        // In a real implementation, you'd filter by specific Base Builder contracts
        document.getElementById('builderTransfers').textContent = data.totalTransfers?.toLocaleString() || '0';
        document.getElementById('builderRecipients').textContent = data.uniqueRecipients?.toLocaleString() || '0';
        document.getElementById('builderVolume').textContent = data.totalVolume ? parseFloat(data.totalVolume).toFixed(2) : '0.00';

        const statusElement = document.getElementById('baseBuilderStatus');
        if (data.totalTransfers > 0) {
            statusElement.textContent = 'Active Monitoring';
            statusElement.style.background = 'var(--success-color)';
            statusElement.style.color = 'black';
        } else {
            statusElement.textContent = 'Monitoring';
            statusElement.style.background = 'var(--warning-color)';
        }

        // Update Base Builder chart
        this.updateBaseBuilderChart(data);

        // Update top Base Builder recipients
        this.updateBaseBuilderTopRecipients(data.topRecipients || []);
    }

    updateBaseBuilderChart(data) {
        const ctx = document.getElementById('builderChart').getContext('2d');

        if (this.charts.builderChart) {
            this.charts.builderChart.destroy();
        }

        // Create a distribution chart showing top recipients
        const topRecipients = data.topRecipients || [];
        const labels = topRecipients.slice(0, 5).map((r, i) => `Top ${i + 1}`);
        const values = topRecipients.slice(0, 5).map(r => parseFloat(r.percentage));

        // Add "Others" category
        const top5Total = values.reduce((sum, val) => sum + val, 0);
        const othersPercentage = Math.max(0, 100 - top5Total);

        if (othersPercentage > 0) {
            labels.push('Others');
            values.push(othersPercentage);
        }

        this.charts.builderChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#FF6B6B', // Red
                        '#4ECDC4', // Teal
                        '#45B7D1', // Blue
                        '#96CEB4', // Green
                        '#FFEAA7', // Yellow
                        '#DDA0DD'  // Plum for others
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    updateBaseBuilderTopRecipients(recipients) {
        const container = document.querySelector('#builderTopRecipients .recipients-list');
        container.innerHTML = '';

        if (!recipients || recipients.length === 0) {
            container.innerHTML = '<div class="no-data">No builder recipients detected yet</div>';
            return;
        }

        recipients.slice(0, 10).forEach((recipient, index) => {
            const item = document.createElement('div');
            item.className = 'recipient-item';

            item.innerHTML = `
                <span class="recipient-rank">#${index + 1}</span>
                <span class="recipient-address">${recipient.address}</span>
                <span class="recipient-amount">${recipient.percentage.toFixed(4)}%</span>
            `;

            container.appendChild(item);
        });
    }

    updateBaseApp(data) {
        // Update status
        const statusElement = document.getElementById('baseAppStatus');
        statusElement.textContent = data.status === 'active' ? 'Active' : 'Monitoring';
        statusElement.className = `status-badge ${data.status === 'active' ? 'active' : 'monitoring'}`;

        // Update metrics
        document.getElementById('appTransfers').textContent = data.totalTransfers.toLocaleString();
        document.getElementById('appRecipients').textContent = data.uniqueRecipients.toLocaleString();
        document.getElementById('appVolume').textContent = parseFloat(data.totalVolume).toFixed(4);

        // Update chart and recipients
        this.updateBaseAppChart(data);
        this.updateBaseAppTopRecipients(data.topRecipients || []);
    }

    updateBaseAppChart(data) {
        const ctx = document.getElementById('appChart');
        if (!ctx) return;

        const chart = Chart.getChart(ctx);
        if (chart) {
            chart.destroy();
        }

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['App Recipients', 'Other Activity'],
                datasets: [{
                    data: [data.uniqueRecipients, Math.max(1, data.totalTransfers - data.uniqueRecipients)],
                    backgroundColor: [
                        'rgba(255, 193, 7, 0.8)',   // Yellow for app recipients
                        'rgba(255, 193, 7, 0.2)'    // Light yellow for other
                    ],
                    borderColor: [
                        'rgba(255, 193, 7, 1)',
                        'rgba(255, 193, 7, 0.3)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    updateBaseAppTopRecipients(recipients) {
        const container = document.querySelector('#appTopRecipients .recipients-list');
        container.innerHTML = '';

        if (!recipients || recipients.length === 0) {
            container.innerHTML = '<div class="no-data">No app recipients detected yet</div>';
            return;
        }

        recipients.slice(0, 10).forEach((recipient, index) => {
            const item = document.createElement('div');
            item.className = 'recipient-item';

            item.innerHTML = `
                <span class="recipient-rank">#${index + 1}</span>
                <span class="recipient-address">${recipient.address}</span>
                <span class="recipient-amount">${recipient.percentage.toFixed(4)}%</span>
            `;

            container.appendChild(item);
        });
    }

    updateLastUpdate() {
        this.lastUpdate = new Date();
        const timeString = this.lastUpdate.toLocaleString();
        document.getElementById('lastUpdate').textContent = `Last updated: ${timeString}`;
    }

    setupAutoRefresh() {
        // Refresh every 5 minutes
        setInterval(() => {
            this.loadData();
        }, 5 * 60 * 1000);
    }

    showError(message) {
        document.getElementById('lastUpdate').innerHTML = `<span class="error">${message}</span>`;
    }

    // Modal functionality
    setupModalEvents() {
        const reportsBtn = document.getElementById('reportsBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        const modal = document.getElementById('reportsModal');
        const closeBtn = document.getElementById('closeModal');
        const tabBtns = document.querySelectorAll('.tab-btn');

        reportsBtn.addEventListener('click', () => this.openReportsModal());
        refreshBtn.addEventListener('click', () => this.loadData());
        closeBtn.addEventListener('click', () => this.closeReportsModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeReportsModal();
        });

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchChartTab(btn.dataset.chart));
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeReportsModal();
            }
        });
    }

    async openReportsModal() {
        const modal = document.getElementById('reportsModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Load historical data if not already loaded
        if (!this.historicalData) {
            await this.loadHistoricalData();
        } else {
            this.updateHistoricalModal();
        }
    }

    closeReportsModal() {
        const modal = document.getElementById('reportsModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async loadHistoricalData() {
        try {
            const response = await fetch('/api/historical');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            this.historicalData = await response.json();
            this.updateHistoricalModal();
        } catch (error) {
            console.error('Failed to load historical data:', error);
            this.showHistoricalError('Failed to load historical data. Please try again.');
        }
    }

    updateHistoricalModal() {
        if (!this.historicalData) return;

        // Update summary cards
        const summary = this.historicalData.summary;
        document.getElementById('totalPeriod').textContent = `${summary.totalDays} days`;
        document.getElementById('totalTransfers').textContent = summary.totalTransfers.toLocaleString();
        document.getElementById('totalVolume').textContent = `${parseFloat(summary.totalVolume).toFixed(2)} ETH`;
        document.getElementById('farcasterActivity').textContent = `${summary.totalFarcasterTransfers} transfers`;

        // Update data table
        this.updateHistoricalTable();

        // Initialize with transfers chart
        this.switchChartTab('transfers');
    }

    updateHistoricalTable() {
        const tbody = document.getElementById('historicalTableBody');
        tbody.innerHTML = '';

        this.historicalData.dailyData.forEach(day => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(day.date).toLocaleDateString()}</td>
                <td>${day.totalTransfers.toLocaleString()}</td>
                <td>${day.uniqueRecipients.toLocaleString()}</td>
                <td>${parseFloat(day.totalVolume).toFixed(4)}</td>
                <td>${day.farcasterTransfers.toLocaleString()}</td>
                <td>${parseFloat(day.farcasterVolume).toFixed(4)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    switchChartTab(chartType) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-chart="${chartType}"]`).classList.add('active');

        // Update chart
        this.updateHistoricalChart(chartType);
    }

    updateHistoricalChart(chartType) {
        const ctx = document.getElementById('historicalChart').getContext('2d');

        if (this.charts.historicalChart) {
            this.charts.historicalChart.destroy();
        }

        const data = this.historicalData.dailyData;
        const labels = data.map(d => new Date(d.date).toLocaleDateString());

        let datasets = [];
        let title = '';

        switch (chartType) {
            case 'transfers':
                datasets = [
                    {
                        label: 'Total Transfers',
                        data: data.map(d => d.totalTransfers),
                        borderColor: '#0052FF',
                        backgroundColor: 'rgba(0, 82, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Farcaster Transfers',
                        data: data.map(d => d.farcasterTransfers),
                        borderColor: '#00D4FF',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ];
                title = 'Daily Transfer Activity (Last 90 Days)';
                break;

            case 'volume':
                datasets = [
                    {
                        label: 'Total Volume (ETH)',
                        data: data.map(d => parseFloat(d.totalVolume)),
                        borderColor: '#44FF44',
                        backgroundColor: 'rgba(68, 255, 68, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Farcaster Volume (ETH)',
                        data: data.map(d => parseFloat(d.farcasterVolume)),
                        borderColor: '#FFAA00',
                        backgroundColor: 'rgba(255, 170, 0, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ];
                title = 'Daily Volume Activity (Last 90 Days)';
                break;

            case 'farcaster':
                datasets = [
                    {
                        label: 'Farcaster Transfers',
                        data: data.map(d => d.farcasterTransfers),
                        borderColor: '#00D4FF',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Farcaster Recipients',
                        data: data.map(d => d.farcasterRecipients),
                        borderColor: '#FF4444',
                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ];
                title = 'Farcaster Activity Breakdown (Last 90 Days)';
                break;

            case 'cumulative':
                datasets = [
                    {
                        label: 'Cumulative Transfers',
                        data: data.map(d => d.cumulativeTransfers),
                        borderColor: '#0052FF',
                        backgroundColor: 'rgba(0, 82, 255, 0.1)',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Cumulative Farcaster',
                        data: data.map(d => d.cumulativeFarcasterTransfers),
                        borderColor: '#00D4FF',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        fill: false,
                        tension: 0.4
                    }
                ];
                title = 'Cumulative Growth (Last 90 Days)';
                break;
        }

        this.charts.historicalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        color: 'white',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date',
                            color: 'white'
                        },
                        ticks: {
                            color: 'white',
                            maxTicksLimit: 7
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: chartType === 'volume' ? 'Volume (ETH)' : 'Count',
                            color: 'white'
                        },
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y1: chartType === 'farcaster' ? {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Recipients',
                            color: 'white'
                        },
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    } : undefined
                }
            }
        });
    }

    showHistoricalError(message) {
        const tbody = document.getElementById('historicalTableBody');
        tbody.innerHTML = `<tr><td colspan="6" class="error">${message}</td></tr>`;
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new RewardMonitorDashboard();
});

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.platform-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});