import _ from 'lodash';
import { addFormatter } from '.';

const prefix = 'plain';
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

const operationTemplates = [
  {
    check: arg => arg === 'group',
    template: (node, path) => iter(node.children, `${path}${node.key}.`),
  },
  {
    check: arg => arg === 'added',
    template: (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`,
  },
  {
    check: arg => arg === 'deleted',
    template: (node, path) => `Property '${path}${node.key}' was removed`,
  },
  {
    check: arg => arg === 'changed',
    template: (node, path) => `Property '${path}${node.key}' was updated. From '${node.oldValue}' to '${node.newValue}'`,
  },
];

const getOperationTemplate = operation => operationTemplates.find(({ check }) => check(operation));

const iter = (data, path) => data.filter(node => node.diffOp !== 'unchanged')
  .map(node => getOperationTemplate(node.diffOp).template(node, path));

const format = parcedData => `${_.flattenDeep(iter(parcedData, '')).join('\n')}`;


addFormatter(prefix, format);
