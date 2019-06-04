const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const selfs = require('./routes/self')
const wowo = require('./routes/wowo')
const chao = require('./routes/chao')
const test = require('./routes/stest')
const online = require('./routes/online')
const admin = require('./routes/admin')
const admin_read = require('./routes/admin_read')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(selfs.routes(), selfs.allowedMethods())
app.use(wowo.routes(), wowo.allowedMethods())
app.use(chao.routes(), chao.allowedMethods())
app.use(test.routes(), test.allowedMethods())
app.use(online.routes(), online.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(admin_read.routes(), admin_read.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
