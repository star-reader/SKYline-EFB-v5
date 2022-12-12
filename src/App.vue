<template>
  <div id="div" :class="isNightMode()">
    <div id="load">
      <div class="logo">
        <img src="logo.png" width="200px" alt="logo">
      </div>
      <div class="content">
        欢迎使用SKYline电子飞行包
      </div>
      <div class="icon-show">
        <i class="el-icon-loading"></i>
      </div>
      <div class="buttom-text">
        SKYline EFB System - Version v{{ version }} <br>
        EFB System Developed by SKYline Flyleague Technical Group <br>
        Copyright &copy; 2020-2022 SKYline Flyleague. All rights reserved <br>
        <!-- Navdata and charts API by Navigraph. Non commercial license. <br> -->
      </div>
    </div>
    <div class="copyright"> <span>SKYline电子飞行包 | NavData API - <a target="__black"
          href="http://navigraph.com/">Navigraph</a> | <a target="__black"
          href="https://ww2.jeppesen.com/">Jeppesen</a></span> </div>
    <Nav></Nav>
    <Left></Left>
    <keep-alive>
      <router-view :key="key" v-if="$route.meta.keepAlive" :setWidth="setWidth" :cycle="cycle"></router-view>
    </keep-alive>
    <router-view :key="key" v-if="!$route.meta.keepAlive" :setWidth="setWidth" :cycle="cycle"></router-view>
    <Pin class="app-pin" />
  </div>
</template>

<script>
// localhost cert msTzoe7c1D4flTFB5JypXFTbOy5p7LUQB0CxJFwR4BlUSLEIoiFdI3LISUWgAvP4kYvV/ipVxfA9yO9gSAUaR16Z0iV8sMItAGBm8LHF1GFERZvMlwbSi+EvKmH9KyrxWq5hCG0s41maveEzR1tp7qRpfvKmHrgOibBRd1L69siysCP4TzRClZj9FPIgZCLQMZBdj0boZhXWDum5xiimhnZNPhDosA6etRSGOjUM7IZrDLfgEkZX46p3GrBMaVSuLWZ+8EXfLPZJZYDWCKV7G4uhhjFyGn08IjCQxEEg/4d52uiMk4/fvcVxyx2vAL1x
import Nav from "./components/Nav.vue";
import Left from "./components/Left.vue";
import { dataDecrypt, tokenDecrypt } from "./utils/cryptoJS";
import Pin from "./components/Pin.vue";
export default {
  name: "App",
  components: { Nav, Left, Pin },
  data() {
    return {
      width: 0,
      cycle: '',
      Data: [],
      AD: '',
      Vector: [],
      Enroute: '',
      Perview: '',
      personalData: {
        cid: 'skyline',
        email: null,
        avatar: false,
        authorizedUser: false,
        authorizeText: null,
        waypoint: false,
        airway: false,
        airport: false,
        fixedJSONAirway: false,
        charts: false,
        LastSyncedFlight: false
      },
      valid: 'no',
      allPin: [],
      searchText: '',
      loginStatus: false,
      version: '5.3.2'
    };
  },
  computed: {
    key() {
      // return this.$key();
      return this.$route.path
    }
  },
  watch: {
    $route() {
      this.pubsub.publish('personalData', this.personalData)
      setTimeout(() => {
        this.pubsub.publish('getUser', this.loadUserInfo)
        this.setWidth()
      }, 300)
    }
  },
  mounted() {
    this.checkOldUrl()
    window.addEventListener("keydown", function (e) {
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
      }
    }, false);
    this.checkUpdate()
    if (localStorage.getItem('user_certificate') != null) {
      this.loginStatus = true
    }
    if (!this.loginStatus) {
      if (this.$route.path.indexOf('/About') == -1) {
        this.$router.push('/Login')
      } else {
        document.getElementById('load').style.display = 'none'
      }
    }
    this.checkValidUser()
    //查看域名有效访问权限
    //页面加载效果汇总
    this.setWidth()
    window.onresize = () => {
      this.setWidth()
    }
    if (this.$route.path == '/Chart') {
      try {
        let t = document.getElementsByClassName('b-items')
        for (let i = 0; i < t.length; i++) {
          t[i].style.color = 'aliceblue'
        }
        document.getElementById('b-enroute').style.color = 'skyblue'
      } catch (error) {

      }
    }
    this.getCycleData()
    this.pubsub.publish('getUser', this.getUser)

  },
  methods: {
    isNightMode() {
      let d = localStorage.getItem('nightMode')
      if (d == null) {
        localStorage.setItem('nightMode', 'false')
        return 'day-mode'
      } else if (d == 'true') {
        return 'night-mode'
      } else if (d == 'false') {
        return 'day-mode'
      }
    },
    checkOldUrl() {
      const url = window.location.href
      if (url.indexOf('#') != -1) {
        //hash残存
        let new_url = window.location.origin + url.split('#')[1]
        window.location.href = new_url
      }
    },
    refreshToken() {
      setInterval(() => {
        this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/token?user_certificate=${localStorage.getItem('user_certificate')}`).then(res => {
          if (res.data.access_token) {
            localStorage.setItem('access_token', res.data.access_token)
          }
        })
      }, 1500000);
    },
    checkValidUser() {
      return false
      //隐私问题删除
    },
    loadUserInfo(halfWay) {
      return false
      //隐私问题删除
    },
    getCycleData() {
      this.$axios
        .get(`https://api.skylineflyleague.cn/efb_api_v2/currentAIRAC`).then((res) => {
          this.cycle = res.data
          this.pubsub.publish('navdata', `数据版本: AIRAC ${res.data.airac} 生效时间: ${res.data.effective}`)
          if (localStorage.getItem('cycle') != this.cycle.airac) {
            this.$notify({
              title: "数据更新说明",
              message: `EFB系统导航数据已更新至${this.cycle.airac}期！导航数据只可用于模拟飞行，切勿在真实飞行中使用`,
              type: "warning",
              duration: 0,
            });
            localStorage.setItem('cycle', this.cycle.airac)
          }
        });
    },
    checkUpdate() {
      const version = this.version
      if (localStorage.getItem('EFBversion') == null && localStorage.getItem('showFlightLink') == null) {
        //初次使用EFB，不做提示，记录localstorage
        localStorage.setItem('EFBversion', version)
      } else if (localStorage.getItem('EFBversion') != version) {
        //提示新版本更新
        setTimeout(() => {
          this.$alert(`<strong>EFB系统更新至V${version}</strong><br>
            <span>&nbsp;&nbsp;1- 更新夜间模式下航路图未加载区域显示效果</span><br>
            <span>&nbsp;&nbsp;2- 飞行规划部分逻辑修改</span><br>
            <span>&nbsp;&nbsp;3- 修改公告弹窗显示方式与账号验证码绑定</span><br>
            <span>&nbsp;&nbsp;4- 修改导航台搜索显示效果</span><br>
            <span>&nbsp;&nbsp;5- 修改token令牌刷新时间</span><br>
            <strong>祝您使用愉快~</strong>`, 'EFB更新说明', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '还是确定',
            type: 'success'
          }).then(() => {
            localStorage.setItem('EFBversion', version)
          }).catch(() => {
            localStorage.setItem('EFBversion', version)
          });
        }, 1600)

      }
      if (localStorage.getItem('showFlightLink') == null) {
        localStorage.setItem('showFlightLink', 'true')
      }
    },
    showMessage() {
      if (localStorage.getItem('messageDate') != new Date().getDate()) {
        setTimeout(() => {
          this.$alert(`SKYLINE飞友：您好！ <br>
            为了您可以收到最新的产品更新消息以及连飞活动预告，
            SKYLINE天际模飞俱乐部诚挚邀请您加入SKYLINE天际模飞俱乐部官方群聊，<br>
            QQ群号：563519397，<br>
            加群链接：<a href='https://jq.qq.com/?_wv=1027&k=122prQ6R' style='color:orangered'>点击加群</a> <br>
            请填写您的有效注册编号申请加群。<br>
            若有打扰，请见谅`, '平台公告', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '收到',
            cancelButtonText: '我已加群,永久关闭此弹窗',
            type: 'success'
          }).then(() => {
            localStorage.setItem('messageDate', new Date().getDate() + '')
          }).catch(() => {
            this.$prompt('请输入账号验证码(入群后@机器人获取)', '加群验证', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: '',
              inputErrorMessage: '格式不正确'
            }).then(({ value }) => {
              let d = {}
              d = tokenDecrypt(value)
              if (JSON.parse(d).cid != this.personalData.cid) {
                return this.$message.error('验证失败')
              }
              this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/bind?valid=${value}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
              }).then(res => {
                return this.$message.success('验证成功')
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          });
        }, 1600)

      }
    },
    setWidth() {
      this.width = document.documentElement.clientWidth;
      return this.width
    },
  },
};
</script>

