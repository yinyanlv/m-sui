const path = require('path');
const baseConfig = require('./webpack.base.config');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { getComponentsEntry } = require('./utils');
const config = require('../config');

module.exports = Object.assign({}, baseConfig, {
    mode: 'production',
    entry: getComponentsEntry(),
    optimization: {
        minimize: false,
    },
    output: {
        path: path.join(config.build.outputRootPath, 'lib'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js',
        libraryTarget: 'commonjs2'
    },
    externals: {  // 不属于内部的库, 外部的
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        }
    },
    plugins: [
        ...baseConfig.plugins,
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ]
});