
<template>
  <div class="syncLog" v-loading.fullscreen="loading">
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
      </div>
    </div>
    <div class="data-content box-shadow">
      <div class="table-content">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="table-wrap">
              <p class="title">{{$t('message.SYNCLOG.name')}}</p>
              <el-table
                :data="tableData"
                header-row-class-name="header-row"
                max-height="516px"
                size="mini"
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="deviceType"
                  :label="$t('message.TABLE.deviceType')">
                  <template slot-scope="scope">
                    <span>{{ scope.row.deviceType | formatKey(deviceType, 'deviceName', 'deviceCode')}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="deviceName"
                  align="center"
                  :label="$t('message.TABLE.sites')">
                </el-table-column>
                <!-- <el-table-column
                  prop="sn"
                  align="center"
                  :label="$t('message.TABLE.sn')">
                </el-table-column>
                <el-table-column
                  prop="ip"
                  align="center"
                  :label="$t('message.TABLE.deviceIp')">
                </el-table-column> -->
                <el-table-column
                  prop="realname"
                  align="center"
                  :label="$t('message.TABLE.name')">
                </el-table-column>
                <el-table-column
                  prop="empno"
                  align="center"
                  :label="$t('message.TABLE.empno')">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="cmd"
                  :label="$t('message.TABLE.sendType')">
                  <template slot-scope="scope">
                    <span>{{formatKey(scope.row.cmd, cmdData, 'name', 'val')}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="createAt"
                  :label="$t('message.TABLE.time')">
                </el-table-column>
                <el-table-column
                  prop="status"
                  align="center"
                  :label="$t('message.TABLE.status')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{formatKey(scope.row.status, statusData, 'name', 'val')}}</span>
                    <span style="color:#67C23A;" v-if="scope.row.status == 2">{{formatKey(scope.row.status, statusData, 'name', 'val')}}</span>
                    <span style="color:#F56C6C;" v-if="scope.row.status == 3">{{formatKey(scope.row.status, statusData, 'name', 'val')}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
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
  name: 'syncLog',
  data() {
    return {
      defaultProps: {
        children: 'list',
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
      cmdData: [
        {name: 'add', val: 1},
        {name: 'delete', val: 2}
      ],
      statusData: [
        {name: 'noSame', val: 0},
        {name: 'sameSuccess', val: 2},
        {name: 'sameErr', val: 3}
      ],
      deviceType: [],
      tableData: [],
      ids: [],
      currPerImg: '',
    }
  },
  created() {
    this.getDeviceType();
    let time = new Date();
    let lastDay = time*1 - 24*60*60*1000;
    this.searchData.time = [new Date(lastDay), time];
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
        return this.$t('message.TABLE.'+text);
      }
    },
    // 获取设备类型
    getDeviceType() {
      const vm = this;
      if(vm.deviceType.length > 0){
        return
      }
      request({
        url: '/device/groupList',
        param: {},
        method: 'get',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        if(res.code === 200){
          vm.deviceType = res.data;
        }
      });
    },
    handleSearch() {
      this.getList();
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
        url: '/device/sync/recordList',
        // param: {},
        param: {
          pageNum: vm.pageNum,
          pageSize: vm.pageSize,
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
.syncLog{
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
.syncLog{
  .syncLog-item{
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

