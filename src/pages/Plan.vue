<template>
  <div
    :style="{ backgroundImage: 'url(' + background + ')' }"
    class="plan-outer"
  >
       <div @click="goRoute" style="background-image: linear-gradient(to bottom right, rgba(23, 206, 238, 0.7),rgba(13, 117, 187, 0.7));" class="main-side">
           <div class="title">
               <span>我需要 ...<br/>I need ...</span><br>
               <i class="el-icon-share icon"></i>
           </div>
           <div style="color:lightgreen"  class="todo">创建一个航线计划<br>Create a flight plan</div>
       </div>
       <div style="background-image: linear-gradient(to bottom right, rgba(219, 158, 44, 0.7),rgba(185, 128, 22,0.7));" class="main-side">
           <div class="title">
               <span>我想要 ...<br/>I wanna ...</span><br>
               <i  class="el-icon-search icon"></i>
           </div>
           <div style="color:black" class="todo">查询飞行信息<br>Search flight info</div>
       </div>
       <div style="background-image: linear-gradient(to bottom right, rgba(247, 91, 99, 0.7),rgba(226, 178, 180, 0.7));" class="main-side">
           <div class="title">
               <span>我只想 ...<br/>I just ...</span><br>
               <i  class="el-icon-thumb icon"></i>
           </div>
           <div style="color:yellow" class="todo">探索世界<br>Explore the world</div>
       </div>
       <router-view></router-view>
  </div>
</template>

<script>
import background from "@/assets/bk.jpg";
export default {
  name: "Plan",
  data() {
    return {
      background: background,
    };
  },
  methods:{
      goRoute(){
          this.$router.push('/Plan/Route')
      }
  }
};
</script>

<style scoped lang="less">
.plan-outer {
  position: fixed;
  left: 0;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
  background-attachment: fixed;
  background-size: auto 100%;
      .main-side{
    //    filter: blur(10px);  这行代码得注掉！要不然你就得近视了
      float: left;
      position: relative;
      cursor: pointer;
      width: 20%;
      height: 50%;
      margin-left: 10%;
      border-radius: 5px;
      transition-duration: 0.5s;
      top: 20%;
      background-image: linear-gradient(to bottom right, rgba(23, 206, 238, 0.7),rgba(13, 117, 187, 0.7));
      .title{
          text-align: center;
          padding-top: 30px;
          font-size: 30px;
          color: aliceblue;
      }
      .todo{
          text-align: center;
          bottom: 20px;
          font-size: 22px;
          color: rgb(26, 161, 214);
      }
      .icon{
          padding-top: 40px;
          padding-bottom: 40px;
          font-size: 40px;
      }
    }
    .main-side:hover{
        transform: scale(1.1);
    }
  
}
</style>