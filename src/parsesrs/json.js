import { addParser } from './parsers';
import parseObjects from './utils';

const prefix = '.json';

addParser(prefix, parseObjects(JSON.parse));
