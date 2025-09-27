# Base Monitor — Reward & Farcaster Correlation Scanner

[![CI](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml/badge.svg)](https://github.com/Adrijan-Petek/base-monitor/actions/workflows/main.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A comprehensive monitoring system that scans Base blockchain on-chain logs and Farcaster off-chain activity to detect anomalous reward distributions and correlations. Built for developers who need to monitor decentralized reward systems and social activity patterns.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **On-Chain Data Collection**: Efficiently collect and parse Base blockchain logs for reward events
- **Off-Chain Social Monitoring**: Fetch and analyze Farcaster cast data via public API
- **Data Persistence**: Store structured events in PostgreSQL with optimized indexing
- **Advanced Analytics**: Compute Gini coefficients, detect concentration anomalies, and identify top recipients
- **Alerting System**: Configurable thresholds for suspicious reward distributions
- **Modular Architecture**: Clean separation of concerns with collectors, analyzers, and storage layers
- **Docker Support**: Containerized deployment with docker-compose for local development
- **ES Module Support**: Modern JavaScript with full ES module compatibility
- **Comprehensive Testing**: Unit tests with Mocha and Chai for reliable code quality

## Architecture

The system follows a modular architecture with three main components:

1. **Collectors**: Specialized modules for data ingestion
   - `baseCollector.js`: Ethereum-compatible log collection from Base RPC
   - `farcasterCollector.js`: Social cast data from Farcaster API

2. **Analyzer**: Statistical analysis engine
   - Computes Gini coefficients for distribution inequality
   - Identifies top recipients and concentration patterns
   - Generates alerts based on configurable thresholds

3. **Storage**: PostgreSQL-backed persistence layer
   - Optimized schema for time-series event data
   - Efficient indexing for analytical queries

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
| `FARCASTER_API_URL` | Farcaster API endpoint | `https://api.farcaster.xyz/v2/casts` |
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
