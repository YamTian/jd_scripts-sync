 catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//刮刮卡奖励
function guapost(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/gua/det_post?`,
                headers: header,
                body: `sign=${sign}&gid=${id}&glid=${glid}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡奖励🚩: ${data}`);
                    $.guapost = JSON.parse(data);
                    if ($.guapost.jf) {
                        console.log(`刮刮卡奖励：获得${$.guapost.jf}金币\n`);
                        $.message += `【刮刮卡奖励】：获得${$.guapost.jf}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.guapost.nonce_str
                        await index()
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
//转盘列表
function lucky(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/lucky?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘列表🚩: ${data}`);
                    $.lucky = JSON.parse(data);
                    if ($.lucky.lucky_num) {
                        console.log(`转盘列表：剩余${$.lucky.lucky_num}次，已运行${$.lucky.lucky_count}次\n`);
                        $.message += `【转盘列表】：剩余${$.lucky.lucky_num}次，已运行${$.lucky.lucky_count}次\n`;
                        if ($.lucky.lucky_num >= 1) {
                            await lucky_click() //转盘抽奖
                        }
                    }
                    if ($.lucky && $.lucky.lucky_box.indexOf('1') >= 0) {
                        box = $.lucky.lucky_box.indexOf('1') + 1
                        await lucky_box() //抽奖宝箱
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
//转盘抽奖
function lucky_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/lucky_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘抽奖🚩: ${data}`);
                    $.lucky_click = JSON.parse(data);
                    if ($.lucky_click.jinbi) {
                        console.log(`转盘抽奖：获得${$.lucky_click.jinbi}金币\n`);
                        $.message += `【转盘抽奖】：获得${$.lucky_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.lucky_click.nonce_str
                        await index()
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
//抽奖宝箱
function lucky_box(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/lucky_box?`,
                headers: header,
                body: `box=${box}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 抽奖宝箱🚩: ${data}`);
                    $.lucky_box = JSON.parse(data);
                    if ($.lucky_box.jinbi) {
                        console.log(`抽奖宝箱：获得${$.lucky_box.jinbi}金币\n`);
                        $.message += `【抽奖宝箱】：获得${$.lucky_box.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.lucky_box.nonce_str
                        await index()
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
//福利查询
function mystate(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/mystate?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 福利查询🚩: ${data}`);
                    $.mystate = JSON.parse(data);
                    if ($.mystate.code == 200) {
                        if ($.mystate.jindan_time) {
                            console.log(`金蛋时间：${$.mystate.jindan_time}秒\n`);
                            $.message += `【金蛋时间】：${$.mystate.jindan_time}秒\n`;
                        }
                        if ($.mystate.box_time) {
                            console.log(`宝箱时间：${$.mystate.box_time}秒\n`);
                            $.message += `【宝箱时间】：${$.mystate.box_time}秒\n`;
                        }
                        if ($.mystate.jindan_st == 0) {
                            await jindan_click() //金蛋
                        }
                        if ($.mystate.box_st == 0) {
                            await box_click() //宝箱
                        }
                        if ($.mystate.jindan_st == 2) {
                            console.log(`金蛋福利：已完成\n`);
                            $.message += `【金蛋福利】：已完成\n`;
                        }
                        if ($.mystate.box_st == 2) {
                            console.log(`宝箱福利：已完成\n`);
                            $.message += `【宝箱福利】：已完成\n`;
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
//金蛋前置
function jindan_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/jindan_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 金蛋前置🚩: ${data}`);
                    $.jindan_click = JSON.parse(data);
                    if ($.jindan_click.code == 200) {
                        taskid = $.jindan_click.taskid
                        nonce_str = $.jindan_click.nonce_str
                        await jindan_done() //福利金蛋
                    }
                    if ($.jindan_click.code == -1) {
                        console.log(`福利金蛋：已完成\n`);
                        $.message += `【福利金蛋】：已完成\n`;
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
//福利金蛋
function jindan_done(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://bububao.duoshoutuan.com/apps/jindan_done?`,
                    headers: header,
                    body: `taskid=${taskid}&clicktime=${ts()}&donetime=${ts()}&nonce_str=${nonce_str}&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 福利金蛋🚩: ${data}`);
                        $.jindan_done = JSON.parse(data);
                        if ($.jindan_done.code == 1) {
                            console.log(`福利金蛋：${$.jindan_done.jinbi}金币,领取成功\n`);
                            $.message += `【福利金蛋】：${$.jindan_done.jinbi}金币,领取成功\n`;
                            nonce_str = $.jindan_done.nonce_str
                            tid = 16
                            pos = 1
                            await callback()
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//宝箱前置
function box_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/box_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 宝箱前置🚩: ${data}`);
                    $.box_click = JSON.parse(data);
                    if ($.box_click.code == 200) {
                        taskid = $.box_click.taskid
                        nonce_str = $.box_click.nonce_str
                        await box_done() //福利宝箱
                    }
                    if ($.box_click.code == -1) {
                        console.log(`福利宝箱：已完成\n`);
                        $.message += `【福利宝箱】：已完成\n`;
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
//福利宝箱
function box_done(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://bububao.duoshoutuan.com/apps/box_done?`,
                    headers: header,
                    body: `taskid=${taskid}&clicktime=${ts()}&donetime=${ts()}&nonce_str=${nonce_str}&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 福利宝箱🚩: ${data}`);
                        $.box_done = JSON.parse(data);
                        if ($.box_done.code == 1) {
                            console.log(`福利宝箱：${$.box_done.jinbi}金币,领取成功\n`);
                            $.message += `【福利宝箱】：${$.box_done.jinbi}金币,领取成功\n`;
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//看看赚列表
function kk_list(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/kk_list?`,
                headers: header,
                body: `page=1&page_limit=25&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚列表🚩: ${data}`);
                    $.kk_list = JSON.parse(data);
                    is_ok = $.kk_list.data.find(item => item.is_ok === 0);
                    if (is_ok) {
                        id = is_ok.id
                        console.log(`看看赚列表：下个任务：${is_ok.mini_name}\n`);
                        $.message += `【看看赚列表】：下个任务：${is_ok.mini_name}\n`;
                        await kk_click() //看看赚执行
                    } else {
                        console.log(`看看赚：已完成\n`);
                        $.message += `【看看赚】：已完成\n`;
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
//看看赚执行
function kk_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/kk_click?`,
                headers: header,
                body: `mini_id=${id}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚执行🚩: ${data}`);
                    $.kk_click = JSON.parse(data);
                    if ($.kk_click.taskid) {
                        console.log(`看看赚执行：下个任务：${$.kk_click.mini_str}\n`);
                        $.message += `【看看赚执行】：下个任务：${$.kk_click.mini_str}\n`;
                        taskid = $.kk_click.taskid
                        nonce_str = $.kk_click.nonce_str
                        await $.wait(15000)
                        await kk_kk() //看看上传
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
//看看赚上传
function kk_kk(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://hunter-report.dui88.com/tuiaExtLog?group=1&type=9&json=%7B%22subtype%22%3A%22head%22%2C%22tck_rid_6c8%22%3A%220a56e7aaklm541ew-6681973%22%2C%22slotId%22%3A%22353024%22%2C%22activityId%22%3A%2216765%22%2C%22consumerId%22%3A%2226444115908%22%2C%22timestamp%22%3A${tts()}%7D`,
                headers: {
                    "Host": "hunter-report.dui88.com"
                },
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚上传🚩: ${data}`);
                    $.kk_kk = JSON.parse(data);
                    console.log(`看看赚：${$.kk_kk.msg}\n`);
                    $.message += `【看看赚】：${$.kk_kk.msg}\n`;
                    await $.wait(30000)
                    await kk_done() //看看赚完成
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//看看赚完成
function kk_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/kk_done?`,
                headers: header,
                body: `taskid=${taskid}&nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚完成🚩: ${data}`);
                    $.kk_done = JSON.parse(data);
                    if ($.kk_done.code == 200) {
                        console.log(`看看赚完成：获得${$.kk_done.jinbi}金币\n`);
                        $.message += `【看看赚完成】：获得${$.kk_done.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.kk_done.fb_str
                        await index()
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
//资讯赚页
function news_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/news_info?`,
                headers: header,
                body: `type_class=1&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 资讯赚页🚩: ${data}`);
                    $.news_info = JSON.parse(data);
                    if ($.news_info.code == 200) {
                        console.log(`资讯赚页：今日获得${$.news_info.jinbi}金币\n`);
                        $.message += `【资讯赚页】：今日获得${$.news_info.jinbi}金币\n`;
                        if ($.news_info.jinbi < 1000) {
                            nonce_str = $.news_info.nonce_str
                            await news_done() //资讯赚
                        }
                        if ($.news_info.jinbi >= 1000) {
                            console.log(`资讯赚：完成\n`);
                            $.message += `【资讯赚】：完成\n`;
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
//资讯赚
function news_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/news_done?`,
                headers: header,
                body: `nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 资讯赚🚩: ${data}`);
                    $.news_done = JSON.parse(data);
                    if ($.news_done.jinbi) {
                        console.log(`资讯赚：获得${$.news_done.jinbi}金币\n`);
                        $.message += `【资讯赚】：获得${$.news_done.jinbi}金币\n`;
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
//提现页
function tixian_html(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/user/tixian_html?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 提现页🚩: ${data}`);
                    $.tixian_html = JSON.parse(data);
                    if ($.tixian_html.tixian_html) {
                        jine1 = $.tixian_html.tixian_html.find(item => item.jine === '0.3');
                        jine2 = $.tixian_html.tixian_html.find(item => item.jine === '1');
                        jine3 = $.tixian_html.tixian_html.find(item => item.jine === '5');
                        jine4 = $.tixian_html.tixian_html.find(item => item.jine === '50');
                        jine5 = $.tixian_html.tixian_html.find(item => item.jine === '100');
                        jine6 = $.tixian_html.tixian_html.find(item => item.jine === '200');
                        day_tixian_tip = $.tixian_html.tixian_html.find(item => item.day_tixian_tip);
                        if (day_tixian_tip) {
                            console.log(`提现查询：今日已提现\n`);
                            $.message += `【提现查询】：今日已提现\n`;
                        }
                        console.log(`提现券：剩余${$.tixian_html.tixian_coupon}张券\n${jine2.jine}元：需要${jine2.cond}张券\n${jine3.jine}元：需要${jine3.cond}张券\n`);
                        $.message += `【提现券】：剩余${$.tixian_html.tixian_coupon}张券\n【${jine2.jine}元】：需要${jine2.cond}张券\n【${jine3.jine}元】：需要${jine3.cond}张券\n`;
                        if (!day_tixian_tip && nowTimes.getHours() >= 8 && ($.user.wx_username != "" || $.user.is_weixin == 1)) {
                            if (CASH == 0.3 && $.user.money >= CASH && $.user.day_jinbi >= 6000) {
                                await tixian() //提现
                            }
                            if (CASH == 1 && $.tixian_html.tixian_coupon >= 8 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH == 5 && $.tixian_html.tixian_coupon >= 30 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH > 5 && CASH <= 200 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH == 888) {
                                if ($.user.money >= 200) {
                                    CASH = 200
                                } else if ($.user.money >= 100) {
                                    CASH = 100
                                } else if ($.user.money >= 50) {
                                    CASH = 50
                                } else if ($.user.money > 5 && $.tixian_html.tixian_coupon >= 30) {
                                    CASH = 5
                                } else if ($.user.money > 1 && $.tixian_html.tixian_coupon >= 8) {
                                    CASH = 1
                                } else if ($.user.money > 5 && $.user.day_jinbi >= 6000) {
                                    CASH = 0.3
                                }
                                if (CASH != 888) {
                                    await tixian() //提现
                                }
                            }
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
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/user/tixian?`,
                headers: header,
                body: `tx=${CASH}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 现金提现🚩: ${data}`);
                    $.tixian = JSON.parse(data);
                    if ($.tixian.code == 200) {
                        console.log(`现金提现${CASH}：${$.tixian.tip}\n`);
                        $.message += `【现金提现${CASH}】：${$.tixian.tip}\n`;
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
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSep