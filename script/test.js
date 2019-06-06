const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

async function test() {
    let test = await redis_client.smembers('self_shua_online_list')
    console.log(test,'---------------test')
    // await redis_client.del('self_shua_online_list', item.tradeNo)
    // console.log(test,'---------------test')
}