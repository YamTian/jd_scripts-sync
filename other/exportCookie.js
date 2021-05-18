/*
tgchannel：https://t.me/Ariszy_Script
github：https://github.com/Ariszy/script
boxjs：https://raw.githubusercontent.com/Ariszy/Private-Script/master/Ariszy.boxjs.json
转载留个名字，谢谢
邀请码：7672016831
谢谢
作者：执意Ariszy
#签到界面或者签到详情
#读书任务可以完成，时长上传没做好，广告偶尔可以
[mitm]
hostname = *.snssdk.com
#圈x
[rewrite local]
luckycat/novel/v1/task/sign_in/* url script-request-header https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/fqxs.js


#loon
http-request luckycat/novel/v1/task/sign_in/* script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/fqxs.js, requires-body=true, timeout=10, tag=🍅番茄小说


#surge
🍅番茄小说 = type=http-request,pattern=luckycat/novel/v1/task/sign_in/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/fqxs.js,script-update-interval=0

*/

const Ariszy = '🍅番茄小说'
const $ = Env(Ariszy)
const notify = $.isNode() ?require('./sendNotify') : '';
let status,no;
status = (status = ($.getval("fqxsstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const fqxsurlArr = [],fqxsArr = []
let fqxaurl = $.getdata('fqxsurl')
let fqxs= $.getdata('fqxs')
let host = $.getdata('host')
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invite=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行
let isfqxsck = typeof $request !== 'undefined'
if (isfqxsck) {
   fqxsck();
   $.done()
}
if ($.isNode()) {
   if (process.env.FQXSURL && process.env.FQXSURL .indexOf('#') > -1) {
   fqxsurl = process.env.FQXSURL .split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.FQXSURL && process.env.FQXSURL .indexOf('\n') > -1) {
   fqxsurl = process.env.FQXSURL .split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   fqxsurl = process.env.FQXSURL .split()
  };
  if (process.env.FQXS&& process.env.FQXS.indexOf('#') > -1) {
   fqxs= process.env.FQXS.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.FQXS&& process.env.FQXS.indexOf('\n') > -1) {
   fqxs= process.env.FQXS.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   fqxs= process.env.FQXS.split()
  };
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    fqxsurlArr.push($.getdata('fqxsurl'))
    fqxsArr.push($.getdata('fqxs'))
    let fqxscount = ($.getval('fqxscount') || '1');
  for (let i = 2; i <= fqxscount; i++) {
    fqxsurlArr.push($.getdata(`fqxsurl${i}`))
    fqxsArr.push($.getdata(`fqxs${i}`))
  }
}
!(async () => {
if (!fqxsurlArr[0] && !fqxsArr[0] ) {
    $.msg($.name, '【提示】请先获取🍅番茄小说一cookie')
    return;
  }
   console.log(`------------- 共${fqxsurlArr.length}个账号----------------\n`)
  for (let i = 0; i < fqxsArr.length; i++) {
    if (fqxsArr[i]) {
      message = ''
      note = ''
      fqxsurl= fqxsurlArr[i];
      fqxs = fqxsArr[i];
      $.index = i + 1;
      console.log(`\n开始【番茄小说${$.index}】`)
      await task_list() 
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
function fqxsck() {
if($request&&$request.url.indexOf("sign_in")>=0) {
   const fqxsurl = $request.url.split('?')[1]
   if(fqxsurl)     $.setdata(fqxsurl,`fqxsurl${status}`)
   $.log(`[${Ariszy}] 获取fqxsurl请求: 成功,fqxsurl: ${fqxsurl}`)
   $.msg(`fqxsurl${status}: 成功🎉`, ``)
   const host = $request.headers['Host']
   if(host)   $.setdata(host,'host')
   $.log(`[${Ariszy}] 获取host请求: 成功,host: ${host}`)
   const fqxs = JSON.stringify($request.headers)
    if(fqxs)    $.setdata(fqxs,`fqxs${status}`)
    $.log(`[${Ariszy}] 获取fqxs请求: 成功,fqxs: ${fqxs}`)
    $.msg(`fqxs${status}: 成功🎉`, ``)
}
}
//task_list
async function task_list(){
 return new Promise((resolve) => {
    let task_list_url = {
   	url: `https://${host}/luckycat/novel/v1/task/list?${fqxsurl}polaris_page=client_task_page&new_bookshelf=1`,
    	headers: JSON.parse(fqxs),
    	}
   $.get(task_list_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        let qd_status = result.data.task_list.daily.find(item => item.task_id === 203)
        let sign_status = qd_status.completed
        if(!sign_status) 
        await sign_in()
        let yd_status_5 = result.data.task_list.daily.find(item => item.task_id === 1006)
        if(!yd_status_5.completed) 
        no = 5
        let yd_status_10 = result.data.task_list.daily.find(item => item.task_id === 1003)
        if(!yd_status_10.completed) 
        no = 10
        let yd_status_30 = result.data.task_list.daily.find(item => item.task_id === 1009)
        if(!yd_status_30.completed) 
        no = 30
        let yd_status_60 = result.data.task_list.daily.find(item => item.task_id === 1010)
        if(!yd_status_60.completed) 
        no = 60
        let yd_status_120 = result.data.task_list.daily.find(item => item.task_id === 1011)
        if(!yd_status_120.completed) 
        no = 120
        let yd_status_180 = result.data.task_list.daily.find(item => item.task_id === 1012)
        if(!yd_status_180.completed) 
        no = 180
        if(yd_status_180.completed && yd_status_120.completed && yd_status_120.completed && yd_status_60.completed && yd_status_30.completed && yd_status_10.completed && yd_status_5.completed){
        console.log('阅读任务已经完成\n')
        message += '阅读任务已经完成\n'
        }else{
        $.log('开始阅读任务\n')
        await read()
        }
        let sp_status = result.data.task_list.daily.find(item => item.task_id === 111)
        let video_status = sp_status.completed
        console.log('开始视频任务\n视频任务进度：'+sp_status.desc)
        if(!video_status) 
        await ad()
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//sign_in
async function sign_in(){
 return new Promise((resolve) => {
    let sign_in_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/sign_in?${fqxsurl}`,
    	headers: JSON.parse(fqxs),
    	body: `{}`
    	}
   $.post(sign_in_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log(result.err_tips+'获得'+result.data.amount+'🍅') 
        message += result.err_tips+'获得'+result.data.amount+'🍅\n'
        }else{
        console.log('签到任务：'+result.err_tips)
        message += '签到任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这是因为之前提交数据错误导致的\n')
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//read
async function read(){
 return new Promise((resolve) => {
    let read_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/daily_read_${no}m?${fqxsurl}`,
    	headers: JSON.parse(fqxs),
    	body: `{
  "new_bookshelf" : true,
  "task_key" : "daily_read_${no}m"
}`
    	}
   $.post(read_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log(`第${no}时段阅读`+result.err_tips+'获得'+result.data.amount+'🍅\n') 
        message += `第${no}时段阅读`+ result.err_tips+'获得'+result.data.amount+'🍅\n'
        }else{
        console.log('阅读任务：'+result.err_tips)
        message += '阅读任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这是因为之前提交数据错误导致的\n')
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//ad
async function ad(){
 return new Promise((resolve) => {
    let ad_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/excitation_ad?${fqxsurl}`,
    	headers: JSON.parse(fqxs),
    	body: `{
  "new_bookshelf" : true,
  "task_key" : "excitation_ad"
}`
    	}
   $.post(ad_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log('视频任务：'+result.err_tips+'获得'+result.data.amount+'🍅') 
        message += '视频任务：'+result.err_tips+'获得'+result.data.amount+'🍅'
        }else{
        console.log('视频任务：'+result.err_tips)
        message += '视频任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这个广告没找到解决办法')
        note = '\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号'
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//showmsg
async function showmsg(){
  if(tz == 1){
   if ($.isNode()){
       await notify.sendNotify($.name,message)
   }else{
       $.msg(Ariszy,'',message+note)
   }
  }else{
       console.log(message+note)
   }
 }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout