# Deployment Guide for Exp-20

This guide covers various deployment scenarios for the Exp-20 application.

## Prerequisites

- Docker installed
- Docker Compose installed (for local deployment)
- GitHub repository set up with this project

## Deployment Options

### 1. Local Deployment with Docker Compose

The simplest way to run the application locally.

```bash
cd Exp-20
docker-compose up --build
```

Access the application at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

To stop the services:
```bash
docker-compose down
```

### 2. Manual Docker Deployment

Build and run Docker images individually.

#### Backend Deployment
```bash
# Build
docker build -t exp20-backend:1.0.0 ./Exp-20/Backend

# Run
docker run -d \
  --name exp20-backend \
  -p 5000:5000 \
  -e FLASK_ENV=production \
  exp20-backend:1.0.0
```

#### Frontend Deployment
```bash
# Build
docker build -t exp20-frontend:1.0.0 ./Exp-20/Frontend

# Run
docker run -d \
  --name exp20-frontend \
  -p 5173:5173 \
  -e VITE_API_URL=http://localhost:5000 \
  exp20-frontend:1.0.0
```

### 3. Kubernetes Deployment

Deploy to Kubernetes cluster.

#### Create namespace
```bash
kubectl create namespace exp20
```

#### Create deployments
```bash
# Backend deployment
kubectl apply -f k8s/backend-deployment.yaml -n exp20

# Frontend deployment
kubectl apply -f k8s/frontend-deployment.yaml -n exp20

# Services
kubectl apply -f k8s/services.yaml -n exp20
```

#### Verify deployment
```bash
kubectl get pods -n exp20
kubectl get svc -n exp20
```

### 4. GitHub Container Registry Deployment

Images are automatically pushed to GHCR after successful tests on main branch.

#### Pull images from GHCR
```bash
docker pull ghcr.io/YOUR-USERNAME/FSD-2-backend:main
docker pull ghcr.io/YOUR-USERNAME/FSD-2-frontend:main
```

#### Run from GHCR
```bash
docker run -p 5000:5000 ghcr.io/YOUR-USERNAME/FSD-2-backend:main
docker run -p 5173:5173 ghcr.io/YOUR-USERNAME/FSD-2-frontend:main
```

### 5. Cloud Provider Deployments

#### AWS Deployment (ECS)

1. Create ECS cluster:
```bash
aws ecs create-cluster --cluster-name exp20
```

2. Register task definitions:
```bash
aws ecs register-task-definition --cli-input-json file://backend-task.json
aws ecs register-task-definition --cli-input-json file://frontend-task.json
```

3. Create services:
```bash
aws ecs create-service \
  --cluster exp20 \
  --service-name exp20-backend \
  --task-definition exp20-backend
```

#### Google Cloud Run Deployment

```bash
# Deploy backend
gcloud run deploy exp20-backend \
  --source ./Exp-20/Backend \
  --region us-central1

# Deploy frontend
gcloud run deploy exp20-frontend \
  --source ./Exp-20/Frontend \
  --region us-central1
```

#### Heroku Deployment

```bash
# Install Heroku CLI
# heroku login

# Create apps
heroku create exp20-backend
heroku create exp20-frontend

# Deploy
git subtree push --prefix Exp-20/Backend heroku main
```

### 6. Docker Swarm Deployment

For Docker Swarm cluster.

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml exp20

# Check services
docker service ls

# Scale services
docker service scale exp20_backend=3 exp20_frontend=2
```

## Environment Configuration for Deployment

Create appropriate `.env` files for production:

### Backend `.env` for production
```
FLASK_ENV=production
FLASK_DEBUG=False
```

### Frontend `.env` for production
```
VITE_API_URL=https://api.example.com
```

## Health Checks

After deployment, verify the services are healthy:

```bash
# Check backend
curl http://localhost:5000/

# Check frontend (should serve HTML)
curl http://localhost:5173/
```

## Monitoring and Logging

### Docker Logs
```bash
# View logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# Logs for specific service
docker-compose logs backend
```

### Kubernetes Logs
```bash
# Pod logs
kubectl logs -f deployment/exp20-backend -n exp20

# All pods in namespace
kubectl logs -l app=exp20 -n exp20
```

## Database Setup

If using a database (not currently configured), you would add a service to docker-compose.yml:

```yaml
database:
  image: postgres:15
  environment:
    POSTGRES_DB: exp20
    POSTGRES_USER: admin
    POSTGRES_PASSWORD: password
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

## Backup and Recovery

### Backup Docker volumes
```bash
docker run --rm -v exp20_data:/data -v $(pwd):/backup alpine tar czf /backup/exp20-backup.tar.gz -C /data .
```

### Restore from backup
```bash
docker run --rm -v exp20_data:/data -v $(pwd):/backup alpine tar xzf /backup/exp20-backup.tar.gz -C /data
```

## Troubleshooting Deployment Issues

### Service won't start
```bash
# Check logs
docker logs exp20-backend

# Check port availability
lsof -i :5000

# Rebuild image
docker build --no-cache -t exp20-backend:latest ./Exp-20/Backend
```

### Connection refused errors
- Ensure services are running: `docker-compose ps`
- Check firewall rules
- Verify environment variables are set correctly
- Check CORS configuration in backend

### Memory issues
```bash
# Set memory limits in docker-compose.yml
services:
  backend:
    mem_limit: 512m
    memswap_limit: 1g
```

## Rollback Procedure

### Docker Compose
```bash
# Stop and remove current containers
docker-compose down

# Remove images
docker rmi exp20-backend exp20-frontend

# Deploy previous version
docker-compose up --build
```

### Kubernetes
```bash
# Rollback deployment
kubectl rollout undo deployment/exp20-backend -n exp20

# Check rollout history
kubectl rollout history deployment/exp20-backend -n exp20
```

## Security Checklist

- [ ] Environment secrets are not committed
- [ ] Docker images use specific versions (not latest)
- [ ] Container registries are private (or public with awareness)
- [ ] CORS is properly configured for production domains
- [ ] Database credentials are managed securely
- [ ] API endpoints validate input
- [ ] HTTPS is enabled (use reverse proxy/load balancer)
- [ ] Regular security scanning with Trivy
- [ ] Network policies are in place

## Performance Optimization

### Docker Image Size Reduction
```dockerfile
# Use multi-stage builds
FROM node:20-slim as builder
# Build steps

FROM node:20-slim
# Copy from builder
```

### Caching Strategy
- Separate requirements/package files from source code
- Use Docker layer caching effectively
- Pin dependency versions

### Load Balancing
```yaml
# Add to docker-compose for load balancing
frontend:
  image: traefik:v3
  ports:
    - "80:80"
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
```

## Support and Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
