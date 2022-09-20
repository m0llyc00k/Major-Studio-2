module.exports = {
  devServer: {
    disableHostCheck: true
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/' + require('./package.json').name + '/'
      : '/'
}

