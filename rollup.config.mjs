import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  input: './index.js',
  output: [
    {
      file: './dist/algebra.umd.js',
      format: 'umd',
      name: 'algebra'
    },
    {
      file: './dist/algebra.umd.min.js',
      format: 'umd',
      name: 'algebra',
      plugins: [terser()]
    },
    {
      file: './dist/algebra.esm.js',
      format: 'es'
    },
    {
      file: './dist/algebra.esm.min.js',
      format: 'es',
      plugins: [terser()]
    }
  ],
  plugins: [babel({ babelHelpers: 'bundled' })]
})
