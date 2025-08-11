import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import glob from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all JS files in the plugins directory.
// Map them to an object entry in order to keep the file structure.
// This way files can be imported directly using their path.
const entry = glob.sync('./plugins/**/*.js')
  .reduce((acc, file) => {
    const entryName = file.replace('./plugins', '').replace('.js', '');
    acc[entryName] = file;
    return acc;
  }, {});

export default {
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
