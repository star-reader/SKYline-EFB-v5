<template>
  <div class="login-outer">
      
      <div class="cover">
          <div class="title">欢迎使用SKYline EFB系统！</div>
          <div class="title2">请使用飞行员中心账号登录系统</div>
          <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="飞行员编号">
          <el-input
            type="text"
            placeholder="飞行员中心注册编号"
            v-model="form.cid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="系统密码">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item  class="butt" >
          <el-button id="login-main" @click="toLogin" type="success">登录系统</el-button>
        </el-form-item>
        <el-form-item class="butt2" >
          <el-button @click="toReg" type="info">没有账号？点击注册！</el-button>
        </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
import {setCookie,getCookie} from '@/utils/cookie'
import { getRandomString } from '@/utils/num'
import { dataEncrypt, tokenEncrypt } from '@/utils/cryptoJS'
export default {
    name:'Login',
    data(){
        return{
        form: {
            filusername:'',
            password:'',
            cid:''
      },
      data:{
          password:'',
          cid:''
      },
            msg: '',
            text: '滑动验证',
            accuracy: 8,
            complete:false
      }
    },
    methods:{
      toReg(){
        this.$confirm('点击注册将在新窗口前往飞行员中心注册页面，注册成功后请关闭该窗口，在本页面登录（已经注册飞行员账号的请直接登录，不用重复注册）', '提示', {
          confirmButtonText: '去注册',
          cancelButtonText: '取消注册',
          type: 'warning'
        }).then(() => {
         window.open('https://ssl.skylineflyleague.cn/public/register.html','SKYline Flyleague-注册飞行员中心编号',"width=1300,height=600,menubar=no,toolbar=no,location=no,status=no,resizable=no")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注册'
          });          
        });
      },
        toLogin(){
            if (this.form.cid.length != 4){
               return this.$message({
            type: 'error',
            message: '忘了吗？你在飞行员中心注册的呼号可是四位数字哦~'
          });
            }
            let reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~@#%……&*——\-+={}|?]/g
            if (reg.test(this.form.cid) && this.form.cid.length == 4){
               return this.$message({
            type: 'error',
            message: '忘了吗？你在飞行员中心注册的呼号可是四位数字哦~'
          });  
            }else {
              document.getElementById('login-main').innerHTML = '登录中...'
              document.getElementById('login-main').style.cursor = 'not-allowed'
                this.data.cid = this.form.cid
                this.data.password = this.form.password
                const serect = {username:this.data.cid,password:this.data.password}
                const payload = `${getRandomString(8)}${dataEncrypt(JSON.stringify(serect))}${getRandomString(4)}.skylineLog?enp=7cgre6cfGS7fx6FS56vzd2.${getRandomString(28)}`
                this.$axios.post(`https://api.skylineflyleague.cn/efb_api_v2/account?user_secret=${payload}`).then((res)=>{
                  let data = res.data.account
                  if(data){
                    document.getElementById('login-main').innerHTML = '登录系统'
                    document.getElementById('login-main').style.cursor = 'pointer'
                    localStorage.setItem('user_certificate',res.data.certificate)
                    this.$message({
                    type: 'success',
                    message: '登录成功~'
                  });
                  this.$router.push('/Chart')
                  window.location.reload()
                  }else{
                    document.getElementById('login-main').innerHTML = '登录系统'
                    document.getElementById('login-main').style.cursor = 'pointer'
                    localStorage.removeItem('user_certificate')
                    this.$message({
                    type: 'error',
                    message: '登录失败~'
                  });  
                  }
                })
            }
        },
        generateCertificate(){
          localStorage.setItem('user_certificate','undefined')
        }
    },
    mounted(){
        document.getElementById('load').style.display = 'none'
    }
}
</script>
<style>
.slide-verify canvas{
  position: relative;
}
</style>
<style lang="less" scoped>
    canvas{
      position: relative;
    }
    .login-outer{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 16;
        width: 100%;
        height: 100%;
        background-color: aliceblue;
        background-image: url(@/assets/login.png);
        background-attachment: fixed;
        background-size: auto 100%;
        .cover{
            overflow: auto;
            height: 40%;
            min-height: 395px;
            position: fixed;
            top: 20%;
            width: 70%;
            left: 15%;
            padding: 20px;
            background-color: #1572d6;
            opacity: 0.75;
            border-radius: 10px;
            .title{
            font-size: 32px;
            color: aliceblue;
            text-align: center;
            position: relative;
            top: 10px;
            font-weight: bold;
        }
            .title2{
                position: relative;
                color: aliceblue;
                font-size: 26px;
                text-align: center;
                margin-top: 10px;
                margin-bottom: 5px;
            }
            .butt{
              margin-top: 20px;
                position: relative;
                text-align: center;
                width: 100px;
                left: calc(50% - 150px);
            }
            .butt2{
              position: relative;
              text-align: center;
              width: 200px;
              left: calc(50% - 190px);
            }
            .verf{
              position: relative;
                text-align: center;
                width: 320px;
                left: calc(50% - 150px);
            }
        }
        
    }
    
</style>
<style>
label.el-form-item__label{
      color:white;
    }
</style>
