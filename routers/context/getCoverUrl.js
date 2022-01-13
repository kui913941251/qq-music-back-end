const request = require('../../utils/request')
const CommonUtils = require('../../utils/CommonUtils')

module.exports = async function (ctx, next) {
  let { songMid, coverSize = 500 } = ctx.query

  // 根据歌曲详情html获取专辑 mid
  let { data: songDetailHtml } = await request({
    url: `https://y.qq.com/n/ryqq/songDetail/${songMid}`,
  })
  albumMid = CommonUtils.findAlbumMid(songDetailHtml)

  let res = await request({
    url: `https://y.qq.com/music/photo_new/T002R${coverSize}x${coverSize}M000${albumMid}.jpg?max_age=2592000`,
    method: 'get',
    headers: {
      responseType: 'blob',
    },
  })
  let url = `data:image/jpg;base64,${new Buffer.from(res.data, 'binary').toString('base64')}`
  ctx.body = res.data
}
