const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})

app.use(async (ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log(`${ms}ms`) // 耗费时间
})

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<p>hello hello hey</p>'
})

app.listen(3000)
console.log('app startes at port 3000..')