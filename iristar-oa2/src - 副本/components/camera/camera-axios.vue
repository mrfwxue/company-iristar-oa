<template>
  <div class="camera" v-loading.fullscreen="loading">
    <div class="banner">
      <img src="@/assets/img/banner/banner1.png" alt="">
    </div>
    <div class="inner-wrap">
      <el-row :gutter="18">
        <el-col :span="12">
          <div class="left">
            <p class="title">{{$t("message.CAMERA.left.title")}}</p>
            <dl>
              <dt :style="{height: dtHeight+'px'}"><img v-if="dtHeight" :src="recData.recImage ? imgBase64+recData.recImage : ''"></dt>
              <dd>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p1")}}：{{recData.deviceName}}</p>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p2")}}：{{recData.sn}}</p>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p3")}}：{{recData.recognitionAt}}</p>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p4")}}：{{formatKey(recData.recType, recType, 'name', 'val')}}</p>
              </dd>
            </dl>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <p class="title">{{$t("message.CAMERA.right.title")}}</p>
            <dl>
              <dt ref="dtimg"><img @load="imgLoad" :src="regData.regImage ? imgBase64+regData.regImage : ''"></dt>
              <dd>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.right.p1")}}：{{regData.name}}</p>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.right.p2")}}：{{regData.empno}}</p>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.right.p3")}}：{{regData.department}}</p>
                <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.right.p4")}}：{{regData.createAt}}</p>
              </dd>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="result-wrap">
      <i class="el-icon-circle-check my-icon my-icon-success" v-if="result.msg && result.code === 200"></i>
      <i class="el-icon-circle-close my-icon my-icon-error" v-if="result.msg && result.code !== 200"></i>
      <span>{{$t("message.CAMERA.result")}}：</span>
      <span class="result" v-if="result.msg" :class="result.code === 200 ? 'my-icon-success' : 'my-icon-error'">{{result.msg}}</span>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import request from "@/axios/axios";
const imgBase64 = 'data:image/jpg;base64,';
export default {
  name: 'camera',
  data() {
    return {
      isClick: false,
      loading: false,
      moment: moment,
      imgBase64: imgBase64,
      dtHeight: 0,
      fontSize: 0,
      recType: [
        {name: 'face', val: '1'},
        {name: 'eye', val: '2'},
        {name: 'eyeAndFace', val: '3'},
        {name: 'pwd', val: '4'},
      ],
      result: {
        code: 200,
        msg: '',
      },
      recData: {
        recImage: '',
        deviceName: '',
        sn: '',
        recognitionAt: '',
        recType: '',
      }, // 识别数据
      regData: {
        regImage: '',
        name: '',
        empno: '',
        department: '',
        createAt: '',
      }, // 系统数据
      clearDataTimer: null, // 识别成功后，定时清除数据
      timeout: 5, // 定时时间 s
    }
  },
  created() {
    //
  },
  mounted() {
    const vm = this;
    this.fontSize = window.innerWidth/80;
    this.setWebSocket();
    window.onresize = function() {
      // console.log(vm.$refs.dtimg.clientHeight)
      vm.dtHeight = vm.$refs.dtimg.clientHeight;
      vm.fontSize = window.innerWidth/80;
    }
  },
  computed: {},
  watch: {},
  methods: {
    imgLoad(e) {
      this.dtHeight = this.$refs.dtimg.clientHeight;
      // console.log(this.$refs.dtimg.clientHeight)
    },
    // 格式化字段
    formatKey(val, data, key, check_key) {
      let text = '--';
      if((val||val === 0)&&data&&key){
        data.map(item => {
          if((check_key ? item[check_key] : item.val) == val){
            text = item[key];
          }
        })
      }
      if(text === '--'){
        return text;
      }else{
        return this.$t('message.CAMERA.type.'+text);
      }
    },
    // 清空数据
    resetData() {
      this.recData = {
        recImage: '',
        deviceName: '',
        sn: '',
        recognitionAt: '',
        recType: '',
      }; // 识别数据
      this.regData = {
        regImage: '',
        name: '',
        empno: '',
        department: '',
        createAt: '',
      }; // 系统数据
    },
    // websocket
    setWebSocket() {
      let vm = this;
      let ROOT_URL = '';
      if(process.env.NODE_ENV === 'development'){
        ROOT_URL = root_config.development; // 开发环境
      }else{
        ROOT_URL = root_config.product; // 服务器环境
      }
      let ws = new WebSocket('ws://'+ROOT_URL.split('/')[2]+'/ws/monitor');
      // 连接
      ws.onopen = res => {
        console.log('连接成功');
      }
      // 接受数据
      ws.onmessage = res => {
          console.log('接受数据-----------', res);
          // console.log('接受数据-----------', res.data.split(" "));
        try{
          console.log('JSON.parse-----------', JSON.parse(res.data));
          let data = JSON.parse(res.data);
          if(data.code === 200){
            vm.recData = data.data.recognitionData;
            vm.regData = data.data.registerData;
            vm.result.code = data.code;
            vm.result.msg = data.msg;
            vm.clearDataTimer = setTimeout(() => {
              vm.resetData()
            }, vm.timeout * 1000);
          }
        }catch(err){}
      }
      // 连接错误
      ws.onerror = res => {
        console.log('连接错误', res);
      }
      // 关闭连接
      ws.onerror = res => {
        console.log('关闭连接');
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.camera{
  .banner{
    width:100%;
    height: 74px;
    margin-bottom:10px;
    background:#fff;
    img{
      width:100%;
      height: 100%;
    }
  }
  .inner-wrap{
    margin-bottom:12px;
    .left, .right{
      padding:0 8px;
      background:#fff;
      border-bottom: 3px solid #5B8FF0;
      .title{
        line-height:47px;
        border-bottom:1px solid #ededed;
        padding-left:7px;
        font-size:14px;
        color:#666;
        text-align:left;
      }
      dl{
        padding:5px 0;
        overflow: hidden;
        dt{
          // width:156px;
          width:35%;
          min-height:235px;
          background:#fff;
          float: left;
          overflow: hidden;
          img{
            width:100%;
          }
        }
        dd{
          float: left;
          padding-top:10%;
          margin-left:4%;
          margin-bottom:10%;
          p{
            margin-bottom: 14px;
            text-align: left;
          }
        }
      }
    }
  }
  .result-wrap{
    line-height:73px;
    background:#fff;
    text-align:center;
    .my-icon{
      font-size:34px;
      color:#6092F0;
      vertical-align: middle;
      margin-right:15px;
    }
    .my-icon-success{
      color:#6092F0;
    }
    .my-icon-error{
      color:#F56C6C;
    }
    span{
      font-size:12px;
      color:#a4a4a4;
    }
    .result{
      font-size:20px;
      color:#6092F0;
      vertical-align: middle;
    }
  }
}
</style>

