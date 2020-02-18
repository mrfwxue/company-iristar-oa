<template>
  <div class="organize" v-loading.fullscreen="loading">
    <div class="data-content box-shadow">
      <div class="data-flex">
        <div class="tree-wrap">
          <TreeTitle @titleFocus="cancelHighlight"></TreeTitle>
          <el-tree
            :data="treeData"
            :expand-on-click-node="false"
            check-on-click-node
            :highlight-current="showLight"
            :props="defaultProps"
            node-key="id"
            ref="tree"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div class="table-content">
          <div class="group-wrap">
            <p class="title" v-if="permission">
              <el-button round size="mini" @click="showCreateChild" type="primary">{{$t('message.BUTTON.addChild')}}</el-button>
              <el-button round size="mini" @click="deleteChild" type="primary">{{$t('message.BUTTON.delChild')}}</el-button>
            </p>
            <p class="no-result" v-if="childList.length === 0">{{$t('message.ORGANIZE.empty')}}</p>
            <ul class="child-list" v-else>
              <li v-for="(item, i) in childList" :key="i" :class="selectChildId === item.id ? 'active' : ''" @click="handleClickChild(item, $event)">{{item.name}}</li>
            </ul>
          </div>
          <div class="table-wrap">
            <p class="title">
              <el-button round size="mini" @click="showCreatePeople" type="primary">{{$t('message.BUTTON.addPeople')}}</el-button>
              <!-- <el-button round size="mini" @click="sendArr" type="primary">调整部门</el-button> -->
              <el-button v-if="permission" round size="mini" @click="deleteArr" type="primary">{{$t('message.BUTTON.delArr')}}</el-button>
              <!-- <el-button round size="mini" @click="showImport" type="primary">导入Excel</el-button> -->
            </p>
            <el-table
              :data="tableData"
              size="mini"
              row-class-name="check-row"
              header-row-class-name="check-header-row"
              max-height="516px"
              :header-cell-class-name="setCellname"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column
                prop="realname"
                align="center"
                :label="$t('message.TABLE.name')">
              </el-table-column>
              <el-table-column
                prop="departmentName"
                align="center"
                :label="$t('message.TABLE.department')">
              </el-table-column>
              <el-table-column
                prop="empno"
                align="center"
                :label="$t('message.TABLE.empno')">
              </el-table-column>
              <el-table-column
                prop="position"
                align="center"
                :label="$t('message.TABLE.position')">
              </el-table-column>
              <el-table-column
                prop="email"
                align="center"
                :label="$t('message.TABLE.email')">
              </el-table-column>
              <el-table-column
                prop="phone"
                align="center"
                :label="$t('message.TABLE.phone')">
              </el-table-column>
              <el-table-column
                prop="faceRegistered"
                align="center"
                width="120"
                :label="$t('message.TABLE.isSignFace')">
                <template slot-scope="scope">
                  <span>{{ formatKey(scope.row.faceRegistered, irisRegistered, 'name', 'val') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="irisRegistered"
                align="center"
                width="120"
                :label="$t('message.TABLE.isSignEye')">
                <template slot-scope="scope">
                  <span>{{ formatKey(scope.row.irisRegistered, irisRegistered, 'name', 'val') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                :label="$t('message.TABLE.operate')">
                <template slot-scope="scope">
                  <div class="reperate-wrap">
                    <el-dropdown trigger="click" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{$t('message.BUTTON.more')}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="[scope.row, '修改']">{{$t('message.BUTTON.edit')}}</el-dropdown-item>
                        <el-dropdown-item v-if="permission" :command="[scope.row, '删除']">{{$t('message.BUTTON.del')}}</el-dropdown-item>
                        <el-dropdown-item :command="[scope.row, '下发']">{{$t('message.BUTTON.send')}}</el-dropdown-item>
                        <!-- <el-dropdown-item :command="[scope.row, '修改密码']">{{$t('message.INDEX.editPwd')}}</el-dropdown-item>
                        <el-dropdown-item v-if="permission" :command="[scope.row, '重置密码']">{{$t('message.BUTTON.resetPwd')}}</el-dropdown-item> -->
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
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
      <el-dialog :title="$t('message.BUTTON.addChild')" width="379px" @close="resetForm('childForm')" :visible.sync="createChildDialog">
        <el-form :model="childForm" status-icon :rules="childRules" ref="childForm" label-width="140px" class="demo-childForm" size="mini">
          <!-- <el-form-item label="部门" prop="parentid">
            <el-cascader
            :options="treeData"
            :props="{
              checkStrictly: true,
              label: 'name',
              children: 'last',
              value: 'id'
            }"
            v-model="childForm.parentid"
            @change="handleChangeChild"
            clearable></el-cascader>
          </el-form-item> -->
          <el-form-item :label="$t('message.TABLE.departmentName')" prop="name">
            <el-input type="text" size="mini" clearable v-model="childForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('childForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('childForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.BUTTON.addPeople')" width="375px" @close="resetForm('createForm')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="createForm" :rules="rules" ref="createForm" :label-width="formLabelWidth" size="mini">
          <el-form-item :label="$t('message.TABLE.name')" prop="realname">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="createForm.realname" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.department')" prop="department">
            <div class="peopleManager-item">
              <el-cascader
              :options="treeData"
              :props="{
                checkStrictly: true,
                label: 'name',
                children: 'last',
                value: 'id'
              }"
              :placeholder="$t('message.INPUT.select')"
              v-model="createForm.department"
              @change="changeCreateChild"
              clearable></el-cascader>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.empno')" prop="empno">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="createForm.empno" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.position')" prop="position">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="createForm.position" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <!-- <el-form-item :label="$t('message.TABLE.position')" prop="career">
            <div class="peopleManager-item">
              <el-select v-model="createForm.career" size="mini" @focus="getCareerType" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in careerList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-form-item> -->
          <el-form-item :label="$t('message.TABLE.email')" prop="email">
            <div class="peopleManager-item">
              <el-input size="mini" type="email" v-model="createForm.email" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.phone')" prop="phone">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="createForm.phone" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <!-- <el-form-item :label="$t('message.LOGIN.pwd')" prop="password">
            <div class="peopleManager-item">
              <el-input size="mini" type="password" v-model="createForm.password" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.INPUT.rePwd')" prop="confirmPwd">
            <div class="peopleManager-item">
              <el-input size="mini" type="password" v-model="createForm.confirmPwd" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('createForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" :disabled="isClick" @click="submitForm('createForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.TABLE.editPeople')" width="375px" @close="resetForm('updateForm')" :visible.sync="updateFormVisible" :close-on-click-modal="false">
        <el-form :model="updateForm" :rules="rules" ref="updateForm" :label-width="formLabelWidth" size="mini">
          <el-form-item :label="$t('message.TABLE.name')" prop="realname">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="updateForm.realname" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.department')" prop="department">
            <div class="peopleManager-item">
              <el-cascader
              :options="treeData"
              :props="{
                checkStrictly: true,
                label: 'name',
                children: 'last',
                value: 'id'
              }"
              :placeholder="$t('message.INPUT.select')"
              v-model="updateForm.department"
              @change="changeUpdateChild"
              clearable></el-cascader>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.empno')" prop="empno">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="updateForm.empno" disabled :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.position')" prop="position">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="updateForm.position" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <!-- <el-form-item :label="$t('message.TABLE.position')" prop="career">
            <div class="peopleManager-item">
              <el-select v-model="updateForm.career" size="mini" @focus="getCareerType" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in careerList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
          </el-form-item> -->
          <el-form-item :label="$t('message.TABLE.email')" prop="email">
            <div class="peopleManager-item">
              <el-input size="mini" type="email" v-model="updateForm.email" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.phone')" prop="phone">
            <div class="peopleManager-item">
              <el-input size="mini" v-model="updateForm.phone" :placeholder="$t('message.INPUT.input')"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('updateForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" :disabled="isClick" @click="submitForm('updateForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.TABLE.sendPeople')" width="375px" @close="resetForm('sendToDevice')" :visible.sync="deviceVisible" :close-on-click-modal="false">
        <el-form :model="sendToDevice" :rules="deviceRules" ref="sendToDevice" :label-width="formLabelWidth" size="mini">
          <el-form-item :label="$t('message.TABLE.device')" prop="deviceid">
            <div class="organize-item">
              <el-select v-model="sendToDevice.deviceid" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in deviceList"
                  :key="item.id"
                  :label="item.deviceName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('sendToDevice')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" :disabled="isClick" @click="submitSend">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.BUTTON.import')" width="379px" @close="resetForm('importForm')" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="importFormVisible">
        <el-form :model="importForm" :rules="importRules" ref="importForm" label-width="120px" size="mini">
          <el-form-item :label="$t('message.TABLE.tableName.people')" prop="peopleFile">
            <div class="upload-item">
              <div class="upload-wrap">
                <i v-show="importForm.peopleFile" @click="()=>{handleClearFile('importForm', 'peopleFile')}" class="el-icon-circle-close upload-close-file"></i>
                <input type="file" ref="peopleFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" data-name="peopleFile" @change="(e)=>{handleImportExcelFile(e, 'importForm')}">
                <input type="text" v-model="importForm.peopleFile">
                <el-button round size="mini" type="primary">{{$t('message.INPUT.choose')}}<i v-show="importForm.peopleFile" class="el-icon-check el-icon--right"></i></el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('importForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" :disabled="isClick" @click="submitForm('importForm')">{{$t('message.BUTTON.import')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.INDEX.editPwd')" width="375px" @close="resetForm('editPwdForm')" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="editPwdForm" status-icon :rules="editPwdRules" ref="editPwdForm" label-width="100px" class="demo-editPwdForm" size="mini">
          <el-form-item :label="$t('message.INDEX.oldPwd')" prop="oldPass">
            <el-input type="password" v-model="editPwdForm.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.INDEX.newPwd')" prop="newPass">
            <el-input type="password" v-model="editPwdForm.newPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.INDEX.okPwd')" prop="okNewPass">
            <el-input type="password" v-model="editPwdForm.okNewPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('editPwdForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" :disabled="isClick" @click="submitForm('editPwdForm')">{{$t('message.BUTTON.confirm')}}</el-button>
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
  name: 'organize',
  data() {
    var validateEmail = function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.inputPhone')));
      }
      if (!Number(value)) {
        callback(new Error(this.$t('message.MESSAGE.inputNumber')));
      } else {
        // if(!(/^1[34578]\d{9}$/.test(value))){
        //   callback(new Error(this.$t('message.MESSAGE.phoneErr')));
        // }else{
        //   callback() 
        // }
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.pwdAgain')));
      } else if (value !== this.createForm.password) {
        callback(new Error(this.$t('message.MESSAGE.pwdNoSame')));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.pwdAgain')));
      } else if (value !== this.editPwdForm.newPass) {
        callback(new Error(this.$t('message.MESSAGE.pwdNoSame')));
      } else {
        callback();
      }
    };
    var checkChild = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputTitle')));
      } else {
        callback();
      }
    };
    var checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputName')));
      } else {
        callback();
      }
    };
    var checkDepartment = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.selectDepartment')));
      } else {
        callback();
      }
    };
    var checkEmpno = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputEmpno')));
      } else {
        callback();
      }
    };
    var checkPosition = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputPosition')));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputEmail')));
      } else if (!validateEmail(value)) {
        callback(new Error(this.$t('message.MESSAGE.inpurEmailErr')));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.inputPwd')));
      } else {
        callback();
      }
    };
    var checkDeviceid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.selectDevice')));
      } else {
        callback();
      }
    };
    var checkPeopleFile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.selectFile')));
      } else {
        callback();
      }
    };
    return {
      title: '虹星科技',
      loading: false,
      isClick: false,
      permission: '', // 管理员权限
      defaultProps: {
        children: 'last',
        label: 'name'
      },
      searchData: {
        realname: '',
        cardno: '',
        irisRegistered: '',
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      createChildDialog: false,
      dialogFormVisible: false,
      updateFormVisible: false,
      formLabelWidth: '100px',
      per: {
        leftImg: '',
        rightImg: '',
        perImg: '',
      },
      leader: [
        {name: 'yes', val: 1},
        {name: 'no', val: 0}
      ],
      irisRegistered: [ // 注册虹膜
        {name: 'yes', val: 1},
        {name: 'no', val: 0}
      ],
      treeNodeId: '',
      childList: [],
      selectChildId: '',
      childForm: {
        name: '',
      },
      childRules: {
        name: [
          { required: true, validator: checkChild, trigger: 'blur' }
        ],
      },
      createForm: {
        realname: '', // 姓名
        department: '', // 部门
        empno: '', // 工号
        position: '', // 职位
        email: '', // 邮箱
        phone: '', // 手机
        // password: '', // 密码
        // confirmPwd: '', // 确认密码
      },
      updateForm: {
        realname: '', // 姓名
        department: '', // 部门
        empno: '', // 工号
        position: '', // 职位
        email: '', // 邮箱
        phone: '', // 手机
      },
      careerList: [],
      rules: {
        realname: [
          { required: true, validator: checkName, trigger: 'blur' }
        ],
        department: [
          { required: true, validator: checkDepartment, trigger: 'change' }
        ],
        empno: [
          { required: true, validator: checkEmpno, trigger: 'blur' }
        ],
        position: [
          { required: true, validator: checkPosition, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' },
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: checkPassword, trigger: 'blur' },
        ],
        confirmPwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },
      deviceRules: {
        deviceid: [
          { required: true, validator: checkDeviceid, trigger: 'change' }
        ],
      },
      checkedArr: [],
      ids: [],
      deviceVisible: false,
      sendToDevice: {
        deviceid: '',
        userList: [], // 以 , 隔开的 数组
      },
      deviceList: [],
      importForm: {
        peopleFile: '',
      },
      importRules: {
        peopleFile: [
          { required: false, validator: checkPeopleFile, trigger: 'change' }
        ],
      },
      importFormVisible: false,
      showLight: true,
      editDialogVisible: false,
      editPwdForm: {
        userid: '',
        oldPass: '',
        newPass: '',
        okNewPass: '',
      },
      editPwdRules: {
        oldPass: [
          { required: true, validator: checkPassword, trigger: 'blur' },
        ],
        newPass: [
          { required: true, validator: checkPassword, trigger: 'blur' },
        ],
        okNewPass: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.createChild({
    //   parentid: '0',
    //   name: '战略合作部门'
    // })
    // this.getNation();
    // this.getCareerType();
    let permission = Number(localStorage.getItem('permission'));
    this.permission = permission === 0 || permission === 1;
    this.getUserList();
    // this.treeBlur();
  },
  mounted() {},
  computed: {
    treeData() {
      return this.$store.state.treeData;
    }
  },
  watch: {
    'selectChildId': function(n, o) {
      this.handleSearch();
    }
  },
  methods: {
    // // 部门失焦
    // treeBlur() {
    //   const vm = this;
    //   document.onclick = function(e) {
    //     vm.selectChildId = '';
    //     vm.showLight = false;
    //   }
    // },
    //
    handleClickChild(item, e) {
      this.selectChildId=item.id
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
        return this.$t('message.INPUT.'+text);
      }
    },
    handleChangeChild(val) {
      console.log(val);
    },
    // 取消高亮显示选中项; 实现父级id 为 根id 0; 也就是创建1级节点
    cancelHighlight() {
      this.showLight = false;
      this.selectChildId = '';
    },
    handleNodeClick(data) {
      this.showLight = true;
      this.childList = data.last || [];
      this.selectChildId = data.id;
      // console.log(data);
      // this.treeNodeId = data.$treeNodeId;
      // console.log(this.$refs.tree.getCurrentKey() === this.selectChildId);
    },
    changeCreateChild(val) {
      this.createForm.department = val[val.length-1]
    },
    changeUpdateChild(val) {
      this.updateForm.department = val[val.length-1]
    },
    // 获取部门 即 树形结构
    getChildList() {
      const vm = this;
      request({
        url: '/organization/list',
        param: {},
        method: 'get',
        onError: err => {
        },
        vm,
      }).then(res => {
        // console.log(res)
        let code = res.code;
        let data = [];
        if(code === 200) {
          data = res.data;
          if(vm.selectChildId){
            vm.formatChildList(data);
          }
        }
        vm.$store.dispatch('setTreeData', data);
      });
    },
    formatChildList(data) {
      const vm = this;
      let arr = [];
      let arrFn = [];
      let loopSearch = function(data) {
        if(data.length>0){
          for(let i in data) {
            let last = data[i].last;
            if(data[i].id === vm.selectChildId){
              arr = last;
            }else{
              arrFn.push(function() {loopSearch(last)})
            }
          }
        }
      }
      loopSearch(data);
      let loopSearch2 = function() {
        if(arr.length > 0) {
          // console.log('find-----------', arr);
          // console.log(vm.selectChildId)
          vm.childList = arr;
        }else{
          let copyArrFn = [];
          for(let i in arrFn){
            copyArrFn[i] = arrFn[i];
          }
          arrFn = [];
          for(let i in copyArrFn){
            copyArrFn[i]();
          }
          loopSearch2();
        }
      }
      loopSearch2();
    },
    // 添加子部门
    showCreateChild() {
      this.createChildDialog = true;
    },
    deleteChild(e) {
      if(!this.selectChildId){
        this.$message({
          message: this.$t('message.MESSAGE.selectDeleteDepartment'),
          type: 'warning',
          duration: 1500,
        })
        return
      }
      const vm = this;
      let deleteThisChild = () => {
        vm.loading = true;
        // vm.isClick = true;
        request({
          url: '/organization/delete',
          param: {
            ids: vm.selectChildId
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
            vm.getChildList();
            vm.childList = [];
            vm.selectChildId = '';
          }
        });
      }
      this.$alert(this.$t('message.MESSAGE.confirmDeleteChild'), this.$t('message.MESSAGE.title'), {
        confirmButtonText:  this.$t('message.BUTTON.ok'),
        callback: action => {
          if(action === 'confirm'){
            // alert('已删除')
            deleteThisChild();
          }
        }
      });
    },
    // 获取职位
    getCareerType() {
      const vm = this;
      // vm.loading = true;
      if(vm.careerList.length>0) return;
      request({
        url: '/common/careerTypeList',
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
        let code = res.code;
        if(code === 200) {
          let data = res.data;
          vm.careerList = data;
        }
      });
    },
    // 更多操作
    handleCommand(command) {
      // console.log(command);
      let row = command[0];
      let txt = command[1];
      if(txt === '修改') {
        this.handleEdit(row);
      }
      if(txt === '删除') {
        this.handleDelete(row);
      }
      if(txt === '下发') {
        this.handleSend(row);
      }
      if(txt === '修改密码') {
        this.showEditPwd(row);
      }
      if(txt === '重置密码') {
        this.resetPwdFn(row);
      }
    },
    handleSearch() {
      this.getUserList();
    },
    // 选择行
    handleSelectionChange(val) {
      // console.log(val);
      this.checkedArr = val;
    },
    deleteArr() {
      if(this.checkedArr.length === 0){
        this.$message({
          message: this.$t('message.MESSAGE.selectPeople'),
          type: 'warning',
          duration: 1500,
        })
        return
      }
      let arr = [];
      this.checkedArr.filter(item => {
        arr.push(item.id);
      })
      this.handleDelete({id: arr.join(',')})
    },
    sendArr() {
      if(this.checkedArr.length === 0){
        this.$message({
          message: this.$t('message.MESSAGE.selectPeople'),
          type: 'warning',
          duration: 1500,
        })
        return
      }
      let arr = [];
      this.checkedArr.filter(item => {
        arr.push(item.userid);
      })
      this.handleSend({userid: arr})
    },
    setCellname({row, column, rowIndex, columnIndex}) {
      if(column.type === "selection"){
        return 'check-wrap'
      }
      // console.log({row, column, rowIndex, columnIndex})
    },
    showCreatePeople() {
      this.per = {
        leftImg: '',
        rightImg: '',
        perImg: '',
      };
      this.dialogFormVisible = true
    },
    showImport() {
      this.importFormVisible = true;
    },
    showEditPwd(row) {
      this.editPwdForm.userid = row.userid;
      this.editDialogVisible = true;
    },
    resetPwdFn(row) {
      const vm = this;
      let resetPwd = () => {
        vm.loading = true;
        request({
          url: '/user/resetPassword',
          param: {
            userid: row.userid
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
    handleEdit(row) {
      for(let i in this.updateForm){
        this.updateForm[i] = row[i] || '';
      }
      this.updateForm.id = row.id;
      this.updateFormVisible = true;
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
            })
          }else{
            vm.ids[$treeNodeId].push(id);
          }
        }else{
          vm.ids[$treeNodeId] = [];
        }
      }
      if(Number(level) === 2) {
        let index = vm.ids[$treeNodeId].indexOf(id);
        if(checked){
          if(index < 0){
            vm.ids[$treeNodeId].push(id);
          }
        }else{
          vm.ids[$treeNodeId].splice(index, 1)
        }
      }
    },
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserList();
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
            cbfn = vm.createUser;
          }else if(formName === 'updateForm'){
            from = vm.updateForm;
            cbfn = vm.updateUser;
          }else if(formName === 'childForm'){
            from = vm.childForm;
            cbfn = vm.createChild;
          }else if(formName === 'editPwdForm'){
            from = vm.editPwdForm;
            cbfn = vm.editPwd;
          }else{
            from = vm.importForm;
            cbfn = vm.importPeopleFile;
          }
          for(let i in from) {
            data[i] = from[i] || '';
            if(from[i].val !== undefined) {
              data[i] = from[i].val || ''
            }
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
      this.deviceVisible = false;
      this.importFormVisible = false;
      this.editDialogVisible = false;
    },
    // 修改密码
    editPwd() {
      const vm = this;
      let {
        userid,
        oldPass,
        newPass,
      } = this.editPwdForm;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/user/changePassword',
        param: {
          userid,
          oldPass: CryptoJS.HmacMD5(CryptoJS.MD5(oldPass).toString(), '12345').toString(),
          newPass: MD5(newPass),
          random: '12345'
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
          vm.resetForm('editPwdForm');
          vm.$message({
            message: vm.$t('message.MESSAGE.editPwdSuccess'),
            type: 'success',
            duration: 1500,
          });
        }
      });
    },
    // 删除
    handleDelete(row) {
      const vm = this;
      let deleteUser = () => {
        vm.loading = true;
        // vm.isClick = true;
        request({
          url: '/user/delete',
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
            vm.getUserList();
          }
        });
      }
      this.$alert(this.$t('message.MESSAGE.confirmDeletePeople'), this.$t('message.MESSAGE.title'), {
        confirmButtonText:  this.$t('message.BUTTON.ok'),
        callback: action => {
          if(action === 'confirm'){
            // alert('已删除')
            deleteUser();
          }
        }
      });
    },
    // 下发
    handleSend(row) {
      this.sendToDevice.userList = [];
      this.getDeviceList();
      if(typeof row.userid === 'string'){
        this.sendToDevice.userList.push(row.userid);
      }else{
        this.sendToDevice.userList = row.userid;
      }
      this.deviceVisible = true;
    },
    submitSend() {
      const vm = this;
      this.$refs.sendToDevice.validate((valid) => {
        if (valid) {
          let {deviceid, userList} = this.sendToDevice;
          vm.loading = true;
          request({
            url: '/device/sync/syncUserManual',
            param: {
              deviceid,
              userList,
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
              vm.$message({
                message: vm.$t('message.MESSAGE.sendSuccess'),
                type: 'success',
                duration: 1500
              })
              vm.resetForm('sendToDevice')
            }else{
              vm.$message({
                message: vm.$t('message.MESSAGE.sendErr'),
                type: 'error',
                duration: 1500
              })
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取设备列表
    getDeviceList() {
      const vm = this;
      if(this.deviceList.length > 0){
        return;
      }
      // vm.loading = true;
      request({
        url: '/device/list',
        param: {
          pageSize: 999,
          pageNum: 1
        },
        method: 'get',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        // vm.loading = false;
        if(res.code === 200){
          let data = res.data;
          vm.deviceList = data.query;
        }
      });
    },
    // 获取管理员
    getUserList() {
      const vm = this;
      // const { realname, cardno, irisRegistered } = this.searchData;
      vm.loading = true;
      request({
        url: '/user/list',
        param: {
          pageNum: vm.pageNum,
          pageSize: vm.pageSize,
          department: vm.selectChildId
          // startAt: '',
          // endAt: '',
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
          vm.tableData = data.query;
          vm.total = data.total;
        }
      });
    },
    // 创建部门
    createChild(data) {
      const vm = this;
      // vm.loading = true;
      // vm.isClick = true;
      data.parentid = this.selectChildId || '';
      // console.log(data);
      // return
       request({
        url: '/organization/create',
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
          vm.$message({
            message: vm.$t('message.MESSAGE.createSuccess'),
            type: 'success',
            duration: 1000,
          });
          vm.createChildDialog = false;
          vm.getChildList();
        }else if(code === 400){
          vm.$message({
            message: res.msg,
            type: 'error',
            duration: 1000,
          });
        }
      });
    },
    // 创建用户
    createUser(data) {
      const vm = this;
      const {
        realname, // 姓名
        department, // 部门
        empno, // 工号
        position, // 职位
        email, // 邮箱
        phone, // 手机
        // password, // 密码
      } = this.createForm;
      vm.loading = true;
      vm.isClick = true;
       request({
        url: '/user/create',
        param:  {
          realname,
          department,
          empno,
          position,
          email,
          phone,
          // password: MD5(password),
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
          vm.$message({
            message: vm.$t('message.MESSAGE.createSuccess'),
            type: 'success',
            duration: 1000,
          });
          vm.dialogFormVisible = false;
          vm.getUserList();
        }
      });
    },
    // 更新用户
    updateUser(data, status = false) {
      // console.log(data)
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
       request({
        url: '/user/update',
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
            vm.getUserList();
          }
          vm.$message({
            message: vm.$t('message.MESSAGE.editSuccess'),
            type: 'success',
            duration: 1500,
          });
        }
      });
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
    // 选择文件
    handleChangeFile(e, formName) {
      // console.log(e)
      let ele = e.target;
      let name = ele.dataset.name;
      if(ele.files.length === 0){
        this[formName][name] = '';
      }else{
        if(ele.files[0].size > this.defaultFileSize){
          this.$alert('上传文件大小不得超过 15kb', '温馨提示', {
            confirmButtonText:  this.$t('message.BUTTON.ok'),
            callback: action => {
              this.$refs[name].value = '';
              this[formName][name] = '';
            }
          });
        }else{
          this[formName][name] = ele.files[0];
        }
      }
    },
    // 清除文件
    handleClearFile(formName, ref) {
      this.$refs[ref].value = '';
      this[formName][ref] = '';
    },
    importPeopleFile(data) {
      // data.dataType = '1';
      var formData = new FormData();
      formData.append("peopleFile", data.peopleFile);
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
       request({
        url: '/user/import',
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
            message: vm.$t('message.MESSAGE.importSuccess'),
            type: 'success',
            duration: 1000,
          });
          vm.importFormVisible = false;
        }
        // console.log(res);
      });
    }
  },
}
</script>
<style lang="scss">
.organize{
  .el-form{
    // overflow: hidden;
    clear: both;
    .organize-item>.el-input .el-input__inner{
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
.organize{
  .child-list{
    li{
      text-align:left;
      text-indent: 10px;
      line-height:50px;
      border-bottom:1px solid #ededed;
      cursor: pointer;
      &:last-child{
        border-bottom:0;
      }
    }
    .active{
      background:#5B90F0;
      color:#fff;
    }
  }
  .data-flex{
    height:800px;
    .tree-wrap, .table-content{
      height:100%;
    }
    .table-content{
      padding:0;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      background:none;
      .table-wrap{
        padding:0 10px;
        -webkit-box-flex:1;
        background:#fff;
      }
    }
    .group-wrap{
      background:#fff;
      padding:0 10px;
      margin-bottom:20px;
      .title{
        margin-bottom:0;
      }
    }
  }
  .organize-item{
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

