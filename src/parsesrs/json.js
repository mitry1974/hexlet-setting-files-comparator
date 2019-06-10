import { addParser } from './parsers';
import parseJsonObjects from './utils';

const prefix = '.json';

const parse = (dataBefore, dataAfter) => {
  const objectBefore = JSON.parse(dataBefore, 'utf-8');
  const objectAfter = JSON.parse(dataAfter, 'utf-8');

  return parseJsonObjects(objectBefore, objectAfter);
};

addParser(prefix, parse);
