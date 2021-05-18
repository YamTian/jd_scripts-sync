/*
洗护发超级品类日
活动入口：https://lzdz-isv.isvjcloud.com/dingzhi/carnival/city/activity?activityId=c8d69c6a780a11ebb588fa163e8623a7
活动时间：2021-03-08 - 2021-03-15

后续发布脚本均有加密
因为我介意别人把我脚本里的助力改了。
如果不愿意助力，可以直接下载脚本到本地，通过修改helpAhtor这个参数来关闭助力请求。
请不要修改我的助力。
脚本内置了一个给作者任务助力的网络请求，默认开启，如介意请自行关闭。
助力活动链接： https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html
参数 helpAuthor = false

更新地址：https://raw.githubusercontent.com/i-chenzhe/qx/main/z_superDay.js
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#超级品类日
13 8,10 8-15 3 * https://raw.githubusercontent.com/i-chenzhe/qx/main/z_superDay.js, tag=超级品类日, enabled=true
================Loon==============
[Script]
cron "13 8,10 8-15 3 *" script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/z_superDay.js, tag=超级品类日
===============Surge=================
超级品类日 = type=cron,cronexp="13 8,10 8-15 3 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/z_superDay.js
============小火箭=========
超级品类日 = type=cron,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/z_superDay.js, cronexpr="13 8,10 8-15 3 *", timeout=3600, enable=true
 */

