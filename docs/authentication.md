---
sidebar_position: 3
---

# Authentication

WA-RS uses JWT (JSON Web Tokens) for API authentication. All API endpoints (except `/health` and `/swagger-ui`) require a valid JWT token.

## Getting Your Token

When the server starts, it generates a superadmin JWT token and prints it to the console:

```
INFO wa_rs: ===========================================
INFO wa_rs: SUPERADMIN JWT TOKEN (save this!):
INFO wa_rs: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
INFO wa_rs: ===========================================
```

**Save this token** - you'll need it for all API requests.

## Using the Token

Include the token in the `Authorization` header with the `Bearer` prefix:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3451/api/v1/sessions
```

## Request Examples

### List Sessions

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3451/api/v1/sessions
```

### Create Session

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "my-session", "name": "My Account"}' \
  http://localhost:3451/api/v1/sessions
```

## Error Responses

### Missing Token

```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid Authorization header. Use: Bearer <token>"
}
```

### Invalid Token

```json
{
  "error": "Unauthorized",
  "message": "Invalid token format"
}
```

### Expired Token

```json
{
  "error": "Unauthorized",
  "message": "Token has expired"
}
```

## Custom JWT Secret

By default, WA-RS generates a random JWT secret. For production, set your own secret:

```bash
export JWT_SECRET=your-super-secure-secret-key
```

Or in `.env`:

```
JWT_SECRET=your-super-secure-secret-key
```

## Token Structure

The JWT token contains:

```json
{
  "sub": "superadmin",
  "role": "superadmin",
  "exp": 1798679117,
  "iat": 1767143117
}
```

| Field | Description |
|-------|-------------|
| `sub` | Subject (user identifier) |
| `role` | User role (must be "superadmin") |
| `exp` | Expiration timestamp |
| `iat` | Issued at timestamp |

## Using Swagger UI

To authenticate API requests in Swagger UI:

1. Open Swagger UI at `http://localhost:3451/swagger-ui`
2. Click the **"Authorize"** button (lock icon) at the top right
3. In the dialog, enter your token in this format:
   ```
   Bearer YOUR_JWT_TOKEN
   ```
4. Click **"Authorize"** then **"Close"**
5. All API requests will now include your token

Example value to enter:
```
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## Public Endpoints

These endpoints don't require authentication:

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /dashboard/*` | Web Dashboard |
| `GET /swagger-ui/*` | Swagger UI |
| `GET /api-docs/*` | OpenAPI spec |

## Dashboard Access

The web dashboard at `/dashboard` doesn't require JWT authentication. You can access it directly at:

```
http://localhost:3451/dashboard
```

The dashboard provides a user-friendly interface to:
- View and manage sessions
- Create new sessions with QR code or pair code
- Configure webhooks
- View JWT token in settings
