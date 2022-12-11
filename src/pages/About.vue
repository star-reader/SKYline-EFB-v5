<template>
  <div class="about-outer">
  <el-menu  :active="activeIndex" router @select="handleSelect" class="el-menu-demo" mode="horizontal">
  <el-menu-item><img class="top-logo" width="170px" style="padding-right:10px" :src="logo" alt="logo"></el-menu-item>
  <el-menu-item index="/About/Index">系统介绍</el-menu-item>
  <el-menu-item index="/About/Download">系统下载</el-menu-item>
  <el-menu-item index="/About/Development">开发说明</el-menu-item>
  <el-menu-item index="/About/API">开放平台</el-menu-item>
  <el-menu-item index="/About/DonateUs">捐赠我们</el-menu-item>
</el-menu>
<router-view></router-view>
  </div>
</template>

<script>
import logo from "@/assets/logo.png"
export default {
    name:'About',
    data(){
        return{
            activeIndex: '/About/Index',
            logo,
        }
    },
    props:['setWidth','cycle','u_newAwyData','getUser','AD','Vector'],
    mounted(){
        this.setWidth()
    if (this.$route.path == '/About'){
        this.$router.push('/About/Index')
    }
    
    },
    methods:{
        handleSelect(key) {
        this.activeIndex = key
      }
    }
}
</script>

<style scoped lang="less">
    .about-outer{
        position: fixed;
        left: 0;
        right: 30%;
        text-align: center;
        top: 50px;
        height: calc(100% - 50px);
        width: 100%;
        overflow: auto;
        .el-menu-demo{
            position: fixed;
            z-index: 10;
            width: 100%;
            float: right;
            color: black;
            font-size: 26px;
            margin: 0 auto;
            .el-menu-item{
                color: black;
                font-size: 16px;
                text-decoration: none;
                line-height: 70px;
                padding-left: 30px;
            }
            .el-menu-item:hover{
                color: rgb(0,108,255);
            }
        }
    }
</style>