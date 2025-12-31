---
sidebar_position: 4
---

# Groups

Manage and interact with WhatsApp groups.

## List Groups

Get all groups the session is part of.

```
GET /api/v1/sessions/{session_id}/groups
```

### Response

```json
{
  "groups": [
    {
      "jid": "123456789-1234567890@g.us",
      "name": "My Group",
      "participant_count": 25
    }
  ],
  "total": 1
}
```

---

## Get Group

Get basic group information.

```
GET /api/v1/sessions/{session_id}/groups/{group_jid}
```

### Response

```json
{
  "jid": "123456789-1234567890@g.us",
  "name": "My Group",
  "topic": "Group description",
  "participant_count": 25,
  "created_at": 1640000000
}
```

---

## Get Group Info

Get detailed group information including participants.

```
GET /api/v1/sessions/{session_id}/groups/{group_jid}/info
```

### Response

```json
{
  "jid": "123456789-1234567890@g.us",
  "name": "My Group",
  "topic": "Group description",
  "owner": "628123456789@s.whatsapp.net",
  "created_at": 1640000000,
  "participants": [
    {
      "jid": "628123456789@s.whatsapp.net",
      "role": "admin"
    },
    {
      "jid": "628987654321@s.whatsapp.net",
      "role": "member"
    }
  ]
}
```

### Participant Roles

| Role | Description |
|------|-------------|
| `superadmin` | Group creator |
| `admin` | Group admin |
| `member` | Regular member |

---

## Sending Messages to Groups

Use the same message endpoints with group JID:

```bash
curl -X POST http://localhost:3000/api/v1/sessions/my-session/messages/text \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "123456789-1234567890@g.us",
    "text": "Hello group!"
  }'
```
