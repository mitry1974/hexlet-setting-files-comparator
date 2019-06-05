# Makefile
install:
	npm install

publish:
	npm publish --dry-run

lint:
	eslint .

run help:
	npx npx babel-node src/bin/gendiff.js -h

run version:
	npx babel-node src/bin/gendiff.js -V
