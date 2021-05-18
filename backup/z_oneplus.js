iOS" : "android",
    "appversioncode": `${$.version}`,
    "time": `${new Date().getTime()}`,
    "psign": "92dea068b6c271161be05ed358b59932",
    "apptoken": "xzwltoken070704",
    "appid": "xzwl",
    "appversion": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/account/openTimeBoxAccount.action",
      `jsondata=${escape(JSON.stringify(body))}`), async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data['ret'] === 'ok') {
              $.log(`宝箱奖励领取成功，获得 ${data.profit} 金币`)
              $.profit += data.profit
              if (data.advertPopup && data.advertPopup.position) {
                $.log(`去做额外【${data.advertPopup.buttonText}】任务`)
                await adv(data.advertPopup.position)
              }
            } else if (data['ret'] === 'fail') {
              $.log(`签到失败，错误信息：${data.rtn_msg}`)
            } else {
              $.log(`未知错误：${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function getArticle(artId) {
  let body = {
    "time": `${new Date().getTime()}`,
    "apptoken": "xzwltoken070704",
    "appversion": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "openid": $.openId,
    "channel": $.iOS ? "iOS" : "android",
    "os": $.iOS ? "iOS" : "android",
    "psign": "92dea068b6c271161be05ed358b59932",
    "artid": artId,
    "appid": "xzwl"
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/newmobile/articleDetail.action",
      `jsondata=${escape(JSON.stringify(body))}`), async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data['ret'] === 'ok') {
              $.log(`articleDetail 记录成功`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function getVideo(artId) {
  let body = {
    "appid": "xzwl",
    "channel": $.iOS ? "iOS" : "android",
    "psign": "92dea068b6c271161be05ed358b59932",
    "appversioncode": $.version.toString(),
    "time": new Date().getTime().toString(),
    "apptoken": "xzwltoken070704",
    "requestid": new Date().getTime().toString(),
    "openid": $.openId,
    "os": $.iOS ? "iOS" : "android",
    "artid": artId,
    "appversion": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "relate": "1",
    "scenetype": ""
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/newmobile/artDetail.action",
      `jsondata=${escape(JSON.stringify(body))}`), async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data['ret'] === 'ok') {
              $.log(`artDetail 记录成功`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function getStageReward(stage) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/weixin20/newactivity/getStageReward.action",
      `stage=${stage}`), async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data['ret'] === 'ok') {
              $.log(`阶段奖励${stage}获取成功，获得 ${data.profit} 金币`)
              $.profit += data.profit
            } else if (data['ret'] === 'fail') {
              $.log(`阶段奖励获取失败，错误信息：${data.rtn_msg}`)
            } else {
              $.log(`未知错误：${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function call2(uuid, opttype = "ART_READ") {
  let body = {
    "openID": $.openId,
    "openid": $.openId,
    "app_id": "xzwl",
    "version_token": `${$.version}`,
    "channel": $.iOS ? "iOS" : "android",
    "vercode": `${$.version}`,
    "psign": "92dea068b6c271161be05ed358b59932",
    "app_token": "xzwltoken070704",
    "version": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "pars": {
      "openID": $.openId,
      "uniqueid": uuid,
      "os": $.iOS ? "iOS" : "android",
      "channel": $.iOS ? "iOS" : "android",
      "openid": $.openId
    }
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/minfo/call.action",
      `jdata=${escape(JSON.stringify(body))}&opttype=${opttype}&optversion=1.0`),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                if (opttype === 'ART_READ') {
                  $.artcount = data.datas.artcount
                  $.videocount = data.datas.videocount
                  $.log(`文章剩余观看次数：${$.artcount}，视频剩余观看次数：${$.videocount}`)
                } else {
                  console.log(`动作${opttype}记录成功！`)
                }
              } else {
                console.log(data)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function call3(uuid, opttype = "ART_READ") {
  let body = {
    "openID": $.openId,
    "openid": $.openId,
    "app_id": "xzwl",
    "version_token": `${$.version}`,
    "channel": $.iOS ? "iOS" : "android",
    "vercode": `${$.version}`,
    "psign": "92dea068b6c271161be05ed358b59932",
    "app_token": "xzwltoken070704",
    "version": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "pars": {
      "openID": $.openId,
      "uniqueid": uuid,
      "os": $.iOS ? "iOS" : "android",
      "channel": $.iOS ? "iOS" : "android",
      "openid": $.openId
    }
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/minfo/call2.action",
      `jdata=${escape(JSON.stringify(body))}&opttype=${opttype}&optversion=1.0`),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                if (opttype === 'ART_READ') {
                  $.artcount = data.datas.artcount
                  $.videocount = data.datas.videocount
                  $.log(`文章剩余观看次数：${$.artcount}，视频剩余观看次数：${$.videocount}`)
                } else {
                  console.log(`动作${opttype}记录成功！`)
                }
              } else {
                console.log(data)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function call1(uuid, article_id, opttype = "INF_ART_COMMENTS") {
  let body = {
    "openID": $.openId,
    "openid": $.openId,
    "app_id": "xzwl",
    "version_token": `${$.version}`,
    "channel": $.iOS ? "iOS" : "android",
    "vercode": `${$.version}`,
    "psign": "92dea068b6c271161be05ed358b59932",
    "app_token": "xzwltoken070704",
    "version": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "pars": {
      "openID": $.openId,
      "uniqueid": uuid,
      "os": $.iOS ? "iOS" : "android",
      "channel": $.iOS ? "iOS" : "android",
      "openid": $.openId
    }
  }
  if (article_id) body['pars']['article_id'] = article_id
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/minfo/call.action",
      `jdata=${escape(JSON.stringify(body))}&opttype=${opttype}`),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              // $.log(data)
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function article(artId) {
  let body = `articleid=${artId}&openID=${$.openId}&ce=${$.iOS ? "iOS" : "android"}&request_id=${new Date().getTime()}&scene_type=art_recommend_${$.iOS ? "iOS" : "android"}&articlevideo=0&version=${$.version}&account_type=1&channel=iOS&shade=1&a=zv8lS5d9LnyV7Bdoyt0NHQ==&font_size=1&scene_type=&request_id=${new Date().getTime()}`
  let config = {
    'url': 'https://www.jukandiannews.com/jkd/weixin20/station/stationarticle.action?' + body,
    'Host': 'www.jukandiannews.com',
    'origin': 'https://www.jukandiannews.com',
    'accept-language': 'zh-cn',
    'user-agent': $.isNode() ?
      (process.env.JKD_USER_AGENT ? process.env.JKD_USER_AGENT : UA) : ($.getdata('JKDUA')
        ? $.getdata('JKDUA') : UA),
    'Cookie': cookie,
  }
  return new Promise(resolve => {
    $.get(config, async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          $.log(`article 记录成功`)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function openArticle(artId) {
  let body = `openID=${$.openId}&articleID=${artId}&ce=iOS&articlevideo=0&event=oa&advCodeRandom=0&isShowAdv=1`
  let config = {
    'url': 'https://www.jukandiannews.com/jkd/weixin20/station/articleOpen.action',
    body: body,
    'Host': 'www.jukandiannews.com',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.jukandiannews.com',
    'accept-language': 'zh-cn',
    'x-requested-with': 'XMLHttpRequest',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Cookie': cookie,
  }
  return new Promise(resolve => {
    $.post(config, async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          $.log(`openArticle 记录成功`)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function video(artId) {
  let body = `platfrom_id=qtt-video&articleid=${artId}&openID=${$.openId}`
  return new Promise(resolve => {
    $.get(taskGetUrl('jkd/weixin20/station/cnzzinVideo.action', body), async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          $.log(`video 记录成功`)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function readAccount(artId, payType = 1) {
  let body = {
    "appid": "xzwl",
    "read_weal": 0,
    "paytype": payType,
    "securitykey": "",
    "channel": $.iOS ? "iOS" : "android",
    "psign": "92dea068b6c271161be05ed358b59932",
    "appversioncode": `${$.version}`,
    "time": `${new Date().getTime()}`,
    "apptoken": "xzwltoken070704",
    "appversion": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "openid": $.openId,
    "os": $.iOS ? "iOS" : "android",
    "artid": artId,
    "accountType": "0",
    "readmodel": "1"
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/account/readAccount.action",
      `jsondata=${escape(JSON.stringify(body))}`),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                $.log(`文章【${artId}】阅读成功，获得 ${data.profit} 金币`)
                $.profit += data.profit
              } else if (data['ret'] === 'fail') {
                $.log(`文章阅读失败，错误信息：${data.rtn_msg}`)
              } else {
                $.log(`未知错误：${JSON.stringify(data)}`)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function videoAccount(artId) {
  let body = {
    "appid": "xzwl",
    "read_weal": 0,
    "paytype": 2,
    "securitykey": "",
    "channel": $.iOS ? "iOS" : "android",
    "psign": "92dea068b6c271161be05ed358b59932",
    "appversioncode": $.version,
    "time": new Date().toString(),
    "apptoken": "xzwltoken070704",
    "appversion": fakeIOS ? '5.6.5' : $.version.toString().split('').join('.'),
    "openid": $.openId,
    "os": $.iOS ? "iOS" : "android",
    "artid": artId,
    "accountType": "0",
    "readmodel": "1"
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/account/readAccount.action",
      `jsondata=${escape(JSON.stringify(body))}`),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                $.log(`视频【${artId}】阅读成功，获得 ${data.profit} 金币`)
                $.profit += data.profit
              } else if (data['ret'] === 'fail') {
                $.log(`视频阅读失败，错误信息：${data.rtn_msg}`)
              } else {
                $.log(`未知错误：${JSON.stringify(data)}`)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function luckyDraw() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/activity/advluckdraw/getLuckDrawGold.action"),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                $.log(`luckyDraw记录成功`)
              } else if (data['ret'] === 'fail') {
                $.log(`luckyDraw记录失败，错误信息：${data.rtn_msg}`)
              } else {
                $.log(`未知错误：${JSON.stringify(data)}`)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function luckyProfit() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/activity/advluckdraw/getTotalLuckProfit.action",),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                $.log(`转盘获取成功，共计 ${data.data.totalProfit} 金币`)
              } else if (data['ret'] === 'fail') {
                $.log(`视频阅读失败，错误信息：${data.rtn_msg}`)
              } else {
                $.log(`未知错误：${JSON.stringify(data)}`)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function getLuckyLevel() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/activity/advluckdraw/getLuckDrawLevel.action",),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                console.log(`转盘记录成功，剩余 ${data.data.unFinishNum} 次`)
                $.unFinishNum = data.data.unFinishNum
                let states = JSON.parse(data.data.list)
                for (let i = 0; i < states.length; ++i) {
                  const vo = states[i]
                  if (vo['status'] === 1) {
                    console.log(`去领取开宝箱阶段奖励：${vo['level']}`)
                    await getLuckyDrawBox(i)
                  }
                }
                if (data['data']['luckName'] === "神秘宝箱") {
                  console.log(`去领取神秘宝箱奖励`)
                  await adv(11)
                }
              } else if (data['ret'] === 'failed') {
                $.log(`转盘已达上限，跳出`)
                $.luckyDrawNum = 0
              } else {
                $.log(`未知错误：${JSON.stringify(data)}`)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function getLuckyDrawBox(i) {
  let body = `num=${i}`
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/activity/advluckdraw/getLuckDrawBox.action", body),
      async (err, resp, data) => {
        try {
          if (err) {
            $.log(`${JSON.stringify(err)}`)
            $.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data);
              if (data['ret'] === 'ok') {
                console.log(`阶段奖励领取成功，获得 ${data.data} 金币`)
                $.profit += data.data
              } else if (data['ret'] === 'fail') {
                $.log(`阶段奖励领取失败，错误信息：${data.rtn_msg}`)
              } else {
                $.log(`未知错误：${JSON.stringify(data)}`)
              }
            }
          }
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve(data);
        }
      })
  })
}

function withDraw() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jkd/weixin20/userWithdraw/userWithdrawPost.action",
      `type=wx&sum=${sum}&mobile=&pid=0&accountid=&productcode=`), async (err, resp, data) => {
      try {
        if (err) {
          $.log(`${JSON.stringify(err)}`)
          $.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          $.log(`提现结果：${data}`)
          message += `提现结果：${data}`
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    $.log(e);
    $.log(`聚看点服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      $.log(e);
      $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
      return [];
    }
  }
}

function taskGetUrl(function_id, body) {
  return {
    url: `${API_HOST}/${function_id}?${body}`,
    headers: {
      "Cookie": cookie,
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json, text/plain, */*',
      'origin': 'https://www.xiaodouzhuan.cn',
      'referer': 'https://www.xiaodouzhuan.cn',
      "User-Agent": $.isNode() ?
        (process.env.JKD_USER_AGENT ? process.env.JKD_USER_AGENT : UA) : ($.getdata('JKDUA')
          ? $.getdata('JKDUA') : UA),
    }
  }
}

function taskPostUrl(function_id, body) {
  return {
    url: `${API_HOST}/${function_id}`,
    body: body,
    headers: {
      "Cookie": cookie,
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json, text/plain, */*',
      'origin': 'https://www.xiaodouzhuan.cn',
      'referer': 'https://www.xiaodouzhuan.cn',
      "User-Agent": $.isNode() ?
        (process.env.JKD_USER_AGENT ? process.env.JKD_USER_AGENT : UA) : ($.getdata('JKDUA')
          ? $.getdata('JKDUA') : UA),
    }
  }
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    1120ce[_0x431c('106','oPfE')][_0x431c('107','EQn6')]);}else{$['log'](_0x431c('108','pUXl')+_0x1120ce[_0x431c('109','lB$k')]);}break;case 0x7:if(_0x13c236[_0x431c('10a','YH@7')](_0x13c236[_0x431c('10b','Y2ua')](_0x1120ce[_0x431c('10c','D4^H')],_0x1120ce[_0x431c('10d','TjHx')]),0x0)){$[_0x431c('10e','Dsjk')]('\x0a开始执行\x20'+_0x1120ce[_0x431c('10f','aimA')]);taskList=_0x1120ce[_0x431c('110','Y2ua')][_0x431c('111','V6%d')](_0x3f0f2f=>_0x3f0f2f['status']===0x1);for(const _0xcd1864 of taskList){if(_0x13c236[_0x431c('112','lJ[p')](_0x431c('113','mx%['),_0x431c('114','AYy#'))){$[_0x431c('115','kR%k')](_0x431c('116','V(Ah'));}else{await doTask(_0x431c('cf','Mt7F'),{'appId':_0x13c236[_0x431c('117','^*t0')],'taskToken':_0xcd1864[_0x431c('118','AYy#')],'taskId':_0x1120ce[_0x431c('119','Dsjk')],'actionType':'1'});await $[_0x431c('11a',']Dsm')](waitTime);await doTask(_0x431c('11b','4E&2'),{'appId':_0x13c236['oDabT'],'taskToken':_0xcd1864[_0x431c('11c','KPC9')],'taskId':_0x1120ce[_0x431c('d6','v44i')],'actionType':'0'});}}}else{$[_0x431c('11d','ZbXD')](_0x431c('68','y*U@')+_0x1120ce['taskName']);}break;case 0x8:if(_0x13c236[_0x431c('11e','mx%[')](_0x13c236[_0x431c('11f','Y2ua')](_0x1120ce[_0x431c('120','Q@OA')],_0x1120ce[_0x431c('121','lJ[p')]),0x0)){$['log'](_0x431c('122','EQn6')+_0x1120ce[_0x431c('123','P]Fw')]);await _0x13c236[_0x431c('124','pUXl')](doTask,_0x431c('125','yxdh'),{'appId':_0x13c236[_0x431c('126','D4^H')],'taskToken':_0x1120ce[_0x431c('127','Mt7F')][_0x431c('107','EQn6')],'taskId':_0x1120ce['taskId'],'actionType':'0'});await $[_0x431c('128','c9CC')](waitTime);}else{$['log'](_0x431c('129','axxw')+_0x1120ce['taskName']);}break;default:break;}}}}else{$[_0x431c('12a','8$sX')]=data['data']['result']['taskVos'];$[_0x431c('12b','^*t0')]=data[_0x431c('81','oPfE')][_0x431c('12c','ZbXD')][_0x431c('12d','lJ[p')];}}else{if(_0x13c236['mHpyJ'](_0x13c236[_0x431c('12e','AYy#')],_0x13c236[_0x431c('12f','pUXl')])){$[_0x431c('130','HASC')]=JSON['parse'](data);_0x13c236[_0x431c('131','pUXl')](resolve);}else{$[_0x431c('132','D4^H')]('东哥喜欢奶茶妹不喜欢你～');}}await _0x13c236['lIpgj'](doTask,_0x13c236['gKcJQ'],{'appId':_0x431c('133','ZiQM'),'taskToken':'','channelId':0x1});if($['userInfo']){$['userScore']=parseInt($[_0x431c('134','bsfr')][_0x431c('135','c&0b')]);$[_0x431c('136',']Dsm')](_0x431c('137','P]Fw')+$[_0x431c('138','Dsjk')]);if($['userScore']>$[_0x431c('139','oPfE')][_0x431c('13a','V(Ah')]){times=_0x13c236[_0x431c('13b','ZbXD')](parseInt,_0x13c236[_0x431c('13c','axxw')]($['userScore'],$[_0x431c('13d','sQSb')][_0x431c('13e','Q@OA')]));for(let _0x429686=0x0;_0x429686<times;_0x429686++){$['log'](_0x13c236['hSGdv']);await _0x13c236['rwtbP'](doTask,_0x13c236[_0x431c('13f','YH@7')],{'appId':_0x431c('d0','8$sX')});await $[_0x431c('86','HASC')](0x1f4);}}}}function doTask(_0xbb1188,_0x2e7dc6){var _0x4fe1c5={'IgLzK':_0x431c('140','yxdh'),'DSpkz':'healthyDay_getHomeData','nYgTT':_0x431c('141',']Dsm'),'uKArO':_0x431c('142','aimA'),'DaztW':'jBeanAwardVo','vBmWs':function(_0xc6f8a2,_0x120a2d){return _0xc6f8a2===_0x120a2d;},'KDSkV':function(_0x2c3515,_0x4c2e0e){return _0x2c3515!==_0x4c2e0e;},'JFbpx':_0x431c('143','mx%['),'kliUe':function(_0x4a770e){return _0x4a770e();}};return new Promise(_0x1bc343=>{var _0x3a435f={'HCnTt':_0x4fe1c5[_0x431c('144','V6%d')],'AaoBq':function(_0x4d619e,_0x156d45){return _0x4d619e===_0x156d45;},'ueYOB':_0x431c('145','TjHx'),'NzPKg':_0x4fe1c5[_0x431c('146','Mt7F')],'gRCLx':_0x431c('147','oPfE'),'vjuaO':_0x4fe1c5[_0x431c('148','P]Fw')],'QxocU':_0x4fe1c5[_0x431c('149','axxw')],'dflpE':_0x4fe1c5['DaztW'],'FTjCx':function(_0x4dcda4,_0x1366d1){return _0x4dcda4!==_0x1366d1;},'mDJll':function(_0x592a11,_0x5420d0){return _0x4fe1c5[_0x431c('14a','^*t0')](_0x592a11,_0x5420d0);},'oCQhZ':_0x431c('14b','XNO@'),'nnIWK':function(_0x3781a0,_0x1561ab){return _0x4fe1c5[_0x431c('14c','mp#M')](_0x3781a0,_0x1561ab);},'NsKKb':_0x4fe1c5[_0x431c('14d','Q@OA')],'ACkTI':function(_0x292650){return _0x4fe1c5[_0x431c('14e','KPC9')](_0x292650);}};$[_0x431c('14f','mx%[')](postUrl(_0xbb1188,_0x2e7dc6),(_0x29f780,_0x167732,_0x1a8549)=>{var _0xac62b8={'oFgGm':_0x431c('150','HASC')};if(_0x3a435f['HCnTt']!=='QQpaM'){message+='\x0a【京东账号'+$[_0x431c('151','YH@7')]+'】'+($['nickName']||$[_0x431c('152','4&2l')])+'\x20\x0a\x20\x20\x20\x20\x20\x20\x20└\x20中奖了，中奖类型无法判断。如果方便请把信息发送给脚本作者进行完善。\x0a\x20\x20\x20\x20\x20\x20\x20└\x20'+JSON[_0x431c('153','r9VS')](_0x1a8549['data'][_0x431c('154','oPfE')]['userAwardsCacheDto']);}else{try{if(_0x29f780){$[_0x431c('155','oPfE')](JSON[_0x431c('156','Mt7F')](_0x29f780));}else{if(_0x3a435f[_0x431c('157','TjHx')](_0x3a435f[_0x431c('158','1!zm')],_0x431c('159','bsfr'))){$[_0x431c('15a','mp#M')]=![];return;}else{if(_0x1a8549){_0x1a8549=JSON[_0x431c('15b','D4^H')](_0x1a8549);switch(_0xbb1188){case _0x3a435f['NzPKg']:if(_0x1a8549[_0x431c('15c','lB$k')][_0x431c('15d','D4^H')]){$[_0x431c('15e','lB$k')]=_0x1a8549[_0x431c('15f','r9VS')]['result'][_0x431c('160','aimA')];$[_0x431c('161','XNO@')]=_0x1a8549['data'][_0x431c('162','mp#M')][_0x431c('163','8$sX')];}break;case _0x3a435f[_0x431c('164','aimA')]:if(_0x1a8549['data']['success']){if(_0x1a8549['data'][_0x431c('165','axxw')][_0x431c('166','axxw')](_0x431c('167','lB$k'))){$[_0x431c('168','lB$k')](_0x431c('169','y*U@')+_0x1a8549[_0x431c('16a','YH@7')][_0x431c('154','oPfE')][_0x431c('16b','pUXl')]+'\x20加油值');}}break;case _0x3a435f[_0x431c('16c','bsfr')]:if(_0x1a8549['data'][_0x431c('16d','P]Fw')]){if(_0x1a8549['data'][_0x431c('16e','c9CC')][_0x431c('16f','c&0b')](_0x3a435f[_0x431c('170','mx%[')])){if(_0x1a8549[_0x431c('c7','p$1^')][_0x431c('171','r9VS')][_0x431c('172','mx%[')][_0x431c('173','Dsjk')](_0x3a435f[_0x431c('174','HASC')])){$[_0x431c('175','u$sY')](_0x431c('176','^*t0')+_0x1a8549['data'][_0x431c('177','HASC')][_0x431c('178','axxw')]['jBeanAwardVo'][_0x431c('179','AYy#')]+_0x431c('17a','c9CC'));$[_0x431c('17b','Mt7F')]+=parseInt(_0x1a8549[_0x431c('c7','p$1^')][_0x431c('16e','c9CC')][_0x431c('17c','c&0b')][_0x431c('17d','ycnr')][_0x431c('17e','c9CC')]);}}}break;case _0x431c('17f','8$sX'):if(_0x1a8549[_0x431c('180','8$sX')][_0x431c('15d','D4^H')]){if(_0x1a8549[_0x431c('181','5Twr')]['result'][_0x431c('182','HASC')](_0x3a435f['QxocU'])){if(_0x1a8549[_0x431c('183','lJ[p')]['result'][_0x431c('184','pUXl')][_0x431c('185','kR%k')](_0x3a435f[_0x431c('186','r9VS')])){$['log']('\x20\x20\x20\x20└\x20恭喜，获得\x20['+_0x1a8549['data'][_0x431c('187','ycnr')]['userAwardsCacheDto']['jBeanAwardVo'][_0x431c('188','ZiQM')]+_0x431c('189','5Twr'));$[_0x431c('18a','ZbXD')]+=parseInt(_0x1a8549[_0x431c('18b','axxw')]['result'][_0x431c('18c','Mt7F')][_0x431c('18d','TjHx')]['quantity']);}else{if(_0x3a435f[_0x431c('18e','c9CC')]('JtRYH','WrHpL')){message+=_0x431c('18f','lB$k')+$[_0x431c('190','axxw')]+'】'+($['nickName']||$['UserName'])+_0x431c('191','Dsjk')+JSON[_0x431c('192','3)@c')](_0x1a8549[_0x431c('193','HASC')]['result'][_0x431c('194','AYy#')]);}else{$['msg']($[_0x431c('195','kR%k')],_0xac62b8[_0x431c('196','4E&2')],message);}}}}break;default:break;}}else{if(_0x3a435f['mDJll'](_0x3a435f[_0x431c('197','v44i')],_0x431c('198','u$sY'))){$['log'](_0x431c('199','KPC9')+vo[_0x431c('e5','kR%k')]);}else{$[_0x431c('19a','8$sX')](_0x431c('19b','p$1^'));}}}}}catch(_0x31c1f1){if(_0x3a435f[_0x431c('19c','^*t0')](_0x3a435f['NsKKb'],_0x3a435f[_0x431c('19d','Q@OA')])){$[_0x431c('19e','Mt7F')](JSON['stringify'](_0x31c1f1));}else{$['log'](JSON[_0x431c('19f','kR%k')](_0x31c1f1));}}finally{_0x3a435f[_0x431c('1a0','yxdh')](_0x1bc343);}}});});}function postUrl(_0x4608eb,_0x3b58fd){var _0x3f90ad={'VAQtZ':_0x431c('1a1','bsfr'),'dpDfa':_0x431c('1a2','mx%['),'cVhIs':_0x431c('1a3','y*U@')};return{'url':_0x3f90ad[_0x431c('1a4','Y2ua')],'headers':{'Host':_0x3f90ad[_0x431c('1a5','lJ[p')],'Content-Type':'application/x-www-form-urlencoded','Origin':_0x431c('1a6','pUXl'),'Accept-Encoding':_0x431c('1a7','KPC9'),'Cookie':cookie,'Connection':_0x431c('1a8','YH@7'),'Accept':'application/json,\x20text/plain,\x20*/*','User-Agent':'jdapp;iPhone;9.4.4;14.3;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone12,1;addressid/;supportBestPay/0;appBuild/167588;jdSupportDarkMode/0;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','Referer':_0x431c('1a9','P]Fw'),'Accept-Language':_0x3f90ad['cVhIs']},'body':_0x431c('1aa','8$sX')+_0x4608eb+_0x431c('1ab','8$sX')+JSON[_0x431c('1ac','u$sY')](_0x3b58fd)+_0x431c('1ad','kR%k')};}function checkCookie(){var _0x8d49a1={'eJdeM':'1001','hWzXR':function(_0xdb3d51,_0x5c31da){return _0xdb3d51===_0x5c31da;},'qUgUA':'userInfo','NftLh':function(_0x2a6b8d,_0x5eb03e){return _0x2a6b8d!==_0x5eb03e;},'uFKOO':_0x431c('1ae','g6h!'),'VjThJ':_0x431c('1af','P7bu'),'QyRRs':_0x431c('1b0','4&2l'),'lPxQA':_0x431c('1b1','pUXl'),'fajVv':function(_0x391c30){return _0x391c30();},'HGdIv':'me-api.jd.com','pJoHT':_0x431c('1b2','P]Fw'),'ujCtO':_0x431c('1b3','ZbXD'),'XTrtk':'Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Version/14.0.2\x20Mobile/15E148\x20Safari/604.1','cgaQL':_0x431c('1b4','Dsjk'),'vcyrg':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','iRvTG':_0x431c('1b5','5qxM')};const _0x45c485={'url':_0x431c('1b6','bsfr'),'headers':{'Host':_0x8d49a1[_0x431c('1b7','aimA')],'Accept':_0x8d49a1[_0x431c('1b8','g6h!')],'Connection':_0x8d49a1[_0x431c('1b9','YH@7')],'Cookie':cookie,'User-Agent':_0x8d49a1[_0x431c('1ba','r9VS')],'Accept-Language':_0x8d49a1[_0x431c('1bb','5G8Y')],'Referer':_0x8d49a1[_0x431c('1bc','3)@c')],'Accept-Encoding':_0x8d49a1['iRvTG']}};return new Promise(_0xeab33a=>{var _0x31dbf5={'tLZFl':function(_0x3297f1){return _0x8d49a1['fajVv'](_0x3297f1);}};$[_0x431c('1bd','Q@OA')](_0x45c485,(_0x1f6249,_0x5e173b,_0x5a77c1)=>{try{if(_0x1f6249){$[_0x431c('1be','AYy#')](_0x1f6249);}else{if(_0x5a77c1){_0x5a77c1=JSON[_0x431c('1bf','V6%d')](_0x5a77c1);if(_0x5a77c1[_0x431c('1c0','P7bu')]===_0x8d49a1[_0x431c('1c1','pUXl')]){$[_0x431c('1c2','yxdh')]=![];return;}if(_0x8d49a1['hWzXR'](_0x5a77c1[_0x431c('1c3','kR%k')],'0')&&_0x5a77c1[_0x431c('1c4','XNO@')][_0x431c('1c5','TjHx')](_0x8d49a1[_0x431c('1c6','g6h!')])){if(_0x8d49a1[_0x431c('1c7','p$1^')](_0x8d49a1[_0x431c('1c8','c&0b')],_0x8d49a1['uFKOO'])){_0x31dbf5[_0x431c('1c9','y*U@')](_0xeab33a);}else{$[_0x431c('1ca','c9CC')]=_0x5a77c1[_0x431c('1cb','P]Fw')]['userInfo'][_0x431c('1cc','4E&2')][_0x431c('1cd','yxdh')];}}}else{$[_0x431c('1ce','ycnr')](_0x8d49a1[_0x431c('1cf','1!zm')]);}}}catch(_0x3f5a8e){if(_0x8d49a1['NftLh'](_0x8d49a1[_0x431c('1d0',']Dsm')],_0x8d49a1[_0x431c('1d1','v44i')])){$[_0x431c('1d2','Q@OA')](_0x3f5a8e);}else{if(_0x5a77c1){$['zData']=JSON['parse'](_0x5a77c1);};}}finally{_0xeab33a();}});});};_0xodp='jsjiami.com.v6';
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
