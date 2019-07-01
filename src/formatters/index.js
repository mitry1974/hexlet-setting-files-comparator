const formatters = {};

const addFormatter = (prefix, format) => {
  formatters[prefix] = format;
};

const getFormatter = prefix => formatters[prefix];

const format = (data, prefix) => {
  return getFormatter(prefix)(data);
};

export { addFormatter, getFormatter };
export default format;
