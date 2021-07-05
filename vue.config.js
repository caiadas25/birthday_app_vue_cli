module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'dist/index.html'  // This is whatever your path from the root is
    : '/'
}