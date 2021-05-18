

function getTuanId() {
  return new Promise(async resolve => {
    $.get(taskUrl('tuan/QueryActiveConfig', `activeId=TvjO5k4gaVqVHMRJIogd_g%3D%3D`), async (err, resp, data) => {
      try {
        const { msg, data: { userTuanInfo } = {} } = JSON.parse(data);
        $.log(`\n获取团id：${msg}\n${$.showLog ? data : ''}`);
        if (!userTuanInfo || !userTuanInfo.tuanId) {
          await createTuan();
        } else {
          const tuanInfo = await getTuanInfo(`tuanId=${userTuanInfo.tuanId}`);
          $.log(`获取团详情成功 \n${$.showLog ? JSON.stringify(tuanInfo) : ''}`);
          if ((!tuanInfo || tuanInfo.realTuanNum === tuanInfo.tuanNum || tuanInfo.endTime < Math.ceil(new Date().getTime() / 1000)) && userTuanInfo.surplusOpenTuanNum > 0) {
            await createTuan();
          } else {
            $.userTuanInfo = tuanInfo;
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

function getTuanInfo(body) {
  return new Promise(async resolve => {
    $.get(taskUrl('tuan/QueryTuan', `activeId=TvjO5k4gaVqVHMRJIogd_g%3D%3D&${body}`), async (err, resp, data) => {
      try {
        const { msg, data: { tuanInfo = [] } = {} } = JSON.parse(data);
        $.log(`\n获取开团信息：${msg}\n${$.showLog ? data : ''}`);
        if (tuanInfo && tuanInfo[0]) {
          resolve(tuanInfo[0]);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function submitTuanId(userName) {
  return new Promise(resolve => {
    if (!$.userTuanInfo || !$.userTuanInfo.tuanId) {
      resolve();
      return;
    }
    $.log('你的团码: ' + $.userTuanInfo && $.userTuanInfo.tuanId);
    $.post(
      {
        url: `https://api.ninesix.cc/api/jx-factory-tuan/${$.userTuanInfo.tuanId}/${encodeURIComponent(userName)}`,
      },
      (err, resp, _data) => {
        try {
          const { data = {} } = JSON.parse(_data);
          $.log(`\n团码提交成功：${data.value}\n${$.showLog ? _data : ''}`);
          if (data.value) {
            $.result.push('团码提交成功！');
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

function createTuan() {
  return new Promise(async resolve => {
    $.get(
      taskTuanUrl('tuan/CreateTuan', `activeId=TvjO5k4gaVqVHMRJIogd_g%3D%3D&isOpenApp=1&_stk=_time%2CactiveId%2CisOpenApp`),
      async (err, resp, _data) => {
        try {
          const { msg, data = {} } = JSON.parse(_data);
          $.log(`\n开团信息：${msg}\n${$.showLog ? _data : ''}`);
          if (data) {
            $.userTuanInfo = { ...$.userTuanInfo, ...data };
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

function joinTuan() {
  return new Promise(async resolve => {
    $.get({ url: 'https://api.ninesix.cc/api/jx-factory-tuan' }, (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n${data.value}\n${$.showLog ? _data : ''}`);
        $.get(
          taskTuanUrl('tuan/JoinTuan', `activeId=TvjO5k4gaVqVHMRJIogd_g%3D%3D&tuanId=${data.value}`),
          async (err, resp, data) => {
            try {
              const { msg } = JSON.parse(data);
              $.log(
                `\n参团：${msg.indexOf('成功参团') !== -1 ? '您已参过此团或者参团失败' : msg}\n${
                  $.showLog ? data : ''
                }`,
              );
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve();
            }
          },
        );
      } catch (e) {
        $.logErr(e, resp);
        resolve();
      }
    });
  });
}

function awardTuan() {
  return new Promise(async resolve => {
    if (!$.userTuanInfo || !$.userTuanInfo.tuanId) {
      resolve();
      return;
    }
    $.get(
      taskTuanUrl('tuan/Award', `activeId=cKw-LGBsjl0XLu9coQ0d4A%3D%3D&tuanId=${$.userTuanInfo.tuanId}`),
      async (err, resp, data) => {
        try {
          const { ret, msg, data: { electric = 0 } = {} } = JSON.parse(data);
          if (ret === 0) {
            $.log(`\n领取开团奖励：${msg}，获得电力 ${electric}\n${$.showLog ? data : ''}`);
            await createTuan();
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

function showMsg() {
  return new Promise(resolve => {
    if (!$.info || !$.info.commodityInfo || !$.info.commodityInfo.name) {
      $.result.push('未选择商品，任务已执行完成，请及时选择商品');
    }
    if ($.notifyTime) {
      const notifyTimes = $.notifyTime.split(',').map(x => x.split(':'));
      const now = $.time('HH:mm').split(':');
      $.log(`\n${JSON.stringify(notifyTimes)}`);
      $.log(`\n${JSON.stringify(now)}`);
      if (notifyTimes.some(x => x[0] === now[0] && (!x[1] || x[1] === now[1]))) {
        $.msg($.name, '', `\n${$.result.join('\n')}`);
      }
    } else {
      $.msg($.name, '', `\n${$.result.join('\n')}`);
    }
    resolve();
  });
}

function taskUrl(function_path, body) {
  return {
    url: `${JD_API_HOST}dreamfactory/${function_path}?${body}&zone=dream_factory&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now()}`,
    headers: {
      Cookie: $.currentCookie,
      Accept: `*/*`,
      Connection: `keep-alive`,
      Referer: `https://st.jingxi.com/pingou/dream_factory/index.html`,
      'Accept-Encoding': `gzip, deflate, br`,
      Host: `m.jingxi.com`,
      'User-Agent': `jdpingou;iPhone;3.16.0;14.2.1;f803928b71d2fcd51c7eae549f7bc3062d17f63f;network/wifi;model/iPhone13,2;appBuild/100374;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/64;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
      'Accept-Language': `zh-cn`,
    },
  };
}

function taskListUrl(function_path, body) {
  return {
    url: `${JD_API_HOST}newtasksys/newtasksys_front/${function_path}?${body}&source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now()}`,
    headers: {
      Cookie: $.currentCookie,
      Accept: `*/*`,
      Connection: `keep-alive`,
      Referer: `https://st.jingxi.com/pingou/dream_factory/index.html`,
      'Accept-Encoding': `gzip, deflate, br`,
      Host: `m.jingxi.com`,
      'User-Agent':
        'jdpingou;iPhone;3.15.2;14.2;f803928b71d2fcd51c7eae549f7bc3062d17f63f;network/4g;model/iPhone11,8;appBuild/100365;ADID/0E38E9F1-4B4C-40A4-A479-DD15E58A5623;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/2;pap/JA2015_311210;brand/apple;supportJDSHWK/1;',
      'Accept-Language': `zh-cn`,
    },
  };
}

function taskAssistUrl(function_path, body) {
  return {
    url: `${JD_API_HOST}dreamfactory/${function_path}?${body}&zone=dream_factory&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now()}`,
    headers: {
      Cookie: $.currentCookie,
      Accept: `*/*`,
      Connection: `keep-alive`,
      Referer: `https://st.jingxi.com/pingou/dream_factory/index.html`,
      'Accept-Encoding': `gzip, deflate, br`,
      Host: `m.jingxi.com`,
      'Accept-Language': `zh-cn`,
    },
  };
}

function taskTuanUrl(function_path, body) {
  return {
    url: `${JD_API_HOST}dreamfactory/${function_path}?${body}&zone=dream_factory&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now()}`,
    headers: {
      Cookie: $.currentCookie,
      Accept: `*/*`,
      Connection: `keep-alive`,
      Referer: `https://st.jingxi.com/pingou/dream_factory/index.html`,
      'Accept-Encoding': `gzip, deflate, br`,
      Host: `m.jingxi.com`,
      'Accept-Language': `zh-cn`,
      'User-Agent': 'jdpingou;',
    },
  };
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+