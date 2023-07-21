<template>
  <view>
    <view class="bj_img">
      <image :src="api.getImgUrls('my-bj.png')"></image>
    </view>

    <view class="my_container">
      <view class="my_con"> 个人中心 </view>
      <view class="my_one" @tap="torouter(2)">
        <view>
          <image :src="user.avatar || api.ImgList_('avaImg.jpg')" mode=""></image>
        </view>
        <view>
          <view>{{ user.nick_name || "游客" }}</view>
          <view>id: {{ user.member_no || "游客" }}</view>
        </view>
      </view>
      <view class="my_two">
        <view @tap="torouter(1)">
          <view>
            <image :src="api.getImgUrls('my-travels.png')" mode=""></image>
          </view>
          <view>定制游</view>
          <view>
            <u-icon name="arrow-right" color="#999999" size="12"></u-icon>
          </view>
        </view>
      </view>
      <view class="my_two" @click="toRouter">
        <!-- v-if="isCoupon" -->
        <view>
          <view>
            <image :src="api.getImgUrls('my-coupon.png')" mode=""></image>
          </view>
          <view>优惠券</view>
          <view>
            <u-icon name="arrow-right" color="#999999" size="12"></u-icon>
          </view>
        </view>
      </view>
      <view class="my_two" @click="toSubscribe">
        <view>
          <view>
            <image :src="api.ImgList_('yuyue.png')" mode=""></image>
          </view>
          <view>预约单</view>
          <view>
            <u-icon name="arrow-right" color="#999999" size="12"></u-icon>
          </view>
        </view>
      </view>
      <view class="my_two">
        <view @click="toAddress" class="line">
          <view>
            <image :src="api.getImgUrls('my_address.png')" mode=""></image>
          </view>
          <view>地址管理</view>
          <view>
            <u-icon name="arrow-right" color="#999999" size="12"></u-icon>
          </view>
        </view>
        <view @click="getCustomerInfo" class="line">
          <view>
            <image :src="api.getImgUrls('my-kefu.png')" mode=""></image>
          </view>
          <view>平台客服</view>
          <view>
            <u-icon name="arrow-right" color="#999999" size="12"></u-icon>
          </view>
        </view>
        <view @click="goToProposal">
          <view>
            <image :src="api.getImgUrls('my-suggest.png')" mode=""></image>
          </view>
          <view>投诉及建议</view>
          <view>
            <u-icon name="arrow-right" color="#999999" size="12"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="my_two">
      <view>
        <view>
          <image src="../../static/index/gywm.png" mode=""></image>
        </view>
        <view>版本号</view>
        <view> -->
    <!-- <u-icon name="arrow-right" color="#999999"></u-icon> -->
    <!-- 1.0.0 -->
    <!--  </view>
      </view>
    </view> -->
    <!-- <logo></logo> -->
    <!-- 版本号 -->
    <!-- <view class="edition">版本号 v1.0.0</view> -->
    <!-- <view class="logo-content2">
      <image :src="this.ImgList_('shop_logo.png')"></image>
      <text class="text">全球e旅提供技术支持</text>
    </view>
    <view class="texts">版本号 v1.0.0</view> -->
    <view class="versoin">
      <view class="verText"> — 版本号1.1.01 — </view>
      <view class="verTexts">
        <view class="img">
          <image :src="api.ImgList_('shop_logo.png')" mode="" />
        </view>
        <view class="text">全球e旅提供技术支持</view>
      </view>
    </view>

    <!-- 微信客服弹窗 -->
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, reactive } from "vue";
const { appContext } = getCurrentInstance();
const api = appContext.mixins[0].methods;
const user = reactive({
  avatar: "",
  nick_name: "",
  member_no: "",
});
</script>
<style scoped lang="scss">
@import "./indexs.scss";
</style>
