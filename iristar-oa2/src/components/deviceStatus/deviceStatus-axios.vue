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
    <div class="data-content box-shadow" v-show="!showSettingDevice">
      <div class="data-flex">
        <div class="tree-wrap">
          <p class="title">{{$t("message.DEVICESTATUS.name")}}</p>
          <el-tree
            :data="deviceTree"
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
            <p class="title">
              <el-button round size="mini" @click="showCreateChild" type="primary">{{$t('message.BUTTON.addGroup')}}</el-button>
              <el-button round size="mini" @click="showEditChild" type="primary">{{$t('message.BUTTON.editGroup')}}</el-button>
              <el-button round size="mini" @click="deleteChild" type="primary">{{$t('message.BUTTON.delGroup')}}</el-button>
            </p>
            <p class="no-result" v-if="childList.length === 0">{{$t('message.ORGANIZE.empty')}}</p>
            <ul class="child-list" v-else>
              <li v-for="(item, i) in childList" :key="i" :class="selectChildId === item.id ? 'active' : ''" @click="handleClickChild(item, $event)">{{item.name}}</li>
            </ul>
          </div>
          <div class="table-wrap">
            <p class="title">
              <!-- <el-button round size="mini" @click="showCreate" type="primary">{{$t("message.BUTTON.add")}}</el-button> -->
              <el-button round size="mini" @click="showCreate" type="primary">{{$t("message.BUTTON.addDevice")}}</el-button>
              <el-button round size="mini" @click="deviceSetting" type="primary">{{$t("message.BUTTON.deviceSetting")}}</el-button>
            </p>
            <el-table
              :data="tableData"
              size="mini"
              max-height="570px"
              header-row-class-name="check-header-row"
              :header-cell-class-name="setCellname"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
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
      </div>
      <!-- <div class="title-operate-btn">
        <el-button round size="mini" @click="showCreate" type="primary">{{$t("message.BUTTON.add")}}</el-button>
      </div> -->
      <!-- <div class="echart-table-wrap">
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
      </div> -->
      <el-dialog :title="$t('message.BUTTON.addDevice')" width="379px" @close="resetForm('createForm')" :visible.sync="createFormVisible">
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
          <!-- <el-form-item :label="$t('message.TABLE.selectGroup')" prop="group">
            <el-select v-model="createForm.group" size="mini" clearable :placeholder="$t('message.INPUT.select')">
              <el-option
                v-for="item in deviceTree"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->
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
          <!-- <el-form-item :label="$t('message.TABLE.selectGroup')" prop="group">
            <el-select v-model="updateForm.group" size="mini" clearable :placeholder="$t('message.INPUT.select')">
              <el-option
                v-for="item in deviceTree"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('updateForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('updateForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.BUTTON.addGroup')" width="379px" @close="resetForm('createChildForm')" :visible.sync="createChildDialog">
        <el-form :model="createChildForm" status-icon :rules="childRules" ref="createChildForm" label-width="100px" class="demo-createChildForm" size="mini">
          <el-form-item :label="$t('message.TABLE.groupName')" prop="groupName">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="createChildForm.groupName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.TABLE.selectDevice')" prop="device">
            <el-select v-model="createChildForm.device" multiple size="mini" clearable :placeholder="$t('message.INPUT.select')">
              <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.deviceName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('createChildForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('createChildForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="$t('message.BUTTON.editGroup')" width="379px" @close="resetForm('editChildForm')" :visible.sync="editChildDialog">
        <el-form :model="editChildForm" status-icon :rules="childRules" ref="editChildForm" label-width="100px" class="demo-editChildForm" size="mini">
          <el-form-item :label="$t('message.TABLE.groupName')" prop="groupName">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="editChildForm.groupName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center>
          <el-button round size="mini" @click="resetForm('editChildForm')">{{$t('message.BUTTON.cancel')}}</el-button>
          <el-button round size="mini" type="primary" @click="submitForm('editChildForm')">{{$t('message.BUTTON.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="setting-device" v-show="showSettingDevice">
      <div class="top">
        <div class="back"><el-button size="mini" @click="backTop">返回</el-button></div>
        <h2>{{deviceTitle}}</h2>
      </div>
      <W200 @returnTitle="getW200Title" @saveData="saveData" :deviceData="deviceData" v-if="deviceTag === 'W200' || deviceTag === 'M200B'"></W200>
      <S300 @returnTitle="getW200Title" :deviceData="deviceData" v-if="deviceTag === 'S300'"></S300>
      <S320 @returnTitle="getW200Title" @saveData="saveData" :deviceData="deviceData" v-if="deviceTag === 'S320' || deviceTag === 'S320T'"></S320>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import request from "@/axios/axios";
import W200 from './deviceTemplate/w200';
import S300 from './deviceTemplate/s300';
import S320 from './deviceTemplate/s320';
export default {
  name: 'deviceStatus',
  components: {
    W200,
    S300,
    S320,
  },
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
    var checkGroup = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.selectGroup')));
      }else{
        callback()
      }
    };
    var checkGroupName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.MESSAGE.inputGroupName')));
      }else{
        callback()
      }
    };
    var checkDevice = (rule, value, callback) => {
      if (value.length === 0) {
        return callback(new Error(this.$t('message.MESSAGE.selectDevice')));
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
        group: '',
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
        group: '',
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
        ],
        group: [
          { required: true, validator: checkGroup, trigger: 'change' },
        ]
      },
      permission: '', // 管理员权限
      deviceTree: [],
      defaultProps: {
        children: 'data',
        label: 'name'
      },
      showLight: true,
      childList: [],
      selectChildId: '',
      createChildDialog: false,
      editChildDialog: false,
      createChildForm: {
        groupName: '',
        device: []
      },
      editChildForm: {
        groupName: '',
      },
      childRules: {
        groupName: [
          { required: true, validator: checkGroupName, trigger: 'blur' },
        ],
        device: [
          { required: true, validator: checkDevice, trigger: 'change' },
        ],
      },
      checkedArr: [], // 选中的设备
      showSettingDevice: false,
      deviceTitle: '',
      deviceTag: '',
      deviceData: null,
    }
  },
  created() {
    let permission = Number(localStorage.getItem('permission'));
    this.permission = permission === 0 || permission === 1;
    // this.permission = true;
    this.dataForm = this.createForm;
  },
  mounted() {
    this.getDeviceType();
    this.getDataList();
    // this.getDeviceGroup();
    // this.formatData();
  },
  computed: {},
  watch: {},
  methods: {
    backTop() {
      this.showSettingDevice = false;
      this.deviceTag = '';
    },
    //
    getW200Title(val) {
      this.deviceTitle = val;
    },
    saveData(data) {
      const vm = this;
      this.showSettingDevice = false;
      let paramData = null;
      if(this.deviceTag === 'W200') {
        let face = data.model.face;
        let eye = data.model.eye;
        // 0：虹膜，1：人脸，2：虹膜+人脸
        let bioType = '';
        if(face.val && eye.val) {
          bioType = 2;
        }else if(face.val) {
          bioType = 1;
        }else{
          bioType = 0;
        }
        paramData = {
          bioType: bioType,
          faceThreshold: face.yuzhi, // 人脸采集阈值
          irisThreshold: eye.yuzhi, // 虹膜采集阈值
          bioLivenessCheckEnabled: data.model.livingCheck ? 1 : 0, // 0：不启用活体检测1：启用
          cosmeticLenseCheckEnabled: data.model.eyeCheck ? 1 : 0, // 0：不启用美瞳检测1：启用
          
          whileLight: data.param.whiteLight, // 白光亮度值
          redLight: data.param.redLight, // 红光亮度值
          faceMinTofThreshold: data.param.faceDis.min, // 人脸采集最小距离值
          faceMaxTofThreshold: data.param.faceDis.max, // 人脸采集最大距离值
          irisMinTofThreshold: data.param.eyeDis.min, // 虹膜采集最小距离值
          irisMaxTofThreshold: data.param.eyeDis.max, // 虹膜采集最大距离值
        }
      }else{
        paramData = data;
      }
      let snList = [];
      for(let i in this.checkedArr) {
        snList.push(this.checkedArr[i].sn)
      }
      this.loading = true;
      this.isClick = true;
      this.deviceTag = '';
      request({
        url: '/device/sync/updDeviceConfig',
        param: {
          snList,
          config: JSON.stringify(paramData)
        },
        method: 'post',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res)
        vm.loading = false;
        vm.isClick = false;
        if(res.code === 200){
          let data = res.data;
        }
      });
    },
    deviceSetting() {
      if(this.checkedArr.length === 0) {
        this.$message({
          message: this.$t('message.TABLE.selectDevice'),
          type: 'warning',
          duration: 1500,
        })
        return
      }
      let val = this.checkedArr[0].deviceType;
      if(this.checkedArr.length > 1) {
        // 100 W200, 101 S320, 102 300UC, 103 G91S
        let allSame = this.checkedArr.every(v => v.deviceType === val);
        if(!allSame) {
          this.$message({
            message: this.$t('message.TABLE.deviceTypeNoSame'),
            type: 'warning',
            duration: 1500,
          })
          return
        }
      }
      if(val == '103') return;
      if(this.checkedArr.length > 1) {
        this.getDeviceSettingTemplate(val)
      }else{
        this.getDeviceConfig(val)
      }
    },
    // 获取单个设备配置
    getDeviceConfig(type) {
      const vm = this;
      request({
        url: '/device/sync/getDeviceConfig',
        param: {
          sn: this.checkedArr[0].sn,
        },
        method: 'post',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res)
        // vm.loading = false;
        if(res.code === 200){
          let data = res.data;
          vm.deviceData = data;
          if(type == '100') {vm.deviceTag = 'W200'}
          if(type == '101') {vm.deviceTag = 'S320'}
          if(type == '102') {vm.deviceTag = 'S300'}
          if(type == '103') {vm.deviceTag = 'S320T'}
          if(type == '104') {vm.deviceTag = 'M200B'}
          if(type == '900') {vm.deviceTag = 'G91S'}
          // this.deviceTag = 'W200'
          vm.showSettingDevice = true;
        }
      });
    },
    // 获取模板
    getDeviceSettingTemplate(type) {
      const vm = this;
      request({
        url: '/device/getDeviceConfigTemplate',
        param: {
          deviceType: type
        },
        method: 'post',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res)
        // vm.loading = false;
        if(res.code === 200){
          let data = res.data;
          vm.deviceData = data;
          if(type == '100') {vm.deviceTag = 'W200'}
          if(type == '101') {vm.deviceTag = 'S320'}
          if(type == '102') {vm.deviceTag = 'S300'}
          // this.deviceTag = 'W200'
          vm.showSettingDevice = true;
        }
      });
    },
    // 选择行
    handleSelectionChange(val) {
      // console.log(val);
      this.checkedArr = val;
    },
    setCellname({row, column, rowIndex, columnIndex}) {
      if(column.type === "selection"){
        return 'check-wrap'
      }
      // console.log({row, column, rowIndex, columnIndex})
    },
    // 获取设备分组列表
    getDeviceGroup() {
      const vm = this;
      request({
        url: '/deviceCluster/list',
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
          let data = res.data;
          vm.deviceTree = data;
        }
      });
    },
    handleNodeClick(data) {
      this.showLight = true;
      this.childList = data.data || [];
      this.selectChildId = data.id;
      // console.log(data);
      this.editChildForm.groupName = data.name;
      // this.treeNodeId = data.$treeNodeId;
      // console.log(this.$refs.tree.getCurrentKey() === this.selectChildId);
    },
    handleClickChild(item, e) {
      // this.selectChildId = item.id
    },
    // 添加分组
    showCreateChild() {
      this.createChildDialog = true;
    },
    // 修改分组
    showEditChild() {
      if(!this.selectChildId){
        this.$message({
          message: this.$t('message.MESSAGE.selectEditGroup'),
          type: 'warning',
          duration: 1500,
        })
        return
      }
      this.editChildDialog = true;
    },
    createGroup(data) {
      let name = data.groupName;
      let deviceIds = data.device.join(',');
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/deviceCluster/create',
        param: {
          name,
          deviceIds
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
          vm.resetForm('createChildForm');
          vm.$message({
            message: vm.$t('message.MESSAGE.submitSuccess'),
            type: 'success',
            duration: 1500,
          });
          vm.getDeviceGroup();
        }
      });
    },
    editGroup(data) {
      let name = data.groupName;
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/deviceCluster/update',
        param: {
          deviceClusterTypeId: vm.selectChildId,
          name,
        },
        method: 'get',
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
          vm.resetForm('editChildForm');
          vm.$message({
            message: vm.$t('message.MESSAGE.submitSuccess'),
            type: 'success',
            duration: 1500,
          });
          vm.getDeviceGroup();
        }
      });
    },
    // 删除分组
    deleteChild(e) {
      if(!this.selectChildId){
        this.$message({
          message: this.$t('message.MESSAGE.selectDeleteGroup'),
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
          url: '/deviceCluster/delete',
          param: {
            deviceClusterTypeId: vm.selectChildId
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
            vm.getDeviceGroup();
            vm.childList = [];
            vm.selectChildId = '';
          }
        });
      }
      this.$alert(this.$t('message.MESSAGE.confirmDeleteGroup'), this.$t('message.MESSAGE.title'), {
        confirmButtonText:  this.$t('message.BUTTON.ok'),
        callback: action => {
          if(action === 'confirm'){
            // alert('已删除')
            deleteThisChild();
          }
        }
      });
    },
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
            try{
                if(vm[formName][i].val != undefined){
                data[i] = vm[formName][i].val;
              }
            }catch(e){}
          }
          if(formName === 'createForm'){
            url = '/device/create';
            data.deviceAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            vm.deviceReg(url, data, formName);
          }else if(formName === 'updateForm'){
            url = '/device/update';
            vm.deviceReg(url, data, formName);
          }else if(formName === 'createChildForm') {
            vm.createGroup(data);
          }else if(formName === 'editChildForm') {
            vm.editGroup(data);
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.createFormVisible = false;
      this.updateFormVisible = false;
      this.createChildDialog = false;
      this.editChildDialog = false;
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
.deviceStatus{
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
  .setting-device{
    .top{
      padding:20px;
      position: relative;
      .back{
        position: absolute;
        left:20px;
        top:20px;
      }
    }
  }
}
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

