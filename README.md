# 🔍 Base Monitor# 🔍 Base Monitor# 🔍 Base Monitor



<div align="center">



![Base Monitor Logo](public/favicon.svg)<div align="center"><div align="center">



**Reward & Farcaster Correlation Scanner**



[![CI](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml/badge.svg)](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml)![Base Monitor Logo](public/favicon.svg)![Base Monitor Logo](public/favicon.svg)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

**Reward & Farcaster Correlation Scanner****Reward & Farcaster Correlation Scanner**

*Monitor Base blockchain rewards and Farcaster activity for manipulation detection*



[🚀 Quick Start](#-quick-start) • [📊 Live Dashboard](#-live-dashboard) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

[![CI](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml/badge.svg)](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml)[![CI](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml/badge.svg)](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml)

</div>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

## ✨ What is Base Monitor?

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

Base Monitor is a comprehensive **blockchain monitoring system** that scans Base ecosystem on-chain logs and Farcaster off-chain activity to detect anomalous reward distributions and correlations. Built for developers who need to monitor decentralized reward systems and social activity patterns.



### 🎯 Key Capabilities

*Monitor Base blockchain rewards and Farcaster activity for manipulation detection**Monitor Base blockchain rewards and Farcaster activity for manipulation detection*

- **🔍 Real-time Monitoring**: 24/7 surveillance of reward contracts

- **📊 Advanced Analytics**: Gini coefficient analysis and anomaly detection

- **🚨 Smart Alerts**: Automated detection of suspicious distributions

- **🤖 Auto Discovery**: Automatically finds new reward contracts[🚀 Quick Start](#-quick-start) • [📊 Live Dashboard](#-live-dashboard) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)[🚀 Quick Start](#-quick-start) • [📊 Live Dashboard](#-live-dashboard) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

- **📱 Web Dashboard**: Beautiful real-time visualization interface

- **🐳 Docker Ready**: One-command deployment



---</div></div>



## 🏗️ System Architecture



```------

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

│   Collectors    │    │    Analyzer     │    │    Storage      │

│                 │    │                 │    │                 │

│ • Base RPC      │───▶│ • Gini Analysis │───▶│ • PostgreSQL    │## ✨ What is Base Monitor?## ✨ What is Base Monitor?

│ • Farcaster API │    │ • Anomaly       │    │ • Time-series   │

│ • Contract Scan │    │   Detection     │    │ • Indexed       │

└─────────────────┘    └─────────────────┘    └─────────────────┘

         │                       │                       │Base Monitor is a comprehensive **blockchain monitoring system** that scans Base ecosystem on-chain logs and Farcaster off-chain activity to detect anomalous reward distributions and correlations. Built for developers who need to monitor decentralized reward systems and social activity patterns.Base Monitor is a comprehensive **blockchain monitoring system** that scans Base ecosystem on-chain logs and Farcaster off-chain activity to detect anomalous reward distributions and correlations. Built for developers who need to monitor decentralized reward systems and social activity patterns.

         ▼                       ▼                       ▼

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

│   Web Dashboard │    │   Alert System  │    │   API Endpoints │

│                 │    │                 │    │                 │### 🎯 Key Capabilities### 🎯 Key Capabilities

│ • Real-time     │◀───│ • Email/Slack   │    │ • REST API      │

│ • Charts        │    │ • Thresholds    │    │ • WebSocket     │

│ • Mobile Ready  │    │ • Auto-scaling  │    │ • CORS Enabled  │

└─────────────────┘    └─────────────────┘    └─────────────────┘- **🔍 Real-time Monitoring**: 24/7 surveillance of reward contracts- **🔍 Real-time Monitoring**: 24/7 surveillance of reward contracts

```

- **📊 Advanced Analytics**: Gini coefficient analysis and anomaly detection- **📊 Advanced Analytics**: Gini coefficient analysis and anomaly detection

### 🧩 Components

- **🚨 Smart Alerts**: Automated detection of suspicious distributions- **🚨 Smart Alerts**: Automated detection of suspicious distributions

| Component | Purpose | Technology |

|-----------|---------|------------|- **🤖 Auto Discovery**: Automatically finds new reward contracts- **🤖 Auto Discovery**: Automatically finds new reward contracts

| **Collectors** | Data ingestion from blockchain & social APIs | ethers.js, axios |

| **Analyzer** | Statistical analysis & anomaly detection | Custom algorithms |- **📱 Web Dashboard**: Beautiful real-time visualization interface- **📱 Web Dashboard**: Beautiful real-time visualization interface

| **Storage** | Time-series data persistence | PostgreSQL |

| **Dashboard** | Real-time visualization | HTML5, CSS3, JavaScript |- **🐳 Docker Ready**: One-command deployment- **🐳 Docker Ready**: One-command deployment

| **API** | REST endpoints for data access | Express.js |



---

------

## 🚀 Quick Start



Get Base Monitor running in **5 minutes**! Here's the complete setup process:

## 🏗️ System Architecture## 🏗️ System Architecture

### 📋 Prerequisites



- ✅ Node.js 18+ ([Download](https://nodejs.org/))

- ✅ Docker & Docker Compose ([Install](https://docker.com/))``````

- ✅ Git ([Download](https://git-scm.com/))

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

### ⚡ Step-by-Step Installation

│   Collectors    │    │    Analyzer     │    │    Storage      ││   Collectors    │    │    Analyzer     │    │    Storage      │

#### 1. **Clone the Repository**

```bash│                 │    │                 │    │                 ││                 │    │                 │    │                 │

git clone https://github.com/Adrijan-Petek/base-monitor.git

cd base-monitor│ • Base RPC      │───▶│ • Gini Analysis │───▶│ • PostgreSQL    ││ • Base RPC      │───▶│ • Gini Analysis │───▶│ • PostgreSQL    │

```

│ • Farcaster API │    │ • Anomaly       │    │ • Time-series   ││ • Farcaster API │    │ • Anomaly       │    │ • Time-series   │

#### 2. **Install Dependencies**

```bash│ • Contract Scan │    │   Detection     │    │ • Indexed       ││ • Contract Scan │    │   Detection     │    │ • Indexed       │

npm ci

```└─────────────────┘    └─────────────────┘    └─────────────────┘└─────────────────┘    └─────────────────┘    └─────────────────┘



#### 3. **Configure Environment**         │                       │                       │         │                       │                       │

```bash

cp .env.example .env         ▼                       ▼                       ▼         ▼                       ▼                       ▼

```

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

Edit `.env` with your settings:

```bash│   Web Dashboard │    │   Alert System  │    │   API Endpoints ││   Web Dashboard │    │   Alert System  │    │   API Endpoints │

# Database

DATABASE_URL=postgres://postgres:postgres@localhost:5432/base_monitor│                 │    │                 │    │                 ││                 │    │                 │    │                 │



# Blockchain│ • Real-time     │◀───│ • Email/Slack   │    │ • REST API      ││ • Real-time     │◀───│ • Email/Slack   │    │ • REST API      │

BASE_RPC=https://mainnet.base.org

│ • Charts        │    │ • Thresholds    │    │ • WebSocket     ││ • Charts        │    │ • Thresholds    │    │ • WebSocket     │

# Optional: Farcaster API (recommended)

NEYNAR_API_KEY=your_neynar_api_key_here│ • Mobile Ready  │    │ • Auto-scaling  │    │ • CORS Enabled  ││ • Mobile Ready  │    │ • Auto-scaling  │    │ • CORS Enabled  │

```

└─────────────────┘    └─────────────────┘    └─────────────────┘└─────────────────┘    └─────────────────┘    └─────────────────┘

#### 4. **Start Database**

```bash``````

docker-compose up -d db

```



Wait for PostgreSQL to be ready (~30 seconds)### 🧩 Components### 🧩 Components



#### 5. **Initialize Database Schema**

```bash

# The API server will auto-create tables on first run| Component | Purpose | Technology || Component | Purpose | Technology |

npm run api

```|-----------|---------|------------||-----------|---------|------------|



#### 6. **🎉 Launch Dashboard**| **Collectors** | Data ingestion from blockchain & social APIs | ethers.js, axios || **Collectors** | Data ingestion from blockchain & social APIs | ethers.js, axios |



Open [http://localhost:3001](http://localhost:3001) in your browser!| **Analyzer** | Statistical analysis & anomaly detection | Custom algorithms || **Analyzer** | Statistical analysis & anomaly detection | Custom algorithms |



---| **Storage** | Time-series data persistence | PostgreSQL || **Storage** | Time-series data persistence | PostgreSQL |



## 📊 Live Dashboard| **Dashboard** | Real-time visualization | HTML5, CSS3, JavaScript || **Dashboard** | Real-time visualization | HTML5, CSS3, JavaScript |



<div align="center">| **API** | REST endpoints for data access | Express.js || **API** | REST endpoints for data access | Express.js |



### 🌟 Dashboard Features



| Feature | Description |------

|---------|-------------|

| **📈 Real-time Charts** | Live reward distribution visualizations |

| **🎯 Multi-Platform Analysis** | Separate sections for Base, Farcaster, and Builder programs |

| **🚨 Risk Assessment** | Color-coded alerts for manipulation detection |## 🚀 Quick Start## 🚀 Quick Start

| **🏆 Leaderboards** | Top recipients and concentration analysis |

| **📱 Responsive Design** | Works perfectly on desktop and mobile |

| **🔄 Auto-refresh** | Data updates every 5 minutes |

Get Base Monitor running in **5 minutes**! Here's the complete setup process:Get Base Monitor running in **5 minutes**! Here's the complete setup process:

### 📱 Dashboard Preview



```

┌─────────────────────────────────────────────────────────────┐### 📋 Prerequisites### 📋 Prerequisites

│                    🎯 Base Monitor Dashboard                 │

├─────────────────────────────────────────────────────────────┤

│                                                             │

│  📊 Reward Distribution Analysis                           │- ✅ Node.js 18+ ([Download](https://nodejs.org/))- ✅ Node.js 18+ ([Download](https://nodejs.org/))

│  ┌─────────────────────────────────────────────────────┐    │

│  │                    [Gini Coefficient Chart]         │    │- ✅ Docker & Docker Compose ([Install](https://docker.com/))- ✅ Docker & Docker Compose ([Install](https://docker.com/))

│  │                     ▲                                │    │

│  │                    ████  0.85                        │    │- ✅ Git ([Download](https://git-scm.com/))- ✅ Git ([Download](https://git-scm.com/))

│  │                   ████████                            │    │

│  │                  ███████████                          │    │

│  │                 ██████████████                        │    │

│  │            ████████████████████                      │    │### ⚡ Step-by-Step Installation### ⚡ Step-by-Step Installation

│  └─────────────────────────────────────────────────────┘    │

│                                                             │

│  🚨 Alert Status: 🟢 Normal Distribution                    │

│                                                             │#### 1. **Clone the Repository**#### 1. **Clone the Repository**

│  🏆 Top Recipients (Last 24h)                              │

│  ┌─────────────────────────────────────────────────────┐    │```bash```bash

│  │ 1. 0x1234...abcd    15,420 BASE ($2,340)           │    │

│  │ 2. 0x5678...efgh     8,920 BASE ($1,280)           │    │git clone https://github.com/Adrijan-Petek/base-monitor.gitgit clone https://github.com/Adrijan-Petek/base-monitor.git

│  │ 3. 0x9abc...ijkl     6,150 BASE ($890)             │    │

│  └─────────────────────────────────────────────────────┘    │cd base-monitorcd base-monitor

│                                                             │

│  🔗 Platform Breakdown                                     │``````

│  ┌─────────────────┬────────────┬─────────────────────┐    │

│  │ Farcaster       │ Base App   │ Base Builder        │    │

│  │ 3 contracts     │ 1 contract │ 1 contract          │    │

│  │ 12,450 rewards  │ 8,320 rew. │ 25,180 rewards      │    │#### 2. **Install Dependencies**#### 2. **Install Dependencies**

│  └─────────────────┴────────────┴─────────────────────┘    │

│                                                             │```bash```bash

└─────────────────────────────────────────────────────────────┘

```npm cinpm ci



### Live Dashboard``````

Once deployed, the dashboard will be available at: `https://base-monitor-2fpmey31e-adrijangithubgmailcoms-projects.vercel.app`



</div>

#### 3. **Configure Environment**#### 3. **Configure Environment**

---

```bash```bash

## 📖 Documentation

cp .env.example .envcp .env.example .env

### 🎮 Available Commands

``````

| Command | Description | Usage |

|---------|-------------|-------|

| `npm run api` | Start web dashboard | Development server |

| `npm run daily-scan` | Complete monitoring cycle | Automated daily scans |Edit `.env` with your settings:Edit `.env` with your settings:

| `npm run scan-contracts` | Discover new contracts | Auto-updates config |

| `npm test` | Run test suite | Quality assurance |```bash```bash

| `npm run setup-retention` | Configure data retention | One-time setup |

| `npm run cleanup` | Manual data cleanup | Optional maintenance |# Database# Database



### 🔧 Configuration OptionsDATABASE_URL=postgres://postgres:postgres@localhost:5432/base_monitorDATABASE_URL=postgres://postgres:postgres@localhost:5432/base_monitor



| Variable | Description | Default | Required |

|----------|-------------|---------|----------|

| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:postgres@db:5432/base_monitor` | ✅ |# Blockchain# Blockchain

| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` | ✅ |

| `FARCASTER_API_URL` | Farcaster API endpoint | `https://api.warpcast.com/v2/recent-casts` | ❌ |BASE_RPC=https://mainnet.base.orgBASE_RPC=https://mainnet.base.org

| `NEYNAR_API_KEY` | Neynar API key for reliable data | - | ❌ |

| `SCAN_BLOCKS` | Blocks to scan for contracts | `1000` | ❌ |

| `ALERT_TOP_SHARE` | Alert threshold (0-1) | `0.5` | ❌ |

| `ALERT_WINDOW_HOURS` | Analysis window | `24` | ❌ |# Optional: Farcaster API (recommended)# Optional: Farcaster API (recommended)



### 🤖 Contract ScannerNEYNAR_API_KEY=your_neynar_api_key_hereNEYNAR_API_KEY=your_neynar_api_key_here



Automatically discover and categorize reward contracts:``````



```bash

npm run scan-contracts

```#### 4. **Start Database**#### 4. **Start Database**



**What it finds:**```bash```bash

- ✅ **Farcaster**: Social reward contracts

- ✅ **Base App**: Mini-app reward contractsdocker-compose up -d dbdocker-compose up -d db

- ✅ **Base Builder**: Developer incentive contracts

``````

**Current Status:**

- 🔍 **5 Farcaster contracts** monitored

- 🔍 **1 Base App contract** monitored

- 🔍 **1 Base Builder contract** monitoredWait for PostgreSQL to be ready (~30 seconds)Wait for PostgreSQL to be ready (~30 seconds)

- 🔍 **7 total contracts** tracked



---

#### 5. **Initialize Database Schema**#### 5. **Initialize Database Schema**

## 🐳 Docker Deployment

```bash```bash

### Local Development

# The API server will auto-create tables on first run# The API server will auto-create tables on first run

```bash

# Start all servicesnpm run apinpm run api

docker-compose up

``````

# Run in background

docker-compose up -d



# View application logs#### 6. **🎉 Launch Dashboard**#### 6. **🎉 Launch Dashboard**

docker-compose logs -f app



# Stop all services

docker-compose downOpen [http://localhost:3001](http://localhost:3001) in your browser!Open [http://localhost:3001](http://localhost:3001) in your browser!

```



### Production Deployment

------

#### Option 1: Vercel (Recommended)



1. **Install Vercel CLI:**

   ```bash## 📊 Live Dashboard## 📊 Live Dashboard

   npm i -g vercel

   ```



2. **Deploy:**<div align="center"><div align="center">

   ```bash

   vercel login

   vercel link

   vercel --prod### 🌟 Dashboard Features### 🌟 Dashboard Features

   ```



3. **Set Environment Variables** in Vercel dashboard

| Feature | Description || Feature | Description |

#### Option 2: Docker Compose

|---------|-------------||---------|-------------|

```bash

# Production compose file| **📈 Real-time Charts** | Live reward distribution visualizations || **📈 Real-time Charts** | Live reward distribution visualizations |

docker-compose -f docker-compose.prod.yml up -d

| **🎯 Multi-Platform Analysis** | Separate sections for Base, Farcaster, and Builder programs || **🎯 Multi-Platform Analysis** | Separate sections for Base, Farcaster, and Builder programs |

# With external PostgreSQL

export DATABASE_URL="postgres://user:pass@host:5432/db"| **🚨 Risk Assessment** | Color-coded alerts for manipulation detection || **🚨 Risk Assessment** | Color-coded alerts for manipulation detection |

docker-compose -f docker-compose.prod.yml up -d

```| **🏆 Leaderboards** | Top recipients and concentration analysis || **🏆 Leaderboards** | Top recipients and concentration analysis |



---| **📱 Responsive Design** | Works perfectly on desktop and mobile || **📱 Responsive Design** | Works perfectly on desktop and mobile |



## 🔍 Data Analysis| **🔄 Auto-refresh** | Data updates every 5 minutes || **🔄 Auto-refresh** | Data updates every 5 minutes |



### 📈 Gini Coefficient Analysis



The system calculates Gini coefficients to measure reward distribution inequality:### 📱 Dashboard Preview### 📱 Dashboard Preview



- **0.0**: Perfect equality (everyone gets the same)

- **1.0**: Perfect inequality (one recipient gets everything)

- **Alert Threshold**: Configurable (default: 0.5)``````



### 🚨 Anomaly Detection┌─────────────────────────────────────────────────────────────┐┌─────────────────────────────────────────────────────────────┐



Automatic alerts for suspicious patterns:│                    🎯 Base Monitor Dashboard                 ││                    🎯 Base Monitor Dashboard                 │

- **Concentration Alerts**: Single recipient exceeds threshold

- **Sudden Spikes**: Unusual reward volume increases├─────────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────────┤

- **Pattern Changes**: Statistical distribution shifts

│                                                             ││                                                             │

### 📊 Database Schema

│  📊 Reward Distribution Analysis                           ││  📊 Reward Distribution Analysis                           │

```sql

-- Reward events from blockchain│  ┌─────────────────────────────────────────────────────┐    ││  ┌─────────────────────────────────────────────────────┐    │

CREATE TABLE reward_events (

  id SERIAL PRIMARY KEY,│  │                    [Gini Coefficient Chart]         │    ││  │                    [Gini Coefficient Chart]         │    │

  block_number BIGINT NOT NULL,

  tx_hash VARCHAR(66) NOT NULL,│  │                     ▲                                │    ││  │                     ▲                                │    │

  contract_address VARCHAR(42) NOT NULL,

  topics JSONB,│  │                    ████  0.85                        │    ││  │                    ████  0.85                        │    │

  data TEXT,

  block_timestamp TIMESTAMP,│  │                   ████████                            │    ││  │                   ████████                            │    │

  inserted_at TIMESTAMP DEFAULT NOW()

);│  │                  ███████████                          │    ││  │                  ███████████                          │    │



-- Farcaster social activity│  │                 ██████████████                        │    ││  │                 ██████████████                        │    │

CREATE TABLE farcaster_casts (

  id VARCHAR(100) PRIMARY KEY,│  │            ████████████████████                      │    ││  │            ████████████████████                      │    │

  body JSONB,

  author JSONB,│  └─────────────────────────────────────────────────────┘    ││  └─────────────────────────────────────────────────────┘    │

  timestamp TIMESTAMP,

  inserted_at TIMESTAMP DEFAULT NOW()│                                                             ││                                                             │

);

```│  🚨 Alert Status: 🟢 Normal Distribution                    ││  🚨 Alert Status: 🟢 Normal Distribution                    │



---│                                                             ││                                                             │



## 🧪 Testing│  🏆 Top Recipients (Last 24h)                              ││  🏆 Top Recipients (Last 24h)                              │



Run the comprehensive test suite:│  ┌─────────────────────────────────────────────────────┐    ││  ┌─────────────────────────────────────────────────────┐    │



```bash│  │ 1. 0x1234...abcd    15,420 BASE ($2,340)           │    ││  │ 1. 0x1234...abcd    15,420 BASE ($2,340)           │    │

npm test

```│  │ 2. 0x5678...efgh     8,920 BASE ($1,280)           │    ││  │ 2. 0x5678...efgh     8,920 BASE ($1,280)           │    │



Tests cover:│  │ 3. 0x9abc...ijkl     6,150 BASE ($890)             │    ││  │ 3. 0x9abc...ijkl     6,150 BASE ($890)             │    │

- ✅ Gini coefficient calculations

- ✅ Data validation and parsing│  └─────────────────────────────────────────────────────┘    ││  └─────────────────────────────────────────────────────┘    │

- ✅ Error handling scenarios

- ✅ Integration test suites│                                                             ││                                                             │

- ✅ API endpoint validation

│  🔗 Platform Breakdown                                     ││  🔗 Platform Breakdown                                     │

---

│  ┌─────────────────┬────────────┬─────────────────────┐    ││  ┌─────────────────┬────────────┬─────────────────────┐    │

## 🔄 Automated Daily Scanning

│  │ Farcaster       │ Base App   │ Base Builder        │    ││  │ Farcaster       │ Base App   │ Base Builder        │    │

Base Monitor includes **automated daily scanning** using GitHub Actions to keep your analysis data fresh without manual intervention.

│  │ 3 contracts     │ 1 contract │ 1 contract          │    ││  │ 3 contracts     │ 1 contract │ 1 contract          │    │

### ⚙️ Setup GitHub Actions Secrets

│  │ 12,450 rewards  │ 8,320 rew. │ 25,180 rewards      │    ││  │ 12,450 rewards  │ 8,320 rew. │ 25,180 rewards      │    │

In your GitHub repository settings, add these secrets:

│  └─────────────────┴────────────┴─────────────────────┘    ││  └─────────────────┴────────────┴─────────────────────┘    │

| Secret Name | Description | Example |

|-------------|-------------|---------|│                                                             ││                                                             │

| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |

| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` |└─────────────────────────────────────────────────────────────┘└─────────────────────────────────────────────────────────────┘

| `REWARD_CONTRACTS` | Comma-separated contract addresses | `0x123...,0x456...` |

``````

### ⏰ How It Works



1. **Daily Schedule**: GitHub Actions runs automatically every day at 02:00 UTC

2. **Data Collection**: Scans Base blockchain for new reward transfers### Live Dashboard### Live Dashboard

3. **Analysis**: Performs manipulation detection and Gini coefficient analysis

4. **Auto-Deploy**: Commits updated results and triggers Vercel redeploymentOnce deployed, the dashboard will be available at: `https://base-monitor-2fpmey31e-adrijangithubgmailcoms-projects.vercel.app`Once deployed, the dashboard will be available at: `https://base-monitor-2fpmey31e-adrijangithubgmailcoms-projects.vercel.app`

5. **Fresh Data**: Your dashboard always shows the latest analysis



### 🛠️ Manual Trigger

</div></div>

You can also trigger scans manually:

- Go to GitHub Actions → "Daily Base Reward Scan" → "Run workflow"



---------



## 🤝 Contributing



We welcome contributions! Here's how to get started:## 📖 Documentation## 📖 Documentation



### 📋 Development Workflow



1. **Fork the repository**### 🎮 Available Commands### 🎮 Available Commands

2. **Create feature branch:** ```bash

git checkout -b feature/your-awesome-feature

```

3. **Make changes and add tests**| Command | Description | Usage || Command | Description | Usage |

4. **Run tests:** ```bash

npm test|---------|-------------|-------||---------|-------------|-------|

```

5. **Commit changes:** ```bash| `npm run api` | Start web dashboard | Development server || `npm run api` | Start web dashboard | Development server |

git commit -am 'Add awesome feature ✨'

```| `npm run daily-scan` | Complete monitoring cycle | Automated daily scans || `npm run daily-scan` | Complete monitoring cycle | Automated daily scans |

6. **Push and create PR:** ```bash

git push origin feature/your-awesome-feature| `npm run scan-contracts` | Discover new contracts | Auto-updates config || `npm run scan-contracts` | Discover new contracts | Auto-updates config |

```

| `npm test` | Run test suite | Quality assurance || `npm test` | Run test suite | Quality assurance |

### 🎯 Development Guidelines

| `npm run setup-retention` | Configure data retention | One-time setup || `npm run setup-retention` | Configure data retention | One-time setup |

- 🔹 Use ES modules throughout

- 🔹 Follow conventional commits| `npm run cleanup` | Manual data cleanup | Optional maintenance || `npm run cleanup` | Manual data cleanup | Optional maintenance |

- 🔹 Add unit tests for new features

- 🔹 Update documentation

- 🔹 Ensure code passes linting

### 🔧 Configuration Options### 🔧 Configuration Options

### 🐛 Found a Bug?



1. Check [existing issues](https://github.com/Adrijan-Petek/base-monitor/issues)

2. Create a new issue with:| Variable | Description | Default | Required || Variable | Description | Default | Required |

   - Clear title and description

   - Steps to reproduce|----------|-------------|---------|----------||----------|-------------|---------|----------|

   - Expected vs actual behavior

   - Environment details| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:postgres@db:5432/base_monitor` | ✅ || `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:postgres@db:5432/base_monitor` | ✅ |



---| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` | ✅ || `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` | ✅ |



## 📄 License| `FARCASTER_API_URL` | Farcaster API endpoint | `https://api.warpcast.com/v2/recent-casts` | ❌ || `FARCASTER_API_URL` | Farcaster API endpoint | `https://api.warpcast.com/v2/recent-casts` | ❌ |



This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.| `NEYNAR_API_KEY` | Neynar API key for reliable data | - | ❌ || `NEYNAR_API_KEY` | Neynar API key for reliable data | - | ❌ |



---| `SCAN_BLOCKS` | Blocks to scan for contracts | `1000` | ❌ || `SCAN_BLOCKS` | Blocks to scan for contracts | `1000` | ❌ |



**Built with ❤️ for the Base ecosystem**| `ALERT_TOP_SHARE` | Alert threshold (0-1) | `0.5` | ❌ || `ALERT_TOP_SHARE` | Alert threshold (0-1) | `0.5` | ❌ |



[⭐ Star us on GitHub](https://github.com/Adrijan-Petek/base-monitor) • [📖 Documentation](https://github.com/Adrijan-Petek/base-monitor/wiki) • [🐛 Report Issues](https://github.com/Adrijan-Petek/base-monitor/issues)| `ALERT_WINDOW_HOURS` | Analysis window | `24` | ❌ || `ALERT_WINDOW_HOURS` | Analysis window | `24` | ❌ |



### 🤖 Contract Scanner### 🤖 Contract Scanner



Automatically discover and categorize reward contracts:Automatically discover and categorize reward contracts:



```bash```bash

npm run scan-contractsnpm run scan-contracts

``````



**What it finds:****What it finds:**

- ✅ **Farcaster**: Social reward contracts- ✅ **Farcaster**: Social reward contracts

- ✅ **Base App**: Mini-app reward contracts- ✅ **Base App**: Mini-app reward contracts

- ✅ **Base Builder**: Developer incentive contracts- ✅ **Base Builder**: Developer incentive contracts



**Current Status:****Current Status:**

- 🔍 **5 Farcaster contracts** monitored- 🔍 **5 Farcaster contracts** monitored

- 🔍 **1 Base App contract** monitored- 🔍 **1 Base App contract** monitored

- 🔍 **1 Base Builder contract** monitored- 🔍 **1 Base Builder contract** monitored

- 🔍 **7 total contracts** tracked- 🔍 **7 total contracts** tracked



------



## 🐳 Docker Deployment## 🐳 Docker Deployment



### Local Development### Local Development



```bash```bash

# Start all services# Start all services

docker-compose updocker-compose up



# Run in background# Run in background

docker-compose up -ddocker-compose up -d



# View application logs# View application logs

docker-compose logs -f appdocker-compose logs -f app



# Stop all services# Stop all services

docker-compose downdocker-compose down

``````



### Production Deployment### Production Deployment



#### Option 1: Vercel (Recommended)#### Option 1: Vercel (Recommended)



1. **Install Vercel CLI:**1. **Install Vercel CLI:**

   ```bash   ```bash

   npm i -g vercel   npm i -g vercel

   ```   ```



2. **Deploy:**2. **Deploy:**

   ```bash   ```bash

   vercel login   vercel login

   vercel link   vercel link

   vercel --prod   vercel --prod

   ```   ```



3. **Set Environment Variables** in Vercel dashboard3. **Set Environment Variables** in Vercel dashboard



#### Option 2: Docker Compose#### Option 2: Docker Compose



```bash```bash

# Production compose file# Production compose file

docker-compose -f docker-compose.prod.yml up -ddocker-compose -f docker-compose.prod.yml up -d



# With external PostgreSQL# With external PostgreSQL

export DATABASE_URL="postgres://user:pass@host:5432/db"export DATABASE_URL="postgres://user:pass@host:5432/db"

docker-compose -f docker-compose.prod.yml up -ddocker-compose -f docker-compose.prod.yml up -d

``````



------



## 🔍 Data Analysis## 🔍 Data Analysis



### 📈 Gini Coefficient Analysis### 📈 Gini Coefficient Analysis



The system calculates Gini coefficients to measure reward distribution inequality:The system calculates Gini coefficients to measure reward distribution inequality:



- **0.0**: Perfect equality (everyone gets the same)- **0.0**: Perfect equality (everyone gets the same)

- **1.0**: Perfect inequality (one recipient gets everything)- **1.0**: Perfect inequality (one recipient gets everything)

- **Alert Threshold**: Configurable (default: 0.5)- **Alert Threshold**: Configurable (default: 0.5)



### 🚨 Anomaly Detection### 🚨 Anomaly Detection



Automatic alerts for suspicious patterns:Automatic alerts for suspicious patterns:

- **Concentration Alerts**: Single recipient exceeds threshold- **Concentration Alerts**: Single recipient exceeds threshold

- **Sudden Spikes**: Unusual reward volume increases- **Sudden Spikes**: Unusual reward volume increases

- **Pattern Changes**: Statistical distribution shifts- **Pattern Changes**: Statistical distribution shifts



### 📊 Database Schema### 📊 Database Schema



```sql```sql

-- Reward events from blockchain-- Reward events from blockchain

CREATE TABLE reward_events (CREATE TABLE reward_events (

  id SERIAL PRIMARY KEY,  id SERIAL PRIMARY KEY,

  block_number BIGINT NOT NULL,  block_number BIGINT NOT NULL,

  tx_hash VARCHAR(66) NOT NULL,  tx_hash VARCHAR(66) NOT NULL,

  contract_address VARCHAR(42) NOT NULL,  contract_address VARCHAR(42) NOT NULL,

  topics JSONB,  topics JSONB,

  data TEXT,  data TEXT,

  block_timestamp TIMESTAMP,  block_timestamp TIMESTAMP,

  inserted_at TIMESTAMP DEFAULT NOW()  inserted_at TIMESTAMP DEFAULT NOW()

););



-- Farcaster social activity-- Farcaster social activity

CREATE TABLE farcaster_casts (CREATE TABLE farcaster_casts (

  id VARCHAR(100) PRIMARY KEY,  id VARCHAR(100) PRIMARY KEY,

  body JSONB,  body JSONB,

  author JSONB,  author JSONB,

  timestamp TIMESTAMP,  timestamp TIMESTAMP,

  inserted_at TIMESTAMP DEFAULT NOW()  inserted_at TIMESTAMP DEFAULT NOW()

););

``````



------



## 🧪 Testing## 🧪 Testing



Run the comprehensive test suite:Run the comprehensive test suite:



```bash```bash

npm testnpm test

``````



Tests cover:Tests cover:

- ✅ Gini coefficient calculations- ✅ Gini coefficient calculations

- ✅ Data validation and parsing- ✅ Data validation and parsing

- ✅ Error handling scenarios- ✅ Error handling scenarios

- ✅ Integration test suites- ✅ Integration test suites

- ✅ API endpoint validation- ✅ API endpoint validation



------



## 🔄 Automated Daily Scanning## 🔄 Automated Daily Scanning



Base Monitor includes **automated daily scanning** using GitHub Actions to keep your analysis data fresh without manual intervention.Base Monitor includes **automated daily scanning** using GitHub Actions to keep your analysis data fresh without manual intervention.



### ⚙️ Setup GitHub Actions Secrets### ⚙️ Setup GitHub Actions Secrets



In your GitHub repository settings, add these secrets:In your GitHub repository settings, add these secrets:



| Secret Name | Description | Example || Secret Name | Description | Example |

|-------------|-------------|---------||-------------|-------------|---------|

| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` || `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |

| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` || `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` |

| `REWARD_CONTRACTS` | Comma-separated contract addresses | `0x123...,0x456...` || `REWARD_CONTRACTS` | Comma-separated contract addresses | `0x123...,0x456...` |



### ⏰ How It Works### ⏰ How It Works



1. **Daily Schedule**: GitHub Actions runs automatically every day at 02:00 UTC1. **Daily Schedule**: GitHub Actions runs automatically every day at 02:00 UTC

2. **Data Collection**: Scans Base blockchain for new reward transfers2. **Data Collection**: Scans Base blockchain for new reward transfers

3. **Analysis**: Performs manipulation detection and Gini coefficient analysis3. **Analysis**: Performs manipulation detection and Gini coefficient analysis

4. **Auto-Deploy**: Commits updated results and triggers Vercel redeployment4. **Auto-Deploy**: Commits updated results and triggers Vercel redeployment

5. **Fresh Data**: Your dashboard always shows the latest analysis5. **Fresh Data**: Your dashboard always shows the latest analysis



### 🛠️ Manual Trigger### 🛠️ Manual Trigger



You can also trigger scans manually:You can also trigger scans manually:

- Go to GitHub Actions → "Daily Base Reward Scan" → "Run workflow"- Go to GitHub Actions → "Daily Base Reward Scan" → "Run workflow"



------



## 🤝 Contributing## 🤝 Contributing



We welcome contributions! Here's how to get started:We welcome contributions! Here's how to get started:



### 📋 Development Workflow### 📋 Development Workflow



1. **Fork the repository**1. **Fork the repository**

2. **Create feature branch:** ```bash2. **Create feature branch:** ```bash

git checkout -b feature/your-awesome-featuregit checkout -b feature/your-awesome-feature

``````

3. **Make changes and add tests**3. **Make changes and add tests**

4. **Run tests:** ```bash4. **Run tests:** ```bash

npm testnpm test

``````

5. **Commit changes:** ```bash5. **Commit changes:** ```bash

git commit -am 'Add awesome feature ✨'git commit -am 'Add awesome feature ✨'

``````

6. **Push and create PR:** ```bash6. **Push and create PR:** ```bash

git push origin feature/your-awesome-featuregit push origin feature/your-awesome-feature

``````



### 🎯 Development Guidelines### 🎯 Development Guidelines



- 🔹 Use ES modules throughout- 🔹 Use ES modules throughout

- 🔹 Follow conventional commits- 🔹 Follow conventional commits

- 🔹 Add unit tests for new features- 🔹 Add unit tests for new features

- 🔹 Update documentation- 🔹 Update documentation

- 🔹 Ensure code passes linting- 🔹 Ensure code passes linting



### 🐛 Found a Bug?### 🐛 Found a Bug?



1. Check [existing issues](https://github.com/Adrijan-Petek/base-monitor/issues)1. Check [existing issues](https://github.com/Adrijan-Petek/base-monitor/issues)

2. Create a new issue with:2. Create a new issue with:

   - Clear title and description   - Clear title and description

   - Steps to reproduce   - Steps to reproduce

   - Expected vs actual behavior   - Expected vs actual behavior

   - Environment details   - Environment details



------



## 📄 License## 📄 License



This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.



------



**Built with ❤️ for the Base ecosystem****Built with ❤️ for the Base ecosystem**



[⭐ Star us on GitHub](https://github.com/Adrijan-Petek/base-monitor) • [📖 Documentation](https://github.com/Adrijan-Petek/base-monitor/wiki) • [🐛 Report Issues](https://github.com/Adrijan-Petek/base-monitor/issues)[⭐ Star us on GitHub](https://github.com/Adrijan-Petek/base-monitor) • [📖 Documentation](https://github.com/Adrijan-Petek/base-monitor/wiki) • [🐛 Report Issues](https://github.com/Adrijan-Petek/base-monitor/issues)
DATABASE_URL=postgres://postgres:postgres@localhost:5432/base_monitor

# Blockchain
BASE_RPC=https://mainnet.base.org

# Optional: Farcaster API (recommended)
NEYNAR_API_KEY=your_neynar_api_key_here
```

#### 4. **Start Database**
```bash
docker-compose up -d db
```

Wait for PostgreSQL to be ready (~30 seconds)

#### 5. **Initialize Database Schema**
```bash
# The API server will auto-create tables on first run
npm run api
```

#### 6. **🎉 Launch Dashboard**

Open [http://localhost:3001](http://localhost:3001) in your browser!

---

## 📊 Live Dashboard

<div align="center">

### 🌟 Dashboard Features

| Feature | Description |
|---------|-------------|
| **📈 Real-time Charts** | Live reward distribution visualizations |
| **🎯 Multi-Platform Analysis** | Separate sections for Base, Farcaster, and Builder programs |
| **🚨 Risk Assessment** | Color-coded alerts for manipulation detection |
| **🏆 Leaderboards** | Top recipients and concentration analysis |
| **📱 Responsive Design** | Works perfectly on desktop and mobile |
| **🔄 Auto-refresh** | Data updates every 5 minutes |

### 📱 Dashboard Preview

```
┌─────────────────────────────────────────────────────────────┐
│                    🎯 Base Monitor Dashboard                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 Reward Distribution Analysis                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    [Gini Coefficient Chart]         │    │
│  │                     ▲                                │    │
│  │                    ████  0.85                        │    │
│  │                   ████████                            │    │
│  │                  ███████████                          │    │
│  │                 ██████████████                        │    │
│  │            ████████████████████                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  🚨 Alert Status: 🟢 Normal Distribution                    │
│                                                             │
│  🏆 Top Recipients (Last 24h)                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 1. 0x1234...abcd    15,420 BASE ($2,340)           │    │
│  │ 2. 0x5678...efgh     8,920 BASE ($1,280)           │    │
│  │ 3. 0x9abc...ijkl     6,150 BASE ($890)             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  🔗 Platform Breakdown                                     │
│  ┌─────────────────┬────────────┬─────────────────────┐    │
│  │ Farcaster       │ Base App   │ Base Builder        │    │
│  │ 3 contracts     │ 1 contract │ 1 contract          │    │
│  │ 12,450 rewards  │ 8,320 rew. │ 25,180 rewards      │    │
│  └─────────────────┴────────────┴─────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## 📖 Documentation

### 🎮 Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run api` | Start web dashboard | Development server |
| `npm run daily-scan` | Complete monitoring cycle | Automated daily scans |
| `npm run scan-contracts` | Discover new contracts | Auto-updates config |
| `npm test` | Run test suite | Quality assurance |
| `npm run setup-retention` | Configure data retention | One-time setup |
| `npm run cleanup` | Manual data cleanup | Optional maintenance |

### 🔧 Configuration Options

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:postgres@db:5432/base_monitor` | ✅ |
| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` | ✅ |
| `FARCASTER_API_URL` | Farcaster API endpoint | `https://api.warpcast.com/v2/recent-casts` | ❌ |
| `NEYNAR_API_KEY` | Neynar API key for reliable data | - | ❌ |
| `SCAN_BLOCKS` | Blocks to scan for contracts | `1000` | ❌ |
| `ALERT_TOP_SHARE` | Alert threshold (0-1) | `0.5` | ❌ |
| `ALERT_WINDOW_HOURS` | Analysis window | `24` | ❌ |

### 🤖 Contract Scanner

Automatically discover and categorize reward contracts:

```bash
npm run scan-contracts
```

**What it finds:**
- ✅ **Farcaster**: Social reward contracts
- ✅ **Base App**: Mini-app reward contracts
- ✅ **Base Builder**: Developer incentive contracts

**Current Status:**
- 🔍 **5 Farcaster contracts** monitored
- 🔍 **1 Base App contract** monitored
- 🔍 **1 Base Builder contract** monitored
- 🔍 **7 total contracts** tracked

---

## 🐳 Docker Deployment

### Local Development

```bash
# Start all services
docker-compose up

# Run in background
docker-compose up -d

# View application logs
docker-compose logs -f app

# Stop all services
docker-compose down
```

### Production Deployment

#### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel login
   vercel link
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel dashboard

#### Option 2: Docker Compose

```bash
# Production compose file
docker-compose -f docker-compose.prod.yml up -d

# With external PostgreSQL
export DATABASE_URL="postgres://user:pass@host:5432/db"
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔍 Data Analysis

### 📈 Gini Coefficient Analysis

The system calculates Gini coefficients to measure reward distribution inequality:

- **0.0**: Perfect equality (everyone gets the same)
- **1.0**: Perfect inequality (one recipient gets everything)
- **Alert Threshold**: Configurable (default: 0.5)

### 🚨 Anomaly Detection

Automatic alerts for suspicious patterns:
- **Concentration Alerts**: Single recipient exceeds threshold
- **Sudden Spikes**: Unusual reward volume increases
- **Pattern Changes**: Statistical distribution shifts

### 📊 Database Schema

```sql
-- Reward events from blockchain
CREATE TABLE reward_events (
    id SERIAL PRIMARY KEY,
    block_number BIGINT NOT NULL,
    tx_hash VARCHAR(66) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    topics JSONB,
    data TEXT,
    block_timestamp TIMESTAMP,
    inserted_at TIMESTAMP DEFAULT NOW()
);

-- Farcaster social activity
CREATE TABLE farcaster_casts (
    id VARCHAR(100) PRIMARY KEY,
    body JSONB,
    author JSONB,
    timestamp TIMESTAMP,
    inserted_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

Tests cover:
- ✅ Gini coefficient calculations
- ✅ Data validation and parsing
- ✅ Error handling scenarios
- ✅ Integration test suites
- ✅ API endpoint validation

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 📋 Development Workflow

1. **Fork the repository**
2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-awesome-feature
   ```
3. **Make changes and add tests**
4. **Run tests:**
   ```bash
   npm test
   ```
5. **Commit changes:**
   ```bash
   git commit -am 'Add awesome feature ✨'
   ```
6. **Push and create PR:**
   ```bash
   git push origin feature/your-awesome-feature
   ```

### 🎯 Development Guidelines

- 🔹 Use ES modules throughout
- 🔹 Follow conventional commits
- 🔹 Add unit tests for new features
- 🔹 Update documentation
- 🔹 Ensure code passes linting

### 🐛 Found a Bug?

1. Check [existing issues](https://github.com/Adrijan-Petek/base-monitor/issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for the Base ecosystem**

[⭐ Star us on GitHub](https://github.com/Adrijan-Petek/base-monitor) • [📖 Documentation](https://github.com/Adrijan-Petek/base-monitor/wiki) • [🐛 Report Issues](https://github.com/Adrijan-Petek/base-monitor/issues)

</div>
   - Efficient indexing for analytical queries

## Web Dashboard

The system includes a real-time web dashboard that visualizes reward manipulation analysis data. The dashboard is automatically deployed to Vercel and provides:

### Features
- **Real-time Data Visualization**: Live charts showing reward distribution patterns
- **Multi-Platform Reports**: Separate analysis sections for Base blockchain, Farcaster, and future platforms
- **Risk Assessment Dashboard**: Color-coded alerts for manipulation detection
- **Top Recipients Leaderboard**: Detailed breakdown of reward recipients
- **Auto-refresh**: Data updates every 5 minutes
- **Responsive Design**: Works on desktop and mobile devices

### Live Dashboard
Once deployed, the dashboard will be available at: `https://base-monitor-2fpmey31e-adrijangithubgmailcoms-projects.vercel.app`

### Local Development
```bash
# Install additional dependencies
npm install

# Start the API server with dashboard
npm run api

# Open http://localhost:3001 in your browser
```

### Deployment to Vercel
1. **Connect to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and connect project
   vercel login
   vercel link
   ```

2. **Set Environment Variables:**
   In your Vercel dashboard, add these environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `RPC_URL`: Base network RPC endpoint
   - `REWARD_CONTRACTS`: Comma-separated list of reward contract addresses

3. **Deploy:**
   ```bash
   vercel --prod
   ```

The dashboard will automatically rebuild and redeploy when you push changes to the main branch.

## 🔄 Automated Daily Scanning

Base Monitor includes **automated daily scanning** using GitHub Actions to keep your analysis data fresh without manual intervention.

### ⚙️ Setup GitHub Actions Secrets

In your GitHub repository settings, add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` |
| `REWARD_CONTRACTS` | Comma-separated contract addresses | `0x123...,0x456...` |
| `FARCASTER_HUB` | Farcaster hub endpoint (optional) | `https://hub.farcaster.xyz` |
| `FARCASTER_FID` | Farcaster FID for API access (optional) | `12345` |

### ⏰ How It Works

1. **Daily Schedule**: GitHub Actions runs automatically every day at 02:00 UTC
2. **Data Collection**: Scans Base blockchain for new reward transfers
3. **Analysis**: Performs manipulation detection and Gini coefficient analysis
4. **Auto-Deploy**: Commits updated results and triggers Vercel redeployment
5. **Fresh Data**: Your dashboard always shows the latest analysis

### 🛠️ Manual Trigger

You can also trigger scans manually:
- Go to GitHub Actions → "Daily Base Reward Scan" → "Run workflow"

### 📊 Workflow Details

The automated workflow:
- ✅ Runs daily at 02:00 UTC (configurable)
- ✅ Collects fresh blockchain data
- ✅ Updates analysis results
- ✅ Commits changes to trigger Vercel deployment
- ✅ Provides detailed logs for monitoring

**No server maintenance required** - GitHub handles the scheduling, scanning, and deployment automatically!

## Farcaster API Setup

For reliable Farcaster data collection, obtain a Neynar API key:

1. **Sign up at [Neynar](https://neynar.com/)**
2. **Get your API key** from the dashboard
3. **Add to environment variables:**
   ```bash
   export NEYNAR_API_KEY=your_api_key_here
   ```

**Without API key:** The collector will attempt public endpoints (may be unreliable)

## Prerequisites

- Node.js 18+ with ES module support
- PostgreSQL 12+ (or Docker for local development)
- Git for version control

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adrijan-Petek/base-monitor.git
   cd base-monitor
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize the database:**
   ```bash
   # Using Docker (recommended for development)
   docker-compose up -d db

   # Or set up PostgreSQL manually and run:
   psql -d your_database < src/db/schema.sql
   ```

## Configuration

Configure the application using environment variables in your `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_RPC` | Base network RPC endpoint | `https://mainnet.base.org` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:postgres@db:5432/base_monitor` |
| `FARCASTER_API_URL` | Farcaster API endpoint | `https://api.warpcast.com/v2/recent-casts` |
| `NEYNAR_API_KEY` | Neynar API key for reliable Farcaster data (optional) | - |
| `START_BLOCK` | Starting block number for collection | `0` |
| `NUM_BLOCKS` | Number of blocks to process | `100` |
| `ALERT_TOP_SHARE` | Threshold for top recipient alerts (0-1) | `0.5` |
| `ALERT_WINDOW_HOURS` | Analysis window in hours | `24` |

## Usage

### Command Line Interface

The application provides a simple CLI for data collection and analysis:

```bash
# Collect Base blockchain reward events
npm run collect-base

# Collect Farcaster cast data
npm run collect-farcaster

# Run analysis and generate alerts
npm run analyze
```

### Programmatic Usage

```javascript
import { collectLatest as baseCollect } from './src/collectors/baseCollector.js';
import { fetchCasts as farcasterFetch } from './src/collectors/farcasterCollector.js';
import { analyze } from './src/analyzer/analyze.js';

// Collect data
await baseCollect();
await farcasterFetch();

// Analyze and alert
await analyze();
```

### Daily Automation

Run comprehensive daily scans with a single command:

```bash
# Run complete daily monitoring cycle
npm run daily-scan
```

This automated script will:
1. Collect latest Base blockchain reward data
2. Analyze distribution patterns and detect manipulation
3. Run automated tests to ensure system health
4. Provide detailed reports on reward manipulation risks

### Data Retention Policy

The system automatically manages data retention to optimize storage and performance:

```bash
# Setup 1-month data retention policy (run once)
npm run setup-retention

# Manually trigger data cleanup (optional)
npm run cleanup
```

**Retention Rules:**
- **Data older than 1 month** is automatically deleted daily
- Storage monitoring available at `/api/storage` endpoint
- PostgreSQL VACUUM operations reclaim disk space
- Logs track deletion counts for transparency

**Storage Requirements:**
- **1 month compressed data**: ~154 MB
- **Free tier compatible**: Fits within Neon PostgreSQL free limits
- **Automatic cleanup**: Prevents storage growth over time

### Contract Scanner

Automatically discover and update reward contract addresses for Farcaster, Base App, and Base Builder programs:

```bash
# Scan blockchain for new reward contracts
npm run scan-contracts
```

**What it does:**
- Scans recent Base blockchain blocks for contract deployments
- Analyzes contract bytecode and transaction patterns
- Identifies contracts by name, symbol, and event signatures
- Categorizes contracts into Farcaster, Base App, and Base Builder groups
- Automatically updates `src/config.js` with new contract addresses

**Configuration:**
- `SCAN_BLOCKS`: Number of recent blocks to scan (default: 10000)
- `BASE_RPC`: Base network RPC endpoint
- Contract patterns are defined in the script for automatic categorization

**Manual Review Required:**
- New Base Builder contracts are flagged for manual verification before adding to `REWARD_CONTRACTS`
- Farcaster and Base App contracts are automatically added to their respective arrays
- Review the console output and config changes before committing

### Docker Usage

For containerized deployment:

```bash
# Build and run with docker-compose
docker-compose up --build

# Run specific commands
docker-compose run --rm app node src/cli.js collect-base
docker-compose run --rm app node src/cli.js analyze
```

## Database Schema

The system uses two main tables:

### reward_events
Stores blockchain reward distribution events:
- `id`: Primary key
- `block_number`: Block height
- `tx_hash`: Transaction hash
- `log_index`: Log position in transaction
- `contract_address`: Reward contract address
- `topics`: Event topics (JSONB)
- `data`: Event data payload
- `block_timestamp`: Block timestamp
- `inserted_at`: Record insertion time

### farcaster_casts
Stores social activity data:
- `id`: Cast unique identifier
- `body`: Cast content and metadata (JSONB)
- `author`: Cast author identifier
- `timestamp`: Cast creation time
- `inserted_at`: Record insertion time

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- Gini coefficient calculations
- Data validation
- Error handling
- Integration scenarios

## Docker Deployment

### Local Development

```bash
# Start all services
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Production Deployment

1. Update environment variables for production endpoints
2. Use managed PostgreSQL instance
3. Configure monitoring and alerting
4. Set up CI/CD pipeline for automated deployment

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -am 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

### Development Guidelines

- Use ES modules throughout the codebase
- Follow conventional commit messages
- Add unit tests for new functionality
- Update documentation for API changes
- Ensure code passes linting checks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> This is a developer starter kit. Customize reward contract addresses, RPC providers, and alerting integrations for production use.
#   T e s t   d e p l o y m e n t 
 
 
