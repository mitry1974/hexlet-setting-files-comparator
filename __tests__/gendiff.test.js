import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const pathResolve = fileName => path.resolve(__dirname, fileName);

const getFixtures = () => {
  const formatStyles = [
    ['simple', './__fixtures__/simpleFormatterResult.txt'],
    ['plain', './__fixtures__/plainFormatterResult.txt'],
    ['json', './__fixtures__/jsonFormatterResult.txt'],
  ];

  const fixturesFileNames = [
    ['./__fixtures__/before.json', './__fixtures__/after.json'],
    ['./__fixtures__/before.yml', './__fixtures__/after.yml'],
    ['./__fixtures__/before.ini', './__fixtures__/after.ini'],
  ];

  return fixturesFileNames.reduce((acc, fName) => [...acc, ...formatStyles.map(style => [
    pathResolve(fName[0]),
    pathResolve(fName[1]),
    style[0],
    fs.readFileSync(pathResolve(style[1]), 'utf8'),
  ])], []);
};

test.each(getFixtures())('comparing %s, %s', (a, b, c, expected) => expect(genDiff(a, b, c)).toEqual(expected));
