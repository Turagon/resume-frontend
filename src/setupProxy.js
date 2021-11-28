const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/', {
      target: 'https://rex-resume.herokuapp.com/',
      changeOrigin: true,
    })
  )
}