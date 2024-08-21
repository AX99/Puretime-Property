init:
	yarn install

clean:
	rm -rf .cache && rm -rf public && yarn run clean

clean-dev:
	make clean && make dev

dev:
	yarn run develop

dev-m:
	yarn run develop-net

clean-dev-m:
	make clean && make dev-m

format:
	yarn run format
	
build:
	yarn run build

serve:
	yarn run serve

serve-m:
	yarn run serve-net

docker-buildup:
	docker-compose build && docker-compose up

docker-up:
	docker-compose up
# deploy-live:
# 	git pull upstream master && git push origin master