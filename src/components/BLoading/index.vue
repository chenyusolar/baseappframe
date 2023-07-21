<template>
  <view class="loading" v-if="showMask">
    <view class="loading_top">
      <!-- <u-loading-page loading-mode="spinner" bg-color="rgba(0,0,0,.3)" :loading="showMask" loading-text="正在加载...">
      </u-loading-page> -->
      <u-loading-icon size="36" :show="showMask"></u-loading-icon>
    </view>
  </view>
</template>
<script>
// BLoading
import { mapState } from "vuex";
export default {
  name: 'loading',
  data() {
    return {
      text: '',
      showMask: false,

    }
  },
  computed: {
    ...mapState(["loading_"]),
  },
  watch: {
    loading_(val) {
      if (val) {
        this.showMask = true;
      } else {
        setTimeout(() => {  //防止动画不出来
          this.showMask = false
        }, 200);
      }
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>