---
sidebar_position: 1
---

# Sessions

Manage WhatsApp sessions. Each session represents a connected WhatsApp account.

## Create Session

Creates a new session and automatically starts connecting to WhatsApp.

```
POST /api/v1/sessions
```

### Request Body

```json
{
  "id": "my-session",
  "name": "My Business Account",
  "webhook": {
    "url": "https://example.com/webhook",
    "events": ["message", "connected"],
    "secret": "webhook-secret"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | No | Custom session ID (auto-generated if not provided) |
| `name` | string | No | Friendly name for the session |
| `webhook` | object | No | Webhook configuration |
| `webhook.url` | string | Yes* | Webhook URL |
| `webhook.events` | array | No | Events to subscribe (default: all) |
| `webhook.secret` | string | No | HMAC secret for signature verification |

### Response

```json
{
  "session": {
    "id": "my-session",
    "name": "My Business Account",
    "phone_number": null,
    "push_name": null,
    "status": "connecting",
    "created_at": 1767143203,
    "updated_at": 1767143203,
    "last_connected_at": null,
    "is_logged_in": false
  }
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/sessions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "business-1",
    "name": "Business Account",
    "webhook": {
      "url": "https://example.com/webhook"
    }
  }'
```

---

## List Sessions

Get all sessions.

```
GET /api/v1/sessions
```

### Response

```json
{
  "sessions": [
    {
      "id": "my-session",
      "name": "My Account",
      "status": "logged_in",
      "is_logged_in": true
    }
  ],
  "total": 1
}
```

---

## Get Session

Get a specific session by ID.

```
GET /api/v1/sessions/{session_id}
```

### Response

```json
{
  "id": "my-session",
  "name": "My Account",
  "phone_number": "628123456789",
  "push_name": "John Doe",
  "status": "logged_in",
  "is_logged_in": true
}
```

---

## Delete Session

Delete a session and disconnect from WhatsApp.

```
DELETE /api/v1/sessions/{session_id}
```

### Response

```json
{
  "success": true,
  "message": "Session deleted"
}
```

---

## Get Session Status

Get current connection status.

```
GET /api/v1/sessions/{session_id}/status
```

### Response

```json
{
  "status": "logged_in",
  "is_logged_in": true,
  "phone_number": "628123456789",
  "push_name": "John Doe"
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `disconnected` | Not connected |
| `connecting` | Establishing connection |
| `waiting_for_qr` | Waiting for QR code scan |
| `waiting_for_pair_code` | Waiting for pair code entry |
| `connected` | Connected but not logged in |
| `logged_in` | Fully authenticated |

---

## Get QR Code

Get QR codes for authentication.

```
GET /api/v1/sessions/{session_id}/qr
```

### Response

```json
{
  "qr_codes": ["2@ABC123..."],
  "timeout_seconds": 60,
  "status": "waiting_for_qr"
}
```

---

## Connect Session

Manually trigger connection (usually not needed as create auto-connects).

```
POST /api/v1/sessions/{session_id}/connect
```

---

## Pair with Phone Number

Connect using pair code instead of QR.

```
POST /api/v1/sessions/{session_id}/pair
```

### Request Body

```json
{
  "phone_number": "+628123456789",
  "show_push_notification": true
}
```

### Response

```json
{
  "code": "ABCD-EFGH",
  "timeout_seconds": 60
}
```

---

## Disconnect Session

Disconnect from WhatsApp without deleting the session.

```
POST /api/v1/sessions/{session_id}/disconnect
```

---

## Get Device Info

Get connected device information.

```
GET /api/v1/sessions/{session_id}/device
```

### Response

```json
{
  "device_id": 1,
  "phone_number": "628123456789",
  "lid": "123456789@lid",
  "push_name": "John Doe"
}
```
