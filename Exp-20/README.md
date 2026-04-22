# Exp-20: Student Management System with CI/CD Pipeline

A full-stack student management application with comprehensive CI/CD pipeline implementation using GitHub Actions.

## Project Overview

This project demonstrates:
- **Backend**: Flask REST API with student management routes
- **Frontend**: React + Vite SPA for student management
- **CI/CD**: Automated testing, building, and container deployment
- **Containerization**: Docker and Docker Compose for consistent environments
- **Security**: Vulnerability scanning with Trivy

## Technology Stack

### Backend
- Python 3.10
- Flask
- Flask-CORS
- pytest for testing

### Frontend
- Node 18+
- React 19
- Vite
- Vitest for testing
- ESLint for code quality

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry (GHCR)

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Python 3.10 (for local backend development)
- Node 18+ (for local frontend development)

### Local Development with Docker Compose

```bash
# Clone and navigate to the project
cd Exp-20

# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

### Local Development (Without Docker)

#### Backend Setup
```bash
cd Exp-20/Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

#### Frontend Setup
```bash
cd Exp-20/Frontend
npm install
npm run dev
```

## CI/CD Pipeline

### GitHub Actions Workflow

The pipeline is triggered on:
- Push to main branch
- Pull requests to main branch
- Changes in `Exp-20/**` or workflow files

### Pipeline Stages

1. **Backend Tests** (`backend-test` job)
   - Sets up Python 3.10
   - Installs dependencies
   - Runs pytest on `test_app.py`
   - Uploads coverage reports to Codecov

2. **Frontend Tests** (`frontend-test` job)
   - Sets up Node 18
   - Installs dependencies
   - Runs ESLint for code quality
   - Builds the production bundle
   - Runs Vitest test suite

3. **Backend Docker Build** (`build-backend` job)
   - Runs only on successful backend tests
   - Only on push to main branch
   - Builds and pushes Docker image to GHCR
   - Tags images with:
     - Branch name
     - Semantic version (if tagged)
     - Commit SHA

4. **Frontend Docker Build** (`build-frontend` job)
   - Runs only on successful frontend tests
   - Only on push to main branch
   - Builds and pushes Docker image to GHCR
   - Same tagging strategy as backend

5. **Security Scanning** (`security-scan` job)
   - Runs Trivy vulnerability scanner
   - Scans both backend and frontend code
   - Reports findings to GitHub Security tab
   - Uses SARIF format for integration

## Docker Images

### Backend Image
- Base: `python:3.10`
- Port: 5000
- Working directory: `/app`
- Entry point: `python run.py`

### Frontend Image
- Base: `node:20`
- Port: 5173
- Working directory: `/app`
- Entry point: `npm run dev`

## Testing

### Backend Tests
```bash
cd Exp-20/Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m pytest test_app.py -v
```

### Frontend Tests
```bash
cd Exp-20/Frontend
npm install
npm test -- --watchAll=false
```

### Linting
```bash
cd Exp-20/Frontend
npm run lint
```

## Environment Configuration

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

Key environment variables:
- `FLASK_ENV`: Development/Production mode
- `VITE_API_URL`: Backend API endpoint
- `CORS_ORIGINS`: Allowed origins for CORS

## API Endpoints

### Health Check
- `GET /` - Returns server status

### Student Routes
See `Backend/routes/student_routes.py` for available endpoints

## Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Docker Deployment
```bash
# Backend
docker build -t exp20-backend:latest ./Backend
docker run -p 5000:5000 exp20-backend:latest

# Frontend
docker build -t exp20-frontend:latest ./Frontend
docker run -p 5173:5173 exp20-frontend:latest
```

### Using GHCR Images
```bash
# Pull and run backend
docker pull ghcr.io/your-repo/exp20-backend:main
docker run -p 5000:5000 ghcr.io/your-repo/exp20-backend:main

# Pull and run frontend
docker pull ghcr.io/your-repo/exp20-frontend:main
docker run -p 5173:5173 ghcr.io/your-repo/exp20-frontend:main
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Frontend dev server)
- `http://localhost:3000` (Alternative frontend port)
- `http://localhost:5000` (Backend)

Update `Backend/app.py` CORS configuration for production origins.

## Troubleshooting

### Docker Build Issues
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose up --build --no-cache
```

### Port Already in Use
```bash
# Find and kill process using the port
# Linux/Mac
lsof -i :5000
# Windows
netstat -ano | findstr :5000
```

### Dependencies Issues
```bash
# Reinstall all dependencies
rm -rf node_modules
npm ci
```

## CI/CD Secrets Configuration

For the pipeline to work properly, ensure GitHub repository has:

1. **GITHUB_TOKEN** (automatically provided by GitHub)
   - Used for pushing to GitHub Container Registry
   - No configuration needed

2. **Optional: Codecov token** (for coverage reports)
   - Add if you want detailed coverage analytics
   - Generate from codecov.io

## File Structure

```
Exp-20/
├── Backend/
│   ├── app.py              # Flask app factory
│   ├── run.py              # Application entry point
│   ├── Dockerfile          # Backend container
│   ├── requirements.txt     # Python dependencies
│   ├── test_app.py         # Test suite
│   └── routes/
│       └── student_routes.py
├── Frontend/
│   ├── package.json        # Node dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── eslint.config.js    # ESLint configuration
│   ├── Dockerfile          # Frontend container
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── components/
├── docker-compose.yml      # Local development setup
├── .dockerignore            # Docker build exclusions
├── .env.example             # Environment template
└── README.md                # This file
```

## Next Steps

1. Configure GitHub repository secrets if needed
2. Push changes to main branch to trigger CI/CD pipeline
3. Monitor GitHub Actions for pipeline execution
4. Review security scan results in GitHub Security tab
5. Deploy container images to your hosting platform

## Contributing

1. Create feature branch from main
2. Implement changes
3. Ensure all tests pass locally
4. Push to branch and create pull request
5. Pipeline will automatically test and build

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

