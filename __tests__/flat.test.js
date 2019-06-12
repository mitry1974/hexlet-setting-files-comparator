import path from 'path';
import fs from 'fs';
import genDiff from '../src/engine';

const fileResult = path.resolve(__dirname, './__fixtures__/flat/result.txt');
const resultText = fs.readFileSync(fileResult, 'utf8');

const testFixtures = [
  [path.resolve(__dirname, './__fixtures__/flat/before.json'), path.resolve(__dirname, './__fixtures__/flat/after.json'), resultText],
  [path.resolve(__dirname, './__fixtures__/flat/before.yml'), path.resolve(__dirname, './__fixtures__/flat/after.yml'), resultText],
  [path.resolve(__dirname, './__fixtures__/flat/before.ini'), path.resolve(__dirname, './__fixtures__/flat/after.ini'), resultText],
];


test.each(testFixtures)('comparing %s, %s', (a, b, expected) => expect(genDiff(a, b)).toEqual(expected));
