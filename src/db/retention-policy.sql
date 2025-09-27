-- 1-Month Data Retention Policy
-- This script sets up automatic deletion of data older than 1 month

-- Create cleanup function
CREATE OR REPLACE FUNCTION cleanup_old_data() RETURNS void AS $$
DECLARE
    reward_count bigint := 0;
    farcaster_count bigint := 0;
BEGIN
    -- Count records to be deleted (for logging)
    SELECT COUNT(*) INTO reward_count
    FROM reward_events
    WHERE inserted_at < NOW() - INTERVAL '1 month';

    SELECT COUNT(*) INTO farcaster_count
    FROM farcaster_casts
    WHERE inserted_at < NOW() - INTERVAL '1 month';

    -- Log counts (will appear in database logs)
    RAISE NOTICE 'Deleting % reward events and % farcaster casts older than 1 month', reward_count, farcaster_count;

    -- Delete old reward events
    DELETE FROM reward_events
    WHERE inserted_at < NOW() - INTERVAL '1 month';

    -- Delete old farcaster casts
    DELETE FROM farcaster_casts
    WHERE inserted_at < NOW() - INTERVAL '1 month';

    -- Vacuum to reclaim space
    VACUUM ANALYZE reward_events;
    VACUUM ANALYZE farcaster_casts;

    RAISE NOTICE 'Cleanup complete: deleted % reward events and % farcaster casts', reward_count, farcaster_count;
END;
$$ LANGUAGE plpgsql;

-- Create a view for storage monitoring
CREATE OR REPLACE VIEW storage_usage AS
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Manual cleanup trigger (for testing)
-- SELECT cleanup_old_data();

-- Add comment for documentation
COMMENT ON FUNCTION cleanup_old_data() IS 'Deletes data older than 1 month and logs the operation';