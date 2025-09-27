-- Postgres schema for Base Monitor
CREATE TABLE IF NOT EXISTS reward_events (
  id SERIAL PRIMARY KEY,
  block_number BIGINT,
  tx_hash TEXT,
  log_index INTEGER,
  contract_address TEXT,
  topics JSONB,
  data TEXT,
  block_timestamp TIMESTAMP WITH TIME ZONE,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reward_events_block ON reward_events(block_number);
CREATE INDEX IF NOT EXISTS idx_reward_events_address ON reward_events(contract_address);

CREATE TABLE IF NOT EXISTS farcaster_casts (
  id TEXT PRIMARY KEY,
  body JSONB,
  author TEXT,
  timestamp TIMESTAMP WITH TIME ZONE,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_farcaster_author ON farcaster_casts(author);
