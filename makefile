init:
	yarn install

clean:
	rm -rf .cache || true
	rm -rf public || true
	yarn run clean

clean-dev:
	make clean || true
	make dev

dev:
	yarn run develop

dev-m:
	yarn run develop-net

clean-dev-m:
	make clean || true
	make dev-m

format:
	yarn run format
	
build:
	yarn run build

serve:
	yarn run serve

serve-m:
	yarn run serve-net

docker-buildup:
	docker-compose build || true
	docker-compose up

docker-up:
	docker-compose up
# deploy-live:
# 	git pull upstream master || true
# git push origin master