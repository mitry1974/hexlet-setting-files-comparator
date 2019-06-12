import ini from 'ini';
import { addParser } from './parsers';
import parseObjects from './utils';

const prefix = '.ini';

addParser(prefix, parseObjects(ini.parse));
