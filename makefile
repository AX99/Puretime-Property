init:
	yarn install

clean:
	rm -rf .cache && rm -rf public && yarn run clean

clean-dev:
	make clean && make dev

dev:
	yarn run dev

dev-m:
	yarn run dev-net

clean-dev-m:
	make clean && make dev-m

format:
	yarn run format
	
build:
	yarn run build

serve:
	yarn run serve

# deploy-live:
# 	git pull upstream master && git push origin master