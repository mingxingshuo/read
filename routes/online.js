const router = require('koa-router')()
const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const rp = require('request-promise');

router.prefix('/online')

router.get('/', async(ctx, next) => {
    let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=get-incomplete-missions&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
    let trades = await rp(url)
    trades = JSON.parse(trades)
    let reads = trades.yuedulists
    let onlines = await redis_client.smembers('self_shua_online_list')
    console.log(onlines,'-------------------onlines')
    let arr = []
    for (let item of reads) {
        if (item.level == 2) {
            let isOnline = 1
            if (onlines.indexOf(item.tradeNo) != -1) {
                isOnline = 0
            }
            let data = {
                tradeNo:item.tradeNo,
                title: decodeURI(item.title),
                link: item.link,
                date: item.tradeNo.slice(0, 8),
                isOnline: isOnline
            }
            arr.push(data)
        }
    }
    ctx.body = arr
})

router.get('/update', async(ctx, next) => {
    let tradeNo = ctx.query.tradeNo
    await redis_client.sadd('self_shua_online_list', tradeNo)
    ctx.body = {success: '成功'}
})

async function a() {
    await redis_client.del('self_shua_online_list','"20190531103027374525"');
}
a()

module.exports = router