import * as Koa from 'Koa'
import * as json from 'koa-json'
import * as bodyparser from 'koa-bodyparser'
import * as Router from 'koa-router'
import * as superagent from 'superagent'
import * as querystring from 'querystring'

let app = new Koa()
// app.use(bodyparser({
// 	enableTypes: ['json', 'form', 'text']
// }))
let route = new Router()
route.get('/music', async (ctx, next) => {
  let data = await getData('life is like a boat')
  ctx.body = data
})

function getData(keywords: string) {
  const params = {
    music_input: keywords,
    music_filter: 'name',
    music_type: 'netease'
  }
  return new Promise((resolve, reject) => {
    superagent.post('http://music.2333.me/')
      .set({
        'Host': 'music.2333.me',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Origin': 'http://music.2333.me',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.1.3228.1 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'http://music.2333.me/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8'
      })
      .send(params)
      .end((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(JSON.parse(res.text))
      })

  })
}

app.use(json())

app.use(async (ctx, next) => {
  let start = new Date()

  await next()

  let ms = Number(new Date()) - Number(start)
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(route.routes()).use(route.allowedMethods())

app.listen(2333)