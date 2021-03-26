const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const opimizeCss = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [];
process.env.ANALYZE && plugins.push(new BundleAnalyzerPlugin());

module.exports = merge(baseConfig, {
  mode: 'production',
  watch: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          filename: 'common.js',
          chunks: 'initial',
          priority: -20,
        },
        vendors: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendor.js',
          priority: -10,
        },
        vendorsAsync: {
          chunks: 'async',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendorsAsync',
          priority: 0,
        },
        antv: {
          chunks: 'async',
          test: /[\\/]node_modules[\\/]@antv[\\/]/,
          name: 'antv',
          priority: 10,
        },
        antd: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          filename: 'antd.js',
          priority: 20,
        },
        moment: {
          chunks: 'async',
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          name: 'moment',
          priority: 30,
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
