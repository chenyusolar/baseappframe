<template>
  <head-top :loading="loading">
    <view style="padding: 20px;">
      <u-button type="primary" text="确定"></u-button>
      <u-button type="primary" :plain="true" text="镂空"></u-button>
      <u-button type="primary" :plain="true" :hairline="true" text="细边"></u-button>
      <u-button type="primary" :disabled="disabled" text="禁用"></u-button>
      <u-button type="primary" loading loadingText="加载中"></u-button>
      <u-button type="primary" icon="map" text="图标按钮"></u-button>
      <u-button type="primary" shape="circle" text="按钮形状"></u-button>
      <u-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
      <u-button type="primary" size="small" text="大小尺寸"></u-button>
    </view>
    <u-swiper :list="list1" @change="change" @click="click"></u-swiper>
  </head-top>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom, onPageScroll } from "@dcloudio/uni-app";
import { ref, onMounted, getCurrentInstance, reactive } from "vue";
const loading = ref<boolean>(true);
const disabled = ref<boolean>(true);
const list1 = reactive([
  "https://cdn.uviewui.com/uview/swiper/swiper1.png",
  "https://cdn.uviewui.com/uview/swiper/swiper2.png",
  "https://cdn.uviewui.com/uview/swiper/swiper3.png",
]);
const change = (node: any) => {
  console.log(node, "node");
};
const click = (node: any) => {
  console.log(node, "node");
};
onLoad(() => {
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});
</script>

<style lang="scss"  >
</style>
