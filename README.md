# G-Nexus (Quality Operations Management System)

## Goal
The goal of G-Nexus is to comprehensively collect, map, and visualize fragmented quality (QA), service, and cost data, enabling the diagnosis and prediction of business performance.

## Overview
G-Nexus is a Quality Operations Management System designed to provide a centralized platform for data integration and business insight.

### Core Values
- **Reliability**: Provide clear numerical evidence through data lineage and source tracking.
- **Insight**: Go beyond simple statistics with RAG/ML-based performance prediction and simulation.
- **Professionalism**: Offer a serious, reliable enterprise solution UI/UX.

## Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python FastAPI, Pydantic, asyncpg
- **Database**: PostgreSQL (Hybrid storage using RDBMS structure + JSONB for schema-less data)
- **Package Management**: Poetry
- **Charting**: Recharts or Chart.js

## Architecture
- **Data Ingestion**: FastAPI Endpoint for receiving and validating JSON/Markdown data.
- **Data Storage**: PostgreSQL Hybrid (Structured + JSONB).
- **Analysis Layer**: Python Pandas/NumPy for statistical and data normalization logic.
- **Application**: FastAPI + React (TS) for a high-performance backend API with JWT authentication and high-density data visualization frontend.

## Development Roadmap
- **Phase 1: Core Foundation & MVP**
  - Poetry-based FastAPI server setup & pure SQL-based DB Migration.
  - JWT-based user authentication and role model (Manual Provisioning).
  - Vite + React + shadcn/ui frontend scaffolding and routing.
  - Initial data ingestion/upload API for JSON/Markdown.
- **Phase 2: Data Mapping & Visualization**
  - Mapping interface connecting raw data with standard schema templates.
  - Statistical tables and chart dashboards (Recharts) after data transformation/loading.
- **Phase 3 & Beyond: Intelligence Layer**
  - **Apache Superset integration** for custom self-service BI dashboards.
  - What-if simulations for performance prediction based on variable adjustments.
  - Data lineage tracking and automated reporting tools based on ML/RAG.
