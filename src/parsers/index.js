import yaml from 'js-yaml';
import ini from 'ini';
import generateAst from './generateAst';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (dataBefore, dataAfter, prefix) => {
  const parse = parsers[prefix];
  const objectBefore = parse(dataBefore, 'utf-8');
  const objectAfter = parse(dataAfter, 'utf-8');

  return generateAst(objectBefore, objectAfter);
};
