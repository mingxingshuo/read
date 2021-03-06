const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const schedule = require("node-schedule");
const date_util = require('../util/date')

async function clearSelf(time) {
    let self = await redis_client.smembers('self_shua_trans_list')
    for (let item of self) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('self_shua_trans_list', item)
            await redis_client.del('self_shua_read_tradeNo_' + item)
        }
    }
    return
}

async function clearChao(time) {
    let chao = await redis_client.smembers('chao_shua_trans_list')
    for (let item of chao) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('chao_shua_trans_list', item)
            await redis_client.del('self_shua_read_tradeNo_' + item)
        }
    }
    return
}

async function clearDoumeng(time) {
    let doumeng = await redis_client.smembers('new_shua_trans_list')
    for (let item of doumeng) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('new_shua_trans_list', item)
            await redis_client.del('self_shua_read_tradeNo_' + item)
        }
    }
    return
}

async function clearIndex(time) {
    let index = await redis_client.smembers('shua_trans_list')
    for (let item of index) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('shua_trans_list', item)
            await redis_client.del('self_shua_read_tradeNo_' + item)
        }
    }
    return
}

async function clearWowo(time) {
    let wowo = await redis_client.smembers('wowo_shua_trans_list')
    for (let item of wowo) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('wowo_shua_trans_list', item)
            await redis_client.del('self_shua_read_tradeNo_' + item)
        }
    }
    return
}

async function clearOnline(time) {
    let online = await redis_client.smembers('self_shua_online_list')
    for (let item of online) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('self_shua_online_list', item)
        }
    }
    return
}


var rule = new schedule.RecurrenceRule();
var times = [1, 5];
rule.hour = times;
var j = schedule.scheduleJob(rule, function () {
    console.log('------清理redis-------');
    let time = date_util.dateFtt('yyyyMMdd', new Date());
    clearSelf(time);
    clearChao(time);
    clearDoumeng(time);
    clearIndex(time);
    clearWowo(time);
    clearOnline(time);
});