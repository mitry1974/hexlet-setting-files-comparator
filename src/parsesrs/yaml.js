import yaml from 'js-yaml';
import { addParser } from './parsers';
import parseJsonObjects from './utils';

const prefix = '.yml';

const parse = (dataBefore, dataAfter) => {
  const objectBefore = yaml.safeLoad(dataBefore);
  const objectAfter = yaml.safeLoad(dataAfter);

  return parseJsonObjects(objectBefore, objectAfter);
};

addParser(prefix, parse);
