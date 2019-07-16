import _ from 'lodash';

const indentationStep = '  ';

const nodeSigns = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
  group: '  ',
};

const getNodeSign = type => nodeSigns[type] || ' ';
const getIndent = depth => indentationStep.repeat(2 * (depth) - 1);

const valueActions = {
  boolean: (nodeKey, obj) => `${nodeKey}: ${obj.toString()}`,
  string: (nodeKey, obj) => `${nodeKey}: ${obj}`,
  object: (nodeKey, obj, depth) => {
    const reduced = Object.keys(obj).reduce((acc, key) => `  ${acc}${key}: ${obj[key]}`, '');
    return `${nodeKey}: {\n${getIndent(depth + 1)}${reduced}\n${getIndent(depth)}  }`;
  },
};

const stringify = (nodeKey, value = '', depth) => valueActions[typeof value](nodeKey, value, depth);
const formatFirstPart = (nodeType, depth) => `${getIndent(depth)}${getNodeSign(nodeType)}`;
const formatSimpleNode = (node, depth) => `${formatFirstPart(node.type, depth)}${stringify(node.key, node.value, depth)}`;

const iter = (data, depth) => data.map((node) => {
  const nodeFormatters = {
    group: () => `${formatFirstPart(node.type, depth)}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${getIndent(depth)}  }`,
    changed: () => [
      `${formatFirstPart('deleted', depth)}${stringify(node.key, node.oldValue, depth)}`,
      `${formatFirstPart('added', depth)}${stringify(node.key, node.newValue, depth)}`,
    ].join('\n'),
    unchanged: () => formatSimpleNode(node, depth),
    added: () => formatSimpleNode(node, depth),
    deleted: () => formatSimpleNode(node, depth),
  };
  return nodeFormatters[node.type]();
});

export default data => `{\n${_.flattenDeep(iter(data, 1)).join('\n')}\n}`;
