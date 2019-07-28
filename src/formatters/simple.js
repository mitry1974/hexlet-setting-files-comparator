import _ from 'lodash';

const indentationStep = '  ';

const operations = {
  added: '+ ',
  deleted: '- ',
};

const getOperation = type => operations[type] || '  ';
const getIndent = depth => indentationStep.repeat(2 * (depth) - 1);

const stringify = (nodeKey, value = '', depth) => {
  if (_.isString(value) || _.isBoolean(value)) {
    return `${nodeKey}: ${value}`;
  }
  const objectAsLine = Object.keys(value).reduce((acc, key) => `  ${acc}${key}: ${value[key]}`, '');
  return [`${nodeKey}: {`, `${getIndent(depth + 1)}${objectAsLine}`, `${getIndent(depth)}  }`].join('\n');
};


const formatFirstPart = (nodeType, depth) => `${getIndent(depth)}${getOperation(nodeType)}`;

const formatInternal = (data, depth = 1) => data.map((node) => {
  const nodeFormatters = {
    group: () => [`${formatFirstPart(node.type, depth)}${node.key}: {`, formatInternal(node.children, depth + 1), `${getIndent(depth)}  }`],
    changed: () => [
      `${formatFirstPart('deleted', depth)}${stringify(node.key, node.oldValue, depth)}`,
      `${formatFirstPart('added', depth)}${stringify(node.key, node.newValue, depth)}`,
    ],
    added: () => `${formatFirstPart(node.type, depth)}${stringify(node.key, node.value, depth)}`,
    deleted: () => `${formatFirstPart(node.type, depth)}${stringify(node.key, node.value, depth)}`,
    unchanged: () => `${formatFirstPart(node.type, depth)}${stringify(node.key, node.value, depth)}`,
  };

  const nodeFormatter = nodeFormatters[node.type];
  return nodeFormatter(node, depth);
});

export default ast => _.flattenDeep(['{', formatInternal(ast), '}']).join('\n');
