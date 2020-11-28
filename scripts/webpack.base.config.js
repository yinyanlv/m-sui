const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProd } = require('./utils');
const config = require('../config');
const webpack = require('webpack');

module.exports = {
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
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, '../tsconfig.json')
                    }
                }]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    isProd() ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: {
                            //     localIdentName: '[name]_[local]__[hash:base64:5]'
                            // },
                            sourceMap: isProd() ? false : true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer"
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `$prefix-cls: '${config.prefixCls}';`
                        }
                    }
                ]
            },
            {
                test: /\.(svg|ttf|eot|woff)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,  // 打包css和js文件中通过路径引用的图片，js文件中需要使用require('xxx').default
                loader: 'url-loader',
                options: {
                    limit: 5120,
                    name: 'assets/images/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: isProd() ? [
        new webpack.DefinePlugin({
            PREFIX_CLS: JSON.stringify(config.prefixCls)
        }),
        new MiniCssExtractPlugin()
    ] : [
            new webpack.DefinePlugin({
                PREFIX_CLS: JSON.stringify(config.prefixCls)
            })
        ]
};