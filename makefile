NODE_VERSION := $(shell node -v 2>/dev/null)
REQUIRED_NODE := v18.20.8

check-node:
	@if [ -z "$(NODE_VERSION)" ]; then \
		echo "Error: Node.js is not installed. Please install Node.js $(REQUIRED_NOTE)"; \
		exit 1; \
	elif [ "$(NODE_VERSION)" != "$(REQUIRED_NODE)" ]; then \
		echo "Error: Wrong Node.js version. Please switch to $(REQUIRED_NODE) (current: $(NODE_VERSION))"; \
		echo "Run: nvm use lts/hydrogen"; \
		exit 1; \
	fi

init: check-node
	yarn install

clean:
	rm -rf .cache || true
	rm -rf public || true
	yarn run clean

clean-dev: check-node
	make clean || true
	make dev

dev: check-node
	yarn run develop

dev-m: check-node
	yarn run develop-net

clean-dev-m: check-node
	make clean || true
	make dev-m

format: check-node
	yarn run format
	
build: check-node
	yarn run build

serve: check-node
	yarn run serve

serve-m: check-node
	yarn run serve-net

docker-buildup: check-node
	docker-compose build || true
	docker-compose up

docker-up: check-node
	docker-compose up

# deploy-live:
# 	git pull upstream master || true
# git push origin master