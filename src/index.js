import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { getParser } from './parsers';
import './parsers/json';
import './parsers/yaml';
import './parsers/ini';
import './formatters/simple';
import './formatters/plain';
import format from './formatters';

export default (filePath1, filePath2, formatterPrefix) => {
  const prefix = path.extname(filePath1);
  const parser = getParser(prefix);

  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  return format(parser(dataBefore, dataAfter), formatterPrefix);
};
