import formatSimple from './simple';
import formatPlain from './plain';

const formatters = {
  simple: formatSimple,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (data, type) => formatters[type](data);
