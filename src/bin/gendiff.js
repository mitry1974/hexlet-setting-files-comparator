#!/usr/bin/env node
import { version, description } from '../../package.json';

const commander = require('commander');
const program = new commander.Command();

program
.version(version)
.option('-d, --description', description)
.option('-o, --option', 'output information about application')
.option('-a, --arguments', 'output information about arguments')
.option('-r, --action', 'run difference calculator');

program.parse(process.argv);

if (program.description) console.log('Difference calculator. Calculate difference between two files.');
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);

