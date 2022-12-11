<template>
  <div class="donate-outer">
    <div class="card">
        <div class="title">捐赠我们</div>
        <div class="text">
            SKYline EFB是免费向大家开放使用的模拟飞行电子飞行包，<br>
            但其开发、服务器的运行成本、系统后期维护、相应第三方开发授权却需要大量的花销。<br>
            如果您喜欢SKYline EFB产品，还望能够打个赏，支持一下我们，<br>
            您的支持是对我们的肯定，也会让SKYline发展的更好，我们会把打赏得到的资金全部用于系统维护与建设。<br>
        </div>
        <div class="infom">
            请注意：<br>
            选择下方任意账号任意方式即可。 <br>
            无论金额大小，我们对所有捐赠用户的支持表示感谢！<br>
            付款时请注明您的飞行员编号，我们会对符合条件的赞助者授予个人认证<br><br>
        </div>
        <div class="devide">打赏2287 (EFB策划与首席设计师)</div>
        <img src="wechart2287.jpg" alt="denate" style="width: 260px;">
        <div class="devide">打赏6189 (SKYline站长与后端开发)</div>
        <img src="wechart6189.jpg" alt="donate" style="width:260px;margin-right: 10px;">
        <img src="alipay6189.jpg" alt="donate" style="width: 260px;">
        
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>捐赠后我们获得的</span>
  </div>
  <div style="font-size:18px;color: orangered;"  class="text item">
    <i class="el-icon-medal"></i> 您的支持、对我们的肯定、未来发展的信心;
  </div>
  <div style="font-size:18px;color: orangered;"  class="text item">
    <i class="el-icon-star-on"></i> 更充足的资金，用于系统维护、服务器升级;
  </div>
</el-card>
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>捐赠后您所获得的</span>
  </div>
  <div style="font-size:18px;color: rgb(28, 230, 230);;" class="text item">
    <i class="el-icon-trophy"></i> SKYline EFB专属认证:头像右下角个人认证图标;
  </div>
  <div style="font-size:18px;color:rgb(28, 230, 230);;" class="text item">
    <i class="el-icon-trophy"></i> SKYline EFB专属认证:EFB捐赠者认证;
  </div>
  <div style="font-size:18px;color: rgb(28, 230, 230);;" class="text item">
    <i class="el-icon-finished"></i> 用户列表昵称高亮显示;
  </div>
</el-card>
    </div>
  </div>
</template>

<script>
export default {
    name:'DonateUs'
}
</script>

<style lang="less" scoped>
    .donate-outer{
        //color: rgb(28, 230, 230);
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        min-width: 400px;
        overflow: auto;
        background-image: url(@/assets/reg.png);
        background-size: cover;
        background-position-x: 50%;
        background-position-y: 50%;
        .devide{
          position: relative;
          width: 270px;
          text-align: center;
          left: calc(50% - 170px);
          padding: 10px;
          margin: 20px;
          background-color:deeppink;
          color: white;
          font-size: 17px;
          border-radius: 20px;
        }
        .card{
            background-color: aliceblue;
            opacity: 0.85;
            border-radius: 6px;
            position: relative;
            top: 190px;
            left: 20%;
            width: 60%;
            padding: 20px;
            .title{
                position: relative;
                color: black;
                text-align: center;
                font-size: 30px;
                font-weight: bold;
                padding-bottom: 8px;
                line-height: 28px;
            }
            .text{
                position: relative;
                color: black;
                text-align: center;
                font-size: 20px;
                line-height: 28px;
            }
            .infom{
                position: relative;
                text-align: center;
                color: red;
                font-size: 20px;
                line-height: 28px;
            }
            .box-card{
                opacity: 1.5;
                position: relative;
                text-align: center;
                width: 50%;
                left: 25%;
                margin-right: 5%;
                margin-bottom: 20px;
            }
        }
    }
</style>