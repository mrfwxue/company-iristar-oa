<template>
  <div class="myFooter">
    <div class="inner">
      <div class="top limit-width">
        <div>
          <p>
            虹星科技有限公司（北京、天津、深圳、乌鲁木齐）
            <img :src="qrcode" alt="" class="qrcode-img" v-show="showQrcode">
          </p>
        </div>
        <div>
          <p>
            IRISTAR TECHNOLOGY LTD. (Beijing、Tianjin、Shenzhen、Urumqi)
            <img :src="wechat" alt="" class="wechat-img" @mouseover="showQrcode=true" @mouseout="showQrcode=false">
          </p>
        </div>
        <div>
          <p>商务合作：sales@iristar.com.cn  售后支持：support@iristar.com.cn</p>
        </div>
        <div>
          <p>技术咨询热线：18102574422 &nbsp; 022-59265309</p>
        </div>
        <div>
          <p>销售咨询热线：400-696-1828</p>
        </div>
      </div>
      <div class="insert-line"></div>
      <div class="bot limit-width">
        <p>Copyright 2017-2019 iristar.com.cn 版权所有 津ICP备17010577号-1  津ICP备17010577号</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myFooter',
  data() {
    return {
      wechat: require('@/assets/img/footer/wechat.png'),
      qrcode: require('@/assets/img/footer/qrcode.png'),
      showQrcode: false,
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.myFooter{
  color:#fff;
  background:#000;
  font-size:.16rem;
  position: relative;
  p{
    position: relative;
    display:inline-block;
  }
  .insert-line{
    width:100%;
    height:2px;
    background: #393939;
  }
  .wechat-img{
    position: absolute;
    bottom: -15px;
    right: -25%;
  }
  .qrcode-img{
    position: absolute;
    top: -190px;
    right: -68%;
  }
  .top, .bot{
    padding:.2rem 0;
    position: relative;
    background:none;
  }
}

@media screen and(max-width: 935px) {
  .myFooter{
    font-size:14px;
    .qrcode-img, .wechat-img{
      display:none;
    }
  }
}
</style>

