import yaml from 'js-yaml';
import { addParser } from './parsers';
import parseObjects from './utils';

const prefix = '.yml';

addParser(prefix, parseObjects(yaml.safeLoad));
