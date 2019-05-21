const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

async function getdata() {
  let trades = await redis_client.smembers('shua_trans_list')
  console.log(trades)
  let arr=[]
  for (var i = 0; i < trades.length; i++) {
    var trade = trades[i];
    //console.log(trade)
    let uv = await redis_client.pfcount('shua_read_tradeNo_uv_'+trade)
    //console.log(uv)
    let pv = await redis_client.get('shua_read_tradeNo_'+trade)
    //console.log(pv)
    arr.push({
      tradeNo :trade,
      uv : uv,
      pv : pv
    })
  }
  console.log(arr)
}

getdata()