/*
tgchannel：https://t.me/Ariszy_Scripts
github：https://github.com/Ariszy/script
boxjs：https://raw.githubusercontent.com/Ariszy/Private-Script/master/Ariszy.boxjs.json
转载留个名字，谢谢
邀请码：AVJ6

谢谢
作者：执意Ariszy
#看一次广告获取ck

[mitm]
hostname = pingyouquan.com
#圈x
[rewrite local]
https://pingyouquan.com/tp5/public/index.php/app/gold/adv url script-request-body https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/pyq.js


#loon
http-request https://pingyouquan.com/tp5/public/index.php/app/gold/adv script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/pyq.js, requires-body=true, timeout=10, tag=评有圈


#surge
评有圈 = type=http-request,pattern=https://pingyouquan.com/tp5/public/index.php/app/gold/adv,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/pyq.js,script-update-interval=0

*/

const Ariszy = '评有圈'
const $ = Env(Ariszy)
const notify = $.isNode() ?require('./sendNotify') : '';
let status,commentid;
status = (status = ($.getval("pyqstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
pyqUAArr = [],pyqadArr = []
let pyqUA = $.getdata('pyqUA')
let pyqad = $.getdata('pyqad')
let last_id = ($.getdata('last_id') || 1880000)
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invite=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
var id = ''
var texts = ["整不错","真挺好","美丽啊","漂亮啊","说的对","整不错","真挺好","美丽啊","漂亮啊","说的对"]
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
   if (process.env.PYQUA && process.env.PYQUA.indexOf('#') > -1) {
   pyqUA = process.env.PYQUA.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.PYQUA && process.env.PYQUA.indexOf('\n') > -1) {
   pyqUA = process.env.PYQUA.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   pyqUA = process.env.PYQUA.split()
  };
  if (process.env.PYQAD && process.env.PYQAD.indexOf('#') > -1) {
   pyqad = process.env.PYQAD.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.PYQAD && process.env.PYQAD.indexOf('\n') > -1) {
   pyqad = process.env.PYQAD.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   pyqad = process.env.PYQAD.split()
  };
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    pyqUAArr.push($.getdata('pyqUA'))
    pyqadArr.push($.getdata('pyqad'))
    let pyqcount = ($.getval('pyqcount') || '1');
  for (let i = 2; i <= pyqcount; i++) {
    pyqUAArr.push($.getdata(`pyqUA${i}`))
    pyqadArr.push($.getdata(`pyqad${i}`))
  }
}
!(async () => {
if (!pyqUAArr[0] && !pyqadArr[0]) {
    $.msg($.name, '【提示】请先获取评有圈一cookie')
    return;
  }
   console.log(`------------- 共${pyqadArr.length}账号----------------\n`)
  for (let i = 0; i < pyqadArr.length; i++) {
    if (pyqadArr[i]) {
      message = ''
      pyqUA = pyqUAArr[i];
      pyqad = pyqadArr[i];
      $.index = i + 1;
      console.log(`\n开始【评有圈${$.index}】`)
      await control() 
      //await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
    
function GetCookie() {
if($request&&$request.url.indexOf("adv")>=0) {
   const pyqUA = $request.headers['User-Agent']
    if(pyqUA) $.setdata(pyqUA,`pyqUA${status}`)
    $.log(`[${Ariszy}] 获取pyqUA请求: 成功,pyqUA: ${pyqUA}`)
    $.msg(`pyqUA${status}: 成功🎉`, ``)
}
if($request&&$request.url.indexOf("adv")>=0) {
   const pyqad = $request.body
    if(pyqad)    $.setdata(pyqad,`pyqad${status}`)
    $.log(`[${Ariszy}] 获取pyqad请求: 成功,pyqad: ${pyqad}`)
    $.msg(`pyqad${status}: 成功🎉`, ``)
}
}
async function control(){
id = Number(last_id) + 1;
$.setdata(`${id}`,'last_id')
let index = Math.round(Math.random()*10)
text = texts[index]
await qd()
await $.wait(10000)
await tp_d()
await $.wait(10000)
await tp()
await $.wait(10000)
await comment()
await $.wait(10000)
await comment_list()
await $.wait(10000)
await fx()
await $.wait(10000)
await ad()
}
//qd
async function qd(){
let token = pyqad.match(/\w{64}/)
let uid = pyqad.match(/\d{6}/)
 return new Promise((resolve) => {
    let qd_url = {
   		url: `https://pingyouquan.com/tp5/public/index.php/app/activity/qd`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `{"uid":${uid},"token":"${token}"}`,
        method: 'put'
    	}
   $.post(qd_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log("签到"+result.msg+'\n')
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }  
//tp
async function tp(){
let uid = pyqad.match(/\d{6}/)
$.log('点赞图文id为：'+id)
 return new Promise((resolve) => {
    let tp_url = {
   		url: `https://pingyouquan.com/tp5/public/index.php/app/thunp/tp`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `{"pid":${id},"uid":${uid},"type":1}`
    	}
   $.post(tp_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log(result.msg+'\n')
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  } 
//tp_d
async function tp_d(){
$.log('取消点赞id为：'+last_id)
let uid = pyqad.match(/\d{6}/)
 return new Promise((resolve) => {
    let tp_d_url = {
   		url: `https://pingyouquan.com/tp5/public/index.php/app/thunp/tp_d`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `{"pid":${last_id},"uid":${uid},"type":1}`
    	}
   $.post(tp_d_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log(result.msg+'\n')
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  } 
//comment
async function comment(){
$.log('评论内容为：'+text)
let uid = pyqad.match(/\d{6}/)
 return new Promise((resolve) => {
    let comment_url = {
   	url: 'https://pingyouquan.com/tp5/public/index.php/app/comment/add',
    	headers: {"Accept": "*/*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-Hans-CN;q=1","Connection": "keep-alive","Content-Length": "285","Content-Type": "multipart/form-data; boundary=Boundary+770BDF565E40490B","Host": "pingyouquan.com","User-Agent": "PinYouQuan/1.1.2 (iPhone; iOS 13.3; Scale/2.00)"},
    	body: `--Boundary+770BDF565E40490B
Content-Disposition: form-data; name="cid"

${id}
--Boundary+770BDF565E40490B
Content-Disposition: form-data; name="text"

${text}
--Boundary+770BDF565E40490B
Content-Disposition: form-data; name="uid"

${uid}
--Boundary+770BDF565E40490B--
`
    	}
   $.post(comment_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log(result.msg+'\n')
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//comment list
async function comment_list(){
$.log('删除评论内容为：'+text)
let uid = pyqad.match(/\d{6}/)
 return new Promise((resolve) => {
    let comment_list_url = {
   		url: `https://pingyouquan.com/tp5/public/index.php/app/comment/list1`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `{"uid":${uid},"cid":${id}}`
    	}
   $.post(comment_list_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        let commentArr = result.list.find(item => item.uid == uid)
        commentid = commentArr.id
        if(commentid){
        console.log('评论'+result.msg+',开始删除评论')
        await commentdel()
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  } 
//del comment
async function commentdel(){
let uid = pyqad.match(/\d{6}/)
 return new Promise((resolve) => {
    let commentdel_url = {
   		url: `https://pingyouquan.com/tp5/public/index.php/app/comment/commentdel`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `{"uid":${uid},"cid":${commentid}}`
    	}
   $.post(commentdel_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log('评论'+result.msg+'\n')
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  } 
//fx
async function fx(){
let uid = pyqad.match(/\d{6}/)
 return new Promise((resolve) => {
    let fx_url = {
   		url: `https://pingyouquan.com/tp5/public/index.php/app/fx`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `{"cid":${id},"uid":${uid}}`
    	}
   $.post(fx_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log('分享'+result.msg+'\n')
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
   		url: `https://pingyouquan.com/tp5/public/index.php/app/gold/adv`,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "pingyouquan.com",
          "User-Agent": `${pyqUA}`
          },
        body: `${pyqad}`
    	}
   $.post(ad_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        console.log('广告'+result.msg+'\n')
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
   if ($.isNode()){
       await notify.sendNotify($.name,message)
   }else{
       $.msg(Ariszy,'',message)
   }
 }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    /*
羊毛很少、自己取舍，每天2-3毛，但是比较稳，没听说过封号，可能玩的人少，公司比较大（快手）阅读全是签名，这个脚本基于小bug用的签名随时可能失效

github：https://github.com/Ariszy/script
转载留个名字，谢谢
邀请码：JFN4M3
作者：执意Ariszy
目前包含：
签到
时段奖励
大转盘
红包雨
金币悬赏任务

#签到或者签到详情页面获取ck
kkdsign
#获取一次时段奖励获得cookie
kkdheader和kkdcookie

ACTION YML
KKDHEADER-kkdheader
KKDCOOKIE-kkdcookie
KKDSIGN-kkgsign

[mitm]
hostname = api.yuncheapp.cn
#圈x
[rewrite local]
^https:\/\/api\.yuncheapp\.cn\/pearl-incentive\/api\/v1\/task\/intervalAward\/receive url script-request-header https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/kkd.js
^https://api.yuncheapp.cn/pearl-incentive/api/v1/task/signIn/* url script-request-header https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/kkd.js

#loon
http-request ^https:\/\/api\.yuncheapp\.cn\/pearl-incentive\/api\/v1\/task\/intervalAward\/receive script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/kkd.js, requires-body=true, timeout=10, tag=快看点cookie
http-request ^https://api.yuncheapp.cn/pearl-incentive/api/v1/task/signIn/* script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/kkd.js, requires-body=true, timeout=10, tag=快看点kkdsign

#surge
kkdcookie = type=http-request,pattern=^https:\/\/api\.yuncheapp\.cn\/pearl-incentive\/api\/v1\/task\/intervalAward\/receive,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/kkd.js,script-update-interval=0
kkdcookie = type=http-request,pattern=^https://api.yuncheapp.cn/pearl-incentive/api/v1/task/signIn/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Ariszy/Private-Script/master/Scripts/kkd.js,script-update-interval=0

*/
const jsname='快看点'
const $ = Env(jsname)
const notify = $.isNode() ? require('./sendNotify') : '';
$.idx = ($.idx = ($.getval("kkdcount") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 账号扩展字符
const kkdheaderArr=[]
const kkdcookieArr=[]
const kkdsignArr=[]
let kkdheader = $.getdata('kkdheader')
let kkdcookie = $.getdata('kkdcookie')
let kkdsign = $.getdata('kkdsign')
const logs = false //日志
const invite = 1; //邀请码1为邀请
let tz = ($.getval('tz') || '1');//通知
const invited = '';
let lTadlist = '15884282854261489762';
let gRadlist = '15884282854261489762';
let eXadlist = '15884282854261489762';
var message='';

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
  if (process.env.KKDHEADER && process.env.KKDHEADER.indexOf('#') > -1) {
   kkdheader = process.env.KKDHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.KKDHEADER && process.env.KKDHEADER.indexOf('\n') > -1) {
   kkdheader = process.env.KKDHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   kkdheader = process.env.KKDHEADER.split()
  };
  if (process.env. KKDCOOKIE&& process.env.KKDCOOKIE.indexOf('#') > -1) {
   kkdcookie = process.env.KKDCOOKIE.split('#');
  }
  else if (process.env.KKDCOOKIE && process.env.KKDCOOKIE.split('\n').length > 0) {
   kkdcookie = process.env.KKDCOOKIE.split('\n');
  } else  {
   kkdcookie = process.env.KKDCOOKIE.split()
  };
  if (process.env. KKDSIGN&& process.env.KKDSIGN.indexOf('#') > -1) {
   kkdsign = process.env.KKDSIGN.split('#');
  }
  else if (process.env.KKDSIGN && process.env.KKDSIGN.split('\n').length > 0) {
   kkdsign = process.env.KKDSIGN.split('\n');
  } else  {
   kkdsign = process.env.KKDSIGN.split()
  };
  Object.keys(kkdheader).forEach((item) => {
        if (kkdheader[item]) {
          kkdheaderArr.push(kkdheader[item])
        }
    });
    Object.keys(kkdcookie).forEach((item) => {
        if (kkdcookie[item]) {
          kkdcookieArr.push(kkdcookie[item])
        }
    });
   Object.keys(kkdsign).forEach((item) => {
        if (kkdsign[item]) {
          kkdsignArr.push(kkdsign[item])
        }
    });
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    kkdheaderArr.push($.getdata('kkdheader'))
    kkdcookieArr.push($.getdata('kkdcookie'))
    kkdsignArr.push($.getdata('kkdsign'))
    let kkdcount = ($.getval('kkdcount') || '1');
  for (let i = 2; i <= kkdcount; i++) {
    kkdheaderArr.push($.getdata(`kkdheader${i}`))
    kkdcookieArr.push($.getdata(`kkdcookie${i}`))
    kkdsignArr.push($.getdata(`kkdsign${i}`))
  }
}
!(async () => {
if (!kkdcookieArr[0]) {
    $.msg($.name, '【提示】请先获取快看点一cookie')
    return;
  }
   console.log(`------------- 共${kkdcookieArr.length}个账号----------------\n`)
  for (let i = 0; i < kkdcookieArr.length; i++) {
    if (kkdcookieArr[i]) {
      other = ''
      kkdheader = kkdheaderArr[i];
      kkdcookie = kkdcookieArr[i];
      kkdsign = kkdsignArr[i];
      $.index = i + 1;
      console.log(`\n开始【快看点${$.index}】`)
      await userinfo()
      await signin()
      await control()
      await intervalAward()
      await lotteryTable()
      await lotteryTable_getcoins()
      //广告来源大转盘
      await lotteryTable1()
      await extra_getcoins()
      await giftRain()
      await giftRain_getcoins()
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
function GetCookie() {
 if($request&&$request.url.indexOf("intervalAward")>=0) {
  const kkdheader = $request.url.split(`?`)[1]
    if (kkdheader) $.setdata(kkdheader,`kkdheader${$.idx}`)
    $.log(`[${jsname}] 获取kkdheader请求: 成功,kkdheader: ${kkdheader}`)
    $.msg(`获取kkdheader: 成功🎉`, ``)
  const kkdcookie = $request.headers['Cookie']
    if (kkdcookie) $.setdata(kkdcookie,`kkdcookie${$.idx}`)
    $.log(`[${jsname}] 获取kkdcookie请求: 成功,kkdcookie: ${kkdcookie}`)
    $.msg(`获取kkdcookie: 成功🎉`, ``)
    }
if($request&&$request.url.indexOf("finish")>=0) {
  const kkdbody = $request.body
    if (kkdbody) $.setdata(kkdbody,`kkdbody${$.idx}`)
    $.log(`[${jsname}] 获取kkdbody请求: 成功,kkdbody: ${kkdbody}`)
    $.msg(`获取kkdbody: 成功🎉`, ``)
    }
if($request&&$request.url.indexOf("signIn")>=0) {
  const kkdsign = $request.url.split(`?`)[1]
    if (kkdsign) $.setdata(kkdsign,`kkdsign${$.idx}`)
    $.log(`[${jsname}] 获取kkdsign请求: 成功,kkdsign: ${kkdsign}`)
    $.msg(`获取kkdsign: 成功🎉`, ``)
    }
  }
async function control(){
   if(invite == 1){
      await invitation();
   }
}
function invitation() {
return new Promise((resolve, reject) => {
  let invitatonurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/task/invite/verify?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
     body:'{"code": "JFN4M3"}'
}
   $.post(invitatonurl,(error, response, data) =>{
     const result = JSON.parse(data)
      resolve()
    })
   })
  } 
//个人信息
function userinfo() {
return new Promise((resolve, reject) => {
  let userinfourl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/user/tabV2?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
     body:'{}'
}
   $.post(userinfourl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs) $.log(data)
      if(result.message == 'success') {
          message +='🎉'+result.data.userInfo.nickname+'-今日已得:'+result.data.userInfo.todayCoins+'-现有余额:'+result.data.userInfo.coins+'\n'
  
}     else{
          message += '⚠️异常'+result.message+'\n'
}
          resolve()
    })
   })
  } 
//signin
function signin() {
return new Promise((resolve, reject) => {
  let signinurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/task/signIn/add?${kkdsign}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
     body:'{}'
}
   $.get(signinurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs) $.log(data)
      message += '📣签到\n'
      if(result.message == 'success') {
          message +='🎉'+result.data.title+','+result.data.subtitle+'\n'
  
}     else{
          message += '⚠️异常'+result.message+'\n'
}
          resolve()
    })
   })
  } 
//大转盘
function lotteryTable() {
return new Promise((resolve, reject) => {
  let lotteryTableurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/lotteryTable/drawV2?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
     body:'{}'
}

   $.post(lotteryTableurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs) $.log(data)
        message += '📣超级大转盘\n'
      if(result.message == 'success') {
        message += '🔔恭喜获得:'+result.data.content+','
        lTadlist = result.data.adPondInfo.adInfos[0].adLlsid
        }
      else{
        message += '⚠️异常:'+result.message+'\n'
        }
          resolve()
    })
   })
  }  

//大转盘双倍or神秘宝箱
function lotteryTable_getcoins() {
//const lTbody = kkdbody.replace("GIFTRAIN_INCENTIVE","LOTTERYTABLE_INCENTIVE");
//const lTbody = kkdbody.replace(/adLlsid":"\d+/,`adLlsid":"${lTadlist}`);
//$.log('111111'+lTadlist)
return new Promise((resolve, reject) => {
  let lotteryTable_getcoinsurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/ad/finish?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
     body:`{"adPositionType":"LOTTERYTABLE_INCENTIVE","insertCnt":0,"adCodeId":"1300213002001","serverEcpm":0,"ttl":0,"requestCnt":0,"adProvider":"KS_NEW","adRet":true,"resultExpire":0,"keyString":"1300213002001KS_NEW","endAd":false,"requestStartTime":0,"adBizType":"LOTTERY_TABLE","renderType":0,"adToken":"","adLlsid":"${lTadlist}","isPreload":false,"adAward":0}`
}

   $.post(lotteryTable_getcoinsurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      if(result.message == 'success') {
        message += +result.data.coins+'金币\n'
        }
      else{
        message +='⚠️异常:'+result.message+'\n'
           }
          resolve()
    })
   })
  }  
//时段奖励
function intervalAward() {
return new Promise((resolve, reject) => {
  let intervalAwardurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/task/intervalAward/receive?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          }
}
   $.post(intervalAwardurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)  $.log(data)
       message +='📣时段奖励\n'
      if(result.message == 'success') {
        message += result.data.title+',获得:'+result.data.coins+'金币\n'
        }
      else{
        message +='⚠️异常:'+result.message+'\n'
           }
          resolve()
    })
   })
  } 
//红包雨
function giftRain() {
return new Promise((resolve, reject) => {
  let giftRainurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/giftRain/receive?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
    body:'{"coins":40}'
}

   $.post(giftRainurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      message +='📣红包雨\n'
      if(result.message == 'success') {
        message += result.data.adPondInfo.buttonText+'\n'
        gRadlist = result.data.adPondInfo.adInfos[0].adLlsid
        }else{
        message +='⚠️异常:'+result.message+'\n'
           }
          resolve()
    })
   })
  }  
//红包雨奖励
function giftRain_getcoins() {
return new Promise((resolve, reject) => {
  let giftRain_getcoinsurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/ad/finish?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
   body:`{"adPositionType":"GIFTRAIN_INCENTIVE","insertCnt":0,"adCodeId":"1300213002003","serverEcpm":0,"ttl":0,"requestCnt":0,"adProvider":"KS_NEW","adRet":true,"resultExpire":0,"keyString":"1300213002003KS_NEW","endAd":false,"requestStartTime":0,"renderType":0,"adToken":"","adLlsid":"${gRadlist}","isPreload":false,"adAward":0}`
}
   $.post(giftRain_getcoinsurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      if(result.message == 'success') {
        message += result.data.coins+'金币\n'
        }
      else{
        message +='⚠️异常:'+result.message+'\n'
           }
          resolve()
    })
   })
  }  
//大转盘
function lotteryTable1() {
return new Promise((resolve, reject) => {
  let lotteryTableurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/lotteryTable/drawV2?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
     body:'{}'
}

   $.post(lotteryTableurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs) $.log(data)
        //message += '📣超级大转盘\n'
      if(result.message == 'success') {
        //message += '🔔恭喜获得:'+result.data.content+','
        eXadlist = result.data.adPondInfo.adInfos[0].adLlsid
        }
      else{
        //message += '⚠️异常:'+result.message+'\n'
        }
          resolve()
    })
   })
  }  

//金币悬赏任务
function extra_getcoins() {
return new Promise((resolve, reject) => {
  let giftRain_getcoinsurl ={
    url: `https://api.yuncheapp.cn/pearl-incentive/api/v1/ad/finish?${kkdheader}`,
    headers: {
              Cookie: kkdcookie,
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
              'Host': 'api.yuncheapp.cn',
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
          },
   body:`{"adRet":true,"adCodeId":"1300213002001","adProvider":"KS_NEW","adLlsid":"${eXadlist}","adToken":"","adPositionType":"COIN_REWARD_INCENTIVE","adBizType":"COIN_REWARD"}`
}
   $.post(giftRain_getcoinsurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      message +='📣金币悬赏任务\n'
      if(result.message == 'success') {
        message += result.data.toast+'\n'
        }
      else{
        message +='⚠️异常:'+result.message+'\n'
           }
          resolve()
    })
   })
  } 
async function showmsg() {
    if (tz == 1) {
      if ($.isNode()) {
        if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
          await notify.sendNotify($.name, message)
        } else {
          $.log(message)
        }
      } else {
        if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
          $.msg(jsname, '', message)
        } else {
          $.log(message)
        }
      }
    } else {
      $.log(message)
  }
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            /*
 * @Author: whyour
 * @Github: https://github.com/whyour
 * @Date: 2020-12-24 11:30:44
 * @LastEditors: whyour
 * @LastEditTime: 2021-03-23 20:57:22
 * 参考 shylocks https://github.com/shylocks

  quanx:
  [task_local]
  10 * * * * https://raw.githubusercontent.com/whyour/hundun/master/quanx/jd_zjd_tuan.js, tag=京东赚京东开团, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jd_syj.png, enabled=true

  loon:
  [Script]
  cron "10 * * * *" script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jd_zjd_tuan.js, tag=京东赚京东开团

  surge:
  [Script]
  京东赚京东开团 = type=cron,cronexp=10 * * * *,timeout=60,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jd_zjd_tuan.js,
 *
 *
 **/

const $ = new Env('京东赚京豆开团');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const JD_API_HOST = 'https://api.m.jd.com/client.action';
$.cookiesArr = [];
$.currentCookie = '';
$.tuan = null;

!(async () => {
  if (!getCookies()) return;
  for (let i = 0; i < $.cookieArr.length; i++) {
    $.currentCookie = $.cookieArr[i];
    if ($.currentCookie) {
      const userName = decodeURIComponent(
        $.currentCookie.match(/pt_pin=(.+?);/) && $.currentCookie.match(/pt_pin=(.+?);/)[1],
      );
      console.log(`\n开始【京东账号${i + 1}】${userName}`);
      await getUserTuanInfo();
      await submitInviteId(userName);
      await helpFriendTuan();
    }
  }
})()
.catch((e) => $.logErr(e))
.finally(() => $.done());

function getCookies() {
  if ($.isNode()) {
    $.cookieArr = Object.values(jdCookieNode);
  } else {
    const CookiesJd = JSON.parse($.getdata("CookiesJD") || "[]").filter(x => !!x).map(x => x.cookie);
    $.cookieArr = [$.getdata("CookieJD") || "", $.getdata("CookieJD2") || "", ...CookiesJd].filter(x=>!!x);
  }
  if (!$.cookieArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/',
    });
    return false;
  }
  return true;
}

function submitInviteId(userName) {
  return new Promise(resolve => {
    if (!$.tuan || !$.tuan.assistedPinEncrypted || !$.tuan.assistStartRecordId || !$.tuan.activityIdEncrypted) {
      resolve();
      return;
    }
    $.log(`\n你的互助码: ${JSON.stringify($.tuan)}`);
    $.post(
      {
        url: `https://api.ninesix.cc/api/jd-zjd-tuan/${encodeURIComponent(userName)}?assistedPinEncrypted=${
          encodeURIComponent($.tuan.assistedPinEncrypted)
        }&assistStartRecordId=${$.tuan.assistStartRecordId}&activityIdEncrypted=${encodeURIComponent($.tuan.activityIdEncrypted)}`,
      },
      (err, resp, _data) => {
        try {
          const { code, data = {} } = JSON.parse(_data);
          $.log(`\n邀请码提交：${code}\n${$.showLog ? _data : ''}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      },
    );
  });
}

function helpFriendTuan() {
  return new Promise(resolve => {
    $.get({ url: `https://api.ninesix.cc/api/jd-zjd-tuan` }, async (err, resp, _data) => {
      try {
        const { code, data = {} } = JSON.parse(_data);
        $.log(`\n获取随机助力码${code}\n${$.showLog ? _data : ''}`);
        const body = { ...data.extra, channel: 'FISSION_BEAN' };
        $.get(taskTuanUrl('vvipclub_distributeBean_assist', body), async (err, resp, data) => {
          try {
            $.log(data);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve(data);
          }
        });
      } catch (e) {
        $.logErr(e, resp);
        resolve();
      }
    });
  });
}

function getUserTuanInfo() {
  let body = { paramData: { channel: 'FISSION_BEAN' } };
  return new Promise(resolve => {
    $.get(taskTuanUrl('distributeBeanActivityInfo', body), async (err, resp, data) => {
      try {
        $.log(data);
        const { success, data: { id, canStartNewAssist, encPin, assistStartRecordId } = {} } = JSON.parse(data);
        if (success) {
          if (!canStartNewAssist) {
            $.tuan = {
              activityIdEncrypted: id,
              assistStartRecordId: assistStartRecordId,
              assistedPinEncrypted: encPin,
            };
          } else {
            createTuan(id);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    });
  });
}

function createTuan(id) {
  let body = { activityIdEncrypted: id, channel: 'FISSION_BEAN' };
  return new Promise(resolve => {
    $.get(taskTuanUrl('vvipclub_distributeBean_startAssist', body), async (err, resp, data) => {
      try {
        $.log(data);
        data = JSON.parse(data);
        if (data.success) {
          await getUserTuanInfo();
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    });
  });
}

function taskTuanUrl(function_id, body = {}) {
  return {
    url: `${JD_API_HOST}?functionId=${function_id}&body=${encodeURIComponent(
      JSON.stringify(body),
    )}&appid=swat_miniprogram&client=tjj_m&screen=1920*1080&osVersion=5.0.0&networkType=wifi&sdkName=orderDetail&sdkVersion=1.0.0&clientVersion=3.1.3&area=1_72_4137_0&fromType=wxapp&timestamp=${Date.now()}`,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-cn',
      Connection: 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: 'api.m.jd.com',
      Referer: 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
      Cookie: $.currentCookie,
      'User-Agent': 'jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0',
    },
  };
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          