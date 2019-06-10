import ini from 'ini';
import { addParser } from './parsers';
import parseJsonObjects from './utils';

const prefix = '.ini';

const parse = (dataBefore, dataAfter) => {
  const objectBefore = ini.parse(dataBefore);
  const objectAfter = ini.parse(dataAfter);

  return parseJsonObjects(objectBefore, objectAfter);
};

addParser(prefix, parse);
