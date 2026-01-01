---
sidebar_position: 1
slug: /
---

# Introduction

WA-RS is a high-performance WhatsApp REST API Gateway built with Rust. It provides a simple and secure way to integrate WhatsApp messaging capabilities into your applications.

## Features

- **Multi-Session Support** - Manage multiple WhatsApp sessions simultaneously
- **QR Code & Pair Code Authentication** - Connect via QR code scanning or 8-digit pair code
- **Webhook Events** - Receive real-time notifications for messages, receipts, and connection status
- **RESTful API** - Simple JSON-based API with OpenAPI/Swagger documentation
- **Web Dashboard** - Built-in admin dashboard for session management
- **JWT Authentication** - Secure API access with token-based authentication
- **Docker Ready** - Easy deployment with Docker and Docker Compose

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

## Quick Links

- [Getting Started](./getting-started) - Quick start guide
- [Installation](./installation) - Detailed installation instructions
- [Authentication](./authentication) - JWT authentication guide
- [Dashboard](./dashboard) - Using the web dashboard
- [API Reference](./api/sessions) - Complete API documentation
- [Webhooks](./api/webhooks) - Setting up webhook notifications
