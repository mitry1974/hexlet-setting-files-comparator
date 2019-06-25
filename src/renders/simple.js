import { addRender, render, stringify } from './render';

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

const buildNodeFirstPart = (diffOp, key, depth) => {
  const { sign } = getNodeSign(diffOp);
  return `${getIndent(depth)}${sign} ${key}: `;
};

const buildSimpleNodeInternal = (diffOp, key, value, depth) => (
  value.lenght === 0
    ? ''
    : `${buildNodeFirstPart(diffOp, key, depth)}${stringify(value)}`
);

const buildChangedNode = (node, depth) => {
  const {
    key,
    oldValue = '',
    newValue = '',
  } = node;

  return `${buildSimpleNodeInternal('added', key, newValue, depth)}\n${buildSimpleNodeInternal('deleted', key, oldValue, depth)}`;
};

const buildSimpleNode = (node, depth) => {
  const {
    key,
    value = '',
    diffOp,
  } = node;
  return `${buildSimpleNodeInternal(diffOp, key, value, depth)}`;
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
      return `\n${buildNodeFirstPart(diffOp, key, depth)}{${line}\n  ${getIndent(depth)}}`;
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
      return `\n${buildNodeFirstPart(diffOp, key, depth)}{\n${getIndent(depth + 1)}${stringify(value)}\n  ${getIndent(depth)}}${line}`;
    },
  },
  {
    check: (node) => {
      const { diffOp = '' } = node;
      return diffOp === 'changed';
    },
    nodeRender: (node, depth, line) => `\n${buildChangedNode(node, depth)}${line}`,
  },
  {
    check: () => true,
    nodeRender: (node, depth, line) => `\n${buildSimpleNode(node, depth)}${line}`,
  },
];

const getNodeRender = node => nodeRenders.find(({ check }) => check(node));

const getRenderData = () => ({
  startElement: '{',
  endElement: '}',
  render(depth, node, line) {
    const { nodeRender } = getNodeRender(node);
    return `${nodeRender(node, depth, line)}`;
  },
});

addRender(prefix, render(getRenderData));
