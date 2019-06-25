import { identity } from 'lodash';

const formatters = {};

const addFormatterData = (prefix, formatterData) => {
  formatters[prefix] = formatterData;
};

const getFormatterData = prefix => formatters[prefix];

const render = (formatterData, parcedData) => {
  const iter = (depth, data) => {
    const mapped = data.map((node) => {
      const { children = [] } = node;
      const renderedChildren = children.length > 0 ? iter(depth + 1, children) : '';
      return `${formatterData.format(depth, node, renderedChildren)}`;
    });

    return `${mapped.join('')}`;
  };

  return `${formatterData.startElement}${iter(1, parcedData)}\n${formatterData.endElement}`;
};

const propertyActions = [
  {
    check: arg => typeof arg === 'boolean',
    process: obj => obj.toString(),
  },
  {
    check: arg => typeof arg === 'string',
    process: identity,
  },
  {
    check: arg => arg instanceof Object,
    process: obj => Object.keys(obj).reduce((acc, key) => `  ${acc}${key}: ${obj[key]}`, ''),
  },
];

const getPropertyActions = arg => propertyActions.find(({ check }) => check(arg));

const stringify = (obj) => {
  const { process } = getPropertyActions(obj);
  return process(obj);
};

export {
  addFormatterData, getFormatterData, render, stringify,
};
