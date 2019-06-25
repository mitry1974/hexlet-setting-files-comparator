import { addFormatterData, stringify } from '../render/render';

const prefix = 'simple';
const indentationStep = '  ';

const nodeSigns = [
  {
    check: arg => arg === 'added',
    sign: '+',
  },
  {
    check: arg => arg === 'deleted',
    sign: '-',
  },
  {
    check: arg => arg === 'unchanged',
    sign: ' ',
  },
  {
    check: () => true,
    sign: ' ',
  },
];

const getNodeSign = arg => nodeSigns.find(({ check }) => check(arg));

const getIndent = depth => indentationStep.repeat(2 * (depth) - 1);

const formatNodeFirstPart = (diffOp, key, depth) => {
  const { sign } = getNodeSign(diffOp);
  return `${getIndent(depth)}${sign} ${key}: `;
};

const formatSimpleNodeInternal = (diffOp, key, value, depth) => (
  value.lenght === 0
    ? ''
    : `${formatNodeFirstPart(diffOp, key, depth)}${stringify(value)}`
);

const formatChangedNode = (node, depth) => {
  const {
    key,
    oldValue = '',
    newValue = '',
  } = node;

  return `${formatSimpleNodeInternal('added', key, newValue, depth)}\n${formatSimpleNodeInternal('deleted', key, oldValue, depth)}`;
};

const formatSimpleNode = (node, depth) => {
  const {
    key,
    value = '',
    diffOp,
  } = node;
  return `${formatSimpleNodeInternal(diffOp, key, value, depth)}`;
};

const nodeRenders = [
  {
    check: (node) => {
      const { nodeType = '' } = node;
      return nodeType === 'group';
    },
    nodeRender: (node, depth, line) => {
      const {
        key,
        diffOp,
      } = node;
      return `\n${formatNodeFirstPart(diffOp, key, depth)}{${line}\n  ${getIndent(depth)}}`;
    },
  },
  {
    check: (node) => {
      const { value = '' } = node;
      return typeof value === 'object';
    },
    nodeRender: (node, depth, line) => {
      const {
        key,
        value = '',
        diffOp,
      } = node;
      return `\n${formatNodeFirstPart(diffOp, key, depth)}{\n${getIndent(depth + 1)}${stringify(value)}\n  ${getIndent(depth)}}${line}`;
    },
  },
  {
    check: (node) => {
      const { diffOp = '' } = node;
      return diffOp === 'changed';
    },
    nodeRender: (node, depth, line) => `\n${formatChangedNode(node, depth)}${line}`,
  },
  {
    check: () => true,
    nodeRender: (node, depth, line) => `\n${formatSimpleNode(node, depth)}${line}`,
  },
];

const getNodeRender = node => nodeRenders.find(({ check }) => check(node));

const formatterData = {
  startElement: '{',
  endElement: '}',
  format(depth, node, line) {
    const { nodeRender } = getNodeRender(node);
    return `${nodeRender(node, depth, line)}`;
  },
};

addFormatterData(prefix, formatterData);
