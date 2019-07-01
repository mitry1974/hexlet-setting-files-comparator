import yaml from 'js-yaml';
import { addParser } from '.';

const prefix = '.yml';

addParser(prefix, yaml.safeLoad);
