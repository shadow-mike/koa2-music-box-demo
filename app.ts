import * as Koa from 'Koa'
import * as json from 'koa-json'
import * as bodyparser from 'koa-bodyparser'
import * as superagent from 'superagent'
import api from './routes/api'

let app = new Koa()
// app.use(bodyparser({
// 	enableTypes: ['json', 'form', 'text']
// }))

app.use(json())

app.use(async (ctx, next) => {
  let start = new Date()

  await next()

  let ms = Number(new Date()) - Number(start)
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(api.routes()).use(api.allowedMethods())

app.listen(2333)