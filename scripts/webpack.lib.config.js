const path = require('path');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getComponentsEntry } = require('./utils');
const config = require('../config');
const { optimizeCSSAssetsPlugin, externals } = require('./webpack.common');

module.exports = Object.assign({}, baseConfig, {
    mode: 'production',
    entry: getComponentsEntry(),
    output: {
        path: path.join(config.build.outputRootPath, 'lib'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js',
        libraryTarget: 'commonjs2'
    },
    externals: externals,
    plugins: [
        new CleanWebpackPlugin(),
        ...baseConfig.plugins,
        optimizeCSSAssetsPlugin
    ],
    optimization: {
        minimize: false 
    }
});