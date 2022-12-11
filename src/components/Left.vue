<template>
<div>
    <div id="left">
        <div id="border">
        <!-- <div id="b-airport" @click="goAirport" class="b-items">
            <i class="el-icon-office-building"></i><br>
            <span>机场航图</span>
        </div> -->
        <div id="b-enroute" @click="goEnroute" class="b-items">
            <i class="el-icon-football"></i><br>
            <span>航图预览</span>
        </div>
        <div id="b-sup" @click="goSUP" class="b-items">
            <i class="el-icon-folder-add"></i><br>
            <span>补充资料</span>
        </div>
        <div id="b-other" @click="goOther" class="b-items">
            <i class="el-icon-files"></i><br>
            <span>其他航图</span>
        </div>
        <div id="b-book" @click="goBook" class="b-items">
            <i class="el-icon-folder-checked"></i><br>
            <span>&nbsp;&nbsp;检查单</span>
        </div>
        <div id="b-person" @click="goPerson" class="b-items">
            <i class="el-icon-user"></i><br>
            <span>用户数据</span>
        </div>
        <div id="b-about" @click="goAbout" class="b-items">
            <i class="el-icon-info"></i><br>
            <span>系统说明</span>
        </div>
        </div>
    </div>
</div>
</template>

<script >
export default {
  name: "Left",
  methods:{
      goAirport(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-arpt').style.color = 'skyblue'
          this.$router.push('/Airport') 
      },
      goEnroute(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-enroute').style.color = 'skyblue'
          this.$router.push('/Chart')
      },
      goOther(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-other').style.color = 'skyblue'
          this.$router.push('/Other')
      },
      goBook(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-book').style.color = 'skyblue'
          this.$router.push('/Checklist')
      },
      goSUP(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-sup').style.color = 'skyblue'
          this.$router.push('/Supplement')
      },
      goAbout(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-about').style.color = 'skyblue'
          this.$router.push('/About')
      },
      goPerson(){
          let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-person').style.color = 'skyblue'
          this.$router.push('/Personal')
      },
  }
};
</script>

<style scoped lang='less' >
#left {
  background-color: rgb(54,61,105);
  position: fixed;
  height: 100%;
  width: 60px;
  left: 0%;
  top: 50px;
  z-index: 15;
  text-align: center;
  color: aliceblue;
  
  #border{
      .b-items{
      cursor: pointer;
      float: left;
      margin:10px 0 10px;
      transition-duration: 0.3s;
      border-radius: 5px;
      i{
          font-size: 30px;
          text-align: center;
      }
      span{
          padding-left: 5px;
          font-size: 12px;
          text-align: center;
      }
  }
  .b-items:hover{
      background-color: rgb(32,36,63);
  }
  }
  
}
</style> >
