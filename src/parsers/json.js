import { addParser, parseObjects } from '.';

const prefix = '.json';

addParser(prefix, parseObjects(JSON.parse));
