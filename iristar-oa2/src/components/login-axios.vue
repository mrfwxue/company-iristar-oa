<template>
  <div class="login" v-loading.fullscreen="loading">
    <!-- <span class="icon">
      <img src="@/assets/img/login/logo.png" alt="">
    </span> -->
    <div class="content">
      <div class="bg"></div>
      <div class="login-wrap">
        <div class="lang-locale">
          <el-select v-model="lang" size="mini" :placeholder="$t('message.INPUT.select')">
            <el-option
              v-for="item in langArr"
              :key="item.val"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <span class="icon">
          <img src="@/assets/img/login/logo.png" alt="">
        </span>
        <h2 class="title">{{$t("message.LOGIN.title")}}</h2>
        <div class="item">
          <el-row>
            <el-col><div><el-input :placeholder="$t('message.LOGIN.username')" @change="changeUser" type="text" size="large" v-model="user" autocomplete="off"></el-input></div></el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row>
            <el-col><div><el-input :placeholder="$t('message.LOGIN.pwd')" @focus="pwd = ''" @change="changePwd" type="password" size="large" v-model="pwd" autocomplete="off"></el-input></div></el-col>
          </el-row>
        </div>
        <div class="item">
          <el-checkbox v-model="isMomery">{{$t('message.LOGIN.remeber')}}</el-checkbox>
        </div>
        <div class="item">
          <el-button round type="primary" @click="login" :disabled="isClick">{{$t('message.LOGIN.login')}}</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Copyright © 2017-2019 All Rights Reserved</p>
      <p>版权所有 天津中科虹星科技有限公司</p>
    </div>
  </div>
