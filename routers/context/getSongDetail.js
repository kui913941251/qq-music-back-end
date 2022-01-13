const request = require('../../utils/request')
const CommonUtils = require('../../utils/CommonUtils')
const BaseResult = require('../../utils/BaseResult')

module.exports = async function (ctx, next) {
  let { songMid, albumMid, coverSize = 500 } = ctx.request.body

  // 根据歌曲详情html获取专辑 mid
  let { data: songDetailHtml } = await request({
    url: `https://y.qq.com/n/ryqq/songDetail/${songMid}`,
  })
  albumMid = CommonUtils.findAlbumMid(songDetailHtml)

  let config = {
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    method: 'post',
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/',
    },
    params: {
      _: '1640937658566',
    },
    data: {
      comm: {
        cv: 4747474,
        ct: 24,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 1,
        uin: 0,
        g_tk_new_20200303: 5381,
        g_tk: 5381,
      },
      song: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: { guid: '1368651968', songMid: [songMid], songtype: [0], uin: '0', loginflag: 1, platform: '20' },
      },
      album: { module: 'music.musichallAlbum.AlbumInfoServer', method: 'GetAlbumDetail', param: { albumMid: albumMid } },
    },
  }
  let { data: res } = await request(config)

  let data = {
    songUrl: ``,
    cover: ``,
    singer: [],
    album: {
      albumName: '',
      albumMid: '',
      desc: '',
      color: '',
    },

    songMid,
  }

  if (res.song.code === 0 && res.song.data.midurlinfo[0].purl) {
    data.songUrl = `${res.song.data.sip[1]}${res.song.data.midurlinfo[0].purl}`
  }
  if (res.album.code === 0) {
    data.cover = `https://y.qq.com/music/photo_new/T002R${coverSize}x${coverSize}M000${res.album.data.basicInfo.pmid}.jpg?max_age=2592000`
    data.album.albumName = res.album.data.basicInfo.albumName
    data.album.albumMid = res.album.data.basicInfo.albumMid
    data.album.desc = res.album.data.basicInfo.desc
    data.album.color = res.album.data.basicInfo.color
    data.singer = res.album.data.singer.singerList.map((item) => {
      return {
        singerName: item.name,
      }
    })
  }

  ctx.body = BaseResult.success(data)
}
