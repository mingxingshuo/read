const router = require('koa-router')()
const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();
const rp = require('request-promise');
const mem = require('../util/mem')
const _ = require('underscore')


router.get('/', async (ctx, next) => {
	let can_reads = await mem.get('shua_read_trads_arr');
	let uid = getUid(ctx);
	//console.log('uid--------------------',uid)
	if(!can_reads){
	  	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=get-incomplete-missions&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
	    let trades = await rp(url)
		trades = JSON.parse(trades)
		let reads = trades.yuedulists
		can_reads = _.filter(reads,function (read) {
			return read.status ==603
		})
		await mem.set('shua_read_trads_arr',JSON.stringify(can_reads),10)
	}else{
		can_reads = JSON.parse(can_reads)
	}

	let arr = []
	for (var index = 0; index < can_reads.length; index++) {
		let read = can_reads[index]
		let amount = await redis_client.get('shua_read_tradeNo_'+read.tradeNo)
		let count = 1;
		if(read.level==1){
			count == 3
		}else if(read.level==2){
			count == 2
		}else if(read.level==3){
			count == 1
		}
		read.amount = amount;
		if(amount < read.total){
			for (var i = 0; i < count; i++) {
				arr.push(read)
			}
		}
	}

	arr = _.shuffle(arr)
	let n = parseInt(Math.random() * arr.length)
	let read = arr[n]
	read.amount ++;
	await redis_client.incr('shua_read_tradeNo_'+read.tradeNo)

	await redis_client.pfadd('shua_read_tradeNo_uv_'+read.tradeNo,uid)

	if(read.amount%100==0){
		updateTrade(read)
	}
	ctx.redirect(read.link)
    /*await ctx.render('index', {
    title: 'Hello Koa 2!'
  })*/
})

function getUid(ctx){
	let uid = ctx.cookies.get('shua_read_uu_b');
	if(!uid){
		uid = randomWord(false,32)
		ctx.cookies.set(
            'shua_read_uu_b',uid,{
                domain: ctx.hostname,
                path:'/',       // 写cookie所在的路径
                maxAge: 100*12*30*24*60*60*1000,   // cookie有效时长
                expires:new Date(Date.now()+100*12*30*24*60*60*1000), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
	}
	return uid;
}

function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}


async function updateTrade(read){
	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=update-mission&tradeNo='+
	read.tradeNo+'&completes='+read.amount+'&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
	let body = await rp(url)
	console.log('-------updateTrade---------')
	console.log(read)
	console.log(body)
}


router.get('/amount', async (ctx, next) => {
	let uv_flag = ctx.query.uv;
  	let url = 'http://58yxd.bingoworks.net/wechat/read/mission/synchronize?provider=OptimusNormalReadPerformer&action=get-incomplete-missions&token=00nn605EAvdUnDbu5vaWSccaFlouY97p'
    let trades = await rp(url)
	trades = JSON.parse(trades)
	let reads = trades.yuedulists
	for (var index = 0; index < reads.length; index++) {
		let read = reads[index]
		let amount = await redis_client.get('shua_read_tradeNo_'+read.tradeNo);
		read.amount = amount;
		if(uv_flag){
			let uv = await redis_client.pfcount('shua_read_tradeNo_uv_'+read.tradeNo);
			read.uv = uv;
		}
	}
	ctx.body = reads
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
