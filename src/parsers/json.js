import { addParser, parseObjects } from './parser';

const prefix = '.json';

addParser(prefix, parseObjects(JSON.parse));
