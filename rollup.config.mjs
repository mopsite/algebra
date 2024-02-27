import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  input: './index.js',
  output: [
    {
      file: './dist/algebra.js',
      format: 'umd',
      name: 'algebra'
    },
    {
      file: './dist/algebra.min.js',
      format: 'umd',
      name: 'algebra',
      plugins: [terser()]
    },
    {
      file: './dist/algebra.mjs',
      format: 'es'
    },
    {
      file: './dist/algebra.min.mjs',
      format: 'es',
      plugins: [terser()]
    }
  ],
  plugins: [babel({ babelHelpers: 'bundled' })]
})
