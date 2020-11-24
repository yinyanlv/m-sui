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

## 使用forwardRef时，typescript报错：props.children属性不存在
AProps extends React.HTMLProps<HTMLDivElement> 或者 AProps extends extends ComponentPropsWithoutRef<'div'> 

## css module中，对@keyframes使用:global{}无效
@keyframes :global(name) {}或动画使用之处:local{}

## css动画无效
display: inline-block; css动画对行内（inline）元素无效

## 使用MiniCssExtractPlugin.loader后，不能使用sourceMap。使用sass-loader，sourceMap仍旧可以使用

## 通过sass-loader设置全局变量（也可使用sass-vars-loader）。默认情况下，内部scss文件的定义变量会覆盖sass-loader中预定义的同名变量，可通过在内部scss文件中使用!default使得sass-loader定义的变量优先级更高
``` javascript
    {
      loader: 'sass-loader',
      options: {
        // 你也可以从一个文件读取，例如 `variables.scss`
        // 如果 sass-loader 版本 = 8，这里使用 `prependData` 字段
        // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
        additionalData: `$color: red;`
      }
    }
```

## 当webpack.DefinePlugin搭配typescript使用时，需在typings文件中声明全局变量（如：PREFIX_CLS），否则，ts报错