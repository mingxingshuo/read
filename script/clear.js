const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const schedule = require("node-schedule");
const date_util = require('../util/date')

async function clearSelf() {
    let self = await redis_client.smembers('self_shua_trans_list')
    for (let item of self) {
        let time = date_util.dateFtt('yyyyMMdd', new Date());
        let tradeTime = item.tradeNo.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('self_shua_trans_list', item.tradeNo)
            await redis_client.del('self_shua_read_tradeNo_', item.tradeNo)
        }
    }
}

async function clearChao() {
    let chao = await redis_client.smembers('chao_shua_trans_list')
    for (let item of chao) {
        let time = date_util.dateFtt('yyyyMMdd', new Date());
        let tradeTime = item.tradeNo.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('chao_shua_trans_list', item.tradeNo)
        }
    }
}

async function clearDoumeng() {
    let doumeng = await redis_client.smembers('new_shua_trans_list')
    for (let item of doumeng) {
        let time = date_util.dateFtt('yyyyMMdd', new Date());
        let tradeTime = item.tradeNo.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('new_shua_trans_list', item.tradeNo)
        }
    }
}

async function clearIndex() {
    let index = await redis_client.smembers('shua_trans_list')
    for (let item of index) {
        let time = date_util.dateFtt('yyyyMMdd', new Date());
        let tradeTime = item.tradeNo.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('shua_trans_list', item.tradeNo)
        }
    }
}

async function clearWowo() {
    let wowo = await redis_client.smembers('wowo_shua_trans_list')
    for (let item of wowo) {
        let time = date_util.dateFtt('yyyyMMdd', new Date());
        let tradeTime = item.tradeNo.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('wowo_shua_trans_list', item.tradeNo)
        }
    }
}

async function clearOnline() {
    let online = await redis_client.smembers('self_shua_online_list')
    for (let item of online) {
        let time = date_util.dateFtt('yyyyMMdd', new Date());
        let tradeTime = item.tradeNo.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            await redis_client.srem('self_shua_online_list', item.tradeNo)
        }
    }
}


var rule = new schedule.RecurrenceRule();
var times = [1, 5];
rule.hour = times;
var j = schedule.scheduleJob(rule, function () {
    console.log('------清理redis-------');
    clearSelf();
    clearChao();
    clearDoumeng();
    clearIndex();
    clearWowo();
    clearOnline();
});