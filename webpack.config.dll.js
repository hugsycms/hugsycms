const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    react: ['react', 'react-dom'],
  },
  mode: 'production',
  output: {
    filename: '[name].dll.f94ae6.js',
    path: path.resolve(__dirname, 'dist', 'dll'),
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public/pdfjs'),
          to:  path.join(__dirname, 'dist/pdfjs')
        },
        {
          from: path.join(__dirname, 'public/lib'),
          to:  path.join(__dirname, 'dist/lib')
        },
      ]
    })
  ],
};
