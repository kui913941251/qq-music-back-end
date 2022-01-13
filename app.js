const koa = require('koa')
const KoaBody = require('koa-body')
const KoaCors = require("koa-cors")

const router = require('./routers/router')

const app = new koa()

// 设置 cors
app.use(KoaCors())

// 解析post请求参数
app.use(KoaBody())

app.use(router.routes())

const PORT = 5000

app.listen(PORT, function () {
  console.log(`server running @ http://localhost:${PORT}`)
})
