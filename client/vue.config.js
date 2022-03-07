module.exports = {
  devServer: {
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [],
  lintOnSave: false
}