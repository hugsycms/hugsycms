const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  entry: {
    react: ['react', 'react-dom'],
  },
  mode: 'production',
  output: {
    filename: '[name].dll.all.js',
    path: path.join(appDirectory, 'dist', 'dll'),
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(appDirectory, 'dist', 'dll', 'manifest.json'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(appDirectory, 'public/lib'),
          to: path.join(appDirectory, 'dist/lib'),
        },
      ],
    }),
  ],
};
