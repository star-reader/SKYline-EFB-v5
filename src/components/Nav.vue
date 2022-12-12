<template>
  <div>
     <div class="nav">
      <div class="title">
        <div id="mobile-display-list" >
          <el-dropdown trigger="click" @command="handleCommand">
            <el-tooltip class="item" effect="dark" content="功能列表" placement="right">
              <i style="font-size:25px" class="el-icon-s-operation"></i>
            </el-tooltip>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="Airport">
                <i class="el-icon-office-building"></i><span>机场航图</span>
                </el-dropdown-item> -->
              <el-dropdown-item command="Enroute">
                <i class="el-icon-football"></i><span>航图预览</span>
                </el-dropdown-item>
              <el-dropdown-item command="Supplement">
                <i class="el-icon-folder-add"></i><span>补充资料</span>
                </el-dropdown-item>
              <el-dropdown-item command="Other">
                <i class="el-icon-files"></i><span>其他航图</span>
                </el-dropdown-item>
              <el-dropdown-item command="Checklist">
                <i class="el-icon-folder-checked"></i><span>检查单</span>
                </el-dropdown-item>
              <el-dropdown-item command="Personal">
                <i class="el-icon-user"></i><span>用户数据</span>
                </el-dropdown-item>
              <el-dropdown-item command="About">
                <i class="el-icon-info"></i><span>系统说明</span>
                </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div id="left-icon">
          <el-tooltip class="item" effect="dark" content="搜索机场" placement="bottom">
            <a @click="openSearch" id="search-phone-icon" ><i style="font-size:25px" class="el-icon-search"></i></a>
        </el-tooltip>
        <div class="search-box">
             <el-input
            placeholder="输入搜索内容"
            prefix-icon="el-icon-search"
            @keyup.enter.native="searchStart"
            v-model="search_word">
        </el-input>
        </div>
        <el-tooltip class="item" effect="dark" content="创建飞行计划" placement="right">
          <a @click="openFlightPlan" style="z-index: 12;" ><i style="font-size:25px" class="el-icon-circle-plus-outline"></i></a>
         </el-tooltip>
        </div>
      </div>
      
      <div class="info-show">
        {{navdata}}
      </div>
    <div class="action">
        <div>
        <el-dropdown>
        <el-tooltip class="item" effect="dark" content="航路图图层选择" placement="left">
            <a><i style="font-size:25px" class="el-icon-map-location"></i></a>
        </el-tooltip>
         <el-dropdown-menu slot="dropdown">
            <el-dropdown-item id="jeppesen" @click.native="selectMap('jeppesen')" >Navigraph Jeppesen高空图层</el-dropdown-item>
            <el-dropdown-item id="low" @click.native="selectMap('low')" >Navigraph Jeppesen低空图层</el-dropdown-item>
            <el-dropdown-item id="vfr" @click.native="selectMap('vfr')">VFR图层</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </div>
        <div>
            <el-tooltip class="item" :id="simLinkActive()" effect="dark" content="启动SKYline FlightLink" placement="bottom-start">
                <a @click="setSimLink" ><i style="font-size:25px" class="el-icon-position"></i></a>
                </el-tooltip>
        </div>

        <div>
            <el-tooltip class="item" :id="nightModeActive()" effect="dark" content="夜间模式" placement="bottom">
                <a @click="setNightMode" ><i style="font-size:25px" class="el-icon-moon"></i></a>
                </el-tooltip>
        </div>
        <div>
            <el-tooltip class="item" effect="dark" content="个人信息" placement="bottom">
                <div  @click="showPersonalCard">
                    <div id="person" ><img :src="getUserAvatar()" alt="personal" width="105%" height="105%"></div>
                    <div v-if="personalData.authorizedUser" class="authorized-area">
                        <img width="100%" v-if="personalData.authorizedUser == 'developAuthorize'" class="auth" :src="authorize_icon" alt="Authorized">
                        <i class="auth el-icon-star-on" v-if="personalData.authorizedUser == 'personalAuthorize'"></i>
                    </div>
                </div>
                </el-tooltip>
        </div>
    </div>
  </div>
  
  <div class="personal-card">
    <div class="avatar" @click="changeAvatar" id="main-avatar">
    
    <img title="点击更换头像" :src="getUserAvatar()" alt="main-avatar" width="105%" height="105%">
    </div>
    <div v-if="personalData.authorizedUser" class="authorized-area-main">
        <img width="100%"  class="auth" v-if="personalData.authorizedUser == 'developAuthorize'" :src="authorize_icon" alt="Authorized">
        <i class="auth el-icon-star-on" v-if="personalData.authorizedUser == 'personalAuthorize'"></i>
    </div>
    <div class="callsign" :class="personalData.authorizedUser">{{personalData.cid}}</div>
    <div class="auth-data">
            <div  class="icon">
                <div v-if="personalData.authorizedUser" class="authorized-area-2">
            <img width="100%"  class="auth" v-if="personalData.authorizedUser == 'developAuthorize'" :src="authorize_icon" alt="Authorized">
            <i class="auth el-icon-star-on" v-if="personalData.authorizedUser == 'personalAuthorize'"></i>
          </div>
            </div>
            <div class="text">{{getAuthText1()[0]}} <br>{{getAuthText1()[1]}} </div>
    </div>
    <el-button @click="showAuthLaw" class="lo-button" type="primary">了解认证体系</el-button> <br> <br>
    <el-button @click="gotoDonate" class="lo-button" type="primary">捐赠我们</el-button> <br> <br>
    <el-button @click="logOut" class="lo-button" type="warning">退出登录</el-button>
  </div>
  <el-card class="upload">
      <div class="close" @click="closeUpload"><i class="el-icon-circle-close"></i></div>
      <div class="title">更新头像</div>
      <span>建议使用接近正方形的图片作为头像</span><br>
      <!-- <input type="file" @change="changeFile" name="upload" value="上传头像"> -->
      <el-upload
          class="upload-demo"
          drag
          accept="image/*"
          :before-upload="changeFile"
          action="https://upload.api.skylineflyleague.cn/avatar?type=1"
          :limit="1">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传图片类型的文件，且不超过2M</div>
        </el-upload>
  </el-card>
  <div class="auth-detail-card">
    <div class="title">EFB认证体系说明
