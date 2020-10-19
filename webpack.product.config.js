const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const opimizeCss = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [];
!process.env.DEPLOY && plugins.push(new BundleAnalyzerPlugin());

module.exports = merge(baseConfig, {
  mode: 'production',
  watch: false,
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      maxInitialRequests: 10,
      cacheGroups: {
        vendor: {
          priority: 1,
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1,
        },
        moment: {
          name: 'moment',
          priority: 5,
          test: /[\/]node_modules[\/]moment[\/]/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1,
        },
        lodash: {
          name: 'lodash',
          priority: 6,
          test: /[\/]node_modules[\/]lodash[\/]/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1,
        },
        antd: {
          name: 'antd',
          priority: 7,
          test: /[\/]node_modules[\/]antd[\/]es[\/]/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1,
        },
        antDesign: {
          name: 'antDesign',
          priority: 8,
          test: /[\/]node_modules[\/]@ant-design[\/]/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1,
        },
        common: {
          chunks: 'initial',
          name: 'common',
          minSize: 200,
          minChunks: 3,
        },
      },
    },
    minimizer: [
      new opimizeCss(),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins,
});
