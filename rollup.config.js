import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  input: './algebra.js',
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
      file: './dist/algebra.esm.js',
      format: 'es'
    }
  ],
  plugins: [babel({ babelHelpers: 'bundled' })]
})
