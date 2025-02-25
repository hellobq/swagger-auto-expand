import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/content.ts',
  output: {
    file: 'dist/content.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              chrome: '49'
            }
          }
        ]
      ]
    }),
    terser({
      output: {
        beautify: true
      }
    })
  ]
}; 