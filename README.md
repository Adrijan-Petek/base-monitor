# 🔍 Base Monitor

<div align="center">

![Base Monitor Logo](public/favicon.svg)

**Reward & Farcaster Correlation Scanner**

[![CI](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml/badge.svg)](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

*Monitor Base blockchain rewards and Farcaster activity for manipulation detection*

[🚀 Quick Start](#-quick-start) • [📊 Live Dashboard](#-live-dashboard) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ What is Base Monitor?

Base Monitor is a comprehensive **blockchain monitoring system** that scans Base ecosystem on-chain logs and Farcaster off-chain activity to detect anomalous reward distributions and correlations. Built for developers who need to monitor decentralized reward systems and social activity patterns.

### 🎯 Key Capabilities

- **🔍 Real-time Monitoring**: 24/7 surveillance of reward contracts
- **📊 Advanced Analytics**: Gini coefficient analysis and anomaly detection
- **🚨 Smart Alerts**: Automated detection of suspicious distributions
- **🤖 Auto Discovery**: Automatically finds new reward contracts
- **📱 Web Dashboard**: Beautiful real-time visualization interface
- **🐳 Docker Ready**: One-command deployment

---

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Collectors    │    │    Analyzer     │    │    Storage      │
│                 │    │                 │    │                 │
│ • Base RPC      │───▶│ • Gini Analysis │───▶│ • PostgreSQL    │
│ • Farcaster API │    │ • Anomaly       │    │ • Time-series   │
│ • Contract Scan │    │   Detection     │    │ • Indexed       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Dashboard │    │   Alert System  │    │   API Endpoints │
│                 │    │                 │    │                 │
│ • Real-time     │◀───│ • Email/Slack   │    │ • REST API      │
│ • Charts        │    │ • Thresholds    │    │ • WebSocket     │
│ • Mobile Ready  │    │ • Auto-scaling  │    │ • CORS Enabled  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🧩 Components

| Component | Purpose | Technology |
|-----------|---------|------------|
| **Collectors** | Data ingestion from blockchain & social APIs | ethers.js, axios |
| **Analyzer** | Statistical analysis & anomaly detection | Custom algorithms |
| **Storage** | Time-series data persistence | PostgreSQL |
| **Dashboard** | Real-time visualization | HTML5, CSS3, JavaScript |
| **API** | REST endpoints for data access | Express.js |

---

## 🚀 Quick Start

Get Base Monitor running in **5 minutes**! Here's the complete setup process:

### 📋 Prerequisites

- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ Docker & Docker Compose ([Install](https://docker.com/))
- ✅ Git ([Download](https://git-scm.com/))

### ⚡ Step-by-Step Installation

#### 1. **Clone the Repository**
```bash
git clone https://github.com/Adrijan-Petek/base-monitor.git
cd base-monitor
```

#### 2. **Install Dependencies**
```bash
npm ci
```

#### 3. **Configure Environment**
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```bash
# Database
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
Once deployed, the dashboard will be available at: `https://your-vercel-app.vercel.app`

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
