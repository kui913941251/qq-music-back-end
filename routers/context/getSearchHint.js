const request = require('../../utils/request')
const BaseResult = require("../../utils/BaseResult")

module.exports = async function (ctx, next) {
  const { key } = ctx.query

  let config = {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
    method: 'get',
    params: {
      key,
    },
  }

  let { data: res } = await request(config)
  ctx.body = BaseResult.success(res)
}
