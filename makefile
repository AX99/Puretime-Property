NODE_VERSION := $(shell node -v 2>/dev/null)
REQUIRED_NODE := v18.20.8

# Check if Node.js is installed and if the version is correct. If not, exit with an error.
check-node:
	@if [ -z "$(NODE_VERSION)" ]; then \
		echo "Error: Node.js is not installed. Please install Node.js $(REQUIRED_NOTE)"; \
		exit 1; \
	elif [ "$(NODE_VERSION)" != "$(REQUIRED_NODE)" ]; then \
		echo "Error: Wrong Node.js version. Please switch to $(REQUIRED_NODE) (current: $(NODE_VERSION))"; \
		echo "Run: nvm use lts/hydrogen"; \
		exit 1; \
	fi

# Install dependencies.
init: check-node
	yarn install

# Clean the cache and public directory.
clean:
	rm -rf .cache || true
	rm -rf public || true
	yarn run clean

# Clean the cache and public directory for development.
clean-dev: check-node
	make clean || true
	make dev

# Run the development server.
dev: check-node
	yarn run develop

# Run the development server for the mainnet.
dev-m: check-node
	yarn run develop-net

# Clean the cache and public directory for development for the mainnet.
clean-dev-m: check-node
	make clean || true
	make dev-m

# Format the code.
format: check-node
	yarn run format
	
# Build the project.
build: check-node
	yarn run build

# Serve the project.
serve: check-node
	yarn run serve

# Serve the project for the mainnet.
serve-m: check-node
	yarn run serve-net

# Build and run the project in a Docker container.
docker-buildup: check-node
	docker-compose build || true
	docker-compose up

# Run the project in a Docker container.
docker-up: check-node
	docker-compose up

# Deploy the project to the live server.
# deploy-live:
# 	git pull upstream master || true
# git push origin master