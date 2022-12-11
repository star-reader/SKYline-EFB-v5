<template>
  <div class="dev-outer">
      <div class="title">SKYline EFB航图数据生成中心</div>
      <div class="area">
          <textarea name="sid" id="sid" cols="51" rows="20" placeholder="在这里输入离场信息"></textarea>
          <textarea name="star" id="star" cols="51" rows="20" placeholder="在这里输入进场信息"></textarea>
          <textarea name="runway" id="runway" cols="51" rows="20" placeholder="在这里输入跑道信息"></textarea>
          <textarea name="chart" id="chart" cols="51" rows="20" placeholder="在这里输入详细航图信息"></textarea><br>
          <button @click="generateData" style="width:180px;margin:0px 45%;">立即生成加密的.db文件！</button><br><br>
          <button @click="clear" style="width:180px;margin:0px 45%;">清空输入框</button><br><br>
          <!-- <button @click="decry" style="width:180px;margin:0px 45%;">解密</button><br><br> -->
          <textarea name="result" id="result" cols="230" rows="25" placeholder="db文件生成在这里"></textarea>
      </div>
      
  </div>
</template>

<script>
import { dataEncrypt } from '@/utils/cryptoJS'
import { getRandomString } from '@/utils/num'
export default {
    name:'Develop',
    methods:{
        generateData(){
            let sid = document.getElementById('sid').value
            let star = document.getElementById('star').value
            let runway = document.getElementById('runway').value
            let chart = document.getElementById('chart').value
            let data = `[${sid},${star},${runway},${chart}]`
            //let result = EncryptedData(data)
            let result = `${getRandomString(10)}${dataEncrypt(data)}`
            document.getElementById('result').value = result
        },
        clear(){
            document.getElementById('sid').value = ''
            document.getElementById('star').value = ''
            document.getElementById('runway').value = ''
            document.getElementById('chart').value = ''
            document.getElementById('result').value = ''
        },
    },
    mounted(){
        let enter = prompt('Please enter password for developing page')
        if (enter != '8Y5csFuwo@#dt!67&vdfu#tgd)h*yet!vsf'){
            let t = document.getElementsByClassName('b-items')
          for (let i = 0; i < t.length; i ++){
              t[i].style.color = 'aliceblue'
          }
          document.getElementById('b-enroute').style.color = 'skyblue'
          this.$router.push('/Enroute')
        }
    }

}
</script>

<style scoped>
    .dev-outer{
        position: absolute;
        top: 50px;
        left: 60px;
        width: calc(100% - 60px);
        height: calc(100% - 50px);
        overflow: hidden;
    }
    .title{
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        width: 100%;
        background-color: rgb(22,41,58);
        color: azure;
        font-size: 25px;
        padding-left: 50px;
        line-height: 50px;
    }
    .area{
        position: relative;
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 30px;
        top: 50px;
    }
    textarea{
        margin: 20px;
    }
</style>