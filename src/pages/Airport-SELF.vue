<template>
  <div id="arpt-outer">
    <div class="chart-select">
      <div class="icon">
        <i class="el-icon-share"></i>
      </div>
      <div class="title">
        <i title="机场图" class="el-icon-position"></i>
      </div>
      <div @click="showSelectArpt" class="arpt">
        {{ NowArpt }}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <div class="items-main">
        <div class="line"></div>
        <div @click="openSelectList('ARPT', $event)" class="items">
          <span class="tit">机场图</span><br />
          <span class="num">{{ SelectARPT.length }}</span>
        </div>
        <div @click="openSelectList('SID', $event)" class="items">
          <span class="tit">离场图</span><br />
          <span class="num">{{ SelectSID.length }}</span>
        </div>
        <div @click="openSelectList('STAR', $event)" class="items">
          <span class="tit">进场图</span><br />
          <span class="num">{{ SelectSTAR.length }}</span>
        </div>
        <div @click="openSelectList('APP', $event)" class="items">
          <span class="tit">进近图</span><br />
          <span class="num">{{ SelectAPP.length }}</span>
        </div>
        <div @click="openSelectList('REF', $event)" class="items">
          <span class="tit">其他</span><br />
          <span class="num">{{ SelectREF.length }}</span>
        </div>
      </div>
      div
      .div

    </div>
    <div class="arpt-list">
      <el-select
        class="el-select"
        auto-complete="false"
        v-model="SelectAirport"
        @change="setAirportChart"
        filterable
        placeholder="请输入机场代码/名称筛选"
      >
        <el-option
          v-for="(item, index) in AirportList"
          :key="index"
          :label="item.name"
          :value="item.icao"
        >
        </el-option>
      </el-select>
    </div>
    <div class="chart-list">
      <div class="main-title">
        <span>{{ NowArpt }} - {{ nowTitle }}</span>
      </div>
      <i id="closeborder" class="el-icon-circle-close"></i>
      <div class="filter">
        <el-input
          placeholder="输入航图名称以筛选"
          suffix-icon="el-icon-search"
          v-model="chart_filter"
        >
        </el-input>
      </div>
      <div
        @click="clickChart(c, $event)"
        v-for="(c, index) in nowSelect_f"
        :key="index"
        :title="c[0].procedure_identifier"
        class="items"
      >
        <div title="此航图支持FlightLink" :class="showSimlinkIcon(c)">
          <i class="el-icon-position"></i>
        </div>
        <div @click="pinChart(c)" class="pin">
          <div  title="把航图固定在列表栏" class="pinchart">
          <i  class="el-icon-add-location"></i>
        </div>
        </div>
        
        <div class="chart-name">{{ c[0].procedure_identifier }}</div>
        <div class="chart-num">{{ c[0].index_number }}</div>
      </div>
    </div>
    <div id="arpt-chart-display" >
      <iframe frameborder="0"></iframe>
      <div class="interact">
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="放大航图"
              placement="left"
            >
              <i @click="mapZoomIn" class="el-icon-zoom-in"></i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="缩小航图"
              placement="left"
            >
              <i @click="mapZoomOut" class="el-icon-zoom-out"></i>
            </el-tooltip>
          </div>
          <!-- <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="适合宽度"
              placement="left"
            >
              <i @click="mapFitWidth" class="el-icon-arrow-left"></i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="适合高度"
              placement="left"
            >
              <i @click="mapFitHeight" class="el-icon-arrow-up"></i>
            </el-tooltip>
          </div> -->
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="关闭航图"
              placement="left"
            >
              <i @click="mapClose" class="el-icon-circle-close"></i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="新建涂鸦"
              placement="left"
            >
              <i @click="drawinter" class="el-icon-edit"></i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="清除涂鸦"
              placement="left"
            >
              <i @click="Clearinter" class="el-icon-minus"></i>
            </el-tooltip>
          </div>
          <div id="erc" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="固定到航路图"
              placement="left"
            >
              <i @click="enrouteChart" class="el-icon-basketball"></i>
            </el-tooltip>
          </div>
        </div>
      <div class="zoom">{{ zoom }}%</div>
      <div id="simlink-warning">此航图不支持FlightLink功能</div>
        <div id="border-warning">追踪飞机不在航图范围内</div>
      <div v-drag id="vector-display" :class="showNightMode()">
      <img id="main-chart">
      <img id="sim-position">
      </div>
    </div>
  </div>
</template>

