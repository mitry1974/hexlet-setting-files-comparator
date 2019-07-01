import fs from 'fs';
import path from 'path';
import parse from './parsers';
import './parsers/json';
import './parsers/yaml';
import './parsers/ini';
import './formatters/simple';
import './formatters/plain';
import format from './formatters';

export default (filePath1, filePath2, formatterPrefix) => {
  const parserPrefix = path.extname(filePath1);
  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  return format(parse(dataBefore, dataAfter, parserPrefix), formatterPrefix);
};
