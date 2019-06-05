#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';
import generateDifference from '../engine';

program
  .version(version, '-V, --version')
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', '  Output format')
  .action(generateDifference('data'))
  .parse(process.argv);

if (program.format) {
  console.log('format');
}
