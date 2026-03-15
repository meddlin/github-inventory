

DB_DSN = "postgresql://meddlin:jailbreak@localhost:5432/github_inventory"  # update me

SCHEMA_STATEMENTS = [
    """
    -- Enable one extension for UUID generation (pick one):
    CREATE EXTENSION IF NOT EXISTS pgcrypto;      -- then use gen_random_uuid()
    -- or
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- then use uuid_generate_v4()

    CREATE TABLE IF NOT EXISTS repositories (
        _id             UUID PRIMARY KEY DEFAULT uuid_generate_v4()
        _created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
        
        id              integer NULL,
        name            TEXT NOT NULL,
        full_name       TEXT,
        name            TEXT NULL,
        private         boolean NULL,
        owner           TEXT NULL,
        html_url        TEXT NULL,
        description     TEXT NULL,
        fork            boolean NULL,
        url             text,
    );
    """,
]