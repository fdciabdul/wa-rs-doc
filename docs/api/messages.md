---
sidebar_position: 2
---

# Messages

Send various types of messages through WhatsApp.

## Send Text Message

```
POST /api/v1/sessions/{session_id}/messages/text
```

### Request Body

```json
{
  "to": "628123456789",
  "text": "Hello from WA-RS!"
}
```

### Response

```json
{
  "message_id": "3EB0ABC123...",
  "status": "sent"
}
```

### Example

```bash
curl -X POST http://localhost:3451/api/v1/sessions/my-session/messages/text \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "628123456789",
    "text": "Hello!"
  }'
```

---

## Send Image

```
POST /api/v1/sessions/{session_id}/messages/image
```

### Request Body

```json
{
  "to": "628123456789",
  "media": {
    "url": "https://example.com/image.jpg"
  },
  "caption": "Check this out!"
}
```

Or with base64:

```json
{
  "to": "628123456789",
  "media": {
    "base64": "/9j/4AAQSkZJRg...",
    "mimetype": "image/jpeg"
  },
  "caption": "Check this out!"
}
```

---

## Send Video

```
POST /api/v1/sessions/{session_id}/messages/video
```

### Request Body

```json
{
  "to": "628123456789",
  "media": {
    "url": "https://example.com/video.mp4"
  },
  "caption": "Watch this!"
}
```

---

## Send Audio

```
POST /api/v1/sessions/{session_id}/messages/audio
```

### Request Body

```json
{
  "to": "628123456789",
  "media": {
    "url": "https://example.com/audio.mp3"
  },
  "ptt": true
}
```

| Field | Description |
|-------|-------------|
| `ptt` | Push-to-talk (voice note) if true |

---

## Send Document

```
POST /api/v1/sessions/{session_id}/messages/document
```

### Request Body

```json
{
  "to": "628123456789",
  "media": {
    "url": "https://example.com/document.pdf"
  },
  "filename": "report.pdf"
}
```

---

## Send Sticker

```
POST /api/v1/sessions/{session_id}/messages/sticker
```

### Request Body

```json
{
  "to": "628123456789",
  "media": {
    "url": "https://example.com/sticker.webp"
  }
}
```

---

## Send Location

```
POST /api/v1/sessions/{session_id}/messages/location
```

### Request Body

```json
{
  "to": "628123456789",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "name": "Jakarta",
  "address": "Jakarta, Indonesia"
}
```

---

## Send Contact

```
POST /api/v1/sessions/{session_id}/messages/contact
```

### Request Body

```json
{
  "to": "628123456789",
  "contact": {
    "name": "John Doe",
    "phones": [
      {
        "phone": "+628123456789",
        "type": "CELL"
      }
    ]
  }
}
```

---

## Edit Message

```
POST /api/v1/sessions/{session_id}/messages/edit
```

### Request Body

```json
{
  "message_id": "3EB0ABC123...",
  "chat": "628123456789",
  "text": "Edited message text"
}
```

---

## Send Reaction

```
POST /api/v1/sessions/{session_id}/messages/react
```

### Request Body

```json
{
  "message_id": "3EB0ABC123...",
  "chat": "628123456789",
  "emoji": "👍"
}
```

To remove reaction, send empty emoji:

```json
{
  "message_id": "3EB0ABC123...",
  "chat": "628123456789",
  "emoji": ""
}
```

---

## Media Data Format

All media endpoints accept either URL or base64:

### URL Format

```json
{
  "media": {
    "url": "https://example.com/file.jpg"
  }
}
```

### Base64 Format

```json
{
  "media": {
    "base64": "base64-encoded-data...",
    "mimetype": "image/jpeg"
  }
}
```

### Supported MIME Types

| Type | MIME Types |
|------|------------|
| Image | `image/jpeg`, `image/png`, `image/webp` |
| Video | `video/mp4`, `video/3gpp` |
| Audio | `audio/mpeg`, `audio/ogg`, `audio/wav` |
| Document | Any |
| Sticker | `image/webp` |
