<template>
  <div id="pin-outer">
      <div class="logo">
          <i class="el-icon-link"></i>
      </div>
      <div class="pin-main">
            <div id="scrollpin">
                <div v-for="(c,index) in Data" :key="index">
                <div :style="getArptStyle(index)" class="pre-arpt">
                    <div>{{c[0].icao_airport_identifier}}</div>
                </div>
                <div class="items" @click="showCharts(c)">
                <div class="name">{{c[0].procedure_identifier.slice('0','40')}}</div>
                <div @click="deletePin1(index,$event)" class="close">X</div>
                <div :style="returnBorderColor(c[0].type.section)" class="border"></div>
                </div>
          </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Pin',
    watch:{
        Data:{
            handler(val){
                document.getElementById('scrollpin').style.width = `${((val.length + 1))*203}px`
				if (val.length){
					document.getElementById('pin-outer').style.display = 'block'
				}
            }
        },
    },
    data(){
        return {
            Data:[]
        }
    },
    methods:{
        returnBorderColor(c){
            switch (c) {
                case 'APT':
                    return `background-color:gold;`
                    break;
                case 'DEP':
                    return `background-color:chartreuse;`
                    break;
                case 'ARR':
                    return `background-color:deepskyblue;`
                    break;
                case 'APP':
                    return `background-color:hotpink;`
                    break;
                case 'OTHER':
                    return `background-color:coral;`
                    break;
            
                default:
                    return `background-color:gold;`
                    break;
            }
        },
        deletePin1(id,e){
            e.cancelBubble = true
            this.Data.splice(id,1)
            if (this.Data.length == 0){
                document.querySelector('.app-pin').style.display = 'none'
            }
        },
        getArptStyle(index){
            if (index == 0){
                return 'display:inline'
            }else if (this.Data[index-1][0].icao_airport_identifier != this.Data[index][0].icao_airport_identifier){
                return 'display:inline'
            }else {
                return 'display:none'
            }
        },
        showCharts(c){
            this.pubsub.publish('showChart',c)
        },
    },
    mounted(){
        this.pubsub.subscribe('newPin',(name,data)=>{
            this.Data = data
        })
        }
}
</script>

<style lang='less' scoped >

@font-face {
    font-family:list-font;
    src: url(list.woff);
}
    #pin-outer{
        position: fixed;
        width: 100%;
        height: 70px;
        bottom: 0;
        left: 0;
        background-color: rgb(32,36,63);
        z-index: 15;
        overflow:hidden;
        font-family: list-font;
    }
    .logo{
        position:absolute;
        left: 0px;
        width: 60px;
        height: 100%;
        top: 10px;
        text-align:right;
        margin-right: 3px;
        float: left;
        i{
            color: skyblue;
            font-size: 30px;
            margin-right: 3px;
        }
    }
    ::-webkit-scrollbar-thumb{
        color:rgb(60, 114, 231)
    }
    .pin-main{
        position: relative;
        left: 60px;
        top: 0;
        height: 70px;
        overflow:scroll hidden;
        width: calc(100% - 60px);
        float: left;
        .pre-arpt{
            float: left;
            border-radius: 3px;
            border: 5px solid skyblue;
            font-size: 14px;
            color: aliceblue;
            width: 24px;
            height: 44.5px;
            padding: 4px 3px;
            div{
                transform: rotate(270deg);
                padding-right: 39px;
                padding-bottom: 20px;
            }
            
        }
            .items{
            float: left;
            position: relative;
            background-color: rgb(60,72,148);
            width: 200px;
            height: 70px;
            margin: 0 2px;
            border-radius: 5px;
            cursor: pointer;
            transition-duration: 0.4s;
            animation: showItems 0.2s;
            .name{
                margin-top: 10px;
                color: aliceblue;
                padding-left: 3px;
                margin-right: 18px;
                font-size: 12px;
            }
            .close{
                position: absolute;
                right: 3px;
                top: 25px;
                color: red;
                display: none;
                font-size: 16px;
                transition-duration: 0.4s;
                width: 30px;
                height: 30px;
                border-radius: 15px;
                text-align: center;
                line-height: 30px;
                background-color: rgb(94, 138, 233);
            }
            .border{
                position: absolute;
                width: 100%;
                height: 8px;
				border-radius: 4px;
                top:0px;
                background-color: aquamarine;
            }
        }
        .items:hover{
            background-color: rgb(76, 92, 194);
            .close{
                display: block;
            }
        }
        
    }
    @keyframes showItems{
        0%{
            opacity: 0.3;
        }
        100%{
            opacity: 1;
        }
    }
</style>