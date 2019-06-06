const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

async function test() {
    let test = await redis_client.smembers('self_shua_online_list')
    console.log(test,'---------------test')
    await redis_client.delete('self_shua_online_list', '20190605233630624900')
    let test1 = await redis_client.smembers('self_shua_online_list')
    console.log(test1,'---------------test')
    // console.log(test,'---------------test')
}
test()