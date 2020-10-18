## 需配置webpack加载字体、svg等外部文件
npm i file-loader -D

## jest测试时，导入scss报错
配置jest.config.js的moduleNameMapper字段，并创建相关模拟文件styleMock.js、fileMock.js
https://jestjs.io/docs/en/webpack 

## vscode支持css module正确点击跳转需安装插件
clinyong.vscode-css-modules

## jest使用toMatchInlineSnapshot需安装prettier
npm i prettier -D

## mini-css-extract-plugin
将css抽取为单独的css文件，否则会将css一起打包到js文件中

## optimize-css-assets-webpack-plugin
优化并压缩css文件，并解决重复导入的问题。当通过webpack配置文件的optimization.minimizer字段使用该插件时，必须在optimization.minimizer字段同时指定js压缩插件（如：terser-webpack-plugin），否则，webpack不再默认对js文件进行压缩
