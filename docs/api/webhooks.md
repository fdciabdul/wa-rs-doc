---
sidebar_position: 5
---

# Webhooks

Receive real-time events from WhatsApp via HTTP webhooks.

## Register Webhook

Register a webhook for a session.

```
POST /api/v1/sessions/{session_id}/webhooks
```

### Request Body

```json
{
  "url": "https://example.com/webhook",
  "events": ["message", "connected", "disconnected"],
  "secret": "your-webhook-secret"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | Webhook endpoint URL |
| `events` | array | No | Events to subscribe (default: all) |
| `secret` | string | No | HMAC-SHA256 secret for signature |

### Response

```json
{
  "id": "webhook-uuid",
  "url": "https://example.com/webhook",
  "events": ["message", "connected", "disconnected"],
  "enabled": true
}
```

---

## List Webhooks

Get all webhooks for a session.

```
GET /api/v1/sessions/{session_id}/webhooks
```

### Response

```json
{
  "webhooks": [
    {
      "url": "https://example.com/webhook",
      "events": ["all"],
      "secret": null,
      "enabled": true
    }
  ],
  "count": 1
}
```

---

## Delete Webhook

Remove a webhook.

```
DELETE /api/v1/sessions/{session_id}/webhooks/{webhook_id}
```

---

## Event Types

| Event | Description |
|-------|-------------|
| `all` | Subscribe to all events |
| `message` | New message received |
| `receipt` | Message receipt (delivered, read) |
| `presence` | Contact online/offline status |
| `chat_presence` | Typing indicator |
| `group_update` | Group info changed |
| `joined_group` | Joined a new group |
| `qr_code` | QR code generated |
| `pair_code` | Pair code generated |
| `connected` | Connected to WhatsApp |
| `disconnected` | Disconnected from WhatsApp |
| `logged_out` | Logged out from WhatsApp |

---

## Webhook Payload

All webhook payloads follow this format:

```json
{
  "session_id": "my-session",
  "event": "message",
  "timestamp": 1767143203,
  "data": {
    // Event-specific data
  }
}
```

### Message Event

```json
{
  "session_id": "my-session",
  "event": "message",
  "timestamp": 1767143203,
  "data": {
    "from": "628123456789@s.whatsapp.net",
    "chat": "628123456789@s.whatsapp.net",
    "message_id": "3EB0ABC123...",
    "is_from_me": false
  }
}
```

### Connected Event

```json
{
  "session_id": "my-session",
  "event": "connected",
  "timestamp": 1767143203,
  "data": {}
}
```

---

## Signature Verification

If you provide a `secret`, WA-RS will sign the payload with HMAC-SHA256.

The signature is sent in the `X-Webhook-Signature` header:

```
X-Webhook-Signature: sha256=abc123...
```

### Verification Example (Node.js)

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// Express middleware
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);

  if (!verifySignature(payload, signature, 'your-secret')) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook
  console.log(req.body);
  res.sendStatus(200);
});
```

### Verification Example (Python)

```python
import hmac
import hashlib

def verify_signature(payload, signature, secret):
    expected = 'sha256=' + hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected)
```

---

## Best Practices

1. **Always verify signatures** in production
2. **Respond quickly** (within 5 seconds) to avoid timeouts
3. **Use HTTPS** for webhook endpoints
4. **Handle duplicates** - webhooks may be retried
5. **Log everything** for debugging
