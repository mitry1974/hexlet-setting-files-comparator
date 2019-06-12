const createDiffString = (sign, key, value) => `  ${sign} ${key}: ${value}`;

const parseJsonObjects = (objectBefore, objectAfter) => {
  const beforeKeys = Object.keys(objectBefore);
  const afterKeys = Object.keys(objectAfter);
  const diffArray = beforeKeys.reduce((acc, key) => {
    const valueBefore = objectBefore[key];
    if (key in objectAfter) {
      const valueAfter = objectAfter[key];
      if (valueBefore === valueAfter) {
        return [...acc, createDiffString(' ', key, valueBefore)];
      }
      return [...acc, createDiffString('+', key, valueAfter), createDiffString('-', key, valueBefore)];
    }
    return [...acc, createDiffString('-', key, valueBefore)];
  }, []);

  return afterKeys.reduce((acc, key) => {
    if (!(key in objectBefore)) {
      const valueAfter = objectAfter[key];
      return [...acc, createDiffString('+', key, valueAfter)];
    }
    return acc;
  }, diffArray);
};

const parseObjects = parse => (dataBefore, dataAfter) => {
  const objectBefore = parse(dataBefore, 'utf-8');
  const objectAfter = parse(dataAfter, 'utf-8');

  return parseJsonObjects(objectBefore, objectAfter);
};

export default parseObjects;
