<template>
  <div class="a-index-outer">
    <div class="img-card">
        <div class="text">
            <span class="text-1">欢迎使用SKYline电子飞行包</span> <br>
            <span class="text-2">Welcome to use SKYline EFB System</span>  
        </div>   
    </div>
    <div class="feature">
        <div class="title">SKYline EFB V5 | 全新启航
            <div class="sub-title">电子飞行包新特性 | EFB NEW FEATURE</div>
        </div>
        <div class="line"></div>
        <!-- 每一个功能 -->
        <div class="items">
            <div class="avatar">
                <img :src="camera" alt="avatar_pic">
            </div>
            <div class="main">全新的UI设计</div>
            <div class="content">SKKYline EFB UI经过多次调整，v5版本加入响应式设计与夜间模式，增强移动端体验。</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="ui" alt="avatar_pic">
            </div>
            <div class="main">高效的开发平台</div>
            <div class="content">SKYline EFB 核心内容使用Vue.js开发，开发维护更加高效，支持的新特性更多，产品使用体验更佳</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="fly" alt="avatar_pic">
            </div>
            <div class="main">快捷的航图预览</div>
            <div class="content">作为SKYline EFB的核心功能，您可以随时可快速查阅各种航图。还可进行航图固定、筛选等快捷操作</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="data" alt="avatar_pic">
            </div>
            <div class="main">在线检查单</div>
            <div class="content">SKYline EFB v5推出功能更为强大的在线检查单功能，内部拥有模拟飞行主流机型的互动式检查单</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="prof" alt="avatar_pic">
            </div>
            <div class="main">互动式飞行准备</div>
            <div class="content">互动式飞行准备涵盖航路查询、进离场规划、飞行报告、气象资料等内容，可与平台联飞、机场航图预览进行互动</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="cal" alt="avatar_pic">
            </div>
            <div class="main">数据及时更新</div>
            <div class="content">EFB内的导航数据与航行资料会在新数据发布后自动更新，保障EFB数据时效性</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="interact" alt="avatar_pic">
            </div>
            <div class="main">用户的交互体验</div>
            <div class="content">SKYline EFB v5与用户交互更为密切。推出了FlightLink功能，借助FSD及连飞地图与用户飞行航班交互</div>
        </div>
        <div class="items">
            <div class="avatar">
                <img :src="world" alt="avatar_pic">
            </div>
            <div class="main">自定义导航数据</div>
            <div class="content">SKYline EFB v5新增自定义航路点/航段信息功能，可以随意编辑并在航路图显示，也可以在飞行计划中使用</div>
        </div>
    </div>
    <div class="split">
        <div class="text-1">SKYlineEFB功能图片预览</div>
        <div class="text-2">SKYline EFB Function Preview</div>
    </div>
    <div class="photos">
        <div class="sub">
             <div  v-for="(i,index) in this.imglist" :key="index"  class="photo-items">
                  <div class="demo-image__preview">
                      <el-image style="width: 100%; height: 100%" :src="i.src" :preview-src-list="imglist2">
                      </el-image>
                      </div>
            </div>
        </div>
        </div>
        
  </div>
</template>

