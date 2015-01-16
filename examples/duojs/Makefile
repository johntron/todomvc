default: node_modules
	DEBUG=* ./node_modules/.bin/gulp

node_modules:
	npm install

extract:
	find */* -name "*.js" -not -path "node_modules/*" -not -path "components/*" -not -path "js/*" | xargs xgettext --from-code=UTF-8 -p ./i18n

po2json:
	mkdir -p ./i18n/en_US
	po2json ./i18n/messages.po ./i18n/en_US/messages.json

clean:
	rm -rf components js css