<script>
import { dataDecrypt } from "@/utils/cryptoJS";
import { Image } from "element-ui";
import airplane from "@/assets/airplane.png";
import h_logo from '@/assets/h_logo.png'
import v_logo from '@/assets/v_logo.png'
export default {
  name: "Airport",
  data() {
    return {
      width: 0,
      //是
      activedChartTab: "ARPT",
      SelectAirport: "",
      cycle: "",
      chart_filter: "",
      AirportList: [],
      selectId: "",
      arpt_or_data: "",
      SelectREF: [],
      SelectARPT: [],
      SelectSID: [],
      SelectSTAR: [],
      SelectAPP: [],
      pindPdfChart: [],
      vectorData: [],
      currentChart:'',
      currentBorderData:'',
      currentPlaneData:{"lat":"39.225","lng":"109.862","heading":"70"},
      width: "",
      height: "",
      NowArpt: "选择",
      nowTitle: "机场图",
      nowSelect: [],
      nowSelect_f: [],
      zoom: "100",
      thiszoom: 8,
      chartWidth: "1500",
      thisBorder:[],
      h_logo,
      v_logo,
      airplane
    };
  },
  watch: {
    Vector: {
      handler(val) {
        this.showPngCharts(val);
      },
    },
    chart_filter: {
      handler(val) {
        this.nowSelect_f = this.nowSelect.filter((g) => {
          return g[0].procedure_identifier.indexOf(val) !== -1;
        });
      },
    },
  },
  methods: {
    showNightMode() {
      if (localStorage.getItem("nightMode") == "true") {
        return "night-mode";
      } else {
        return "day-mode";
      }
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    getCycleData() {
      let that = this;
      this.$axios
        .get(`https://api.skylineflyleague.cn/EFBData/cycle/available.json?${new Date().getTime()}`)
        .then((res) => {
          that.cycle = res.data.Available_AIRAC_Cycle;
          this.setCycleData();
        });
    },
    setCycleData() {
      let that = this;
      if (
        localStorage.getItem("cycle") == null ||
        localStorage.getItem("cycle") != that.cycle
      ) {
        that.$notify({
          title: "数据更新说明",
          message: `EFB系统导航数据已更新至${that.cycle}期！`,
          type: "warning",
          duration: 0,
        });
      }
      localStorage.setItem("cycle", that.cycle);
      this.initAirportData();
    },
    initAirportData() {
      // this.$axios.get(`./cycle/${this.cycle}/airport/Airportlist.db`).then((res) => {
      //   let or_data = JSON.parse(dataDecrypt(res.data));
      this.$axios
        .get(
          `https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/airport/List.json?${this.cycle}`
        )
        .then((res) => {
          let d = res.data;
          for (let i = 0; i < d.length; i++) {
            let data = `${d[i].name}(${d[i].icao})`
            this.AirportList.push({ name: data, icao: d[i].icao });
          }
        });
    },
    getChartBound(t, e, n, i) {
      //获取航图边界
      let bottomLeftX = Math.min(t, n);
      let topRightX = Math.max(t, n);
      let bottomLeftY = Math.max(e, i);
      let topRightY = Math.min(e, i);
      return { bottomLeftX, topRightX, bottomLeftY, topRightY };
    },
    setAirportChart(e) {
      (this.SelectREF = []),
        (this.SelectARPT = []),
        (this.SelectSID = []),
        (this.SelectSTAR = []),
        (this.SelectAPP = []),
        (this.selectId = e);
      let that = this;
      this.NowArpt = this.selectId;
      this.$axios
        .get(
          `https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/airport/Jeppesen/${this.selectId}.db?${this.cycle}`
        )
        .then((res) => {
          let init_data = res.data
          let resdata = JSON.parse(dataDecrypt(init_data.slice(10,init_data.length)))
          let id = -1
          for (let i = 0; i < resdata.charts.length; i++) {
            let d = resdata.charts[i];
            if (d.std_visibility == true || d.cao_visibility == false) {
              id++;
              if (d.procedure_identifier.indexOf("BRIEFING") != -1) {
                this.SelectREF.push([d, id]);
              } else if (d.type.section == "APT") {
                this.SelectARPT.push([d, id]);
              } else if (d.type.section == "AD") {
                this.SelectREF.push([d, "AD"]);
              } else if (d.type.section == "DEP") {
                this.SelectSID.push([d, id]);
              } else if (d.type.section == "ARR") {
                this.SelectSTAR.push([d, id]);
              } else if (d.type.section == "APP") {
                let chart_number = parseInt(d.index_number.split("-")[1]);
                this.SelectAPP.push([d, id, chart_number]);
              } else {
                this.SelectREF.push([d, id]);
              }
            }
          }
        });
    },
    clickChart(c, e) {
      let d = e.target;
      let adiv = document.querySelectorAll(".chart-list .items");
      for (let i = 0; i < adiv.length; i++) {
        adiv[i].setAttribute("class", "items");
      }
      if (d.getAttribute("class") == "items") {
        d.setAttribute("class", "items active");
      } else if (d.parentNode.getAttribute("class") == "items") {
        d.parentNode.setAttribute("class", "items active");
      } else if (d.parentNode.parentNode.getAttribute("class") == "items") {
        d.parentNode.parentNode.setAttribute("class", "items active");
      }
      //c是航图对象，e是对象
      if (c[1] == "AD") {
        //是机场细则
        this.showADCharts(c);
      } else {
        //正常航图
        this.showPngCharts(c);
      }
    },
    showADCharts(c) {
      document.getElementById("simlink-warning").style.display = "none";
      document.getElementsByClassName("interact")[0].style.display = "none";
      document.getElementsByClassName("chart-list")[0].style.display = "none";
      try {
        for (let i = 0; i < this.vectorData.length; i++) {
          this.vectorData[i].remove();
        }
        this.vectorData = [];
      } catch (error) {}
      let p = document.getElementById("arpt-chart-display");
      try {
        let iframe = document.getElementsByTagName("iframe")[0];
        p.removeChild(iframe);
      } catch (err) {}
      let pdf_path = c[0].icao;
      let app_iframe = document.createElement("iframe");
      app_iframe.setAttribute("class", "chart-iframe");
      app_iframe.style.zIndex = "9999";
      app_iframe.setAttribute(
        "src",
        `./pdf/web/viewer.html?file=https://api.skylineflyleague.cn/EFBData/Chart_data/AD/${pdf_path}.pdf`
      );
      p.append(app_iframe);
      let pdfChart = document.getElementsByClassName("chart-iframe")[0];
      pdfChart.onclick = () => {
        document.getElementsByClassName("arpt-list")[0].style.display = "none";
        document.getElementsByClassName("chart-list")[0].style.display = "none";
      };
    },
    // showPngCharts(c) {
    //   //展示png到容器→设置位置→设置缩放/移动事件→设置最大/最小缩放级别→设置缩放%显示→设置interact功能→画plane→其他
    //   document.getElementsByClassName("interact")[0].style.display = "block";
    //   for (let i = 0; i < this.vectorData.length; i++) {
    //     this.vectorData[i].remove();
    //   }
    //   this.vectorData = [];
    //   let p = document.getElementById("arpt-chart-display");
    //   try {
    //     let iframe = document.getElementsByTagName("iframe")[0];
    //     p.removeChild(iframe);
    //   } catch (err) {}
    //   let data = c;
    //   if (c[0].planview != undefined) {
    //     //支持simlink
    //     document.getElementById("simlink-warning").style.display = "none";
    //     this.thisBorder = data[0].planview.bbox_geo
    //     //处理航图边界
    //     let a = this.getChartBound(
    //       data[0].bbox_local[0],
    //       data[0].bbox_local[1],
    //       data[0].bbox_local[2],
    //       data[0].bbox_local[3]
    //     );
    //     let s = this.getChartBound(
    //       data[0].planview.bbox_local[0],
    //       data[0].planview.bbox_local[1],
    //       data[0].planview.bbox_local[2],
    //       data[0].planview.bbox_local[3]
    //     );
    //     let c = s.bottomLeftX;
    //     let l = a.bottomLeftY - s.bottomLeftY;
    //     let u = a.topRightX - s.topRightX;
    //     let h = s.topRightY;
    //     let p = s.topRightX - s.bottomLeftX;
    //     let d = s.bottomLeftY - s.topRightY;
    //     let f = data[0].planview.bbox_geo[1] - data[0].planview.bbox_geo[3];
    //     let m =
    //       p / (data[0].planview.bbox_geo[2] - data[0].planview.bbox_geo[0]);
    //     let g = d / f;
    //     let v = c / m;
    //     let y = l / g;
    //     let b = u / m;
    //     let _ = h / g;
    //     let w = data[0].planview.bbox_geo[0] - v;
    //     let x = data[0].planview.bbox_geo[1] + y;
    //     let C = data[0].planview.bbox_geo[2] + b;
    //     let S = data[0].planview.bbox_geo[3] - _;
    //     let P = this.L.latLng(x, w);
    //     let O = this.L.latLng(S, C);
    //     let A = this.L.latLngBounds(P, O);
    //     let t = data[0].type.section;
    //     let centerLatlngs = [
    //       (A._northEast.lat + A._southWest.lat) / 2,
    //       (A._northEast.lng + A._southWest.lng) / 2,
    //     ];
    //     switch (t) {
    //       case "APT":
    //         this.map.setView(centerLatlngs, 14.5);
    //         this.thiszoom = "14.5";
    //         break;
    //       case "DEP":
    //         this.map.setView(centerLatlngs, 9);
    //         this.thiszoom = "9";
    //         break;
    //       case "ARR":
    //         this.map.setView(centerLatlngs, 9);
    //         this.thiszoom = "9";
    //         break;
    //       case "APP":
    //         this.map.setView(centerLatlngs, 10);
    //         this.thiszoom = "10";
    //         break;

    //       default:
    //         this.map.setView(centerLatlngs, 9);
    //         this.thiszoom = "9";
    //         break;
    //     }
    //     this.chartWidth = data[0].bbox_local[2];
    //     let logo_type = ''
    //     let lng_l = ''
    //     let lng_r = ''
    //     let lat_l = ''
    //     let lat_r = ''
    //     this.vectorData.push(
    //       this.L.imageOverlay(
    //         `https://api.skylineflyleague.cn/EFBData/Chart_data/JEEP/${
    //           data[0].icao_airport_identifier
    //         }/${data[0].file_day}?${this.cycle}`,
    //         A
    //       )
    //     );
    //     //设置航图底部/左侧logo
    //     if (data[0].bbox_local[1]>=data[0].bbox_local[2]){
    //       //竖版航图
    //       lng_l = A._southWest.lng
    //       lng_r = A._northEast.lng
    //       lat_l = A._southWest.lat+((A._northEast.lat - A._southWest.lat)/45)
    //       lat_r = A._southWest.lat
    //       logo_type = h_logo
    //       this.vectorData.push(
    //         this.L.imageOverlay(
    //           h_logo,[[lat_l,lng_l],[lat_r,lng_r]]
    //         )
    //       )
    //     }else{
    //       //横版航图
    //       lng_l = A._southWest.lng
    //       lng_r = A._southWest.lng+((A._northEast.lng - A._southWest.lng)/40)
    //       lat_l = A._northEast.lat
    //       lat_r = A._southWest.lat
    //       logo_type = v_logo
    //       this.vectorData.push(
    //         this.L.imageOverlay(
    //           v_logo,[[lat_l,lng_l],[lat_r,lng_r]]
    //         )
    //       )
    //     }
    //     let vectorDataLayergroup = this.L.layerGroup(this.vectorData);
    //     this.map.addLayer(vectorDataLayergroup);
    //     if (data[0].type.section != 'APT'){
    //       this.currentChart = {"data":data,"border":A,"zoom":this.thiszoom,"center":centerLatlngs,"logo_type":logo_type,"logo":[[lat_l,lng_l],[lat_r,lng_r]]}
    //     document.getElementById('erc').style.display = 'block'
    //     }else{
    //       document.getElementById('erc').style.display = 'none'
    //     }
        
    //   } else {
    //     //不支持simlink
    //     document.getElementById("simlink-warning").style.display = "block";
    //     this.thisBorder = []
    //     let that = this;
    //     let chart_url = `https://api.skylineflyleague.cn/EFBData/Chart_data/JEEP/${
    //       c[0].icao_airport_identifier
    //     }/${c[0].file_day}?${this.cycle}`;
    //     let img = new Image();
    //     img.src = chart_url;
    //     img.onload = () => {
    //       that.width = img.width;
    //       that.height = img.height;
    //       that.clientWidth = img.width;
    //       let long_lat = parseFloat(that.height) / 1000;
    //       let long_lng = parseFloat(that.width) / 1000;
    //       let latlng2 = [
    //         [0, 0],
    //         [long_lat, long_lng],
    //       ];
    //       that.map.setView([long_lat / 2, long_lng / 2], 8);
    //       that.thiszoom = "8";
    //       that.vectorData.push(
    //         that.L.imageOverlay(
    //           `https://api.skylineflyleague.cn/EFBData/Chart_data/JEEP/${
    //             c[0].icao_airport_identifier
    //           }/${c[0].file_day}?${this.cycle}}`,
    //           [latlng2]
    //         )
    //       );
    //       //设置航图底部/左侧logo
    //     if (long_lat >= long_lng){
    //       //竖版航图
    //       let lat_l = (long_lat/45) 
    //       let lng_l = 0
    //       let lat_r = 0
    //       let lng_r = long_lng
    //       that.vectorData.push(
    //         that.L.imageOverlay(
    //         h_logo,
    //         [[lat_l,lng_l],[lat_r,lng_r]]
    //       )
    //       )
          
    //     }else{
    //       //横版航图
    //       let lat_l = 0
    //       let lng_l = 0
    //       let lat_r = long_lat
    //       let lng_r = long_lng/40
    //       that.vectorData.push(
    //         that.L.imageOverlay(
    //         v_logo,
    //         [[lat_l,lng_l],[lat_r,lng_r]]
    //       )
    //       )
    //     }
    //       let vectorLayer = that.L.layerGroup(that.vectorData);
    //       that.map.addLayer(vectorLayer);
    //     };
    //     document.getElementById('erc').style.display = 'none'
    //   }
    // },
    showPngCharts(c){
      document.getElementsByClassName("interact")[0].style.display = "block";
      let data = c      
      //插入航图图片
      let chart_url = `https://api.skylineflyleague.cn/EFBData/Chart_data/JEEP/${
          data[0].icao_airport_identifier
        }/${data[0].file_day}?${this.cycle}`;
        let img = new Image();
        img.src = chart_url;
        img.onload = ()=>{
          this.width = img.width;
          this.height = img.height;
          this.clientWidth = img.width;
          let border = document.getElementById('vector-display')
          let main_chart = document.getElementById('main-chart')
          border.style.top = '0px'
          border.style.left = '25%'
          main_chart.setAttribute('src',chart_url)
          main_chart.setAttribute('height','100%')
          main_chart.setAttribute('width','100%')
          border.style.transform = `scale(1)`
        }
        //判断simlink情况
        if (data[0].planview != undefined){
        document.getElementById("simlink-warning").style.display = "none";
        //插入simlink信息
          let a = this.getChartBound(
          data[0].bbox_local[0],
          data[0].bbox_local[1],
          data[0].bbox_local[2],
          data[0].bbox_local[3]
        );
        let s = this.getChartBound(
          data[0].planview.bbox_local[0],
          data[0].planview.bbox_local[1],
          data[0].planview.bbox_local[2],
          data[0].planview.bbox_local[3]
        );
        let c = s.bottomLeftX;
        let l = a.bottomLeftY - s.bottomLeftY;
        let u = a.topRightX - s.topRightX;
        let h = s.topRightY;
        let p = s.topRightX - s.bottomLeftX;
        let d = s.bottomLeftY - s.topRightY;
        let f = data[0].planview.bbox_geo[1] - data[0].planview.bbox_geo[3];
        let m =
          p / (data[0].planview.bbox_geo[2] - data[0].planview.bbox_geo[0]);
        let g = d / f;
        let v = c / m;
        let y = l / g;
        let b = u / m;
        let _ = h / g;
        let w = data[0].planview.bbox_geo[0] - v;
        let x = data[0].planview.bbox_geo[1] + y;
        let C = data[0].planview.bbox_geo[2] + b;
        let S = data[0].planview.bbox_geo[3] - _;
        let P = this.L.latLng(x, w);
        let O = this.L.latLng(S, C);
        let A = this.L.latLngBounds(P, O);
        let t = data[0].type.section;
        let centerLatlngs = [
          (A._northEast.lat + A._southWest.lat) / 2,
          (A._northEast.lng + A._southWest.lng) / 2,
        ];
        switch (t) {
          case "APT":
            this.thiszoom = "14.5";
            break;
          case "DEP":
            this.thiszoom = "9";
            break;
          case "ARR":
            this.thiszoom = "9";
            break;
          case "APP":
            this.thiszoom = "10";
            break;

          default:
            this.thiszoom = "9";
            break;
        }
        //设置航路图overlay
        if (t != 'APT'){
          this.currentChart = {"data":data,"border":A,"zoom":this.thiszoom,"center":centerLatlngs}
        document.getElementById('erc').style.display = 'block'
        }else{
          document.getElementById('erc').style.display = 'none'
        }
        //设置航图坐标信息，为simlink进行匹配
        this.currentBorderData = {
          "border":[A._northEast.lat,A._southWest.lng,A._southWest.lat,A._northEast.lng],
          "mainArea":[data[0].planview.bbox_geo[3],data[0].planview.bbox_geo[0],data[0].planview.bbox_geo[1],data[0].planview.bbox_geo[2]],
          "chartScale":[data[0].bbox_local[2],data[0].bbox_local[1]]
        }
      }else{
        document.getElementById("simlink-warning").style.display = "block";
        this.currentChart = ''
        this.currentBorderData = ''
      }
      this.drawPlane()
    },
    pinChart(o) {
      let c = o;
      // try {
      //   document.getElementsByClassName("pin-main")[0].style.left = "460px";
      //   document.getElementsByClassName("pin-main")[0].style.width =
      //     "calc(100% - 460px)";
      // } catch (error) {
      //   //console.log(error);
      // }
      if (c[0].procedure_identifier.indexOf("机场细则") != -1) {
        //是机场细则
        this.$notify({
          title: "操作错误",
          message: `尚不支持固定机场细则`,
          type: "error",
        });
      } else {
        this.pindPdfChart.push(c);
        this.processPinChart();
      }
    },
    processPinChart() {
      let p = this.pindPdfChart;
      this.getPin(p);
    },
    closeChartList() {
      document.getElementsByClassName("chart-select")[0].style.display = "none";
      document.getElementById("in-disshow").style.display = "none";
      //document.getElementsByClassName("logo")[0].style.left = "0px";
      document.getElementById("arpt-chart-display").style.left = "0px";
      document.getElementById("arpt-chart-display").style.width =
        "calc(100% - 60px)";
      document.getElementById("in-show").style.display = "block";
      // try {
      //   document.getElementsByClassName("pin-main")[0].style.left = "60px";
      //   document.getElementsByClassName("pin-main")[0].style.width =
      //     "calc(100% - 60px)";
      // } catch (error) {
      //   //console.log(error);
      // }
    },
    openChartList() {
      document.getElementsByClassName("chart-select")[0].style.display =
        "block";
      document.getElementById("in-show").style.display = "none";
      //document.getElementsByClassName("logo")[0].style.left = "400px";
      document.getElementById("arpt-chart-display").style.left = "400px";
      document.getElementById("arpt-chart-display").style.width =
        "calc(100% - 460px)";
      document.getElementById("in-disshow").style.display = "block";
      // try {
      //   document.getElementsByClassName("pin-main")[0].style.left = "460px";
      //   document.getElementsByClassName("pin-main")[0].style.width =
      //     "calc(100% - 460px)";
      // } catch (error) {
      //   //console.log(error);
      // }
    },
    showSimlinkIcon(c) {
      return c[0].planview != undefined ? "simlink" : "disshow-simlink";
    },
    //接收pin的数据
    reserveADPin(c) {
      this.drawPdfChart(c);
    },
    reserveVectorPin(c) {
      this.drawVectorChart(c);
    },
    mapZoomIn() {
      let img_d = document.querySelector('#vector-display')
      let now_scale = img_d.style.transform.split(')')[0].split('(')[1]
      img_d.style.transform = `scale(${parseFloat(now_scale)+0.1})`
    },
    mapZoomOut() {
      let img_d = document.querySelector('#vector-display')
      let now_scale = img_d.style.transform.split(')')[0].split('(')[1]
      img_d.style.transform = `scale(${parseFloat(now_scale)-0.1})`
    },
    checkSimlink() {
      this.trackSimlinkPlane();
    },
    trackSimlinkPlane() {
      //实际开发情况：根据用户实际登录信息获取对应飞行员编号，在这里没有后端，进行简化
      let pilot = "2287";
      const Icon = L.icon({
        iconUrl: airplane,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      });
      let that = this;
      setInterval(() => {
        if (localStorage.getItem("showFlightLink") == "true") {
             that.$axios
            .get("https://map.skylineflyleague.cn/api/online.php")
            .then((res) => {
              let whazzupData = res.data.split("\n");
              for (let i in whazzupData) {
                let pilotData = whazzupData[i].split(":");
                if (pilot == pilotData[1] && pilotData[3] == "PILOT") {
                    this.pilotLayer.push(
                    this.L.marker([pilotData[5], pilotData[6]], {
                      icon: Icon,
                      rotationAngle: pilotData[10],
                    })
                  );
                  this.currentPlaneData = {
                    "lat":pilotData[5],
                    "lng":pilotData[6],
                    "heading":pilotData[10]
                  }
                  this.drawPlane()
                  break;
                }
              }
            });
        } else {
          return;
        }
      }, 4000);
    },
    drawinter() {
      let c = document.getElementById("canvas");
      if (c != null || c != undefined) {
        //已经创建了
        this.$notify({
          title: "操作错误",
          message: `涂鸦画板已经被创建`,
          type: "error",
        });
        return;
      }
      //canvas面板
      let par = document.getElementById("vector-display");
      let canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");
      canvas.setAttribute("width", `${par.clientWidth}px`);
      canvas.setAttribute("height", `${par.clientHeight}px`);

      par.appendChild(canvas);
      try {
        const cvs = document.querySelector("canvas");
        const ctx = cvs.getContext("2d");
        let flag = false;
        cvs.addEventListener("mousedown", (e) => {
          flag = true;
          const top = cvs.getBoundingClientRect().top;
          const left = cvs.getBoundingClientRect().left;
          const mouseX = e.pageX - left;
          const mouseY = e.pageY - top;
          ctx.strokeStyle = "#ff0000";
          ctx.lineWidth = 8;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
        });
        cvs.addEventListener("mousemove", (e) => {
          const top = cvs.getBoundingClientRect().top;
          const left = cvs.getBoundingClientRect().left;
          const mouseX = e.pageX - left;
          const mouseY = e.pageY - top;
          if (flag) {
            ctx.lineTo(mouseX, mouseY);
            // 封闭连接
            ctx.stroke();
          }
        });
        cvs.addEventListener("mouseup", () => {
          flag = false;
        });
      } catch (error) {}
      try {
        var can = document.getElementById("canvas");
        var ctx = can.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 8;
        ctx.lineJoin = "round"; //线与线的连接方式改为圆形
        ctx.lineCap = "round"; //起始点的绘制方式
        var flag = false;
        can.addEventListener("touchstart", function (evt) {
          const top = can.getBoundingClientRect().top;
          const left = can.getBoundingClientRect().left;
          var x = evt.touches[0].pageX - left;
          var y = evt.touches[0].pageY - top;
          ctx.strokeStyle = "#ff0000";
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          flag = true;
        });
        can.addEventListener("touchmove", function (evt) {
          if (flag) {
            const top = can.getBoundingClientRect().top;
            const left = can.getBoundingClientRect().left;
            var x = evt.touches[0].pageX - left;
            var y = evt.touches[0].pageY - top;
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        });
        can.addEventListener("touchend", function () {
          flag = false;
          ctx.closePath();
        });
      } catch (error) {}
    },
    Clearinter() {
      let c = document.getElementById("canvas");
      if (c == null || c == undefined) {
        this.$notify({
          title: "操作错误",
          message: `尚未创建涂鸦面板`,
          type: "error",
        });
        return;
      }
      document.getElementById("vector-display").removeChild(c);
    },
    showSelectArpt() {
      document.getElementsByClassName("chart-list")[0].style.display = "none";
      let div = document.getElementsByClassName("arpt-list")[0];
      if (div.style.display != "block") {
        document.getElementsByClassName("arpt-list")[0].style.display = "block";
      } else {
        document.getElementsByClassName("arpt-list")[0].style.display = "none";
      }
    },
    openSelectList(type, e) {
      if (this.NowArpt == "选择") {
        //用户没有选择机场
        return;
      }
      document.getElementsByClassName("arpt-list")[0].style.display = "none";
      let adiv = document.querySelectorAll(".items-main .items");
      for (let i = 0; i < adiv.length; i++) {
        adiv[i].setAttribute("class", "items");
      }
      let adiv2 = document.querySelectorAll(".chart-list .items");
      for (let i = 0; i < adiv2.length; i++) {
        adiv2[i].setAttribute("class", "items");
      }
      if (e.target.getAttribute("class") == "items") {
        e.target.setAttribute("class", "items active");
      } else if (e.target.parentNode.getAttribute("class") == "items") {
        e.target.parentNode.setAttribute("class", "items active");
      }
      document.getElementById('simlink-warning').style.left = '323px'
        document.getElementById('border-warning').style.left = '323px'
      switch (type) {
        case "ARPT":
          this.nowSelect = this.SelectARPT;
          this.nowTitle = "机场图(ARPT)";
          break;
        case "SID":
          this.nowSelect = this.SelectSID;
          this.nowTitle = "离场图(DEP)";
          break;
        case "STAR":
          this.nowSelect = this.SelectSTAR;
          this.nowTitle = "进场图(ARR)";
          break;
        case "APP":
          this.nowSelect = this.SelectAPP;
          this.nowTitle = "进近图(APP)";
          break;
        case "REF":
          this.nowSelect = this.SelectREF;
          this.nowTitle = "其他航图(OTHER)";
          break;
        default:
          break;
      }
      this.nowSelect_f = this.nowSelect
      this.chart_filter = ''
      document.getElementsByClassName("chart-list")[0].style.display = "block";
    },
    closeList() {
      document.getElementsByClassName("arpt-list")[0].style.display = "none";
      document.getElementsByClassName("chart-list")[0].style.display = "none";
    },
    enrouteChart(){
      try {
            let adiv = document.querySelectorAll('.b-items')
            for (let i = 0; i < adiv.length; i++){
                adiv[i].style.color = 'aliceblue'
            }
            document.getElementById('b-enroute').style.color = 'skyblue'
            
        } catch (error) {
            
        }
        let d = this.currentChart
        this.$router.push('/Enroute')
        this.outputEnroute(d)
    },
    mapFitWidth(){
      let img_d = document.querySelector('.lay-chart')
      img_d.style.width = '100%'
      img_d.style.height = 'auto'
    },
    mapFitHeight(){
      let img_d = document.querySelector('.lay-chart')
      img_d.style.width = 'auto'
      img_d.style.height = '100%'
    },
    mapClose(){
      document.querySelector('#main-chart').setAttribute('src','')
      this.currentChart = ''
      this.currentBorderData = ''
    },
    listenAction(){
      document.getElementById('closeborder').onclick=(e)=>{
          document.getElementsByClassName('chart-list')[0].style.display = 'none'
        document.getElementsByClassName('arpt-list')[0].style.display = 'none'
        document.getElementById('vector-display').style.left = '0px'
        document.getElementById('vector-display').style.width = '100%'
        document.getElementById('simlink-warning').style.left = '13px'
        document.getElementById('border-warning').style.left = '13px'
      }
      document.ondragstart = function(ev) {
	    ev.preventDefault();
        };
      document.ondragend = function(ev) {
	      ev.preventDefault();
      }; 
      window.onmousewheel = document.onmousewheel = (e) => {
        let img_d = document.querySelector('#vector-display')
        if (e.target.getAttribute('id') == 'vector-display' || e.target.getAttribute('id') == 'main-chart'){
          if (
            e.wheelDelta < 0 &&
            document.getElementsByTagName("canvas").length == 0
            && parseFloat(img_d.style.transform.split(')')[0].split('(')[1]) >0.5
          ){
            if (e.target.getAttribute('id') == 'main-chart'){
              img_d.style.transformOrigin =  `${e.offsetX}px ${e.offsetY}px`
            }
            let now_scale = img_d.style.transform.split(')')[0].split('(')[1]
            img_d.style.transform = `scale(${parseFloat(now_scale)-0.1})`
            
          }else if (
            e.wheelDelta > 0 &&
            document.getElementsByTagName("canvas").length == 0 &&
            parseFloat(img_d.style.transform.split(')')[0].split('(')[1]) < 3.3
          ){
            if (e.target.getAttribute('id') == 'main-chart'){
              img_d.style.transformOrigin =  `${e.offsetX}px ${e.offsetY}px`
            }
            let now_scale = img_d.style.transform.split(')')[0].split('(')[1]
            img_d.style.transform = `scale(${parseFloat(now_scale)+0.1})`
            
          }
        }
      }
    },
    drawPlane(){
      if (this.currentChart && this.currentBorderData){
        let marker = document.getElementById('sim-position')
        let lat = parseFloat(this.currentPlaneData.lat)
        let lng = parseFloat(this.currentPlaneData.lng)
        let heading = this.currentPlaneData.heading
        if (lat > this.currentBorderData.mainArea[2] &&
        lat < this.currentBorderData.mainArea[0] &&
        lng > this.currentBorderData.mainArea[1] &&
        lng < this.currentBorderData.mainArea[3]){
          document.getElementById('border-warning').style.display = 'none'
          //设置飞机图标坐标
          let hi = this.currentBorderData.border[0] - this.currentBorderData.border[2]
          let hib = this.currentBorderData.border[0]  - lat
          let sc_v = (hib/hi)*100
          let wi = this.currentBorderData.border[3] - this.currentBorderData.border[1]
          let wib = lng - this.currentBorderData.border[1]
          let sc_h = (wib/wi)*100
          marker.setAttribute('src',airplane)
          marker.style.right = `${sc_h}%`
          marker.style.top = `${sc_v}%`
          marker.style.transform = `rotate(${heading})`
        }else{
          document.getElementById('border-warning').style.display = 'block'
          marker.setAttribute('src','')
        }
      }else{
        return
      }
    }
  },

  props: ["sendDeviceWidth", "getPin", "AD", "Vector","Enroute","outputEnroute"],
  mounted() {
    this.width = this.sendDeviceWidth(new Date().getTime());
    if (this.width < 900) {
      document.getElementById("arpt-outer").style.marginLeft = "0px";
      document.getElementById("arpt-chart-display").style.width =
        "calc(100% - 70px)";
    } else {
      document.getElementById("arpt-outer").style.marginLeft = "60px";
    }
    let that = this;
    window.onresize = () => {
      if (that.$route.path == "/Airport") {
        that.width = this.sendDeviceWidth(new Date().getTime());
        if (that.width < 900) {
          document.getElementById("arpt-outer").style.marginLeft = "0px";
          document.getElementById("arpt-chart-display").style.width =
            "calc(100% - 70px)";
        } else {
          document.getElementById("arpt-outer").style.marginLeft = "60px";
        }
      }
    };
    this.getCycleData();
    this.checkSimlink();
    this.listenAction()
  },
  directives: {
    drag: {
      bind: function (el) {
        try {
          let odiv = el;
          el.onmousedown = (e) => {
              let disX = e.clientX - odiv.offsetLeft;
              let disY = e.clientY - odiv.offsetTop;
              let left = '';
              let top = '';
              document.onmousemove = (e)=>{
                  left = e.clientX - disX;
                  top = e.clientY - disY;
                  odiv.style.left = left + 'px';
                  odiv.style.top = top + 'px';
              };
              document.onmouseup = (e) => {
                  document.onmousemove = null;
                  document.onmouseup = null;
              };
          };
        } catch (error) {
          
        }
         try {
           let odiv = el;
          el.ontouchstart = (e) => {
              let disX = e.touches[0].clientX - odiv.offsetLeft;
              let disY = e.touches[0].clientY - odiv.offsetTop;
              let left = '';
              let top = '';
              document.ontouchmove = (e)=>{
                  left = e.touches[0].clientX - disX;
                  top = e.touches[0].clientY - disY;
                  odiv.style.left = left + 'px';
                  odiv.style.top = top + 'px';
              };
              document.ontouchend = (e) => {
                  document.touchmove = null;
                  document.touchend = null;
              };
          };
         } catch (error) {
           console.log(error)
         } 
      }
    }
  },
};
</script>

<style scoped lang='less'>
#arpt-outer {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  height: 100%;
  left: 0px;
  background-color: rgb(32, 36, 63);
  margin-left: 60px;
}
.night-mode {
  filter: invert(80%) contrast(170%) brightness(95%) hue-rotate(203deg);
}
.day-mode {
  filter: invert(0%) contrast(100%) brightness(100%);
}
@font-face {
    font-family:list-font;
    src: url(list.woff);
}
#arpt-chart-display {
  position: absolute;
  left: 70px;
  top: 0px;
  height: calc(100% - 50px);
  width: calc(100% - 130px);
  background-color: rgb(39, 39, 39);
  overflow: hidden;
}
#vector-display {
  position: absolute;
  left: 40%;
  transform: scale(1);
  top: 0;
  cursor: grab;
  #sim-position{
    position: absolute;
    width: 50px;
    top: 0%;
    transform: rotate(0);
  }
}

