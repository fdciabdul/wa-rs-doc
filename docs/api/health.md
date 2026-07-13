---
sidebar_position: 10
---

# Health & Liveness

Endpoints for load balancers, container orchestrators, and monitoring
probes. All three probes bypass JWT auth.

## `/livez` — liveness

Static probe. Returns `200 OK` as long as the HTTP server is up. Uses no
downstream dependencies (no DB, no filesystem, no state). Use as the
Kubernetes `livenessProbe` / systemd watchdog / docker HEALTHCHECK — a
`503` here means the process is deadlocked and should be restarted.

```
GET /livez
```

```
OK
```

## `/readyz` — readiness

Probe that also touches the DB pool. Runs `SELECT 1` against the
configured backend (Postgres / MySQL / SQLite) and reports the current
number of in-memory sessions. Returns `200` when the DB responds and
`503` when it does not.

Use as Kubernetes `readinessProbe` — a `503` here temporarily removes
the pod from the load balancer without killing it, letting the DB
recover.

```
GET /readyz
```

```json
{
  "db": "ok",
  "sessions_known": 500
}
```

When the DB probe fails:

```json
{
  "db": "fail",
  "sessions_known": 500
}
```

## `/health` — legacy alias

Same shape as `/livez`, kept as a compatibility alias for existing
Docker HEALTHCHECK / uptime monitors. New deployments should point at
`/livez` for liveness and `/readyz` for readiness.

```
GET /health
```

```
OK
```

## Metrics

Prometheus text exposition on `/metrics` (JWT bypass). Counters and
gauges for sessions, webhook dispatch, and message throughput. See the
`prometheus` crate defaults for the metric names.
