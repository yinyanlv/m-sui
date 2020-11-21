const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProd } = require('./utils');
const config = require('../config');

module.exports = {
    entry: '../index.tsx',
    output: {
        path: config.build.outputRootPath,
        publicPath: isProd() ? config.build.publicPath : config.dev.publicPath,  // 当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {  // 配置import导入
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'],
        alias: {
            '@': path.join(__dirname, '..')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    isProd() ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]__[hash:base64:5]'
                            },
                            sourceMap: isProd() ? false : true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(svg|ttf|eot|woff)$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,  // 打包css和js文件中通过路径引用的图片，js文件中需要使用require('xxx').default
                loader: 'url-loader?limit=8192&name=assets/images/[name].[hash:8].[ext]'
            },
            {
                test: /\.html$/,  // 打包html文件中图片
                loader: 'html-withimg-loader?limit=8192&name=assets/images/[name].[hash:8].[ext]'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};