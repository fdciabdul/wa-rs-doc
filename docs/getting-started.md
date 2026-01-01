---
sidebar_position: 1
---

# Getting Started

WA-RS is a multi-session WhatsApp REST API gateway built with Rust. It provides a simple HTTP interface to interact with WhatsApp Web.

## Features

- **Multi-session support** - Manage multiple WhatsApp accounts
- **QR Code & Pair Code authentication** - Connect via QR scan or phone number
- **Send messages** - Text, image, video, audio, document, sticker, location, contact
- **Webhook support** - Receive events with HMAC-SHA256 signatures
- **JWT authentication** - Secure API access
- **PostgreSQL database** - Persistent session storage
- **Swagger UI** - Interactive API documentation

## Quick Start

### Using Docker Compose (Recommended)

```bash
git clone https://github.com/fdciabdul/wa-rs.git
cd wa-rs/rest-api
docker compose up -d
```

### Manual Installation

1. **Requirements**
   - Rust 1.75+
   - PostgreSQL 14+

2. **Clone and build**
   ```bash
   git clone https://github.com/fdciabdul/wa-rs.git
   cd wa-rs/rest-api
   cargo build --release
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

4. **Run**
   ```bash
   cargo run --release
   ```

## Access Points

After starting the server:

| Endpoint | Description |
|----------|-------------|
| http://localhost:3451 | API Base URL |
| http://localhost:3451/dashboard | Web Dashboard |
| http://localhost:3451/swagger-ui | Swagger UI Documentation |
| http://localhost:3451/health | Health Check |

## Next Steps

- [Installation Guide](./installation) - Detailed setup instructions
- [Authentication](./authentication) - How to authenticate API requests
- [API Reference](./api/sessions) - Complete API documentation
