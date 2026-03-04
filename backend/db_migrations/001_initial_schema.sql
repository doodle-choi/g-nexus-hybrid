-- Initial schema for G-Nexus Phase 1

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- raw_ingestion_data serves as the hybrid storage for parsed JSON/Markdown
CREATE TABLE IF NOT EXISTS raw_ingestion_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_filename VARCHAR(255) NOT NULL,
    source_type VARCHAR(50) NOT NULL, -- 'json', 'markdown', etc
    data_payload JSONB NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
