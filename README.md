# OpenTelemetry Collector

Simple Express application that exposes a single endpoint which returns 'Hello World!'. Logger writes `app.log` to `/logs` 
which the OpenTelemetry Collector reads and then writes to `output.log` in `/data`

# How to run

1. Start the application

```
node index.js
```

2. Start up docker compose

```
docker compose up -d
```

3. Navigate to:

```
localhost:3000
```

4. Logs will appear in:

```
/logs
/data
```
