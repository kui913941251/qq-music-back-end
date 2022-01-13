const axios = require('axios')

axios.defaults.withCredentials = true // `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;text/plain;'
axios.defaults.responseType = 'json;text/plain;charset=utf-8;'


function request(config) {
  return axios(config)
}

module.exports = request