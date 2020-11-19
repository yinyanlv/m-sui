const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = Object.assign({}, baseConfig, {
    mode: 'development',
    entry: '../App.tsx',
    plugins: [
        ...baseConfig.plugins,
        new HtmlWebpackPlugin({
            title: 'mb-sui',
            template: '../public/index.html'
        })
    ]
});