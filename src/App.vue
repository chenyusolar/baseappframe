<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useStore } from "vuex";
const store = useStore();

onLaunch(() => {
  console.log("App Launch");
  store.commit("LoginModal", false);
  uni.$on("showLoading", (flag) => {
    store.commit("ISLOADING", { name: "islonading", value: flag });
  });
  //#ifdef MP-WEIXIN
  store.dispatch("wxUpload_");
  var accround = wx.getAccountInfoSync();
  var appid = accround.miniProgram.appId;
  uni.setStorageSync("U_APPID", appid);
  // store.dispatch("getHttps", appid);
  // 检测微信版本

  const sysInfo = wx.getSystemInfoSync();
  const version = sysInfo.SDKVersion;
  console.log(version, "111");
  if (compareVersion(version, "2.21.2") >= 0) {
    return;
  } else {
    uni.showModal({
      title: "提示",
      content:
        "当前微信版本过低，部分功能将无法使用，请升级到最新微信版本后重试。",
      success(res) {
        if (res.confirm) {
          if (sysInfo.platform == "pc") {
            uni.$showMsg("请更新微信版本！");
          } else {
            wx.updateWeChatApp();
          }
        } else if (res.cancel) {
          uni.$showMsg(
            "当前微信版本过低，部分功能将无法使用，请升级到最新微信版本后重试。"
          );
        }
      },
    });
  }
  //#endif
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
const compareVersion = (v1: string, v2: string) => {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};
</script>
<style lang="scss">
@import "uview-plus/index.scss";
@import "./static/common.css";
image {
  width: 100%;
  height: 100%;
}
page {
  background: #f5f5f5;
  font-size: 28rpx;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
