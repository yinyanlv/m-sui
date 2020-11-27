const path = require('path');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
    mode: 'development',
    entry: path.resolve(__dirname, '../site/App.tsx'),
    devtool: 'source-map',
    plugins: [
        ...baseConfig.plugins,
        new HtmlWebpackPlugin({
            title: 'mb-sui',
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html')
        })
    ]
});