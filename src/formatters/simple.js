import _ from 'lodash';

const indentationStep = '  ';

const operations = {
  added: '+ ',
  deleted: '- ',
};

const getOperation = type => operations[type] || '  ';
const getIndent = depth => indentationStep.repeat(2 * (depth) - 1);

const valueActions = {
  boolean: (nodeKey, obj) => `${nodeKey}: ${obj.toString()}`,
  string: (nodeKey, obj) => `${nodeKey}: ${obj}`,
  object: (nodeKey, obj, depth) => {
    const objectAsLine = Object.keys(obj).reduce((acc, key) => `  ${acc}${key}: ${obj[key]}`, '');
    return [`${nodeKey}: {`, `${getIndent(depth + 1)}${objectAsLine}`, `${getIndent(depth)}  }`].join('\n');
  },
};

const stringify = (nodeKey, value = '', depth) => valueActions[typeof value](nodeKey, value, depth);
const formatFirstPart = (nodeType, depth) => `${getIndent(depth)}${getOperation(nodeType)}`;
const formatSimpleNode = (node, depth) => `${formatFirstPart(node.type, depth)}${stringify(node.key, node.value, depth)}`;

const formatInternal = (data, depth = 1) => data.map((node) => {
  const nodeFormatters = {
    group: () => [`${formatFirstPart(node.type, depth)}${node.key}: {`, formatInternal(node.children, depth + 1), `${getIndent(depth)}  }`],
    changed: () => [
      `${formatFirstPart('deleted', depth)}${stringify(node.key, node.oldValue, depth)}`,
      `${formatFirstPart('added', depth)}${stringify(node.key, node.newValue, depth)}`,
    ],
  };

  const nodeFormatter = nodeFormatters[node.type] || formatSimpleNode;
  return nodeFormatter(node, depth);
});

export default ast => _.flattenDeep(['{', formatInternal(ast), '}']).join('\n');
