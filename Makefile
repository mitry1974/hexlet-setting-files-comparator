# Makefile
install:
	npm install

startCalc:
	npx babel-node src/bin/brain-calc.js

startEven:
	npx babel-node src/bin/brain-even.js

lint:
	eslint .
