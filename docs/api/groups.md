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

## Create Group

Create a new WhatsApp group.

```
POST /api/v1/sessions/{session_id}/groups
```

### Request Body

```json
{
  "name": "My New Group",
  "participants": [
    "628123456789@s.whatsapp.net",
    "628987654321@s.whatsapp.net"
  ]
}
```

### Response

```json
{
  "group_jid": "123456789-1234567890@g.us"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/sessions/my-session/groups \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Group",
    "participants": ["628123456789@s.whatsapp.net"]
  }'
```

---

## Set Group Subject

Update the group name/subject.

```
PUT /api/v1/sessions/{session_id}/groups/{group_jid}/subject
```

### Request Body

```json
{
  "subject": "New Group Name"
}
```

### Response

```json
{
  "success": true
}
```

---

## Set Group Description

Update or delete the group description.

```
PUT /api/v1/sessions/{session_id}/groups/{group_jid}/description
```

### Request Body

```json
{
  "description": "This is the group description",
  "prev_id": null
}
```

To delete the description, set `description` to `null`.

### Response

```json
{
  "success": true
}
```

---

## Leave Group

Leave a group.

```
POST /api/v1/sessions/{session_id}/groups/{group_jid}/leave
```

### Response

```json
{
  "success": true
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/sessions/my-session/groups/123456789-1234567890@g.us/leave \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Add Participants

Add members to a group.

```
POST /api/v1/sessions/{session_id}/groups/{group_jid}/participants
```

### Request Body

```json
{
  "participants": [
    "628123456789@s.whatsapp.net",
    "628987654321@s.whatsapp.net"
  ]
}
```

### Response

```json
{
  "results": [
    {
      "jid": "628123456789@s.whatsapp.net",
      "status": "Added"
    }
  ]
}
```

---

## Remove Participants

Remove members from a group.

```
DELETE /api/v1/sessions/{session_id}/groups/{group_jid}/participants
```

### Request Body

```json
{
  "participants": [
    "628123456789@s.whatsapp.net"
  ]
}
```

### Response

```json
{
  "results": [
    {
      "jid": "628123456789@s.whatsapp.net",
      "status": "Removed"
    }
  ]
}
```

---

## Promote Participants

Make members group admins.

```
POST /api/v1/sessions/{session_id}/groups/{group_jid}/admins
```

### Request Body

```json
{
  "participants": [
    "628123456789@s.whatsapp.net"
  ]
}
```

### Response

```json
{
  "success": true
}
```

---

## Demote Participants

Remove admin status from members.

```
DELETE /api/v1/sessions/{session_id}/groups/{group_jid}/admins
```

### Request Body

```json
{
  "participants": [
    "628123456789@s.whatsapp.net"
  ]
}
```

### Response

```json
{
  "success": true
}
```

---

## Get Invite Link

Get or reset the group invite link.

```
GET /api/v1/sessions/{session_id}/groups/{group_jid}/invite-link
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `reset` | boolean | Set to `true` to generate a new invite link |

### Response

```json
{
  "invite_link": "https://chat.whatsapp.com/AbCdEfGhIjK"
}
```

### Example

```bash
# Get current invite link
curl http://localhost:3000/api/v1/sessions/my-session/groups/123456789-1234567890@g.us/invite-link \
  -H "Authorization: Bearer YOUR_TOKEN"

# Reset and get new invite link
curl "http://localhost:3000/api/v1/sessions/my-session/groups/123456789-1234567890@g.us/invite-link?reset=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

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
