import ini from 'ini';
import { addParser, parseObjects } from './parser';

const prefix = '.ini';

addParser(prefix, parseObjects(ini.parse));
