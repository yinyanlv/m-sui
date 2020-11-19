const path = require('path');

module.exports = {
    build: {
        env: {
            NODE_ENV: 'production'
        },
        outputPath: path.resolve(__dirname, '../dist'),
        publicPath: '/' 
    },
    dev: {
        env: {
            NODE_ENV: 'development'
        },
        publicPath: '/',
        port: 8080
    }
};