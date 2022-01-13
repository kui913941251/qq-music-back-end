const KoaRouter = require("koa-router")

const router = new KoaRouter()

const context = require("./context/index")

router.get("/getSearchHint", context.getSearchHint)
router.get("/getSongLyric", context.getSongLyric)
router.get("/getCoverUrl", context.getCoverUrl)
router.post("/getSongDetail", context.getSongDetail)


module.exports = router