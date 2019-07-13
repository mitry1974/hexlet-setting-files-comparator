import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const fixturesPath = './__fixtures__/';

const pathResolve = fileName => path.resolve(__dirname, `${fixturesPath}${fileName}`);

const getFixtures = () => [
  [pathResolve('before.json'), pathResolve('after.json'), 'simple', fs.readFileSync(pathResolve('simpleFormatterResult.txt'), 'utf8')],
  [pathResolve('before.yml'), pathResolve('after.yml'), 'simple', fs.readFileSync(pathResolve('simpleFormatterResult.txt'), 'utf8')],
  [pathResolve('before.ini'), pathResolve('after.ini'), 'simple', fs.readFileSync(pathResolve('simpleFormatterResult.txt'), 'utf8')],
  [pathResolve('before.json'), pathResolve('after.json'), 'plain', fs.readFileSync(pathResolve('plainFormatterResult.txt'), 'utf8')],
  [pathResolve('before.yml'), pathResolve('after.yml'), 'plain', fs.readFileSync(pathResolve('plainFormatterResult.txt'), 'utf8')],
  [pathResolve('before.ini'), pathResolve('after.ini'), 'plain', fs.readFileSync(pathResolve('plainFormatterResult.txt'), 'utf8')],
  [pathResolve('before.json'), pathResolve('after.json'), 'json', fs.readFileSync(pathResolve('jsonFormatterResult.txt'), 'utf8')],
  [pathResolve('before.yml'), pathResolve('after.yml'), 'json', fs.readFileSync(pathResolve('jsonFormatterResult.txt'), 'utf8')],
  [pathResolve('before.ini'), pathResolve('after.ini'), 'json', fs.readFileSync(pathResolve('jsonFormatterResult.txt'), 'utf8')],
];

test.each(getFixtures())('comparing %s, %s', (a, b, c, expected) => expect(genDiff(a, b, c)).toEqual(expected));
