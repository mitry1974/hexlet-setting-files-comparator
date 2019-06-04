#!/usr/bin/env node
import { version, description } from '../../package.json';
import generateDifference from '../engine';

const commander = require('commander');

const program = new commander.Command();

program
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .version(version)
  .option('-f, --format [type]', '  Output format')
  .action(generateDifference('data'));

program.parse(process.argv);
