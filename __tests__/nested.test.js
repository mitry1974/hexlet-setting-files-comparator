import path from 'path';
import fs from 'fs';
import genDiff from '../src/engine';

const fileResult = path.resolve(__dirname, './__fixtures__/nested/result.txt');
const resultText = fs.readFileSync(fileResult, 'utf8');

const testFixtures = [
  [path.resolve(__dirname, './__fixtures__/nested/before.json'), path.resolve(__dirname, './__fixtures__/nested/after.json'), resultText],
  [path.resolve(__dirname, './__fixtures__/nested/before.yml'), path.resolve(__dirname, './__fixtures__/nested/after.yml'), resultText],
  [path.resolve(__dirname, './__fixtures__/nested/before.ini'), path.resolve(__dirname, './__fixtures__/nested/after.ini'), resultText],
];


test.each(testFixtures)('comparing %s, %s', (a, b, expected) => expect(genDiff(a, b)).toEqual(expected));
