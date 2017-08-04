import * as Koa from 'Koa'
let app = new Koa()

app.use(async (ctx, next) => {
   let start = new Date()

   await next()

   let ms = Number(new Date()) - Number(start)
   console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async ctx => {
    ctx.body = 'Happy Coding!'
})

app.listen(2333)