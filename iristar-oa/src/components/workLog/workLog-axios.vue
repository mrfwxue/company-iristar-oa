<template>
  <div class="workLog" v-loading.fullscreen="loading">
    <div class="search-wrap box-shadow">
      <div class="item">
        <label>{{$t('message.TABLE.time')}}：</label>
        <el-date-picker
          v-model="searchData.time"
          size="mini"
          type="month"
          :placeholder="$t('message.INPUT.select')">
        </el-date-picker>
      </div>
      <div class="item">
        <el-button round size="mini" @click="handleSearch" type="primary">{{$t('message.BUTTON.search')}}</el-button>
        <el-button round size="mini" @click="toSetTime" type="primary">{{$t('message.BUTTON.workSet')}}</el-button>
        <el-button round size="mini" @click="exportFn" type="primary">{{$t('message.BUTTON.export')}}</el-button>
        <!-- <el-button round size="mini" @click="handleReset" type="primary">重置</el-button> -->
      </div>
    </div>
    <div class="data-content box-shadow">
      <div class="data-flex">
        <!-- <div class="tree-wrap">
          <TreeTitle></TreeTitle>
          <el-tree :data="treeData" show-checkbox :props="defaultProps" @check-change="handleCheckChange"></el-tree>
        </div> -->
        <div class="table-content">
          <div class="table-wrap">
            <p class="title">{{$t('message.TABLE.tableName.work')}}</p>
            <div class="container">
              <table>
                <thead>
                  <tr>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.name')}}</div></th>
                    <!-- <th><div class="cell t-t-k">部门</div></th> -->
                    <th><div class="cell t-t-k">{{$t('message.TABLE.empno')}}</div></th>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.period')}}</div></th>
                    <th v-for="(item, i) in titleData" :key="i">
                      <div class="cell">
                        <span><em>{{$t('message.TABLE.'+item.week)}}</em><br><em>{{item.day}}</em></span>
                      </div>
                    </th>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.absence')}}</div></th>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.lateCount')}}</div></th>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.earlyLeaveCount')}}</div></th>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.abnormal')}}</div></th>
                    <th><div class="cell t-t-k">{{$t('message.TABLE.normal')}}</div></th>
                  </tr>
                </thead>
                <p class="no-result" v-if="noresult">{{$t('message.TABLE.empty')}}</p>
                <tbody v-if="!noresult">
                  <tr v-for="(item, i) in contentData" :key="i">
                    <th><div class="cell t-t-k">{{item.name}}</div></th>
                    <!-- <th><div class="cell t-t-k">{{item.group}}</div></th> -->
                    <th><div class="cell t-t-k">{{item.empno}}</div></th>
                    <th class="col-8">
                      <div class="cell">
                        <span><em>{{$t('message.TABLE.startWork')}}</em><br><em>{{$t('message.TABLE.endWork')}}</em></span>
                      </div>
                    </th>
                    <th class="col-8" v-for="(time, t) in item.list" :key="t">
                      <div class="cell">
                        <!-- <span v-if="time">{{t}}</span> -->
                        <span v-if="time"><em>{{time.start}}</em><br><em>{{time.end}}</em></span>
                      </div>
                    </th>
                    <th><div class="cell">{{item.absence}}</div></th>
                    <th><div class="cell">{{item.lateCount}}</div></th>
                    <th><div class="cell">{{item.earlyLeaveCount}}</div></th>
                    <th><div class="cell">{{item.abnormal}}</div></th>
                    <th><div class="cell">{{item.normal}}</div></th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      <el-dialog :title="$t('message.BUTTON.workSet')" width="379px" @close="resetForm('workTime')" :visible.sync="setWorkTimeDialog">
        <el-form :model="workTime" status-icon :rules="rules" ref="workTime" label-width="100px" class="demo-workTime" size="mini">
          <el-form-item :label="$t('message.TABLE.startWorkTime')" prop="startWorkTime">
            <el-time-select
              v-model="workTime.startWorkTime"
              :picker-options="timeArea">
            </el-time-select>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.endWorkTime')" prop="endWorkTime">
            <el-time-select
              v-model="workTime.endWorkTime"
              :picker-options="timeArea">
            </el-time-select>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.FriWork')" prop="isSaturday.bln">
            <div class="peopleManager-item">
              <div class="select-wrap">
                <el-checkbox v-model="workTime.isSaturday.bln">{{$t('message.INPUT.yes')}}</el-checkbox>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.SatWork')" prop="isSunday.bln">
            <div class="peopleManager-item">
              <div class="select-wrap">
                <el-checkbox v-model="workTime.isSunday.bln">{{$t('message.INPUT.yes')}}</el-checkbox>
              </div>
            </div>
          </el-form-item>
          <div class="peopleManager-item" style="color:#F56C6C;line-height:28px;">
            {{$t('message.TABLE.setWorkTime')}}
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('workTime')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('workTime')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from "@/axios/axios";
import moment from 'moment';
export default {
  name: 'workLog',
  data() {
    var checkTime1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.startWorkTime')));
      } else {
        callback();
      }
    };
    var checkTime2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.endWorkTime')));
      } else {
        callback();
      }
    };
    return {
      scrollNum: 0,
      maxScrollNum: 0,
      leftScroll: null,
      rightScroll: null,
      noresult: true,
      defaultProps: {
        children: 'last',
        label: 'name'
      },
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
        time: '', // 时间
        tableType: { // 报表类型
          val: '',
          data: []
        }
      },
      ids: [],
      titleData: [],
      contentData: [],
      timeArea: {
        start: '06:00',
        step: '00:15',
        end: '21:00'
      },
      setWorkTimeDialog: false,
      workTime: {
        startWorkTime: '',
        endWorkTime: '',
        isSaturday: { // 周六上班
          bln: false, // true 是 false 否
          str: '0', // 0 是 1 否
        },
        isSunday: { // 周六上班
          bln: false, // true 是 false 否
          str: '0', // 0 是 1 否
        },
      },
      rules: {
        startWorkTime: [
          { required: true, validator: checkTime1, trigger: 'change' },
        ],
        endWorkTime: [
          { required: true, validator: checkTime2, trigger: 'change' },
        ]
      }
    }
  },
  created() {
    this.searchData.time = moment(new Date()).format("YYYY-MM");
  },
  mounted() {
    this.getList();
  },
  computed: {
    treeData() {
      return this.$store.state.treeData;
    }
  },
  watch: {},
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      let {level, id, list, $treeNodeId} = data;
      const vm = this;
      vm.ids[$treeNodeId] = [];
      if(Number(level) === 1){
        if(checked){
          if(list.length > 0){
            list.map(item => {
              vm.ids[$treeNodeId].push(item.id);
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
    },
    handleSearch() {
      this.getList();
    },
    toSetTime() {
      this.getWorkTime();
      this.setWorkTimeDialog = true;
    },
    getWorkTime(data) {
      const vm = this;
       request({
        url: '/attendance/config/list',
        param: {},
        method: 'get',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        if(code === 200){
          for(let i in res.data){
            if(i === 'isSaturday' || i === 'isSunday') {
              vm.workTime[i].bln = Number(res.data[i]) === 1 ? false : true;
            }else{
              vm.workTime[i] = res.data[i];
            }
          }
          // console.log(vm.workTime)
        }
      });
    },
    setWorkTimeFn(data) {
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
       request({
        url: '/attendance/config/update',
        param: data,
        method: 'post',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        vm.loading = false;
        vm.isClick = false;
        if(code === 200){
          vm.setWorkTimeDialog = false;
          vm.$message({
            message: vm.$t('message.MESSAGE.setSuccess'),
            type: 'success',
            duration: 1500,
          });
        }
      });
    },
    exportFn() {
      const vm = this;
      let ROOT_URL = '';
      let {time} = this.searchData;
      if(!time) {
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
      window.open(ROOT_URL+'/attendance/exportStatisticsList?&month='+(time ? moment(time).format('YYYY-MM') : ''));
    },
    handleReset() {},
    // 确认创建
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {};
          for(let i in this.workTime) {
            data[i] = this.workTime[i] || '';
            if(i === 'isSaturday' || i === 'isSunday') {
              data[i] = this.workTime[i].bln ? '0' : '1';
            }
            if(this.workTime[i].val !== undefined) {
              data[i] = this.workTime[i].val || ''
            }
          }
          this.setWorkTimeFn(data);
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.setWorkTimeDialog = false;
    },
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    getList() {
      const vm = this;
      vm.loading = true;
      let {time} = this.searchData;
      let arr = [];
      let ids = [];
      this.ids.filter(item => {
        arr.push(...item)
      })
      for(let i=0; i<arr.length; i++){
        if(ids.indexOf(arr[i]) < 0){
          ids.push(arr[i])
        }
      }
      request({
        url: '/attendance/statistics',
        param: {
          pageNum: vm.pageNum,
          pageSize: vm.pageSize,
          // ids,
          month: time ? moment(time).format('YYYY-MM') : '',
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
        // console.log(res)
        if(code === 200){
          let data = res.data;
          // vm.pageNum = data.pageNum;
          // vm.pageSize = data.pageSize;
          vm.total = data ? data.total : 0;
          // vm.titleData = data.titleList;
          let arr1 = data ? data.query.data : [];
          let arr2 = data ? data.query.titleList : [];
          vm.formatData(arr1, arr2)
        }else{
          vm.formatData([])
        }
      });
    },
    formatData(data, titleList) {
      this.contentData = [];
      this.titleData = titleList;
      if(data.length === 0){
        this.noresult = true;
      }else{
        this.noresult = false;
        let len = this.titleData.length;
        for(let i in data){
          let item = data[i];
          let arr = [];
          for(let i=0; i<len; i++) {
            arr.push('');
          }
          for(let i in item.list) {
            arr[item.list[i].day-1] = item.list[i];
          }
          this.contentData.push({
            name: item.name,
            // group: item.group,
            empno: item.empno,
            list: arr,
            absence: item.absence, // 缺勤
            lateCount: item.lateCount, // 迟到
            earlyLeaveCount: item.earlyLeaveCount, // 早退
            abnormal: item.abnormal, // 异常
            normal: item.normal, // 出勤
          })
        }
      }
      // console.log(this.contentData)
    },
  },
}
</script>
<style lang="scss">
.workLog{
  .el-form-item{
    // margin-bottom:10px;
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
.workLog{
  .peopleManager-item{
    // display:flex;
    height:28px;
    >div{
      text-align:left;
      // width:auto;
      // flex:1;
    }
    .text{
      margin:0 10px;
    }
  }
  .workLog-item{
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
.container{
  width:100%;
  -webkit-box-flex:1;
  overflow:scroll;
  .no-result{
    height: 50px;
    line-height: 50px;
    position: absolute;
    left:55%;
    margin-top:30px;
  }
  table{
    width:100%;
    font-size:12px;
    border-collapse: collapse;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    em{
      font-style: normal;
      white-space: nowrap;
    }
    th, td{
      padding:5px 10px;
      position: relative;
    }
    .cell{
      // padding:0 10px;
    }
    .t-t-k{
      min-width:50px;
    }
    tr{
      width:100%;
    }
    // th.col-1{
    //   width:10%;
    // }
    // th.col-8{
    //   width:80%;
    // }
    thead{
      th, td{
        background:#5B90F0;
        color:#fff;
        &:first-child{
          border-radius:30px 0 0 30px;
        }
        &:last-child{
          border-radius:0 30px 30px 0;
        }
      }
    }
  }
}
</style>

