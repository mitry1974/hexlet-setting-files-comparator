import { addParser } from '.';

const prefix = '.json';

addParser(prefix, JSON.parse);
