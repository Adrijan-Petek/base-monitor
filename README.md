# Base Monitor

# 🏛️ Base Monitor

<div align="center">

**Advanced Blockchain Monitoring & Reward Manipulation Detection System**

[![CI](https://img.shields.io/badge/CI-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)]()

*Real-time surveillance of Base ecosystem rewards and Farcaster activity for manipulation detection*

</div>

---

## 📊 Table of Contents

* [🏛️ What is Base Monitor?](#-what-is-base-monitor)
* [🎯 Key Features](#-key-features)
* [🏗️ System Architecture](#-system-architecture)
* [📈 Analytics Dashboard](#-analytics-dashboard)
* [🚀 Quick Start](#-quick-start)
* [📋 Prerequisites](#-prerequisites)
* [⚙️ Installation](#-installation)
* [🔧 Configuration](#-configuration)
* [🏃‍♂️ Usage](#-usage)
* [🐳 Docker Deployment](#-docker-deployment)
* [🌐 API Endpoints](#-api-endpoints)
* [📊 Data Analysis](#-data-analysis)
* [🧪 Testing](#-testing)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## 🏛️ What is Base Monitor?

Base Monitor is a **comprehensive blockchain surveillance system** designed to detect reward manipulation and ensure fair distribution in the Base ecosystem. Built for developers, analysts, and governance participants who need to monitor decentralized reward systems and social activity patterns.

### 🎯 Core Mission

* **🛡️ Manipulation Detection**: Identify suspicious reward distributions using advanced statistical analysis
* **📊 Real-time Monitoring**: 24/7 surveillance of Base blockchain and Farcaster activity
* **⚠️ Risk Assessment**: Automated alerts for high-risk reward patterns
* **📈 Transparency**: Open-source tools for community oversight

### 🌟 Use Cases

* **Protocol Governance**: Monitor reward distributions for fairness
* **Security Research**: Detect potential manipulation schemes
* **Analytics**: Track ecosystem health and user engagement
* **Compliance**: Ensure regulatory compliance in reward systems

---

## 🎯 Key Features

### 🔍 Advanced Analytics

* **Gini Coefficient Analysis**: Measure reward distribution inequality
* **Concentration Metrics**: Track top recipient percentages (1%, 5%, 10%)
* **Manipulation Scoring**: 8-point risk assessment system
* **Time-window Analysis**: Configurable monitoring periods

### 📊 Multi-Platform Coverage

* **🏛️ Base Blockchain**: ERC-20 transfer monitoring across reward contracts
* **🗣️ Farcaster**: Social activity and engagement analysis
* **📱 Base App**: Mini-app reward distributions
* **🔨 Base Builder**: Ecosystem incentive programs

### 🚨 Smart Alerts

* **Risk-based Notifications**: Critical, warning, and info alerts
* **Threshold Configuration**: Customizable alert triggers
* **Real-time Updates**: Live dashboard with auto-refresh
* **Historical Tracking**: Trend analysis over time

### 🛠️ Developer Tools

* **REST API**: Programmatic access to analysis data
* **CLI Tools**: Command-line data collection and analysis
* **Docker Support**: Containerized deployment
* **PostgreSQL Storage**: Robust time-series data persistence

---

## 🏗️ System Architecture

```mermaid
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

    style A fill:##ff0000,stroke:#333,stroke-width:2px
    style C fill:##ff0000,stroke:#444,stroke-width:2px
    style D fill:#ff0000,stroke:#222,stroke-width:2px
```

### 🏛️ Architecture Components

| Component           | Purpose                               | Technology        |
| ------------------- | ------------------------------------- | ----------------- |
| **Collectors**      | Data ingestion from blockchain & APIs | ethers.js, axios  |
| **Analysis Engine** | Statistical analysis & risk detection | Custom algorithms |
| **Storage**         | Time-series data persistence          | PostgreSQL        |
| **Dashboard**       | Real-time visualization               | HTML5, CSS3, JS   |
| **API**             | REST endpoints for data access        | Express.js        |

### 🔄 Data Flow

1. **Collection**: Blockchain logs and API data collected every 5 minutes
2. **Processing**: Raw data decoded and stored in PostgreSQL
3. **Analysis**: Statistical algorithms calculate risk metrics
4. **Visualization**: Results displayed on interactive dashboard
5. **Alerts**: Automated notifications for high-risk patterns

---

## 📈 Analytics Dashboard

<div align="center">

### 🎨 Dashboard Preview (Dark Mode)

![Dashboard Preview](./capture.png)

</div>

### 📊 Dashboard Features

| Feature                     | Description                                   |
| --------------------------- | --------------------------------------------- |
| **Real-time Charts**        | Live reward distribution visualizations       |
| **Multi-Platform Analysis** | Base, Farcaster, Builder programs             |
| **Risk Assessment**         | Color-coded alerts for manipulation detection |
| **Leaderboards**            | Top recipients and concentration analysis     |
| **Responsive Design**       | Works perfectly on desktop and mobile         |
| **Auto-refresh**            | Data updates every 5 minutes                  |

---

## 🚀 Quick Start

### 📋 Prerequisites

* **Node.js 18+** ([Download](https://nodejs.org/))
* **Docker & Docker Compose** ([Install](https://docker.com/))
* **Git** ([Download](https://git-scm.com/))

### ⚡ One-Command Setup

```bash
# Clone the repository
git clone https://github.com/Adrijan-Petek/base-monitor.git
cd base-monitor

# Install dependencies
npm ci

# Start database
docker-compose up -d db

# Wait ~30 seconds for PostgreSQL
sleep 30

# Launch dashboard at http://localhost:3001
npm start
```

### 🌐 Live Demo

[Live Dashboard Preview](https://base-monitor.vercel.app/)

---

## ⚙️ Installation & Configuration

1. Copy `.env.example` → `.env`
2. Set RPC endpoints, database URL, and optional API keys
3. Launch Docker PostgreSQL
4. Run API server or dashboard

### Example `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/base_monitor
BASE_RPC=https://mainnet.base.org
NEYNAR_API_KEY=your_neynar_api_key_here
SKIP_FARCASTER=true
```

---

## 🏃‍♂️ Usage

* **Start dashboard**: `npm start`
* **Run API**: `npm run api`
* **View results**: [http://localhost:3001](http://localhost:3001)

---

## 📄 License

MIT License





