---
sidebar_position: 3
---

# Contacts

Manage contacts and check WhatsApp availability.

## Check on WhatsApp

Check if phone numbers are registered on WhatsApp.

```
POST /api/v1/sessions/{session_id}/contacts/check
```

### Request Body

```json
{
  "phones": ["628123456789", "628987654321"]
}
```

### Response

```json
{
  "results": [
    {
      "phone": "628123456789",
      "exists": true,
      "jid": "628123456789@s.whatsapp.net"
    },
    {
      "phone": "628987654321",
      "exists": false,
      "jid": null
    }
  ]
}
```

---

## Get Contact Info

Get contact information.

```
POST /api/v1/sessions/{session_id}/contacts/info
```

### Request Body

```json
{
  "jid": "628123456789@s.whatsapp.net"
}
```

### Response

```json
{
  "jid": "628123456789@s.whatsapp.net",
  "name": "John Doe",
  "notify": "Johnny",
  "verified_name": null
}
```

---

## Get Profile Picture

Get contact's profile picture URL.

```
GET /api/v1/sessions/{session_id}/contacts/{jid}/picture
```

### Response

```json
{
  "url": "https://pps.whatsapp.net/...",
  "id": "123456789"
}
```

---

## Get User Info

Get detailed user information for multiple contacts.

```
POST /api/v1/sessions/{session_id}/contacts/users
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
  "users": [
    {
      "jid": "628123456789@s.whatsapp.net",
      "verified_name": "Business Name",
      "picture_id": "123456789"
    }
  ]
}
```

---

## JID Format

WhatsApp uses JID (Jabber ID) format for identifiers:

| Type | Format | Example |
|------|--------|---------|
| User | `{phone}@s.whatsapp.net` | `628123456789@s.whatsapp.net` |
| Group | `{id}@g.us` | `123456789-1234567890@g.us` |
| Broadcast | `{id}@broadcast` | `status@broadcast` |
