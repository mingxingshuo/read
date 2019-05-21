const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

async function getdata() {
  let trades = await redis_client.smembers('shua_trans_list')
  let arr=[]
  for (var i = 0; i < trades.length; i++) {
    var trade = trades[i];
    let uv = await redis_client.pfcount('shua_read_tradeNo_uv_'+trade)
    let pv = await redis_client.get('shua_read_tradeNo_'+read.tradeNo)
    arr.push({
      tradeNo :trade,
      uv : uv,
      pv : pv
    })
  }
  console.log(arr)
}

getdata()