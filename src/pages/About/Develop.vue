<template>
  <div class="dev-outer">
    <div class="img-card">
        <div class="text">
            <span class="text-1">欢迎使用SKYline电子飞行包</span> <br>
            <span class="text-2">Welcome to use SKYline EFB System</span>  
        </div>   
    </div>
    <div class="gen">
      <div class="title">开发简介 | Introduction of Development</div>
      <p class="content">
        SKYline电子飞行包由SKYline天际模飞交流俱乐部技术开发成员倾情设计， 融入了多种现代化程序开发模式与EFB基础功能。<br>
         SKYline EFB个人版将始终保持免费使用与更新，只为平台能够给广大飞友提供一个良好的交流与学习平台。
      </p>
    </div>
    <div class="list">
      <div class="title">开发团队 | Development Team</div>
      <div class="sub-title">EFB开发团队列表如下</div>
      <div class="list-area">
        <div v-for="(i,index) in list" :key="index" class="items">
        <div class="avatar-area">
          <img class="big" :src="`develop/${i.callsign}.jpg`" alt="big_Avatar">
        </div>
         <el-tooltip class="item" effect="dark" :content="`SKYline EFB认证：${i.title}`" placement="right">
        <div class="authorized-area">
            <img class="auth" :src="authorize_icon" :style="getAuthType(i.type,1)" alt="Authorized">
            <i class="auth el-icon-star-on" :style="getAuthType(i.type,2)"></i>
          </div>
           </el-tooltip>
        <div class="main" :class="i.type">{{i.name}}</div>
        <div class="intro">{{i.intro}}</div>
      </div>
      </div>
    </div>
    <div class="third-party">
      <div class="title">第三方使用说明 | Third Party Refering Instructions</div>
      <div class="third-items" target="__black">
        <a href="https://cn.vuejs.org/">
        <div class="icon">
          <img src="refer/vue.png" alt="Vue.js">
        </div>
        <div class="title">Vue.js</div>
        <div class="content">
          EFB基于Vue框架搭建<br><br>
        </div>
        </a>
      </div>
      <div class="third-items">
        <a href="https://element.eleme.cn/#/zh-CN" target="__black">
        <div class="icon">
          <img src="refer/element.png" alt="Element UI">
        </div>
        <div class="title">Element UI</div>
        <div class="content">
          EFB部分UI设计来自于Element UI<br><br>
        </div>
        </a>
      </div>
      <div class="third-items">
        <a href="https://developers.navigraph.com/docs/general/introduction" target="__black">
        <div class="icon">
          <img src="refer/navigraph.png" alt="Navigraph">
        </div>
        <div class="title">Navigraph</div>
        <div class="content">
          EFB部分资源来自于Navigraph<br><span class="im">(API非商业授权许可)</span>
        </div>
        </a>
      </div>
      <div class="third-items">
        <a href="https://leafletjs.cn/" target="__black">
        <div class="icon">
          <img src="refer/leaflet.png" alt="Leaflet">
        </div>
        <div class="title">Leaflet</div>
        <div class="content">
          EFB交互式地图基于Leaflet制作<br><br>
        </div>
        </a>
      </div>
      <div class="third-items">
        <a href="https://developers.arcgis.com/" target="__black">
        <div class="icon">
          <img src="refer/arcgis.png" alt="ArcGIS">
        </div>
        <div class="title">ArcGIS</div>
        <div class="content">
          EFB部分数据基于ArcGIS制作<br><br>
        </div>
        </a>
      </div>
      
    </div>
    <div class="contribute">
      <div class="title">EFB设计贡献名单 | EFB Design Contribution List</div>
      <div class="sub">收录EFB开发中为开发做出主要贡献的成员名单<br>
      若您也想被纳入名单中，请与系统管理员联系</div>
      <div class="list-area">
        <div v-for="(i,index) in con_list" :key="index" class="items">
        <div class="avatar-area">
          <img class="big" :src="`contribute/${i.callsign}.jpg`" alt="big_Avatar">
        </div>
        <el-tooltip class="item" effect="dark" :content="`SKYline EFB认证：${i.title}`" placement="right">
        <div class="authorized-area">
            <img class="auth" :src="authorize_icon" :style="getAuthType(i.type,1)" alt="Authorized">
            <i class="auth el-icon-star-on" :style="getAuthType(i.type,2)"></i>
          </div>
          </el-tooltip>
        <div class="main" :class="i.type">{{i.callsign}} - {{i.name}}</div>
        <div class="intro">{{i.intro}}</div>
      </div>
      </div>
      <br><br>
    </div>
    
  </div>
</template>

<script>
import authorize_icon from '@/assets/avatar/authorize.png'
import { getRandomString } from '@/utils/num'
export default {
  name:'Develop',
  data(){
    return{
      list:[],
      authorize_icon,
      con_list:[],
	  token:''
    }
  },
  mounted(){
	  this.token = getRandomString(24)
    this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/Authorized_JSON/authorize.json?token=${this.token}`).then((res)=>{
      this.list = res.data
    })
    this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/Authorized_JSON/contribute.json?token=${this.token}`).then((res)=>{
      this.con_list = res.data
    })
  },
  methods:{
    getAuthType(type,order){
      if (order == 1){
        return type == 'developAuthorize' ? `display:inline` : `display:none`
      }else if (order == 2){
        return type == 'developAuthorize' ? `display:none` : `display:inline`
      }
    }
  }
}
</script>

