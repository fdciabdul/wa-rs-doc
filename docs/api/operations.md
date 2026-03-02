---
sidebar_position: 10
---

# Operations

Spam reporting, trust contact token management, auto-reconnect, and history sync configuration.

## Spam Report

Report a message as spam.

```
POST /api/v1/sessions/{session_id}/spam/report
```

### Request Body

```json
{
  "message_id": "3EB0ABC123...",
  "message_timestamp": 1700000000,
  "from_jid": "628123456789@s.whatsapp.net",
  "spam_flow": "message_menu"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message_id` | string | Yes | Message ID being reported |
| `message_timestamp` | number | Yes | Timestamp of the message |
| `from_jid` | string | No | JID of the message sender |
| `participant_jid` | string | No | Participant JID (group messages) |
| `group_jid` | string | No | Group JID (group reports) |
| `group_subject` | string | No | Group name (group reports) |
| `spam_flow` | string | No | Report flow type (default: `message_menu`) |
| `media_type` | string | No | Media type of the message |

### Spam Flow Types

| Flow | Description |
|------|-------------|
| `message_menu` | Report from message context menu |
| `group_spam_banner_report` | Report from group spam banner |
| `group_info_report` | Report from group info page |
| `contact_info` | Report from contact info page |
| `status_report` | Report from status viewer |

### Response

```json
{
  "success": true,
  "report_id": "report-uuid"
}
```

### Example

```bash
curl -X POST http://localhost:3451/api/v1/sessions/my-session/spam/report \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message_id": "3EB0ABC123...",
    "message_timestamp": 1700000000,
    "from_jid": "628123456789@s.whatsapp.net",
    "spam_flow": "message_menu"
  }'
```

---

## TCToken - Issue Tokens

Issue trust contact tokens for one or more JIDs.

```
POST /api/v1/sessions/{session_id}/tctoken/issue
```

### Request Body

```json
{
  "jids": [
    "628123456789@s.whatsapp.net",
    "628987654321@s.whatsapp.net"
  ]
}
```

### Response

```json
{
  "tokens": [
    {
      "jid": "628123456789@s.whatsapp.net",
      "timestamp": 1700000000
    }
  ]
}
```

### Example

```bash
curl -X POST http://localhost:3451/api/v1/sessions/my-session/tctoken/issue \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jids": ["628123456789@s.whatsapp.net"]
  }'
```

---

## TCToken - Get Token

Get the trust contact token for a specific JID.

```
GET /api/v1/sessions/{session_id}/tctoken/{jid}
```

### Response

```json
{
  "jid": "628123456789@s.whatsapp.net",
  "token_timestamp": 1700000000,
  "sender_timestamp": 1700000100,
  "found": true
}
```

If no token exists:

```json
{
  "jid": "628123456789@s.whatsapp.net",
  "token_timestamp": null,
  "sender_timestamp": null,
  "found": false
}
```

### Example

```bash
curl http://localhost:3451/api/v1/sessions/my-session/tctoken/628123456789@s.whatsapp.net \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## TCToken - List All

List all JIDs that have trust contact tokens.

```
GET /api/v1/sessions/{session_id}/tctoken/list
```

### Response

```json
{
  "jids": [
    "628123456789@s.whatsapp.net",
    "628987654321@s.whatsapp.net"
  ]
}
```

### Example

```bash
curl http://localhost:3451/api/v1/sessions/my-session/tctoken/list \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## TCToken - Prune Expired

Remove all expired trust contact tokens.

```
DELETE /api/v1/sessions/{session_id}/tctoken/expired
```

### Response

```json
{
  "pruned_count": 5
}
```

### Example

```bash
curl -X DELETE http://localhost:3451/api/v1/sessions/my-session/tctoken/expired \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Auto-Reconnect - Get Status

Get the current auto-reconnect configuration.

```
GET /api/v1/sessions/{session_id}/reconnect
```

### Response

```json
{
  "enabled": true,
  "error_count": 0
}
```

### Example

```bash
curl http://localhost:3451/api/v1/sessions/my-session/reconnect \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Auto-Reconnect - Set

Enable or disable automatic reconnection on disconnect.

```
PUT /api/v1/sessions/{session_id}/reconnect
```

### Request Body

```json
{
  "enabled": true
}
```

### Response

```json
{
  "enabled": true,
  "error_count": 0
}
```

### Example

```bash
curl -X PUT http://localhost:3451/api/v1/sessions/my-session/reconnect \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```

---

## History Sync - Get

Get the current history sync configuration.

```
GET /api/v1/sessions/{session_id}/history-sync
```

### Response

```json
{
  "skip_history_sync": false
}
```

### Example

```bash
curl http://localhost:3451/api/v1/sessions/my-session/history-sync \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## History Sync - Set

Control whether message history is synced when connecting a new device.

```
PUT /api/v1/sessions/{session_id}/history-sync
```

### Request Body

```json
{
  "skip": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `skip` | boolean | Yes | Set to `true` to skip history sync |

### Response

```json
{
  "skip_history_sync": true
}
```

### Example

```bash
curl -X PUT http://localhost:3451/api/v1/sessions/my-session/history-sync \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"skip": true}'
```
