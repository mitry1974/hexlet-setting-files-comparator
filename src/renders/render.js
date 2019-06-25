import { identity } from 'lodash';

const renders = {};

const addRender = (prefix, render) => {
  renders[prefix] = render;
};

const getRender = prefix => renders[prefix];

const render = getRenderData => (parcedData) => {
  const renderData = getRenderData();
  const iter = (depth, data) => {
    const mapped = data.map((node) => {
      const { children = [] } = node;
      const renderedChildren = children.length > 0 ? iter(depth + 1, children) : '';
      return `${renderData.render(depth, node, renderedChildren)}`;
    });

    return `${mapped.join('')}`;
  };

  return `${renderData.startElement}${iter(1, parcedData)}\n${renderData.endElement}`;
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
  addRender, getRender, render, stringify,
};
