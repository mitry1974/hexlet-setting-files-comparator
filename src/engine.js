import fs from 'fs';

const createDiffString = (sign, key, value) => `  ${sign} ${key}: ${value}`;

export default (filePath1, filePath2) => {
  const objectBefore = JSON.parse(fs.readFileSync(filePath1), 'utf-8');
  const objectAfter = JSON.parse(fs.readFileSync(filePath2), 'utf-8');
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

  const finalArray = afterKeys.reduce((acc, key) => {
    if (!(key in objectBefore)) {
      const valueAfter = objectAfter[key];
      return [...acc, createDiffString('+', key, valueAfter)];
    }
    return acc;
  }, diffArray);

  return `{\n${finalArray.join('\n')}\n}`;
};
