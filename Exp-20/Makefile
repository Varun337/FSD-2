.PHONY: help build up down logs test lint format clean setup deploy

help:
	@echo "Exp-20 Development Commands"
	@echo "============================="
	@echo "make setup          - Setup development environment"
	@echo "make build          - Build Docker images"
	@echo "make up             - Start services with docker-compose"
	@echo "make down           - Stop and remove services"
	@echo "make logs           - View service logs"
	@echo "make test           - Run all tests"
	@echo "make test-backend   - Run backend tests only"
	@echo "make test-frontend  - Run frontend tests only"
	@echo "make lint           - Run linters"
	@echo "make lint-backend   - Lint backend code"
	@echo "make lint-frontend  - Lint frontend code"
	@echo "make format         - Format code"
	@echo "make clean          - Clean up build artifacts and containers"
	@echo "make deploy         - Deploy application"

setup:
	@echo "Setting up development environment..."
	@chmod +x setup-dev.sh build.sh
	@./setup-dev.sh

build:
	@echo "Building Docker images..."
	docker-compose build

up:
	@echo "Starting services..."
	docker-compose up -d
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:5000"

down:
	@echo "Stopping services..."
	docker-compose down

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

test: test-backend test-frontend
	@echo "All tests passed!"

test-backend:
	@echo "Running backend tests..."
	cd Exp-20/Backend && \
	python -m venv venv && \
	. venv/bin/activate && \
	pip install -r requirements.txt && \
	python -m pytest test_app.py -v

test-frontend:
	@echo "Running frontend tests..."
	cd Exp-20/Frontend && \
	npm install && \
	npm test -- --watchAll=false

lint: lint-backend lint-frontend
	@echo "Linting complete!"

lint-backend:
	@echo "Linting backend..."
	cd Exp-20/Backend && \
	python -m py_compile app.py run.py routes/student_routes.py

lint-frontend:
	@echo "Linting frontend..."
	cd Exp-20/Frontend && npm install && npm run lint

format:
	@echo "Formatting code..."
	cd Exp-20/Frontend && npm install && npx prettier --write src/

clean:
	@echo "Cleaning up..."
	docker-compose down
	docker system prune -f
	rm -rf Exp-20/Backend/venv
	rm -rf Exp-20/Frontend/node_modules
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete

deploy:
	@echo "Deploying application..."
	@chmod +x build.sh
	PUSH_REGISTRY=true ./build.sh

shell-backend:
	docker-compose exec backend bash

shell-frontend:
	docker-compose exec frontend sh

install-deps-backend:
	cd Exp-20/Backend && pip install -r requirements.txt

install-deps-frontend:
	cd Exp-20/Frontend && npm install

restart:
	docker-compose restart

status:
	docker-compose ps

health-check:
	@echo "Checking backend health..."
	@curl -s http://localhost:5000/ && echo "\n✓ Backend is healthy"
	@echo "Checking frontend health..."
	@curl -s http://localhost:5173/ > /dev/null && echo "✓ Frontend is running"
