const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const rp = require('request-promise');


async function updateTrade(read){
	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=update-mission&tradeNo='+
	read.tradeNo+'&completes='+read.amount+'&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
	let body = await rp(url)
	console.log('-------updateTrade---------')
	console.log(read)
	console.log(body)
}


let obj1={
	tradeNo : "20190520192708729690",
	amount : 323
}

let obj2={
	tradeNo : "20190520192722213135",
	amount : 571
}


//updateTrade(obj1)
updateTrade(obj2)