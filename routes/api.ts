import * as KoaRouter from 'koa-router'
import api from '../controllers/api'

const router = new KoaRouter()

router.prefix('/api')

router.get('/search', async (ctx, next) => {
  let { keywords } = ctx.query
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.body = await api.search(keywords)
})

export default router