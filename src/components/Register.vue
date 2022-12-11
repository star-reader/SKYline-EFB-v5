<template>
  <div class="reg-outer">
    <div class="cover">
        <div class="title">欢迎注册SKYline EFB系统</div>
        <div class="info">
            <strong>注册须知：</strong>
            1、若您注册SKYline EFB系统(以下简称本系统)，即表示您同意和遵守SKYline天际模飞俱乐部相应规定<br>
            2、注册系统的用户，需拥有飞行员中心账号( <a style="color:white;text-decoration: none;" href="https://pilot.skylineflyleague.cn/public/regist.php">点击去注册</a> ) <br>
            3、本软件仅适用于模拟飞行使用，请勿在真实飞行中使用<br>
            4、请妥善保管账号、密码等个人信息，以防泄露。<br>
            5、因不遵守平台相应规定、将EFB适用于真实飞行等不恰当的场合、个人原因泄露隐私数据等情况，本平台均不承担任何责任<br><br>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="系统用户名">
          <el-input
            type="text"
            placeholder="EFB系统注册昵称"
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
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
        <el-form-item label="确认密码">
          <el-input
            type="password"
            v-model="form.checkpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>

            <slide-verify 
            class="verf"
        ref="slideblock"
        @again="onAgain"
        @fulfilled="onFulfilled"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :accuracy="accuracy"
        :slider-text="text"
    ></slide-verify>
    <div>{{msg}}</div>
        <el-form-item class="butt" >
          <el-button @click="toReg" type="success">立即注册</el-button>
        </el-form-item>
        <el-form-item class="butt2" >
          <el-button @click="toLogin" type="info">已有账号？点击登录！</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    name:'Register',
    data(){
        return{
            form:{
        username:'',
        password:'',
        cid:'',
        checkpassword:''
    },
        data:{
            username:'',
            password:'',
            cid:'',
        },
        complete:false,
             msg: '',
            text: '滑动验证',
            accuracy: 4,
        }
    },
    methods:{
        toLogin(){
            this.$router.push('/Login')
        },
        toReg(){
            if (this.complete){
                this.handleClick()
                let reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~@#%……&*——\-+={}|?]/g
                if (reg.test(this.form.username)){
                    return this.$message({
            type: 'error',
            message: '用户名中不能包含特殊字符'
                })
            }else {
                this.data.username = this.form.username
            }
            if (this.form.password.length < 8 || this.form.password.length > 16){
                return this.$message({
            type: 'error',
            message: '密码长度需介于8-18位之间'
                })
            }else {
                if (this.form.password != this.form.checkpassword){
                    return this.$message({
            type: 'error',
            message: '两次输入密码不一致'
                })
                }else {
                    this.data.password = this.form.password
                }   
            }
            this.data.cid = this.form.cid

        }else{
                return this.$message({
            type: 'error',
            message: '请先完成验证'
          })
            }
        },
        onSuccess(times){
           this.complete = true
        },
        onFail(){
           this.complete = false
        },
        onRefresh(){
            this.complete = false
        },
        onFulfilled() {
           this.complete = false
        },
        onAgain() {
            this.complete = false
            this.$refs.slideblock.reset();
        },
        handleClick() {
            this.$refs.slideblock.reset();
        },
    }
}
</script>
<style>
.slide-verify canvas{
  position: relative;
}
</style>
<style lang="less" scoped>
    .reg-outer{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 16;
        width: 100%;
        height: 100%;
        background-image: url(@/assets/reg.png);
        background-attachment: fixed;
        background-size: auto 100%;
        .cover{
            top: 5%;
            height: 90%;
            overflow: auto;
            opacity: 0.75;
            position: absolute;
            left: 30%;
            width: 40%;
            padding: 20px;
            background-color:#1572d6;
            .title{
                position: relative;
                font-size: 30px;
                color: aliceblue;
                text-align: center;
                font-weight: bold;
            }
            .info{
                position: relative;
                color: aliceblue;
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