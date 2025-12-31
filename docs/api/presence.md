---
sidebar_position: 6
---

# Presence & Chat State

Manage online status and typing indicators.

## Set Presence

Set your online/offline status.

```
POST /api/v1/sessions/{session_id}/presence/set
```

### Request Body

```json
{
  "status": "available"
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `available` | Show as online |
| `unavailable` | Show as offline |

---

## Send Chat State

Send typing or recording indicator.

```
POST /api/v1/sessions/{session_id}/chatstate/send
```

### Request Body

```json
{
  "to": "628123456789@s.whatsapp.net",
  "state": "composing"
}
```

### State Values

| State | Description |
|-------|-------------|
| `composing` | Typing... |
| `recording` | Recording audio... |
| `paused` | Stop indicator |

---

## Send Typing Indicator

Shorthand for sending typing indicator.

```
POST /api/v1/sessions/{session_id}/chatstate/typing
```

### Request Body

```json
{
  "to": "628123456789@s.whatsapp.net",
  "duration": 3000
}
```

| Field | Description |
|-------|-------------|
| `to` | Recipient JID |
| `duration` | Duration in milliseconds |

---

# Blocking

Manage blocked contacts.

## Get Block List

Get all blocked contacts.

```
GET /api/v1/sessions/{session_id}/blocking/list
```

### Response

```json
{
  "blocked": [
    "628123456789@s.whatsapp.net",
    "628987654321@s.whatsapp.net"
  ],
  "count": 2
}
```

---

## Block Contact

Block a contact.

```
POST /api/v1/sessions/{session_id}/blocking/block
```

### Request Body

```json
{
  "jid": "628123456789@s.whatsapp.net"
}
```

---

## Unblock Contact

Unblock a contact.

```
POST /api/v1/sessions/{session_id}/blocking/unblock
```

### Request Body

```json
{
  "jid": "628123456789@s.whatsapp.net"
}
```

---

## Check Block Status

Check if a contact is blocked.

```
GET /api/v1/sessions/{session_id}/blocking/check/{jid}
```

### Response

```json
{
  "jid": "628123456789@s.whatsapp.net",
  "blocked": true
}
```
