<template>
  <div class="download-outer">
    <div class="cover">
      <span class="text-1">下载SKYline EFB最新版本</span><br>
      <span class="text-2">Download ths latest Version of SKYline EFB</span>
    </div>
    <div class="download">
      <button @click="download('web')" value="web">网页版-直接打开</button>
      <button @click="download('windows')" value="windows">Windows版-下载</button>
      <button @click="download('android')" value="android">Android版-下载</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'Download',
  data(){
    return{
    }
  },
  methods:{
    download(type){
      this.$confirm('SKYline EFB只允许用于模拟飞行，不可在实际飞行中使用', '使用须知', {
          confirmButtonText: '好哒',
          cancelButtonText: '不太行',
          type: 'warning'
        }).then(() => {
         switch (type) {
          case 'web':
            this.$router.push('/Enroute')
            let t = document.getElementsByClassName('b-items')
                for (let i = 0; i < t.length; i ++){
                    t[i].style.color = 'aliceblue'
                }
                document.getElementById('b-enroute').style.color = 'skyblue'
                this.$router.push('/Enroute')
            break
          case 'windows':
            window.location = 'https://efb.skylineflyleague.cn/product/EFBsetup_windows.zip'
            break;
          case 'android':
            window.location = 'https://efb.skylineflyleague.cn/product/EFBsetup_android.zip'
            break
          case 'ipad':
            window.location = 'https://efb.skylineflyleague.cn/product/EFBsetup_ipad.zip'
            break
            break
          default:
            break;
         }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          });          
        });
    }
  }
}
</script>

<style lang="less" scoped>
  .download-outer{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    position: absolute;
    left: 0;
    top: 0;
    width:100%;
    height: 100%;
    background-image: url(@/assets/about/3.png);
    background-size: cover;
    background-position-x: 50%;
    background-position-y: 50%;
    .cover{
      position: relative;
      top: 200px;
      left: 0;
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 35px;
      .text-1{
        color: orangered;
        font-weight: bold;
      }
      .text-2{
        font-style: italic;
        color: orange;
      }
    }
    .download{
      position: relative;
      width: 100%;
      left: 0;
      top: 220px;
      height: 300px;
      button{
        padding:4px 8px;
        background-color: rgb(76,175,80);
        border: 2px solid rgb(76,175,80);
        height: 60px;
        width: 200px;
        margin: 20px 30px;
        color: white;
        font-size: 20px;
        border-radius: 8px;
        transition-duration: 0.4s;
        cursor: pointer;
      }
      button:hover{
        background-color: aliceblue;
        color: black;
      }
    }
  }
</style>