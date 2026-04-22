# Exp-20 CI/CD Quick Start Guide

## What's Been Implemented

You now have a complete CI/CD pipeline for Exp-20 that includes:

- ✅ Automated backend testing (Python/Flask)
- ✅ Automated frontend testing (React/Vite)
- ✅ Code linting and quality checks
- ✅ Docker image building and pushing to GitHub Container Registry
- ✅ Security vulnerability scanning
- ✅ Docker Compose for local development
- ✅ Deployment documentation
- ✅ Build automation scripts

## Quick Start

### 1. Initial Setup (First Time)

```bash
cd Exp-20

# Copy environment file
cp .env.example .env

# Start development environment with Docker Compose
docker-compose up --build

# Or use the setup script
./setup-dev.sh
```

### 2. Access the Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### 3. Make Changes and Test

#### Option A: Using Makefile (Recommended)
```bash
# Run all tests
make test

# Run specific tests
make test-backend
make test-frontend

# View logs
make logs

# Stop services
make down
```

#### Option B: Manual Commands
```bash
# Backend tests
cd Exp-20/Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pytest test_app.py -v

# Frontend tests
cd Exp-20/Frontend
npm install
npm test -- --watchAll=false
npm run lint
```

### 4. Commit and Push

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 5. Monitor CI/CD Pipeline

1. Go to GitHub repository
2. Click **Actions** tab
3. Watch the workflow run
4. Check status of each job:
   - ✅ Backend Tests
   - ✅ Frontend Tests
   - ✅ Build Backend Image
   - ✅ Build Frontend Image
   - ✅ Security Scanning

## File Structure

```
Exp-20/
├── CI-CD-GUIDE.md              ← Detailed CI/CD documentation
├── DEPLOYMENT.md               ← Deployment options and guides
├── README.md                   ← Project overview
├── Makefile                    ← Convenience commands
├── docker-compose.yml          ← Local development setup
├── .dockerignore               ← Docker build exclusions
├── .env.example                ← Environment template
├── .gitignore                  ← Git exclusions
├── build.sh                    ← Build automation script
├── setup-dev.sh                ← Development setup script
├── Backend/
│   ├── app.py
│   ├── run.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── test_app.py
│   └── routes/
└── Frontend/
    ├── package.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── Dockerfile
    └── src/
```

## Workflow Overview

### On Every Push to Main

```
┌─────────────────────┐
│  Push to GitHub     │
└──────────┬──────────┘
           │
    ┌──────┴──────────┐
    │                 │
    ▼                 ▼
┌────────────┐  ┌────────────┐
│ Test Bgnd  │  │ Test Front │
└────┬───────┘  └────┬───────┘
     │               │
     └───────┬───────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
┌──────────┐  ┌──────────┐
│Build Img │  │Build Img │
│ Backend  │  │ Frontend │
└──────────┘  └──────────┘
      │             │
      └──────┬──────┘
             │
             ▼
   ┌─────────────────┐
   │  Security Scan  │
   └─────────────────┘
             │
             ▼
   ┌─────────────────┐
   │ Images Ready!   │
   │ GHCR Deployed   │
   └─────────────────┘
```

## Essential Commands

### Development
```bash
make setup          # Initial setup
make up             # Start services
make down           # Stop services
make logs           # View logs
make test           # Run all tests
make clean          # Clean everything
```

### Deployment
```bash
make deploy         # Build and push images
PUSH_REGISTRY=true ./build.sh  # Alternative deploy
```

### Debugging
```bash
make logs-backend       # Backend logs only
make logs-frontend      # Frontend logs only
make shell-backend      # Shell into backend
make shell-frontend     # Shell into frontend
```

## Workflow Triggers

The CI/CD pipeline runs automatically when:

- 📌 You push to the `main` branch
- 📌 Files in `Exp-20/` directory change
- 📌 Workflow file itself changes

The pipeline does NOT run when:
- ❌ You push to other branches (unless configured)
- ❌ Changes are only in other directories
- ❌ Workflow is disabled

## Environment Configuration

### Local Development (`.env`)
```
FLASK_ENV=development
FLASK_DEBUG=True
VITE_API_URL=http://localhost:5000
```

### Production (modify and deploy)
```
FLASK_ENV=production
FLASK_DEBUG=False
VITE_API_URL=https://api.example.com
```

## Viewing CI/CD Results

### GitHub Actions Dashboard
1. Repository → Actions tab
2. Select workflow run
3. Click job to see details
4. Expand failed steps for errors

### Container Images
- View pushed images: Repository → Packages
- Images are tagged with:
  - Branch name: `main`
  - Commit SHA: `abc123...`
  - Semantic version (if tagged): `v1.0.0`

### Security Scan Results
1. Repository → Security tab
2. Code scanning alerts
3. Filter by severity and tool

## Common Issues & Solutions

### "Docker daemon not running"
```bash
# Start Docker Desktop application on your system
```

### "Port 5000/5173 already in use"
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or use different port
docker-compose down  # Stop previous containers
```

### "Tests fail locally but pass in CI"
```bash
# Match Python/Node versions used in CI
python --version    # Should be 3.10.x
node --version      # Should be 18.x

# Reinstall dependencies
rm -rf Exp-20/Backend/venv Exp-20/Frontend/node_modules
make test
```

### "Docker build fails with dependencies"
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose up --build --no-cache
```

## Next Steps

### 1. Configure Notifications (Optional)
Add Slack/Discord notifications to workflow

### 2. Set Up Production Deployment
Follow [DEPLOYMENT.md](DEPLOYMENT.md) for cloud deployment

### 3. Enable Additional Features
- Code coverage tracking
- Performance monitoring
- Custom deployment scripts

### 4. Team Workflow
- Branch protection rules
- Required status checks
- Code review process

## Key Files to Know

| File | Purpose |
|------|---------|
| `.github/workflows/fullstack-tests.yml` | Main CI/CD workflow |
| `docker-compose.yml` | Local development setup |
| `Makefile` | Development commands |
| `CI-CD-GUIDE.md` | Detailed documentation |
| `DEPLOYMENT.md` | Deployment options |
| `Backend/Dockerfile` | Backend container spec |
| `Frontend/Dockerfile` | Frontend container spec |

## Reference Links

- **GitHub Actions**: https://docs.github.com/en/actions
- **Docker Docs**: https://docs.docker.com/
- **Flask**: https://flask.palletsprojects.com/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/

## Support

For issues or questions:
1. Check CI-CD-GUIDE.md for detailed information
2. Check DEPLOYMENT.md for deployment questions
3. Review GitHub Actions logs for specific errors
4. Check Docker logs: `docker-compose logs`

---

**You're all set!** Your Exp-20 project now has a professional CI/CD pipeline. 🚀
