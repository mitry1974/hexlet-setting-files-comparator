import _ from 'lodash';
import { addFormatter } from '.';

const prefix = 'simple';

const indentationStep = '  ';

const nodeSigns = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
  group: '  ',
};

const getNodeSign = type => nodeSigns[type] || ' ';

const getIndent = depth => indentationStep.repeat(2 * (depth) - 1);

const valueActions = [
  {
    check: arg => typeof arg === 'boolean',
    process: (nodeKey, obj) => `${nodeKey}: ${obj.toString()}`,
  },
  {
    check: arg => typeof arg === 'string',
    process: (nodeKey, obj) => `${nodeKey}: ${obj}`,
  },
  {
    check: arg => arg instanceof Object,
    process: (nodeKey, obj, depth) => {
      const reduced = Object.keys(obj).reduce((acc, key) => `  ${acc}${key}: ${obj[key]}`, '');
      return `${nodeKey}: {\n${getIndent(depth + 1)}${reduced}\n${getIndent(depth)}  }`;
    },
  },
];

const getValueAction = arg => valueActions.find(({ check }) => check(arg));

const stringify = (nodeKey, value = '', depth) => getValueAction(value).process(nodeKey, value, depth);

const formatFirstPart = (diffOp, depth) => `${getIndent(depth)}${getNodeSign(diffOp)}`;
const nodeFormatters = [
  {
    check: arg => arg === 'group',
    formatNode: (node, depth) => `${formatFirstPart(node.diffOp, depth)}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${getIndent(depth)}  }`,
  },
  {
    check: arg => arg === 'changed',
    formatNode: (node, depth) => [
      `${formatFirstPart('added', depth)}${stringify(node.key, node.newValue, depth)}`,
      `${formatFirstPart('deleted', depth)}${stringify(node.key, node.oldValue, depth)}`,
    ].join('\n'),
  },
  {
    check: () => true,
    formatNode: (node, depth) => `${formatFirstPart(node.diffOp, depth)}${stringify(node.key, node.value, depth)}`,
  },
];

const getNodeFormatter = operation => nodeFormatters.find(({ check }) => check(operation));

const iter = (data, depth) => data.map(node => getNodeFormatter(node.diffOp)
  .formatNode(node, depth));

const format = parcedData => `{\n${_.flattenDeep(iter(parcedData, 1)).join('\n')}\n}`;

addFormatter(prefix, format);