</template>
<script>
import request from "@/axios/axios";
export default {
  name: 'login',
  data() {
    return {
      lang: '',
      langArr: [
        {name: '中', val: 'zh'},
        {name: 'En', val: 'en'},
        {name: '繁', val: 'zhtw'},
      ],
      isClick: false, // 双击
      loading: false,
      user: '',
      pwd: '',
      enabledMomery: true, // 是否开启 记住密码
      isMomeryed: false,
      isMomery: true,
      momery_username: '',
      momery_pwd: '',
    }
  },
  created() {
    this.lang = localStorage.getItem('lang-locale');
    this.$i18n.locale = this.lang;
    // localStorage.clear();
    this.getUserPwd();
  },
  mounted() {
    const vm = this;
    document.onkeypress = function(e) {
      if(e.keyCode === 13){
        vm.login()
      }
    }
  },
  computed: {},
  watch: {
    lang() {
      this.$i18n.locale = this.lang;
      localStorage.setItem('lang-locale', this.lang);
      document.getElementsByTagName('title')[0].innerText = this.$t("message.INDEX.title");
      this.title = this.$t("message.INDEX.title");
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取记录的 user 和 pwd
    getUserPwd() {
      let user = localStorage.getItem('momery_username');
      if (this.enabledMomery) {
        if (user) {
          this.momery_username = user;
          let pwd = localStorage.getItem(user) || CryptoJS.MD5('').toString();
          if (pwd !== CryptoJS.MD5('').toString()) {
            // console.log(1)
            this.momery_pwd = pwd;
            this.isMomeryed = true;
          } else {
            this.momery_pwd = '';
            this.isMomeryed = false;
          }
        } else {
          this.momery_username = '';
        }
      } else {
        if (user) {
          this.momery_username = user;
          let pwd = localStorage.getItem(user);
          if (pwd) {
            this.momery_pwd = pwd;
          } else {
            this.momery_pwd = '';
          }
        } else {
          this.momery_username = '';
        }
      }
      this.user = this.momery_username;
      this.pwd = this.momery_pwd;
    },
    changeUser() {
      if (this.enabledMomery) {
        let pwd = localStorage.getItem(this.user) || CryptoJS.MD5('').toString();
        if (pwd !== CryptoJS.MD5('').toString()) {
          // console.log(1)
          this.momery_pwd = pwd;
          this.isMomeryed = true;
        } else {
          this.momery_pwd = '';
          this.isMomeryed = false;
        }
        this.pwd = this.momery_pwd;
      }
    },
    changePwd() {
      this.isMomeryed = false;
    },
    // 随机值
    getRandom(len) {
      let arr = [];
      for(let i=1; i<=len; i++){
        arr.push( Math.floor(Math.random()*10) );
      }
      return arr.join('');
    },
    login() {
      const vm = this;
      let random = '12345';
      if(!vm.user){
        vm.$message({
          message: vm.$t('message.MESSAGE.inputUsername'),
          type: 'error',
          duration: 1500,
        })
        return;
      }
      if(!vm.pwd){
        vm.$message({
          message: vm.$t('message.MESSAGE.inputPwd'),
          type: 'error',
          duration: 1500,
        })
        return;
      }
      vm.loading = true;
      vm.isClick = true;
      let new_password = '';
      if (vm.isMomeryed && vm.enabledMomery) {
        new_password = CryptoJS.HmacMD5(vm.pwd, random).toString()
      } else {
        new_password = CryptoJS.HmacMD5(CryptoJS.MD5(vm.pwd).toString(), random).toString()
      }
      var param = {
        username: vm.user,
        password: new_password,
        random,
        t: new Date()*1
      };
      request({
        url: '/admin/login',
        param,
        method: 'post',
        onError: () => {
          // removeLoading();
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res);
        vm.loading = false;
        vm.isClick = false;
        if (res.code === 200) {
          localStorage.setItem('token', res.content.token);
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('permission', res.content.permission) // 管理员权限 0 最高，系统管理员
          localStorage.setItem('username', res.content.username)
          if (vm.isMomery) {
            localStorage.setItem('momery_username', vm.user);
            if (vm.enabledMomery) {
              if (vm.isMomeryed) {
                localStorage.setItem(vm.user, vm.pwd);
              } else {
                localStorage.setItem(vm.user, CryptoJS.MD5(vm.pwd).toString());
              }
            } else {
              localStorage.setItem(vm.user, vm.pwd);
            }
          } else {
            if(localStorage.getItem('momery_username') === vm.user){
              localStorage.setItem('momery_username', vm.user);
              localStorage.removeItem(vm.user);
            }
          }
          vm.$router.push({
            name: 'home'
          })
          // localStorage.setItem('realname', data.content.realname);
          // localStorage.setItem('cardno', data.content.cardno);
          // vm.getMenuList();
        }
      });
    },
    getMenuList() {
      const vm = this;
      request({
        url: `/rolemenu/getByRole?t=${new Date() * 1}`,
        param: {},
        method: 'get',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        // console.log(res)
        vm.loading = false;
        vm.isClick = false;
        if (res.code === 200) {
          const data = res.content;
          if (data.length === 0) {
            vm.$message({
              message: vm.$t('message.MESSAGE.getMenuErr'),
              type: 'error',
              duration: 1500,
            })
            // localStorage.clear();
          } else {
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('menus', JSON.stringify(data));
            vm.$router.push({
              name: 'home'
            })
          }
        }
      });
    }
  },
}
</script>
<style lang="scss">
// .login{
//   .el-input__inner{
//     background-color:#eee !important;
//     border:none;
//     color:#e5e5e5;
//   }
// }
</style>
<style lang="scss" scoped>
.login{
  width:100%;
  height:100%;
  padding-top:146px;
  // background:url(../assets/img/login/bj.png) no-repeat;
  // background-size:100%;
  position: relative;
  // .icon{
  //   width:35.2%;
  //   height:auto;
  //   max-width:507px;
  //   position: absolute;
  //   left:0;
  //   top:0;
  // }
  .content{
    width:100%;
    height:600px;
    background:url(../assets/img/login/bj.png) no-repeat;
    background-position: center;
    position: relative;
    .bg{
      position: absolute;
      background:url(../assets/img/login/bg.png) no-repeat;
      background-size:100%;
      width:446px;
      height:424px;
      left:17.7%;
      top:94px;
    }
  }
  .login-wrap{
    width:368px;
    height:448px;
    border:1px solid #CAC9C7;
    position: absolute;
    top:78px;
    right:10%;
    background:#fff;
    // color:#e5e5e5;
    padding:0 55px 0;
    .lang-locale{
      position: absolute;
      right:10px;
      top:10px;
      width:60px;
    }
    .icon{
      display:inline-block;
      width:75%;
      height:auto;
      margin:0 auto;
      margin-top:45px;
      margin-bottom:10px;
      img{
        width:100%;
      }
    }
    .title{
      // position: absolute;
      // left:0;
      // top:0;
      width: 100%;
      height:58px;
      line-height:58px;
      text-align:center;
      font-size:18px;
      font-weight:normal;
    }
    .item{
      margin-bottom:18px;
      // display:flex;
      align-items: center;
      justify-content : center;
      label{
        white-space: nowrap;
        width:65px;
        text-align:right;
        display:block;
      }
      >div{
        flex:1;
      }
      button{
        width:100%;
        // background:#5780C9;
        color:#fff;
        border:none;
      }
    }
  }
  .footer{
    margin-top:80px;
    p{
      text-align:center;
      font-size:14px;
      color:#999;
      margin-bottom:15px;
      letter-spacing: 2px;
    }
  }
}
</style>

