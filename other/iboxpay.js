/* ziye 
github地址 https://github.com/ziye11
TG频道地址  https://t.me/ziyescript
TG交流群   https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接  https://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ziye.boxjs.json

转载请备注个名字，谢谢

⚠️羊毛赚
点击 http://share.xiaoniuaso.com/43?invitecode=10008933   下载APP  
邀请码 10008933  谢谢支持

⚠️ 模拟登录状态下可以获取ck，但是无法进行提现绑定操作，以及填写邀请码

2.26 制作
2.27 完成
2.28 调整运行时长
3.1 修复提现问题
3.3 修复模拟登录 
3.4 修复提现，绑定时也可获取ck

⚠️ 时间设置    0 8,12 * * *    每天1次以上就行   

⚠️一共3个位置 3个ck  👉 4条 Secrets 

多账号换行
第一步 添加  hostname=ymz.iphonezhuan.com,

第二步 ⚠️添加羊毛赚获取BODY重写  
登录羊毛赚  手动完成一次任务获取body  提现一次获取提现body

ymzhuanggbodyVal 👉YMZ_ymzhuanggBODY
ymzhuanspbodyVal 👉YMZ_ymzhuanspBODY
ymzhuantxbodyVal 👉YMZ_ymzhuantxBODY
BODY👉 ymzhuanUSERID   boxjs里填写4位数id即可模拟登陆(感谢蔡徐坤大佬提供模拟登录方法)
(勿打开重写注册，请提前注册，注册不了，请打开关闭 隐私跟踪)

CASH  👉  YMZ_CASH     可设置0 3 10 20 50 100  默认0关闭提现，设置888由上至下循环提现
⚠️主机名以及重写👇

hostname=ymz.iphonezhuan.com,

############## 圈x
#羊毛赚获取BODY
http:\/\/ymz\.iphonezhuan\.com\/* url script-request-body http://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ymzhuan.js
#羊毛赚模拟登录
http:\/\/ymz\.iphonezhuan\.com\/* url script-response-body http://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ymzhuan.js

############## loon
#羊毛赚获取BODY
http-request http:\/\/ymz\.iphonezhuan\.com\/* script-path=http://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ymzhuan.js, requires-body=1,max-size=0, tag=羊毛赚获取BODY
#羊毛赚模拟登录BODY
http-response http:\/\/ymz\.iphonezhuan\.com\/* script-path=http://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ymzhuan.js, requires-body=1,max-size=0, tag=羊毛赚获取BODY

############## surge
#羊毛赚获取BODY
羊毛赚获取BODY = type=http-request,pattern=https:\/\/ymz\.iphonezhuan\.com\/*,script-path=http://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ymzhuan.js
#羊毛赚获取BODY
羊毛赚模拟登录BODY = type=http-response,pattern=https:\/\/ymz\.iphonezhuan\.com\/*,script-path=http://raw.githubusercontent.com/ziye11/JavaScript/main/Task/ymzhuan.js

*/

