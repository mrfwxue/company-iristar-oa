<template>
  <div class="userManager" v-loading.fullscreen="loading">
    <div class="data-content box-shadow">
      <div class="title-operate-btn" v-if="permission === 0">
        <el-button round size="mini" @click="dialogFormVisible=true" type="primary">{{$t('message.BUTTON.add')}}</el-button>
      </div>
      <div class="table-content" style="height:auto;">
        <p class="title">{{$t('message.USERMANAGER.name')}}</p>
        <el-table
          :data="tableData"
          header-row-class-name="header-row"
          size="mini"
          @cell-mouse-enter="handleHoverCell"
          style="width: 100%">
          <el-table-column
            prop="username"
            align="center"
            :label="$t('message.TABLE.name')">
          </el-table-column>
          <el-table-column
            prop="permission"
            align="center"
            :label="$t('message.TABLE.userType')">
            <template slot-scope="scope">
              <span>{{formatKey(scope.row.permission, adminRole, 'label', 'id')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('message.TABLE.status')">
            <template slot-scope="scope">
              <el-switch
                :disabled="scope.row.delete == 1"
                v-model="scope.row.status"
                @change="handelChangeStatus"
                :active-value="0"
                :inactive-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('message.TABLE.operate')">
            <template slot-scope="scope">
              <div class="reperate-wrap">
                <div v-if="scope.row.update != 1"><el-button @click="handleEdit(scope.row)" type="text" size="mini">{{$t('message.BUTTON.edit')}}</el-button></div>
                <div v-if="scope.row.recovery != 1"><el-button @click="handleResetPwd(scope.row)" type="text" size="mini">{{$t('message.BUTTON.resetPwd')}}</el-button></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
      <el-dialog :title="$t('message.BUTTON.add')" width="379px" @close="resetForm('createForm')" :visible.sync="dialogFormVisible">
        <el-form :model="createForm" :rules="rules" ref="createForm" label-width="136px" size="mini">
          <el-form-item :label="$t('message.LOGIN.username')" prop="username">
            <div class="userManager-item">
              <div class="select-wrap">
                <el-input size="mini" clearable v-model="createForm.username" :placeholder="$t('message.INPUT.input')"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.LOGIN.pwd')" prop="pwd">
            <div class="userManager-item">
              <div class="select-wrap">
                <el-input type="password" size="mini" clearable v-model="createForm.pwd" :placeholder="$t('message.INPUT.input')"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.INPUT.rePwd')" prop="okPwd">
            <div class="userManager-item">
              <div class="select-wrap">
                <el-input type="password" size="mini" clearable v-model="createForm.okPwd" :placeholder="$t('message.INPUT.input')"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.userType')" prop="power.val">
            <div class="userManager-item">
              <el-select v-model="createForm.power.val" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in createForm.power.data"
                  :key="item.id"
                  :label="$t('message.TABLE.adminRole.'+item.labelText)"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('createForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" :disabled="isClick" type="primary" @click="submitForm('createForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.BUTTON.edit')" width="379px" @close="resetForm('updateForm')" :visible.sync="updateFormVisible">
        <el-form :model="updateForm" :rules="rules" ref="updateForm" :label-width="formLabelWidth">
          <el-form-item :label="$t('message.LOGIN.username')" prop="username">
            <div class="userManager-item">
              <div class="select-wrap">
                <el-input size="mini" clearable v-model="updateForm.username" :placeholder="$t('message.INPUT.input')"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.userType')" prop="power.val">
            <div class="userManager-item">
              <el-select v-model="updateForm.power.val" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in updateForm.power.data"
                  :key="item.id"
                  :label="$t('message.TABLE.adminRole.'+item.labelText)"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('updateForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" :disabled="isClick" type="primary" @click="submitForm('updateForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import MD5 from 'md5';
import request from "@/axios/axios";
export default {
  name: 'userManager',
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputUsername')));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputPwd')));
      } else if (value.length > 18 || value.length < 3) {
        callback(new Error(this.$t('message.MESSAGE.lengthErr')));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.pwdAgain')));
      } else if (value !== this.createForm.pwd) {
        callback(new Error(this.$t('message.MESSAGE.pwdNoSame')));
      } else {
        callback();
      }
    };
    var validatePower = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.selectUsertype')));
      } else {
        callback();
      }
    };
    return {
      isClick: false, // 双击
      loading: false,
      adminRole: [
        {id: 2, label: 'admin'}, // 普通管理员
        {id: 1, label: 'superAdmin'}, // 超级管理员
        {id: 0, label: 'root'}, // 系统管理员
      ],
      permission: '', // 管理员权限
      power: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
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
      tableData: [],
      dialogFormVisible: false,
      updateFormVisible: false,
      formLabelWidth: '120px',
      createForm: {
        username: '',
        pwd: '',
        okPwd: '',
        power: {
          val: '',
          data: []
        }
      },
      updateForm: {
        id: '',
        username: '',
        power: {
          val: '',
          data: []
        }
      },
      rules: {
        username: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        pwd: [
          { required: true, validator: validatePass1, trigger: 'blur' },
        ],
        okPwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        "power.val": [
          { required: true, validator: validatePower, trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.permission = Number(localStorage.getItem('permission'));
    this.getPowerList();
    this.getAdminlist();
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
        return this.$t('message.TABLE.adminRole.'+text);
      }
    },
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getAdminlist();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAdminlist();
      // console.log(`当前页: ${val}`);
    },
    // 确认创建
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(formName === 'createForm'){
            vm.createUser();
          }else{
            let {
              id,
              username,
              power
            } = this.updateForm;
            let data = {
              id,
              username,
              roleid: power.val
            }
            vm.updateUser(data);
          }
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
    },
    handleHoverCell(row) {
      this.updateForm.id = row.id;
    },
    handleEdit(row) {
      this.updateFormVisible = true;
      this.updateForm.username = row.username;
      this.updateForm.power.val = row.roleid;
    },
    handleResetPwd(row) {
      const vm = this;
      let resetPwd = () => {
        vm.loading = true;
        request({
          url: '/admin/resetPassword',
          param: {
            adminid: row.id
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
            vm.$message({
              message: vm.$t('message.MESSAGE.resetPwdSuccess'),
              type: 'success',
              duration: 1000
            });
          }
        });
      }
      this.$alert(this.$t('message.MESSAGE.confirmResetPwd'), this.$t('message.MESSAGE.title'), {
        confirmButtonText:  this.$t('message.BUTTON.ok'),
        callback: action => {
          if(action === 'confirm'){
            resetPwd();
          }
        }
      });
    },
    handelChangeStatus(status) {
      let { id } = this.updateForm;
      let data = {id, status};
      this.updateUser(data, true);
    },
    // 获取管理员
    getAdminlist() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/admin/list',
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
        vm.loading = false;
        if(code === 200){
          let data = res.content;
          vm.tableData = data.rows;
          vm.total = data.total;
        }
      });
    },
    // 获取用户类型
    getPowerList() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/role/list',
        param: {},
        method: 'get',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        vm.loading = false;
        if(code === 200){
          let data = res.content;
          // console.log(data)
          vm.formatRoleList(data);
        }
      });
    },
    // 处理角色列表
    formatRoleList(data) {
      let role = this.adminRole;
      for(let i in data) {
        let r = role.filter(v => v.id == data[i].permission)[0];
        data[i].labelText = r.label;
      }
      this.createForm.power.data = data;
      this.updateForm.power.data = data;
    },
    // 创建用户
    createUser() {
      const vm = this;
      let {
        username,
        pwd,
        power
      } = this.createForm;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/admin/register',
        param: {
          username,
          password: MD5(pwd),
          roleid: power.val
        },
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
          vm.dialogFormVisible = false;
          vm.getAdminlist();
          vm.$message({
            message: vm.$t('message.MESSAGE.createSuccess'),
            type: 'success',
            duration: 1000
          });
        }
      });
    },
    // 更新用户
    updateUser(data, status = false) {
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/admin/update',
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
          if(!status){
            vm.updateFormVisible = false;
            vm.getAdminlist();
          }
          vm.$message({
            message: vm.$t('message.MESSAGE.editSuccess'),
            type: 'success',
            duration: 1000
          });
        }
      });
    }
  },
}
</script>
<style lang="scss">
.userManager{
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
.userManager{
  .userManager-item{
    display:flex;
    >div{
      flex:1;
    }
    .text{
      margin:0 10px;
    }
  }
}
</style>