.day-mode#vector-display{
  filter: hue-rotate(20deg) contrast(1.15) brightness(0.95)
}
#simlink-warning {
  text-align: left;
  display: none;
  position: absolute;
  left: 323px;
  top: 15px;
  font-size: 18px;
  color: red;
  z-index: 99999;
}
#border-warning {
  text-align: left;
  display: none;
  position: absolute;
  left: 323px;
  top: 15px;
  font-size: 18px;
  color: red;
  z-index: 99999;
}
.interact {
  display: none;
  position: fixed;
  right: 20px;
  width: 35px;
  top: 80px;
  z-index: 9999999;
  line-height: 35px;
  .inter {
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-top: 12px;
    background-color: rgb(85,85,85);
    font-size: 24px;
    text-align: center;
    color: aliceblue;
  }
  #in-show {
    display: none;
  }
  #erc{
    display: none;
  }
}
.chart-select {
  font-family: list-font;
  position: relative;
  width: 70px;
  height: calc(100% - 50px);
  top: 0;
  background-color: rgb(59, 70, 138);
  z-index: 999;
  .line {
    position: absolute;
    top: 0%;
    height: 100%;
    left: 28px;
    width: 10px;
    border-radius: 2.5px;
    background-color: rgba(161, 160, 153, 0.2);
    z-index: -1;
  }
  .icon {
    position: relative;
    top: 4%;
    text-align: center;
    font-size: 35px;
    color: rgb(130, 132, 134);
  }
  .title {
    position: relative;
    top: 6%;
    text-align: center;
    width: 45px;
    background-color: rgb(32, 36, 63);
    border-radius: 5px;
    color: aliceblue;
    height: 45px;
    line-height: 45px;
    font-size: 30px;
    left: 12.5px;
  }
  .arpt {
    position: relative;
    top: 8%;
    color: aliceblue;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    border-radius: 4px;
    transition-duration: 0.3s;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
    margin-left: 4px;
    margin-right: 4px;
  }
  .arpt:hover {
    background-color: rgb(32, 36, 63);
  }
  .items-main {
    
    position: relative;
    top: 9%;
    .items {
      margin-top: 20px;
      text-align: center;
      color: aliceblue;
      cursor: pointer;
      font-size: 18px;
      transition-duration: 0.3s;
      margin-left: 3px;
      margin-right: 3px;
      border-radius: 4px;
      .num {
        font-size: 15px;
        color: skyblue;
        font-weight: lighter;
      }
      .tit {
        font-weight: 540;
      }
    }
    .active {
      background-color: rgb(15, 120, 229);
    }
    .items:hover {
      background-color: rgb(32, 36, 63);
    }
    .active:hover {
      background-color: rgb(29, 128, 194);
    }
  }
}
.arpt-list {
  font-family: list-font;
  display: none;
  position: absolute;
  left: 75px;
  top: calc(9% + 80px);
  padding-top: 5px;
  padding-bottom: 5px;
  width: 290px;
  text-align: center;
  background-color: rgb(59, 70, 138);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1000;
  animation: showarpt 0.4s;
}
@keyframes showarpt {
  0% {
    left: -50px;
    transform: scale(0.2);
  }
  100% {
    left: 75px;
    transform: scale(1);
  }
}
.chart-list {
  font-family: list-font;
  display: none;
  position: absolute;
  width: 310px;
  height: calc(100% - 50px);
  background-color: rgb(32, 36, 63);
  z-index: 999;
  left: 70px;
  top: 0;
  animation: showbar 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  .main-title {
    position: relative;
    font-size: 18px;
    color: aliceblue;
    text-align: center;
    padding-top: 10px;
  }
  .filter {
    position: relative;
    margin-top: 5px;
    margin-bottom: 15px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .items {
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
    width: calc(100% - 10px);
    height: 50px;
    cursor: pointer;
    background-color: rgb(45, 51, 90);
    transition-duration: 0.4s;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 6px;
    border-bottom: 1px solid rgb(58, 65, 110);
    .chart-name {
      position: relative;
      color: aliceblue;
      font-weight: bold;
      font-size: 14px;
      padding-left: 3px;
      margin-right: 50px;
    }
    .chart-num {
      color: rgba(242, 246, 250, 0.651);
      position: relative;
      font-size: 15px;
    }
    .simlink {
      top: 20px;
      position: absolute;
      right: 40px;
      width: 35px;
      color: white;
      font-size: 28px;
    }
    .disshow-simlink{
      display: none;
    }
    .pin{
      position: absolute;
      top: 20px;
      width: 35px;
      height: 35px;
      right: 5px;
      z-index: 1222;
      .pinchart {
      position: relative;
      color: white;
      font-size: 28px;
    }
    }
    
  }
  .items:hover {
    background-color: rgb(59, 70, 138);
  }
  .active {
    border-left: 4px solid orange;
    width: calc(100% - 14px);
  }
}
@keyframes showbar {
  0% {
    left: -70px;
    opacity: 0.3;
  }
  100% {
    left: 70px;
    opacity: 1;
  }
}
.zoom {
  display: none;
  position: absolute;
  top: 49%;
  left: 47%;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 1001;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
}
#closeborder{
  position: absolute;
  color: aliceblue;
  left: 260px;
  font-size: 28px;
  top: 10px;
  cursor: pointer;
}
</style>
<style lang="less">
#main-chart{
    position: relative;
}
.chart-iframe {
  left: 0px;
  border: 3px solid gray;
  position: relative;
  width: 100%;
  height: 100%;
}
canvas {
  z-index: 9999998;
  position: fixed;
  left: 0;
  top: 0;
  cursor: crosshair;
}
.filter .el-input__inner {
  background-color: rgb(59, 70, 138) !important;
  color: aliceblue;
  border: 1px solid rgb(75, 88, 175);
}

</style>