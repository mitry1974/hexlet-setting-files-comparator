import ini from 'ini';
import { addParser } from '.';

const prefix = '.ini';

addParser(prefix, ini.parse);
