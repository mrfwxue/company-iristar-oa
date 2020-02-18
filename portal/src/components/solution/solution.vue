<template>
  <div class="solution limit-width">
    <div class="solution-bg-img">
      <div class="bg"><img :src="solutionBj" alt=""></div>
      <div class="inner" @click="toInfo">
        <img :src="solution" alt="" class="titleImg">
        <div class="solution-wrap pc-solution">
          <div class="item">
            <span v-for="(item, i) in list1" :key="i" @click="toPageInfo(item, $event)">{{item.title}}</span>
          </div>
          <div class="item item2">
            <span v-for="(item, i) in list2" :key="i" @click="toPageInfo(item, $event)">{{item.title}}</span>
          </div>
        </div>
        <div class="solution-wrap phone-solution">
          <div class="item">
            <span v-for="(item, i) in list3" :key="i" @click="toPageInfo(item, $event)">{{item.title}}</span>
          </div>
          <div class="item item2">
            <span v-for="(item, i) in list4" :key="i" @click="toPageInfo(item, $event)">{{item.title}}</span>
          </div>
        </div>
        <span class="knowMore">了解更多</span>
      </div>
    </div>
  </div>
</template>
<script>
import solutionList from './solutionList'
export default {
  name: 'solution',
  data() {
    return {
      solution: require('@/assets/img/title/solution.png'),
      solutionBj: require('@/assets/img/home/solution.jpg'),
      solutionList: solutionList,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
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
      this.list1 = this.solutionList.slice(0,3);
      this.list2 = this.solutionList.slice(3);
      this.list3 = this.list1.slice(0,2);
      this.list4 = this.list1.slice(2);
    },
    toInfo() {
      this.$router.push({
        name: 'solutionContent'
      })
    },
    toPageInfo(item, e) {
      e.stopPropagation();
      this.$router.push({
        name: 'solutionInfo',
        query: {
          id: item.id
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.solution{
  padding:.2rem 0;
  .solution-bg-img{
    position: relative;
    .bg{
      width:100%;
      img{
        width:100%;
      }
    }
    .inner{
      position: absolute;
      width:100%;
      height:100%;
      left:0;
      top:0;
      cursor: pointer;
      .pc-solution{
        display:block;
      }
      .phone-solution{
        display:none;
      }
      .solution-wrap{
        margin-top:2.3rem;
        .item{
          text-align:right;
          padding-right:.76rem;
          span{
            display:inline-block;
            width:1.2rem;
            height:.4rem;
            background:#769bf6;
            margin-left:1.2rem;
            color:#fff;
            text-align:center;
            line-height:.4rem;
            font-size:.2rem;
            transform: skew(-10deg);
          }
          &:last-child{
            margin-top:.5rem;
            span{
              margin-left: 0;
              margin-right:1.2rem;
            }
          }
        }
      }
      @media screen and(max-width: 935px) {
        .pc-solution{
          display:none;
        }
        .phone-solution{
          display:block;
        }
        .solution-wrap{
          margin-top:10%;
          .item{
            span{
              width:100px;
              height:30px;
              margin-left:100px;
              line-height:30px;
              font-size:14px;
            }
            &:last-child{
              span{
                margin-left: 0;
                margin-right:100px;
              }
            }
          }
        }
      }
      @media screen and(max-width: 650px) {
        .solution-wrap{
          margin-top:8%;
          .item{
            span{
              width:50px;
              height:24px;
              margin-left:50px;
              line-height:24px;
              font-size:12px;
            }
            &:last-child{
              margin-top:10px;
              span{
                margin-left: 0;
                margin-right:50px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

