init:
	yarn install

clean-dev:
	rm -rf .cache && rm -rf public && yarn run clean

dev:
	yarn run dev

dev-m:
	yarn astro dev --host

format:
	yarn run format
	
build:
	yarn run build

serve:
	yarn run serve

# deploy-live:
# 	git pull upstream master && git push origin master