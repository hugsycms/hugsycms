const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const WebpackBar = require('webpackbar');
const lessToJS = require('less-vars-to-js');

const devMode = process.env.ENVIRONMENT_MODE === 'dev' ? true : false;
const threadLoader = require('thread-loader');

const jsWorkerPool = {
  poolTimeout: 2000,
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);

const themeVariablesArray = require('./src/assets/less/themeVariables');

const themeOptions = {
  outputFilePath: path.join(__dirname, './public/static.less'),
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './src/assets/less/variables.less'),
  themeVariables: themeVariablesArray,
  indexFileName: 'index.html',
  lessUrl: '/lib/less.js',
  generateOnce: false,
};

const themePlugin = new AntDesignThemePlugin(themeOptions);
const otherPlugins = [];
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/assets/less/replaced-variable.less'), 'utf8'),
);

process.env.WITH_THEME && otherPlugins.push(themePlugin);

module.exports = {
  entry: ['@babel/polyfill', 'core-js/stable', './src/entry.tsx'],
  output: {
    filename: 'js/vendor.[hash].js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },
  stats: {
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    reasons: false,
    assets: false,
    hash: false,
    chunkOrigins: false,
    performance: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]_[hash:6].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: devMode } },
          { loader: 'postcss-loader', options: { sourceMap: devMode } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: devMode } },
          { loader: 'postcss-loader', options: { sourceMap: devMode } },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.Quill': 'quill',
    }),
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/favicon.svg',
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json'),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!dll',
        '!dll/**',
        '!lib',
        '!lib/**',
        '!CHANGELOG.md',
      ],
    }),
    ...otherPlugins,
  ],
};
