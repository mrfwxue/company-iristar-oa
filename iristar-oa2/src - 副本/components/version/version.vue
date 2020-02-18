<template>
  <div class="version" v-loading.fullscreen="loading">
    <div class="data-content box-shadow">
      <div class="title-operate-btn">
        <el-button round size="mini" @click="showCreate" type="primary">{{$t('message.BUTTON.add')}}</el-button>
      </div>
      <div class="data-flex">
        <div class="table-content">
          <div class="table-wrap">
            <p class="title">{{$t('message.VERSION.name')}}</p>
            <el-table
              :data="tableData"
              size="mini"
              header-row-class-name="header-row"
              max-height="516px"
              style="width: 100%">
              <el-table-column
                prop="appType"
                align="center"
                :label="$t('message.TABLE.type')">
              </el-table-column>
              <el-table-column
                prop="version"
                align="center"
                :label="$t('message.TABLE.version')">
              </el-table-column>
              <el-table-column
                prop="filename"
                align="center"
                :label="$t('message.TABLE.filename')">
              </el-table-column>
              <el-table-column
                prop="url"
                align="center"
                :label="$t('message.TABLE.downloadUrl')">
              </el-table-column>
              <el-table-column
                prop="createAt"
                align="center"
                :label="$t('message.TABLE.time')">
                <template slot-scope="scope">
                  <div class="reperate-wrap">
                    {{scope.row.createAt | formatTime}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                :label="$t('message.TABLE.operate')">
                <template slot-scope="scope">
                  <div class="reperate-wrap">
                    <!-- <div><el-button round @click="showEdit(scope.row)" type="text" size="mini">{{$t("message.BUTTON.edit")}}</el-button></div> -->
                    <div><el-button round @click="handleDelete(scope.row)" type="text" size="mini">{{$t("message.BUTTON.del")}}</el-button></div>
                  </div>
                  <!-- <div class="reperate-wrap">
                    <el-dropdown trigger="click" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{$t('message.BUTTON.more')}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="[scope.row, '修改']">{{$t('message.BUTTON.edit')}}</el-dropdown-item>
                        <el-dropdown-item :command="[scope.row, '删除']">{{$t('message.BUTTON.del')}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div> -->
                </template>
              </el-table-column>
            </el-table>
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
      <el-dialog :title="$t('message.BUTTON.add')" width="375px" @close="resetForm('createForm')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="createForm" :rules="rules" ref="createForm" :label-width="formLabelWidth" size="mini">
          <el-form-item :label="$t('message.TABLE.appType')" prop="appType">
            <div class="version-item">
              <el-select v-model="createForm.appType" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in appTypeList"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.version')" prop="version">
            <div class="version-item">
              <el-input size="mini" v-model="createForm.version" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.file')" prop="file">
            <div class="upload-item">
              <div class="upload-wrap">
                <i v-show="createForm.file" @click="()=>{handleClearFile('createForm', 'file')}" class="el-icon-circle-close upload-close-file"></i>
                <input type="file" ref="file" data-name="file" @change="(e)=>{handleImportExcelFile(e, 'createForm')}">
                <input type="text" v-model="createForm.file">
                <el-button round size="mini" type="primary">{{$t('message.INPUT.choose')}}<i v-show="createForm.file" class="el-icon-check el-icon--right"></i></el-button>
              </div>
            </div>
            <!-- <div class="version-item">
              <el-input size="mini" v-model="createForm.position" :placeholder="$t('message.INPUT.input')"></el-input>
            </div> -->
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.filename')" prop="filename">
            <div class="version-item">
              <el-input size="mini" v-model="createForm.filename" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.message')" prop="message">
            <div class="version-item">
              <el-input size="mini" v-model="createForm.message" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('createForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" :disabled="isClick" @click="submitForm('createForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
const imgBase64 = 'data:image/jpg;base64,';
import MD5 from 'md5';
import request from "@/axios/axios";
export default {
  name: 'version',
  data() {
    var checkAppType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.selectAppType')));
      } else {
        callback();
      }
    };
    var checkVersion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputVersion')));
      } else {
        callback();
      }
    };
    var checkFile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.selectFile')));
      } else {
        callback();
      }
    };
    var checkFilename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputFileName')));
      } else {
        callback();
      }
    };
    var checkMessage = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputMessage')));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      isClick: false,
      permission: '', // 管理员权限
      defaultProps: {
        children: 'last',
        label: 'name'
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      updateFormVisible: false,
      formLabelWidth: '95px',
      irisRegistered: [ // 注册虹膜
        {name: 'yes', val: 1},
        {name: 'no', val: 0}
      ],
      appTypeList: [
        {label: 'app1', val: '1'},
        {label: 'app2', val: '2'},
        {label: 'app3', val: '3'},
      ],
      createForm: {
        appType: '', // 类型
        version: '', // 版本
        file: '', // 版本文件
        filename: '', // 文件名称
        message: '', // 版本描述
      },
      updateForm: {
        appType: '', // 类型
        version: '', // 版本
        file: '', // 版本文件
        filename: '', // 文件名称
        message: '', // 版本描述
      },
      rules: {
        appType: [
          { required: true, validator: checkAppType, trigger: 'change' }
        ],
        version: [
          { required: true, validator: checkVersion, trigger: 'blur' }
        ],
        file: [
          { required: true, validator: checkFile, trigger: 'change' }
        ],
        filename: [
          { required: true, validator: checkFilename, trigger: 'blur' },
        ],
        message: [
          { required: true, validator: checkMessage, trigger: 'blur' },
        ],
      },
      ids: [],
      deviceList: [],
      defaultFileSize: 1024 * 15, // 15kb
    }
  },
  created() {
    let permission = Number(localStorage.getItem('permission'));
    this.permission = permission === 0 || permission === 1;
    this.getDataList()
  },
  mounted() {},
  computed: {},
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
        return this.$t('message.INPUT.'+text);
      }
    },
    // 更多操作
    handleCommand(command) {
      // console.log(command);
      let row = command[0];
      let txt = command[1];
      if(txt === '删除') {
        this.handleDelete(row);
      }
    },
    handleSearch() {
      this.getDataList();
    },
    showCreate() {
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDataList();
    },
    getDataList() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/version/list',
        param: {
          pageNum: vm.pageNum,
          pageSize: vm.pageSize
        },
        method: 'post',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        console.log(res)
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
    // 确认创建
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {};
          let from = null;
          let cbfn = null;
          if(formName === 'createForm'){
            from = vm.createForm;
            cbfn = vm.createVersion;
          }
          for(let i in from) {
            data[i] = from[i] || '';
          }
          cbfn(data);
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.updateFormVisible = false;
      try{
        this.handleClearFile('createForm', 'file')
      }catch(e){}
    },
    // 导入excel
    handleImportExcelFile(e, formName) {
      // console.log(e)
      let ele = e.target;
      let name = ele.dataset.name;
      if(ele.files.length === 0){
        this[formName][name] = '';
      }else{
        this[formName][name] = ele.files[0];
      }
    },
    // 清除文件
    handleClearFile(formName, ref) {
      this.$refs[ref].value = '';
      this[formName][ref] = '';
    },
    // 删除
    handleDelete(row) {
      const vm = this;
      let deleteUser = () => {
        vm.loading = true;
        // vm.isClick = true;
        request({
          url: '/version/delete',
          param: {
            ids: row.id
          },
          method: 'get',
          onError: err => {
            vm.loading = false;
            // vm.isClick = false;
          },
          vm,
        }).then(res => {
          let code = res.code;
          vm.loading = false;
          // vm.isClick = false;
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
        confirmButtonText:  this.$t('message.BUTTON.ok'),
        callback: action => {
          if(action === 'confirm'){
            // alert('已删除')
            deleteUser();
          }
        }
      });
    },
    // 创建用户
    createVersion(data) {
      const vm = this;
      console.log(data)
      const {
        appType, // 类型
        version, // 版本
        file, // 文件
        filename, // 文件名
        message, // 版本描述
      } = data;
      var formData = new FormData();
      formData.append("appType", appType);
      formData.append("version", version);
      formData.append("file", file);
      formData.append("filename", filename);
      formData.append("message", message);
      vm.loading = true;
      vm.isClick = true;
       request({
        url: '/version/upload',
        param: formData,
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
          vm.$message({
            message: vm.$t('message.MESSAGE.createSuccess'),
            type: 'success',
            duration: 1000,
          });
          vm.dialogFormVisible = false;
          vm.getDataList();
        }
      });
    },
  },
}
</script>
<style lang="scss">
.version{
  .el-form{
    // overflow: hidden;
    clear: both;
    .version-item>.el-input .el-input__inner{
      float: left;
    }
  }
  .el-form-item{
    // margin-bottom:10px;
  }
  .el-dialog__body{
    padding: 10px 20px;
    // overflow: hidden;
    position: relative;
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
.version{
  .version-item{
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
}
.cardImg{
  position: absolute;
  top:0;
  right:50px;
  .cardimg-icon{
    display:block;
    width:120px;
    height:150px;
    background: #ccc;
    img{
      width:100%;
      height:auto;
    }
  }
  .readCard{
    position: absolute;
    left:12%;
    top:-22%;
  }
}
.img-wrap{
  width:100%;
  text-align: center;
  span{
    display:inline-block;
    margin:0 2%;
    width:30%;
    height:auto;
    img{
      width:100%;
    }
  }
}

.col{
  float: left;
}
.col-3{
  width:30%;
}
.col-4{
  width:40%;
}
.col-5{
  width:50%;
}
.col-7{
  width:70%;
}
</style>

