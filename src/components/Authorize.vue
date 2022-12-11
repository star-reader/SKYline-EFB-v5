<template>
  <div class="authorize-outer">
    <div class="title">系统注册</div>
    <div id="re-content" class="content">
      <span
        >一、为保护用户隐私内容不被窃取，同时为方便用户管理。SKYline
        EFB系统（以下简称“此系统”）统一实行一机一码注册制度；</span
      ><br />
      <span
        >二、注册此系统的用户，需在注册前拥有飞行员编号（在飞行员中心注册的联飞编号）；</span
      ><br />
      <span
        >三、用户注册此系统后，可以申请激活设备，得到的激活码为此设备唯一激活码，仅限当前设备可以访问；</span
      ><br />
      <span
        >四、同一用户可以拥有多个激活码，分别负责激活不同设备（如手机、电脑等），但原则上最多不超过3个；</span
      ><br />
      <span
        >五、用户可以在此系统的个人中心查看授权激活过的全部设备，并进行管理；</span
      ><br />
      <span
        >六、请用户妥善保管设备激活码，由私自转交个人账号信息、个人泄露等原因造成的损失本平台概不负责；</span
      ><br />
      <span>七、如有使用上的疑问，请及时联系系统负责人。</span>
      <div class="select">
        <el-button @click="returnAccess" type="primary"
          >不同意注册条款，退出注册</el-button
        >
        <el-button @click="continueto" type="warning"
          >同意注册条款，继续注册</el-button
        >
        <br>
      </div>
    </div>
    <div id="form" style="display: none" class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户编号">
          <el-input
            type="text"
            placeholder="飞行员中心注册编号"
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
        <el-form-item label="确认密码">
          <el-input
            type="password"
            v-model="form.checkpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-checkbox-group v-model="form.type" :min="1" :max="3" >
            <el-checkbox label="Web浏览器"></el-checkbox>
            <el-checkbox label="Windows电脑版"></el-checkbox>
            <el-checkbox label="手机版"></el-checkbox>
            <el-checkbox label="iPad"></el-checkbox>
            <el-checkbox label="机模内置EFB"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="激活口令">
          <el-input
            type="text"
            placeholder="请输入激活口令"
            v-model="form.device"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="open">激活此设备</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="show" class="show">
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
import Fingerprint2 from "fingerprintjs2";
import { dataEncrypt } from "../utils/cryptoJS";
export default {
  name: "Authorize",
  data() {
    return {
      deviceid: "",
      Ip:'',
      ActiveNumber: "",
      form: {
        name: "",
        password: "",
        checkpassword: "",
        device: "",
        type: [],
      },
    };
  },
  methods: {
    open() {
      this.$confirm(
        "此操作将激活此设备的EFB使用授权，并绑定到当前用户账号下，是否确认激活？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.submitForm();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
    returnAccess() {
      this.$router.push("/Access");
    },
    goActive() {
      this.$router.push("/Active");
    },
    continueto() {
      document.getElementById("re-content").style.display = "none";
      document.getElementById("form").style.display = "block";
    },
    submitForm() {
      if (
        this.form.name == "" ||
        this.form.password == "" ||
        this.form.checkpassword == "" ||
        this.form.type == "" ||
        this.form.device == ""
      ) {
        this.$notify({
          title: "注册失败",
          message: `所填信息不完整或不正确`,
          type: "error",
        });
      } else if (this.form.password != this.form.checkpassword) {
        this.$notify({
          title: "注册失败",
          message: `两次输入密码不一致`,
          type: "error",
        });
      } else {
        //axios请求，获取数据
        //校验用户名与飞行员中心的是否一致
        //一致就继续开始注册，
        //开始算出设备激活码，成功注册后展示给用户
        document.getElementById("form").style.display = "none";
        document.getElementById("show").style.display = "block";
        //获取浏览器唯一标识
        Fingerprint2.get((components) => {
          let values = components.map((component) => component.value); // 配置的值的数组
          let id = Fingerprint2.x64hash128(values.join(""), 31); // 生成浏览器指纹
          let user = this.form.name;
          let DeviceInfoId = `EFBPersonalAccess:${id}&&DeviceInfo${user}`;
          //生成加密的DeviceInfoId，即为此设备的激活码
          let ActiveNumber = dataEncrypt(DeviceInfoId);
          this.ActiveNumber = ActiveNumber;
        });
        //document.getElementById("form").style.display = "none";
      }
    },
  },
  
};
</script>

<style scoped lang='less'>
.authorize-outer {
  position: fixed;
  overflow-y: auto;
  text-align: center;
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
}
.title {
  color: aliceblue;
  font-size: 28px;
  margin-top: 40px;
  font-weight: bold;
}
.content {
  margin-top: 20px;
  position: absolute;
  width: 60%;
  left: 20%;
  font-size: 20px;
  color: beige;
  background-color: rgb(24, 80, 129);
  border-radius: 5px;
  text-align: left;
  line-height: 34px;
  padding-left: 30px;
  padding-top: 20px;
  .select {
    margin-top: 30px;
    text-align: center;
    margin-bottom: 30px;
    .botton {
      width: 100px;
    }
  }
}
.form {
  width: 400px;
  margin: 40px auto;
  text-align: left;
  padding: 10px;
}
.show {
  display: none;
  position: relative;
  margin-top: 30px;
  width: 60%;
  left: 20%;
  font-size: 24px;
  color: white;
  line-height: 35px;
  background-color: rgb(24, 80, 129);
  border-radius: 5px;
}
#key {
  background-color: rgb(19, 62, 100);
  border-radius: 4px;
  color: red;
  left: 20%;
  position: relative;
  width: 60%;
  word-break: break-all;
}
</style>