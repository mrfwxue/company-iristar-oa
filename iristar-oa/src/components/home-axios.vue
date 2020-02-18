<template>
  <div class="home">
    <div class="top">
      <div class="left">
        <!-- <img src="@/assets/img/banner/banner2.png" alt=""> -->
      </div>
      <div class="right">
        <p class="title">{{$t("message.THROUGHLOG.name")}}</p>
        <ul v-if="recList.length > 0">
          <li v-for="(item, i) in recList" :key="i">
            <span class="name">{{item.username}}</span>
            <span class="time">{{moment(item.passTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </li>
        </ul>
        <p v-else class="no-result">{{$t('message.TABLE.empty')}}</p>
      </div>
    </div>
    
    <div class="data-content box-shadow">
      <div class="table-content">
        <p class="title">{{$t("message.HOME.deviceStatus")}}</p>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="tree-wrap">
              <div class="list">
                <div id="echart-wrap"></div>
                <div class="device-info">
                  <div class="all">
                    <span class="num">{{totalDevice}}</span>
                    <span class="text">{{$t('message.HOME.deviceAllNumber')}}</span>
                  </div>
                  <div class="online">
                    <span class="num">{{onlineDevice}}</span>
                    <span class="text">{{$t('message.HOME.deviceOnlineNumber')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="table-wrap">
              <el-table
                :data="tableData"
                size="mini"
                max-height="400"
                header-row-class-name="header-row"
                style="width: 100%">
                <el-table-column
                  prop="deviceName"
                  align="center"
                  :label="$t('message.TABLE.sites')">
                </el-table-column>
                <el-table-column
                  prop="sn"
                  align="center"
                  :label="$t('message.TABLE.sn')">
                </el-table-column>
                <el-table-column
                  prop="ip"
                  align="center"
                  :label="$t('message.TABLE.deviceIp')">
                </el-table-column>
                <el-table-column
                  align="center"
                  :label="$t('message.TABLE.newworkStatus')">
                  <template slot-scope="scope">
                    <span style="color:#67C23A;" v-if="scope.row.online == 0">{{$t("message.TABLE.connect")}}</span>
                    <span style="color:#F56C6C;" v-if="scope.row.online == 1">{{$t("message.TABLE.disconnect")}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="table-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          size="mini"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
import request from "@/axios/axios";
import moment from 'moment';
export default {
  name: 'home',
  data() {
    return {
      defaultMenus: [
        {
          name: '设备管理',
          val: '11',
          url: 'deviceStatus'
        },
        {
          name: '班组管理',
          val: '10',
          url: 'groupManager'
        },
        {
          name: '人员管理',
          val: '3',
          url: 'peopleManager'
        },
        {
          name: '通行记录',
          val: '1',
          url: 'throughLog',
        },
        {
          name: '考勤统计',
          val: '2',
          url: 'workLog'
        },
        // {
        //   name: 'LED公告',
        //   val: '4',
        //   url: 'led'
        // },
        {
          name: '系统设置',
          val: '5',
          url: 'setting'
        },
        {
          name: '用户管理',
          val: '6',
          url: 'userManager',
        },
        {
          name: '修改密码',
          val: '7',
          url: 'editPwd',
        },
      ],
      moment: moment,
      recList: [],
      tableData: [],
      totalDevice: 0,
      onlineDevice: 0,
      interval: null
    }
  },
  created() {
    const vm = this;
    this.getDeviceInfo();
    this.getList();
    this.interval = setInterval(function() {
      vm.getDeviceInfo()
    }, 15*60*1000)
  },
  destroyed() {
    const vm = this;
    clearInterval(vm.interval);
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getList() {
      const vm = this;
      request({
        url: '/recognition/accessList',
        // param: {},
        param: {
          pageNum: 1,
        },
        method: 'post',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        // console.log(res)
        // vm.loading = false;
        if(code === 200){
          let data = res.data;
          vm.recList = data ? data.query : [];
        }
      });
    },
    changeMenu(item) {
      this.$router.push({
        name: item.url
      })
    },
    // 获取设备信息
    getDeviceInfo() {
      const vm = this;
      // vm.loading = true;
      request({
        url: '/home/overview',
        param: {},
        method: 'get',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
          vm.setEchart(0, 0)
        },
        vm,
      }).then(res => {
        // console.log(res)
        // vm.loading = false;
        let code = res.code;
        if(code === 200) {
          let data = res.data;
          vm.tableData = data.deviceDetails;
          vm.totalDevice = data.totalDevice;
          vm.onlineDevice = data.onlineDevice;
          vm.setEchart(data.totalDevice, data.onlineDevice)
        }else{
          vm.setEchart(0, 0)
        }
      });
    },
    //
    formatStatus(row) {
      let connect; // 0 默认 无值, 1 连接, 2, 断开
      if(!row.updateAt){
        connect = 0;
      }else{
        let now = new Date()*1;
        let time = new Date(moment(row.updateAt).format('YYYY/MM/DD HH:mm:ss'))*1;
        let diff = Math.abs(now - time);
        if(diff < 5*60*1000) {
          connect = 1;
        }else{
          connect = 2;
        }
      }
      return connect;
    },
    // 图表
    setEchart(totalDevice, onlineDevice) {
      let echart = echarts.init(document.getElementById('echart-wrap'));
      let option = {
        title: {
          left: 'center'
        },
        tooltip : {
          trigger: 'item',
        },
        legend: {
          data: []
        },
        series : [
          {
            type: 'pie',
            radius : '80%',
            label: {
              normal: {
                show: false,
              },
            },
            center: ['50%', '50%'],
            data:[
              {value: (totalDevice - onlineDevice), name: '断开', itemStyle: { color: '#a8c7ff'}},
              {value: onlineDevice, name: '在线', itemStyle: { color: '#5b90f0'}},
            ],
          }
        ]
      };
      echart.setOption(option)
      window.onresize = function () {
        echart.resize();
      }
    }
  },
}
</script>
<style lang="scss">
.device-header-row{
  tr, th{
    background: #f2f2f2;
  }
}
</style>
<style lang="scss" scoped>
.top{
  // background:#fff;
  height:353px;
  display:-webkit-box;
  margin-bottom:10px;
  overflow: hidden;
  .left{
    height:100%;
    // max-width:914px;
    margin-right:10px;
    background:#fff;
    -webkit-box-flex:1;
    // float: left;
    background:url(../assets/img/banner/banner2.png) no-repeat;
    background-position: center;
    img{
      // width:100%;
      height:100%;
    }
  }
  .right{
    width:353px;
    height:100%;
    background:#fff;
    padding:0 7px;
    // float: right;
    p.title{
      line-height:57px;
      border-bottom:1px solid #e6e6e6;
      padding-left:7px;
      font-size:18px;
      color:#666;
      text-align:left;
    }
    ul{
      overflow-y:auto;
      height:296px;
      padding-bottom:20px;
      &::-webkit-scrollbar{
        display:none;
      }
      li{
        display:-webkit-box;
        padding:0 10px;
        -webkit-box-pack:justify;
        -webkit-box-align:center;
        margin-top:20px;
        span{
          display:block;
        }
        .name{
          color:#9a9a9a;
          font-size:14px;
        }
        .time{
          color:#999;
          font-size:12px;
          vertical-align: middle;
        }
      }
    }
  }
}
.home{
  .data-content{
    .table-content{
      background:#fff;
      height:500px;
    }
    .list{
      // padding-top:60px;
      #echart-wrap{
        width:100%;
        height:300px;
      }
      p{
        text-align:left;
        line-height: 30px;
        letter-spacing: 2px;
      }
      .device-info{
        text-align: center;
        >div{
          display:inline-block;
          color:#666;
          margin:0 20px;
          span{
            display:block;
          }
        }
        .num{
          font-size:46px;
        }
        .text{
          font-size:12px;
          letter-spacing: 2px;
        }
        .online .num{
          color:#5b90f0;
        }
      }
    }
  }
}
</style>

