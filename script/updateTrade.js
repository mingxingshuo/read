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
	tradeNo : "20190528173415832676",
	amount : 32000
}

let obj2={
	tradeNo : "20190528180508635957",
	amount : 20000
}

let obj3={
	tradeNo : "20190521182045364191",
	amount : 571
}

updateTrade(obj1)
//updateTrade(obj2)