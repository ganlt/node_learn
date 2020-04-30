const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<p>hello hello hey</p>'
})

app.listen(3000)
console.log('app startes at port 3000..')``