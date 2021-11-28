const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/', {
      target: 'https://rex-resume.herokuapp.com/',
      changeOrigin: true,
    }),
    proxy('/user', {
      target: 'https://rex-resume.herokuapp.com/user',
      changeOrigin: true,
    }),
    proxy('/admin', {
      target: 'https://rex-resume.herokuapp.com/admin',
      changeOrigin: true,
    })
  )
}