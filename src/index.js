import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';
import format from './formatters';

const nodeGenerators = [
  {
    check: (arg1, arg2) => _.isObject(arg1) && _.isObject(arg2),
    // eslint-disable-next-line no-use-before-define
    generateNode: (key, object1, object2) => ({ type: 'group', key, children: generateAst(object1, object2) }),
  },
  {
    check: (arg1, arg2) => arg1 === arg2 && typeof arg1 === typeof arg2,
    generateNode: (key, arg1) => ({ type: 'unchanged', key, value: arg1 }),
  },
  {
    check: arg1 => !arg1,
    generateNode: (key, object1, object2) => ({ type: 'added', key, value: object2 }),
  },
  {
    check: (arg1, arg2) => !arg2,
    generateNode: (key, object1) => ({ type: 'deleted', key, value: object1 }),
  },
  {
    check: (arg1, arg2) => arg1 !== arg2,
    generateNode: (key, object1, object2) => ({
      type: 'changed', key, oldValue: object1, newValue: object2,
    }),
  },
];

const getNodeGenerator = (arg1, arg2) => nodeGenerators.find(({ check }) => check(arg1, arg2));

const unionKeys = (object1, object2) => _.union(_.keys(object1), _.keys(object2));

const generateAst = (object1, object2) => {
  const keys = unionKeys(object1, object2);
  return keys.map((key) => {
    const { generateNode } = getNodeGenerator(object1[key], object2[key]);
    return generateNode(key, object1[key], object2[key]);
  }, []);
};

const getParsedConfig = (filepath) => {
  const parserType = path.extname(filepath).substring(1);
  const data = fs.readFileSync(filepath, 'utf8');
  return parse(data, parserType);
};

export default (filePath1, filePath2, formatterType) => {
  const config1 = getParsedConfig(filePath1);
  const config2 = getParsedConfig(filePath2);
  const ast = generateAst(config1, config2);
  return format(ast, formatterType);
};
