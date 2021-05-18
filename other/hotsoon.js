/*
github：https://github.com/Ariszy/script
boxjs：https://raw.githubusercontent.com/Ariszy/Private-Script/master/Ariszy.boxjs.json
转载留个名字，谢谢
作者：执意Ariszy
目前包含：
签到
看广告获取金币
看视频获取金币
随机宝箱
脚本初成，非专业人士制作，欢迎指正
#签到详情获取signheader and signkey，一定要签到详情界面获取到的
#看广告获取adheader and adkey
#看一个视频获取readheader and readkey

[mitm]
hostname = *.snssdk.com
#圈x
[rewrite local]
/luckycat/hotsoon/v1/task/done/daily_read_\d+m? url script-request-header https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js
/luckycat/hotsoon/v1/task/done/draw_excitation_ad? url script-request-header https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js
/luckycat/hotsoon/v1/task/sign_in_detail? script-request-header https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js
#loon
http-request /luckycat/hotsoon/v1/task/done/daily_read_\d+m? script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js, requires-body=true, timeout=10, tag=hotsoonread
http-request /luckycat/hotsoon/v1/task/done/draw_excitation_ad? script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js, requires-body=true, timeout=10, tag=hotsoonad
http-request /luckycat/hotsoon/v1/task/sign_in_detail? script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js, requires-body=true, timeout=10, tag=hotsoonsign
#surge
hotsoonsign = type=http-request,pattern=/luckycat/hotsoon/v1/task/sign_in_detail?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js,script-update-interval=0
hotsoonad = type=http-request,pattern=/luckycat/hotsoon/v1/task/done/draw_excitation_ad?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js,script-update-interval=0
hotsoonread = type=http-request,pattern=/luckycat/hotsoon/v1/task/done/daily_read_\d+m?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/hotsoon.js,script-update-interval=0
*/


