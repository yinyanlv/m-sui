## 需配置webpack加载字体、svg等外部文件
npm i file-loader -D

## jest测试时，导入scss报错
配置jest.config.js的moduleNameMapper字段，并创建相关模拟文件styleMock.js、fileMock.js
https://jestjs.io/docs/en/webpack 

## vscode支持css module正确点击跳转需安装插件
clinyong.vscode-css-modules
