# Makefile
install:
	npm install

publish:
	npm publish --dry-run

lint:
	eslint .
