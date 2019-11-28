import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy';

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
};

export default {
  input: 'lib/index.js',
  output: {
    file: 'lib/bundle.umd.js',
    format: 'umd',
    exports: 'named',
    name: 'react-delaunay-hero',
    globals,
    sourcemap: true,
  },
  external: Object.keys(globals),
  onwarn,
  plugins: [
    resolve({ extensions: ['.mjs', '.js', '.jsx', '.json'] }),
    sourcemaps(),
    copy({
      targets: [
        { src: 'README.md', dest: 'lib' },
        { src: 'LICENSE', dest: 'lib' },
      ],
    }),
  ],
};

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}
