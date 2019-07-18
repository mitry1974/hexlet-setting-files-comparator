import _ from 'lodash';

const valueFormats = {
  boolean: _.identity,
  string: value => `'${value}'`,
  object: () => '[complex value]',
};
const stringify = value => valueFormats[typeof value](value);

const format = (data, path = '') => {
  const operationTemplates = {
    group: node => format(node.children, `${path}${node.key}.`),
    added: node => `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`,
    deleted: node => `Property '${path}${node.key}' was removed`,
    changed: node => `Property '${path}${node.key}' was updated. From '${node.oldValue}' to '${node.newValue}'`,
  };

  return data.filter(node => node.type !== 'unchanged')
    .map(node => operationTemplates[node.type](node)).join('\n');
};

export default format;
