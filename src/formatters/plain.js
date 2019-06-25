import { addFormatterData } from '../render/render';

const prefix = 'plain';

const nodeSigns = [
  {
    check: arg => arg === 'added',
    sign: 'added with value:',
  },
  {
    check: arg => arg === 'deleted',
    sign: 'removed',
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

const nodeFormatters = [
  {
    check: (node) => {
      const { nodeType = '' } = node;
      return nodeType === 'group';
    },
    nodeRender: (node, depth, line) => {
      const {
        key,
      } = node;
      return `${key}: group`;
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
      } = node;
      return `${key}: ${value}${line} - object`;
    },
  },
  {
    check: (node) => {
      const { diffOp = '' } = node;
      return diffOp === 'changed';
    },
    nodeRender: (node, depth, line) => {
      const {
        key,
        value = '',
      } = node;
      return `${key}: ${value}${line} - changed`;
    },
  },
  {
    check: () => true,
    nodeRender: (node, depth, line) => {
      const {
        key,
        value = '',
      } = node;
      return `${key}: ${value}${line} - changed`;
    },
  },

];

const getNodeFormatter = node => ({ check }) => nodeFormatters.find(check(node));

const formatterData = {
  startElement: '{',
  endElement: '}',
  format(depth, node, line) {
    const { nodeFormatter } = getNodeFormatter(node);
    return `${nodeFormatter(node, depth, line)}`;
  },
};

addFormatterData(prefix, formatterData);
