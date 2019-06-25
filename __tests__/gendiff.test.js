import path from 'path';
import fs from 'fs';
import genDiff from '../src/engine';

const plainFileResult = path.resolve(__dirname, './__fixtures__/plainFormatterResult.txt');
const simpleFileResult = path.resolve(__dirname, './__fixtures__/simpleFormatterResult.txt');
const simpleFormatterResultText = fs.readFileSync(simpleFileResult, 'utf8');
const plainFormatterResultText = fs.readFileSync(plainFileResult, 'utf8');

const testFixtures = [
  [path.resolve(__dirname, './__fixtures__/before.json'), path.resolve(__dirname, './__fixtures__/after.json'), 'simple', simpleFormatterResultText],
  [path.resolve(__dirname, './__fixtures__/before.yml'), path.resolve(__dirname, './__fixtures__/after.yml'), 'simple', simpleFormatterResultText],
  [path.resolve(__dirname, './__fixtures__/before.ini'), path.resolve(__dirname, './__fixtures__/after.ini'), 'simple', simpleFormatterResultText],
  [path.resolve(__dirname, './__fixtures__/before.json'), path.resolve(__dirname, './__fixtures__/after.json'), 'plain', plainFormatterResultText],
  [path.resolve(__dirname, './__fixtures__/before.yml'), path.resolve(__dirname, './__fixtures__/after.yml'), 'plain', plainFormatterResultText],
  [path.resolve(__dirname, './__fixtures__/before.ini'), path.resolve(__dirname, './__fixtures__/after.ini'), 'plain', plainFormatterResultText],
];


test.each(testFixtures)('comparing %s, %s', (a, b, c, expected) => expect(genDiff(a, b, c)).toEqual(expected));