const $ = Env("羊毛赚");
$.idx = ($.idx = ($.getval('ymzhuanSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const COOKIE = $.isNode() ? require("./ymzhuanCOOKIE") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1 // 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 2; // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
$.message = '', COOKIES_SPLIT = '', CASH = '', ddtime = '';
const ymzhuanggbodyArr = [];
let ymzhuanggbodyVal = ``;
let middleymzhuanggBODY = [];
const ymzhuanspbodyArr = [];
let ymzhuanspbodyVal = ``;
let middleymzhuanspBODY = [];
const ymzhuantxbodyArr = [];
let ymzhuantxbodyVal = ``;
let middleymzhuantxBODY = [];
if ($.isNode()) {
    // 没有设置 YMZ_CASH 则默认为 0 不兑换
    CASH = process.env.YMZ_CASH || 888;
}
if ($.isNode() && process.env.YMZ_ymzhuanggBODY) {
    COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
    console.log(
        `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
    );
    if (
        process.env.YMZ_ymzhuanggBODY &&
        process.env.YMZ_ymzhuanggBODY.indexOf(COOKIES_SPLIT) > -1
    ) {
        middleymzhuanggBODY = process.env.YMZ_ymzhuanggBODY.split(COOKIES_SPLIT);
    } else {
        middleymzhuanggBODY = process.env.YMZ_ymzhuanggBODY.split();
    }
    if (
        process.env.YMZ_ymzhuanspBODY &&
        process.env.YMZ_ymzhuanspBODY.indexOf(COOKIES_SPLIT) > -1
    ) {
        middleymzhuanspBODY = process.env.YMZ_ymzhuanspBODY.split(COOKIES_SPLIT);
    } else {
        middleymzhuanspBODY = process.env.YMZ_ymzhuanspBODY.split();
    }
    if (
        process.env.YMZ_ymzhuantxBODY &&
        process.env.YMZ_ymzhuantxBODY.indexOf(COOKIES_SPLIT) > -1
    ) {
        middleymzhuantxBODY = process.env.YMZ_ymzhuantxBODY.split(COOKIES_SPLIT);
    } else {
        middleymzhuantxBODY = process.env.YMZ_ymzhuantxBODY.split();
    }
}
if (COOKIE.ymzhuanggbodyVal) {
    YMZ_COOKIES = {
        "ymzhuanggbodyVal": COOKIE.ymzhuanggbodyVal.split('\n'),
        "ymzhuanspbodyVal": COOKIE.ymzhuanspbodyVal.split('\n'),
        "ymzhuantxbodyVal": COOKIE.ymzhuantxbodyVal.split('\n'),
    }
    Length = YMZ_COOKIES.ymzhuanggbodyVal.length;
}
if (!COOKIE.ymzhuanggbodyVal) {
    if ($.isNode()) {
        Object.keys(middleymzhuanggBODY).forEach((item) => {
            if (middleymzhuanggBODY[item]) {
                ymzhuanggbodyArr.push(middleymzhuanggBODY[item]);
            }
        });
        Object.keys(middleymzhuanspBODY).forEach((item) => {
            if (middleymzhuanspBODY[item]) {
                ymzhuanspbodyArr.push(middleymzhuanspBODY[item]);
            }
        });
        Object.keys(middleymzhuantxBODY).forEach((item) => {
            if (middleymzhuantxBODY[item]) {
                ymzhuantxbodyArr.push(middleymzhuantxBODY[item]);
            }
        });
    } else {
        ymzhuanggbodyArr.push($.getdata("ymzhuanggbody"));
        ymzhuanspbodyArr.push($.getdata("ymzhuanspbody"));
        ymzhuantxbodyArr.push($.getdata("ymzhuantxbody"));
        // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
        if ("ymzhuanCASH") {
            CASH = $.getval("ymzhuanCASH") || '0';
        }
        let ymzCount = ($.getval('ymzhuanCount') || '1') - 0;
        for (let i = 2; i <= ymzCount; i++) {
            if ($.getdata(`ymzhuanggbody${i}`)) {
                ymzhuanggbodyArr.push($.getdata(`ymzhuanggbody${i}`));
                ymzhuanspbodyArr.push($.getdata(`ymzhuanspbody${i}`));
                ymzhuantxbodyArr.push($.getdata(`ymzhuantxbody${i}`));
            }
        }
    }
    if (ymzhuanggbodyArr == '') {
        Length = 0
    } else Length = ymzhuanggbodyArr.length
}

function GetCookie() {
    if ($response && $request.url.indexOf("verifyidentity") >= 0) {
        let BODY = {
            "msg": "ok",
            "statuscode": 200
        }
        $.log(
            `[${$.name + $.idx}] 设备验证✅: 通过`
        );
        $.msg($.name + $.idx, `设备验证: 通过🎉`, ``);
        $.done({
            body: JSON.stringify(BODY)
        });
    }
    if ($response && $request.url.indexOf("login") >= 0) {
        USERID = Number($.getval("ymzhuanUSERID"));
        if (typeof USERID === 'undefined' || USERID == 0) {
            $.log(
                `[${$.name + $.idx}] 未设置USERID`
            );
            $.msg($.name + $.idx, `未设置USERID`, ``);
            $.done({
                body: body
            });
        } else {



            let BODY = {
                "timestamp": `${ddtime}`,
                "result": {
                    "id": 0,
                    "invitecode": "",
                    "status": 1,
                    "pid": 0,
                    "pinvitecode": "",
                    "cellphone": "",
                    "alipayaccount": "",
                    "alipayname": "",
                    "bannertime": 180,
                    "bannerclkratio": "0##8",
                    "cpvideo": 5,
                    "cpratio": 10,
                    "appinstallratio": "75##0##25",
                    "appsigntime": 60,
                    "leastbanner": 2,
                    "qqgroup": "935826100",
                    "shareurl": "",
                    "appurl1": "",
                    "appurl2": "",
                    "nickname": "",
                    "icon": ""
                },
                "msg": "ok",
                "statuscode": 200
            }
            BODY.result.id = USERID
            BODY.result.invitecode = `${USERID + 10000000}`
            $.log(
                `[${$.name + $.idx}] 模拟登陆✅: 成功,USERID: ${USERID}`
            );
            $.msg($.name + $.idx, `模拟登陆: 成功,USERID: ${USERID}🎉`, ``);
            $.done({
                body: JSON.stringify(BODY)
            });
        }
    }
    if ($request && $request.body.indexOf("taskid=1") >= 0 && $request.body.indexOf("sign=") >= 0) {
        const ymzhuanggbodyVal = $request.body;
        if (ymzhuanggbodyVal) $.setdata(ymzhuanggbodyVal, "ymzhuanggbody" + $.idx);
        $.log(
            `[${$.name + $.idx}] 获取ymzhuanggbodyVal✅: 成功,ymzhuanggbodyVal: ${ymzhuanggbodyVal}`
        );
        $.msg($.name + $.idx, `获取ymzhuanggbodyVal: 成功🎉`, ``);
    }
    if ($request && $request.body.indexOf("taskid=2") >= 0 && $request.body.indexOf("sign=") >= 0) {
        const ymzhuanspbodyVal = $request.body;
        if (ymzhuanspbodyVal) $.setdata(ymzhuanspbodyVal, "ymzhuanspbody" + $.idx);
        $.log(
            `[${$.name + $.idx}] 获取ymzhuanspbodyVal✅: 成功,ymzhuanspbodyVal: ${ymzhuanspbodyVal}`
        );
        $.msg($.name + $.idx, `获取ymzhuanspbodyVal: 成功🎉`, ``);
    }
    if ($request && $request.body.indexOf("account") >= 0 && $request.body.indexOf("money") >= 0) {
        const ymzhuantxbodyVal = $request.body;
        if (ymzhuantxbodyVal) $.setdata(ymzhuantxbodyVal, "ymzhuantxbody" + $.idx);
        $.log(
            `[${$.name + $.idx}] 获取ymzhuantxbodyVal✅: 成功,ymzhuantxbodyVal: ${ymzhuantxbodyVal}`
        );
        $.msg($.name + $.idx, `获取ymzhuantxbodyVal: 成功🎉`, ``);
    }
}
console.log(
    `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);
console.log(
    `============ 共 ${Length} 个${$.name}账号=============\n`
);
//时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);
//今天
Y = nowTimes.getFullYear() + '-';
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1) + '-';
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
console.log(ddtime)
//当前时间戳
function tts(inputTime) {
    if ($.isNode()) {
        TTS = Math.round(new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000).toString();
    } else TTS = Math.round(new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString();
    return TTS;
};
//当前10位时间戳
function ts(inputTime) {
    if ($.isNode()) {
        TS = Math.round((new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000) / 1000).toString();
    } else TS = Math.round((new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000) / 1000).toString();
    return TS;
};
//今天0点时间戳时间戳
function daytime(inputTime) {
    if ($.isNode()) {
        DAYTIME =
            new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
    } else DAYTIME = new Date(new Date().toLocaleDateString()).getTime();
    return DAYTIME;
};
//时间戳格式化日期
function time(inputTime) {
    if ($.isNode()) {
        var date = new Date(inputTime + 8 * 60 * 60 * 1000);
    } else var date = new Date(inputTime);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
};
//随机udid 大写
function udid() {
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}
//随机udid 小写
function udid2() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//unicode编码
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
//unicode解码
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
//将中文格式转换成utf8
function zhutf8(str) {
    strs = encodeURIComponent(str);
    return strs;
}
//将utf8格式转换成中文
function utf8zh(str) {
    strs = decodeURIComponent(str);
    return strs;
}
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
    GetCookie()
    $.done();
} else {
    !(async () => {
        await all();
        //await $.wait(1000)
        await msgShow();
    })()
    .catch((e) => {
            $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done();
        })
}
async function all() {
    if (!Length) {
        $.msg(
            $.name,
            '提示：⚠️请点击前往获取http://share.xiaoniuaso.com/43?invitecode=10008933\n',
            'http://share.xiaoniuaso.com/43?invitecode=10008933', {
                "open-url": "http://share.xiaoniuaso.com/43?invitecode=10008933"
            }
        );
        return;
    }
    for (let i = 0; i < Length; i++) {
        if (COOKIE.ymzhuanggbodyVal) {
            ymzhuanggbodyVal = YMZ_COOKIES.ymzhuanggbodyVal[i];
            ymzhuanspbodyVal = YMZ_COOKIES.ymzhuanspbodyVal[i];
            ymzhuantxbodyVal = YMZ_COOKIES.ymzhuantxbodyVal[i];
        }
        if (!COOKIE.ymzhuanggbodyVal) {
            ymzhuanggbodyVal = ymzhuanggbodyArr[i];
            ymzhuanspbodyVal = ymzhuanspbodyArr[i];
            ymzhuantxbodyVal = ymzhuantxbodyArr[i];
        }
        header = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-cn",
            "Connection": "close",
            "Content-Length": "28",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "ymz.iphonezhuan.com",
            "User-Agent": "%E7%BE%8A%E6%AF%9B%E8%8B%B1%E6%B1%89%E8%AF%8D%E5%85%B8/1.03 CFNetwork/1206 Darwin/20.1.0",
        }
        uid = decodeUnicode(ymzhuanggbodyVal.split('uid=')[1].split('&')[0])
        O = (`${$.name + (i + 1)}🔔`);
        await user(); //用户名
        await console.log(`-------------------------\n\n🔔开始运行【${$.name+(i+1)}】`)
        let cookie_is_live = await task(); //用户名
        if (!cookie_is_live) {
            continue;
        }
        if (gg.status == 0) {
            await ggrw() //广告任务
            await $.wait(4 * 33000)
        }
        if (sp.status == 0) {
            await sprw() //视频任务
            await $.wait(5 * 33000)
        }
        await signinfo() //签到
        if (CASH > 0 && nowTimes.getHours() >= 8 && nowTimes.getHours() < 20) {
            if (CASH <= 100 && $.task.integral / 100 >= CASH) {
                await tixian() //提现
            }
            if (CASH == 888) {
                if ($.task.integral / 100 >= 100) {
                    CASH = 100
                } else if ($.task.integral / 100 >= 50) {
                    CASH = 50
                } else if ($.task.integral / 100 >= 20) {
                    CASH = 20
                } else if ($.task.integral / 100 >= 10) {
                    CASH = 10
                } else if ($.task.integral / 100 >= 3) {
                    CASH = 3
                }
                if (CASH != 888) {
                    await tixian() //提现
                }
            }
        }
    }
}
//通知
function msgShow() {
    return new Promise(async resolve => {
        if (notifyInterval != 1) {
            console.log($.name + '\n' + $.message);
        }
        if (notifyInterval == 1) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
            await notify.sendNotify($.name, $.message);
        resolve()
    })
}
//用户名
function user() {
    console.log(`\n${O}\n========== ${uid} ==========\n`)
    $.message += `\n${O}\n========== 【${uid}】 ==========\n`;
}
//任务列表
function task(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://ymz.iphonezhuan.com/gettask`,
                headers: header,
                body: `channelID=2&uid=${uid}&ver=102`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 任务列表🚩: ${data}`);
                    $.task = JSON.parse(data);
                    if ($.task.statuscode == 200) {
                        gg = $.task.result.find(item => item.action === "banner://");
                        sp = $.task.result.find(item => item.action === "video://");
                        console.log(`现金余额:${$.task.integral/100}元\n${gg.name}:${gg.nowcount}/${gg.count}\n${sp.name}:${sp.nowcount}/${sp.count}\n`)
                        $.message += `【现金余额】:${$.task.integral/100}元\n【${gg.name}】:${gg.nowcount}/${gg.count}\n【${sp.name}】:${sp.nowcount}/${sp.count}\n`
                        resolve(true);
                    }
                    if ($.task.statuscode != 200) {
                        $.msg(O, time(Number(tts())) + "❌❌❌COOKIE失效");
                        if ($.isNode()) {
                            notify.sendNotify(O, time(Number(tts())) + "❌❌❌COOKIE失效");
                        }
                        resolve(false);
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//广告任务
function ggrw(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        let url = {
                            url: `http://ymz.iphonezhuan.com/addaction?`,
                            headers: header,
                            body: ymzhuanggbodyVal,
                        }
                        $.post(url, async (err, resp, data) => {
                            try {
                                if (logs) $.log(`${O}, 广告任务🚩: ${data}`);
                                $.ggrw = JSON.parse(data);
                                if ($.ggrw.statuscode == 200) {
                                    console.log(`${gg.name+(i+1)}：执行成功\n`);
                                    $.message += `【${gg.name+(i+1)}】：执行成功\n`;
                                }
                            } catch (e) {
                                $.logErr(e, resp);
                            } finally {
                                resolve()
                            }
                        })
                    }, i * 33000);
                }
            },
            timeout)
    })
}
//视频任务
function sprw(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        let url = {
                            url: `http://ymz.iphonezhuan.com/addaction?`,
                            headers: header,
                            body: ymzhuanspbodyVal,
                        }
                        $.post(url, async (err, resp, data) => {
                            try {
                                if (logs) $.log(`${O}, 视频任务🚩: ${data}`);
                                $.sprw = JSON.parse(data);
                                if ($.sprw.statuscode == 200) {
                                    console.log(`${sp.name+(i+1)}：执行成功\n`);
                                    $.message += `【${sp.name+(i+1)}】：执行成功\n`;
                                }
                            } catch (e) {
                                $.logErr(e, resp);
                            } finally {
                                resolve()
                            }
                        })
                    }, i * 33000);
                }
            },
            timeout)
    })
}
//每日签到
function sign(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://ymz.iphonezhuan.com/submitsign?`,
                headers: header,
                body: `channelID=2&uid=${uid}&ver=102`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 每日签到🚩: ${data}`);
                    $.sign = JSON.parse(data);
                    if ($.sign.statuscode == 200) {
                        console.log(`每日签到：${$.sign.msg},获得${$.sign.result.nowintegrals/100}元\n`);
                        $.message += `【每日签到】：${$.sign.msg},获得${$.sign.result.nowintegrals/100}元\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//签到列表
function signinfo(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `http://ymz.iphonezhuan.com/getsignlist`,
                headers: header,
                body: `channelID=2&uid=${uid}&ver=102`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 签到列表🚩: ${data}`);
                    $.signinfo = JSON.parse(data);
                    if ($.signinfo.statuscode == 200) {
                        daysign = $.signinfo.result.days[$.signinfo.result.days.length - 1]
                        if ($.signinfo.result.days.length) {
                            console.log(`签到列表：已签到${$.signinfo.result.days.length}天\n`);
                            $.message += `【签到列表】：已签到${$.signinfo.result.days.length}天\n`;
                        }
                        if (!daysign || daysign < nowTimes.getDate()) {
                            await sign() //签到
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//现金提现
function tixian(timeout = 0) {
    return new Promise((resolve) => {
        money = ymzhuantxbodyVal.split('money=')[1].split('&')[0]
        timestamp = ymzhuantxbodyVal.split('timestamp=')[1].split('&')[0]

        if (ymzhuantxbodyVal.indexOf("cellphone") >= 0 && ymzhuantxbodyVal.indexOf("code") >= 0) {
            cellphone = ymzhuantxbodyVal.split('cellphone=')[1].split('&')[0]
            code = ymzhuantxbodyVal.split('code=')[1].split('&')[0]
            ymzhuantxbody = ymzhuantxbodyVal.replace(`cellphone=${cellphone}&`, ``).replace(`code=${code}&`, ``).replace(`money=${money}`, `money=${CASH}`).replace(`timestamp=${timestamp}`, `timestamp=${tts()}`)
        } else {
            ymzhuantxbody = ymzhuantxbodyVal.replace(`money=${money}`, `money=${CASH}`).replace(`timestamp=${timestamp}`, `timestamp=${tts()}`)
        }

        setTimeout(() => {

            let url = {
                url: `http://ymz.iphonezhuan.com/submitwithdraw`,
                headers: header,
                body: ymzhuantxbody,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 现金提现🚩: ${data}`);
                    $.tixian = JSON.parse(data);
                        console.log(`现金提现：${$.tixian.msg}\n`);
                        $.message += `【现金提现】：${$.tixian.msg}\n`;                  
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
// prettier-ignore
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, ``).trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ``;
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, ``) : e
                } catch (t) {
                    e = ``
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + ``).substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr((`` + e[s]).length)));
            return t
        }
        msg(e = t, s = ``, i = ``, r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = [``, "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
                                                                                                                                        /**
*
    ！！！此脚本永远禁止 “所谓大佬————shuye73” 使用，是我耽误您抄袭了，祝您和您的家人平安。

    Name: 京喜财富岛
    Address: 京喜App ====>>>> 全民赚大钱
    Author: MoPoQAQ
    Created：2020/x/xx xx:xx
    Updated: 2021/3/12 14:20
    Thanks:
      whyour大佬
      GitHub: https://github.com/whyour
      
      新用户签到问题反馈者：https://github.com/NanjolnoRing
    
    获取Token方式：
      1.打开【❗️京喜农场❗️】，手动任意完成<工厂任务>、<签到任务>、<金牌厂长任务>一项，提示获取cookie成功即可，然后退出跑任务脚本
      2.京喜工厂收取电力一次
      3.财富岛手动提现一次
    
    hostname = wq.jd.com, m.jingxi.com
    
    Quantumult X:
    [task_local]
    0 * * * * https://raw.githubusercontent.com/moposmall/Script/main/Me/jx_cfd.js, tag=京喜财富岛, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxcfd.png, enabled=true
    [rewrite_local]
    ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
    ^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
    ^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js

    Loon:
    [Script]
    http-request ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=10, tag=京喜token
    http-request ^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=10, tag=京喜token
    http-request ^^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=10, tag=京喜token
    cron "0 * * * *" script-path=https://raw.githubusercontent.com/moposmall/Script/main/Me/jx_cfd.js,tag=京喜财富岛
    
    Surge:
    京喜财富岛 = type=cron,cronexp="0 * * * *",wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/moposmall/Script/main/Me/jx_cfd.js
    京喜token = type=http-request,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
    京喜token = type=http-request,pattern=^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
    京喜token = type=http-request,pattern=^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
    
    Shadowrocket:
    [Script]
    京喜财富岛 = type=cron,script-path=https://raw.githubusercontent.com/moposmall/Script/main/Me/jx_cfd.js,cronexpr="0 * * * *",timeout=120,enable=true
    京喜token = type=http-request,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,max-size=131072,timeout=10,enable=true
    京喜token = type=http-request,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js,pattern=^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity,max-size=131072,timeout=10,enable=true
    京喜token = type=http-request,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js,pattern=^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut,max-size=131072,timeout=10,enable=true
    
    BoxJS订阅
    https://raw.githubusercontent.com/whyour/hundun/master/quanx/whyour.boxjs.json

    Docker：
      1.上传jx_cfd.js文件到scripts文件夹下

      2.修改以下三个参数

      ################################## 是否添加DIY脚本（选填） ##################################
      ## 如果你自己会写shell脚本，并且希望在每次git_pull.sh这个脚本运行时，额外运行你的DIY脚本，请赋值为 "true"
      ## 同时，请务必将你的脚本命名为 diy.sh (只能叫这个文件名)，放在 config 目录下
      ## 我已定义好的变量，你如果想直接使用，可以参考本仓库下 git_pull.sh 文件
      EnableExtraShell="true"

      ################################## 定义京喜农场TOKEN（选填） ##################################
      ## 如果某个Cookie的账号种植的是app种子，则必须填入有效的TOKEN；而种植非app种子则不需要TOKEN
      ## TOKEN的形式：{"farm_jstoken":"749a90f871adsfads8ffda7bf3b1576760","timestamp":"1610165423873","phoneid":"42c7e3dadfadsfdsaac-18f0e4f4a0cf"}
      ## 因TOKEN中带有双引号，因此，变量值两侧必须由一对单引号引起来
      ## TOKEN如何获取请阅读以下文件的注释：https://github.com/lxk0301/jd_scripts/blob/master/jd_jxnc.js
      TokenJxnc1='{"farm_jstoken":"xxx","phoneid":"xxx","timestamp":"xxx"}'
      TokenJxnc2=''
      TokenJxnc3=''
      TokenJxnc4=''
      TokenJxnc5=''
      TokenJxnc6=''

      Docker通知推送：
      ################################## 京喜财富岛是否静默运行 ##################################
      ## 默认为 "false"，静默，不发送推送通知消息，如想收到通知，请修改为 "true"
      ## 如果你不想完全关闭或者完全开启通知，只想在特定的时间发送通知，可以参考上面面的“定义东东萌宠是否静默运行”部分，设定几个if判断条件
      export CFD_NOTIFY_CONTROL=""

    logs:
    2021/2/24 9:00
      - 添加自动领取年终福利活动
      - 添加自动领取升级奖励
      - 修复超级助力App环境问题
    2021/2/25 11:11
      - 修复长时间不改代码问题
*
**/

const $ = new Env("京喜财富岛");
const JD_API_HOST = "https://m.jingxi.com/";
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const jdTokenNode = $.isNode() ? require('./jdJxncTokens.js') : '';
$.showLog = $.getdata("cfd_showLog") ? $.getdata("cfd_showLog") === "true" : false;
$.notifyTime = $.getdata("cfd_notifyTime");
$.result = [];
$.cookieArr = [];
$.currentCookie = '';
$.tokenArr = [];
$.currentToken = {};
$.allTask = [];
$.info = {};

!(async () => {
  if (!getCookies()) return;
  if (!getTokens()) return;
  for (let i = 0; i < $.cookieArr.length; i++) {
    $.currentCookie = $.cookieArr[i];
    $.currentToken = $.tokenArr[i] || {};
    if ($.currentCookie) {
      $.userName = decodeURIComponent($.currentCookie.match(/pt_pin=(.+?);/) && $.currentCookie.match(/pt_pin=(.+?);/)[1]);
      $.index = i + 1;
      $.nickName = '';
      
      $.log(`\n开始【京东账号${i + 1}】${$.userName}`);

      const beginInfo = await getUserInfo();
         
      await $.wait(500);
      await querySignList();

      //领取岛主升级奖励
      promotionAward();

      //领取年终福利
      await $.wait(500);
      getAdvEmployee(1001);

      await $.wait(500);
      await getMoney();
      
      //日常任务
      await $.wait(500);
      await getTaskList(0);      
      await $.wait(500);
      await browserTask(0);
      
      //寻宝
      await $.wait(500);
      await treasureHunt();

      //偷财富
      await $.wait(500);
      await friendCircle();

      //成就任务
      await $.wait(500);
      await getTaskList(1);
      await $.wait(500);
      await browserTask(1);

      //抽奖
      await $.wait(500);
      await funCenterState();

      //领取寻宝宝箱
      await $.wait(500);
      await openPeriodBox();

      const endInfo = await getUserInfo();
      $.result.push(
        `【💵财富值】任务前: ${beginInfo.ddwMoney}\n【💵财富值】任务后: ${endInfo.ddwMoney}`,
        `【💵财富值】净增值: ${endInfo.ddwMoney - beginInfo.ddwMoney}`
      );

      //出岛寻宝大作战
      await $.wait(500);
      await submitGroupId();
      await $.wait(500);
      await joinGroup();
      //提交邀请码
      await $.wait(500);
      await submitInviteId($.userName);
      //超级助力
      await $.wait(500);
      await createSuperAssistUser();
      //普通助力
      await $.wait(500);
      await createAssistUser();
    }
  }
  await $.wait(500);
  await showMsg();
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done());


function getUserInfo() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/QueryUserInfo`), (err, resp, data) => {
      try {
        const {
          iret,
          SceneList = {},
          XbStatus: { XBDetail = [], dwXBRemainCnt } = {},
          ddwMoney,
          dwIsNewUser,
          sErrMsg,
          strMyShareId,
          strPin,
        } = JSON.parse(data);
        $.log(`\n获取用户信息：${sErrMsg}\n${$.showLog ? data : ""}`);
        $.info = {
          ...$.info,
          SceneList,
          XBDetail,
          dwXBRemainCnt,
          ddwMoney,
          dwIsNewUser,
          strMyShareId,
          strPin,
        };
        resolve({
          SceneList,
          XBDetail,
          dwXBRemainCnt,
          ddwMoney,
          dwIsNewUser,
          strMyShareId,
          strPin,
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//签到列表
function querySignList() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`task/QuerySignListV2`), async (err, resp, data) => {
      try {
        const { iRet, sData: { Sign = [{}], dwUserFlag }, sErrMsg } = JSON.parse(data);
        $.log(`\n签到列表：${sErrMsg}\n${$.showLog ? data : ""}`);
        const [{ dwStatus, ddwMoney }] = Sign.filter(x => x.dwShowFlag === 1);
        if (dwStatus === 0) {
          await userSignReward(dwUserFlag, ddwMoney);
        } else {
          $.log(`\n📌签到：你今日已签到过啦，请明天再来`);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//签到
async function userSignReward(dwUserFlag,ddwMoney) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(
        `task/UserSignRewardV2`,
        `dwReqUserFlag=${dwUserFlag}&ddwMoney=${ddwMoney}`
      ),
      async (err, resp, data) => {
        try {
          //$.log(data)
          const { iRet, sData: { ddwMoney }, sErrMsg } = JSON.parse(data);
          $.log(`\n📌签到：${sErrMsg}，获得财富 ¥ ${ddwMoney || 0}\n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//领取财富值
//dwSource=[1,2,3]  1:岛主自产财富 2:普通助力财富 3:超级助力财富
function getMoney() {
  return new Promise(async (resolve) => {
    const sceneList = $.info.SceneList;
    for (var _key of Object.keys($.info.SceneList)) {
      try {
        //领取自产财富
        await $.wait(500);
        await getMoney_dwSource_1( _key, sceneList );
        //领取普通助力的财富
        const employeeList = eval('('+ JSON.stringify(sceneList[_key].EmployeeList) +')');
        if(employeeList !== ""){
          for( var key of Object.keys(employeeList) ) {
            await $.wait(500);
            await getMoney_dwSource_2( _key, sceneList, key );
          }
        }
        //领取超级助力财富
        await $.wait(500);
        await getMoney_dwSource_3( _key, sceneList );
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    }
  });
}

//领取自产财富
function getMoney_dwSource_1( _key, sceneList ) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`user/GetMoney`,`dwSceneId=${_key}&strEmployeeId=undefined&dwSource=1`),
      async (err, resp, data) => {
        try {
          const { iRet, dwMoney, sErrMsg } = JSON.parse(data);
          $.log(`\n【${sceneList[_key].strSceneName}】🏝岛主 : ${ sErrMsg == 'success' ? `获取财富值：¥ ${dwMoney || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//领取普通助力的财富
function getMoney_dwSource_2( _key, sceneList, key ) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`user/GetMoney`, `dwSceneId=${_key}&strEmployeeId=${key}&dwSource=2`), 
      async (err, resp, data) => {
        try {
          const { dwMoney, iRet, sErrMsg, strPin } = JSON.parse(data);
          $.log(`\n【${sceneList[_key].strSceneName}】👬好友: ${ sErrMsg == 'success' ? `获取普通助力财富值：¥ ${dwMoney || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//领取超级助力财富
function getMoney_dwSource_3( _key, sceneList ) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`user/GetMoney`,`dwSceneId=${_key}&strEmployeeId=&dwSource=3&strPgtimestamp=${$.currentToken['timestamp']}&strPhoneID=${$.currentToken['phoneid']}&strPgUUNum=${$.currentToken['farm_jstoken']}`), 
      async (err, resp, data) => {
        try {
          const { iRet, dwMoney, sErrMsg, strPin } = JSON.parse(data);
          $.log(`\n【${sceneList[_key].strSceneName}】👬好友: ${ sErrMsg == 'success' ? `获取超级助力财富值：¥ ${dwMoney || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//判断年终福利是否领取
//user/GetAdvEmployee
//strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=1614127340116&ptag=138631.26.55&
//dwSenceId=1001&dwIsSlave=0&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwIsSlave%2CdwSenceId%2Cptag%2Csource%2CstrZone
//&_=1614127340121&sceneval=2&g_login_type=1&callback=jsonpCBKH&g_ty=ls
function getAdvEmployee(_key) { 
  $.get(taskUrl(`user/GetAdvEmployee`, `dwSenceId=${_key}&dwIsSlave=0&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwIsSlave%2CdwSenceId%2Cptag%2Csource%2CstrZone`), async(err, resp, data) => {
    try {
      const { SceneEmployeeInfo:{ SceneId, SceneName, dwCurStage } , dwNextSceneId, sErrMsg } = JSON.parse(data);
      if( sErrMsg === `success` && dwCurStage === 1) {
        await advEmployeeAward( SceneId, SceneName );
        await $.wait(500);
        if(dwNextSceneId > 0 ) {
          _key = dwNextSceneId;
          getAdvEmployee (_key);
        }
      }
    } catch (e) {
      $.logErr(e, resp);
    }
  });
}

//领取年终福利
//user/AdvEmployeeAward
//strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=1614127342671&ptag=138631.26.55
//&dwSenceId=1001&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwSenceId%2Cptag%2Csource%2CstrZone&_ste=1
//&_=1614127342672&sceneval=2&g_login_type=1&callback=jsonpCBKQ&g_ty=ls
function advEmployeeAward(_key, strSceneName) {
  return new Promise(async (resolve) =>{
    $.get(taskUrl(`user/AdvEmployeeAward`,`dwSenceId=${_key}&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwSenceId%2Cptag%2Csource%2CstrZone`), async(err, resp, data) => {
      try {
        const  { sErrMsg, strAwardDetail: { strName } } = JSON.parse(data);
        $.log(`\n【${strSceneName}】💰雇主奖励：${ sErrMsg == 'success' ? `获取雇主奖励：¥ ${strName || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//领取岛主升级奖励
//user/PromotionAward
//strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=1614127340122&ptag=138631.26.55
//&_stk=_cfd_t%2CbizCode%2CdwEnv%2Cptag%2Csource%2CstrZone&_ste=1
//&_=1614127340124&sceneval=2&g_login_type=1&callback=jsonpCBKI&g_ty=ls
function promotionAward() {
  $.get(taskUrl(`user/PromotionAward`, `_stk=_cfd_t%2CbizCode%2CdwEnv%2Cptag%2Csource%2CstrZone`), async (err, resp, data) => {
    try {
      const { sErrMsg, strPrizeName } = JSON.parse(data);
      $.log(`\n💰岛主升级奖励：${ sErrMsg == 'success' ? `获取升级奖励：¥ ${strPrizeName || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
    } catch (e) {
      $.logErr(e, resp);
    }
  });
}

//好友圈偷财富
function friendCircle() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/FriendCircle`, `dwPageIndex=1&dwPageSize=20`), async(err, resp, data) => {
      try {
        //$.log(`\n好友圈列表\n${data}`);
        const {MomentList = [],iRet,sErrMsg,strShareId} = JSON.parse(data);
        for (moment of MomentList) {
          if (moment.strShareId !== strShareId && moment.dwAccessMoney > 0) {
            await queryFriendIsland(moment.strShareId);
            await $.wait(500);
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

//获取好友信息
function queryFriendIsland(strShareId,){
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/QueryFriendIsland`, `strShareId=${strShareId}&sceneval=2`), 
      async(err, resp, data) => {
        try {
          //$.log(`\n获取好友信息\n${data}`);
          const {SceneList = {},dwStealMoney,sErrMsg,strFriendNick} = JSON.parse(data);
          if (sErrMsg === "success") {
            const sceneList = eval('(' + JSON.stringify(SceneList) + ')');
            const sceneIds = Object.keys(SceneList);
            for (sceneId of sceneIds) {
              await stealMoney(strShareId,sceneId,strFriendNick,sceneList[sceneId].strSceneName);
              await $.wait(500);
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

//偷财富
function stealMoney(strShareId, sceneId, strFriendNick, strSceneName){
  return new Promise(async (resolve) =>{
    $.get(taskUrl(`user/StealMoney`, `strFriendId=${strShareId}&dwSceneId=${sceneId}&sceneval=2`), async(err, resp, data) => {
      try {
        //$.log(data);
        const {dwGetMoney,iRet,sErrMsg} = JSON.parse(data);
        $.log(`\n🤏偷取好友【${strFriendNick}】【${strSceneName}】财富值：¥ ${dwGetMoney ? dwGetMoney : sErrMsg}\n${$.showLog ? data: ""}`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//寻宝  
async function treasureHunt() {
  if($.info.dwXBRemainCnt > 0) {
    const xbDetail = $.info.XBDetail;
    for (let i = 0; i < xbDetail.length; i++) {
      const { ddwColdEndTm, strIndex }= xbDetail[i];
      const currentTm = Math.round(new Date() / 1000);
      if( currentTm > ddwColdEndTm ) {
        await doTreasureHunt(strIndex);
        await $.wait(3000);
      } else {
        $.log(`\n🎁寻宝：宝藏冷却中，请等待冷却完毕`);
      }
    }
  } else {
    $.log(`\n🎁寻宝：寻宝次数不足`);
  }
}

function doTreasureHunt(place) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`consume/TreasureHunt`, `strIndex=${place}&dwIsShare=0`),
      async (err, resp, data) => {
        try {
          //$.log(data);
          const { iRet, dwExpericnce, sErrMsg } = JSON.parse(data);
          $.log(`\n【${place}】🎁寻宝：${sErrMsg} ，获取随机奖励：¥ ${dwExpericnce || 0} \n${$.showLog ? data : ""}`);
          resolve(iRet)
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//任务赚财富
function getTaskList(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType){
      case 0: //日常任务
        $.get(taskListUrl("GetUserTaskStatusList"), async (err, resp, data) => {
          try {
            const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
            $.allTask = userTaskStatusList.filter((x) => x.awardStatus !== 1);
            $.log(`\n获取【📆日常任务】列表 ${msg}，总共${$.allTask.length}个任务！\n${$.showLog ? data : ""}`);
          } catch (e) {
            $.logErr(e, resp);  
          } finally {
            resolve();
          }
        });
        break;
      case 1: //成就任务
        $.get(taskUrl("consume/AchieveInfo"), async (err, resp, data) => {
          try{
            const { iRet, sErrMsg, taskinfo = [] } = JSON.parse(data);
            $.allTask = taskinfo.filter((x) => x.dwAwardStatus === 1);
            $.log(`\n获取【🎖成就任务】列表 ${sErrMsg}，总共${$.allTask.length}个任务！\n${$.showLog ? data : ""}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      default:
        break;
    }
  });
}

//浏览任务 + 做任务 + 领取奖励
function browserTask(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType) {
      case 0://日常任务
        const times = Math.max(...[...$.allTask].map((x) => x.configTargetTimes));
        for (let i = 0; i < $.allTask.length; i++) {          
          const taskinfo = $.allTask[i];
          $.log(`\n开始第${i + 1}个【📆日常任务】：${taskinfo.taskName}`);
          const status = [true, true];
          for (let i = 0; i < times; i++) {
            await $.wait(500);
            if (status[0]) {
              //做任务
              status[0] = await doTask(taskinfo);
            }
            await $.wait(500);
            if (status[1]) {
              //领取奖励
              status[1] = await awardTask(0, taskinfo);
            }
            if (!status[0] && !status[1]) {
              break;
            }
          }
          $.log(`\n结束第${i + 1}个【📆日常任务】：${taskinfo.taskName}\n`);
        }
        break;
      case 1://成就任务
        for (let i = 0; i < $.allTask.length; i++) {
          const taskinfo = $.allTask[i];
          $.log(`\n开始第${i + 1}个【🎖成就任务】：${taskinfo.strTaskDescr}`);
          if(taskinfo.dwAwardStatus === "0"){
            $.log(`\n${taskinfo.strTaskDescr}【领成就奖励】：该成就任务未达到门槛}`);
          } else {
            await $.wait(500);
            //领奖励
            await awardTask(1, taskinfo);
          }
          $.log(`\n结束第${i + 1}个【🎖成就任务】：${taskinfo.strTaskDescr}\n`);
        }        
        break;
      default:
        break;
    }
    resolve();
  });
}

//做任务
function doTask(taskinfo) {
  return new Promise(async (resolve) => {
    const { taskId, completedTimes, configTargetTimes, taskName } = taskinfo;
    if (parseInt(completedTimes) >= parseInt(configTargetTimes)) {
      resolve(false);
      $.log(`\n${taskName}【做日常任务】： mission success`);
      return;
    }
    $.get(taskListUrl(`DoTask`, `taskId=${taskId}`), (err, resp, data) => {
      try {
        //$.log(`taskId:${taskId},data:${data}`);
        const { msg, ret } = JSON.parse(data);
        $.log(`\n${taskName}【做日常任务】：${msg.indexOf("活动太火爆了") !== -1 ? "任务进行中或者未到任务时间" : msg }\n${$.showLog ? data : ""}`);
        resolve(ret === 0);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//领取奖励
function awardTask( taskType, taskinfo) {
  return new Promise((resolve) => {
    switch (taskType) {
      case 0://日常任务
        const { taskId, taskName } = taskinfo;
        $.get(taskListUrl(`Award`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            const { msg, ret, data: { prizeInfo = '' } = {} } = JSON.parse(data);
            let str = '';
            if (msg.indexOf('活动太火爆了') !== -1) {
              str = '任务为成就任务或者未到任务时间';
            } else {
              str = msg + prizeInfo ? ` 获得财富值 ¥ ${JSON.parse(prizeInfo).ddwMoney}` : '';
            }
            $.log(`\n${taskName}【领日常奖励】：${str}\n${$.showLog ? data : ''}`);
            resolve(ret === 0);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      case 1://成就奖励
        const { strTaskIndex, strTaskDescr } = taskinfo;
        $.get(taskUrl(`consume/AchieveAward`, `strTaskIndex=${strTaskIndex}`), (err, resp, data) => {
          try {
            const { iRet, sErrMsg, dwExpericnce } = JSON.parse(data);
            $.log(`\n${strTaskDescr}【领成就奖励】： success 获得财富值：¥ ${dwExpericnce}\n${ $.showLog ? data : '' }`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      default:
        break
    }
  });
}

//娱乐中心
function funCenterState() {
  return new Promise(resolve => {
    $.get(taskUrl(`consume/FunCenterState`, `strType=1`), async(err, resp, data) => {
      try {
        const {  SlotMachine: { ddwConfVersion, dwFreeCount, strCouponPool, strGoodsPool } = {}, iRet, sErrMsg } = JSON.parse(data);
        if(dwFreeCount == 1) {
          await $.wait(500);
          await soltMachine(strCouponPool,strGoodsPool,ddwConfVersion);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//抽奖机
function soltMachine(strCouponPool,strGoodsPool,ddwConfVersion) {
  return new Promise(resolve => {
    $.get(taskUrl(`consume/SlotMachine`,`strCouponPool=${strCouponPool}&strGoodsPool=${strGoodsPool}&ddwConfVersion=${ddwConfVersion}`), async(err, resp, data) => {
      try {
        const { iRet, sErrMsg, strAwardPoolName } = JSON.parse(data);
        $.log(`\n【抽奖结果】🎰 ${strAwardPoolName != "" ? "未中奖" : strAwardPoolName} \n${ $.showLog ? data : '' }`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//提交互助码
function submitInviteId(userName) {
  return new Promise(resolve => {
    if (!$.info || !$.info.strMyShareId) {
      resolve();
      return;
    }
    $.log('\n【🏖岛主】你的互助码: ' + $.info.strMyShareId);
    $.post(
      {
        url: `https://api.ninesix.cc/api/jx-cfd/${$.info.strMyShareId}/${encodeURIComponent(userName)}`,
      },
      async (err, resp, _data) => {
        try {
          const { data = {}, code } = JSON.parse(_data);
          $.log(`\n【🏖岛主】邀请码提交：${code}\n${$.showLog ? _data : ''}`);
          if (data.value) {
            $.result.push('【🏖岛主】邀请码提交成功！');
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

//随机超级助力好友
//user/JoinScene
//strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=1614129401306&ptag=&
//strShareId=90A15070F26FE5335C0DD5B80BC737B570EE3333E55C6586B913301C30BBD298&dwSceneId=1001&dwType=2
//&strPgtimestamp=1614129401239&strPhoneID=1fdab515ff3293f7fa8979661e521458d5a7a0b3&strPgUUNum=5e9a1cf37e0ad6fbe634840fcfe0ebb3
//&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwSceneId%2CdwType%2Cptag%2Csource%2CstrPgUUNum%2CstrPgtimestamp%2CstrPhoneID%2CstrShareId%2CstrZone
function createSuperAssistUser() {
  return new Promise(resolve => {
    const sceneIds = Object.keys($.info.SceneList);
    const sceneId = Math.min(...sceneIds);
    $.get({ url: 'https://api.ninesix.cc/api/jx-cfd' }, async (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n【👫🏻超级助力】超级助力码：${data.value}\n${$.showLog ? _data : ''}`);
        $.get(taskUrl('user/JoinScene', `strPgtimestamp=${$.currentToken['timestamp']}&strPhoneID=${$.currentToken['phoneid']}&strPgUUNum=${$.currentToken['farm_jstoken']}&strShareId=${escape(data.value)}&dwSceneId=${sceneId}&dwType=2&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwSceneId%2CdwType%2Cptag%2Csource%2CstrPgUUNum%2CstrPgtimestamp%2CstrPhoneID%2CstrShareId%2CstrZone`), async (err, resp, data) => {
          try {
            const { sErrMsg, data: { rewardMoney = 0 } = {} } = JSON.parse(data);
            $.log(`\n【👫🏻超级助力】超级助力：${sErrMsg}\n${$.showLog ? data : ''}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//随机助力好友
function createAssistUser() {
  return new Promise(resolve => {
    const sceneIds = Object.keys($.info.SceneList);
    const sceneId = Math.min(...sceneIds);
    $.get({ url: 'https://api.ninesix.cc/api/jx-cfd' }, async (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n【👬普通助力】普通助力码：${data.value}\n${$.showLog ? _data : ''}`);
        $.get(taskUrl('user/JoinScene', `strShareId=${escape(data.value)}&dwSceneId=${sceneId}`), async (err, resp, data) => {
          try {
            const { sErrMsg, data: { rewardMoney = 0 } = {} } = JSON.parse(data);
            $.log(`\n【👬普通助力】助力：${sErrMsg}\n${$.showLog ? data : ''}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
      	resolve();
      }
    });
  });
}

//提交互助码
function submitGroupId() {
  return new Promise(resolve => {
    $.get(taskUrl(`user/GatherForture`), async (err, resp, g_data) => {
      try {
        const { GroupInfo:{ strGroupId }, strPin } = JSON.parse(g_data);
        if(!strGroupId) {
          const status = await openGroup();
          if(status === 0) {
            await submitGroupId();
          } else {
            resolve();
            return;
          }
        } else {
          $.log('你的【🏝寻宝大作战】互助码: ' + strGroupId);
          $.post(
            {url: `https://api.ninesix.cc/api/jx-cfd-group/${strGroupId}/${encodeURIComponent(strPin)}`},
            async (err, resp, _data) => {
              try {
                const { data = {}, code } = JSON.parse(_data);
                $.log(`\n【🏝寻宝大作战】邀请码提交：${code}\n${$.showLog ? _data : ''}`);
                if (data.value) {
                  $.result.push('【🏝寻宝大作战】邀请码提交成功！');
                }
              } catch (e) {
                $.logErr(e, resp);
                resolve();
              } finally {
                resolve();
              }
            }
          );
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//开启寻宝大作战
function openGroup() {
  return new Promise( async (resolve) => {
    $.get(taskUrl(`user/OpenGroup`, `dwIsNewUser=${$.info.dwIsNewUser}`), async (err, resp, data) => {
      try {
        const { sErrMsg } = JSON.parse(data);
        $.log(`\n【🏝寻宝大作战】${sErrMsg}\n${$.showLog ? data : ''}`);
        resolve(0);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//助力好友寻宝大作战
//user/JoinGroup
//strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=1614153421905&ptag=138920.20.4&
//strGroupId=Jxcfd_GroupId_202_37661794&dwIsNewUser=0&pgtimestamp=1614153421889&phoneID=1fdab515ff3293f7fa8979661e521458d5a7a0b3&pgUUNum=794e1fa83f6455e43a18853b4f6e1419
//&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwIsNewUser%2CpgUUNum%2Cpgtimestamp%2CphoneID%2Cptag%2Csource%2CstrGroupId%2CstrZone&_ste=1
//&_=1614153421918&sceneval=2&g_login_type=1&callback=jsonpCBKI&g_ty=ls
function joinGroup() {
  return new Promise( async (resolve) => {
    $.get({ url: 'https://api.ninesix.cc/api/jx-cfd-group' }, (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n【🏝寻宝大作战】随机助力码：${data.value}\n${$.showLog ? _data : ''}`);
        $.get(taskUrl(`user/JoinGroup`, `strGroupId=${data.value}&dwIsNewUser=${$.info.dwIsNewUser}&pgtimestamp=${$.currentToken['timestamp']}&phoneID=${$.currentToken['phoneid']}&pgUUNum=${$.currentToken['farm_jstoken']}&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwIsNewUser%2CpgUUNum%2Cpgtimestamp%2CphoneID%2Cptag%2Csource%2CstrGroupId%2CstrZone`), (err, resp, data) => {
          try {
            const { sErrMsg } = JSON.parse(data);
            $.log(`\n【🏝寻宝大作战】助力：${sErrMsg}\n${$.showLog ? data : ''}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//寻宝大作战开宝箱
function openPeriodBox() {
  return new Promise( async (resolve) => { 
    $.get(taskUrl(`user/GatherForture`), async (err, resp, data) => {
      try {
        const { PeriodBox = [{}] } = JSON.parse(data);
        for (var i = 0; i < PeriodBox.length ; i++) {
          const { dwStatus, dwSeq, strBrandName } = PeriodBox[i];
          //1:未达条件 2:可开启 3:已开启
          if (dwStatus == 2) {
            await $.wait(1000);
            await $.get(taskUrl(`user/OpenPeriodBox`, `dwSeq=${dwSeq}`), async (err, resp, data) => {
              try {
                const { dwMoney, iRet, sErrMsg } = JSON.parse(data)
                $.log(`\n【🏝寻宝大作战】【${strBrandName}】开宝箱：${sErrMsg == 'success' ? ` 获得财富值 ¥ ${dwMoney}` : sErrMsg }\n${$.showLog ? data : ''}`);
              } catch (e) {
                $.logErr(e, resp);
              } finally {
                resolve();
              }
            });
          } else if (dwStatus == 3) {
            $.log(`\n【🏝寻宝大作战】【${strBrandName}】开宝箱：宝箱已开启过！`);
          } else {
            $.log(`\n【🏝寻宝大作战】【${strBrandName}】开宝箱：未达到宝箱开启条件，快去邀请好友助力吧！`);
            resolve();
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

function getCookies() {
  if ($.isNode()) {
    $.cookieArr = Object.values(jdCookieNode);
  } else {
    const CookiesJd = JSON.parse($.getdata("CookiesJD") || "[]").filter(x => !!x).map(x => x.cookie);
    $.cookieArr = [$.getdata("CookieJD") || "", $.getdata("CookieJD2") || "", ...CookiesJd];
  }
  if (!$.cookieArr[0]) {
    $.msg(
      $.name,
      "【⏰提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取",
      "https://bean.m.jd.com/",
      { "open-url": "https://bean.m.jd.com/", }
    );
    return false;
  }
  return true;
}

function getTokens() {
  if ($.isNode()) {
    Object.keys(jdTokenNode).forEach((item) => {
      $.tokenArr.push(jdTokenNode[item] ? JSON.parse(jdTokenNode[item]) : '{}');
    })
  } else {
    $.tokenArr = JSON.parse($.getdata('jx_tokens') || '[]');
  }
  if (!$