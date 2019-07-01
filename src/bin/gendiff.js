#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';
import generateDifference from '..';

program
  .version(version, '-V, --version')
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', '  Output format', 'simple')
  .action((firstConfig, secondConfig) => console.log(
    generateDifference(firstConfig, secondConfig, program.format),
  ))
  .parse(process.argv);
