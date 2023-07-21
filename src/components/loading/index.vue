<template>
  <view>
    <view class="loading" v-if="isLoadings">
      <u-loading-page loading-mode="spinner" :loading="loading" loading-text="正在加载..."></u-loading-page>
      <!-- -->
    </view>
    <view v-else>
      <slot v-if="!errorImgs"></slot>
      <u-empty text="暂时找不到刷新试试~" v-else :icon="api.imgIcon_('data')"></u-empty>
      <is-loading></is-loading>
    </view>
  </view>
</template>
<script lang="ts" setup>
import isLoading from "@/components/BLoading/index.vue";
import { useStore, mapState } from "vuex";
import { computed, ref, watch, toRef, getCurrentInstance, toRefs } from "vue";
const { appContext } = getCurrentInstance();
const api = appContext.mixins[0].methods;
const state = useStore();
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
  is_footer: {
    type: Boolean,
    default: false,
  },
  is_footer_name: {
    type: String,
    default: "更多内容请持续关注",
  },
  showLogo: {
    type: Boolean,
    default: false,
  },
});
const { loading } = toRefs(props);
const isLoadings = ref<boolean>(props.loading);
const errorImgs = ref<boolean>(false);
const headTop_ = computed(() => state.state.headTop_);
const errorImg = computed(() => state.state.errorImg);
watch(
  headTop_,
  (val) => {
    isLoadings.value = val;
  },
  { immediate: true, deep: true }
);
watch(
  loading,
  (Node) => {
    isLoadings.value = Node;
  },
  { deep: true }
);
watch(
  errorImg,
  (val) => {
    errorImgs.value = val;
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
