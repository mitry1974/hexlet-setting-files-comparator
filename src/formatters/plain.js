import _ from 'lodash';

const valueFormats = [
  {
    check: value => _.isBoolean(value) === true,
    formatValue: _.identity,
  },
  {
    check: value => _.isString(value) === true,
    formatValue: value => `'${value}'`,
  },
  {
    check: value => _.isObject(value) === true,
    formatValue: () => '[complex value]',
  },
];

const stringify = value => valueFormats.find(({ check }) => check(value)).formatValue(value);

const operationTemplates = {
  // eslint-disable-next-line no-use-before-define
  group: (node, path) => iter(node.children, `${path}${node.key}.`),
  added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`,
  deleted: (node, path) => `Property '${path}${node.key}' was removed`,
  changed: (node, path) => `Property '${path}${node.key}' was updated. From '${node.oldValue}' to '${node.newValue}'`,
};

const iter = (data, path) => data.filter(node => node.diffOp !== 'unchanged')
  .map(node => operationTemplates[node.diffOp](node, path));

export default parcedData => `${_.flattenDeep(iter(parcedData, '')).join('\n')}`;
