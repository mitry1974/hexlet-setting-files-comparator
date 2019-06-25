import yaml from 'js-yaml';
import { addParser, parseObjects } from './parser';

const prefix = '.yml';

addParser(prefix, parseObjects(yaml.safeLoad));
