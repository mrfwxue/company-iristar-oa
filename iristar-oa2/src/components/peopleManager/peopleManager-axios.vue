<template>
  <div class="peopleManager" v-loading.fullscreen="loading">
    <div class="search-wrap box-shadow">
      <div class="item">
        <label>{{$t("message.TABLE.name")}}：</label>
        <el-input size="mini" clearable v-model="searchData.realname" :placeholder="$t('message.INPUT.input')"></el-input>
      </div>
      <div class="item">
        <label>{{$t("message.TABLE.empno")}}：</label>
        <el-input size="mini" clearable v-model="searchData.empno" :placeholder="$t('message.INPUT.input')"></el-input>
      </div>
      <div class="item">
        <label>{{$t('message.TABLE.isSignFace')}}：</label>
        <el-select v-model="searchData.faceRegistered" size="mini" clearable :placeholder="$t('message.INPUT.select')">
          <el-option
            v-for="item in irisRegistered"
            :key="item.val"
            :label="$t('message.INPUT.'+item.name)"
            :value="item.val">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>{{$t("message.TABLE.isSignEye")}}：</label>
        <el-select v-model="searchData.irisRegistered" size="mini" clearable :placeholder="$t('message.INPUT.select')">
          <el-option
            v-for="item in irisRegistered"
            :key="item.val"
            :label="$t('message.INPUT.'+item.name)"
            :value="item.val">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-button round size="mini" type="primary" @click="handleSearch">{{$t('message.BUTTON.search')}}</el-button>
        <!-- <el-button round size="mini" type="primary" @click="searchFn">重置</el-button> -->
      </div>
    </div>
    <div class="data-content box-shadow">
      <div class="title-operate-btn">
        <el-button round size="mini" @click="showCreate" type="primary">{{$t('message.BUTTON.add')}}</el-button>
        <el-button v-if="permission" round size="mini" @click="deleteArr" type="primary">{{$t('message.BUTTON.delArr')}}</el-button>
        <el-button round size="mini" @click="sendArr" type="primary">{{$t('message.BUTTON.sendArr')}}</el-button>
        <el-button round size="mini" @click="showImport" type="primary">{{$t('message.BUTTON.import')}}</el-button>
      </div>
      <div class="data-flex">
        <div class="tree-wrap">
          <TreeTitle></TreeTitle>
          <el-tree :data="treeData" check-on-click-node :highlight-current="showLight" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          <!-- <el-tree :data="treeData" show-checkbox :props="defaultProps" @check-change="handleCheckChange"></el-tree> -->
        </div>
        <div class="table-content">
          <div class="table-wrap">
            <p class="title">{{$t('message.PEOPLEMANAGER.name')}}</p>
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
                        <el-dropdown-item :command="[scope.row, '虹膜']">{{$t('message.BUTTON.eye')}}</el-dropdown-item>
                        <el-dropdown-item :command="[scope.row, '人脸']">{{$t('message.BUTTON.face')}}</el-dropdown-item>
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
      <el-dialog :title="$t('message.BUTTON.add')" width="375px" @close="resetForm('createForm')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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
      <el-dialog :title="$t('message.BUTTON.edit')" width="375px" @close="resetForm('updateForm')" :visible.sync="updateFormVisible" :close-on-click-modal="false">
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
            <div class="peopleManager-item">
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
        <el-form :model="importForm" :rules="importRules" ref="importForm" :label-width="formLabelWidth" size="mini">
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
      <el-dialog
        :visible.sync="eyeDialogVisible"
        @close="resetForm()"
        :close-on-click-modal="false"
        width="50%">
        <div class="eye-wrap" v-show="shishicaiji">
          <el-row :gutter="20">
            <el-col :span="24"><div class="grid-content bg-purple leftImg"><img :src="imgUrl" alt=""></div></el-col>
          </el-row>
        </div>
        <div class="eye-wrap" v-show="!shishicaiji">
          <el-row :gutter="20">
            <el-col :span="12"><div class="grid-content bg-purple leftImg" ref="leftImg"><img :src="leftImg" alt=""></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple rightImg" ref="rightImg"><img :src="rightImg" alt=""></div></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" type="primary" @click="regEye">{{$t('message.BUTTON.reg')}}</el-button>
          <el-button round size="mini" type="primary" @click="restartCaiji('0')">{{$t('message.BUTTON.caiji')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="faceDialogVisible"
        @close="resetForm()"
        :close-on-click-modal="false"
        width="30%">
        <div class="eye-wrap" v-show="shishicaiji">
          <el-row :gutter="20">
            <el-col :span="24"><div class="grid-content bg-purple faceImg"><img :src="imgUrl" alt=""></div></el-col>
          </el-row>
        </div>
        <div class="eye-wrap" v-show="!shishicaiji">
          <el-row :gutter="20">
            <el-col :span="24"><div class="grid-content bg-purple faceImg"><img :src="faceImg" alt=""></div></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" type="primary" @click="regFace">{{$t('message.BUTTON.reg')}}</el-button>
          <el-button round size="mini" type="primary" @click="restartCaiji('1')">{{$t('message.BUTTON.caiji')}}</el-button>
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
  name: 'peopleManager',
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
      loading: false,
      isClick: false,
      eyeDialogVisible: false,
      faceDialogVisible: false,
      permission: '', // 管理员权限
      defaultProps: {
        children: 'last',
        label: 'name'
      },
      searchData: {
        realname: '',
        empno: '',
        faceRegistered: '',
        irisRegistered: '',
      },
      selectChildId: '',
      showLight: true,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      updateFormVisible: false,
      formLabelWidth: '95px',
      leader: [
        {name: 'yes', val: 1},
        {name: 'no', val: 0}
      ],
      irisRegistered: [ // 注册虹膜
        {name: 'yes', val: 1},
        {name: 'no', val: 0}
      ],
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
      fileTableVisible: false,
      defaultFileSize: 1024 * 15, // 15kb
      importForm: {
        peopleFile: '',
      },
      importRules: {
        peopleFile: [
          { required: false, validator: checkPeopleFile, trigger: 'change' }
        ],
      },
      importFormVisible: false,
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
      },
      ws: null,
      imgUrl: null,
      faceImg: '',
      leftImg: '',
      rightImg: '',
      updateData: {
        // id: '',
        // sn: '', // 设备sn
        bioType : '', // 0：虹膜，1：人脸，2：虹膜+人脸
        isExtracted : 0, // 0：没有提取特征 1：提取特征
        realname: '', // 用户名
        leftEyeStatus: 0, // 左眼状态
        leftEyeImg: '', // Base64左眼图像
        leftEyeScore: '', // 左眼分数
        // leftFeature: '', // 左眼特征
        rightEyeStatus: 0, // 右眼状态
        rightEyeImg: '', // Base64右眼图像
        rightEyeScore: '', // 右眼分数
        // rightFeature: '', // 右眼特征
        faceImg: '', // Base64人脸图像
        faceScore: '', // 人脸分数
        // faceFeature: '', // 人脸特征
      },
      shishicaiji: false,
    }
  },
  created() {
    // this.getNation();
    let permission = Number(localStorage.getItem('permission'));
    this.permission = permission === 0 || permission === 1;
    // this.getCareerType();
    this.getUserList();
    this.setWebSocket();
    // this.treeBlur();
  },
  mounted() {
    this.onScreenChange();
  },
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
    // websocket
    setWebSocket() {
      let vm = this;
      let ROOT_URL = '';
      if(process.env.NODE_ENV === 'development'){
        ROOT_URL = root_config.development; // 开发环境
      }else{
        ROOT_URL = root_config.product; // 服务器环境
      }
      this.ws = new WebSocket('ws://'+root_config.ws);
      // 连接
      this.ws.onopen = res => {
        console.log('连接成功');
      }
      // 接受数据
      this.ws.onmessage = res => {
        // console.log('接受数据-----------', res);
        // console.log('接受数据-----------', res.data.split(" "));
        if((typeof res.data).toLocaleLowerCase() !== 'string') {
          vm.imgUrl = URL.createObjectURL(res.data);
          vm.shishicaiji = true;
        }else{
          let data = JSON.parse(res.data);
          vm.shishicaiji = false;
          if(data.code == 200) {
            vm.faceImg = data.data.faceImg ? imgBase64+data.data.faceImg : '';
            vm.leftImg = data.data.leftEyeImg ? imgBase64+data.data.leftEyeImg : '';
            vm.rightImg = data.data.rightEyeImg ? imgBase64+data.data.rightEyeImg : '';
            vm.updateData.faceImg = data.data.faceImg || '';
            vm.updateData.leftEyeImg = data.data.leftEyeImg || '';
            vm.updateData.rightEyeImg = data.data.rightEyeImg || '';
            vm.updateData.leftEyeStatus = data.data.leftEyeImg ? 0 : 1
            vm.updateData.rightEyeStatus = data.data.rightEyeImg ? 0 : 1
            vm.updateData.faceScore = data.data.faceScore;
            vm.updateData.leftEyeScore = data.data.leftEyeScore;
            vm.updateData.rightEyeScore = data.data.rightEyeScore;
            this.$nextTick(() => {
                // let left = vm.$refs['leftImg'];
                // let right = vm.$refs['rightImg'];
                // console.log(left.clientHeight)
                // console.log(right.clientHeight)
              if(vm.leftImg) {
                right.style.height = left.clientHeight + 'px'
              }
              if(vm.rightImg) {
                // let left = vm.$refs['leftImg'];
                // let right = vm.$refs['rightImg'];
                // console.log(left.clientHeight)
                // console.log(right.clientHeight)
                left.style.height = right.clientHeight + 'px'
              }
            })
          }else{
            this.$message({
              message: `图片获取失败，${data.msg}`,
              type: 'error',
              duration: 1500,
            });
          }
          console.log(JSON.parse(res.data))
        }
        // try{
        //   console.log('JSON.parse-----------', JSON.parse(res.data));
        //   let data = JSON.parse(res.data);
        //   if(data.code === 200){
        //     // vm.recData = data.data.recognitionData;
        //     // vm.regData = data.data.registerData;
        //     // vm.result.code = data.code;
        //     // vm.result.msg = data.msg;
        //     // vm.clearDataTimer = setTimeout(() => {
        //     //   vm.resetData()
        //     // }, vm.timeout * 1000);
        //   }
        // }catch(err){}
      }
      // 连接错误
      this.ws.onerror = res => {
        console.log('连接错误', res);
      }
      // 关闭连接
      this.ws.onerror = res => {
        console.log('关闭连接');
      }
    },
    //屏幕尺寸变化
    onScreenChange() {
      const vm = this;
      window.onresize = function() {
        if(vm.eyeDialogVisible) {
          let left = vm.$refs['leftImg'];
          let right = vm.$refs['rightImg'];
          if(vm.leftImg) {
            right.style.height = left.clientHeight + 'px'
          }
          if(vm.rightImg) {
            left.style.height = right.clientHeight + 'px'
          }
        }
        // if(vm.faceDialogVisible) {
        //   let face = vm.$refs['faceImg'];
        //   face.style.height = face.clientWidth*(2/3) + 'px'
        // }
      }
    },
    // 部门失焦
    // treeBlur() {
    //   const vm = this;
    //   document.onclick = function(e) {
    //     vm.selectChildId = '';
    //     vm.showLight = false;
    //   }
    // },
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
    changeCreateChild(val) {
      if(val.length) {
        this.createForm.department = val[val.length-1]
      }else{
        this.createForm.department = ''
      }
    },
    changeUpdateChild(val) {
      if(val.length) {
        this.updateForm.department = val[val.length-1]
      }else{
        this.updateForm.department = ''
      }
    },
    handleNodeClick(data) {
      this.selectChildId = data.id;
      this.showLight = true;
    },
    // 获取职位
    getCareerType() {
      const vm = this;
      // vm.loading = true;
      if(vm.careerList.length > 0) return
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
    // 获取民族
    getNation() {
      const vm = this;
      // vm.loading = true;
      request({
        url: '/common/nationList',
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
          vm.createForm.nation.data = data;
          vm.updateForm.nation.data = data;
        }
      });
    },
    // 更多操作
    handleCommand(command) {
      // console.log(command);
      let row = command[0];
      let txt = command[1];
      this.updateData.userid = row.userid;
      this.updateData.realname = row.realname;
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
      if(txt === '虹膜') {
        this.eyeFn(row)
      }
      if(txt === '人脸') {
        this.faceFn(row)
      }
    },
    restartCaiji(type) {
      let obj = `{"func":"openDevice","bioType":${Number(type)}}`;
      this.ws.send(obj)
    },
    eyeFn(row) {
      if(this.ws.readyState == 1) {
        this.eyeDialogVisible = true;
        // this.$nextTick(() => {
        //   let left = this.$refs['leftImg'];
        //   let right = this.$refs['rightImg'];
        //   left.style.height = left.clientWidth*(2/3) + 'px'
        //   right.style.height = left.clientWidth*(2/3) + 'px'
        // })
        let obj = '{"func":"openDevice","bioType":0}'
        this.ws.send(obj)
      }else{
        this.$message({
          message: 'websocket 连接失败',
          type: 'error',
          duration: 1500,
        });
        this.ws = new WebSocket('ws://'+root_config.ws);
      }
    },
    faceFn(row) {
      if(this.ws.readyState == 1) {
        let obj = '{"func":"openDevice","bioType":1}'
        this.ws.send(obj)
        this.faceDialogVisible = true;
      }else{
        this.$message({
          message: 'websocket 连接失败',
          type: 'error',
          duration: 1500,
        });
        this.ws = new WebSocket('ws://'+root_config.ws);
      }
      // this.$nextTick(() => {
      //   let face = this.$refs['faceImg'];
      //   face.style.height = face.clientWidth*(2/3) + 'px'
      // })
    },
    regFace() {
      this.updateData.bioType = 1;
      this.regEyeOrFace(this.updateData)
    },
    regEye() {
      this.updateData.bioType = 0;
      this.regEyeOrFace(this.updateData)
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
    // 获取管理人员类型
    getManagerTypeList(fromName) {
      const vm = this;
      if(this[fromName].managerType.data.length > 0){
        return;
      }
      // vm.loading = true;
      request({
        url: '/common/managerTypeList',
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
          vm[fromName].managerType.data = data;
        }
      });
    },
    // 获取职称列表
    getTitleList(fromName) {
      const vm = this;
      if(this[fromName].title.data.length > 0){
        return;
      }
      // vm.loading = true;
      request({
        url: '/common/titleList',
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
          vm[fromName].title.data = data;
        }
      });
    },
    showCreate() {
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
          }else if(formName === 'editPwdForm'){
            from = vm.editPwdForm;
            cbfn = vm.editPwd;
          }else{
            from = vm.importForm;
            cbfn = vm.importPeopleFile;
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
      if(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
        this.updateFormVisible = false;
        this.deviceVisible = false;
        this.importFormVisible = false;
        this.editDialogVisible = false;
      }else{
        if(this.ws.readyState == 1) {
          let obj = '{"func":"closeDevice"}'
          this.ws.send(obj)
        }
      }
      try{
        this.handleClearFile('importForm', 'peopleFile')
      }catch(e){}
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
      const { realname, empno, faceRegistered, irisRegistered } = this.searchData;
      vm.loading = true;
      request({
        url: '/user/list',
        param: {
          pageNum: vm.pageNum,
          pageSize: vm.pageSize,
          department: vm.selectChildId || '',
          realname,
          empno,
          faceRegistered,
          irisRegistered,
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
        param: {
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
    // 注册虹膜 或 人脸
    regEyeOrFace(data, status = false) {
      // console.log(data)
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
       request({
        url: '/bio/register',
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
            vm.eyeDialogVisible = false;
            vm.faceDialogVisible = false;
            vm.getUserList();
          }
          vm.$message({
            message: vm.$t('message.MESSAGE.submitSuccess'),
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
          vm.fomartObj(res.data)
          vm.importFormVisible = false;
        }
      });
    },
    // 是否有导入失败的数据
    fomartObj(json) {
      let keys = Object.keys(json);
      if(keys.length) {
        let html = '';
        for(let i in json) {
          html += `<p><span>${i}</span>：${json[i]}</p>`
        }
        this.$alert(html, this.$t('message.MESSAGE.failInfoTitle'), {
          dangerouslyUseHTMLString: true
        });
      }
    }
  },
}
</script>
<style lang="scss">
.peopleManager{
  .el-form{
    // overflow: hidden;
    clear: both;
    .peopleManager-item>.el-input .el-input__inner{
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
.peopleManager{
  .bg-purple{
    background:#ccc;
  }
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
}
.faceImg{
  height:auto;
  img{
    width:100%;
  }
}
.leftImg{
  height:auto;
  img{
    width:100%;
  }
}
.rightImg{
  height:auto;
  img{
    width:100%;
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

