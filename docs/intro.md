---
sidebar_position: 1
slug: /
---

# Introduction

WA-RS is a high-performance WhatsApp REST API Gateway built with Rust. It provides a simple and secure way to integrate WhatsApp messaging capabilities into your applications.

## Features

### Core Features
- **Multi-Session Support** - Manage multiple WhatsApp sessions simultaneously
- **QR Code & Pair Code Authentication** - Connect via QR code scanning or 8-digit pair code
- **Webhook Events** - Receive real-time notifications with HMAC-SHA256 signature verification
- **RESTful API** - Simple JSON-based API with OpenAPI/Swagger documentation
- **JWT Authentication** - Secure API access with token-based authentication
- **Docker Ready** - Easy deployment with Docker and Docker Compose

### Messaging Capabilities
- **Text Messages** - Send plain text messages
- **Media Messages** - Send images, videos, audio, documents, and stickers
- **Location Sharing** - Share geographical locations
- **Contact Sharing** - Share contact cards (vCards)
- **Message Reactions** - Add emoji reactions to messages
- **Message Editing** - Edit sent messages
- **Voice Notes** - Send push-to-talk audio messages

### Dashboard
- **Terminal Theme** - Beautiful hacker-style terminal UI
- **Session Management** - Create, connect, disconnect, and delete sessions
- **QR Code Display** - Visual QR code for easy scanning
- **Pair Code Support** - Connect using phone number and 8-digit code
- **Real-time Status** - Monitor session connection status
- **Protected Access** - JWT-based authentication for dashboard

### Developer Experience
- **Swagger UI** - Interactive API documentation at `/swagger-ui`
- **Health Checks** - Built-in health endpoint for monitoring
- **Structured Logging** - JSON-formatted logs with tracing
- **Environment Configuration** - Configure via `.env` or environment variables

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        WA-RS Gateway                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Dashboard  │  │  REST API   │  │  Webhook Dispatcher │  │
│  │  (Askama)   │  │  (Axum)     │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Session Manager (Multi-Device)             ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │   PostgreSQL    │              │   SQLite (Sessions) │   │
│  │   (Metadata)    │              │   (WhatsApp State)  │   │
│  └─────────────────┘              └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Rust |
| Web Framework | Axum 0.8 |
| Template Engine | Askama |
| Database | PostgreSQL + SQLite |
| Authentication | JWT (jsonwebtoken) |
| WhatsApp Protocol | wacore (custom) |
| Documentation | Swagger/OpenAPI |

## Quick Links

- [Getting Started](./getting-started) - Quick start guide
- [Installation](./installation) - Detailed installation instructions
- [Authentication](./authentication) - JWT authentication guide
- [Dashboard](./dashboard) - Using the web dashboard
- [API Reference](./api/sessions) - Complete API documentation
- [Webhooks](./api/webhooks) - Setting up webhook notifications

## Support the Project

If WA-RS helps your project, consider supporting the development:

- **Saweria**: [https://saweria.co/fdciabdul](https://saweria.co/fdciabdul)
- **BNI**: `1882264360` (A/N: Abdul Muttaqin)
- **Bank Mandiri**: `1330028497212` (A/N: Anisa Septiani Timur)
