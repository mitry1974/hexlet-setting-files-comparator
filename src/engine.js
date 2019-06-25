import fs from 'fs';
import path from 'path';
import { getParser } from './parsers/parser';
import './parsers/json';
import './parsers/yaml';
import './parsers/ini';
import './renders/simple';
import { getRender } from './renders/render';

export default (filePath1, filePath2, renderPrefix) => {
  const prefix = path.extname(filePath1);
  const parser = getParser(prefix);

  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  const finalArray = parser(dataBefore, dataAfter);
  const render = getRender(renderPrefix);
  return render(finalArray);
};
