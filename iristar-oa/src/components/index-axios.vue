<template>
  <div class="index">
    <div class="slide">
      <div class="logo-wrap"><img src="@/assets/img/slide/logo.png" alt=""></div>
      <el-menu
        :default-active="default_active_menu"
        class="el-menu-vertical-demo"
        background-color="#404040"
        text-color="#999"
        active-text-color="#5B90F0"
        unique-opened
        router
      >
        <el-menu-item v-for="(menu, m) in slide_menu" :index="menu.url" :key="m">
          <div v-show="default_active_menu !== menu.url" class="icon"><i class="el-icon-my-set-icon"><img :src="menu.icon" alt=""></i></div>
          <div v-show="default_active_menu === menu.url" class="icon"><i class="el-icon-my-set-icon"><img :src="menu.iconed" alt=""></i></div>
          <div class="text"><span slot="title">{{$t("message."+menu.name)}}</span></div>
        </el-menu-item>
      </el-menu>
      <el-button round @click="logout" style="margin-top:20px;" size="mini">{{$t("message.INDEX.logout")}}</el-button>
    </div>
    <div class="right-container">
      <div class="top">
        <h2 class="title">{{title}}</h2>
        <div class="right-top-operate">
          <div class="lang-locale" style="width:60px;">
            <el-select v-model="lang" size="mini" :placeholder="$t('message.INPUT.select')">
              <el-option
                v-for="item in langArr"
                :key="item.val"
                :label="item.name"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <div class="avatar">
            <el-avatar size="medium" icon="el-icon-user-solid"></el-avatar>
            <span style="display:block;">{{adminName}}</span>
          </div>
          <!-- <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              下载<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="使用手册">使用手册</el-dropdown-item>
              <el-dropdown-item command="模板">模板</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button round type="text" @click="downloadDoc('userTemplate')">{{$t('message.INDEX.downloadDoc')}}</el-button>
          <!-- <div><el-button round type="text" @click="logout">{{$t("message.INDEX.logout")}}</el-button></div> -->
          <div><el-button round type="text" @click="showEditDialog">{{$t("message.INDEX.editPwd")}}</el-button></div>
        </div>
      </div>
      <el-dialog :title="$t('message.INDEX.editPwd')" width="375px" @close="resetForm('editPwdForm')" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="editPwdForm" status-icon :rules="rules" ref="editPwdForm" label-width="100px" class="demo-editPwdForm" size="mini">
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
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import MD5 from 'md5';
import request from "@/axios/axios";
export default {
  name: 'index',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('message.MESSAGE.pwdAgain')));
      } else if (value !== this.editPwdForm.newPass) {
        callback(new Error(this.$t('message.MESSAGE.pwdNoSame')));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      isClick: false,
      showAdmin: false,
      adminName: '',
      lang: '',
      langArr: [
        {name: '中', val: 'zh'},
        {name: 'En', val: 'en'},
        {name: '繁', val: 'zhtw'},
      ],
      defaultMenus: [
        {
          name: 'HOME.name',
          val: '1',
          url: 'home',
          icon: require('@/assets/img/slide/home.png'),
          iconed: require('@/assets/img/slide/homed.png'),
        },
        {
          name: 'CAMERA.name',
          val: '2',
          url: 'camera',
          icon: require('@/assets/img/slide/camera.png'),
          iconed: require('@/assets/img/slide/cameraed.png'),
        },
        {
          name: 'DEVICESTATUS.name',
          val: '3',
          url: 'deviceStatus',
          icon: require('@/assets/img/slide/device.png'),
          iconed: require('@/assets/img/slide/deviced.png'),
        },
        {
          name: 'PEOPLEMANAGER.name',
          val: '4',
          url: 'peopleManager',
          icon: require('@/assets/img/slide/people.png'),
          iconed: require('@/assets/img/slide/peopled.png'),
        },
        {
          name: 'WORKLOG.name',
          val: '5',
          url: 'workLog',
          icon: require('@/assets/img/slide/work.png'),
          iconed: require('@/assets/img/slide/worked.png'),
        },
        {
          name: 'THROUGHLOG.name',
          val: '6',
          url: 'throughLog',
          icon: require('@/assets/img/slide/log.png'),
          iconed: require('@/assets/img/slide/loged.png'),
        },
        {
          name: 'SYNCLOG.name',
          val: '7',
          url: 'syncLog',
          icon: require('@/assets/img/slide/same.png'),
          iconed: require('@/assets/img/slide/samed.png'),
        },
        {
          name: 'USERMANAGER.name',
          val: '8',
          url: 'userManager',
          icon: require('@/assets/img/slide/user.png'),
          iconed: require('@/assets/img/slide/usered.png'),
        },
        {
          name: 'ORGANIZE.name',
          val: '9',
          url: 'organize',
          icon: require('@/assets/img/slide/organize.png'),
          iconed: require('@/assets/img/slide/organized.png'),
        },
      ],
      slide_menu: [],
      default_active_menu: '',
      nav_bar: [],
      nav_bar_default_value: '',
      title: '',
      editDialogVisible: false,
      editPwdForm: {
        oldPass: '',
        newPass: '',
        okNewPass: '',
      },
      rules: {
        oldPass: [
          { required: true, message: this.$t('message.MESSAGE.inputPwd'), trigger: 'blur' },
          { min: 3, max: 18, message: this.$t('message.MESSAGE.lengthErr'), trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: this.$t('message.MESSAGE.inputPwd'), trigger: 'blur' },
          { min: 3, max: 18, message: this.$t('message.MESSAGE.lengthErr'), trigger: 'blur' }
        ],
        okNewPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // let isLogin = localStorage.getItem('isLogin') === 'true';
    // if(!isLogin){
    //   this.logout();
    //   return;
    // }
    // let menus = JSON.parse(localStorage.getItem('menus'));
    // let arr = [];
    // for(let i=0; i<menus.length; i++){
    //   let menu = menus[i];
    //   this.defaultMenus.map(item => {
    //     if(item.url === menu.url){
    //       arr.push(item);
    //     }
    //   })
    // }
    this.adminName = localStorage.getItem('username');
    this.lang = localStorage.getItem('lang-locale');
    this.$i18n.locale = this.lang;
    this.slide_menu = this.defaultMenus;
    this.default_active_menu = this.$route.name;
    this.nav_bar_default_value = this.$route.name;
    let tree = this.$store.state.treeData;
    if(tree.length === 0){
      this.getTreeData();
    }
    this.title = document.getElementsByTagName('title')[0].innerText;
    this.getTreeTopTitle();
  },
  mounted() {
    const vm = this;
  },
  computed: {
  },
  watch: {
    $route() {
      this.default_active_menu = this.$route.name;
      this.nav_bar_default_value = this.$route.name;
    },
    lang() {
      this.$i18n.locale = this.lang;
      localStorage.setItem('lang-locale', this.lang);
      document.getElementsByTagName('title')[0].innerText = this.$t("message.INDEX.title");
      this.title = this.$t("message.INDEX.title");
    },
  },
  methods: {
    // 获取树形顶部title
    getTreeTopTitle() {
      const vm = this;
      request({
        url: '/organization/versionList',
        param: {},
        method: 'get',
        onError: err => {
        },
        vm,
      }).then(res => {
        // console.log(res)
        let code = res.code;
        let title = '';
        let id = '';
        if(code === 200) {
          title = res.data[0].company;
          id = res.data[0].id;
        }
        vm.$store.dispatch('setTreeTitle', title)
        vm.$store.dispatch('setTreeTitleId', id)
      });
    },
    // 获取树形 数据
    getTreeData() {
      const vm = this;
      // let data = localStorage.getItem('treeData');
      // vm.$store.dispatch('setTreeData', JSON.parse(data))
      // return;
      request({
        url: '/organization/list',
        param: {},
        method: 'get',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res)
        let code = res.code;
        let data = [];
        if(code === 200) {
          data = res.data;
        }
        vm.$store.dispatch('setTreeData', data)
        // localStorage.setItem('treeData', JSON.stringify(data))
      });
    },
    logout() {
      const vm = this;
      request({
        url: '/admin/logout',
        param: {},
        method: 'post',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res)
      });
      // localStorage.clear();
      this.$router.push({
        name: 'login'
      })
    },
    // 更多操作
    handleCommand(command) {
      // console.log(command);
      if(command === '使用手册') {
        this.downloadDoc('manual');
      }
      if(command === '模板') {
        this.downloadDoc('userTemplate');
      }
    },
    // 下载使用手册
    downloadDoc(name) {
      const vm = this;
      let ROOT_URL = '';
      if(process.env.NODE_ENV === 'development'){
        ROOT_URL = root_config.development; // 开发环境
      }else{
        ROOT_URL = root_config.product; // 服务器环境
      }
      window.open(ROOT_URL+'/home/download?name='+name);
    },
    // 显示版本号
    showVersion() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/home/version',
        param: {},
        method: 'get',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        vm.loading = false;
        let code = res.code;
        if(code === 200) {
          vm.$alert('当前版本 '+res.data.version, '版本号', {
            confirmButtonText: '确定',
            center: true,
            callback: action => {
              //
            }
          });
        }else{
          vm.$message({
            message: '版本获取失败，请重试',
            type: 'error',
            duration: 1000
          })
        }
      });
    },
    showEditDialog() {
      this.editDialogVisible = true;
    },
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.editPwd()
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editDialogVisible = false;
    },
    editPwd() {
      const vm = this;
      let {
        oldPass,
        newPass,
      } = this.editPwdForm;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/admin/changePassword',
        param: {
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
          vm.$router.push({
            name: 'login'
          })
        }
      });
    }
  },
}
</script>
<style lang="scss">
.index{
  .el-menu{
    border-right:none;
  }
  .slide{
    .el-icon-arrow-down::before{
      content:"\E790";
    }
    i{
      color:#999!important;
    }
  }
  .el-submenu__title, .el-menu-item{
    // text-align:left;
    height:auto;
    // line-height:65px;
    line-height: inherit;
    margin-bottom:25px;
    div{
      display:block;
      text-align:center;
    }
    div.text{
      span{
        display:inline-block;
        width:100%;
        white-space: pre-wrap;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.index{
  width:100%;
  height:100%;
  // display:-webkit-box;
  clear: both;
  .slide{
    width:150px;
    height:100%;
    background:#404040;
    overflow-y:auto;
    float: left;
    .logo-wrap{
      width:97px;
      margin: 7px 0 40px 20px;
      img{
        width:100%;
      }
    }
    .el-icon-my-set-icon{
      margin-right:0;
      width:30px;
      margin-bottom: 8px;
      img{
        width:30px;
        height:30px;
        display:block;
      }
    }
  }
  .right-container{
    // -webkit-box-flex:1;
    // width:auto;
    // padding-left:200px;
    background:#f2f2f2;
    height:100%;
    overflow-y: auto;
    position: relative;
    .top{
      // text-align:right;
      // width:100%;
      // padding-right:20px;
      // height:50px;
      // line-height: 50px;
      // position: absolute;
      // left:0;
      // top:0;
      background:#fff;
      height:50px;
      .title{
        position: absolute;
        left:10px;
        top:0;
        height:50px;
        line-height:50px;
        font-weight:normal;
        letter-spacing: 4px;
        font-size:16px;
      }
      .right-top-operate{
        position: absolute;
        right:10px;
        top:0;
        height:50px;
        font-weight:normal;
        letter-spacing: 2px;
        font-size:16px;
        display:-webkit-box;
        -webkit-box-align:center;
        .avatar{
          height:36px;
          padding-right:23px;
          display:-webkit-box;
          -webkit-box-align:center;
          >span{
            margin-left:5px;
          }
        }
      }
    }
    .view{
      // -webkit-box-flex:1;
      // height:100%;
      background:#f2f2f2;
      overflow-y:auto;
      padding:10px;
      // padding-top:60px;
      position: relative;
    }
  }
}
</style>