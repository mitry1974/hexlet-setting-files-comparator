import formatSimple from './simple';
import formatPlain from './plain';

const formatters = {
  simple: formatSimple,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (data, prefix) => formatters[prefix](data);
