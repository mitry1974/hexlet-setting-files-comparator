import formatSimple from './simple';
import formatPlain from './plain';
import formatJson from './json';

const formatters = {
  simple: formatSimple,
  plain: formatPlain,
  json: formatJson,
};

export default (data, prefix) => formatters[prefix](data);
