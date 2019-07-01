import yaml from 'js-yaml';
import { addParser, parseObjects } from '.';

const prefix = '.yml';

addParser(prefix, parseObjects(yaml.safeLoad));
