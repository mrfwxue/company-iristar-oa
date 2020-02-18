<template>
  <div class="login" v-loading.fullscreen="loading">
    <!-- <span class="icon">
      <img src="@/assets/img/login/logo.png" alt="">
    </span> -->
    <div class="login-wrap">
      <h2 class="title">用户注册</h2>
      <div class="item">
        <el-row>
          <el-col :span="6" style="line-height:40px"><label>用户名：</label></el-col>
          <el-col :span="18"><div><el-input type="text" size="large" v-model="username" autocomplete="off"></el-input></div></el-col>
        </el-row>
      </div>
      <div class="item">
        <el-row>
          <el-col :span="6" style="line-height:40px"><label>密码：</label></el-col>
          <el-col :span="18"><div><el-input type="password" size="large" v-model="pwd" autocomplete="off"></el-input></div></el-col>
        </el-row>
      </div>
      <div class="item">
        <el-row>
          <el-col :span="6" style="line-height:40px"><label>确认密码：</label></el-col>
          <el-col :span="18"><div><el-input type="password" size="large" v-model="pwd_ok" autocomplete="off"></el-input></div></el-col>
        </el-row>
      </div>
      <div class="item">
        <el-button round size="large" type="primary" @click="reg" :disabled="isClick">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import MD5 from 'md5';
import request from "@/axios/axios";
export default {
  name: 'reg',
  data() {
    return {
      isClick: false, // 双击
      loading: false,
      username: '',
      pwd: '',
      pwd_ok: '',
    }
  },
  created() {
    // localStorage.clear();
  },
  mounted() {
    const vm = this;
    document.onkeypress = function(e) {
      if(e.keyCode === 13){
        vm.reg()
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    reg() {
      const vm = this;
      if(!vm.username){
        vm.$message({
          message: '请输入用户名',
          type: 'error',
          duration: 1500,
        })
        return;
      }
      if(!vm.pwd){
        vm.$message({
          message: '请输入密码',
          type: 'error',
          duration: 1500,
        })
        return;
      }
      if(vm.pwd !== vm.pwd_ok){
        vm.$message({
          message: '两次密码不一致',
          type: 'error',
          duration: 1500,
        })
        return;
      }
      request({
        url: '/admin/register',
        param: {
          username: vm.username,
          password: MD5(vm.pwd),
          roleid: 1
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
            message: '注册成功',
            type: 'success',
            duration: 1000
          });
          vm.$router.push({
            name: 'login'
          })
        }
      });
    },
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
  background:url(../assets/img/login/bj.png) no-repeat;
  background-size:100%;
  position: relative;
  .icon{
    width:35.2%;
    height:auto;
    max-width:507px;
    position: absolute;
    left:0;
    top:0;
  }
  .login-wrap{
    width:454px;
    height:372px;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    background:#fff;
    // color:#e5e5e5;
    padding:75px 45px 35px;
    .title{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height:75px;
      line-height:75px;
      text-align:center;
      font-size:18pt;
      font-weight:normal;
    }
    .item{
      margin-bottom:35px;
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
        width:140px;
        // background:#5780C9;
        color:#fff;
        border:none;
      }
    }
  }
}
</style>

