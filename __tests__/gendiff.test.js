import path from 'path';
import fs from 'fs';
import genDiff from '../src/engine';

const fileResult = path.resolve(__dirname, './__fixtures__/Result.txt');
const resultText = fs.readFileSync(fileResult, 'utf8');

const testFixtures = [
  [path.resolve(__dirname, './__fixtures__/Before.json'), path.resolve(__dirname, './__fixtures__/After.json'), resultText],
  [path.resolve(__dirname, './__fixtures__/Before.yml'), path.resolve(__dirname, './__fixtures__/After.yml'), resultText],
  [path.resolve(__dirname, './__fixtures__/Before.ini'), path.resolve(__dirname, './__fixtures__/After.ini'), resultText],
];


test.each(testFixtures)('comparing %s, %s', (a, b, expected) => expect(genDiff(a, b)).toEqual(expected));

// test('compare result of genDiff function', () =>
// expect(genDiff(fileName1, fileName2)).toEqual(resultText));
