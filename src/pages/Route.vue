<template>
  <div :style="{ backgroundImage: 'url(' + background + ')' }" class="route">
    <!-- <div class="title">SKYline自助航情服务系统</div> -->
    <div class="main" id="r-main">
      <div class="title2">SKYline新版一键化飞行准备系统</div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item required label="起飞机场">
          <el-input v-model="form.dep" placeholder="起飞机场"></el-input>
        </el-form-item>
        <el-form-item required label="落地机场">
          <el-input v-model="form.arr" placeholder="落地机场"></el-input>
        </el-form-item>
        <el-form-item required label="机型">
          <el-select v-model="form.type" placeholder="选择机型">
            <el-option label="A320" value="A320"></el-option>
            <el-option label="B738" value="B738"></el-option>
          </el-select> </el-form-item
        ><br />
        <el-form-item required label="最终报告单位">
          <el-select v-model="form.unit" placeholder="选择单位">
            <el-option label="千克" value="kg"></el-option>
            <el-option label="磅" value="lib"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划巡航高度(feet)(非必须)">
          <el-input v-model="form.crz" placeholder="巡航高度"></el-input>
        </el-form-item>
        <el-form-item label="计划备用燃油(吨)(非必须)">
          <el-input
            v-model="form.rev"
            placeholder="计划备用燃油"
          ></el-input> </el-form-item
        ><br />
        <el-form-item label="Cost Index(非必须)">
          <el-input v-model="form.ci" placeholder="成本指数"></el-input>
        </el-form-item>
        <el-form-item label="配载货物重量(kg)(非必须)">
          <el-input
            v-model="form.load"
            placeholder="计划配载货物重量"
          ></el-input> </el-form-item
        ><br />
        <el-form-item>
          <el-button @click="showResult" id="sub" type="primary">一键生成航路、燃油、气象数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="report-outer" id="r-report">
      <div class="top">SKYline飞行计划报告单</div>
      <div class="gen">
        SKYline自助航情服务系统数据 - 生成于 2022年5月5日 14:25 <br />
        数据库：SKYline Database 2204 - AIRAC - ICAO -GEN398 -R2
      </div>
      <div class="splice">计划航路 >>></div>
      <div class="airway-outer">
        
        <div class="top-route">计划航路信息</div>
        <div class="route-show">
          <span id="dep">{{route.dep}} </span><span id="sid">SID </span
          ><span id="route">{{route.route}} </span
          ><span id="star">STAR </span><span id="arr">{{route.arr}}</span>
        </div>
        <div class="top-route">联飞提交航路</div>
        <div class="route-show online">
          <span>{{route.route}}</span>
        </div>
        <div class="top-route">计划航路走向</div>
        <div id="map-main"></div>
        <div class="top-route">详细航路信息</div>
        <span style="position:relative;left:10%">【Tip】: 航路信息列表可以进行增加航点、删除航点等编辑哦~</span>
        <el-table
          :data="routeData"
          border
          style="width: 80%; left: 10%; border-radius: 4px"
        >
          <el-table-column prop="name" label="航点名称">
          </el-table-column>
          <el-table-column prop="lat" label="纬度">
          </el-table-column>
          <el-table-column prop="lng" label="经度"> </el-table-column>
        </el-table>
        <br />
      </div>
      <div class="splice">气象资料 >>></div>
      <div class="airway-outer">
        <div class="top-route">风图</div>
        <br />
        <img
          src="https://aviationweather.gov/data/iffdp/2106.gif"
          style="position: relative; left: 10%"
          width="90%"
          alt="WindData"
        />
        <div class="top-route">Windy气象资料</div>
        <div class="iframe-outer" style="height:450px">
           <iframe
        class="windy-detail"
          width="100%"
          src="https://embed.windy.com/embed2.html?lat=40.0733&amp;lon=116.598&amp;zoom=5&amp;level=surface&amp;overlay=windy&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;detailLat=41.112&amp;detailLon=123.398&amp;metricWind=kt&amp;metricTemp=%C2%B0C&amp;radarRange=-1"
          frameborder="0"
        ></iframe>
        <iframe
        class="windy-detail"
          width="100%"
          src="https://embed.windy.com/embed2.html?lat=38.0733&amp;lon=105.598&amp;zoom=5&amp;level=surface&amp;overlay=windy&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;detailLat=38.112&amp;detailLon=105.398&amp;metricWind=kt&amp;metricTemp=%C2%B0C&amp;radarRange=-1"
          frameborder="0"
        ></iframe>
        </div>
       
        <!-- <div class="top-route">更多资料请前往搜索功能查看</div> -->
        
      </div>
      <div class="splice">计划单 >>></div>
      <div class="airway-outer">
        <div class="top-route" style="padding-left:5%">飞行计划报告单</div>
        <div class="report">
          <div class="container">
            <!-- 中文 -->
            <br>
          <div class="r-title">SKYline Flyleague - 飞行计划报告单 --- 2022-5-5 20:32:10 已生成</div>
          <div class="r-title">==============================================================</diV>
          <div>== 飞行计划单开始 ==</div>
          <div>【数据信息】</div>
          <div>单位：千克(kg)</div><br>
          <div>机载导航数据库：NAIP2203_DATABASE</div><br>
          <div>签派程序数据库：SKYline Database 2204 - AIRAC - ICAO -GEN398 -R2</div><br>
          <div>数据校准：已完成  No:A3-124</div>
          <div class="r-title">==============================================================</diV>
          <div>【航班信息】</div>
          <div>航班号 &nbsp;  &nbsp; 机型 &nbsp;  &nbsp; 起飞/降落 &nbsp;  &nbsp; 机场运行状态 &nbsp;  &nbsp; 签派注册号 &nbsp;  &nbsp; 飞行员编号</div>
          <div>CES2287 &nbsp; A320 &nbsp; ZYMD/ZBCF &nbsp; NORMAL/NORMAL &nbsp; S25Q-1C &nbsp;  &nbsp;  &nbsp;   &nbsp; &nbsp; 2287</div><br>
          <div>航班计划航路</div>
          <div>ZYMD SID H1 HRB P341 H21 STAR ZBCF</div><br>
          <div>航路里程</div>
          <div>2231</div><br>
          <div>放行时间/计划起飞时间</div>
          <div>1225 UTC / ...... UTC</div><br>
          <div>航线重要运行提示</div>
          <div>无/None</div>
          <div>......................................................................................................................</div>
          <div>【配载及燃油信息】</div>
          <div>乘客人数/重量 ....................................................................89/4500</div>
          <div>装载货物类型 ....................................................................普通货物/贵重物品</div>
          <div>装载货物总重 ....................................................................3544</div>
          
          <div>人货总重......................................................................... 8044</div>
          <div>飞行器重量 ..................................................................... 17826</div>
          <div>零燃油重量 .................................................................... .25870</div><br>
           <div>......................................................................................................................</div><br>
          <div>计划添加油量 .................................................................... 8747</div>
          <div>实际起飞重量 .................................................................... 33020</div>
          <div>航路燃油消耗 .................................................................... 28747</div>
          <div>备用燃油量 ....................................................................... 4743</div>
          <div>实际着陆重量 .................................................................... 29020</div><br>
          <div>备注信息</div>
          <div>无</div><br>
          <div class="r-title">==============================================================</diV>
          <div>签派员</div>
          <div>2287</div><br>
          <div>备注信息</div>
          <div>航线一切顺畅，飞行愉快~</div><br>
          <div class="r-title">==============================================================</diV>
          <div>== 飞行计划单结束 ==</div><br>
          </div>
        </div>
        <div class="report">
          <div class="container">
            <!-- 中文 -->
            <br>
          <div class="r-title">SKYline Flyleague - PLIGHT PLAN --- 2022-5-5 20:32:10 GENERATED</div>
          <div class="r-title">==============================================================</diV>
          <div>== REPORT START ==</div>
          <div>【DATA INFO】</div>
          <div>ALL WEIGHTS IN KILOGRAMS</div><br>
          <div>AIRCRAFT DATABASE：NAIP2203_DATABASE</div><br>
          <div>DISPATCH DATABASE：SKYline Database 2204 - AIRAC - ICAO -GEN398 -R2</div><br>
          <div>APPROVED：TRUE  No:A3-124</div>
          <div class="r-title">==============================================================</diV>
          <div>【FLIGHT INFO】</div>
          <div>FLIGHT NUMBER &nbsp;  &nbsp; AIRCRAFT &nbsp;  &nbsp; FROM/TO &nbsp;  &nbsp; STATUS &nbsp;  &nbsp; DISPATCH REG &nbsp;  &nbsp; PILOT NUMBER</div>
          <div>CES2287 &nbsp; A320 &nbsp; ZYMD/ZBCF &nbsp; NORMAL/NORMAL &nbsp; S25Q-1C &nbsp;  &nbsp;  &nbsp;   &nbsp; &nbsp; 2287</div><br>
          <div>FLIGHT PLAN ROUTE</div>
          <div>ZYMD SID H1 HRB P341 H21 STAR ZBCF</div><br>
          <div>DISTANCE</div>
          <div>2231</div><br>
          <div>OFF BLOCK TIME / TAKE OFF TIME</div>
          <div>1225 UTC / ...... UTC</div><br>
          <div>ENROUTE NOTAM</div>
          <div>None</div>
          <div>......................................................................................................................</div>
          <div>【LOAD AHD FUEL】</div>
          <div>PASSENGER NUM/WEIGHT............................................................... 89/4500</div>
          <div>CARGO TYPE ....................................................................... NORMAL CARGO</div>
          <div>CARGO WEIGHT ....................................................................... 3544</div>
           
          <div>TOTAL TRAFFIC WEIGHT ............................................................  8044</div>
          <div>DRY OPERATING WEIGHT .............................................................. 17826</div>
          <div>ZERO FUEL WEIGHT .................................................................. 25870</div><br>
          <div>......................................................................................................................</div><br>
          <div>BLOCK FUEL ............................................................................. 8747</div>
          <div>TAKE OFF FUEL ACTUAL ............................................................ 33020</div>
          <div>TRIP FUEL ............................................................................. 28747</div>
          <div>FINAL RESV ............................................................................ 4743</div>
          <div>LANDING FUEL ACTUAL ......................................................... 29020</div><br>
          <div>REMAEK</div>
          <div>None</div><br>
          <div class="r-title">==============================================================</diV>
          <div>DISPATCHER</div>
          <div>2287</div><br>
          <div>REMARK</div>
          <div>Wooh! Take off~</div><br>
          <div class="r-title">==============================================================</diV>
          <div>== REPORT END ==</div><br>
          </div>
        </div>
      </div>
      <div class="splice">航路文件 >>></div>
      <div class="airway-outer">
        <div class="download-items">
          <span class="nane">Aerosoft A320/330</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">PMDG 737/747/777</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">QualityWings 787</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">Toliss 319/321/340</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">Zibo 738</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">FlightFactor 320/350</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">JARDesign A320/330</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
        <div class="download-items">
          <span class="nane">导出计划单</span>
          <el-button class="button" type="success" round>下载</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import background from "@/assets/fplan.png";
