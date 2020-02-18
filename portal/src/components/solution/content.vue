<template>
  <div class="solutionContent limit-width">
    <!-- <el-row :gutter="40">
      <el-col :span="12" v-for="(item, i) in list1" :key="i"><div class="img" @click="toInfo(item)"><img :src="item.showImg" alt=""><span class="mask">{{item.title}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, i) in list2" :key="i"><div class="img" @click="toInfo(item)"><img :src="item.showImg" alt=""><span class="mask">{{item.title}}</span></div></el-col>
    </el-row> -->
    <div class="solutionList">
      <div class="item w50" v-for="(item, i) in list1" :key="i">
        <div class="img" @click="toInfo(item)">
          <img :src="item.showImg" alt="">
          <span class="mask">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="solutionList">
      <div class="item w30" v-for="(item, i) in list2" :key="i">
        <div class="img" @click="toInfo(item)">
          <img :src="item.showImg" alt="">
          <span class="mask">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import solutionList from './solutionList'
export default {
  name: 'solutionContent',
  data() {
    return {
      solutionList: solutionList,
      list1: [],
      list2: [],
    }
  },
  created() {
    this.formatData();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    formatData() {
      this.list1 = this.solutionList.slice(0,2);
      this.list2 = this.solutionList.slice(2);
    },
    handleMouseOver(mask) {
      let eleMask = this.$refs[mask][0];
      eleMask.style.display = 'block';
      eleMask.setAttribute('class', 'mask animated fadeInDown')
    },
    handleMouseLeave(mask) {
      let eleMask = this.$refs[mask][0];
      eleMask.style.display = 'none';
      eleMask.setAttribute('class', 'mask')
    },
    toInfo(item) {
      this.$router.push({
        name: 'solutionInfo',
        query: {
          id: item.id
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.solutionContent{
  padding: .25rem;
  .img, img{
    width:100%;
    cursor: pointer;
  }
  .img{
    position: relative;
    margin-bottom:.2rem;
    transition: transform .2s;
    img{
      display:block;
    }
    &:hover{
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.15);
      transform: scale(1.01);
    }
    .mask{
      position: absolute;
      // width:1rem;
      height:.6rem;
      left:0;
      top:0;
      bottom:0;
      right:0;
      margin:auto;
      font-size:.4rem;
      line-height:.6rem;
      color:#fff;
      // border:1px solid #ccc;
      border-radius:5px;
      padding:0 .2rem;
      // display:none;
    }
    @media screen and(max-width: 935px) {
      .mask{
        font-size:28px;
      }
    }
  }
  .solutionList{
    margin-left:-20px;
    margin-right:-20px;
    .item{
      display: inline-block;
      padding:0 20px;
    }
    .w50{
      width:50%;
    }
    .w30{
      width:33.3333%;
    }
  }
  @media screen and(max-width: 935px) {
    .solutionList{
      margin-left:0;
      margin-right:0;
      .item{
        display: block;
      }
      .w50{
        width:100%;
      }
      .w30{
        width:100%;
      }
    }
  }
}
</style>

