const path = require('path');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('../config');
const { optimizeCSSAssetsPlugin, externals } = require('./webpack.common');

module.exports = Object.assign({}, baseConfig, {
    mode: 'production',
    entry: {
        'mb-sui.umd': path.resolve(__dirname, '../index.ts')
    },
    output: {
        path: path.join(config.build.outputRootPath, 'umd'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    externals: externals,
    plugins: [
        new CleanWebpackPlugin(),
        ...baseConfig.plugins,
        optimizeCSSAssetsPlugin
    ],
    optimization: {
        minimize: true
    }
});