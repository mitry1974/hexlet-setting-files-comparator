import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';
import format from './formatters';

const diffOperations = [
  {
    check: (arg1, arg2) => _.isObject(arg1) && _.isObject(arg2),
    // eslint-disable-next-line no-use-before-define
    getOperation: (key, object1, object2) => ({ diffOp: 'group', key, children: generateAst(object1, object2) }),
  },
  {
    check: (arg1, arg2) => arg1 === arg2 && typeof arg1 === typeof arg2,
    getOperation: (key, arg1) => ({ diffOp: 'unchanged', key, value: arg1 }),
  },
  {
    check: arg1 => !arg1,
    getOperation: (key, object1, object2) => ({ diffOp: 'added', key, value: object2 }),
  },
  {
    check: (arg1, arg2) => !arg2,
    getOperation: (key, object1) => ({ diffOp: 'deleted', key, value: object1 }),
  },
  {
    check: (arg1, arg2) => arg1 !== arg2,
    getOperation: (key, object1, object2) => ({
      diffOp: 'changed', key, oldValue: object1, newValue: object2,
    }),
  },
  {
    check: () => true,
    getOperation: (key, object1, object2) => console.log(`key = ${key}, object1 = ${JSON.stringify(object1)}, object2 = ${JSON.stringify(object2)}`),
  },
];

const getDiffOperation = (arg1, arg2) => diffOperations.find(({ check }) => check(arg1, arg2));

const unionKeys = (object1, object2) => _.union(_.keys(object1), _.keys(object2));

const generateAst = (object1, object2) => {
  const keys = unionKeys(object1, object2);
  return keys.reduce((acc, key) => {
    const { getOperation } = getDiffOperation(object1[key], object2[key]);
    return [...acc, getOperation(key, object1[key], object2[key])];
  }, []);
};

export default (filePath1, filePath2, formatterType) => {
  const parserType = path.extname(filePath1);
  const dataBefore = fs.readFileSync(filePath1, 'utf8');
  const dataAfter = fs.readFileSync(filePath2, 'utf8');
  const ast = generateAst(parse(dataBefore, parserType), parse(dataAfter, parserType));
  return format(ast, formatterType);
};
