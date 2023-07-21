import { ref } from "vue";
//时间戳转译
export function ToStringTime(time: number, type = 1) {
  let date = new Date(time * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secend = date.getSeconds();
  return type == 1 ? `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`
    : `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day} ${hours <= 9 ? '0' + hours : hours}:${minutes <= 9 ? '0' + minutes : minutes}:${secend <= 9 ? '0' + secend : secend}`
}
//时间戳转译
export function ToStringTimes(time: number, type = 1) {
  let date = new Date(time * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let secend = date.getSeconds();
  return type == 1 ? `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`
    : `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day} ${hours <= 9 ? '0' + hours : hours}:${minutes <= 9 ? '0' + minutes : minutes}`
}
// 校验手机号
export function validMobile(str: string) {
  return /^1[3-9]\d{9}$/.test(str)
}

// 校验用户名
export function validUserName(str: string) {
  return str.trim()
}

export function validName(str: string) {
  return /^[\u0391-\uFFE5a-zA-Z·&\\s]+$/.test(str)
}

// 校验身份证
export function validCard(str: string) {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str)
}

//时间转时间戳
export function CkeckTime(Time: number, type = 1) {
  let date = new Date(Time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let Times = `${year}/${month <= 9 ? '0' + month : month}/${day <= 9 ? +'0' + day : day}`
  // console.log(Times, 'Times')
  return type == 1 ? new Date(Times).getTime() / 1000 : new Date(Times).getTime();
}
//获取当前时间
export function getTime() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let y = year;
  let m = month <= 9 ? '0' + month : month;
  let d = day <= 9 ? +'0' + day : day;
  let Times = `${y}-${m}-${d}`
  return { Times, y, d, month }
}
export function getUrl() {
  const url = document.location.toString()
  const _url = url.split('#')
  const _path = encodeURIComponent(_url[0] + '#/pages/order/order')
  const path = window.location.protocol + '//' + window.location.host + 'transfer?query=' + _path
  console.log(path, 'path')

  return path
}
//去除空格 所有空格
export function Trims(str: string) {
  return str.replace(/\s+/g, "")
}

export function toGeTime(time: number) {
  let dd = new Date();
  dd.setDate(dd.getDate() + time);
  let y = dd.getFullYear();
  let m = dd.getMonth() + 1;
  let d = dd.getDate();
  return `${y}/${m}/${d}`
}

//根据参数名获取对应的url参数 
export function getQueryString(url: string) {
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    let strs = str.split("?");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
//   时分秒
export function getTimes(o: number, type = 1) {
  const times = new Date()
  const nowTime = times.getTime();
  const endTime = o * 1000;
  let eTime = endTime - nowTime;
  let d, h, m, s = '0';
  let timx = 0
  if (eTime > 0) {
    d = Math.floor(eTime / 1000 / 60 / 60 / 24);
    h = Math.floor(eTime / 1000 / 60 / 60 % 24);
    m = Math.floor(eTime / 1000 / 60 % 60);
    s = Math.floor(eTime / 1000 % 60);
    let day = d <= 9 ? `0${d}` : d;
    let Hs = h <= 9 ? `0${h}` : h;
    let mm = m <= 9 ? `0${m}` : m;
    let ss = s <= 9 ? `0${s}` : s;
    let TimesAll = type == 1 ? `${Hs}:${mm}:${ss}` : `${Hs}时:${mm}分:${ss}秒`
    timx = TimesAll
    if (timx == '00:00:00' || timx == '00时:00分:00秒') {
      timx = 0
    }
    return timx
  }

}
export function week(Node: number) {
  let arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[Node]
}
export function timeTo(time: string, nowtime: string) {
  var date = new Date(time);
  var nowdate = new Date(nowtime);
  var PY = date.getFullYear();//获取指定时间年份
  var NY = nowdate.getFullYear();//获取当前时间年份
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() + '';
  var h = date.getHours() + '/';
  var m = date.getMinutes() + '/';
  var s = date.getSeconds();
  if (PY == NY) {//判断年份是否是同一年，是的输出格式 08/01  不是的话输出格式2018/08/01
    return M + D;
  }
  else {
    return Y + M + D;
  }
}

// 转析
export function HtmlContent(Node: string) {
  let opt = Node && Node.split(/[\n,]/g);
  const _o = [];
  if (opt) {
    opt.map(item => {
      if (item) {
        _o.push(item)
      }
    })
  }
  // console.log(_o, 'o')
  return _o
}
//保留length位小数
export function toFixed(number: number, length: number) {
  if (isNaN(number)) {
    return number || "";
  }
  return parseFloat(number).toFixed(length != undefined ? length : 2);
}
export function clone(data: object) {//深拷贝
  return JSON.parse(JSON.stringify(data));
  //return Array.isArray(data) || !isNaN(data) || typeof data == "string" ? JSON.parse(JSON.stringify(data)) : Object.assign({}, data);
}
export function set_($name: string, $data: object) {
  uni.setStorageSync($name, $data)
}
export function get_($name: string) {
  return uni.getStorageSync($name)
}
export function clear_($name: string) {
  uni.removeStorageSync($name)
}
