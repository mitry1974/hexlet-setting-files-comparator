const formatters = {};

const addFormatter = (prefix, format) => {
  formatters[prefix] = format;
};

const format = (data, prefix) => formatters[prefix](data);

export { addFormatter };
export default format;