<i  class="el-icon-circle-close close"></i>
    </div>
    <div class="sub-title">一、认证分类</div>
    <div class="content">EFB认证分为开发者认证、个人认证</div>
    <div class="sub-title">二、认证功能和标识</div>
    <div class="content">是否拥有EFB认证不影响功能使用，全部功能均无差别。
      拥有EFB认证的账号会在头像右上角出现认证标识(开发者认证为对号√，个人认证为星标，无认证账号无标识)，
      同时在列表和个人信息中，认证用户头像高亮显示（开发者认证橘红色，个人认证浅蓝色，无认证正常黑色）。
    </div>
    <div class="sub-title">三、认证获得方法</div>
    <div class="content">开发者认证：直接参与EFB代码编写、功能设计、功能评估且对开发有较大贡献 <br>
    个人认证：在系统说明→捐赠我们中捐赠EFB并正确留下联系方式、对EFB功能测评、界面设计、资源提供有较大帮助 <br>
    以上各方面内容满足任意一条或多条即可申请相应认证。
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery'
import authorize_icon from '@/assets/avatar/authorize.png'
import {clearCookie} from '@/utils/cookie'
export default {
  name: "Nav",
  data(){
    return {
        authorize_icon,
        navdata:'',
        personalData:{},
        search_word:''
    }
  },
  mounted(){
    this.pubsub.subscribe('personalData',(name,data)=>{
      this.personalData = data
    })
    this.pubsub.subscribe('navdata',(name,data)=>{
      this.navdata = data
    })
  },
  methods:{
    handleCommand(command) {
        this.$router.push(`/${command}`)
      },
      selectMap(type){
          localStorage.setItem('map',type)
          this.$message.success('地图修改成功~')
          this.pubsub.publish('change_Map',type)
      },
      setSimLink(e){
          if (localStorage.getItem('showFlightLink') != 'true'){
              localStorage.setItem('showFlightLink','true')
              e.target.style.color = 'red'
          }else{
              localStorage.setItem('showFlightLink','false')
              e.target.style.color = 'aliceblue'
          }
      },
      //设置启动就显示simlink信息
      simLinkActive(){
          return localStorage.getItem('showFlightLink') != 'true' ? 'unactive' : 'active'
      },
      showAuthLaw(){
        open('https://pilot.skylineflyleague.cn/offical/auth')
      }, 
      closeAuthLaw(){
        open('https://pilot.skylineflyleague.cn/offical/auth')
      }, 
      setNightMode(e){
          if (localStorage.getItem('nightMode') != 'true'){
              localStorage.setItem('nightMode','true')
              e.target.style.color = 'red'
              let aviv = document.querySelectorAll('.day-mode')
              for (let i = 0; i < aviv.length; i++){
                  aviv[i].classList.remove('day-mode')
                  aviv[i].classList.add('night-mode')
              }
          }else{
              localStorage.setItem('nightMode','false')
              e.target.style.color = 'aliceblue'
              let aviv = document.querySelectorAll('.night-mode')
              for (let i = 0; i < aviv.length; i++){
                  aviv[i].classList.remove('night-mode')
                  aviv[i].classList.add('day-mode')
              }
          }
      },
      nightModeActive(){
          return localStorage.getItem('nightMode') != 'true' ? 'unactive' : 'active'
      },
      getUserAvatar(){
        if (this.personalData.avatar == null){
            return `https://api.skylineflyleague.cn/efb/data/user_main_data/avatar/skyline.jpg`
        }else {
            return `https://api.skylineflyleague.cn/efb/data/user_main_data/avatar/${this.personalData.cid}.jpg`
        }
      },
    getAuthText1(){
      if (!this.personalData.authorizedUser){
        return ['尚未拥有EFB认证','']
      }else{
        return  ['SKYline EFB认证:',`${this.personalData.authorizeText}`] 
      }
    },
    showPersonalCard(){
        let ele = document.querySelector('.personal-card')
        if (ele.style.display == 'block'){
            ele.style.display = 'none'
        }else{
            ele.style.display = 'block'
        }
    },
    changeFile(e){
	// change file
    },
    changeAvatar(){
      document.querySelector('.upload').style.display = 'block'
    },
    closeUpload(){
      document.querySelector('.upload').style.display = 'none'
    },
    logOut(){
      localStorage.removeItem('user_certificate')
      document.querySelector('.personal-card').style.display = 'none'
      this.$router.push('/Login')
    },
    openSearch(){
      const element = $('.search-box')
      if (element.css('display') != 'inline-block'){
        element.css('display','inline-block')
      }else{
        element.css('display','none')
      }
        
    },
    searchStart(){
      this.pubsub.publish('search',this.search_word)
    },
	openFlightPlan(){
		$('#r-main').css('display','block')
	},
  gotoDonate(){
    this.$router.push('/About/DonateUs')
    document.querySelector('.personal-card').style.display = 'none'
  }
  },

}
</script>

