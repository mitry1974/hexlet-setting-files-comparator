import yaml from 'js-yaml';
import ini from 'ini';
import generateAST from './generateAST';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = prefix => parsers[prefix];

export default (dataBefore, dataAfter, prefix) => {
  const objectBefore = getParser(prefix)(dataBefore, 'utf-8');
  const objectAfter = getParser(prefix)(dataAfter, 'utf-8');

  return generateAST(objectBefore, objectAfter);
};
