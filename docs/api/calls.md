---
sidebar_position: 9
---

# Calls

Signalling endpoints for WhatsApp voice/video calls. Useful for
attention-grab pings, missed-call OTP flows, and marking a contact's
call log.

:::note
These endpoints trigger the ring on the peer's phone via the standard
WhatsApp call signalling protocol. They do not carry media — the peer
sees an incoming call, and after ringing for the usual timeout the
call drops with "not connected". Voice-over-call is not exposed here.
:::

## Ring

Ring a peer.

```
POST /api/v1/sessions/{session_id}/calls/ring
```

### Request Body

```json
{
  "to": "6285117822731",
  "kind": "audio",
  "call_id": "OPTIONAL-CUSTOM-CALL-ID"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `to` | string | Yes | Recipient phone number or full JID |
| `kind` | string | No | `"audio"` (default) or `"video"` |
| `call_id` | string | No | Custom call id. Omit to auto-generate |

`kind: "video"` adds a `<video enc="vp8">` codec child to the offer so
the peer's phone shows the video-call incoming UI instead of the plain
audio-call one. The call still does not carry media.

### Response

```json
{
  "call_id": "00b92fd4ad13123648f76533b4939625",
  "to": "6285117822731@s.whatsapp.net"
}
```

Save the returned `call_id` — you'll need it to terminate the call
before the peer's phone times out.

## Reject

Reject an incoming call. Requires the `call_id` and caller JID surfaced
by the `incoming_call` webhook event.

```
POST /api/v1/sessions/{session_id}/calls/reject
```

### Request Body

```json
{
  "from": "6285117822731@s.whatsapp.net",
  "call_id": "00A0F769CA10E8F99EE309BDEAF4E933"
}
```

### Response

```json
{
  "success": true,
  "message": "Call rejected"
}
```

## Accept

Accept an incoming call. Mark it as answered in the peer's call log.

```
POST /api/v1/sessions/{session_id}/calls/accept
```

### Request Body

```json
{
  "from": "6285117822731@s.whatsapp.net",
  "call_id": "00A0F769CA10E8F99EE309BDEAF4E933"
}
```

### Response

```json
{
  "success": true,
  "message": "Call accepted"
}
```

## Terminate

Hang up a live call (either an outgoing ring you started, or an
accepted incoming call).

```
POST /api/v1/sessions/{session_id}/calls/terminate
```

### Request Body

```json
{
  "peer": "6285117822731@s.whatsapp.net",
  "call_id": "00b92fd4ad13123648f76533b4939625",
  "reason": "hangup"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `peer` | string | Yes | Peer JID |
| `call_id` | string | Yes | The `call_id` to terminate |
| `reason` | string | No | Terminate reason attr. Defaults to `"hangup"` |

### Response

```json
{
  "success": true,
  "message": "Call terminated"
}
```

## Incoming Call Webhook

An incoming call fires the `incoming_call` webhook event. Data payload:

```json
{
  "from": "6285117822731@s.whatsapp.net",
  "stanza_id": "5C1F3A2E4B6D7F8E",
  "call_id": "00A0F769CA10E8F99EE309BDEAF4E933",
  "call_creator": "6285117822731@s.whatsapp.net",
  "notify": "Taqin",
  "platform": "android",
  "version": "2.25.37.76",
  "timestamp": 1783483722,
  "offline": false,
  "action": "Offer { ... }"
}
```

Take the `call_id` and `from` fields and forward them to
`/calls/reject`, `/calls/accept`, or `/calls/terminate` as appropriate.
