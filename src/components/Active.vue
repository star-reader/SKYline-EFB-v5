<template>
  <div class="active-outer">
    <div id="a">
      <div class="title">您是否拥有当前设备的激活码？</div>
      <br />
      <el-button @click="noAccess" class="botton" type="primary">
        是，我拥有此设备的激活码 </el-button
      ><br /><br />
      <el-button @click="haveAccess" class="botton" type="warning"
        >否，尚未申请该设备的激活码</el-button
      ><br /><br /><br /><br />
    </div>
    <div id="b">
      <el-tabs tab-position="left" type="border-card">
        <el-tab-pane label="在线自动激活">在线自动激活<br>
            <span>输入用户信息，自动激活该设备</span>
            <br>
            <el-form ref="form" :model="form" label-width="80px">
             <el-form-item label="设备编号">
          <el-input
            type="text"
            placeholder="系统注册编号"
            v-model="form.name"
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
         <el-form-item label="激活口令">
          <el-input
            type="text"
            placeholder="注册提供的激活口令"
            v-model="form.device"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        </el-form><br>
        <el-button @click="online_active" type="primary"
          >激活当前设备</el-button
        >
        </el-tab-pane>
        <el-tab-pane label="离线手动激活">离线手动激活<br>
            <span>输入得到的激活码，完成验证后激活设备</span>
            <el-form ref="form" :model="form" label-width="80px">
             <el-form-item label="用户编号">
          <el-input
            type="text"
            placeholder="系统注册编号"
            v-model="form.name"
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
         <el-form-item label="激活口令">
          <el-input
            type="text"
            placeholder="注册提供的激活口令"
            v-model="form.device"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="激活码">
          <el-input
            type="text"
            placeholder="设备激活码"
            v-model="form.activenumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        </el-form><br>
        <el-button @click="offline_active" type="primary"
          >激活当前设备</el-button
        >
        </el-tab-pane>
      </el-tabs>
      
    </div>
    <div id="c">
        <span>注册此设备</span><br>
        <span>注册成功后，您将得到此设备的唯一激活码，请记录下您的激活码，使用在线激活/离线激活方式进行激活验证</span>
         <el-form  style="position:relative;width:60%;left:20%" ref="form" :model="form" label-width="80px">
             <el-form-item label="用户编号">
          <el-input
            type="text"
            placeholder="系统注册编号"
            v-model="form.name"
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
             <el-form-item label="设备名称">
          <el-input
            type="text"
            :placeholder="randomString(true,26,30)"
            v-model="form.deviceid"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        </el-form><br>
        <el-button @click="generateactivenumber" type="success"
          >生成设备激活码</el-button
        ><br><br>
    </div>
    <div id="d">
        <span>此设备激活信息绑定在飞行员中心用户{{ this.form.name }}下</span
      ><br />
      <span>可前往EFB个人中心管理您激活过的设备</span><br />
      <span>此设备唯一激活码为</span><br />
      <div id="key">
        <span>{{ ActiveNumber }}</span>
      </div>
      <span>请妥善保存该激活码</span><br />
      <el-button type="primary" @click="goActive">点击跳转激活页面</el-button>
      <br><br>
    </div>
    </div>
</template>

<script>
import {dataEncrypt} from '../utils/cryptoJS'
import Fingerprint2 from "fingerprintjs2";
export default {
  name: "Active",
  data() {
      return {
          ActiveNumber:'',
          form:{
              name:'',
              password:'',
              device:'',
              activenumber:''
          }
      }
  },
  methods: {
    noAccess() {
      document.getElementById("a").style.display = "none";
      document.getElementById("b").style.display = "block";
    },
    haveAccess(){
      document.getElementById("a").style.display = "none";
      document.getElementById("c").style.display = "block";
    },
    online_active(){

    },
    offline_active(){

    },
    goActive(){
        location.reload()
    },
    randomString(randomLen, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
               'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
               'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
               'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
               'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
               'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if(randomLen){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
  },
  generateactivenumber(){
      Fingerprint2.get((components) => {
          let values = components.map((component) => component.value); // 配置的值的数组
          let id = Fingerprint2.x64hash128(values.join(""), 31); // 生成浏览器指纹
          let user = this.form.name;
          let DeviceInfoId = `EFBPersonalAccess:${id}&&DeviceInfo${user}`;
          //生成加密的DeviceInfoId，即为此设备的激活码
          let ActiveNumber = dataEncrypt(DeviceInfoId);
          this.ActiveNumber = ActiveNumber;
        });
    document.getElementById('c').style.display = 'none'
    document.getElementById('d').style.display = 'block'
  }
  }
}
</script>

<style scoped >
.active-outer {
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-image: linear-gradient(
    to bottom right,
    rgb(19, 32, 43),
    rgb(45, 120, 185)
  );
  overflow-y: auto;
}
#a {
  position: relative;
  padding-top: 20px;
  top: 50px;
  font-size: 18px;
  line-height: 30px;
  color: antiquewhite;
  left: 25%;
  right: 25%;
  width: 50%;
  background-color: rgb(45, 120, 185);
  border-radius: 5px;
  height: auto;
}
#b{
    display: none;
    width: 60%;
    margin: 80px 20%;
}
#c{
    display: none;
    position: relative;
  padding-top: 20px;
  top: 50px;
  font-size: 18px;
  line-height: 30px;
  color: antiquewhite;
  left: 25%;
  right: 25%;
  width: 50%;
  background-color: rgb(17, 49, 77);
  border-radius: 5px;
  height: auto;
}
#d{
    display: none;
  position: relative;
  padding-top: 20px;
  top: 50px;
  font-size: 18px;
  line-height: 30px;
  color: antiquewhite;
  left: 25%;
  right: 25%;
  width: 50%;
  background-color: rgb(17, 49, 77);
  border-radius: 5px;
  height: auto;
  
}
#key{
      color: red;
  left: 20%;
  position: relative;
  width: 60%;
  word-break: break-all;
  }

</style>
<style lang="css">
    .el-form-item__label{
    color: black;
  }
</style>