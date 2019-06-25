import _ from 'lodash';

const parsers = {};

const addParser = (prefix, parser) => {
  parsers[prefix] = parser;
};

const getParser = prefix => parsers[prefix];

const diffOperations = [
  {
    check: (arg1, arg2) => _.isObject(arg1) && _.isObject(arg2),
    getOperation: (key, object1, object2) => [({ nodeType: 'group', key, children: getDiffLines(object1, object2) })],
  },
  {
    check: (arg1, arg2) => arg1 === arg2 && typeof arg1 === typeof arg2,
    getOperation: (key, arg1) => [({ diffOp: 'unchanged', key, value: arg1 })],
  },
  {
    check: arg1 => !arg1,
    getOperation: (key, object1, object2) => [({ diffOp: 'added', key, value: object2 })],
  },
  {
    check: (arg1, arg2) => !arg2,
    getOperation: (key, object1) => [({ diffOp: 'deleted', key, value: object1 })],
  },
  {
    check: (arg1, arg2) => typeof arg1 !== typeof arg2,
    getOperation: (key, object1, object2) => ([
      {
        diffOp: 'deleted', key, value: object1,
      },
      {
        diffOp: 'added', key, value: object2,
      }]
    ),
  },
  {
    check: (arg1, arg2) => arg1 !== arg2,
    getOperation: (key, object1, object2) => [{
      diffOp: 'changed', key, oldValue: object1, newValue: object2,
    }],
  },
];

const getDiffOperation = (arg1, arg2) => diffOperations.find(({ check }) => check(arg1, arg2));

const unionKeys = (object1, object2) => _.union(_.keys(object1), _.keys(object2));

const getDiffLines = (object1, object2) => {
  const keys = unionKeys(object1, object2);
  return keys.reduce((acc, key) => {
    const { getOperation } = getDiffOperation(object1[key], object2[key]);
    return [...acc, ...getOperation(key, object1[key], object2[key])];
  }, []);
};

const parseObjects = parse => (dataBefore, dataAfter) => {
  const objectBefore = parse(dataBefore, 'utf-8');
  const objectAfter = parse(dataAfter, 'utf-8');

  return getDiffLines(objectBefore, objectAfter);
};

export { addParser, getParser, parseObjects };