<style scoped lang="less">
a{
  text-decoration: none;
}
  .dev-outer{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    position: absolute;
    left: 0;
    top: 0;
    width:100%;
    height: 100%;
    min-width: 750px;
    background-image: url(@/assets/about/4.png);
    background-attachment: fixed;
    background-size: auto 100%;
    background-color: rgb(40,43,47);
    opacity: 0.95;
    .img-card{   
            position: relative;
            width: 100%;
            height: 350px;
            .text{
                position: absolute;
                top: 200px;
                width: 100%;
                margin: 0 auto;
                font-size: 40px;
                font-weight: bold;
                text-align: center;
                color: orangered;
                .text-2{
                    color: rgb(39, 211, 197);
                    font-style: italic;
                    font-size: 40px;
                }
            }
        }
        .gen{
          background-color: rgb(40,43,47);
          position: relative;
          width:100%;
          .title{
            color: yellow;
            font-size: 26px;
            padding-top: 10px;
          }
          .content{
            padding-top: 10px;
            padding-bottom: 20px;
            font-size: 20px;
            color: aliceblue;
          }
        }
        .list{
          position: relative;
          background-color: rgb(40,43,47);
          width: 100%;
          left: 0;
          text-align: center;
          margin-top: -20px;
          padding-top: 20px;
          padding-bottom: 20px;
          .title{
            color: orange;
            font-size: 26px;
            padding-top: 10px;
          }
          .sub-title{
            color: aliceblue;
            font-size: 20px;
            padding-top: 10px;
            padding-bottom: 30px;
          }
          
        }
        .third-party{
          position: relative;
          background-color: rgb(40,43,47);
          width: 100%;
          left: 0;
          padding-top: 30px;
          text-align: center;
          .title{
            position: relative;
            padding-top: 20px;
            padding-bottom: 20px;
            color: orange;
            font-size: 24px;
          }
          .third-items{
            position: relative;
            display: inline-block;
            width: 240px;
            margin-right: 20px;
            text-align: center;
            top: 0;
            .icon{
              position: relative;
              width: 70%;
              cursor: pointer;
              left: 15%;
             transition-duration: 0.4s;
             padding: 10px;
             img{
               position: relative;
               width: 100%;
             }
            }
            .title{
              color: aliceblue;
              font-size: 18px;
              font-weight: bold;
            }
            .content{
              color: antiquewhite;
              font-size: 16px;
              padding-bottom: 10px;
              .im{
                color: orangered;
              }
            }
          }
          .icon:hover{
            transform: scale(1.2);
          }
        }
        .contribute{
          position: relative;
          background-color: rgb(40,43,47);
          width: 100%;
          left: 0;
          padding-top: 30px;
          text-align: center;
          .title{
            position: relative;
            padding-top: 20px;
            padding-bottom: 20px;
            color: orange;
            font-size: 24px;
          }
          .sub{
            padding: 20px 0;
            color: aliceblue;
            font-size: 20px;
          }
        }
        .list-area{
            position: relative;
            left: 15%;
            width: 70%;
            background-color: rgb(208, 221, 233);
            border-radius: 10px;
            padding-top: 20px;
            padding-bottom: 20px;
            .items{
              background-color: aliceblue;
              position: relative;
              left: 6%;
              width: 88%;
              height: 120px;
              margin-top: 20px;
              margin-bottom: 20px;
              padding-right: 10px;
              border-radius: 8px;
              z-index: 1;
              .avatar-area{
                position: absolute;
                left: 20px;
                width: 80px;
                height: 80px;
                top: 20px;
                border: 3px solid lightgrey;
                border-radius: 60px;
                z-index: 2;
                overflow: hidden;
                .big{
                  position: relative;
                  width: 100%;
                  top: 0px;
                  z-index: 1;
                }
                
              }
              .authorized-area{
                  position: absolute;
                  left: 75px;
                  top: 75px;
                  bottom: 0;
                  width: 27px;
                  height: 27px;
                  z-index: 6;
                  float: left;
                  background-color: rgb(255,198,46);
                  border-radius:50%;
                  border:3px solid white;
                  .auth{
                    width: 95%;
                    text-align: center;
                    padding-top: 0.5px;
                    color: white;
                    font-size: 22px;
                    line-height: 26px;
                  }
                }
            }
            .main{
              position: absolute;
              left: 150px;
              padding-top: 20px;
              color: black;
              font-size: 24px;
              font-weight: bold;
            }
            .main.developAuthorize{
              color: orangered;
            }
            .main.personalAuthorize{
              color: rgb(89, 191, 231);
            }
            .intro{
              text-align: left;
              position: absolute;
              left: 150px;
              padding-top: 60px;
              color: black;
              font-size: 18px;
              margin-right: 10px;
            }
          }
  }
</style>