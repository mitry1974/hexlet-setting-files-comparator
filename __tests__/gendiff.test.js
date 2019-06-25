import path from 'path';
import fs from 'fs';
import genDiff from '../src/engine';

const fileResult = path.resolve(__dirname, './__fixtures__/result.txt');
const resultText = fs.readFileSync(fileResult, 'utf8');

const testFixtures = [
  [path.resolve(__dirname, './__fixtures__/before.json'), path.resolve(__dirname, './__fixtures__/after.json'), resultText],
  [path.resolve(__dirname, './__fixtures__/before.yml'), path.resolve(__dirname, './__fixtures__/after.yml'), resultText],
  [path.resolve(__dirname, './__fixtures__/before.ini'), path.resolve(__dirname, './__fixtures__/after.ini'), resultText],
];


test.each(testFixtures)('comparing %s, %s', (a, b, expected) => expect(genDiff(a, b, 'simple')).toEqual(expected));
