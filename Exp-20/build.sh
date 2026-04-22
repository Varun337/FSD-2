#!/bin/bash

# Exp-20 Build and Deploy Script
# This script builds and pushes Docker images for both backend and frontend

set -e

REGISTRY="ghcr.io"
REPO_OWNER="$(git config --get remote.origin.url | sed 's|.*:\(.*\)/.*|\1|')"
REPO_NAME="$(git config --get remote.origin.url | sed 's|.*/(.*?)\.git|\1|')"
IMAGE_NAME="$REGISTRY/$REPO_OWNER/$REPO_NAME"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Docker Images for Exp-20...${NC}"

# Get version from git tag or use latest
VERSION=$(git describe --tags --always 2>/dev/null || echo "latest")

echo -e "${YELLOW}Version: $VERSION${NC}"

# Build Backend Image
echo -e "${YELLOW}Building Backend Image...${NC}"
docker build -t "$IMAGE_NAME-backend:$VERSION" -t "$IMAGE_NAME-backend:latest" ./Exp-20/Backend

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend image built successfully${NC}"
else
    echo -e "${RED}✗ Backend image build failed${NC}"
    exit 1
fi

# Build Frontend Image
echo -e "${YELLOW}Building Frontend Image...${NC}"
docker build -t "$IMAGE_NAME-frontend:$VERSION" -t "$IMAGE_NAME-frontend:latest" ./Exp-20/Frontend

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend image built successfully${NC}"
else
    echo -e "${RED}✗ Frontend image build failed${NC}"
    exit 1
fi

# Optional: Push to registry (only if PUSH_REGISTRY env var is set)
if [ "$PUSH_REGISTRY" = "true" ]; then
    echo -e "${YELLOW}Pushing images to registry...${NC}"
    
    docker push "$IMAGE_NAME-backend:$VERSION"
    docker push "$IMAGE_NAME-backend:latest"
    docker push "$IMAGE_NAME-frontend:$VERSION"
    docker push "$IMAGE_NAME-frontend:latest"
    
    echo -e "${GREEN}✓ Images pushed successfully${NC}"
else
    echo -e "${YELLOW}Skipping registry push. Set PUSH_REGISTRY=true to push images.${NC}"
fi

echo -e "${GREEN}✓ Build process completed successfully!${NC}"
