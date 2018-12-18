// @flow
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const DEV_SIZE = 284;
const PROD_SIZE = 66;

type GetCodeArgs = {|
  mode: string,
|};
const getCode = async ({ mode }: GetCodeArgs): Promise<string> => {
  const bundle = await rollup({
    input: 'src/index.js',
    output: {
      format: 'esm',
    },
    plugins: [
      replace({ 'process.env.NODE_ENV': JSON.stringify(mode) }),
      babel(),
    ],
  });
  const { code } = await bundle.generate({ format: 'esm' });
  return code;
};

it(`development mode size should be ${DEV_SIZE}`, async () => {
  const code: string = await getCode({ mode: 'development' });
  expect(code.length).toBe(DEV_SIZE);
});

it(`production mode size should be ${PROD_SIZE}`, async () => {
  const code: string = await getCode({ mode: 'production' });
  expect(code.length).toBe(PROD_SIZE);
});

it('should not strip console.warn from dev builds', async () => {
  const code: string = await getCode({ mode: 'development' });
  expect(code.includes('console.warn')).toBe(true);
});

it('should strip console.warn from production builds', async () => {
  const code: string = await getCode({ mode: 'production' });
  expect(code.includes('console.warn')).toBe(false);
});
