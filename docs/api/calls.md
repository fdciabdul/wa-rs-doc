---
sidebar_position: 9
---

# Calls

REST surface for WhatsApp voice calls. Two families of endpoints:

- **Signalling** — [`ring`](#ring), [`reject`](#reject),
  [`accept`](#accept), [`terminate`](#terminate). Attention-grab pings
  and missed-call OTP flows. Also used to answer or drop incoming
  calls surfaced by the `incoming_call` webhook.
- **Media** — [`tts`](#tts) and [`play`](#play). Place an outgoing
  call and stream real audio into it (synthesised speech or an
  arbitrary audio file / URL). The peer picks up the call and hears
  your audio, then waxum hangs up automatically once playback ends.

Media is fed through the upstream `whatsapp-rust` VoIP engine as
16 kHz mono PCM, encoded to Opus on the fly. 1:1 video call
signalling is supported (see `kind: "video"` on [`ring`](#ring));
video media (frame ingest) is not yet exposed at the REST layer —
drive `voip::CallHandle::start_video` from Rust directly if you need
it.

:::note Server requirements
- **`/calls/play`** — requires `ffmpeg` on `$PATH` (used to decode
  arbitrary sources to PCM 16 kHz mono).
- **`/calls/tts`** — requires the [`edge-tts`](https://pypi.org/project/edge-tts)
  Python CLI on `$PATH` for Microsoft Edge neural-voice synthesis.
- Both endpoints work fully offline once the audio bytes are in
  memory; only the initial fetch/synth step touches the network.
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
audio-call one. `ring` itself does not carry media — the peer hears a
ringtone, then the call drops with "not connected" after the ring
timeout. For calls with real audio, use [`/tts`](#tts) or
[`/play`](#play) instead.

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

## Media plane (v0.7.9+)

Media on `/calls/tts` and `/calls/play` is carried by WhatsApp's
native **MLOW** audio codec — the same codec the WhatsApp app uses on
1:1 calls — implemented as pure Rust inside `whatsapp-rust`. Waxum
encodes PCM straight to MLOW frames (960 samples / 60 ms) and streams
them through the outbound RTP session; the callee's phone plays them
back through the normal WhatsApp call UI, sounding just like a
regular call.

An earlier iteration used raw PCM through `.audio()` and later Opus
carried through MLOW's escape profile — both were silent in the
field. If you were on v0.7.8 or older and saw peer phones ring but
play nothing, the fix is on v0.7.9.

### Server prerequisites
- **`ffmpeg`** on `$PATH` — used to decode arbitrary sources
  (mp3/wav/ogg/m4a/…) down to PCM 16 kHz mono. Required by both
  `/tts` and `/play`. No other external dependency: Microsoft Edge
  TTS voices run through the `msedge-tts` Rust crate directly, so
  neither the `edge-tts` CLI nor a Python interpreter is needed.

## TTS

Place an outgoing voice call and speak a synthesised message into it.
Uses the [`msedge-tts`](https://crates.io/crates/msedge-tts) Rust
crate to talk the Microsoft Edge readaloud WebSocket directly — no
`edge-tts` CLI, no Python.

Typical use case: **voice OTP delivery** — call the user, read the
6-digit code aloud, hang up. Higher trust than SMS, lower cost than
Twilio Voice.

```
POST /api/v1/sessions/{session_id}/calls/tts
```

### Request Body

```json
{
  "to": "6285117822731",
  "text": "Your verification code is 4 8 2 9 1 5. I repeat, 4 8 2 9 1 5.",
  "voice": "id-ID-ArdiNeural",
  "answer_grace_ms": 6000,
  "record": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `to` | string | Yes | Recipient phone number or full JID |
| `text` | string | Yes | Text to synthesise. Non-empty. XML characters (`<`, `>`, `&`, `"`, `'`) are auto-escaped |
| `voice` | string | No | Edge TTS voice short-name. Default `"id-ID-ArdiNeural"` |
| `answer_grace_ms` | integer | No | Silence prefix in ms before the speech starts, so the callee has time to pick up. Default `6000` |
| `record` | boolean | No | When `true`, waxum records the peer's inbound audio and exposes it at [`/recording.wav`](#peer-audio-recording) once the call ends. Default `false` |

Voice ids are the standard edge-tts catalogue —
`id-ID-ArdiNeural` (Bahasa Indonesia, male), `en-US-JennyNeural`,
`ja-JP-NanamiNeural`, and so on. Run `edge-tts --list-voices` to see
the full list.

### Response

```json
{
  "call_id": "9c0b12fe83aa47adbc9d1e4f6a7e0d81",
  "to": "6285117822731@s.whatsapp.net",
  "recording_url": "/api/v1/sessions/main/calls/9c0b12fe83aa47adbc9d1e4f6a7e0d81/recording.wav"
}
```

The call is placed and speech starts streaming in the background. The
call auto-terminates ~500 ms after the last PCM frame is sent. Use
[`/terminate`](#terminate) with the returned `call_id` to hang up
earlier.

`recording_url` is only present when `record: true` was passed. Fetch
that URL **after the call ends** to download the peer's audio as a
16 kHz mono WAV file.

## Play

Place an outgoing voice call and stream an arbitrary audio file (or
URL) into it. Uses `ffmpeg` under the hood to decode → 16 kHz mono
PCM, so anything ffmpeg understands works — mp3, wav, ogg, m4a,
remote HTTP(S) URLs, even local file paths on the server.

```
POST /api/v1/sessions/{session_id}/calls/play
```

### Request Body

```json
{
  "to": "6285117822731",
  "audio_url": "https://cdn.example.com/announcements/promo.mp3",
  "answer_grace_ms": 6000,
  "record": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `to` | string | Yes | Recipient phone number or full JID |
| `audio_url` | string | Yes | Anything ffmpeg can open — HTTP(S) URL, local path on the server, or `pipe:` |
| `answer_grace_ms` | integer | No | Silence prefix in ms before playback starts. Default `6000` |
| `record` | boolean | No | Record peer audio — see [`/recording.wav`](#peer-audio-recording) |

Practical notes for playing music:
- **Codec is 16 kHz mono MLOW**, tuned for speech. Vocals are clear,
  instrumentals sound low-fi. This is a WhatsApp VoIP protocol
  limit, not a waxum quality knob.
- **Duration cap** — WhatsApp will drop the call after ~30-60 s of
  media in most cases. Keep clips short.
- The playback pipeline hangs up ~500 ms after the last PCM frame,
  so a 30 s audio file → a ~36 s call (grace + audio + tail).

### Response

```json
{
  "call_id": "b3a1f7e0d2c6483b91a58f7c22e04d15",
  "to": "6285117822731@s.whatsapp.net",
  "recording_url": null
}
```

## Peer audio recording

When `record: true` is passed to `/tts` or `/play`, waxum decodes the
peer's incoming MLOW frames back to 16 kHz mono PCM and writes them
to disk as a WAV file. The file lives on the waxum host at:

```
{WHATSAPP_STORAGE_PATH}/{session_id}/recordings/{call_id}.wav
```

It is also exposed over HTTP for download:

```
GET /api/v1/sessions/{session_id}/calls/{call_id}/recording.wav
```

The `Content-Type` is `audio/wav` and a `Content-Disposition:
attachment` header is set. The file is **only written after the peer
hangs up** — polling the URL during the call returns `404` with a
JSON body telling you to retry when the call ends.

If the peer never answers (or never speaks), waxum still writes an
empty WAV placeholder so the download endpoint always returns `200`
after the call ends. Duration of the file is your ground truth for
"did the peer actually say anything".

## Bidirectional media WebSocket

For real-time audio streaming (voice bots, live TTS, live
transcription of the peer), waxum exposes a WebSocket that carries
raw PCM in both directions:

```
GET /api/v1/sessions/{session_id}/calls/media/ws?to=<phone_or_jid>
```

Upgrades the HTTP connection to a WebSocket. On upgrade waxum places
the outbound call. The first frame back is a text-frame JSON metadata
blob describing the audio format:

```json
{
  "type": "call_started",
  "call_id": "...",
  "session_id": "main",
  "to": "6285117822731@s.whatsapp.net",
  "sample_rate": 16000,
  "frame_samples": 960,
  "encoding": "pcm_s16le_mono_16khz"
}
```

After that, binary WebSocket frames flow both ways:
- **Client → server** — raw PCM (`s16le`, mono, 16 kHz). Prefer
  chunks of 960 samples = 1920 bytes each (60 ms of audio).
- **Server → client** — peer's PCM in the same shape, streamed as
  the media arrives.

Closing the WebSocket, or a transport error, hangs up the call. Only
`kind=audio` is supported today; video will return `400`.

Ideal use case: an AI voice agent (LLM + STT + TTS in a loop) driving
a live phone conversation, without waxum having to know anything
about the assistant's logic.

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