<style lang="less">
.router {
  position: relative;
  left: 0;
}

#div {
  touch-action: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#load {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(27, 30, 56);

  .logo {
    position: relative;
    width: 200px;
    margin: auto;
    top: 85px;
    height: 200px;
  }

  .content {
    top: 135px;
    position: relative;
    text-align: center;
    color: aliceblue;
    font-size: 24px;
  }

  .icon-show {
    position: relative;
    top: 165px;
    color: skyblue;
    font-size: 40px;
    text-align: center;
    font-weight: bold;
  }

  .buttom-text {
    position: relative;
    top: 200px;
    color: aliceblue;
    font-size: 16px;
    text-align: center;
  }
}

.show {
  display: block;
}

.no-show {
  display: none;
}

#nav-left {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 50px;
  height: 395px;
  width: 300px;
  display: none;
  animation: showleft 0.5s;
  overflow-y: auto;
}

@keyframes showleft {
  0% {
    left: -300px;
  }

  100% {
    left: 0;
  }
}

.app-pin {
  display: none;
}

.copyright {
  opacity: 0.65;
  padding-left: 5px;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 335px;
  height: 20px;
  background-color: aliceblue;
  border-radius: 2px;
  color: orangered;
  text-align: right;
  z-index: 1000;
  font-size: 13px;
  padding-right: 5px;
}

.copyright a {
  text-decoration: none;
  color: orangered;
}

.el-message-box {
  width: 340px !important;
}
</style>
