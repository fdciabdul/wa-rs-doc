---
sidebar_position: 4
---

# Dashboard

WA-RS includes a built-in web dashboard for managing WhatsApp sessions without writing code.

## Accessing the Dashboard

Open your browser and navigate to:

```
http://localhost:3451/dashboard
```

The dashboard is accessible without authentication, making it easy to get started.

## Features

### Session Management

- **View all sessions** - See status, phone number, and connection state
- **Create sessions** - Set up new WhatsApp connections
- **Delete sessions** - Remove sessions and their data
- **Real-time status** - Monitor connection status with color-coded badges

### Connection Methods

#### QR Code Authentication

1. Navigate to a session's detail page
2. Click "Connect with QR Code"
3. A QR code will appear on screen
4. Open WhatsApp on your phone → Settings → Linked Devices → Link a Device
5. Scan the QR code with your phone

#### Pair Code Authentication

1. Navigate to a session's detail page
2. Enter your phone number with country code (e.g., `+628123456789`)
3. Click "Get Pair Code"
4. An 8-digit code will be displayed
5. Open WhatsApp on your phone → Settings → Linked Devices → Link a Device
6. Choose "Link with phone number instead"
7. Enter the 8-digit code

### Session Detail Page

Each session has a detail page showing:

- **Status Badge** - Green (connected), Yellow (connecting), Gray (disconnected)
- **Phone Number** - The connected WhatsApp number
- **Push Name** - The WhatsApp display name
- **Device Info** - Device ID and other metadata
- **QR Code Display** - Live QR code for authentication
- **Pair Code Input** - Phone number input for pair code auth

### Settings Page

The settings page displays:

- **JWT Token** - Your authentication token for API access
- **API Base URL** - The endpoint for REST API calls
- **Server Info** - Version and configuration details

## Session Status Indicators

| Badge | Status | Description |
|-------|--------|-------------|
| 🟢 Green | Connected/Logged In | Fully authenticated and ready |
| 🟡 Yellow | Connecting | Establishing connection |
| 🟡 Yellow | Waiting for QR | Waiting for QR code scan |
| 🟡 Yellow | Waiting for Pair | Waiting for pair code entry |
| ⚪ Gray | Disconnected | Not connected |

## Creating a New Session

1. Click **"New Session"** from the sessions list
2. Fill in the form:
   - **Session ID** - Unique identifier (auto-generated if empty)
   - **Name** - Friendly display name (optional)
   - **Webhook URL** - Endpoint to receive events (optional)
   - **Webhook Secret** - HMAC signing secret (optional)
   - **Events** - Select which events to receive
3. Click **"Create Session"**
4. You'll be redirected to the session detail page
5. Connect using QR code or pair code

## Webhook Configuration

When creating a session, you can optionally configure a webhook:

- **URL** - Your server endpoint (must be HTTPS in production)
- **Secret** - Used to sign webhook payloads with HMAC-SHA256
- **Events** - Choose specific events or receive all:
  - `message` - Incoming messages
  - `connected` - Connection established
  - `disconnected` - Connection lost
  - `receipt` - Message delivery/read receipts
  - `presence` - Online/offline status changes
  - `qr_code` - QR code generated

## Tips

- **Bookmark the dashboard** for quick access
- **Keep sessions connected** - Disconnected sessions require re-authentication
- **Use descriptive names** - Makes it easier to identify sessions
- **Configure webhooks** - To receive real-time updates in your application
