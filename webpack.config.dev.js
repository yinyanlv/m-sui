const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = Object.assign({}, baseConfig, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'm-sui',
            template: './public/index.html'
        })
    ]
});