<style lang="less" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  height: 50px;
  background-color: rgb(54, 61, 105);
  z-index: 2;
}
.title{
    position: relative;
    left: 10px;
    font-size: 30px;
    line-height: 50px;
    color: cornflowerblue;
    #mobile-display-list{
      width:60px;
      float: left;
      position: absolute;
      top: -2.8px;
    }
    #left-icon{
      left: 50px;
      position: absolute;
      top: -2.8px;
      // position: relative;
    }
}
.show{
    display: none;
}
.no-show{
    display: block;
}
.action{
    position: fixed;
    top: 5px;
    float: right;
    right: 20px;
    color: aliceblue;
    font-size: 30px;
}
.action div{
    float: left;
    width: 45px;
}

#naip{
    cursor: not-allowed;
}
.info-show{
  position: absolute;
  left: 25%;
  top: 0;
  height: 50px;
  width: 50%;
  text-align: center;
  color: rgb(216, 213, 213);
  font-size: 15px;
  line-height: 50px;
  overflow: hidden;

}
  @media only screen and (max-width: 800px) {
    .info-show{
      width: 0px;
    }
  }
.el-tooltip{
    cursor: pointer;
    padding: 0 15px;
    color: aliceblue;
    font-size: 30px;
}
#active{
    color: red;
}
#person{
    padding: 0;
    display: inline;
    top: 0;
    left: 0;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 2px solid gray;
    overflow: hidden;
    cursor: pointer;
}
.authorized-area{
                position: absolute;
                left: 174px;
                top: 20px;
                width: 15px !important;
                height: 15px;
                background-color: rgb(255,198,46);
                  border-radius:50%;
                  border:1.5px solid white;
                  .auth{
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    padding-top: 0.5px;
                    color: white;
                    font-size: 16px;
                    line-height: 15px;
            }
}
.authorized-area-main{
                position: absolute;
                left: 145px;
                top: 70px;
                width: 30px !important;
                height: 30px;
                background-color: rgb(255,198,46);
                  border-radius:50%;
                  border:1.5px solid white;
                  .auth{
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    padding-top: 0.5px;
                    color: white;
                    font-size: 28px;
                    line-height: 28px;
            }
}
.personal-card{
    display: none;
    top: 50px;
    padding-bottom: 10px;
    position: absolute;
    right: 10px;
    height: 405px;
    width: 230px;
    border-radius: 10px;
    background-color: aliceblue;
    z-index: 100;
    animation: showcard 0.2s;
    .avatar{
        margin-top: 10px;
        position: relative;
        width: 100px;
        left:65px;
        height: 100px;
        border-radius: 50%;
        border: 3px solid gray;
        overflow: hidden;
        cursor: pointer;
    }
    .callsign{
        position: relative;
        padding: 10px 0;
        font-size: 25px;
        font-weight: bold;
        text-align: center;

    }
            .callsign.developAuthorize{
              color: orangered;
            }
            .callsign.personalAuthozize{
              color: rgb(89, 191, 231);
            }
    .auth-data{
        position: relative;
        width: 210px;
        left: 10px;
        padding-top: 10px;
        .authorized-area-2{
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: rgb(255,198,46);
                  border-radius:50%;
                  border:3px solid white;
                  .auth{
                    width: 100%;
                    text-align: center;
                    padding-top: 0.5px;
                    color: white;
                    font-size: 28px;
                    line-height: 30px;
                  }
                }
                .text{
                    position: absolute;
                    left: 50px;
                    color: black;
                    font-size: 16px;
                    text-align: center;
                }
    }
    .lo-button{
      position: relative;
      top:75px;
      width: 60%;
      left: 20%;
    }
    @keyframes showcard {
        0%{
            opacity: 0;
            transform: scale(0.1);
        }
        100%{
            opacity: 1;
            transform: scale(1);
        }
    }
    
}
.upload{
          display: none;
          position: absolute;
          left: 30%;
          width: 30%;
          top: 100px;
          z-index: 30;
          background-color: aliceblue;
          border-radius: 8px;
          padding: 15px;
          animation: showupload 0.6s;
          .title{
            text-align: center;
            color: black;
            font-size: 18px;
            font-weight: bold;
            padding-top: -10px;
          }
          .close{
            position: absolute;
            right: 4px;
            top: 3px;
            font-size: 20px;
            cursor: pointer;
          }
        }
        
  
