<template>
  <div class="deviceStatus" v-loading.fullscreen="loading">
    <!-- <div class="search-wrap box-shadow">
      <div class="item">
        <el-input size="mini" clearable v-model="searchData.value1" placeholder="查询条件"></el-input>
      </div>
      <div class="item">
        <el-button round size="mini" type="primary">Search</el-button>
      </div>
    </div> -->
    <div class="data-content box-shadow">
      <div class="title-operate-btn">
        <el-button round size="mini" @click="showCreate" type="primary">{{$t("message.BUTTON.add")}}</el-button>
      </div>
      <div class="echart-table-wrap">
        <div class="table-content">
          <p class="title">{{$t("message.DEVICESTATUS.name")}}</p>
          <el-table
            :data="tableData"
            size="mini"
            header-row-class-name="header-row"
            style="width: 100%">
            <el-table-column
              prop="deviceType"
              align="center"
              :label="$t('message.TABLE.type')">
              <template slot-scope="scope">
                <span>{{ scope.row.deviceType | formatKey(createForm.deviceType.data, 'deviceName', 'deviceCode')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="deviceName"
              align="center"
              :label="$t('message.TABLE.sites')">
            </el-table-column>
            <el-table-column
              prop="ip"
              align="center"
              :label="$t('message.TABLE.ipAddr')">
            </el-table-column>
            <el-table-column
              prop="sn"
              align="center"
              :label="$t('message.TABLE.sn')">
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('message.TABLE.operate')">
              <template slot-scope="scope">
                <div class="reperate-wrap">
                  <div><el-button round @click="showEdit(scope.row)" type="text" size="mini">{{$t("message.BUTTON.edit")}}</el-button></div>
                  <div><el-button round @click="handleDelete(scope.row)" type="text" size="mini">{{$t("message.BUTTON.del")}}</el-button></div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog :title="$t('message.BUTTON.add')" width="379px" @close="resetForm('createForm')" :visible.sync="createFormVisible">
        <el-form :model="createForm" status-icon :rules="rules" ref="createForm" label-width="100px" class="demo-createForm" size="mini">
          <el-form-item :label="$t('message.TABLE.sn')" prop="sn">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="createForm.sn" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.type')" prop="deviceType.val">
            <el-select v-model="createForm.deviceType.val" size="mini" clearable :placeholder="$t('message.INPUT.select')" @focus="getDeviceType">
              <el-option
                v-for="item in createForm.deviceType.data"
                :key="item.deviceCode"
                :label="item.deviceName"
                :value="item.deviceCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.ipAddr')" prop="ip">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="createForm.ip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.sites')" prop="deviceName">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="createForm.deviceName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('createForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('createForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.BUTTON.edit')" width="379px" @close="resetForm('updateForm')" :visible.sync="updateFormVisible">
        <el-form :model="updateForm" status-icon :rules="rules" ref="updateForm" label-width="100px" class="demo-updateForm" size="mini">
          <el-form-item :label="$t('message.TABLE.sn')" prop="sn">
            <el-input type="text" size="mini" disabled clearable v-model="updateForm.sn" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.type')" prop="deviceType.val">
            <el-select v-model="updateForm.deviceType.val" size="mini" clearable :placeholder="$t('message.INPUT.select')" @focus="getDeviceType">
              <el-option
                v-for="item in createForm.deviceType.data"
                :key="item.deviceCode"
                :label="item.deviceName"
                :value="item.deviceCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.ipAddr')" prop="ip">
            <el-input type="text" size="mini" clearable v-model="updateForm.ip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.sites')" prop="deviceName">
            <el-input type="text" size="mini" clearable v-model="updateForm.deviceName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('updateForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('updateForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import request from "@/axios/axios";
export default {
  name: 'deviceStatus',
  data() {
    var checkSn = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.inputSN')));
      }else{
        callback()
      }
    };
    var checkIp = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.inputIp')));
      }else{
        if(!(/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(value))){
          callback(new Error(this.$t('message.MESSAGE.inputIpErr')));    
        }else{
          callback() 
        }
      }
    };
    var checkDeviceType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.selectDeviceType')));
      }else{
        callback()
      }
    };
    var checkDeviceName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.inputSites')));
      }else{
        callback()
      }
    };
    return {
      isClick: false,
      loading: false,
      moment: moment,
      searchData: {
        value1: '',
      },
      tableData: [],
      createFormVisible: false,
      updateFormVisible: false,
      createForm: {
        sn: '',
        ip: '',
        deviceType: {
          val: '',
          data: [],
        },
        deviceName: '',
      },
      updateForm: {
        id: '',
        sn: '',
        ip: '',
        deviceType: {
          val: '',
          data: [],
        },
        deviceName: '',
      },
      rules: {
        sn: [
          { required: true, validator: checkSn, trigger: 'blur' },
        ],
        ip: [
          { required: true, validator: checkIp, trigger: ['blur', 'change'] },
        ],
        "deviceType.val": [
          { required: true, validator: checkDeviceType, trigger: 'change' },
        ],
        deviceName: [
          { required: true, validator: checkDeviceName, trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this.dataForm = this.createForm;
  },
  mounted() {
    this.getDeviceType();
    this.getDataList();
    // this.formatData();
  },
  computed: {},
  watch: {},
  methods: {
    formatType(row, column, cellValue, index) {
      let data = this.updateForm.access.data;
      if(cellValue.toString()){
        return data.filter(item => item.val == cellValue)[0].label;
      }
      return '--'
    },
    showCreate() {
      this.createFormVisible = true
    },
    showEdit(row) {
      for(let i in this.updateForm){
        if(this.updateForm[i].val !== undefined){
          // console.log(this.dataForm[i])
          this.updateForm[i].val = row[i];
        }else{
          this.updateForm[i] = row[i];
        }
      }
      this.updateFormVisible = true
    },
    // 确认创建
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '';
          let data = {};
          for(let i in vm[formName]){
            data[i] = vm[formName][i];
            if(vm[formName][i].val !== undefined){
              data[i] = vm[formName][i].val;
            }
          }
          if(formName === 'createForm'){
            url = '/device/create';
            data.deviceAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          }else{
            url = '/device/update';
          }
          vm.deviceReg(url, data, formName);
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.createFormVisible = false;
      this.updateFormVisible = false
    },
    handleDelete(row) {
      const vm = this;
      let resetPwd = () => {
        vm.loading = true;
        request({
          url: '/device/delete',
          param: {
            sn: row.sn
          },
          method: 'get',
          onError: err => {
            vm.loading = false;
          },
          vm,
        }).then(res => {
          let code = res.code;
          vm.loading = false;
          if(code === 200){
            vm.$message({
              message: this.$t('message.MESSAGE.deleteSuccess'),
              type: 'success',
              duration: 1500,
            });
            vm.getDataList();
          }
        });
      }
      this.$alert(this.$t('message.MESSAGE.confirmDeleteDevice'), this.$t('message.MESSAGE.title'), {
        confirmButtonText: this.$t('message.BUTTON.ok'),
        callback: action => {
          if(action === 'confirm'){
            // alert('已删除')
            resetPwd();
          }
        }
      });
    },
    // 获取设备类型
    getDeviceType() {
      const vm = this;
      // vm.loading = true;
      if(vm.createForm.deviceType.data.length > 0){
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
        // console.log(res)
        // vm.loading = false;
        if(res.code === 200){
          // let data = res.data;
          // // vm.pageNum = data.pageNum;
          // vm.total = data.total;
          // vm.tableData = data.query;
          vm.createForm.deviceType.data = res.data;
        }
      });
    },
    // 获取数据列表
    getDataList() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/device/list',
        param: {
          pageSize: 10,
          pageNum: 1
        },
        method: 'get',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        vm.loading = false;
        if(res.code === 200){
          let data = res.data;
          // vm.pageNum = data.pageNum;
          vm.total = data.total;
          vm.tableData = data.query;
        }
      });
    },
    deviceReg(url, data, formName) {
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url,
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
          vm.resetForm(formName);
          vm.$message({
            message: vm.$t('message.MESSAGE.submitSuccess'),
            type: 'success',
            duration: 1500,
          });
          vm.getDataList();
        }
      });
    }
  },
}
</script>
<style lang="scss" scoped>
.echart-table-wrap{
  width:100%;
  overflow: hidden;
  .echart-wrap{
    width:100%;
    height:500px;
    // float: left;
    >div{
      width:100%;
      height:100%;
    }
  }
}
</style>

