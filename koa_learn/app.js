const Koa = require('koa')

const app = new Koa()

const bodyPaeser = require('koa-bodyparser')
const controller = require('./controller');
app.use(bodyPaeser())
app.use(controller())

app.listen(3000)
console.log('app startes at port 3000..')