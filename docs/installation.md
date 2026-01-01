---
sidebar_position: 2
---

# Installation

## Docker Compose (Recommended)

The easiest way to run WA-RS is using Docker Compose:

```bash
cd rest-api
docker compose up -d
```

This will start:
- PostgreSQL database
- WA-RS API server

### Custom Configuration

Create a `.env` file to customize settings:

```bash
# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=wagateway

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Storage
WHATSAPP_STORAGE_PATH=/app/whatsapp_sessions
```

Then run:

```bash
docker compose up -d
```

## Manual Installation

### Prerequisites

- Rust 1.75 or later
- PostgreSQL 14 or later
- OpenSSL development libraries

### Ubuntu/Debian

```bash
# Install dependencies
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libsqlite3-dev \
    postgresql

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### Build

```bash
git clone https://github.com/fdciabdul/wa-rs.git
cd wa-rs/rest-api
cargo build --release
```

### Database Setup

```bash
# Create database
sudo -u postgres createdb wagateway

# Or connect and create
psql -U postgres -c "CREATE DATABASE wagateway;"
```

### Configuration

```bash
cp .env.example .env
```

Edit `.env`:

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=wagateway
JWT_SECRET=your-secret-key
WHATSAPP_STORAGE_PATH=./whatsapp_sessions
```

### Run

```bash
# Development
cargo run

# Production
./target/release/wa-rs
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_HOST` | localhost | PostgreSQL host |
| `POSTGRES_PORT` | 5432 | PostgreSQL port |
| `POSTGRES_USER` | postgres | PostgreSQL user |
| `POSTGRES_PASSWORD` | postgres | PostgreSQL password |
| `POSTGRES_DB` | wagateway | PostgreSQL database |
| `JWT_SECRET` | (random) | JWT signing secret |
| `WHATSAPP_STORAGE_PATH` | ./whatsapp_sessions | Session storage path |
| `RUST_LOG` | info | Log level |

## Verify Installation

```bash
# Health check
curl http://localhost:3451/health
# Should return: OK

# Check Dashboard
open http://localhost:3451/dashboard

# Check Swagger UI
open http://localhost:3451/swagger-ui
```
