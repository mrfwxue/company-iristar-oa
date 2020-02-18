<template>
  <div class="throughLog" v-loading.fullscreen="loading">
    <div class="search-wrap box-shadow">
      <div class="item">
        <label>{{$t('message.TABLE.time')}}：</label>
        <el-date-picker
          v-model="searchData.time"
          size="mini"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          :start-placeholder="$t('message.INPUT.startTime')"
          :end-placeholder="$t('message.INPUT.endTime')"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="item">
        <el-button round size="mini" @click="handleSearch" type="primary">{{$t('message.BUTTON.search')}}</el-button>
        <el-button round size="mini" @click="exportFn" type="primary">{{$t('message.BUTTON.export')}}</el-button>
      </div>
    </div>
    <div class="data-content box-shadow">
      <div class="data-flex">
        <div class="tree-wrap">
          <TreeTitle></TreeTitle>
          <el-tree :data="treeData" check-on-click-node :highlight-current="showLight" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          <!-- <el-tree :data="treeData" show-checkbox :props="defaultProps" @check-change="handleCheckChange"></el-tree> -->
        </div>
        <div class="table-content">
          <div class="operate">
            <el-radio-group v-model="tableType" size="mini">
              <el-radio-button label="识别记录"></el-radio-button>
              <el-radio-button label="体温统计"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="table-wrap" v-show="tableType === '识别记录'" style="height:562px;">
            <p class="title">{{$t('message.THROUGHLOG.name')}}</p>
            <el-table
              :data="tableData"
              header-row-class-name="header-row"
              max-height="478px"
              size="mini"
              @row-click="handleClickRow"
              style="width: 100%">
              <el-table-column
                prop="username"
                align="center"
                :label="$t('message.TABLE.name')">
              </el-table-column>
              <el-table-column
                prop="department"
                align="center"
                :label="$t('message.TABLE.department')">
              </el-table-column>
              <el-table-column
                prop="empno"
                align="center"
                :label="$t('message.TABLE.empno')">
              </el-table-column>
              <el-table-column
                prop="passTime"
                align="center"
                :label="$t('message.TABLE.recTime')">
              </el-table-column>
              <el-table-column
                prop="deviceName"
                align="center"
                :label="$t('message.TABLE.sites')">
              </el-table-column>
              <el-table-column
                prop="deviceName"
                align="center"
                :label="$t('message.CAMERA.left.p4')">
                <template slot-scope="scope">
                  <span>{{formatKey(scope.row.recType, recType, 'name', 'val')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="detail"
                align="center"
                :label="$t('message.TABLE.operate')">
              </el-table-column>
            </el-table>
          </div>
          <div class="table-wrap" v-show="tableType === '体温统计'" style="height:562px;">
            <p class="title">{{$t('message.THROUGHLOG.temperature')}}</p>
            <div id="echart-wrap"></div>
          </div>
        </div>
        <!-- <div class="photo-wrap">
          <div class="avatar">
            <el-image
              v-if="currPerImg"
              style="width: auto; height: 100%"
              :preview-src-list="[currPerImg]"
              :src="currPerImg" >
            </el-image>
          </div>
        </div> -->
      </div>
      <div class="table-pagination">
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
      </div>
    </div>
  </div>
</template>
<script>
const imgBase64 = 'data:image/jpg;base64,';
import request from "@/axios/axios";
import moment from 'moment';
export default {
  name: 'throughLog',
  data() {
    return {
      defaultProps: {
        children: 'last',
        label: 'name'
      },
      selectChildId: '',
      showLight: true,
      isClick: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchData: {
        people: { // 工人
          val: '',
          data: []
        },
        time: [], // 时间
        tableType: { // 报表类型
          val: '',
          data: []
        }
      },
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      recType: [
        {name: 'face', val: '1'},
        {name: 'eye', val: '2'},
        {name: 'eyeAndFace', val: '3'},
        {name: 'pwd', val: '4'},
      ],
      tableType: '识别记录',
      tableData: [],
      ids: [],
      currPerImg: '',
    }
  },
  created() {
    let time = new Date();
    let lastDay = time*1 - 24*60*60*1000;
    this.searchData.time = [new Date(lastDay), time];
  },
  mounted() {
    this.getList();
    this.treeBlur();
    // this.handleClickRow()
    // console.log(this.treeData)
  },
  computed: {
    treeData() {
      return this.$store.state.treeData;
    }
  },
  watch: {
    'selectChildId': function(n, o) {
      if(this.tableType === '识别记录') {
        this.handleSearch();
      }else{
        this.getEchartData();
      }
    },
    'tableType': function(n, o) {
      if(n === '体温统计') {
        this.$nextTick(() => {
          // this.setEchart(6,2)
          this.getEchartData()
        })
      }
    }
  },
  methods: {
    // 获取体温数据
    getEchartData() {
      const vm = this;
      vm.loading = true;
      let {time} = this.searchData;
      let startAt = '',
        endAt = '';
      if(time) {
        if (time.toString() !== '') {
          startAt = new Date(time[0])*1;
          endAt = new Date(time[1])*1;
        }
      }
      request({
        url: '/recognition/countTemperature',
        // param: {},
        param: {
          organization: vm.selectChildId || 0,
          // name,
          startAt: startAt ? moment(startAt).format('YYYY-MM-DD') : '',
          endAt: endAt ? moment(endAt).format('YYYY-MM-DD') : '',
        },
        method: 'post',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        vm.loading = false;
        if(code === 200){
          let data = res.data;
          let arr = data.info ? data.info : [];
          vm.formatData(arr)
        }
      });
    },
    formatData(data) {
      if(data.length === 0) return
      let min = 36.5;
      let arr1 = [], arr2 = [];
      for(let i in data) {
        if(data[i].temperature > min) {
          arr2.push(data[i])
        }else{
          arr1.push(data[i])
        }
      }
      this.setEchart(arr1, arr2)
    },
    // 图表
    setEchart(normal, wraning) {
      let echart = echarts.init(document.getElementById('echart-wrap'));
      let text1 = '36.5以下';
      let text2 = '36.5以上';
      let format = function(obj) {
        let str = '';
        for(let i in obj.data.list) {
          let item = obj.data.list[i];
          str += `${item.realname}: ${item.temperature}</br>`
        }
        return str;
      }
      let option = {
        title: {
          left: 'center'
        },
        tooltip : {
          trigger: 'item',
        },
        tooltip: {
          trigger: 'item',
          formatter: format
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: [text1, text2]
        },
        series : [
          {
            type: 'pie',
            radius : '80%',
            center: ['50%', '50%'],
            data:[
              {
                value: normal.length,
                name: text1,
                itemStyle: { color: '#5b9bd5'},
                list: normal
              },
              {
                value: wraning.length,
                name: text2,
                itemStyle: { color: '#ed7d31'},
                list: wraning
              },
            ],
          }
        ]
      };
      echart.setOption(option)
      window.onresize = function () {
        echart.resize();
      }
    },
    // 部门失焦
    treeBlur() {
      const vm = this;
      document.onclick = function(e) {
        vm.selectChildId = '';
        vm.showLight = false;
      }
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
    handleNodeClick(data) {
      this.selectChildId = data.id;
      this.showLight = true;
    },
    handleCheckChange(data, checked, indeterminate) {
      let {level, id, list, $treeNodeId} = data;
      const vm = this;
      vm.ids[$treeNodeId] = [];
      if(Number(level) === 1){
        if(checked){
          if(list.length > 0){
            list.map(item => {
              vm.ids[$treeNodeId].push(item.id);
              // if(item.list.length > 0){
              //   item.list.map(l => {
              //     vm.ids[$treeNodeId].push(l.id);
              //   })
              // }else{
              //   vm.ids[$treeNodeId].push(item.id);
              // }
            })
          }else{
            vm.ids[$treeNodeId].push(id);
          }
        }else{
          vm.ids[$treeNodeId] = [];
        }
      }
      if(Number(level) === 2) {
        // if(list.length === 0){
          let index = vm.ids[$treeNodeId].indexOf(id);
          if(checked){
            if(index < 0){
              vm.ids[$treeNodeId].push(id);
            }
          }else{
            vm.ids[$treeNodeId].splice(index, 1)
          }
        // }
      }
      // if(Number(level) === 3){
      //   let index = vm.ids[$treeNodeId].indexOf(id);
      //   if(checked){
      //     if(index < 0){
      //       vm.ids[$treeNodeId].push(id);
      //     }
      //   }else{
      //     vm.ids[$treeNodeId].splice(index, 1)
      //   }
      // }
      // console.log(vm.ids[$treeNodeId])
      // console.log(vm.ids)
      // console.log($treeNodeId);
      // console.log(data, checked, indeterminate);
    },
    handleSearch() {
      this.getList();
    },
    exportFn() {
      const vm = this;
      let ROOT_URL = '';
      let {time} = this.searchData;
      let startAt = '',
        endAt = '';
      if(time) {
        if (time.toString() !== '') {
          startAt = new Date(time[0])*1;
          endAt = new Date(time[1])*1;
        }
      }
      if(!startAt || !endAt) {
        this.$message({
          message: this.$t('message.MESSAGE.selectTime'),
          type: 'error',
          duration: 1500,
        })
        return
      }
      if(process.env.NODE_ENV === 'development'){
        ROOT_URL = root_config.development; // 开发环境
      }else{
        ROOT_URL = root_config.product; // 服务器环境
      }
      window.open(
        ROOT_URL+'/recognition/exportAccessList?departmentId='+vm.selectChildId
        +'&sysStartAt='+(startAt ? moment(startAt).format('YYYY-MM-DD') : '')
        +'&sysEndAt='+(endAt ? moment(endAt).format('YYYY-MM-DD') : '')
      );
    },
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getList();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
      // console.log(`当前页: ${val}`);
    },
    // 获取图片
    handleClickRow(row, column, event) {
      return;
      const vm = this;
      request({
        url: '/gwuser/picture',
        param: {
          id: row.id ? row.id : 1
        },
        method: 'get',
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
          vm.currPerImg = res.data ? imgBase64 + res.data : '';
        }
      });
      // console.log(row, column, event);
    },
    getList() {
      const vm = this;
      vm.loading = true;
      let {time} = this.searchData;
      let startAt = '',
        endAt = '';
      if(time) {
        if (time.toString() !== '') {
          startAt = new Date(time[0])*1;
          endAt = new Date(time[1])*1;
        }
      }
      request({
        url: '/recognition/accessList',
        // param: {},
        param: {
          pageNum: vm.pageNum,
          pageSize: vm.pageSize,
          departmentId: vm.selectChildId || '',
          // name,
          sysStartAt: startAt ? moment(startAt).format('YYYY-MM-DD') : '',
          sysEndAt: endAt ? moment(endAt).format('YYYY-MM-DD') : '',
        },
        method: 'post',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        // console.log(res)
        vm.loading = false;
        if(code === 200){
          let data = res.data;
          // vm.pageNum = data.pageNum;
          // vm.pageSize = data.pageSize;
          vm.total = data ? data.total : 0;
          vm.tableData = data ? data.query : [];
        }
      });
    },
  },
}
</script>
<style lang="scss">
.throughLog{
  .el-form-item{
    margin-bottom:10px;
  }
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-select{
    width:100%;
  }
  .el-form-item__error{
    padding-top:0;
  }
}
</style>
<style lang="scss" scoped>
.throughLog{
  .operate{
    text-align:left;
    margin-top:10px;
  }
  #echart-wrap{
    height:478px;
  }
  .throughLog-item{
    display:flex;
    .upload-close-file{
      position: absolute;
      right: 10px;
      z-index: 10;
      top: 14px;
      color: #fff;
      cursor: pointer;
    }
    >div{
      flex:1;
    }
    .text{
      margin:0 10px;
    }
  }
}
</style>

