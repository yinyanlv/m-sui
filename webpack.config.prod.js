const baseConfig = require('./webpack.config');


module.exports = Object.assign({}, baseConfig, {
    mode: 'production',
    entry: './index.ts',
    externals: {  // 不属于内部的库, 外部的
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        }
    }
});