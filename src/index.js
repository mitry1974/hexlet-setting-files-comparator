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
  return keys.reduce((acc, key) => {
    const { generateNode } = getNodeGenerator(object1[key], object2[key]);
    return [...acc, generateNode(key, object1[key], object2[key])];
  }, []);
};

export default (filePath1, filePath2, formatterType) => {
  const parserType = path.extname(filePath1);
  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  const ast = generateAst(parse(dataBefore, parserType), parse(dataAfter, parserType));
  return format(ast, formatterType);
};