const $ = new Env('超级品类日');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', originCookie = '', message = '';
let helpAuthor = false;//为作者助力的开关
const ACT_ID = 'c8d69c6a780a11ebb588fa163e8623a7';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
$.log('脚本版本 v0.6\n更新时间:2021-03-10 01:38\n仓库：https://www.github.com/i-chenzhe/qx');

 var _0xodP='jsjiami.com.v6',_0x1fa3=[_0xodP,'wozDgwXDn2k=','wpLDr0RtwpVdw6bjgYTkuK7ku5Tot5LljKk=','asOQwpXCp8Oy','wpgywpXDkcOFV8Kmw7c=','PnnCh0xjEzDCmw==','w6UbVmbDrDDDrjbCvxw=','w5wBwp8t','w7EJc2PDpg==','EMKobSzDkg==','wofDhw4=','fCTDuQU=','wrfCisKpwrA=','w5PDo8Opw5R+wrMNw6fCgSohwpDDojJ/f8O4ZykVwrTCnDN7FkHCrjDDvcOnwoDCjw==','YCzDpws=','w7rCnjPDqcKIW8Kic8OQHVrDjsK3WlA=','RMKIw54gMA==','e2jCnsK/','wq/CnMOewrFv','w6/ClF7CqQ==','woPDmsKXCMK3','wp8pw7N8','w6XCmsOsLQ==','RwVIJQ==','PHIMwq9Mwr1ld0cxwqFOU8OOwrbDnX5Jw7NjGhVmwpnDh8OqwoU9wpjDp8OzwoYWw7w=','w43DmADDmBo=','w6vCoA01w5oDwpw9w6w=','w5RawpvDjQ==','JkTCpVt+','w6hjHkgz','TMOgw5h3wpo=','OsKIwps=','5b2N5Yqw56Se5Ymeaw==','woHCrg1lw6w=','UMONMsKPEg==','UMOPEiRd','w7DDgE/Cr8KS','VcK5w58LB8KNwrnCkg==','woM+JMKbw4k=','w5LDscOJw6I=','5Li15Lqy6LSN5Yy9','wpoqw4HCjcKI4pS96I+c5b6m','CW/Cg1A=','Mjd5WSAh','w5rDusKeIcKPwpLCjMOKcFcqw4LCkcOtw4UHwqpdwocgwqDCimJLw58WOw==','w6XChGHCng==','w67Ck3/Cp8O4','w4QoVnbDpQ==','w7XChMKkwqEdE8K5wrLDl2rDig==','NDXDvQ5s','w6UbW3DDhyvDijbCtw==','w4nDvBjDpUXClQ==','wqnDtcOiAsKb','w4jDsMK5AyY2EsOCw6bCoQIW','wowpw65p','amZfw5PDosKcw63ChcOnwqN6w4vDlyg=','c8KYwr9LJA==','wobCscO/woY=','ZMK4w5sOBsKH','NHQF','w4nDo8K/DQ==','NnoPwq0=','w7bCmsOxOA==','esOMBhphYsKMwq00TUXDlQ==','wrfDgsK7Dg==','wp8sw6l6UsKG','5LmE5LmU6La85Y+/','d8OQAwhQ','w7zCksOmMnY7PD8=','wrvojrflv6Y=','wr3DtcOkEA==','dMOawoLCsMO8wqk=','w77ClMOi','5Luf5LuV6L+N5ZqR5Li85LqO5qyA56mj5pS35oyL','wp7CogVSw7vDmQ==','CcOzJ8KHeA==','5Lq65LqX6L6T5Zi45LuT5LmG5qyt56uH5pW95o6k','woY0woXDjg==','fcOPCAFP','w7VHNcKQw7HCniDDkyE6w4A=','w44DeU/Dsw==','AMKsej3Dn8O6w6VwKQ==','wrLDlsK7B8Kzw4JsHsKUHcKBw43Cmk3Cnw==','JsKGwo7DicOj','woolNcKN','OcKXwpnDlMOFwqbDrW16e8OGw6Y=','w57DocKkHjE=','w7HCimbCiw==','f2rCmMK5w6A=','F8KobS4=','ccKNwpQ2E2PChMKh','5baI57m65a+G5ou/5Yqs6La55Lma5YqB44CS','w6Hmi4/ooKXmt7nop6/kvYLlnbPkurnliq4=','HSZmYQU=','5bSr57mb5ayc5omh5oq+5p6l5YWE5LyJ5LiK5YiF44Od','wpjmipzoo4nkuZnplJbli7rotbzkuqHli6Y=','w5HCnXV7wpk=','w4dSwpzDngvDoDR+EsKwI8KHJAcVw7kMdsKNw7EzB8K8wqjCo3JJwqcswqc=','5bSc57qL5a+N5ou85YeM5rKu5LqF5Yir44OH','wpjDq8KZf2M=','5bSA57iC5a+u5oiH5reG6KWj5ZSr5ZO/5LiR5YiI44Oh','ahB3Owc=','w5lJJ3Am','5Lu65Lu76Lyo5Zmk5LiA5LuH5qyq56mz5pWG5o28','wpIywpjDncOxXsKiwr3DkMKSwpPCsGHDkcKvw6XCpMKSDsKtwrpIwrzCpcO8w6rDtcKdSU5twqLDtsO/w75/Pg==','wokrw65hUsKAwplKAB1J','w57Dp8KoHjEPJ8OYw7s=','JHdFw7LDnMKfw5rDig==','FgpIMjhy','dcK5wolgEwA=','H8O5Z1Zx','cGJfw6nDucKG','w6vDh1jCoQ==','B2XChQ==','5LiS5LqP6KyE4oGe5p+Z5reB5YmN5Lur5L2z5peW572A776g6KyP5Yeo5rGM5YSd5LmT5rSF5YmG44GW4oOA','w5QJwp48wohU','woTDmAzDmHQsKDZ6eQ==','Y3nCksKlw4bCr0bDmg==','w7xvwo/DisOcQQ==','wpYCw64=','5oux6KCy5YWd5LyY5LmZ5Yu+','w5PDthHDhFLClQFv','wpzDiQDDgg==','w4tzwpTDqxM=','w4J1CMKcw58=','wokXdHLCpcK5','wokkw7ZbUMKIwplGOg==','wpo0wpE=','MR1iUyc=','E8OtDMKfQg==','wpPCrhZ+w7/DghlHwqPDjcOe','TWvCgUpCAAjCi0vDtMK9','w6HCk8OkK10ZPj4i','wr/DnkLCpMOX','asKzwo1XBAZxw6PCsg==','MMO/JsKVPhLDocONaMO3OWbChsKPU0R3BMOHwog0P8KTHcO8','w5LDshbDlA==','w6fCi8OmF1w=','RHbCgsKlWMKfwrhswrzCkQ==','wpTCog57w6bDnD5WwoXDmQ==','w7jDgkfCmcKewoDCicKUOw==','wq7mipXoobvkuI/pl5rlhbnmspnku6vli6Y=','ZVHCscK7w4s=','wpXCqxF9w5E=','YcKpw44QP8KFwqDCjsKfXCg=','woPDshzDlFjClR1+w4nCqcKK','YyNjRWs=','w6oCwpoYwoA=','B8OWS29sVzXChCU=','w7XCkcKmwqYZNcKVwrfDmzPDhXHCiSY0wrHDtCJxYcKzwqRrw57CrA==','bsK3wodR','FsOaLQ==','b8K/wp1MFSFKw78=','wqXDisK8BsKow6NUAw==','GG/ClkpEHDrCjQ==','AMK9eDvDj8O9','VAzDogwz','b8Obwp/CpcO+wq4=','w7oRXw==','5Y2V5rSL6KaJw4E=','w75rwozDiA==','fsKwwp1POQ==','YsOdwoXCq8O8wq/Dunpmw4/Cjw==','wrPCinHCnm3CuDvCmsKuwq9D','w5bDux7DklLCpCdvw4U=','wr7CtQcpwoI=','LMORQE1k','w6jCjiTDs8KCXcKhcsOf','woPDpx7Dk1zCszF7w4XDsA==','wpwKYEQ=','w7XDl8KuHMK3w6ZeGsKACsOZ','b8K3woJQBA==','VHzCgMKtUsKawqJgw64=','woA6wprDj8OuBA==','JcObwp3Cp8OnwqPDoHdmw4/Cjw==','wofDnsKLVlc=','UFFcw5jDmw==','w5LCk1t6wpE=','YyNrTDMHGMKP','GG/CgUxIBg3Cl0w=','dcK5wok=','wpsJV1vCnQ==','eMK6woJ2FRNVw7/Crw==','w7/CginDpsKdQcKYNMOSDk3Do8KxSFRiJF7Dt8KIYTzDpsKew6XDjCbCmcKPwqs=','w5wdw6DCnW0=','YSDDtxI0w6DDqAvDgA==','XMOBK8KcZ8OAw5hQdcOuw5PCqgF6FMOQwqXDpFrCisO3w5vDhMKWIg==','wonDoCDDokk=','Z8OfwoXCow==','wpfDicK1cWd0w57CrsKf','w7rCjyPDksKMXA==','w7/DgUfCpsKFwpbCrsKJJ8OX','woTCv8Onwotww707w6vDnT8=','w7lFKMKXw4bClCDDgx47','esKcwoU5','e8OqLsKIFCXDrMOUe8Kv','w7zClE7CksOtPWgswojDicOJwq1lw5fDuw==','w4dawobDmA==','woAJRkzCnA==','ScO0w58zwqcXw4HCrDFBasKGw77DjnvDgWTCtTvDhH4Kw4oCTWrDskRAdsOeGA==','woDCqSdYw5w=','IsK6aQTDow==','w5LDvMKXA8KHwog=','amJNw7jDsMKAw44=','worDmADCmEp2IyYhaQcR','wrnCgcKmwqUCWsKFwpfDlmHCmSfClGt7w7bCsUYrPMOyw69lw5fDscKQFsKjwqwNOCXDucK6w5NUw6XCt8KVw4rCpMOWO8KMwrYnAXEAwpQOw7wIw5LCgsKnZHbCjMKhw6bDsFAAbjrDqcOgw7EgGsK4wq7DsX5nwo9NwrfClMKsw6ptwpXDjQI5acO5wpwqwrNkQ0XDojJyA0Qew6/CmsOnacOxdMK1Vxc7w5DDtTPDvMOueirDtUDCscOYEcKlwrLCkkkLwpbDqQnDh8OwQFTDmcO1HcOVFiYYB2bCicKLwqZKQjfCh8OawojDqMOJSmzCjMKdwp8/w7XDmjjDg8K5EsOfw5sAw5zDugHDsnpYwrTDgiTDi8Omdk/CtsO5SzjCrRvDqsK6O8OuwoPDsBAKLMO+w6zCtTPCjcKFV3UkXsOUwocRW8O9wo/Cl8OBwooOB3AcbQE/wqgSw4g0w5xAw6UtwoMTfC1ZW8OMwoBXw47CnifDgwvCncKzG00zZnHDp8K3w6DDrHwWKFzCl8OkFMKcwqvDncKMw7jCvMOmwqphw6/CjMKow5Vfw5LCkEQiDxzCgsKfPMOZbjfDgcOmNlDDgMOaMMOoU8KfbFrCvMKzRCQYXxHCjcKvwofDjF7CscOvwoh8w5bCqcKkdcKxwr9p','wr7DrsO5AcOSwoxFdsKXw4jCvsKsw5rCvX5Qwqs=','fMOIw5Y=','LSd+WyV0U8KdCcO5wqPCtsOWY8OeD8Ocw44vw7nClsO8w7TCoSzDjQQ4wo0sQMKLwqDDmR4/EBkWfzoSGsOaXsKJFcORwoQMw4lgEcK2QXXCgmTCgEhQZcKMwq5iHRLDicOEwrx6w6Uxe8K9w4NRIsKuwrPCtA7DsMKzwqB1YQfCiSQ7JGfChsOnRCDCt8OTw4jDplzCkMKowpBve2XCpDzDgCADwrjDow==','w5XCkjDDmMK0','SH3Cj8K5R8OTwoJUwrvCjsOiLsOfJVvDo8OXwpXDhsKKwo7CmlnDtXhKEyPCiyvDgSViOHhuwo1DbcOAbcOTH8KKG8O0w54ua8Ofw4zDo8K+ZMOyDcORGXlDwo9fwqolw4dKHmBjFlbCr3pEwqd+OsKuDcK3w6DDkl0pZ8OTwrEUPwXCoMO3wojDosONVSNQSsOqZBvCgwvCtBtdwqIWBcOLwq1fA0vDgMKTU0HCsMKpJxXDiMOQw4UvCF11w65rw6bDqMKJBcKIDmc2w7U0CSjDucOzZDk1wpxjNn7CrmTDgiTDh1Azw6HCvVY1WcKOwoQAwo9iCcK+w4B5ZMKeJcKkw41Bw67DhsK6DEDCucKDw7RTZcKlVA92Z1HDnhzDvcKSwqoAdsOzw4VZwqzDqks/WcKmwozDhXBZXzFWwo0zwq3DosKGIx7DocKLwps0w5HCgsKOEcOBdcKJJRVTwrlgw57Do8OSwpxYw5LDocKURjBwbsOowpHCgsO0w4IAwrxHwpbCk1zCvyvDn8OLZMKMw5MNwpp9wq/DgDd3WcOrw5fCh8KPwoMpw4Ifw4cFKVlPwrPCk2DCgMK1wr8VwoI0w6LDh3weCMK4w6XDoU8rwpHCsXFiGhFdehjDh8KZw4gp','w65OwqjDrz4=','wrvDl8K7H8KvwooQWcKGB8KLw77CmEzCl24TwoHDrMOawpHDtE3ColrClMO4M8Kfw7tewqEcw7jDgS3ChxHDqMOKMllIw5Qbw7rDiw==','UsOFTXNtRhfCuTLCuDLCuMK0ZsKqwqQsw4A0ZmYNSDjCrx/Dr3DDn3Jiw6fDrCVuwqsaw4Uww4t2fcKAwq/CjcO2dsKPwp/Dn8OcCcOHeDfDknDDq0zCkDNLFiohw4bCrirDrldbL8K4R2vDmcK0KnFwasKXwqTDmEXCq8OlARUvw77Cpk3CrX8LBsOqV3JNFcKiEMOnw7tUwqDDqsKkwqEIDgTCtsOpwqbDq2Vew4gpTsKbY2vDm8OcJxLCtCvCpR/DiMOfw40=','w7PCjsOxMVcoAjImw6rDq8KRwr3CmcKf','f2HCsMKTw7U=','w4XDp8KqCBgSGcOU','wpHCtcO/w4p8w6UHw6jDmyo=','TsKDw4MOEw==','KzlnYxg=','dsKVw5gQO8KYwrzCk8K3QQ==','OsOKX0Ra','w7nDo8K4KxE=','woDDkcKaIMKZ','woUvwoTDk8OlUcKiw7TDig==','wo4maEzCpQ==','L8OLOMODw50=','wojCv8Oiwok=','w5fCh1RswpF5Ag==','wrvDvcO+FcKrw59EYcKzw4XCrMKxw5zDhxF+wrBTFA==','wpDCtcO4wpJzw74=','wrvDvcO+FcKxw5xVesKew4rCjcK9w4zDoTFcwqpF','w4FSwpzDnSTDuzgjM8KwIsKALic7w5lKZsKQ','wos7E0vDq2k+wqTClVIbwohzB8Oxw4rCpB/Ctw==','w4QBwp49wohvIw==','b8K3woJQBDtF','VsONwpTCsMOEwqfDo2Y=','U0J7w7nDjw==','emjCm8K+w6DCh1A=','FcKTahnDrg==','w599eMOfwpJ2TcKnw7XClQ==','PsKTwojDisO1w73CsCZXYsOcwrzCuMOPM1QQfMOFXF4DQMKDNsKowrhuw4ASOBchw4nDq1jCsmPDrVEaY2QkHcKxAMK5CMK1XHrDpMO+w4rDoA56wqcVw4PCkkrCpVQzw6B+bsKpSkZxwppNwpnDuxVqFcK1A8Ktw7dSVlA=','w6N+wpPDhMOGTgJXYA==','cMKEwpDDk8OjwqnDqzR+J8KTw7HCucKIPF5KScOPQwIJQ8KEbsO/w6Jywo9Bags7w47CsATDuivCvA0f','wrjDvw/DvGk=','GMKsfD/Cl8Ovw5lwMQA=','w6jCoHHCsMOu','w4tPwobDiQLCsnJ+AsK5PsKZIBQZw7dGZ8OKw6hkQsKrw6fCtnhww6kswqQUwqQywptHw7nCoXFmYcODwpvCrE3DusO0wr4=','w4TCo8Ojwohvw4MMwr4=','wr7Cswspw5sSwr4Aw7vCuMKRw6PCtsOUw4jDhcKPDxoJSsOMLsOYwotOYcOQwpPDuzJCw73DpcKkwpQWP8KBw5nCtsKGwprCp8KaLgPCsCp1wrjCrcKyDToSwqzDhMOZw7PCosKgSkUyw4/DojLDoTPCr8OUWcOEw7/DqsKMwrnDo1zDoybDriBaRiEYwoQGw4LCrRUiwottM8KOA0XDuXzCt0oSwqw4Ej8iTSrDg0FjTj4ww7TDncKnesOTwr9pwrXCtwIrwqvCiMOBwrLDpsK1ChI=','w5PCmMO3bX1Aw5nCosKuNsK7w5PDmWTCmw==','CcOBOMKGYsOzw4hGaQ==','woDCqBFiw6XDnw==','w7LCsgMJw7w=','w7XDgUw=','U8OpOW/ilq4=','MsO8M8OUw7lX','LTZrTxonEsOX','wpEywpDDjsOCWMKtw70=','wpfDkMKLTWc=','wpnDjRrDg0ss','w77Dh03CvsKjwo/Cm8KO','w6QbS3fDjis=','w4PCm1F7wr1kF38=','wrTDisKpG8KQw5lMAg==','woofw6DCiTXCo8OiwqTDtCbDpsORBw==','wrDDusO0FMKGw6NH','w49UwpU=','w4MVwpMmwplPM8Ku','w4/Dp8KqAg==','b8KIwpA2JW/CkcK2','ZXMqC+KVgg==','b2Jfw6/DtMKVw5g=','KTxt','w7NlEF4zYMOt','wpsWZAzCrcKjw4hwGGk=','5Lm/5Lq/6Lyb5Zqx5Lma5Lqw5q6K56iM5paF5oyB','UnbCncK9','YGbCkA==','wpHCpMO5wo5xw60Bw6XDiw==','w4IBwoA7wog=','w5jCkVnCq1c=','e8OSwqnCg8O7','wqvDscOjBMKSw5g=','wprDhcKm','wrXDizLDiuKUluWthuaJvuS4lOWJpu+/h+iPieW/lA==','w4jCnVA=','KsK4cjXDsA==','5LqG5Lqa6L2m5ZuC5LmR56iM5peW5o6n','G2PCjAM=','wp/DocKxRl0=','wp4rMsKY','w4BNNcK1w68=','UW3CnMKgWcKPwoJiwqo=','woIrJg==','woc7HkTDkHs2wrM=','44CI5Ly35oKB6I6S5Y635omi5Yq+','wps3JMKew7Yi','w6tpH3M7dQ==','w7BFNcKY','A8OAJMKiZcOww6hNccK0wofDjVVi','WwV2JRk=','5Lq15LuK6Ly65Zu75Lun5Lmy5q6U56uw5pas5o2M','w5EVwoE8woJLIsKlJnHCgcKSecK3dmvDvMOY','wr8WwqzDmMOh','w6tvAk4=','wpEXGH/DjA==','XQbDsgY8','YMOuKcKCMDTDkcOZ','MMO/KMKNMCjCpQ==','w6zCmlzCuMOz','VcKvayDDl8Oaw4xpIljCtjhX','w6jCnzXDqMKJTsKYfcOI','BMOSWm5s','WMKDwrptPjF+w5/Cj2ckw48=','wqvDvcOjGg==','LMO2Jw==','TnbCiQ==','wofDhw7Ds1Uq','wprDgsKZJMKe','wpbCt010w6bDhgBRwoTChsKEw7nCqjXCmTzCn2XClGpiDR9SwpXCtcK9LQ==','w5fDgcKjCMKB','w5XDvAzDlA==','Z2HCncKMUg==','cybDoAknw73DjBvDp3zCjA==','w43Dp8KCL8Kbwp3CjMKDag==','w6rCoB0yw5MD','IMKCwpLDnsOjwrXDlm0=','5LiP5Lin6Lym5Zmn5Lu35LqI5q+o56ir5pSB5o6/','w49UwpXDvAPDug==','ecOjw4YxwpQZw4nCog5N','w6/Cjj/DtcOIQcKFdsOdQ17DvcKoUlxtaknDt8KTdjzDrcKXw6fDhB7Dk8KEwq3CgMK3wrzCtxHCoTMmMMOFwpoTFMK8UMKpwotFw4jCvFI9LQMVejdrbGZOwqjDqQ==','dsKJwoUoIjzDisOgIWjDgA3CsMO8R8OSwqUaTiTDn2nCgMKLwrwNK07CsMKqwr/DkAYPGcKIw63CvcKNcMKywqXDmMOOwoTDjCgSworDowMwORnDonXCvhM/R35ARMOrw5TCiMK1w4l7OsKOBDU=','wpjCqQNnw7nCkARuwoLDhsKNw7nDpV/DnmLDgTHDiho1V2UHwp3Cv8KfNcK8w7jCkDnCksKiwpVbC25FwoE0w5puPRZtMMObw7zCrBzDhF/CrMO+K8OWw6fDp8OFwpHDokvCl8KuXwbDkSkrc3vDtXtKKcO9wrw8w5pVw7DDj8OFKsKkwo3DmsKqSwlWw5UsZsOYw7jCksOywp/CjVzCssKdwpwxw6Aow5HCvGjDuBzCixzDvMKFDnDCgHjCicKew6QKFMO1T8OgwqJ8ccOVw6YFLcOdw5NhacKxXUxHw6hNW2c0Z03CuMKUwo7Dnjs0dyfDvMOqJnMhwqLDmkYUwqvCh3jCjcK7woXCpMKGw4rDhmXClhfCvkbDkz9zNAVkwqTCjcOSVMKoDMKdT2VGw6MIHQ7ClcKoGTDCoy9Cw5LDhW3CpV3ChcK7OsOMaEl2XcKpT8K2OcKXHDpWw5Jzw5TDll1+w7TCnsOnWMKuw7XCpMOCw7lywpZ7w77DhB/CtsOfwpJCDcOBwrEfOsK6w5NMw74yDhHDl3Niw7xGwqBUdcKUX8KgF8KfASXCi8Kuw45iwqvCkAHDv0rCpgB9Txo9Q0llU8K2w7rChD8fEcO2XsOHGcKzw7TCrsOhEADDisKDw53CocKnHFFkw6rDmCDCvcK5w75IH8OhwrEHw6VzN00pd0c6MWlrOMK4w7XDu8OGO8O3cG/ClWDCr8K4w7PDmsKQUcKZwqzDhsKKUMOow6RADG0pw4InwqvDtsOGw5E2GsOPw6XDu8KtDsKzw7/DiHHCoBPCsjHDk08Uw5TDnAkuwrnDqMOANsKDY38BUsOYKMKHWMOLw7o=','w5fDqsOmJDUVBMKcw5bCjl4CwpzDvA==','w4LDtgs=','w4HDrcKs','wrrDkMKBAMK4w5U=','w6vCkEPDsMO+N2kUwoTDmA==','WcO2w551wqM=','wpjDmAXDn1M=','w7vDn8KBL8Kj','wpIbPWnCr8Kiw5Q2MkLCtsK3wpE0','wrHDoMOkAcKNwpYOPMKQw5TCtsO2w5LCvzRWw7dDDyrDpMKvND3CvcOMw6PClkcNw57DlsKcU0zDgwxCwo/DuSrCgMOLw5jDsMOqScO9f8OQwrrCm8Kxw55dw5vDmEw/','wocmCHvDiA==','woPCoMO7wot2w6kJw7fDmyB4w5zCri8+bcK2L3dKw7HCkCw/UU7Du27DvMOtw5bDmsKP','woYPwqHDm8OI','w7PCoAs3wpIWwqA9w7TCrQ==','wrjCiVZ+w5nDgwJQwo/ChsOSwqrDqVPDg2nDjyHCmHtpFjhZw4jDusKCDcKAwqrDiiLDi8O4w4gSY0xgwqQVw5pmYFMtaQ==','w5fDrsOBw7wewpI1Ei5PBxnDtQrCmDFt','w4EUwoAhwoNBLsKxcA==','ZRVsBCs=','w4bDvBvDhQ==','w5DCnVxqwpo=','5Lqg5LiV6Lyj5ZiV5LiD5LuO5q6B56uE5pWH5o+d','HnnCh0xkHDvCkQ==','5LmO5LuM6L2f5Zi55LqZ56uw5pSY5o+t','w73Cn2bCmnHDsEHDgMKqwq5TIlXDji8cMsK4LMKqdDxfLMOzc0zCiMOewrbDgkrCsUHDi8K5J8OYwo/CnifDi23Cm3NIw4jDrmBVRsKLw7cO','w7XCkBrCvMOtMSgVwonCk8Oewqtm','w5jDokg=','K8O8JcORwrhCPyLDpiQ=','w5XCmk3CtMOxNGdQw5jCk8KNw6Qjw5nDmClWwo/DjMOGwqvCoMKTwpIBw5zDmx/Dpzh3w4QXAFXCnCcsAy8sw4BqRC7CjcOgExvCncKwwr9CYMKKw7nCv3VqDSLCtncsKxVfw44rwoEPdsOfShTDgsKFSTwDS0vChVTDpUvCusKgwrbDrCLCosOjw6Vhb8KFwpd1NcOUSxHCicKWworCghvCk8OSYsKQwrICVD3CscOtJsKjwot5w50wwrrDgH16cRhNVDU1XMOzPg==','FMKzcD/ClsKuw5F8IQnClhxiw6pBLCI=','wqULwo/DjMOv','w57DkcK9Pw0=','wpnCmgtaw6c=','wojCpgdjw50=','w7DCgUPCrcOuYilQwoXDksOQwqElw53Cpitdw4/DisKSw6bDjMKuwr5rw5HCpBnDrSF6wos1NlvDjHAHWWAuwpZyQmvCrsOkBlrCvsOewq08PMOMw5vDsiM=','w6p0ElEe','w7NBNQ==','wprDhcKmW2dT','w6thA0kz','w6rCoBokw5ATwqk=','S2rCosKmUMKBwoU=','w7HDl8KTNMK/','w6rCkEPCvsOyPGM=','EMOSXHw=','PsKGwo/DtcOxwqnDj3tZYsOQw6DCocKY','w7ZrOcKRw4Q=','HcKgeiTDtMOvw5h8','wpLDi8K1fw==','NcOqJcOTw5xNNSQ=','bsKjw5kSJ8KNwrnCkg==','w7TCmlA=','w77Cl8OEN3s=','w4HDrcKsKSYJ','w4XCgkdjwp1pEGQuw6PCqGRPFsODw4E=','w65MbMKaw6k=','wpfDmsKxcnxCw4rCs8KSLMK8wpjChHrCqMKRw4HCjFo3w4zDjsO/LwIWwqZBw4HCv8O6woTClA==','dcKYwpQofGfCicKmO3c=','bMKww54DZMKFwqfCgcO4UWbDgsK1w5QMwqTCvyvDtMOcwpPDjQ==','XgFMFys=','wrjCnsO/wpJu','w45sKMKww70=','w5Uawps4w4EGI8Kyb3rChcKSUcOiBmDDoA==','wq85w5d8SQ==','wpIZw73CgyPDjcK0w7vDvRLDo8OGT8OgTlLCpjxcRAPDnEAOw4toccKZwqwv','w5vDtsOyw4Bw','WBBVISB1w7rDuz1gVsK/EE0PecOCw4gqwqBcwrDCmsOaN8KbwqjDokvCiGc5wppcBsKrZcKsR8OswrhtfsOMdzPDkAvCrT0GdcOhwq9/wqfDnW7ChMKDXsKkwq3DnkLCugzCg2HCrWTCvcKw','SC5RCRo=','G8K9bT/DicK0wpo2L1DDmQUpwqwFYDPCucOZ','w7NeKMKJwqvDlzDDjw4ywpzCvl46wpNzw7c=','w7BlFEp7c8Oyw6HCncKt','w7/Cj3PCmnLDsQfCv8KvwqQQJh7Cni9CeMKmdMO0LT0ZZMKtb3bCksOMwq7Cn0jDsFDDjcOwCcKGwrrCkCrDmjHDhXJ0w5bDuGByXMKjw6gQEcO9OwvCp8ORdyoywpHCh8OQwpt+w69yw5MYQsOPwp/CrcKfJcKuJcKFwpTCosKcI8OVwqTCqFZZHxjDtcK6elF0THUMBlFPKcOXw5PDq8OGDw0aKQbCvcKkwq3CsSg7OmwUw6vDu0bCn2wNNMK9OcKrwpPDoX3CnBY4asOUURFZwpbDowPDuMOiw53CscOTw7bCpmzDlcO9TFk0fsK2MQg9wqo2w7jCqVsjN8KMw4JBw4PCoMOew5M6w5skQB0PXH3DiTDCgkYiwpgywqDDqcO1wqVZwoQSwovCm8KTw6PDusOpcnITw7Ucw6tdGsKhVDzDlxJxTMK9EsOyw6zCuVTDr8KfPMKlw6E6wpcww5ELBBARH3hqC8KmfRDCvsOzMMKPwqIHQwXDuMObwoHCicOFw4QWwq9lw7Q7BMOrNMKJw7stw7jDlcKKRcOZW8KMw7UYUMOAwprDl8KVRX3CglI=','w4gIw58rwoM=','wrLDk8K/A8K1w5NeAsKcAMKKwqHCn1rClWI=','44KI5oyV56WU44GW6K2I5YS/6I275Y6C5Liu5LuU6LeS5Yyp5LqDwpHDhMOCwoUIEWbnm5LmjZTkvaXnl4DDtAdxw4zCo8Ov55uE5LqA5Lq056+p5Yu46Iye5Y6o','MG8WwrhFw68jd1E1wrNLHMOAw6zCmHkIw71hGFQrwpjDlMOlw50Nwp7DrsOpwqoWw6zDtFHDh8K7woTDl8ORwoI8','bsONwpY=','w7zCmsOoPA==','w7lTwqvDqMOG','w719C8K8w6k=','dMK3w/*
 * @Author: shylocks https://github.com/shylocks
 * @Date: 2021-01-15 16:25:41
 * @Last Modified by:   shylocks
 * @Last Modified time: 2021-01-16 18:25:41
 */
/*
工业品爱消除
活动共200关，通关可获得3星，600星可兑换1888京豆，按照cron运行只需7天即可得到
感谢@yogayyy(https://github.com/yogayyy/Scripts)制作的图标
活动入口：京东app首页-京东工业品-京东工业品年末盛典-勇闯消消乐
已支持IOS双京东账号,Node.js支持N个京东账号
boxjs 填写具体兑换商品的名称，默认为1888京豆
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#工业品爱消除
20 * * * * https://raw.githubusercontent.com/shylocks/Loon/main/jd_gyec.js, tag=工业品爱消除, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Icon/shylocks/jd_gyec.jpg, enabled=true

================Loon==============
[Script]
cron "20 * * * *" script-path=https://raw.githubusercontent.com/shylocks/Loon/main/jd_gyec.js,tag=工业品爱消除

===============Surge=================
工业品爱消除 = type=cron,cronexp="20 * * * *",wake-system=1,timeout=200,script-path=https://raw.githubusercontent.com/shylocks/Loon/main/jd_gyec.js

============小火箭=========
工业品爱消除 = type=cron,script-path=https://raw.githubusercontent.com/shylocks/Loon/main/jd_gyec.js, cronexpr="20 * * * *", timeout=200, enable=true
 */
const $ = new Env('工业品爱消除');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let inviteCodes = [
  '840266@2585219@2586018@1556311@2583822@2585256@756497@1234613',
  '840266@2585219@2586018@1556311@2583822@2585256@756497@1234613',
]
const ACT_ID = 'A_112790_R_4_D_20201209'
let exchangeName = $.isNode() ? (process.env.EXCHANGE_GYEC ? process.env.EXCHANGE_GYEC : '1888京豆') : ($.getdata('JDGYEC') ? $.getdata('JDGYEC') : '1888京豆')
//Node.js用户请在jdCookie.js处填写京东ck;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
  if(JSON.stringify(process.env).indexOf('GITHUB')>-1) process.exit(0)
} else {
  let cookiesData = $.getdata('CookiesJD') || "[]";
  cookiesData = jsonParse(cookiesData);
  cookiesArr = cookiesData.map(item => item.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}

function obj2param(obj) {
  let str = "";
  for (let key in obj) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
    return;
  }
  $.shareCodesArr = []
  await requireConfig()
  console.log(`您要兑换的商品名称为${exchangeName}`)
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, {"open-url": "https://bean.m.jd.com/"});
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        } else {
          $.setdata('', `CookieJD${i ? i + 1 : ""}`);//cookie失效，故清空cookie。$.setdata('', `CookieJD${i ? i + 1 : "" }`);//cookie失效，故清空cookie。
        }
        continue
      }
      await shareCodesFormat()
      await jdGy()
      await getAuthorShareCode()
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function jdGy(help = true) {
  $.reqId = 1
  try{
    await getIsvToken()
    await getIsvToken2()
    await getActInfo()
    await getTaskList()
    await getDailyMatch()
    if (help) {
      await helpFriends()
    }
    // await marketGoods()
    await play()
  }
  catch (e) {
    console.log(e)
  }
}

