const path = require('path');

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: '量付通'
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://101.33.122.195',
                changeOrigin:true,
                // pathRewrite: {
                //     '/api': '/api'
                // }
            },
            '/mock': {
                target: 'http://localhost:8080',
                changeOrigin:true,
                pathRewrite: {
                    '/mock': ''
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('styles', path.join(__dirname, './src/assets/styles/'))
            .set('@', path.join(__dirname, './src/'))
            .set('common', path.join(__dirname, './src/common/'))
    },
    productionSourceMap: false
}