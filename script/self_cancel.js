const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const rp = require('request-promise');
const schedule = require("node-schedule");

async function req_trads(){
  	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=get-incomplete-missions&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
    let trades = await rp(url)
	trades = JSON.parse(trades)
	let reads = trades.yuedulists
	for (var i = 0; i < reads.length; i++) {
		var item = reads[i]
		if(item.level ==2 && item.status == 606){
			updateCancel(item)
		}
	}
}

async function updateCancel(read){
	console.log('-------updateCancel---------')
	let amount = await redis_client.pfcount('self_shua_read_tradeNo_uv_'+read.tradeNo)
	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=ack-mission-revoking&tradeNo='+
	read.tradeNo+'&completes='+amount+'&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
	let body = await rp(url)
	console.log(read)
	console.log(body)
}


var rule = new schedule.RecurrenceRule();
var times = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
rule.second = times;
var j = schedule.scheduleJob(rule, function () {
    console.log('--------自己执行查询退单--------');
    req_trads()
});

//module.exports.req_trads = req_trads