const jsname='火山视频极速版'
const $ = Env(jsname)
const notify = $.isNode() ?require('./sendNotify') : '';
$.idx = ($.idx = ($.getval("hotsooncount") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 账号扩展字符
const hotsoonsignheaderArr = [],hotsoonsignkeyArr=[]
const hotsoonadheaderArr = [],hotsoonadkeyArr=[]
const hotsoonreadheaderArr = [],hotsoonreadkeyArr=[]
let hotsoonsignheader = $.getdata('hotsoonsignheader')
let hotsoonsigncookie = $.getdata('hotsoonsigncookie')

let hotsoonadheader = $.getdata('hotsoonadheader')
let hotsoonadkey = $.getdata('hotsoonadkey')
let no = 1;
let hotsoonreadheader = $.getdata('hotsoonreadheader')
let hotsoonreadkey = $.getdata('hotsoonreadkey')
let hotsoonaccount = ($.getval('hotsoonaccount') || 0);
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
let cash = 1;
let coins;

if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
if ($.isNode()) {
//sign
  if (process.env.HOTSOONSIGNHEADER && process.env.HOTSOONSIGNHEADER.indexOf('#') > -1) {
   hotsoonsignheader = process.env.HOTSOONSIGNHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONSIGNHEADER && process.env.HOTSOONSIGNHEADER.indexOf('\n') > -1) {
   hotsoonsignheader = process.env.HOTSOONSIGNHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonsignheader = process.env.HOTSOONSIGNHEADER.split()
  };
  if (process.env.HOTSOONSIGNKEY&& process.env.HOTSOONSIGNKEY.indexOf('#') > -1) {
   hotsoonsignkey = process.env.HOTSOONSIGNKEY.split('#');
  }
  else if (process.env.HOTSOONSIGNKEY && process.env.HOTSOONSIGNKEY.split('\n').length > 0) {
   hotsoonsignkey = process.env.HOTSOONSIGNKEY.split('\n');
  } else  {
   hotsignkey = process.env.HOTSOONSIGNKEY.split()
  };
//AD
if (process.env.HOTSOONADHEADER && process.env.HOTSOONADHEADER.indexOf('#') > -1) {
   hotsoonadheader = process.env.HOTSOONADHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONADHEADER && process.env.HOTSOONADHEADER.indexOf('\n') > -1) {
   hotsoonadheader = process.env.HOTSOONADHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonadheader = process.env.HOTSOONADHEADER.split()
  };
  if (process.env. HOTSOONADKEY&& process.env.HOTSOONADKEY.indexOf('#') > -1) {
   hotsoonadkey = process.env.HOTSOONADKEY.split('#');
  }
  else if (process.env.HOTSOONADKEY && process.env.HOTSOONADKEY.split('\n').length > 0) {
   hotsoonadkey = process.env.HOTSOONADKEY.split('\n');
  } else  {
   hotsoonadkey = process.env.HOTSOONADKEY.split()
  };
//video
if (process.env.HOTSOONREADHEADER && process.env.HOTSOONREADHEADER.indexOf('#') > -1) {
   hotsoonreadheader = process.env.HOTSOONREADHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONREADHEADER && process.env.HOTSOONREADHEADER.indexOf('\n') > -1) {
   hotsoonreadheader = process.env.HOTSOONREADHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonreadheader = process.env.HOTSOONREADHEADER.split()
  };
  if (process.env. HOTSOONREADKEY&& process.env.HOTSOONREADKEY.indexOf('#') > -1) {
   hotsoonreadkey = process.env.HOTSOONREADKEY.split('#');
  }
  else if (process.env.HOTSOONREADKEY && process.env.HOTSOONREADKEY.split('\n').length > 0) {
   hotsoonreadkey = process.env.HOTSOONREADKEY.split('\n');
  } else  {
   hotsoonreadkey = process.env.HOTSOONREADKEY.split()
  };
//sign
  Object.keys(hotsoonsignheader).forEach((item) => {
        if (hotsoonsignheader[item]) {
          hotsoonsignheaderArr.push(hotsoonsignheader[item])
        }
    });
    Object.keys(hotsoonsignkey).forEach((item) => {
        if (hotsoonsignkey[item]) {
          hotsoonsignkeyArr.push(hotsoonsignkey[item])
        }
    });
//step
Object.keys(hotsoonadheader).forEach((item) => {
        if (hotsoonadheader[item]) {
          hotsoonadheaderArr.push(hotsoonadheader[item])
        }
    });
    Object.keys(hotsoonadkey).forEach((item) => {
        if (hotsoonadkey[item]) {
          hotsoonadkeyArr.push(hotsoonadkey[item])
        }
    });
//read
Object.keys(hotsoonreadheader).forEach((item) => {
        if (hotsoonreadheader[item]) {
          hotsoonreadheaderArr.push(hotsoonreadheader[item])
        }
    });
    Object.keys(hotsoonreadkey).forEach((item) => {
        if (hotsoonreadkey[item]) {
          hotsoonreadkeyArr.push(hotsoonreadkey[item])
        }
    });
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    hotsoonsignheaderArr.push($.getdata('hotsoonsignheader'))
    hotsoonsignkeyArr.push($.getdata('hotsoonsignkey'))
    hotsoonadheaderArr.push($.getdata('hotsoonadheader'))
    hotsoonadkeyArr.push($.getdata('hotsoonadkey'))
    hotsoonreadheaderArr.push($.getdata('hotsoonreadheader'))
    hotsoonreadkeyArr.push($.getdata('hotsoonreadkey'))
    let hotsooncount = ($.getval('hotsooncount') || '1');
  for (let i = 2; i <= hotsooncount; i++) {
    hotsoonsignheaderArr.push($.getdata(`hotsoonsignheader${i}`))
    hotsoonsignkeyArr.push($.getdata(`hotsoonsignkey${i}`))
    hotsoonadheaderArr.push($.getdata(`hotsoonadheader${i}`))
    hotsoonadkeyArr.push($.getdata(`hotsoonadkey${i}`))
    hotsoonreadheaderArr.push($.getdata(`hotsoonreadheader${i}`))
    hotsoonreadkeyArr.push($.getdata(`hotsoonreadkey${i}`))
  }
}
!(async () => {
if (!hotsoonsignheaderArr[0]) {
    $.msg($.name, '【提示】请先获取火山视频极速版一cookie')
    return;
  }
   console.log(`------------- 共${hotsoonsignheaderArr.length}个账号----------------\n`)
  for (let i = 0; i < hotsoonsignheaderArr.length; i++) {
    if (hotsoonsignheaderArr[i]) {
      message = ''
      hotsoonsignheader = hotsoonsignheaderArr[i];
      hotsoonsignkey = hotsoonsignkeyArr[i];
      hotsoonadheader = hotsoonadheaderArr[i];
      hotsoonadkey = hotsoonadkeyArr[i];
      hotsoonreadheader = hotsoonreadheaderArr[i];
      hotsoonreadkey = hotsoonreadkeyArr[i];
      $.index = i + 1;
      console.log(`\n开始【火山视频极速版${$.index}】`)
      //await userinfo()
      await sign_in()
      await treasure_task()
      await control()
      await tasklist()
      //await withdraw()
      await watch_video(no)
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
function GetCookie() {
 if($request&&$request.url.indexOf("hotsoon"&&"sign_in_detail")>=0) {
  const hotsoonsignheader = $request.url.split(`?`)[1]
    if (hotsoonsignheader) $.setdata(hotsoonsignheader,`hotsoonsignheader${$.idx}`)
    $.log(`[${jsname}] 获取sign请求: 成功,hotsoonsignheader: ${hotsoonsignheader}`)
    $.msg(`获取hotsoonsignheader: 成功🎉`, ``)
   const hotsoonsignkey = JSON.stringify($request.headers)
  if(hotsoonsignkey)        $.setdata(hotsoonsignkey,`hotsoonsignkey${$.idx}`)
    $.log(`[${jsname}] 获取sign请求: 成功,hotsoonsignkey: ${hotsoonsignkey}`)
    $.msg(`获取hotsoonsignkey: 成功🎉`, ``)
 }
 if($request&&$request.url.indexOf('hotsoon'&&"daily_read")>=0) {
	  const hotsoonreadheader = $request.url.split(`?`)[1]
	    if (hotsoonreadheader) $.setdata(hotsoonreadheader,`hotsoonreadheader${$.idx}`)
	    $.log(`[${jsname}] 获取read请求: 成功,hotsoonreadheader: ${hotsoonreadheader}`)
	    $.msg(`获取hotsoonreadheader: 成功🎉`, ``)
	   const hotsoonreadkey = JSON.stringify($request.headers)
	  if(hotsoonreadkey)        $.setdata(hotsoonreadkey,`hotsoonreadkey${$.idx}`)
	    $.log(`[${jsname}] 获取read请求: 成功,readkey: ${hotsoonreadkey}`)
	    $.msg(`获取hotsoonreadkey: 成功🎉`, ``)
	 }
 if($request&&$request.url.indexOf('hotsoon' && "draw_excitation_ad")>=0) {
	  const hotsoonadheader = $request.url.split(`?`)[1]
	    if (hotsoonadheader) $.setdata(hotsoonadheader,`hotsoonadheader${$.idx}`)
	    $.log(`[${jsname}] 获取AD请求: 成功,hotsoonadheader: ${hotsoonadheader}`)
	    $.msg(`获取hotsoonadheader: 成功🎉`, ``)
	   const hotsoonadkey = JSON.stringify($request.headers)
	  if(hotsoonadkey)        $.setdata(hotsoonadkey,`hotsoonadkey${$.idx}`)
	    $.log(`[${jsname}] 获取AD请求: 成功,hotsoonadkey: ${hotsoonadkey}`)
	    $.msg(`获取hotsoonadkey: 成功🎉`, ``)
	 }
    }
//签到
function sign_in() {
return new Promise((resolve, reject) => {
  let sign_inurl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/sign_in?${hotsoonsignheader}`,
    headers: JSON.parse(hotsoonsignkey),
}
   $.post(sign_inurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
          message += '📣签到\n'
      if(result.err_no == 0) {
          message += result.err_tips+'\n'
      }else{
          message +='⚠️异常'+result.err_tips+'\n'
           }
          resolve()
    })
   })
  } 
//随机宝箱
function treasure_task() {
return new Promise((resolve, reject) => {
  let treasure_taskurl ={
	url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/treasure_task?${hotsoonsignheader}`,
    headers: JSON.parse(hotsoonsignkey),
}
   $.post(treasure_taskurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs) $.log(data)
      message += '📣随机宝箱\n'
      if(result.err_no == 0) {
           message += result.err_tips+result.data.tips+'\n'
       }else{
    	   message +=/*
 * @Author: whyour
 * @Github: https://github.com/whyour
 * @Date: 2020-11-29 13:14:19
 * @LastEditors: whyour
 * @LastEditTime: 2021-02-01 10:18:45
 * 多谢： https://github.com/MoPoQAQ, https://github.com/lxk0301
 * 添加随机助力
 * 自动开团助力
 * box设置不自动充能
 * 可设置每天通知时间
  quanx:
  [task_local]
  10 * * * * https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_factory.js, tag=京喜工厂, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdgc.png, enabled=true

  Loon:
  [Script]
  cron "10 * * * *" script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_factory.js,tag=京喜工厂

  Surge:
  京喜工厂 = type=cron,cronexp="10 * * * *",wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_factory.js
*
**/

const $ = new Env('京喜工厂');
const JD_API_HOST = 'https://m.jingxi.com/';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
$.autoCharge = $.getdata('gc_autoCharge') ? $.getdata('gc_autoCharge') === 'true' : true;
$.showLog = $.getdata('gc_showLog') ? $.getdata('gc_showLog') === 'true' : false;
$.notifyTime = $.getdata('gc_notifyTime');
$.tokens = [$.getdata('jxnc_token1') || '{}', $.getdata('jxnc_token2') || '{}'];
$.result = [];
$.cookieArr = [];
$.currentCookie = '';
$.allTask = [];
$.info = {};
$.userTuanInfo = {};

!(async () => {
  if (!getCookies()) return;
  for (let i = 0; i < $.cookieArr.length; i++) {
    $.currentCookie = $.cookieArr[i];
    $.currentToken = JSON.parse($.tokens[i] || '{}');
    if ($.currentCookie) {
      const userName = decodeURIComponent(
        $.currentCookie.match(/pt_pin=(.+?);/) && $.currentCookie.match(/pt_pin=(.+?);/)[1],
      );
      $.log(`\n开始【京东账号${i + 1}】${userName}`);
      $.result.push(`【京东账号${i + 1}】${userName}`);
      const beginInfo = await getUserInfo();
      if (beginInfo && typeof beginInfo === 'boolean') {
        $.result.push(`【账户】未选择商品，跳过`);
        continue;
      }
      await $.wait(500);
      await getCommodityDetail();
      if (checkProductProcess()) return;
      await $.wait(500);
      await getCurrentElectricity();
      await $.wait(500);
      await getTaskList();
      await $.wait(500);
      await browserTask();
      await $.wait(500);
      await getHireRewardList();
      // await $.wait(500);
      // await getFriends();
      // await $.wait(500);
      // await pickUserComponents($.info.user.encryptPin, true);
      await $.wait(500);
      await awardTuan();
      await $.wait(500);
      const endInfo = await getUserInfo();
      $.info.commodityInfo && $.result.push(
        `【名称】：${$.info.commodityInfo.name}`,
        `【电力】：获得(${endInfo.user.electric - beginInfo.user.electric}) 还需(${
          endInfo.productionInfo.needElectric - beginInfo.productionInfo.investedElectric
        })`,
        `【账户剩余】：${endInfo.user.electric}`,
      );
      await $.wait(500);
      await investElectric();
      if (checkProductProcess()) return;
      await $.wait(500);
      await submitInviteId(userName);
      await $.wait(500);
      //await createAssistUser();
      await $.wait(500);
      await getTuanId();
      await $.wait(500);
      await submitTuanId(userName);
      await $.wait(500);
      await joinTuan();
    }
  }
  await showMsg();
})()
  .catch(e => $.logErr(e))
  .finally(() => $.done());

function getCookies() {
  if ($.isNode()) {
    $.cookieArr = Object.values(jdCookieNode);
  } else {
    const CookiesJd = JSON.parse($.getdata("CookiesJD") || "[]").filter(x => !!x).map(x => x.cookie);
    $.cookieArr = [$.getdata("CookieJD") || "", $.getdata("CookieJD2") || "", ...CookiesJd];
  }
  if (!$.cookieArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/',
    });
    return false;
  }
  return true;
}

function getUserInfo() {
  return new Promise(resolve => {
    $.get(taskUrl('userinfo/GetUserInfo'), async (err, resp, data) => {
      try {
        const { ret, data: { factoryList = [], productionList = [], user = {} } = {}, msg } = JSON.parse(data);
        $.log(`\n获取用户信息：${msg}\n${$.showLog ? data : ''}`);
        if (!productionList || !productionList[0]) {
          resolve(true);
        }
        $.info = {
          ...$.info,
          factoryInfo: factoryList[0],
          productionInfo: productionList[0] || {},
          user,
        };
        resolve({
          factoryInfo: factoryList[0],
          productionInfo: productionList[0] || {},
          user,
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function getCommodityDetail() {
  return new Promise(async resolve => {
    if (!$.info.productionInfo.commodityDimId) {
      resolve();
      return;
    }
    $.get(
      taskUrl('diminfo/GetCommodityDetails', `commodityId=${$.info.productionInfo.commodityDimId}`),
      (err, resp, data) => {
        try {
          const { ret, data: { commodityList = [] } = {}, msg } = JSON.parse(data);
          $.log(`\n获取商品详情：${msg}\n${$.showLog ? data : ''}`);
          $.info.commodityInfo = commodityList[0];
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      },
    );
  });
}

function checkProductProcess() {
  if ($.info.productionInfo) {
    const { needElectric, investedElectric } = $.info.productionInfo;
    if (needElectric <= investedElectric) {
      $.msg($.name, `【提示】商品 ${$.info.commodityInfo.name} 已生产完成，请前往京喜工厂兑换并选择新商品！`);
      return true;
    }
  }
  return false;
}

function getCurrentElectricity() {
  return new Promise(async resolve => {
    $.get(
      taskUrl('generator/QueryCurrentElectricityQuantity', `factoryid=${$.info.factoryInfo.factoryId}`),
      async (err, resp, data) => {
        try {
          const {
            ret,
            data: { currentElectricityQuantity, doubleElectricityFlag, maxElectricityQuantity } = {},
            msg,
          } = JSON.parse(data);
          $.log(`\n获取当前电力：${msg}\n${$.showLog ? data : ''}`);
          if (currentElectricityQuantity === maxElectricityQuantity && doubleElectricityFlag) {
            await collectElectricity($.info.factoryInfo.factoryId);
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      },
    );
  });
}

function collectElectricity(facId, master) {
  return new Promise(async resolve => {
    $.get(
      taskUrl(
        'generator/CollectCurrentElectricity',
        `factoryid=${facId}&master=${master ? master : ''}&apptoken=${$.currentToken['farm_jstoken'] || ''}&pgtimestamp=${$.currentToken['timestamp'] || ''}&phoneID=${$.currentToken['phoneid'] || ''}&doubleflag=1&_stk=_time%2Capptoken%2Cdoubleflag%2Cfactoryid%2Cpgtimestamp%2CphoneID%2Czone`,
      ),
      (err, resp, data) => {
        try {
          const { ret, data: { CollectElectricity, loginPinCollectElectricity } = {}, msg } = JSON.parse(data);
          $.log(`${master ? '偷取好友' : '收取'} ${CollectElectricity} 电力 ${msg} \n${$.showLog ? data : ''}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      },
    );
  });
}

function pickUserComponents(pin, isMe) {
  return new Promise(async resolve => {
    $.get(taskUrl('usermaterial/GetUserComponent', `pin=${pin}`), async (err, resp, data) => {
      try {
        const { msg, data: { componentList = [] } = {} } = JSON.parse(data);
        $.log(`\n获取${isMe ? '自己' : '好友'}零件：${msg}\n${$.showLog ? data : ''}`);
        if (componentList.length > 0) {
          for (let i = 0; i < componentList.length; i++) {
            await $.wait(1000);
            const { placeId } = componentList[i];
            let status = [false];
            if (!status[0]) {
              status[0] = await pickUpComponent(placeId, pin, isMe);
            }
            if (status[0]) {
              break;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function pickUpComponent(placeId, pin, isMe) {
  return new Promise(async resolve => {
    $.get(taskUrl('usermaterial/PickUpComponent', `pin=${pin}&placeId=${placeId}`), (err, resp, data) => {
      try {
        const { msg, data: { increaseElectric } = {} } = JSON.parse(data);
        $.log(
          `\n拾取${isMe ? '自己' : '好友'}零件：${msg}，获得电力 ${increaseElectric || 0}\n${$.showLog ? data : ''}`,
        );
        if (!increaseElectric) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function getTaskList() {
  return new Promise(async resolve => {
    $.get(taskListUrl('GetUserTaskStatusList', `_stk=_cfd_t%2CbizCode%2CdwEnv%2Cptag%2Csource%2CstrZone%2CtaskId`), async (err, resp, data) => {
      try {
        const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
        $.allTask = userTaskStatusList.filter(x => x.awardStatus !== 1);
        $.log(`\n获取任务列表 ${msg}，总共${$.allTask.length}个任务！`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function browserTask() {
  return new Promise(async resolve => {
    const times = Math.max(...[...$.allTask].map(x => x.configTargetTimes));
    for (let i = 0; i < $.allTask.length; i++) {
      const task = $.allTask[i];
      $.log(`\n开始第${i + 1}个任务：${task.taskName}`);
      const status = [true, true];
      for (let i = 0; i < times; i++) {
        await $.wait(500);
        if (status[0]) {
          status[0] = await doTask(task);
        }
        await $.wait(500);
        if (status[1]) {
          status[1] = await awardTask(task);
        }
        if (!status[0] && !status[1]) {
          break;
        }
      }
      $.log(`\n结束第${i + 1}个任务：${task.taskName}\n`);
    }
    resolve();
  });
}

function awardTask({ taskId, taskName }) {
  return new Promise(resolve => {
    $.get(taskListUrl('Award', `taskId=${taskId}&_stk=_time%2CbizCode%2Csource%2CtaskId`), (err, resp, data) => {
      try {
        const { msg, ret, data: { prizeInfo = '' } = {} } = JSON.parse(data);
        let str = '';
        if (msg.indexOf('活动太火爆了') !== -1) {
          str = '任务进行中或者未到任务时间';
        } else {
          str = msg + prizeInfo ? ` 获得电力 ${prizeInfo.slice(0, -2)}` : '';
        }
        $.log(`${taskName}[领奖励]：${str}\n${$.showLog ? data : ''}`);
        resolve(ret === 0);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function doTask({ taskId, completedTimes, configTargetTimes, taskName }) {
  return new Promise(async resolve => {
    if (parseInt(completedTimes) >= parseInt(configTargetTimes)) {
      resolve(false);
      $.log(`\n${taskName}[做任务]： mission success`);
      return;
    }
    $.get(taskListUrl('DoTask', `taskId=${taskId}&_stk=_time%2CbizCode%2CconfigExtra%2Csource%2CtaskId`), (err, resp, data) => {
      try {
        const { msg, ret } = JSON.parse(data);
        $.log(
          `\n${taskName}[做任务]：${msg.indexOf('活动太火爆了') !== -1 ? '任务进行中或者未到任务时间' : msg}${
            $.showLog ? '\n' + data : ''
          }`,
        );
        resolve(ret === 0);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function investElectric() {
  return new Promise(async resolve => {
    if (!$.autoCharge) {
      $.result.push('【投入电力】：未打开自动投入');
      resolve();
      return;
    }
    $.get(
      taskUrl('userinfo/InvestElectric', `productionId=${$.info.productionInfo.productionId}`),
      (err, resp, data) => {
        try {
          const { msg, data: { investElectric } = {} } = JSON.parse(data);
          $.log(`\n投入电力: ${investElectric ? investElectric : ''} ${msg}\n${$.showLog ? data : ''}`);
          $.result.push(`【投入电力】：${investElectric}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      },
    );
  });
}

function getHireRewardList() {
  return new Promise(async resolve => {
    $.get(taskUrl('friend/QueryHireReward'), async (err, resp, data) => {
      try {
        const { ret, data: { hireReward = [] } = {}, msg } = JSON.parse(data);
        $.log(`\n获取打工奖励列表：${msg}\n${$.showLog ? data : ''}`);
        if (hireReward && hireReward.length > 0) {
          for (let i = 0; i < hireReward.length; i++) {
            const { date } = hireReward[i];
            await hireAward(`date=${date}`);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function hireAward(body) {
  return new Promise(async resolve => {
    $.get(taskUrl('friend/HireAward', `${body}&_stk=_time%2Cdate%2Ctype%2Czone`), async (err, resp, data) => {
      try {
        const { msg, data: { investElectric } = {} } = JSON.parse(data);
        $.log(`\n收取打工电力：${msg}\n${$.showLog ? data : ''}`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function getFriends() {
  return new Promise(async resolve => {
    $.get(taskUrl('friend/QueryFactoryManagerList'), async (err, resp, data) => {
      try {
        const { msg, data: { list = [] } = {} } = JSON.parse(data);
        $.log(`\n获取工厂好