<script>
import img1 from '@/assets/about/1.png'
import img2 from '@/assets/about/2.png'
import cal from '@/assets/about/cal.png'
import camera from '@/assets/about/camera.png'
import data from '@/assets/about/data.png'
import fly from '@/assets/about/fly.png'
import interact from '@/assets/about/interact.png'
import prof from '@/assets/about/prof.png'
import ui from '@/assets/about/ui.png'
import world from '@/assets/about/world.png'
export default {
    name:'Index',
    data(){
        return{
            img1,
            img2,
            cal,
            camera,
            data,
            fly,
            interact,
            prof,
            ui,
            world,
            imglist:[
                {"src":"preview/1.png","data":"航图预览","pro":"l"},
                {"src":"preview/2.png","data":"航图预览","pro":"r"},
                {"src":"preview/3.png","data":"航图预览","pro":"l"},
                {"src":"preview/4.png","data":"航图预览","pro":"r"},
                {"src":"preview/5.png","data":"航图预览","pro":"l"},
                {"src":"preview/6.png","data":"航图预览","pro":"r"},
                {"src":"preview/7.png","data":"航图预览","pro":"l"},
                {"src":"preview/8.png","data":"航图预览","pro":"r"},
                {"src":"preview/9.png","data":"航图预览","pro":"l"},
                {"src":"preview/10.png","data":"航图预览","pro":"r"}
            ],
            imglist2:[
                "preview/1.png",
                "preview/2.png",
                "preview/3.png",
                "preview/4.png",
                "preview/5.png",
                "preview/6.png",
                "preview/7.png",
                "preview/8.png",
                "preview/9.png",
                "preview/10.png"
            ]
        }
        
    }    
}
</script>

<style scoped lang="less">
    .a-index-outer{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        position: relative;
        width: 100%;
        height: auto;
        overflow-y: auto;
        left: 0px;
        top: 60px;
        background-image: url(@/assets/about/1.png);
        background-attachment: fixed;
        background-size: auto 100%;
        .img-card{   
            position: relative;
            width: 100%;
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
                    color: rgb(36, 235, 218);
                    font-style: italic;
                    font-size: 40px;
                }
            }
        }
        .feature{
            position: relative;
            left: 0;
            width: 100%;
            height: 1220px;
            opacity: 0.96;
            top: 500px;
            background-color: rgb(40,42,46);
            .title{
                position: relative;
                text-align: center;
                width: 100%;
                color: aliceblue;
                font-size: 28px;
                padding-top: 18px;
                .sub-title{
                    position: relative;
                    color: yellow;
                    font-size: 24px;
                    text-align: center;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
            }
            .line{
                position: relative;
                margin-top: 10px;
                margin-bottom: 10px;
                width: 80%;
                left: 10%;
                height: 3px;
                background-color: rgba(240, 248, 255, 0.199);
            }
            .items{
                position: relative;
                margin-top: 10px;
                margin-bottom: 10px;
                background-color: rgb(36, 43, 88);
                border-radius: 5px;
                transition-duration: 0.3s;
                padding-top: 10px;
                padding-bottom: 5px;
                height: 110px;
                margin-left: 10px;
                width: calc(100% - 60px);
                .avatar{
                    position: absolute;
                    top: 20px;
                    left: 12px;
                    height: 80px;
                    width: 80px;
                    border-radius: 40px;
                    background-color: rgb(37, 56, 102);
                    img{
                        width: 50px;
                        text-align: center;
                        padding-top: 10px;
                    }
                }
                .main{
                    position: absolute;
                    left: 120px;
                    color: white;
                    font-size: 25px;
                    padding-top: 4px;
                    transition-duration: 0.3s;
                }
                .content{
                    text-align: left;
                    position: absolute;
                    left: 120px;
                    color:rgb(247, 243, 239);
                    font-size: 16px;
                    padding-top: 45px;
                    font-weight: lighter;
                }
            }
            .items:hover{
                background-color: rgb(45, 55, 121);
                .main{
                    color: orangered;
                }
            }
        }
        .split{
            position: relative;
            top: 630px;
            text-align: center;
            .text-1{
                color: orange;
                font-size: 40px;
            }
            .text-2{
                color: aliceblue;
                font-size: 28px;
                font-style: italic;
            }
        }
        .photos{
            position: relative;
            width: 100%;
            top: 630px;
            height: 140px;
            margin-top: 30px;
            padding-top: 20px;
            padding-left: 20px;
            .sub{
                position: relative;
                padding-left: 10px;
                padding-right: 10px;
                left: 22%;
                .photo-items{
                padding-bottom: 30px;
                width: 54%;
                cursor: pointer;
                .content{
                    position: relative;
                    //top: -100px;
                    color: aliceblue;
                }
            }
            }
            
        }
    }
    
</style>
