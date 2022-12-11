<template>
  <div class="access-outer">
      <div class="title"> <img src="skyline.png" alt="SKYline Logo" width="200px"><br> 欢迎使用SKYline电子飞行包产品</div>
      <div class="title eng">Welcome to use SKYline EFB product</div>
      <div class="main">
          <span>该设备尚未激活EFB系统，请注册并激活后使用</span>
      </div>
      <div class="action">
          <el-button @click="goAuthorize" class="botton" type="primary"> 用户尚未注册，申请注册设备 </el-button><br><br>
          <el-button @click="goActive" class="botton" type="warning">用户已完成注册，申请激活设备</el-button><br><br><br><br>
      </div>
      <div class="copy">&copy;2020-2022 SKYline Flyleague Technical Group</div><br><br>
  </div>
</template>

<script>
export default {
    name:"Access",
    methods:{
        goAuthorize(){
            this.$router.push('/Authorize')
        },
        goActive(){
            this.$router.push('/Active')
        }
    }
}
</script>

<style scoped lang='less'> 
    .access-outer{
        text-align: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-image: linear-gradient(to bottom right, rgb(19, 32, 43), rgb(45, 120, 185));
        overflow-y: auto;
    }
    .title{
        margin: 80px auto;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: antiquewhite;
        
    }
    .eng{
            text-align: center;
            margin-top: -60px;
            font-size: 16px;
    }
    .main{
        text-align: center;
        font-size: 25px;
        color: white;
    }
    .action{
        text-align: center;
        margin-top: 40px;
    }
    .botton{
        width: 285px;
        font-size: 18px;
    }
    .copy{
        text-align: center;
        font-size: 15px;
        color: aliceblue;
    }
</style>