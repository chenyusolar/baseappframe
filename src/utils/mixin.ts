import store from "../store_";
import server from '../apiData/api';
import { CkeckTime, week, timeTo } from './index'
import { get_, set_, clear_ } from '../utils'
import { APIHTTPS } from '../store_/mutation-types'
// import uniCopy from "@/components/xb-copy/uni-copy.js";
let setNum = 0;
let getNum = 0
let Times_ = 0
const apiMixin = {
  data() {
    return {
      aniFinish: false,
      finishCallArr: [],
      share: {
        title: '多门店小程序',
        path: '/pages/indexs/index',
        imageUrl: '',
        desc: '',
        content: ''
      },
      limit_productList: ['不限制', '指定商品可用', '指定商品不可用'], //优惠券
      limit_productLists: ['全部可用', '部分可用', '指定商品不可用'], //优惠券
      typeList: ['线路', '酒店', '门票', '抢购', '', '商城'],                // 门店首页标签
      areTypeName: ['线路', '酒店', '门票', '抢购', '', '商城'],   // 商家首页标签
      timer: null,
      // 首页金刚区
      navList: [
        {
          name: "抢购",
          url: this.getImgUrls('jg-purchase.png'),
        },
        {
          name: "跟团游",
          url: this.getImgUrls('groups.png'),
        },
        {
          name: "自由行",
          url: this.getImgUrls("jg-line.png"),
        },
        {
          name: "自驾游",
          url: this.getImgUrls('selfcar.png'),
        },
        {
          name: "酒店",
          url: this.getImgUrls("jg-hotel.png"),
        },
        {
          name: "周边游",
          url: this.getImgUrls('surroundings.png'),
        },
        {
          name: "亲子游",
          url: this.getImgUrls('family.png'),
        },
        // {
        //   name: "门票",
        //   url: this.getImgUrls("jg-tickets.png"),
        // },
        {
          name: '商城',
          url: this.getImgUrls("jg-shop.png"),
        },

      ],
    }
  },
  onShareAppMessage(res) {
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res) {
        uni.showToast({
          title: '分享成功'
        })
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    }
  },
  onShareTimeline(res) {
    return {
      title: this.share.title,
      path: '/pages/indexs/index',
      imageUrl: '',
      desc: '',
      content: ''
    }
  },
  watch: {
    aniFinish(val) {
      const t = this;
      if (val) {
        const length = t.finishCallArr.length;
        for (let i = 0; i < length; i++) {
          console.log("mixin动画完成，渲染_" + i, val)
          const callback = t.finishCallArr.shift();
          callback(val)
        }
        t.aniFinish = false;
      }
    }
  },
  onUnload() {
    const falg = store.state.loading_
    console.log(falg, 'falg')
  },
  methods: {
    pageAniFinishCallApi() {//路由动画完毕后调用该方法
      const t = this;
      console.log("pageAniFinishCallApi")
      t.aniFinish = true;
    },
    checkFinish() {
      const t = this;
      return new Promise((r) => {
        console.log("mixin等待动画完成调用")
        if (!t.$store.state.pageAnimate) {
          //setTimeout(()=>{
          r();
          //},100)
        } else {
          t.finishCallArr.push((finish) => r(finish))
        }
      });
    },
    /**
      获取通用的列表数据的FV
      @param {
        name:'getNotice',//在server里的接口名称
        listName:'data',//接口返回的数据对象名。rows或data
        title:'通知公告',//接口名，提示信息用
        noMsg:false,//是否不需要提示
        param:[],//参数，数组对象
        isRoot:false,//兼容接口没有返回code字段，直接返回数据的或跳过code判断需自己显示错误提示等情况(一般配合allBack:true使用)
        allBack:false,//返回所有数据
        unLoading:Boolean,//是否显示loading效果
        type:null,//返回的数据类型 null Array Object
      }
    **/
    async getApiData(obj) {
      const t = this
      let type = null
      if (obj.type === 'Array' || obj.type === Array) {
        type = []
      } else if (obj.type === 'Object' || obj.type === Object) {
        type = {}
      }
      let list = type
      try {
        if (!obj.unLoading) {
          t.setLoading(true)
          getNum++
        }
        const param = obj.param || []
        const result = await server[obj.name](...param)
        if (result.code === 1 || result.code === 0 || obj.isRoot) {
          let deepObj = ''
          const listName = obj.listName || 'data'
          const deepKey = listName.split('.')
          if (obj.allBack) { // 全部返回
            deepObj = result
          } else if (typeof result[deepKey[0]] === 'object') { // 兼容xx.xx
            deepObj = JSON.parse(JSON.stringify(result[deepKey[0]]))
            for (let j = 1; j < deepKey.length; j++) {
              // if(deepObj[deepKey[j]]){
              deepObj = deepObj[deepKey[j]]
              if (typeof deepObj !== 'object') {
                break
              }
              // }
            }
          } else {
            deepObj = result[deepKey[0]]
          }
          list = deepObj || type
        } else {
          console.error(obj.title + ' 请求出错', result.code, result.msg);
          !obj.noMsg && t.message(
            result.message || obj.title + ' 请求出错'
          )
        }
      } catch (e) {
        if ((e + '').indexOf('Unauthorized') === -1) {
          !obj.noMsg && t.message(
            obj.title + '请求失败'
          )
        } else if (e) {
          t.message(
            '请重新登录！'
          )
        }
        console.error(obj.title + ' 请求失败', e + '', e, obj)
      }
      if (!obj.unLoading) {
        getNum--
        if (getNum == 0) {
          t.setLoading(false)
        }
      }
      console.log('getApiData', list)
      return list
    },
    /**
      更新接口数据的(成功会固定返回code=200)
      @param {
        name:'getNotice',//在server里的接口名称
        title:'通知公告',//接口名，提示信息用
        noMsg:false,//是否不需要提示
        param:[],//参数，数组对象
        isRoot:false,//兼容接口没有返回code字段，直接返回数据的或跳过code判断需自己显示错误提示等情况(一般配合allBack:true使用)
        unLoading:Boolean，//是否显示loading效果
        allBack:false,//返回所有数据
      }
    **/
    async setApiData(obj) {
      const t = this;
      let data = {
        code: 500,
        msg: '',
      };
      try {
        if (!obj.unLoading) {
          t.setLoading(true);
          setNum++;
        }
        let param = obj.param || [];
        const result = await server[obj.name](...param);
        if (result.code === 1 || result.code === 0 || obj.isRoot) {
          let code = {};
          if (result.code === 1 || result.code === 0) {
            code = {
              code: 200 //成功固定返回code200
            }
          }
          data = {
            ...result,
            ...code
          };
        } else if (result.code == 40030 && Times_++ < 6) {
          store.dispatch('getSupplier', get_('U_APPID'))
          return t.setApiData(obj)
        }
        else {
          console.error(obj.title + " 请求出错", result.code, result.msg)
          data = {
            msg: result.msg,
            code: 500
          }
          !obj.noMsg && t.message(
            result.msg || obj.title + " 请求出错"
          );
        }
      } catch (e) {
        if ((e + "").indexOf('Unauthorized') === -1) {
          !obj.noMsg && t.message(
            obj.title + "请求失败"
          );
        } else if (e) {
          t.message(
            '请重新登录！'
          )
        }
        console.error(obj.title + " 请求失败", e + "", e)
      }
      if (!obj.unLoading) {
        setNum--;
        if (setNum == 0) {
          t.setLoading(false);
          t.errorData(false)
          Times_ = 0
        }
        // console.info("setNum", setNum)
        // console.info("Times_", Times_)
      }
      if (data.code == 500) { // 兼容xxxx
        // t.hedLoading(false);
        // t.errorData(true)
      }
      return data;
    },
    setLoading(flag: boolean) {
      // flag?uni.showLoading({}):uni.hideLoading()
      store.commit("ISLOADING", { name: 'isloading', value: flag || false })
    },
    hedLoading(flag: boolean) {
      store.commit('head-top', { name: 'headTop', value: flag || false })
    },
    errorData(flag: boolean) {
      store.commit('error-img', { name: 'error-img', value: flag || false })
    },
    // copy_(Node) {  //复制
    //   console.log(Node, "node");
    //   uniCopy({
    //     content: Node,
    //     success: (res) => {
    //       uni.showToast({
    //         title: "复制成功",
    //         icon: "none",
    //       });
    //     },
    //     error: (e) => {
    //       uni.showToast({
    //         title: e,
    //         icon: "none",
    //         duration: 3000,
    //       });
    //     },
    //   });
    // },
    //数据样式
    imgIcon_($img: string) {
      //从左往右  地址，购物车，优惠券，数据，无收藏，无历史记录，列表为空，消息为空，无新闻列表，订单为空，页面不存在，无权限，无评论，没有搜索记录，没有wift
      let img_ = ['address', 'car', 'coupon', 'data', 'favor', 'history', 'list', 'message', 'news', 'order', 'page', 'permission', 'pl', 'seach', 'wift'];
      return store.state.img_Https + img_.filter(v => v == $img)[0] + '.png'
    },
    //消息订阅
    requestMessage($name: string) {
      const list = this.get_('subscribe_id') && JSON.parse(this.get_('subscribe_id'))
      if (list) {
        let ids = []
        list.map((item, indexs) => {
          if (item.type_key === $name) ids.push(item.template_id)
        })
        console.log(ids, 'ids')
        setTimeout(() => {
          wx.getSetting({
            withSubscriptions: true,
            success(res) {
              console.log(res, 're1111s')
              if (res.authSetting['scope.subscribeMessage']) {
                console.log('总是保持不在询问....')
              } else {
                wx.requestSubscribeMessage({
                  // tmplIds: ['B2Yx01zIshjymrLgfoqugYYEMMWB1_YmqXBZMQzNwPA'],
                  tmplIds: ids,
                  success(res) {
                    console.log(res, 'res')
                  }
                })
              }

            }
          })
        }, 500)
      }
    },
    _empty(v) {
      let tp = typeof v,
        rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true
      } else if (tp == "undefined") {
        rt = true
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
      } else if (tp == "function") {
        rt = false
      }
      return rt
    },
    getDetailPath(Node) {  //详情获取数据的方法
      const arr = Node.split(',')
      if (arr.length == 2) {
        return { id: arr[0], area_type: arr[1] }
      } else if (arr.length == 3) {
        return { id_: arr[0], area_type: arr[1], is_agent: arr[2] }
      } else {
        return { id: arr[0] }
      }

    },
    //价格的处理
    ObjectMoney(Node) {
      if (Node) {
        let opt = Node.split('.')
        if (opt.length == 1) {
          opt.push('00')
          return opt
        } else {
          return opt
        }
      } else {
        return ['0', '00']
      }


    },
    // 防抖
    debounceList(fn, delay) {
      // let timer = null
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        fn()
      }, delay)
    },
    async downloadFile(url, name) {
      const t = this
      let isBlob = false;

      if (url + "" === '[object Blob]') {
        url = new Blob([url], {
          type: url.type
        });
        isBlob = true;
      }
      if (!isBlob) { //url为下载地址
        url = encodeURI(url)
        if (!/^(http)/.test(url) && /^(\/api)/.test(url)) { //由于url带了/api，所以要转成带http的路径
          url = location.origin + url;
        }
        try {

          const result = await http.get(url, {}, {
            responseType: 'blob',
            getAllData: true
          }); //为了监控链接是否成功下载
          console.log(`result`, result)
          !name && (name = window.decodeURI(result.headers['content-disposition'].split('=')[1].replace("utf-8''", ""), "UTF-8"))

          url = new Blob([result.data], {
            type: result.data.type
          });
          isBlob = true;
        } catch (e) {
          console.log("下载异常", e);
          t.message(
            "下载异常！!"
          );
          return Promise.reject(e);
        }
      }
      if (!name) {
        name = +new Date();
      }
      if (navigator.msSaveOrOpenBlob) { //ie
        navigator.msSaveOrOpenBlob(url, name)
      } else {
        url = URL.createObjectURL(url)
        let link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link = null;
        console.log("下载完成")
      }
    },
    validCard(Node, info, Name) {   //校验身份证 本人是否到 info 区间多少岁为限制 name 可以传可以不传
      let card = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
      let t = this;
      let falg = false;
      console.log(Node, 'Node')
      if (!card.test(Node)) {
        t.message(
          Name + '输入的身份证号码有误!'
        )
        falg = true
      } else {
        let newCard = Node.substr(6, 15).split('');
        let cSyes = `${newCard[0] + newCard[1] + newCard[2] + newCard[3]}`    //出声年
        let cSMoth = `${newCard[4] + newCard[5]}`   //出声月
        let cSday = `${newCard[6] + newCard[7]}` //出声日
        let newDate = new Date();
        let newList = { year: newDate.getFullYear(), month: newDate.getMonth() + 1, taday: newDate.getDate() }
        let sYear = newList.year - parseInt(cSyes)
        let sMonth = parseInt(newList.month - parseInt(cSMoth))
        if (sYear >= info) { //
          if (sYear === info) {
            if (newList.month < parseInt(cSMoth)) {
              t.message(
                Name + '未成年，无法上传！'
              )
              falg = true
            }
          } else if (sYear > 60) {
            t.message(
              Name + '大于60岁，无法上传！'
            )
            falg = true
          }
        } else {
          t.message(
            Name + '未成年，无法上传！'
          )
          falg = true
        }
      }
      return falg
    },

    validLetter(val) {
      let Node = /^[a-zA-Z]$/;
      let falg = false
      if (!Node.test(val)) {
        falg = true
        this.message(
          '只能输入字母!'
        )
      }
      return falg
    },
    //图片上传
    uloadImg_(count = 1) { //默认一张上传
      return new Promise((resolve, reject) => {
        const url_ = this.get_(APIHTTPS) + '/multi/user/uploadImage'
        const s_id = this.get_('SUPP_ID')
        const token = this.get_('Token')
        const obj = {
          code: 500,
          msg: '图片上传出错...'
        }
        uni.chooseImage({
          count: count, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: function (res) {
            let filePath = res.tempFiles[0].path;
            let filename = filePath.substr(filePath.lastIndexOf('/') + 1);
            uni.uploadFile({
              url: url_, //后台地址
              filePath: filePath,
              name: 'image',
              fileType: 'image',
              header: {
                'suppliercert': s_id,
                'token': token,
              },
              formData: {
                'image': filePath
              },
              success: (res) => {
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                  let obj = {
                    code: 200,
                    imageUrl: ''
                  }
                  data && data.data ? obj.imageUrl = data.data : obj
                  resolve(obj)
                } else {

                  resolve(obj)
                }
              },
              fail: (error) => {
                console.log(error, 'error')
                reject(error)
              }
            })
          }
        });

      })
    },
    vaildPhone(node, Name) {   //手机号码校验
      let phone = /^(?:(?:\+|00)86)?1\d{10}$/;
      let t = this;
      let falg = false;
      if (!phone.test(node)) {
        t.message(
          Name + "手机号码输入有误!"
        )
        falg = true
      }
      return falg
    },

    splictTime(Node) {    //处理时间
      let newTime = Node.split(' ')[0];
      return newTime
    },
    openRouter(router, flag) { //新页面打开路由
      const t = this;
      let {
        href
      } = t.$router.resolve(router);
      window.open(href, '_blank');
    },
    /**
     *	中英互译中包含${1}这样的变量时使用 xxxxx${1}xxxx${2}xxxxx
     * this.resetI18n('home.Workbench',["变量1","变量2"])
     **/
    resetI18n(str, paramArr = []) {
      const t = this;
      str = t.$t(str);
      str.replace(/\${\d+}/g, function (args, a, b, c) {
        const index = args.replace(/\${(\d+)}/, '$1');
        const reg = new RegExp("\\$\\{" + index + "\\}", 'g')
        str = str.replace(reg, paramArr[index - 1] || '');
      })
      return str
    },
    //数组去重
    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr
    },
    message(title = '获取数据失败', duration = 1500) {
      uni.showToast({
        title: title,
        icon: 'none',
        duration: duration
      })
    },
    getImgUrls(Node: string) {   //multi
      const img = store.state.img_Https + Node
      return img
    },
    getImgUrl(Node: string) {   //mini_mall
      const img = 'https://b2b-shop-test-1302034052.cos.ap-guangzhou.myqcloud.com/mini_mall/' + Node
      return img
    },
    ImgList_(Node: string) { //counpon
      return store.state.couponImg + Node
    },
    set_($name: string, $data: object,) {
      uni.setStorageSync($name, $data)
    },
    get_($name: string) {
      return uni.getStorageSync($name)
    },
    clear_($name: string) {
      uni.removeStorageSync($name)
    },
    // 返回上一个页面
    returnPath() {
      const page = getCurrentPages()
      if (page) {
        if (page.length > 1) {
          uni.navigateBack({
          })
        } else {
          store.dispatch('index_')
        }
      }

    },
  }
}
export {
  apiMixin
}