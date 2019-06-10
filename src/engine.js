import fs from 'fs';
import path from 'path';
import { getParser } from './parsesrs/parsers';
import './parsesrs/json';
import './parsesrs/yaml';

export default (filePath1, filePath2) => {
  const prefix = path.extname(filePath1);
  const parser = getParser(prefix);

  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  const finalArray = parser(dataBefore, dataAfter);

  return `{\n${finalArray.join('\n')}\n}`;
};
