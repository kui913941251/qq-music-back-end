const request = require('../../utils/request')
const BaseResult = require("../../utils/BaseResult")

module.exports = async function (ctx, next) {
  let { songMid } = ctx.query
  let config = {
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    method: 'get',
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/',
    },
    params: {
      _: '1640936609339',
      cv: '4747474',
      ct: '24',
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: '0',
      platform: 'yqq.json',
      needNewCode: '1',
      uin: '0',
      g_tk_new_20200303: '5381',
      g_tk: '5381',
      loginUin: '0',
      songmid: songMid,
    },
  }
  
  let { data: res } = await request(config)
  let lyric = res.lyric && new Buffer.from(res.lyric, "base64").toString()
  
  ctx.body = BaseResult.success(lyric)
}