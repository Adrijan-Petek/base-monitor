# 🏛️ Base Monitor

<div align="center">

**Advanced Blockchain Monitoring & Reward Manipulation Detection System**

[![CI](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml/badge.svg)](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://base-monitor-2fpmey31e-adrijangithubgmailcoms-projects.vercel.app)

*Real-time surveillance of Base ecosystem rewards and Farcaster activity for manipulation detection*

</div>

---

## 📊 Table of Contents

- [🏛️ What is Base Monitor?](#-what-is-base-monitor)
- [🎯 Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [📈 Analytics Dashboard](#-analytics-dashboard)
- [🚀 Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [🏃‍♂️ Usage](#️-usage)
- [🐳 Docker Deployment](#-docker-deployment)
- [🌐 API Endpoints](#-api-endpoints)
- [📊 Data Analysis](#-data-analysis)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🏛️ What is Base Monitor?

Base Monitor is a **comprehensive blockchain surveillance system** designed to detect reward manipulation and ensure fair distribution in the Base ecosystem. Built for developers, analysts, and governance participants who need to monitor decentralized reward systems and social activity patterns.

### 🎯 Core Mission

- **🛡️ Manipulation Detection**: Identify suspicious reward distributions using advanced statistical analysis
- **📊 Real-time Monitoring**: 24/7 surveillance of Base blockchain and Farcaster activity
- **�� Risk Assessment**: Automated alerts for high-risk reward patterns
- **📈 Transparency**: Open-source tools for community oversight

### 🌟 Use Cases

- **Protocol Governance**: Monitor reward distributions for fairness
- **Security Research**: Detect potential manipulation schemes
- **Analytics**: Track ecosystem health and user engagement
- **Compliance**: Ensure regulatory compliance in reward systems

---

## 🎯 Key Features

### 🔍 Advanced Analytics

- **Gini Coefficient Analysis**: Measure reward distribution inequality
- **Concentration Metrics**: Track top recipient percentages (1%, 5%, 10%)
- **Manipulation Scoring**: 8-point risk assessment system
- **Time-window Analysis**: Configurable monitoring periods

### 📊 Multi-Platform Coverage

- **🏛️ Base Blockchain**: ERC-20 transfer monitoring across reward contracts
- **🗣️ Farcaster**: Social activity and engagement analysis
- **📱 Base App**: Mini-app reward distributions
- **🔨 Base Builder**: Ecosystem incentive programs

### 🚨 Smart Alerts

- **Risk-based Notifications**: Critical, warning, and info alerts
- **Threshold Configuration**: Customizable alert triggers
- **Real-time Updates**: Live dashboard with auto-refresh
- **Historical Tracking**: Trend analysis over time

### 🛠️ Developer Tools

- **REST API**: Programmatic access to analysis data
- **CLI Tools**: Command-line data collection and analysis
- **Docker Support**: Containerized deployment
- **PostgreSQL Storage**: Robust time-series data persistence

---

## 🏗️ System Architecture

`mermaid
graph TB
    A[Data Collectors] --> B[PostgreSQL Database]
    B --> C[Analysis Engine]
    C --> D[Web Dashboard]
    C --> E[REST API]

    subgraph "Data Sources"
        F[Base RPC]
        G[Farcaster API]
        H[Contract Logs]
    end

    subgraph "Analysis Modules"
        I[Gini Calculator]
        J[Risk Assessor]
        K[Distribution Analyzer]
    end

    F --> A
    G --> A
    H --> A

    I --> C
    J --> C
    K --> C

    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style D fill:#e8f5e8
`

### 🏛️ Architecture Components

| Component | Purpose | Technology |
|-----------|---------|------------|
| **Collectors** | Data ingestion from blockchain & APIs | ethers.js, axios |
| **Analysis Engine** | Statistical analysis & risk detection | Custom algorithms |
| **Storage** | Time-series data persistence | PostgreSQL |
| **Dashboard** | Real-time visualization | HTML5, CSS3, JavaScript |
| **API** | REST endpoints for data access | Express.js |

### 🔄 Data Flow

1. **Collection**: Blockchain logs and API data collected every 5 minutes
2. **Processing**: Raw data decoded and stored in PostgreSQL
3. **Analysis**: Statistical algorithms calculate risk metrics
4. **Visualization**: Results displayed on interactive dashboard
5. **Alerts**: Automated notifications for high-risk patterns

---

## 📈 Analytics Dashboard

<div align="center">

### 🎨 Dashboard Preview

`
┌─────────────────────────────────────────────────────────────┐
│                    🏛️ BASE MONITOR                         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ BASE CHAIN  │  │ FARCASTER   │  │ BUILDER     │         │
│  │             │  │             │  │ PROGRAMS    │         │
│  │ Gini: 0.234 │  │ Gini: 0.156 │  │ Status:     │         │
│  │ Risk: 2/8   │  │ Risk: 1/8   │  │ Planned     │         │
│  │ Recipients: │  │ Authors:    │  └─────────────┘         │
│  │ 1,247       │  │ 892         │                           │
│  └─────────────┘  └─────────────┘                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 REWARD DISTRIBUTION                 │    │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │    │
│  │  │                                                │  │    │
│  │  └─────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 TOP RECIPIENTS                       │    │
│  │  1. 0x1234...abcd  15.67%  ████████▒▒▒▒▒▒▒▒        │    │
│  │  2. 0x5678...efgh   8.92%  █████▒▒▒▒▒▒▒▒▒▒▒▒        │    │
│  │  3. 0x9abc...ijkl   6.34%  ████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
`

</div>

### 📊 Dashboard Features

| Feature | Description |
|---------|-------------|
| **Real-time Charts** | Live reward distribution visualizations |
| **Multi-Platform Analysis** | Separate sections for Base, Farcaster, and Builder programs |
| **Risk Assessment** | Color-coded alerts for manipulation detection |
| **Leaderboards** | Top recipients and concentration analysis |
| **Responsive Design** | Works perfectly on desktop and mobile |
| **Auto-refresh** | Data updates every 5 minutes |

---

## 🚀 Quick Start

Get Base Monitor running in **5 minutes**! Here's the complete setup process:

### 📋 Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Docker & Docker Compose** ([Install](https://docker.com/))
- **Git** ([Download](https://git-scm.com/))

### ⚡ One-Command Setup

`ash
# Clone the repository
git clone https://github.com/Adrijan-Petek/base-monitor.git
cd base-monitor

# Install dependencies
npm ci

# Start database
docker-compose up -d db

# Wait for PostgreSQL to be ready (~30 seconds)
sleep 30

# Initialize database schema
npm run api

# Launch dashboard at http://localhost:3001
npm start
`

### 🌐 Live Demo

Visit the [live dashboard](https://base-monitor-2fpmey31e-adrijangithubgmailcoms-projects.vercel.app) to see Base Monitor in action!

---

## ⚙️ Installation

### Step-by-Step Installation

#### 1. **Clone the Repository**

`ash
git clone https://github.com/Adrijan-Petek/base-monitor.git
cd base-monitor
`

#### 2. **Install Dependencies**

`ash
npm ci
`

#### 3. **Configure Environment**

Copy the example environment file:

`ash
cp .env.example .env
`

Edit .env with your settings:

`ash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/base_monitor

# Blockchain
BASE_RPC=https://mainnet.base.org

# Optional: Farcaster API (recommended)
NEYNAR_API_KEY=your_neynar_api_key_here

# Optional: Skip Farcaster if API key unavailable
SKIP_FARCASTER=true
`

#### 4. **Start Database**

`ash
docker-compose up -d db
`

Wait for PostgreSQL to be ready (~30 seconds).

#### 5. **Initialize Database Schema**

`ash
# The API server will auto-create tables on first run
npm run api
`

#### 6. **Launch Dashboard**

`ash
npm start
`

Open [http://localhost:3001](http://localhost:3001) in your browser!

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| DATABASE_URL | PostgreSQL connection string | - | Yes |
| BASE_RPC | Base network RPC endpoint | https://mainnet.base.org | No |
| NEYNAR_API_KEY | Neynar API key for Farcaster | - | No |
| SKIP_FARCASTER | Skip Farcaster analysis | 	rue | No |
| ALERT_TOP_SHARE | Top recipient alert threshold |  .5 | No |
| ALERT_WINDOW_HOURS | Analysis time window | 24 | No |
| REWARD_CONTRACTS | Comma-separated contract addresses | - | Yes |

### Reward Contract Addresses

The system monitors these Base ecosystem contracts:

`javascript
REWARD_CONTRACTS=0x4200000000000000000000000000000000000042,0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913,0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c,0x1986cc18d8ec757447254310d2604f85741aa732,0x8dc80a209a3362f0586e6c116973bb6908170c84,0x6921b130d297cc43754afba22e5eac0fbf8db75b
`

---

## 🏃‍♂️ Usage

### CLI Commands

Base Monitor provides powerful command-line tools:

`ash
# Collect Base blockchain data
npm run collect-base

# Collect Farcaster activity data
npm run collect-farcaster

# Run complete analysis
npm run analyze

# Start API server
npm run api

# Run tests
npm test
`

### Automated Daily Scanning

Set up GitHub Actions for automated monitoring:

`yaml
# .github/workflows/daily-scan.yml
name: Daily Reward Analysis
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run analyze
`

---

## 🐳 Docker Deployment

### Docker Compose Setup

`yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: base_monitor
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  app:
    build: .
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/base_monitor
    ports:
      - "3001:3001"
    volumes:
      - .:/usr/src/app

volumes:
  db_data:
`

### Build and Run

`ash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f app
`

---

## �� API Endpoints

### REST API

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/analysis | GET | Get latest analysis results |
| /api/health | GET | Health check |
| /api/config | GET | Current configuration |

### API Response Example

`json
{
  "baseBlockchain": {
    "gini": 0.2341,
    "top10Share": 0.67,
    "uniqueRecipients": 1247,
    "manipulationScore": 3,
    "totalVolume": "125000.50",
    "topRecipients": [...]
  },
  "farcaster": {
    "totalCasts": 15420,
    "uniqueAuthors": 892,
    "top10Share": 0.34,
    "manipulationScore": 1
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
`

---

## 📊 Data Analysis

### Gini Coefficient Analysis

The Gini coefficient measures income/reward inequality:

- **0.0**: Perfect equality (everyone gets the same)
- **1.0**: Maximum inequality (one recipient gets everything)

`javascript
// Example calculation
const rewards = [100, 200, 300, 400, 5000];
const gini = calculateGini(rewards); // Returns ~0.67
`

### Risk Assessment Algorithm

8-point manipulation risk scoring:

| Factor | Weight | Description |
|--------|--------|-------------|
| Gini > 0.95 | +3 | Extreme inequality |
| Gini > 0.85 | +2 | Very high inequality |
| Gini > 0.75 | +1 | High inequality |
| Top 1% > 50% | +3 | Extreme concentration |
| Top 1% > 30% | +2 | High concentration |
| Top 1% > 20% | +1 | Moderate concentration |
| Single > 10% | +2 | Individual dominance |
| Single > 5% | +1 | Individual influence |

### Statistical Metrics

- **Concentration Ratios**: Top 1%, 5%, 10% recipient shares
- **Recipient Diversity**: Unique address count
- **Volume Analysis**: Total rewards distributed
- **Time-series Trends**: Historical pattern analysis

---

## 🧪 Testing

Run the test suite:

`ash
npm test
`

### Test Coverage

- **Gini coefficient calculations**
- **Data validation**
- **API endpoints**
- **Database operations**

### Manual Testing

`ash
# Test data collection
npm run collect-base

# Test analysis
npm run analyze

# Test API
curl http://localhost:3001/api/analysis
`

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

`ash
# Fork and clone
git clone https://github.com/your-username/base-monitor.git
cd base-monitor

# Install dependencies
npm ci

# Start development database
docker-compose up -d db

# Run tests
npm test

# Start development server
npm run dev
`

### Code Standards

- **ES6+ JavaScript** with modules
- **Async/await** for asynchronous operations
- **Descriptive variable names** and comments
- **Error handling** with try/catch blocks
- **Modular architecture** with clear separation of concerns

### Reporting Issues

- Use [GitHub Issues](https://github.com/Adrijan-Petek/base-monitor/issues) for bugs
- Include environment details and reproduction steps
- Attach relevant log files and screenshots

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for the Base ecosystem**

[⭐ Star us on GitHub](https://github.com/Adrijan-Petek/base-monitor) • [🐛 Report Issues](https://github.com/Adrijan-Petek/base-monitor/issues) • [📖 Documentation](https://github.com/Adrijan-Petek/base-monitor/wiki)

</div>
