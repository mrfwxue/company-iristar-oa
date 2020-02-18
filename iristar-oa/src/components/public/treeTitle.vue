<template>
  <div class="treeTitle">
    <input type="text" class="title" v-model="title" @change="changeTitle" @focus="handelFocus">
  </div>
</template>
<script>
import request from "@/axios/axios";
export default {
  name: 'treeTitle',
  components: {},
  props: {},
  data() {
    return {
      title: '',
      titleId: '',
    }
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {
    getTreeTitle() {
      return this.$store.state.treeTitle;
    },
    getTreeTitleId() {
      return this.$store.state.treeTitleId;
    }
  },
  watch: {
    getTreeTitle(n, o) {
      this.title = n;
    },
    getTreeTitleId(n, o) {
      this.titleId = n;
    }
  },
  created() {
    this.title = this.getTreeTitle;
    this.titleId = this.getTreeTitleId;
  },
  mounted() {},
  methods: {
    changeTitle() {
      const vm = this;
      request({
        url: '/organization/updateVersion',
        param: {
          id: vm.titleId,
          company: vm.title
        },
        method: 'get',
        onError: err => {
        },
        vm,
      }).then(res => {
        // console.log(res)
        let code = res.code;
        if(code === 200) {
          vm.$store.dispatch('setTreeTitle', vm.title)
          vm.$message({
            type: 'success',
            message: vm.$t('message.MESSAGE.editSuccess'),
            duration: 1000
          })
        }
      });
    },
    handelFocus() {
      this.$emit('titleFocus', true)
    }
  },
}
</script>

<style lang="scss" scoped>
.treeTitle{
  padding-left:8px;
  line-height:65px;
  text-align:left;
  border-bottom:1px solid #ededed;
  margin-bottom:18px;
  input{
    width:100%;
    font-size:18px;
    background: #fff;
    border:none;
    &:focus{
      outline: none;
    }
  }
}
</style>

