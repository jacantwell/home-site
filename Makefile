.PHONY: install install-frontend install-backend \
       dev dev-frontend dev-backend \
       stop build lint clean

# --- Install ---

install: install-frontend install-backend ## Install all dependencies

install-frontend: ## Install frontend dependencies
	cd frontend && npm install

install-backend: ## Install backend dependencies
	cd backend && uv sync

# --- Development ---

dev: ## Start both frontend and backend dev servers (backgrounded)
	@echo "Starting backend on :8000 and frontend on :9875..."
	@cd backend && uv run uvicorn app.main:app --reload > /dev/null 2>&1 & echo $$! > .pid-backend
	@cd frontend && npm run dev > /dev/null 2>&1 & echo $$! > .pid-frontend
	@echo "Dev servers running. Use 'make stop' to stop them."
	@echo "  Backend PID: $$(cat .pid-backend)"
	@echo "  Frontend PID: $$(cat .pid-frontend)"

dev-frontend: ## Start frontend dev server
	cd frontend && npm run dev

dev-backend: ## Start backend dev server
	cd backend && uv run uvicorn app.main:app --reload

stop: ## Stop dev servers
	@-if [ -f .pid-backend ]; then kill $$(cat .pid-backend) 2>/dev/null; rm -f .pid-backend; fi
	@-if [ -f .pid-frontend ]; then kill $$(cat .pid-frontend) 2>/dev/null; rm -f .pid-frontend; fi
	@-pkill -f "uvicorn app.main:app" 2>/dev/null; true
	@-pkill -f "next dev" 2>/dev/null; true
	@echo "Stopped dev servers."

# --- Build & Lint ---

build: ## Production build of the frontend
	cd frontend && npm run build

lint: ## Lint the frontend
	cd frontend && npm run lint

# --- Cleanup ---

clean: ## Remove build artifacts and node_modules
	rm -rf frontend/.next frontend/node_modules
	rm -rf backend/__pycache__ backend/.venv

# --- Help ---

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
