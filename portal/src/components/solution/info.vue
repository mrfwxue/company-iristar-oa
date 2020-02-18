<template>
  <div class="aboutUs limit-width">
    <div class="title"><img :src="solutionImg" alt="" class="titleImg"></div>
    <div class="content">
      <div class="title-img"><img :src="solutionItem.infoImg" alt=""></div>
      <p class="info" v-for="(p, pi) in solutionItem.info" :key="pi">{{p}}</p>
      <div class="img-icon-text">
        <div class="item" v-for="(item, i) in solutionItem.infoData" :key="i">
          <span><img :src="item.img" alt=""></span>
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="link-us">
        <div class="left">
          <img :src="logo" alt="">
        </div>
        <div class="right">
          <div class="item" v-for="(item, i) in linkUs" :key="i">
            <span>
              <img :src="item.img" alt="">
            </span>
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import solutionList from './solutionList'
export default {
  name: 'aboutUs',
  data() {
    return {
      solutionList: solutionList,
      solutionImg: require('@/assets/img/title/solution.png'),
      solutionItem: null,
      logo: require('@/assets/img/solution/tool/logo.png'),
      linkUs: [
        {
          img: require('@/assets/img/solution/tool/1.png'),
          title: '销售咨询热线—— 400-696-1828'
        },
        {
          img: require('@/assets/img/solution/tool/2.png'),
          title: '技术咨询热线—— 18102574422  022-59265309'
        },
      ]
    }
  },
  created() {
    this.getnews();
  },
  mounted() {
  },
  computed: {},
  watch: {
    '$route.query.id': function(n, o) {
      this.getnews();
    }
  },
  methods: {
    getnews() {
      let id = this.$route.query.id;
      let solution = this.solutionList.filter(item => item.id == id)[0];
      this.solutionItem = solution;
    },
  },
}
</script>
<style lang="scss" scoped>
.aboutUs{
  color:#666;
  .content{
    background:#fff;
    padding:.25rem 1rem;
    text-align:left;
    p{
      text-indent: 2em;
      line-height: 2em;
      text-align: justify;
    }
  }
  .title-img{
    margin:0 auto;
    margin-bottom:.3rem;
    img{
      width:100%;
    }
  }
  p.info+p.info{
    margin-top:10px;
  }
  .img-icon-text{
    display:table;
    width:100%;
    margin-top:.3rem;
    .item{
      float: left;
      margin:3.3% 8.65%;
      width:15.7%;
      text-align:center;
      span{
        display:block;
        margin-bottom:.2rem;
        img{
          width:80%;
        }
      }
      p{
        text-align:center;
        text-indent:0;
      }
    }
    @media screen and(max-width: 935px) {
      .item{
        width:26.7%;
        margin:3.3% 2.65%;
      }
    }
  }
  .link-us{
    margin-top:.5rem;
    >div{
      display: inline-block;
      margin-left:1rem;
      .item{
        display:table;
        +.item{
          margin-top:.4rem;
        }
        span, p{
          float: left;
          display:block;
          height:33px;
          line-height:33px;
          text-indent:0;
          img{
            display: block;
          }
        }
        p{
          font-size:.2rem;
          margin-left:5px;
        }
      }
    }
    @media screen and(max-width: 935px) {
      .left{
        margin-bottom:20px;
      }
      >div{
        width:100%;
        margin-left:0;
        text-align:center;
        .item{
          display:inline-block;
          p{
            line-height: 33px !important;
            font-size:12px;
          }
        }
      }
    }
  }
}
</style>

