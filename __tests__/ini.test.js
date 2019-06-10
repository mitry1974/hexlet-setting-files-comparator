import path from 'path';
import fs from 'fs';
import genDiff from '../src/engine';


const fileName1 = path.resolve(__dirname, './__fixtures__/Before.ini');
const fileName2 = path.resolve(__dirname, './__fixtures__/After.ini');
const fileResult = path.resolve(__dirname, './__fixtures__/Result.txt');
const resultText = fs.readFileSync(fileResult, 'utf8');

test('compare result of genDiff function', () => expect(genDiff(fileName1, fileName2)).toEqual(resultText));
