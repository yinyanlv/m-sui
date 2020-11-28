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
优化并压缩css文件，并解决重复导入的问题。当通过webpack配置文件的optimization.minimizer字段使用该插件时，必须在optimization.minimizer字段同时指定js压缩插件（如：terser-webpack-plugin，uglifyjs-webpack-plugin（已存档）），否则，webpack不再默认对js文件进行压缩

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

## 直接使用tsc编译生成js文件时，不会拷贝非js文件
"build:es": "cross-env NODE_ENV=production tsc && copyfiles ./components/**/*.scss ./public/images/* ./dist/es/"

## 使用webpack编译ts生成js文件时，tsconfig.json中的outDir配置无效、declarationDir配置有效
ts-loader会自动引用项目根目录下的tsConfig.json配置

## 定义在不同scss文件中的同名变量，不同时引用时，不会相互污染

## url-loader v4引用资源时require('xxx').default，url-loader v2引用资源时require('xxx')

## 在ts文件中直接引用scss文件，优缺点
```
优点：
1、逻辑一致，样式和组件紧密的结合在一起，不需要额外的手动导入
2、利于tree shaking
缺点：
1、打包不够灵活，使用不够灵活。使用端即使不使用sass，也需要配置sass-loader解析ts文件中导入的scss文件
2、用户不可以导入打包好的全局样式包，因为会造成重复打包，增加css文件打包体积
3、如果想通过配置灵活的选择引用scss还是css文件时，需通过插件更改组件ts源码对样式文件的引用，如果ts文件中混合引用了scss和css（如：第三方包样式）文件，处理逻辑很复杂

鉴于mb-sui是可控项目，各使用端技术栈也统一，其实，直接在ts文件中引用scss文件更有优势。但如果该组件库需要给第三方使用，还是将样式文件从ts文件中剥离出来更好、更灵活
```

## html-webpack-plugin与html-loader冲突，index.html中的<%= ... %>被转义为普通字符串，失去ejs的能力
放弃html-loader，使用<img src="<%= require('./images/a.png').default %>"/>导入图片

## autoprefix
npm install --save-dev postcss-loader postcss autoprefix