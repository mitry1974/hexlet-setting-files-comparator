import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const fixturesPath = './__fixtures__/';
const formatStyles = ['simple', 'plain', 'json'];
const fixturesFileExts = ['json', 'yml', 'ini'];

const pathResolve = fileName => path.resolve(__dirname, `${fixturesPath}${fileName}`);

const getFixtures = () => fixturesFileExts.reduce(
  (acc, ext) => [...acc, ...formatStyles.map(style => [
    pathResolve(`before.${ext}`),
    pathResolve(`after.${ext}`),
    style,
    fs.readFileSync(pathResolve(`${style}FormatterResult.txt`), 'utf8'),
  ])], [],
);

test.each(getFixtures())('comparing %s, %s', (a, b, c, expected) => expect(genDiff(a, b, c)).toEqual(expected));
