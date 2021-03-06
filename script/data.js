const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

var trades = [
"20190522202946861114",
"20190522202842118675",
"20190522202821540662",
"20190522202752971596",
"20190522202726252205",
"20190522202712834569",
"20190522202709569610",
"20190522202651258491",
"20190522202633745274",
"20190522202628250831",
"20190522202620444416",
"20190522202505265341",
"20190522202431713161",
"20190522202354721867",
"20190522202332898384",
"20190522202133846683",
"20190522201858152261",
"20190522201828359121",
"20190522201726562901",
"20190522201707472474",
"20190522201704469264",
"20190522201639544042",
"20190522201550815647",
"20190522201433365700",
"20190522201415349588",
"20190522201352102356",
"20190522201326308422",
"20190522201311470998",
"20190522201259527643",
"20190522201248211151",
"20190522201215573567",
"20190522201146807355",
"20190522201139950799",
"20190522201105530370",
"20190522201042530536",
"20190522200936860579",
"20190522200900932223",
"20190522200743742766",
"20190522200733347508",
"20190522200659192113",
"20190522195113807868",
"20190522194954526076",
"20190522194919564886",
"20190522194848226046",
"20190522194828315178",
"20190522194432867384",
"20190522194221178596",
"20190522193053255361",
"20190522191400942161",
"20190522190723441529",
"20190522190609530490",
"20190522190357537133",
"20190522190302711245",
"20190522190230634293",
"20190522185819762795",
"20190522185608585146",
"20190522184941492180",
"20190522184915749616",
"20190522184523520661",
"20190522184347387730",
"20190522184324197313",
"20190522184235316875",
"20190522184128172244",
"20190522184053429415",
"20190522184022277729",
"20190522183754545043",
"20190522183737395715",
"20190522183708327483",
"20190522183634333958",
"20190522183607457066",
"20190522183417708498",
"20190522183138723710",
"20190522183007775705",
"20190522182934213690",
"20190522182914284057",
"20190522182837917215",
"20190522182258501857",
"20190522182203462868",
"20190522181800747641",
"20190522181647151453",
"20190522181521262190",
"20190522181501283716",
"20190522181458428703",
"20190522181433802806",
"20190522181226941970",
"20190522181222210206",
"20190522181129652936",
"20190522181054179131",
"20190522181041771153",
"20190522181003111908",
"20190522180945452440",
"20190522180911794404",
"20190522180858857945",
"20190522180833584427",
"20190522180803604221",
"20190522180653639754",
"20190522180200391128",
"20190522175852295974",
"20190522175724513055",
"20190522175503150749",
"20190522175051242823",
"20190522174811376190",
"20190522173356786445",
"20190522173348413549",
"20190522173341569712",
"20190522173335559379",
"20190522173312622878",
"20190522173228279817",
"20190522172147116124",
"20190522172132666739",
"20190522171542728394",
"20190522171440312147",
"20190522171300932793"
]

async function get_doumeng_data() {
  let total = 0;
  let arr=[]
  for (var i = 0; i < trades.length; i++) {
    var trade = trades[i];
    //console.log(trade)
    let uv = await redis_client.pfcount('shua_read_tradeNo_uv_'+trade)
    if(uv!=0){
      total += uv;
      arr.push({
        tradeNo :trade,
        uv : uv
      })
    }
  }
  console.log('--------豆盟--------')
  console.log({
    total : total,
    arr : arr
  })
}


async function get_self_data() {
  let total = 0;
  let arr=[]
  for (var i = 0; i < trades.length; i++) {
    var trade = trades[i];
    //console.log(trade)
    let uv = await redis_client.pfcount('self_shua_read_tradeNo_uv_'+trade)
    if(uv!=0){
      total += uv;
      arr.push({
        tradeNo :trade,
        uv : uv
      })
    }
  }
  console.log('--------明星说--------')
  console.log({
    total : total,
    arr : arr
  })
}


async function get_doumeng_zong_data(param) {
  let total = 0;
  let arr=[]
  let zong_trads = await redis_client.smembers('shua_trans_list')
  for (var i = 0; i < zong_trads.length; i++) {
    var trade = zong_trads[i];
    //console.log(trade)
    if(trade.indexOf(param)!=-1){
      let uv = await redis_client.pfcount('shua_read_tradeNo_uv_'+trade)
      if(uv!=0){
        total += uv;
        /*arr.push({
          tradeNo :trade,
          uv : uv
        })*/
      }
    }
  }
  console.log('--------豆盟--------',param)
  console.log({
    total : total,
    //arr : arr
  })
}



async function get_slef_zong_data() {
  let total = 0;
  let arr=[]
  let zong_trads = await redis_client.smembers('self_shua_trans_list')
  for (var i = 0; i < zong_trads.length; i++) {
    var trade = zong_trads[i];
    //console.log(trade)
    let uv = await redis_client.pfcount('self_shua_read_tradeNo_uv_'+trade)
    if(trade.indexOf('20190530')==0){
      if(uv!=0){
        total += uv;
        arr.push({
          tradeNo :trade,
          uv : uv
        })
      }
    }
  }
  console.log('--------自己--------')
  console.log({
    total : total,
    //arr : arr
  })
}


async function get_wowo_zong_data() {
  let total = 0;
  let arr=[]
  let zong_trads = await redis_client.smembers('wowo_shua_trans_list')
  for (var i = 0; i < zong_trads.length; i++) {
    var trade = zong_trads[i];
    //console.log(trade)
    let uv = await redis_client.pfcount('self_shua_read_tradeNo_uv_'+trade)
    if(trade.indexOf('20190530')==0){
      if(uv!=0){
        total += uv;
        arr.push({
          tradeNo :trade,
          uv : uv
        })
      }
    }
  }
  console.log('--------窝窝--------')
  console.log({
    total : total,
    //arr : arr
  })
}


//get_wowo_zong_data()

get_slef_zong_data()

//get_doumeng_data()

//get_self_data()



//get_doumeng_zong_data('20190527')
//get_doumeng_zong_data('20190528')
//get_doumeng_zong_data('20190530')

