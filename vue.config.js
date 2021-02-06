const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://101.33.122.195',
                changeOrigin:true,
                // pathRewrite: {
                //     '/api': '/api'
                // }
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('styles', path.join(__dirname, './src/assets/styles/'))
            .set('@', path.join(__dirname, './src/'))
            .set('common', path.join(__dirname, './src/common/'))
    }
}