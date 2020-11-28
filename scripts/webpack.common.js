const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

exports.optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true, // 避免 cssnano 重新计算z-index
        autoprefixer: false // cssnano 集成了autoprefixer的功能，会使用到autoprefixer进行无关前缀的清理，关闭autoprefixer功能，使用postcss的autoprefixer功能
    },
    cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
});

exports.externals = { // 不属于内部的库, 外部的
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
};