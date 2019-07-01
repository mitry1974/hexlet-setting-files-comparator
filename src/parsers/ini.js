import ini from 'ini';
import { addParser, parseObjects } from '.';

const prefix = '.ini';

addParser(prefix, parseObjects(ini.parse));
