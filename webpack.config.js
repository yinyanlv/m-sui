const path = require('path');


module.exports = {
    entry: './components/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'm-sui',
        libraryTarget: 'umd'
    },
    resolve: {  // 配置imoprt导入
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
};