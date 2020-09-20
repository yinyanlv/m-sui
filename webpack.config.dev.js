const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = Object.assign({}, baseConfig, {
    mode: 'development',
    entry: './App.tsx',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'm-sui',
            template: './public/index.html'
        })
    ]
});