import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const fixturesPath = './__fixtures__/';

const pathResolve = fileName => path.resolve(__dirname, `${fixturesPath}${fileName}`);


const getFixtures = () => [
  ['before.json', 'after.json', 'simple', 'simpleFormatterResult.txt'],
  ['before.yml', 'after.yml', 'simple', 'simpleFormatterResult.txt'],
  ['before.ini', 'after.ini', 'simple', 'simpleFormatterResult.txt'],
  ['before.json', 'after.json', 'plain', 'plainFormatterResult.txt'],
  ['before.yml', 'after.yml', 'plain', 'plainFormatterResult.txt'],
  ['before.ini', 'after.ini', 'plain', 'plainFormatterResult.txt'],
  ['before.json', 'after.json', 'json', 'jsonFormatterResult.txt'],
  ['before.yml', 'after.yml', 'json', 'jsonFormatterResult.txt'],
  ['before.ini', 'after.ini', 'json', 'jsonFormatterResult.txt'],
];

test.each(getFixtures())('comparing %s, %s, format: %s', (filenameBefore, fileNameAfter, format, filenameExpected) => {
  const expected = fs.readFileSync(pathResolve(filenameExpected), 'utf-8');
  return expect(genDiff(
    pathResolve(filenameBefore),
    pathResolve(fileNameAfter),
    format,
  )).toEqual(expected);
});
