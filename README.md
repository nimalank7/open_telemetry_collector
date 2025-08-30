# OpenTelemetry Collector

Simple Express application that exposes a single endpoint which returns 'Hello World!'. Logger writes to `./logs/app.log` 
which the OpenTelemetry Collector reads and then writes to `output.log` in `./data`

## Run from Docker compose

1. Build the application

```
docker compose -f docker-compose.yaml build
```

2. Start up docker compose

```
docker compose up -d
```

3. Navigate to `localhost:3000` and make a few requests

Application logs appear in `/logs` whilst OpenTelemetry Collector exported logs appear in `/data`

## Run from Kubernetes

1. Create a `k3d` cluster mapping `Ingress` port 3000 to `localhost:8081`

```
k3d cluster create example_cluster --api-port 6550 -p "8081:3000@loadbalancer"
```

2. Install `cert-manager` Helm chart

```
helm install \
cert-manager oci://quay.io/jetstack/charts/cert-manager \
--version v1.18.2 \
--namespace cert-manager \
--create-namespace \
--set crds.enabled=true
```

3. Install OpenTelemetry operator

```
helm install opentelemetry-operator open-telemetry/opentelemetry-operator \
--namespace opentelemetry-operator-system \
--create-namespace \
--version 0.93.1
```

4. Import Docker image

```
k3d image import node-log-application -c example_cluster
```

5. Deploy the OpenTelemetry Collector

```
kubectl apply -f collector-tracing.yaml
```

6. Deploy the Node deployment

```
kubetl apply -f deployment.yaml
```

7. Port forward to Node service

```
kubectl port-forward svc/node-log-application 3000
```

8. Navigate to `localhost:3000` and make several requests
9. Navigate to the log files

```
kubectl exec -it <node-log-application-pod> -- bash
cd data
```