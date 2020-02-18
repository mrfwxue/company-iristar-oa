<template>
  <div class="camera" v-loading.fullscreen="loading" ref="camera">
    <div class="banner" ref="banner">
      <img src="@/assets/img/banner/banner1.png" alt="">
    </div>
    <div v-show="showType == 1">
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
      <div class="result-wrap" ref="inner-content">
        <i class="el-icon-circle-check my-icon my-icon-success" v-if="result.msg && result.code === 200"></i>
        <i class="el-icon-circle-close my-icon my-icon-error" v-if="result.msg && result.code !== 200"></i>
        <span>{{$t("message.CAMERA.result")}}：</span>
        <span class="result" v-if="result.msg" :class="result.code === 200 ? 'my-icon-success' : 'my-icon-error'">{{result.msg}}</span>
      </div>
      <div class=single>
        <div class="img-wrap">
          <div class="inner">
            <div class="arrow-left">
              <i class="el-icon-arrow-left" @click="changeDevice('prev')"></i>
            </div>
            <div class="inner-content">
              <div ref="container">
                <ul :style="deviceTranslate">
                  <li v-for="(item, i) in deviceList" :key="i">
                    <div class="img"></div>
                    <span class="text">设备SN</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="arrow-right">
              <i class="el-icon-arrow-right" @click="changeDevice('next')"></i>
            </div>
          </div>
        </div>
        <div class="model-wrap">
          <div class="item" @click="changeShowType(1)">单设备监视</div>
          <div class="item" @click="changeShowType(2)">2*2监视</div>
          <div class="item" @click="changeShowType(3)">3*4监视</div>
        </div>
      </div>
    </div>
    <div v-show="showType == 2 || showType == 3" class="type23" ref="type23">
      <div class="left">
        <div class="type2" v-show="showType == 2">
          <div class="item" v-for="(item, i) in copyDeviceList" :key="i">
            <el-row :gutter="20">
              <el-col :span="12" v-for="(inner, j) in item" :key="j">
                <div class="grid-content bg-purple">
                  <dl>
                    <dt :style="{height: dtHeight+'px'}"><img v-if="dtHeight" src=""></dt>
                    <dd>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p1")}}：</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p2")}}：</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p3")}}：</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p4")}}：</p>
                      <p><span>{{$t("message.CAMERA.result")}}：</span></p>
                      <!-- <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p1")}}：{{recData.deviceName}}</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p2")}}：{{recData.sn}}</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p3")}}：{{recData.recognitionAt}}</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p4")}}：{{formatKey(recData.recType, recType, 'name', 'val')}}</p> -->
                    </dd>
                  </dl>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="type3" v-show="showType == 3">
          <div class="item" v-for="(item, i) in copyDeviceList" :key="i">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(inner, j) in item" :key="j">
                <div class="grid-content bg-purple">
                  <dl>
                    <dt :style="{height: dtHeight+'px'}"><img v-if="dtHeight" src=""></dt>
                    <dd>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p1")}}：</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p2")}}：</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p3")}}：</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p4")}}：</p>
                      <p><span>{{$t("message.CAMERA.result")}}：</span></p>
                      <!-- <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p1")}}：{{recData.deviceName}}</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p2")}}：{{recData.sn}}</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p3")}}：{{recData.recognitionAt}}</p>
                      <p :style="{fontSize: fontSize+'px'}">{{$t("message.CAMERA.left.p4")}}：{{formatKey(recData.recType, recType, 'name', 'val')}}</p> -->
                    </dd>
                  </dl>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="img"></div>
          <div class="info">
            <p>{{$t("message.CAMERA.left.p1")}}：{{recData.deviceName}}</p>
            <p>{{$t("message.CAMERA.left.p2")}}：{{recData.sn}}</p>
            <p>{{$t("message.CAMERA.left.p3")}}：{{recData.recognitionAt}}</p>
            <p>{{$t("message.CAMERA.right.p1")}}：{{regData.name}}</p>
            <p>{{$t("message.CAMERA.right.p2")}}：{{regData.empno}}</p>
          </div>
          <div class="result">{{$t("message.CAMERA.result")}}</div>
        </div>
        <div class="bot">
          <div class="item" @click="changeShowType(1)">单设备监视</div>
          <div class="item" @click="changeShowType(2)">2*2监视</div>
          <div class="item" @click="changeShowType(3)">3*4监视</div>
        </div>
      </div>
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
      deviceIndex: 0,
      copyDeviceList: [],
      deviceList: [],
      deviceTranslate: {
        transform: 'translateX(0)'
      },
      wrapWidth: 0,
      showType: '1', // 1 单设备, 2, 2*2, 3 3*4
    }
  },
  created() {
    for(let i=0; i<10; i++) {
      this.deviceList.push(i)
    }
  },
  mounted() {
    const vm = this;
    this.fontSize = window.innerWidth/80;
    this.setWebSocket();
    this.setWidth()
    window.onresize = function() {
      // console.log(vm.$refs.dtimg.clientHeight)
      vm.dtHeight = vm.$refs.dtimg.clientHeight;
      vm.fontSize = window.innerWidth/80;
      vm.setWidth();
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeShowType(type) {
      this.showType = type;
      this.copyDeviceList = [];
      if(type == 2) {
        let len = Math.ceil(this.deviceList.length/2)
        for(let i=0; i<len; i++) {
          this.copyDeviceList.push(this.deviceList.slice(i*2, i*2+2))
        }
      }
      if(type == 3) {
        let len = Math.ceil(this.deviceList.length/3)
        for(let i=0; i<len; i++) {
          this.copyDeviceList.push(this.deviceList.slice(i*3, i*3+3))
        }
      }
    },
    changeDevice(type) {
      let liw = 200;
      if(type === 'prev') {
        this.deviceIndex = this.deviceIndex == 0 ? 0 : this.deviceIndex-1;
      }
      if(type === 'next') {
        let val = this.deviceList.length-Math.floor(this.wrapWidth/liw);
        this.deviceIndex = this.deviceIndex == val ? val : this.deviceIndex+1;
      }
      this.deviceTranslate = {
        transform: `translateX(-${this.deviceIndex*liw}px)`
      }
    },
    // 设置内容宽
    setWidth() {
      let wrap1 = this.$refs['inner-content'];
      let wrap2 = this.$refs['container'];
      let w = (wrap1.clientWidth - 60*2 - 310);
      wrap2.style.width = w+'px';
      this.wrapWidth = w;
      let cameraH = this.$refs['camera'].clientHeight;
      let bannerH = this.$refs['banner'].clientHeight;
      this.$refs['type23'].style.minHeight = (cameraH-bannerH) + 'px';
    },
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
  .single{
    height:150px;
    display:table;
    width:100%;
    margin-top:12px;
    position: relative;
    >div{
      height:100%;
    }
    .img-wrap{
      width:100%;
      padding-right:310px;
      .inner{
        background:#fff;
        height:100%;
        position: relative;
        width:100%;
        overflow: hidden;
      }
      .inner-content{
        height:100%;
        width:100%;
        padding:10px 60px;
        >div{
          width:100%;
          overflow-x:auto;
          margin-top:20px;
          &::-webkit-scrollbar{
            display:none;
          }
        }
        ul{
          white-space: nowrap;
          height:100%;
          transition: all .3s;
          li{
            display:inline-block;
            width:200px;
            padding:0 10px;
            .img{
              width:100%;
              height:80px;
              background:#ccc;
            }
            .text{
              font-size:14px;
              text-align:center;
              display:inline-block;
            }
          }
        }
      }
      .arrow-left, .arrow-right{
        position: absolute;
        top:0;
        font-size:60px;
        height:100%;
        line-height:150px;
        cursor: pointer;
      }
      .arrow-left{
        left:0;
      }
      .arrow-right{
        right:0;
      }
    }
    .model-wrap{
      width:300px;
      background:#fff;
      position: absolute;
      right:0;
      top:0;
      .item{
        display:inline-block;
        width:80px;
        height:50px;
        margin:50px 5px;
        background:#ccc;
        text-align:center;
        line-height:50px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
  .type23{
    position: relative;
    .left{
      padding-right:310px;
      .type2, .type3{
        width:100%;
        .item{
          margin-bottom:20px;
        }
      }
      .bg-purple{
        background:#fff;
        border:1px solid #ccc;
        dl{
          padding:10px 0;
        }
      }
    }
    .right{
      width:300px;
      position: absolute;
      right:0;
      top:0;
      >div{
        border:1px solid #ccc;
      }
      .top{
        padding:10px 0;
        background:#fff;
        .img{
          width:100%;
          height:80px;
          background:#ccc;
        }
        .info{
          margin-top:20px;
          text-align:left;
          p{
            text-indent: 20px;
            margin-bottom:10px;
            font-size:14px;
          }
        }
      }
      .bot{
        padding:10px 0;
        background:#fff;
        margin-top:20px;
        .item{
          width:80px;
          height:50px;
          margin:50px 5px;
          background:#ccc;
          text-align:center;
          line-height:50px;
          cursor: pointer;
          user-select: none;
          margin:20px auto;
        }
      }
    }
  }
}
</style>

