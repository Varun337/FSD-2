# CI/CD Pipeline Documentation for Exp-20

## Overview

This document provides comprehensive information about the CI/CD pipeline implementation for the Exp-20 application using GitHub Actions.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  GitHub Repository                       │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Push to main / Pull Request                      │   │
│  └──────────────────────┬─────────────────────────┘   │
│                         │                               │
│          ┌──────────────┼──────────────┐               │
│          │              │              │               │
│          ▼              ▼              ▼               │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐   │
│  │ Backend Tests│ │Frontend Tests│ │Security Scan│   │
│  └──────┬───────┘ └──────┬───────┘ └─────────────┘   │
│         │                │                             │
│         └────────┬───────┘                             │
│                  │                                     │
│     (If successful & main branch)                      │
│                  │                                     │
│         ┌────────┴────────┐                            │
│         │                 │                            │
│         ▼                 ▼                            │
│  ┌──────────────────┐ ┌──────────────────┐            │
│  │Build & Push      │ │Build & Push      │            │
│  │Backend Image     │ │Frontend Image    │            │
│  │to GHCR           │ │to GHCR           │            │
│  └──────────────────┘ └──────────────────┘            │
│         │                 │                            │
│         └────────┬────────┘                            │
│                  │                                     │
│                  ▼                                     │
│  ┌──────────────────────────────────────┐             │
│  │  Container Images Ready for Deploy   │             │
│  │  ghcr.io/.../exp20-backend:main      │             │
│  │  ghcr.io/.../exp20-frontend:main     │             │
│  └──────────────────────────────────────┘             │
│                                                        │
└─────────────────────────────────────────────────────────┘
```

## Workflow Trigger Conditions

### Trigger Events
- **Push to main branch** - Runs full pipeline
- **Pull requests to main** - Runs tests only (no builds)
- **File path filters** - Only runs if `Exp-20/**` or workflow files changed

### Workflow Timing
- Tests: ~2-5 minutes per suite
- Docker builds: ~3-8 minutes per image
- Total pipeline: ~10-15 minutes

## Job Details

### 1. Backend Test Job

**Purpose**: Validate backend code quality and functionality

**Configuration**:
```yaml
name: Backend Tests
runs-on: ubuntu-latest
working-directory: Exp-20/Backend
```

**Steps**:
1. Checkout code
2. Setup Python 3.10
3. Create virtual environment
4. Install dependencies from requirements.txt
5. Run pytest on test_app.py
6. Upload coverage to Codecov (optional)

**Success Criteria**:
- All pytest tests pass
- No import errors
- Exit code 0

**Time**: ~2-3 minutes

### 2. Frontend Test Job

**Purpose**: Validate frontend code quality, linting, and tests

**Configuration**:
```yaml
name: Frontend Tests
runs-on: ubuntu-latest
working-directory: Exp-20/Frontend
```

**Steps**:
1. Checkout code
2. Setup Node 18
3. Install npm dependencies
4. Run ESLint for code quality
5. Build production bundle with Vite
6. Run Vitest test suite

**Success Criteria**:
- ESLint passes with no errors
- Vite build succeeds
- All Vitest tests pass
- Exit code 0

**Time**: ~3-5 minutes

### 3. Build Backend Job

**Purpose**: Build and push backend Docker image to GHCR

**Triggers**: Only on main branch push + successful backend tests

**Configuration**:
```yaml
name: Build Backend Docker Image
needs: backend-test
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
permissions:
  contents: read
  packages: write
```

**Steps**:
1. Checkout code
2. Setup Docker Buildx (for multi-platform builds)
3. Login to GHCR with GitHub token
4. Extract metadata (tags, labels)
5. Build and push image with layer caching

**Image Tags**:
- `main` - Latest from main branch
- `<commit-sha>` - Specific commit hash
- `v1.0.0` - Semantic version (if tagged)

**Time**: ~4-6 minutes

### 4. Build Frontend Job

**Purpose**: Build and push frontend Docker image to GHCR

**Triggers**: Only on main branch push + successful frontend tests

**Configuration**: Same as backend build

**Time**: ~3-5 minutes

### 5. Security Scan Job

**Purpose**: Scan for vulnerabilities in code and dependencies

**Tool**: Trivy by Aqua Security

**Scans**:
- Filesystem vulnerabilities
- Configuration issues
- Known CVEs in dependencies

**Output**:
- SARIF format report
- Integrated with GitHub Security tab
- Shows:
  - Critical vulnerabilities
  - High severity issues
  - Medium/Low findings

**Time**: ~2-3 minutes

## GitHub Secrets Configuration

### Required Secrets
**GITHUB_TOKEN** - Automatically provided by GitHub Actions
- Used for pushing to GHCR
- No manual configuration needed

### Optional Secrets
**CODECOV_TOKEN** - For coverage reporting
1. Go to https://codecov.io
2. Sign in with GitHub
3. Copy token
4. Add to repository secrets
5. Name: `CODECOV_TOKEN`

## Viewing Pipeline Results

### GitHub Actions Dashboard
1. Go to repository → Actions tab
2. Select workflow run
3. View:
   - Job status and logs
   - Execution time
   - Artifact details
   - Failed step details

### Checking Test Results
```bash
# View specific job logs
- Click job name in Actions dashboard
- Scroll to see step outputs
- Expand failed steps for error details
```

### Security Scan Results
1. Go to Security tab
2. Select "Code scanning alerts"
3. Filter by:
   - Severity (Critical, High, Medium, Low)
   - Tool (Trivy)
4. Review and dismiss/fix findings

## Local Development and Testing

### Pre-push Testing

Before pushing to main, run locally:

```bash
# Using Makefile
make test

# Or individually
make test-backend
make test-frontend
```

### Simulating CI/CD Locally

Use `act` tool to run GitHub Actions locally:

```bash
# Install act
brew install act  # macOS
# or download from https://github.com/nektos/act

# Run workflow
act push

# Run specific job
act -j backend-test
```

## Customization and Extension

### Adding New Test Steps

Edit `.github/workflows/fullstack-tests.yml`:

```yaml
- name: Custom Test Step
  run: |
    cd Exp-20/Backend
    python -m custom_test_script
```

### Changing Python/Node Version

```yaml
- name: Setup Python
  uses: actions/setup-python@v4
  with:
    python-version: '3.11'  # Change version here

- name: Setup Node
  uses: actions/setup-node@v3
  with:
    node-version: 20  # Change version here
```

### Adding Database Testing

Add service container:

```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_DB: test_db
      POSTGRES_PASSWORD: password
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
    ports:
      - 5432:5432
```

### Modifying Docker Build

Edit context path or Dockerfile:

```yaml
- name: Build and push Backend
  uses: docker/build-push-action@v4
  with:
    context: ./Exp-20/Backend
    dockerfile: ./Exp-20/Backend/Dockerfile.custom
    push: true
```

### Adding Deployment Step

After successful build, add deployment:

```yaml
deploy:
  needs: [build-backend, build-frontend]
  runs-on: ubuntu-latest
  steps:
    - name: Deploy to production
      run: |
        # Your deployment commands
        kubectl apply -f deployment.yaml
```

## Troubleshooting Pipeline Issues

### Workflow Not Triggering

**Problem**: Workflow doesn't run on push

**Solutions**:
- Check branch name (must be `main`)
- Check file path filters (changes in `Exp-20/**`)
- Verify workflow file syntax with https://yamllint.com/
- Check permissions in Settings → Actions

### Tests Failing in CI but Passing Locally

**Common Causes**:
- Different Python/Node versions
- Missing environment variables
- Platform-specific issues (Windows vs Linux)
- Dependency version mismatches

**Solution**:
```bash
# Match CI environment locally
python3.10 -m venv venv
source venv/bin/activate
pip install -r Exp-20/Backend/requirements.txt
```

### Docker Build Fails

**Problem**: Image build fails with dependency errors

**Debugging**:
```bash
# Build locally to reproduce
docker build -t exp20-backend:latest ./Exp-20/Backend

# View full output
docker build --progress=plain ./Exp-20/Backend
```

### GHCR Push Fails

**Problem**: Authentication error pushing to GHCR

**Check**:
- Token has `packages: write` permission
- Repository is accessible
- Image name format is correct

### Performance Issues

**Slow Builds**:
- Enable BuildKit: `DOCKER_BUILDKIT=1`
- Use .dockerignore to exclude unnecessary files
- Multi-stage builds to reduce image size
- Layer caching strategy

## Best Practices

### Security
- ✓ Never commit secrets (use GitHub Secrets)
- ✓ Pin action versions (use v3, not v3.x.x)
- ✓ Regular dependency updates
- ✓ Review security scan findings

### Reliability
- ✓ Run tests on every PR (not just main)
- ✓ Use specific base image versions
- ✓ Set timeouts for long-running jobs
- ✓ Implement retry logic for flaky tests

### Performance
- ✓ Parallelize independent jobs
- ✓ Use container caching
- ✓ Fail fast on first error
- ✓ Skip unnecessary steps with conditions

### Maintainability
- ✓ Keep workflows simple and readable
- ✓ Document custom steps
- ✓ Use reusable workflows for common tasks
- ✓ Version control workflow changes

## Monitoring and Alerts

### GitHub Notifications
- Workflow status notifications
- Failed job emails
- PR review requests

### Third-party Integrations
- Slack notifications: Add Slack action to workflow
- Discord webhooks: Use notify-send action
- PagerDuty alerts: For critical failures

### Log Retention
- Logs retained for 90 days (configurable)
- Artifacts stored separately
- Cleanup old artifacts to save space

## Cost Optimization

### GitHub Actions Minutes
- Free tier: 2,000 minutes/month
- Current pipeline: ~15 min per run
- Optimize by:
  - Skipping unnecessary jobs
  - Using smaller runners
  - Reducing test scope for PRs

### Storage
- Default: 500MB free storage
- Remove old artifacts:

```yaml
- name: Clean up artifacts
  if: always()
  run: |
    # Remove artifacts older than 30 days
```

## Migration to Production

### Prerequisites
- Containerized application running locally
- All tests passing
- Security scan findings resolved

### Steps
1. Set up container registry (GHCR already configured)
2. Configure deployment target (Kubernetes, Cloud Run, etc.)
3. Add deployment job to workflow
4. Set up monitoring and logging
5. Implement rollback strategy

### Validation Checklist
- [ ] Images build and run locally
- [ ] Tests pass consistently
- [ ] Security scan passes
- [ ] Documentation is up to date
- [ ] Deployment scripts are tested
- [ ] Monitoring is configured

## Support Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Documentation](https://docs.docker.com/build/)
- [Trivy Vulnerability Scanner](https://github.com/aquasecurity/trivy)
- [GHCR Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

