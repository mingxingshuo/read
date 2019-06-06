const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const date_util = require('../util/date')

async function clearSelf(time) {
    let self = await redis_client.smembers('self_shua_trans_list')
    let arr = []
    for (let item of self) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            let a = await redis_client.get('self_shua_read_tradeNo_' + item)
            arr.push(a)
        }
    }
    console.log('---------' + arr.length + '------------self')
    return
}

async function clearChao(time) {
    let chao = await redis_client.smembers('chao_shua_trans_list')
    let arr = []
    for (let item of chao) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            let a = await redis_client.get('self_shua_read_tradeNo_' + item)
            arr.push(a)
        }
    }
    console.log('---------' + arr.length + '------------chao')
    return
}

async function clearDoumeng(time) {
    let doumeng = await redis_client.smembers('new_shua_trans_list')
    let arr = []
    for (let item of doumeng) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            let a = await redis_client.get('self_shua_read_tradeNo_' + item)
            arr.push(a)
        }
    }
    console.log('---------' + arr.length + '------------doumeng')
    return
}

async function clearIndex(time) {
    let index = await redis_client.smembers('shua_trans_list')
    let arr = []
    for (let item of index) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            let a = await redis_client.get('self_shua_read_tradeNo_' + item)
            arr.push(a)
        }
    }
    console.log('---------' + arr.length + '------------index')
    return
}

async function clearWowo(time) {
    let wowo = await redis_client.smembers('wowo_shua_trans_list')
    let arr = []
    for (let item of wowo) {
        let tradeTime = item.slice(0, 8)
        if (parseInt(time) - parseInt(tradeTime) >= 4) {
            let a = await redis_client.get('self_shua_read_tradeNo_' + item)
            arr.push(a)
        }
    }
    console.log('---------' + arr.length + '------------wowo')
    return
}

var time = date_util.dateFtt('yyyyMMdd', new Date());
clearSelf(time)
clearChao(time)
clearDoumeng(time)
clearIndex(time)
clearWowo(time)