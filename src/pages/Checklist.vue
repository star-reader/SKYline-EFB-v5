<template>
  <div class="cklist-outer">
  <el-tabs  id="ck-tab" type="border-card" class="tab" v-model="activeName">
    <el-tab-pane v-for="(item,index) in data[0][0]" :key="index" @click="check" class="it"  label="iten.name" name="item.name">
        <div class="items uncomplete" ><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i><span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { dataDecrypt, dataEncrypt } from '@/utils/cryptoJS';
import {getRandomString} from '@/utils/num'
export default {
  name:'Checklist',
  data() {
      return {
        personalData:[],
        activeName: 'A320',
        data:[]
    },
    methods:{
    parseData(){
      this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/SUP_OTHER_CHECKLIST_Database/v2/checklist.db`).then((res)=>{
        let resdata = res.data
        let data = JSON.parse(JSON.stringify(dataDecrypt(resdata.slice(10,resdata.length))))
        this.data = JSON.parse(JSON.parse(JSON.stringify(data)))
      })
    },
      check(e){
     if (e.target.getAttribute('class') == 'items uncomplete'){
       //完成检查单
       e.target.setAttribute('class','items complete')
     }else if (e.target.getAttribute('class') == 'items complete'){
       //取消弄好的检查单
       e.target.setAttribute('class','items uncomplete')
     }else if (e.target.getAttribute('class') == 'el-icon-circle-close uncomplete'||
     e.target.getAttribute('class') == 'el-icon-circle-check complete' ||
     e.target.getAttribute('class') == 'c'){
       let a = e.target.parentNode.getAttribute('class')
       let ele = e.target.parentNode
       if (a == 'items uncomplete'){
         ele.setAttribute('class','items complete')
       }else if (a == 'items complete'){
         ele.setAttribute('class','items uncomplete')
       }
     }
    }

    },
    props:['setWidth','cycle'],
    mounted(){
    this.setWidth()
    this.parseData()
    this.pubsub.subscribe('personalData',(name,data)=>{
            this.personalData = data
        })
    }
}
</script>

<style scoped lang="less">
.night-mode {
  filter: invert(90%) contrast(150%) brightness(80%) hue-rotate(180deg);
}

.day-mode {
  filter: invert(0%) contrast(100%) brightness(100%);
}

  .cklist-outer{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    position: fixed;
    left: 0px;
    width: 100%;
    top: 50px;
    height: 100%;
    background-color: rgb(48,56,124);
    overflow: auto;
  }
  .tab{
    position: absolute;
    width: 100%;
    height: 100%;
    left: -1px;
    border-top: 1px solid rgb(48,56,124);
    border-left: -2px solid rgb(33, 38, 85);
    padding-left: 0px;
    color: aliceblue;
  }
  
</style>
<style lang="less">
@font-face {
  font-family: list;
  src: url(list.woff);
}
.cklist-outer .el-tabs--border-card>.el-tabs__header{
  background-color: rgb(48, 56, 124);
  border: 1px solid rgb(48, 56, 124);
}
.cklist-outer .el-tabs__item {
  font-family: list;
  font-size: 14px;
  padding-left: 15px;
  background-color: rgb(48, 56, 124);
  margin-top: 0 !important;
  padding-right:15px;
  color: aliceblue !important;
}
#tab-A320.is-active{
    background-color:rgb(135, 201, 69);
    border-radius: 6px;
    text-align: center;
  }
#tab-A330.is-active{
    background-color:rgb(231, 127, 90);
    border-radius: 6px;
    text-align: center;
    color: black;
  }
#tab-A350.is-active{
    background-color:rgb(240, 192, 59);
    border-radius: 6px;
    text-align: center;
    color: black;
  }
#tab-A380.is-active{
    background-color:rgb(39, 217, 248);
    border-radius: 6px;
    text-align: center;
    color: black;
  }
#tab-B737.is-active{
    background-color:rgb(218, 127, 16);
    border-radius: 6px;
    text-align: center;
  }
#tab-B747.is-active{
    background-color:rgb(224, 94, 224);
    border-radius: 6px;
    text-align: center;
  }
#tab-B777.is-active{
    background-color:rgb(214, 96, 155);
    border-radius: 6px;
    text-align: center;
  }
#tab-B787.is-active{
    background-color:rgb(98, 192, 247);
    border-radius: 6px;
    text-align: center;
  }
#tab-C172.is-active{
    background-color:rgb(108, 240, 96);
    border-radius: 6px;
    text-align: center;
  }
  .cklist-outer .el-tabs--border-card>.el-tabs__content{
    padding: 0;
  }
 .cklist-outer .el-tabs__content{
    position: absolute;
    height: 100%;
    background-color: rgb(48, 56, 124);
    z-index: 0;
    width: 100%;
  }
.it{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 200% !important;
    .el-tabs__content{
    position: absolute;
    height: calc(100% - 50px);
    left: 200px;
    border-top: 1px solid rgb(29, 46, 92) !important;
    z-index: 100;
    width: 100%;
    background-color:rgb(30, 42, 73);
    color: black;
  }
  .el-tabs__nav-wrap{
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 200px;
  }
    .el-tabs__item{
      height: 50px;
      padding-left: 30px !important;
      line-height: 50px;
      text-align: left !important;
      background-color: rgb(46, 52, 105);
      color: aliceblue;
      font-size: 16px;
      transition-duration: 0.4s;
    }
    .el-tabs__item:hover{
      background-color: rgb(63, 71, 148);
    }
    .el-tabs__item.is-active{
      background-color: rgb(65, 78, 187);
      font-weight: bold;
      color: rgb(14, 221, 248) !important;
    }
  //  样式
  .items{
    padding-left: 15px;
    //background-color: rgb(247, 246, 182);
    color: aliceblue;
    border-radius: 4px;
    margin: 10px 10px;
    width: 40%;
    min-width: 400px;
    font-size: 20px;
    padding-left: 20px;
    transition-duration: 0.3s;
    cursor: pointer;
    i.uncomplete{
      display: inline;
      margin-right: 10px;
      color: orange;
    }
    i.complete{
      display: none;
      margin-right: 10px;
      color: rgb(107, 245, 43);
    }
  }
  .items.uncomplete:hover{
    background-color: rgba(228, 247, 220, 0.2);
    color:aliceblue 
    }
  .items.complete:hover{
    background-color: rgba(114, 240, 55, 0.404);
    color:aliceblue 
    }
  }
  .items.complete{
    background-color: rgba(102, 240, 38, 0.7);
    color: black;
    i.uncomplete{
      display: none;
      margin-right: 10px;
      color: orange;
    }
    i.complete{
      display: inline;
      margin-right: 10px;
      color: rgb(92, 250, 19);
    }
  }
</style>
