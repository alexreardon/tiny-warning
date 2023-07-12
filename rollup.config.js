import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const input = 'src/tiny-warning.ts';

export default [
  // Universal module definition (UMD) build
  {
    input,
    output: {
      file: 'dist/tiny-warning.js',
      format: 'umd',
      name: 'warning',
    },
    plugins: [typescript({ module: 'ESNext' })],
  },
  // Universal module definition (UMD) build (production)
  {
    input,
    output: {
      file: 'dist/tiny-warning.min.js',
      format: 'umd',
      name: 'warning',
    },
    plugins: [
      // Setting production env before running other steps
      replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
      typescript({ module: 'ESNext' }),
      terser(),
    ],
  },
  // ESM build
  {
    input,
    output: {
      file: 'dist/tiny-warning.esm.js',
      format: 'esm',
    },
    plugins: [typescript({ module: 'ESNext' })],
  },
  // ESM build for "module": "node16" TypeScript projects (https://github.com/alexreardon/tiny-warning/issues/144)
  {
    input,
    output: {
      file: 'dist/esm/tiny-warning.js',
      format: 'esm',
    },
    plugins: [
      typescript({ module: 'ESNext' }),
      // https://github.com/rollup/rollup/blob/69ff4181e701a0fe0026d0ba147f31bc86beffa8/build-plugins/emit-module-package-file.ts
      {
        generateBundle() {
          this.emitFile({
            fileName: 'package.json',
            source: `{ "type": "module" }\n`,
            type: 'asset',
          });
        },
        name: 'emit-module-package-file',
      },
    ],
  },
  // CommonJS build
  {
    input,
    output: {
      file: 'dist/tiny-warning.cjs.js',
      format: 'cjs',
      exports: 'default',
    },
    plugins: [typescript({ module: 'ESNext' })],
  },
];
