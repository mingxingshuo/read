const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

async function test() {
    await redis_client.del('self_shua_online_list',0, '20190605233630624900')
    let test = await redis_client.smembers('self_shua_online_list')
    console.log(test,'---------------test')
    // console.log(test,'---------------test')
}
test()