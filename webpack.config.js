const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

// Find all JS files in the plugins directory.
// Map them to an object entry in order to keep the file structure.
// This way files can be imported directly using their path.
const entry = glob.sync('./plugins/**/*.js')
    .reduce((acc, file) => {
      const entryName = file.replace('./plugins', '').replace('.js', '');
      acc[entryName] = file;
      return acc;
    }, {});

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    libraryTarget: 'module',
    globalObject: 'window'
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './plugins/plugins-manifest.json',
          to: 'plugins-manifest.json'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};