module.exports = {
  styleguideDir: 'docs',
  showUsage: true,
  exampleMode: 'collapse',
  components: 'src/*.tsx',

  propsParser: require('react-docgen-typescript').parse,

  styles: {
    StyleGuide: {
      '@global h1': {
        fontSize: '40px',
        fontFamily: 'Helvetica',
        fontWeight: '400',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        color: '#2b2b2b',
      },
      '@global h2': {
        fontSize: '30px',
        fontFamily: 'Helvetica',
        fontWeight: '300',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        color: '#6d6c6c',
      },
    },
  },

  webpackConfig: {
    // Enable sourcemaps for debugging webpack"s output.
    devtool: 'source-map',

    resolve: {
      // Add ".ts" and ".tsx" as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'awesome-typescript-loader',
            },
          ],
        },
      ],
    },
  },
};
