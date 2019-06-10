const parsers = {
};

const addParser = (prefix, parser) => {
  parsers[prefix] = parser;
};

const getParser = prefix => parsers[prefix];

export { addParser, getParser };
