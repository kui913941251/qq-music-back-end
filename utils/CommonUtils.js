function findAlbumMid(html) {
  let reg = /albumDetail\/(\w+)/
  let res = reg.exec(html)
  if (res) {
    return res[1]
  } else {
    return ''
  }
}

module.exports = {
  findAlbumMid,
}