.auth-detail-card{
  position: fixed;
  display: none;
  top: 100px;
  z-index: 8;
  width: 50%;
  left: 25%;
  padding: 10px 20px;
  background-color: aliceblue;
  animation: showupload 0.4s;
  .title{
    position: relative;
    color: black;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    .close{
            position: absolute;
            right: 4px;
            top: 3px;
            font-size: 20px;
            cursor: pointer;
          }
  }
  .sub-title{
    position: relative;
    color: orangered;
    font-weight: bold;
    font-size: 15px;
  }
  .content{
    position: relative;
    color: rgb(46, 45, 45);
    font-size: 15px;
  }
}
@keyframes showupload {
          0%{
            top: 0px;
            opacity: 0.3;
          }
          100%{
            top: 100px;
            opacity: 1;
          }
        }
#search-phone-icon{
  display: none;
}
.search-box{
  //display: none;
  position: relative;
  left: 5px;
  display: inline-block;
  width: 140px;
  z-index: 11;
  //top: 60px;
  animation: openSearch 0.4s;
}
@keyframes openSearch {
  0%{
    width: 0px;
  }
  100%{
    width: 140px;
  }
}

@media only screen and (max-width: 900px){
  #search-phone-icon{
    display: inline-block;
  }
  .search-box{
    display: none;
  }
}
@media only screen and (min-width: 900px){
  .search-box{
    display: inline-block !important;
  }
}
</style>
<style lang="less">
.search-box{
  .el-input__inner{
    height: 30px;
  }
}
.night-mode .search-box{
  .el-input__inner{
    background-color: rgb(64, 73, 131);
    color: lightgray;
    border: 1px solid gray;
  }
}
</style>