async function helpFriends() {
  for (let code of $.newShareCodes) {
    if (!code) continue
    console.log(`去助力好友${code}`)
    await getActInfo(code)
    await $.wait(500)
  }
}

// 获得IsvToken
function getIsvToken() {
  return new Promise(resolve => {
    $.post(jdUrl('encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err},${jsonParse(resp.body)['message']}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            $.lkEPin = data.data
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

// 获得对应游戏的访问Token
function getIsvToken2() {
  return new Promise(resolve => {
    $.post(jdUrl('user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err},${jsonParse(resp.body)['message']}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            $.token = data.data
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

function getActInfo(inviter = null) {
  let body = {
    "inviter": inviter,
    "activeId": ACT_ID,
    "refid": "wojing",
    "lkEPin": $.lkEPin,
    "token": $.token,
    "un_area": "12_904_908_57903",
    "source": "wojing",
    "scene": "3"
  }
  return new Promise(resolve => {
    $.post(taskUrl("platform/active/role/login", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            if (!inviter) {
              data = JSON.parse(data);
              $.info = data.info
              $.id = data.id
              $.authcode = data.authcode
              $.to = data.token
              $.money = JSON.parse(data.info.platform)['money']
              console.log(`您的好友助力码为：${$.id}`)
              console.log(`当前星星：${$.money}`)
              // SecrectUtil2.InitEncryptInfo(data.token, data.info.pltId)
              await checkLogin()
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

function checkLogin() {
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jdmy/game/local/logincheck", {
      info: JSON.stringify($.info),
      "reqsId": $.reqId++
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            $.gameId = data.role.gameId
            $.gameToken = data.token
            $.strength = data.role.items['8003']
            console.log(`当前体力：${$.strength}`)
            $.not3Star = []
            for(let level of data.role.allLevels){
              if(level.maxStar!==3){
                $.not3Star.push(level.id)
              }
            }
            if(data.role.allLevels.length)
              $.level = parseInt(data.role.allLevels[data.role.allLevels.length-1]['id'])
            else
              $.level = 1
            if($.not3Star.length)
              console.log(`当前尚未三星的关卡为：${$.not3Star.join(',')}`)
            // SecrectUtil.InitEncryptInfo($.gameToken, $.gameId)
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

function getTaskList() {
  return new Promise(resolve => {
    $.post(taskUrl("platform/active/jingdong/gametasks", {
        "activeid": ACT_ID,
        "id": $.id,
        "token": $.gameToken,
        "authcode": $.authcode,
      }),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              for (let task of data.tasks) {
                if (task.res.sName === "逛逛店铺" || task.res.sName === "浏览会场") {
                  if (task.state.iFreshTimes < task.res.iFreshTimes)
                    console.log(`去做${task.res.sName}任务`)
                  for (let i = task.state.iFreshTimes; i < task.res.iFreshTimes; ++i) {
                    await uploadTask(task.res.eType, task.res.iValue)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === "收藏商品") {
                  if (task.state.iFreshTimes < task.res.iFreshTimes) {
                    console.log(`去做${task.res.sName}任务`)
                    let body = {
                      "api": "followSku",
                      "skuId": task.adInfo.sValue,
                      "id": $.id,
                      "activeid": ACT_ID,
                      "activeId": ACT_ID,
                      "authcode": $.authcode,
                    }
                    await execute(body)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === '加入会员') {
                  continue
                  if (!task.state.get) {
                    console.log(`去做${task.res.sName}任务`)
                    let body = {
                      "api": "checkMember",
                      "memberId": task.adInfo.sValue,
                      "id": $.id,
                      "activeid": ACT_ID,
                      "activeId": ACT_ID,
                      "authcode": $.authcode,
                    }
                    await execute(body)
                    // await uploadTask(task.res.eType,task.res.iValue)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === '下单有礼') {
                  // console.log(task)
                } else if (task.res.sName === '商品加购') {
                  for (let i = task.state.iFreshTimes; i < task.res.iFreshTimes; ++i) {
                    console.log(`去做${task.res.sName}任务`)
                    let body = {
                      "api": "addProductToCart",
                      "skuList": task.adInfo.sValue,
                      "id": $.id,
                      "activeid": ACT_ID,
                      "activeId": ACT_ID,
                      "authcode": $.authcode,
                    }
                    await execute(body)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === '关注店铺') {
                  if (task.state.iFreshTimes < task.res.iFreshTimes)
                    console.log(`去做${task.res.sName}任务`)
                  for (let i = task.state.iFreshTimes; i < task.res.iFreshTimes; ++i) {
                    let body = {
                      "api": "followShop",
                      "shopId": task.adInfo.sValue,
                      "id": $.id,
                      "activeid": ACT_ID,
                      "activeId": ACT_ID,
                      "authcode": $.authcode,
                    }
                    await execute(body)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === '喂养狗狗' || task.res.sName === '每日签到') {
                  if (!task.state.get) {
                    console.log(`去做${task.res.sName}任务`)
                    await uploadTask(task.res.eType, task.res.iValue)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === '关注频道') {
                  if (!task.state.get) {
                    console.log(`去做${task.res.sName}任务`)
                    let body = {
                      "api": "followChannel",
                      "channelId": task.adInfo.sValue,
                      "id": $.id,
                      "activeid": ACT_ID,
                      "activeId": ACT_ID,
                      "authcode": $.authcode,
                    }
                    await execute(body)
                    await $.wait(500)
                    await finishTask(task.res.sID)
                  }
                } else if (task.res.sName === '好友助力') {
                  console.log(`去领取好友助力任务`)
                  await finishTask(task.res.sID)
                }
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

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function beginLevel() {
  let body = {
    'gameId': $.gameId,
    'token': $.gameToken,
    'levelId': $.level,
    // 'score': 600000 + rand(1000,10000),
    'reqsId': $.reqId++
  }
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jdmy/game/local/beginLevel", obj2param(body), true),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(resp)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              // console.log(data)
              if (data.code === 0) {
                console.log(`第${$.level}关卡开启成功，等待30秒完成`)
                $.strength -= 5
                await $.wait(30000)
                await endLevel()
              } else if (data.code === 20001) {
                $.strength = 0
                console.log(`关卡开启失败，体力不足`)
              } else {
                $.strength = 0
                // console.log(`关卡开启失败，未知错误`)
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

function endLevel() {
  let body = {
    'gameId': $.gameId,
    'token': $.gameToken,
    'levelId': $.level,
    'score': 600000 + rand(100000, 300000),
    'reqsId': $.reqId++
  }
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jdmy/game/local/endLevel", obj2param(body), true),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(resp)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              // console.log(data)
              if (data.code === 0) {
                const level = data.allLevels.filter(vo => parseInt(vo.id) === $.level)
                if (level.length > 0) {
                  console.log(`第${$.level++}关已通关，上报${level[0].maxScore}分，获得${level[0].maxStar}星星`)
                } else {
                  console.log(`第${$.level}关分数上报失败，错误信息:${JSON.stringify(data)}`)
                }
              } else {
                console.log(`第${$.level}关分数上报失败，错误信息:${JSON.stringify(data)}`)
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

function uploadTask(taskType, value) {
  let body = {
    "taskType": taskType,
    "value": value,
    "id": $.id,
    "activeid": ACT_ID,
    "activeId": ACT_ID,
    "authcode": $.authcode,
  }
  return new Promise(resolve => {
    $.post(taskUrl("platform//role/base/uploadtask", body),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              if (data.code === 0) {
                console.log('任务上报成功')
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

function finishTask(taskId) {
  let body = {
    "taskid": taskId,
    "id": $.id,
    "activeid": ACT_ID,
    "activeId": ACT_ID,
    // "inviter": undefined,
    "token": $.to,
    "authcode": $.authcode
  }
  return new Promise(resolve => {
    $.post(taskUrl("/platform/active/jingdong/finishtask", body),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              if (data.code === 0) {
                let msg = `任务完成成功，获得`
                for (let item of data.item) {
                  if (item['itemid'] === 'JD01') {
                    msg += ` 体力*${item['count']}`
                  } else if (item['itemid'] === 'X028') {
                    msg += ` 消消乐星星*${item['count']}`
                  } else {
                    msg += ` ${item['itemid']}*${item['count']}`
                  }
                }
                console.log(msg)
              } else {
                // console.log(`任务完成失败，错误信息：${JSON.stringify(data)}`)
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

function execute(body) {
  return new Promise(resolve => {
    $.post(taskUrl("/platform/active/jingdong/execute", body),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              if (data.code === 0) {
                console.log('任务上报成功')
              } else {
                console.log(`任务上报失败，错误信息：${JSON.stringify(data)}`)
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

function marketGoods() {
  let body = {
    "id": $.id,
    "activeid": ACT_ID,
    "activeId": ACT_ID,
    "token": $.to,
    "authcode": $.authcode
  }
  return new Promise(resolve => {
    $.post(taskUrl("/platform/active/role/marketgoods", body),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              if (data.code === 0) {
                for (let vo of data.list) {
                  if (vo.name === exchangeName) {
                    let cond = vo['res']['asConsume'][0].split(',')
                    await buyGood(vo['res']['sID'])
                  }
                }
              } else {
                // console.log(`任务完成失败，错误信息：${JSON.stringify(data)}`)
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

async function play() {
  $.level += 1
  console.log(`当前关卡：${$.level}`)
  while ($.strength >= 5 && $.level <= 280) {
    await beginLevel()
  }
  if($.not3Star.length && $.strength >= 5){
    console.log(`去完成尚未三星的关卡`)
    for(let level of $.not3Star){
      $.level = parseInt(level)
      await beginLevel()
      if($.strength<5) break
    }
  }
}

function buyGood(consumeid) {
  let body = {
    "consumeid": consumeid,
    "id": $.id,
    "activeid": ACT_ID,
    "activeId": ACT_ID,
    "token": $.to,
    "authcode": $.authcode
  }
  return new Promise(resolve => {
    $.post(taskUrl("/platform/active/role/marketbuy", body),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              if (data.code === 0) {
                console.log(`商品兑换成功，获得${data.item[0].itemid === 'JD29' ? '京豆' : '未知奖品'} * ${data.item[0].count}`)
              } else {
                console.log(`任务完成失败，错误信息：${JSON.stringify(data)}`)
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


function getDailyMatch() {
  let body = {
    'gameId': $.gameId,
    'token': $.gameToken,
    'reqsId': $.reqId++
  }
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jd/game/local/getDailyMatch", obj2param(body), true),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(resp)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              // console.log(data)
              if (data.code === 0) {
                // console.log(data)
                $.maxScore = parseInt(data.dailyMatchList[data.dailyMatchList.length - 1]['sScore'])
                if (data.dayInfo.score >= $.maxScore && data.dayInfo.boxAwardIndex < 2) {
                  await getDailyMatchAward()
                }
                if (data.dayInfo.dayPlayNums < 2) {
                  await beginDailyMatch()
                }
              } else {
                console.log(`暂无每日挑战任务`)
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

function beginDailyMatch() {
  let body = {
    'gameId': $.gameId,
    'token': $.gameToken,
    'reqsId': $.reqId++,
    'levelId': $.curLevel
  }
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jd/game/local/beginDailyMatch", obj2param(body), true),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(resp)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              // console.log(data)
              if (data.code === 0) {
                console.log(`每日挑战开启成功，本日挑战次数${data.dayInfo.dayPlayNums}/2`)
                $.curLevel = data.dayInfo.curLevel
                await $.wait(30000)
                await endDailyMatch()
              } else {
                console.log(`每日挑战开启失败，错误信息：${JSON.stringify(data)}`)
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

function endDailyMatch() {
  let body = {
    'gameId': $.gameId,
    'token': $.gameToken,
    'reqsId': $.reqId++,
    'score': Math.trunc($.maxScore / 2) + 3,
    'levelId': $.curLevel,
  }
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jd/game/local/endDailyMatch", obj2param(body), true),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(resp)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              // console.log(data)
              if (data.code === 0) {
                console.log(`每日挑战完成成功，本日分数${data.dayInfo.score}`)
              } else {
                console.log(`每日挑战完成失败，错误信息：${JSON.stringify(data)}`)
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

function getDailyMatchAward() {
  let body = {
    'gameId': $.gameId,
    'token': $.gameToken,
    'reqsId': $.reqId++
  }
  return new Promise(resolve => {
    $.post(taskUrl("eliminate_jd/game/local/getDailyMatchAward", obj2param(body), true),
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err}`)
            console.log(resp)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (safeGet(data)) {
              data = JSON.parse(data)
              // console.log(data)
              if (data.code === 0) {
                console.log(`每日挑战领取成功，获得${data.reward[0] === '11001' ? '消消乐星星' : '未知道具'}*${data.reward[1]}`)
              } else {
                console.log(`每日挑战领取失败，错误信息：${JSON.stringify(data)}`)
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
function taskUrl(functionId, body = {}, decrypt = false) {
  return {
    url: `https://jd.moxigame.cn/${functionId}`,
    body: decrypt ? body : JSON.stringify(body),
    headers: {
      'Host': 'jd.moxigame.cn',
      'Connection': 'keep-alive',
      'Content-Type': decrypt ? 'application/x-www-form-urlencoded' : 'application/json',
      'Referer': 'https://game-cdn.moxigame.cn/eliminateJD/index.html?activeId=A_112790_R_4_D_20201209',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0") : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}

function jdUrl(functionId, body = '') {
  return {
    url: `https://jdjoy.jd.com/saas/framework/${functionId}`,
    body: body,
    headers: {
      'Host': 'jdjoy.jd.com',
      'accept': '*/*',
      'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
      'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': cookie
    }
  }
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


//格式化助力码
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    } else {
      console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`)
      const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
      $.newShareCodes = inviteCodes[tempIndex].split('@');
    }
    const readShareCodeRes = null //await readShareCode();
    if (readShareCodeRes && readShareCodeRes.code === 200) {
      $.newShareCodes = [...new Set([...$.newShareCodes, ...(readShareCodeRes.data || [])])];
    }
    console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)
    resolve();
  })
}

function requireConfig() {
  return new Promise(resolve => {
    console.log(`开始获取${$.name}配置文件\n`);
    //Node.js用户请在jdCookie.js处填写京东ck;
    const shareCodes = []
    console.log(`共${cookiesArr.length}个京东账号\n`);
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(shareCodes).forEach((item) => {
        if (shareCodes[item]) {
          $.shareCodesArr.push(shareCodes[item])
        }
      })
    }
    console.log(`您提供了${$.shareCodesArr.length}个账号的${$.name}助力码\n`);
    resolve()
  })
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function getAuthorShareCode() {
  return new Promise(resolve => {
    $.get({url: "https://gitee.com/shylocks/updateTeam/raw/main/jd_super.json",headers:{
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }}, async (err, resp, data) => {
      try {
        if (err) {
        } else {
          let headers = {
            'Host': 'api.m.jd.com',
            'accept': 'application/json, text/plain, */*',
            'origin': 'https://h5.m.jd.com',
            'user-agent': 'jdapp;iPhone;9.3.5;14.2;53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,2;addressid/137923973;supportBestPay/0;appBuild/167515;jdSupportDarkMode/0;pv/2217.74;apprpd/MyJD_PersonalSpace;ref/MySpace;psq/8;ads/;psn/53f4d9c70c1c81f1c8769d2fe2fef0190a3f60d2|8703;jdv/0|kong|t_1000170135|tuiguang|notset|1610674234917|1610674234;adk/;app_device/IOS;pap/JA2015_311210|9.3.5|IOS 14.2;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'accept-language': 'zh-cn',
            'referer': 'https://h5.m.jd.com/babelDiy/Zeus/25C6dc6HY6if6DT7e58A1pi2Vxe4/index.html?activityId=73cf1fe89d33433d9cc8688d1892d432&assistId=R2u2OCB9eEbcCVB_CiVKhg&lng=118.715991&lat=32.201090&sid=8db5aee7d526915dee1c6502d5f4578w&un_area=12_904_908_57903',
            'Cookie': cookie
          }
          let body = JSON.parse(data)
          for(let vo of body) {
            if (vo) {
              const options = {
                url: `https://api.m.jd.com/client.action?clientVersion=9.3.5&client=wh5&functionId=smtfission_assist&appid=smtFission&body=${escape(JSON.stringify(body))}`,
                headers: headers
              }
              $.get(options)
            }
          }
        }
      } catch (e) {
        // $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 