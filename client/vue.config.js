module.exports = {
  devServer: {
    port: 3003,
    proxy: {
      '/api': {
        target: 'http://localhost:5003'
      }
    }
  }
}
