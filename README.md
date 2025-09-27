# Base Monitor — Reward & Farcaster Correlation Scanner

A monitoring system that scans Base on-chain logs and Farcaster off-chain activity to detect anomalous reward distributions and correlations.

**Features**
- Collect raw logs from Base (per-block or block-range)
- Collect Farcaster casts (public API)
- Store events in Postgres
- Analyzer that computes top recipients, Gini coefficient, and alerts on suspicious concentration
- Docker & docker-compose for easy local setup
- GitHub Actions workflow for CI (tests & lint)

> This is a developer starter kit. Customize reward contract addresses, RPC providers, and alerting integrations for production use.