export default {
  name: "Route",
  data() {
    return {
      background: background,
      metar1:'',
      form: {
        dep: "",
        arr: "",
        type: "",
        ci: "",
        rev: "",
        crz: "",
        unit:'',
        load:''
      },
      routeData: [
      ],
      route:{
        dep:'',
        arr:'',
        route:'',
        distance:'',
        depname:'',
        arrname:'',

      }
    };
  },
  methods: {
    showResult(){
      document.getElementById('sub').innerHTML = '数据查询中，请稍后 ... '
      document.getElementById('sub').style.cursor = 'not-allowed'
      if (this.form.dep == '' || this.form.arr == '' || this.form.type == '' || this.form.unit == ''){
        this.$notify({
          title: "操作失败",
          message: `您输入的信息不完整，请注意带*的为必填项`,
          type: "error",
        });
        document.getElementById('sub').innerHTML = '一键生成航路、燃油、气象数据 ... '
      document.getElementById('sub').style.cursor = 'pointer'
      }else{
        this.getRoute()
        setTimeout(()=>{
        document.getElementById('r-main').style.display = 'none'
      document.getElementById('r-report').style.display = 'block'
      },2500)
      }
    },
    routeMap() {
      const route_map = this.L.map("map-main", {
        minZoom: 3,
        maxZoom: 17,
        center: [39.550339, 116.114129],
        zoom: 4,
      });
      this.route_map = route_map;
      window.route_map = route_map;
      this.map_layer = this.L.tileLayer(
        `https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}`
      ).addTo(this.route_map);
    },
    getRoute(){
      this.$axios.post('http://121.5.10.201:8090/route',{'dep':this.form.dep.toUpperCase(),'arr':this.form.arr.toUpperCase()}).then((res)=>{
        let resdata = JSON.parse(res.data.route)
        console.log(resdata)
        this.route.dep = this.form.dep.toUpperCase()
        this.route.arr = this.form.arr.toUpperCase()
        this.route.distance = resdata.distance
        this.route.route = resdata.route.replace(`${this.route.dep} SID `,'').replace(` STAR ${this.route.arr}`,'')
        this.route.depname = resdata.airportName[0]
        this.route.arrname = resdata.airportName[1]
        for (let i =0; i < resdata.nodeinformation.length; i++){
          let d = resdata.nodeinformation[i]
          this.routeData.push(
            {
              "name":d[0],
              "lat":d[1],
              "lng":d[2]
            }
          )
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.routeMap();
    });
  },
};
</script>
<style lang="less" scoped>
@font-face {
    font-family:report-font;
    src: url(report.woff2);
}
.route {
  position: fixed;
  left: 0;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  background-size: 100%;
  .title {
    text-align: center;
    font-size: 25px;
    color: aliceblue;
    line-height: 50px;
    position: relative;
    height: 50px;
    background-color: rgb(32, 179, 179);
    width: 100%;
  }
}
.main {
  margin-top: 40px;
  width: 70%;
  left: 15%;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
  text-align: center;
  background-color: rgba(15, 74, 201, 0.5);
  border-radius: 5px;
  color: aliceblue;
  .title2 {
    padding-top: 0px;
    padding-bottom: 30px;
    font-size: 20px;
  }
}
.report-outer {
  display: none;
  overflow-y: auto;
  position: relative;
  margin-top: 40px;
  width: 70%;
  left: 15%;
  padding-top: 30px;
  padding-bottom: 40px;
  background-color: rgba(15, 74, 201, 0.5);
  border-radius: 5px;
  .top {
    text-align: center;
    font-size: 25px;
    color: aliceblue;
  }
  .gen {
    margin-top: 10px;
    background-color: rgba(15, 74, 201, 0.8);
    padding-top: 10px;
    color: aliceblue;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    text-align: center;
    width: 90%;
    left: 5%;
    border-radius: 5px;
  }
  .splice {
    position: relative;
    margin-top: 8px;
    left: 5%;
    width: 120px;
    line-height: 30px;
    color: rgb(241, 247, 248);
    background-color: rgb(18, 228, 53);
    height: 30px;
    border-radius: 4px;
    text-align: center;
  }
  .airway-outer {
    border-radius: 5px;
    margin-top: 10px;
    background-color: rgba(15, 74, 201, 0.8);
    padding-top: 10px;
    color: aliceblue;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    width: 90%;
    left: 5%;
  }
  .top-route {
    padding-top: 10px;
    padding-left: 10%;
    position: relative;
    text-align: left;
    margin-bottom: 5px;
    font-size: 20px;
  }
  #map-main {
    position: relative;
    width: 80%;
    left: 10%;
    height: 400px;
    border-radius: 4px;
  }
  .route-show {
    border-radius: 4px;
    position: relative;
    width: 80%;
    left: 10%;
    padding: 5px;
    font-weight: bold;
    color: rgb(51, 47, 47);
    background-color: rgb(252, 171, 21);
    #sid {
      color: red;
    }
    #star {
      color: red;
    }
    #dep {
      color: rgb(226, 240, 41);
    }
    #arr {
      color: rgb(236, 18, 127);
    }
  }
  .online {
    color: orangered;
  }
  .windy-detail{
    position: relative;
    width: 40%;
    left: 10%;
    float: left;
    height: 450px;
    margin-right: 10%;
  }
  .report{
    position: relative;
    width: 45%;
    height: 550px;
    overflow-y: auto;
    overflow-x: auto;
    left: 2.5%;
    margin-right: 5%;
    display: inline-block;
    background-color: aliceblue;
    color: black;
    font-family: report-font;
    .container{
      padding-left: 7px;
      position: absolute;
      width: 500px;
      .r-title{
      padding-left: 7px;
      padding-top: 7px;
    }
    }
    
  }
  .download-items{
    cursor: pointer;
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    transition-duration: 0.4s;
    width: 95%;
    left: 2.5%;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: rgb(31, 136, 223);
    .button{
      position: absolute;
      right: 20px;
      top: 5px;
    }
  }
  .download-items:hover{
    background-color: rgb(12, 98, 168);
  }
}
</style>
<style>
.el-form-item__label {
  color: beige;
}
</style>