import fs from 'fs';
import path from 'path';
import parse from './parsers';
import format from './formatters';
import generateAst from './generateAst';

export default (filePath1, filePath2, formatterType) => {
  const parserType = path.extname(filePath1);
  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  const ast = generateAst(parse(dataBefore, parserType), parse(dataAfter, parserType));
  return format(ast, formatterType);
};
