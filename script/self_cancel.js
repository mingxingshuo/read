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
		if(item.status == 606){
			updateCancel(item)
		}else if(item.status ==603){
			updateTrade(item)
		}
	}
}


async function updateTrade(read){
	let amount;
	if(read.level==1){
		//let amount = await redis_client.pfcount('shua_read_tradeNo_uv_'+read.tradeNo)
		amount = await redis_client.get('shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==2){
		//amount = await redis_client.pfcount('self_shua_read_tradeNo_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==3){
		//amount = await redis_client.pfcount('wowo_shua_read_channel_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==4){
		//amount = await redis_client.pfcount('wowo_shua_read_channel_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==5){
		//amount = await redis_client.pfcount('wowo_shua_read_channel_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}
	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=update-mission&tradeNo='+
	read.tradeNo+'&completes='+amount+'&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
	read.amount = amount;
	let body = await rp(url)
	console.log('-------updateTrade  script---------')
	console.log(read)
	console.log(body)
}


async function updateCancel(read){
	console.log('-------updateCancel---------')
	let amount;
	if(read.level==1){
		//amount = await redis_client.pfcount('shua_read_tradeNo_uv_'+read.tradeNo)
		amount = await redis_client.get('shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==2){
		//amount = await redis_client.pfcount('self_shua_read_tradeNo_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==3){
		//amount = await redis_client.pfcount('wowo_shua_read_channel_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==4){
		//amount = await redis_client.pfcount('wowo_shua_read_channel_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}else if(read.level==5){
		//amount = await redis_client.pfcount('wowo_shua_read_channel_uv_'+read.tradeNo)
		amount = await redis_client.get('self_shua_read_tradeNo_'+read.tradeNo);
	}
	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=ack-mission-revoking&tradeNo='+
	read.tradeNo+'&completes='+amount+'&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
	read.amount = amount;
	let body = await rp(url)
	console.log(read)
	console.log(body)
}


var rule = new schedule.RecurrenceRule();
var times = [1,  11,  21,  31,  41,  51 ];
rule.second = times;
var j = schedule.scheduleJob(rule, function () {
    console.log('--------自己执行查询退单--------');
    req_trads()
});

//module.exports.req_trads = req_trads
