<template>
  <div id="arpt-outer">
    <div class="chart-select">
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
        <div @click="closeChartListItem" class="close"><i class="el-icon-circle-close"></i></div>
      </div>
      <div class="filter">
        <el-input
          placeholder="输入航图名称以筛选"
          suffix-icon="el-icon-search"
          v-model="chart_filter"
        >
        </el-input>
      </div>
      <div id="perview">
        <el-button @click="previewSIDSTAR" type="success">在航路图预览程序</el-button>
      </div>
      <div id="chart-load">
        <i class="el-icon-loading"></i><br>
        航图加载中 ... 
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
        <div title="把航图固定在列表栏" @click="pinChart(c)" class="pin">
          <div class="pinchart">
          <i  class="el-icon-add-location"></i>
        </div>
        </div>
        <div class="chart-name">{{ c[0].procedure_identifier }}</div>
        <div class="chart-num">{{ c[0].index_number }}</div>
      </div>
      <!-- 防止被Pin Board遮挡 -->
      <div class="footer" style="height:80px"></div>
    </div>
    <div class="main-outer"><div id="arpt-chart-display" :class="showNightMode()">
      <iframe frameborder="0"></iframe>
      <div class="zoom">{{ zoom }}%</div>
      <div id="vector-display" >
        <div id="simlink-warning">此航图不支持FlightLink功能</div>
        <div id="border-warning">追踪飞机不在航图范围内</div>
        <div class="interact">
          <div @click="mapZoomIn" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="放大航图"
              placement="left"
            >
              <i class="el-icon-zoom-in"></i>
            </el-tooltip>
          </div>
          <div @click="mapZoomOut" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="缩小航图"
              placement="left"
            >
              <i class="el-icon-zoom-out"></i>
            </el-tooltip>
          </div>
          <div @click="drawinter" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="新建涂鸦"
              placement="left"
            >
              <i class="el-icon-edit"></i>
            </el-tooltip>
          </div>
          <div @click="Clearinter" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="清除涂鸦"
              placement="left"
            >
              <i class="el-icon-circle-close"></i>
            </el-tooltip>
          </div>
          <div  @click="enrouteChart" id="erc" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="固定到航路图"
              placement="left"
            >
              <i class="el-icon-location-information"></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div></div>
  </div>
</template>

<script>
import { dataDecrypt } from "@/utils/cryptoJS";
import airplane from "@/assets/airplane.png";
import h_logo from '@/assets/h_logo.png'
import v_logo from '@/assets/v_logo.png'
import h_warning from '@/assets/h_warning.png'
import v_warning from '@/assets/v_warning.png'
export default {
  name: "Airport",
  data() {
    return {
      Access_Token:`kiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwUE71uHTHzeiqgBzeKZa
1LaPxNe9IcPqMO88pff/KRZAYCb4atsOv4VrmXvsqeeuRt3Q6jaCn95vnzr9avb5
Snos0rTl51K8gc8gbOEOHI1pHrfBaxb7PSyVCq0tfx4R4b4518J18hyhchBkeaZ0
siy8LSmdbCQq3qE0EGqehMtV0cVMtzmb3vhIXTs0MWYafIimFPMnk/rs1CFaxcjO
+8iHRaC8d7ufVyG8/IoQsJgLRDpD+RY6lDGpN97v+x7jsHnZhA/SfSwLI+0n7g7
j9yCxjk7EaKnUejXyNxlASk5G/h6OvgrLw0ZQhflEzF3Y4n+gdjyTkKCJCQaJkZ4
NR/3odr3La5XJoDFabQLSxg/mh1KsO2Qnrz/WzaK3yfMJTv2O+EaNaX5DjwYhFNl
f7vvxP/j8aBOmF35GzW1Bf895sLcz2G3AxvzfuIgYC70Aa5env94kFQxRMFE9d6n
gJYg6wLQZp0tU+u6FcPGuWljx9yHpBI6xLHIVwNIOWtsus5C72QWLgC/2zcglHI0
KrlD3vFLX8jgbXw2gm5x61yIViHwbIbqlm33l7MnoHWJoA2sBqm2a62ubAkFgoxT
utL3Y8euDTTY/R8Umc5BVAjsrZxPtAWZHIx711qoH/EYVQ/hMmEDLBJ73A1A0Mhg
drdDakP42xOU7cZH3a5F8OcCAwEAAQ`,
      activedChartTab: "ARPT",
      SelectAirport: "",
      path:'',
      chart_filter: "",
      AirportList: [],
      OriList:[],
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
      width: "",
      height: "",
      pilotLayer: [],
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
      h_warning,
      v_warning
    };
  },
  watch: {
    Vector: {
      handler(val) {
        if (val[1] != 'user'){
          this.showPngCharts(val);
        }else{
          this.clickUserChart(val)
        }
        
      },
    },
    chart_filter: {
      handler(val) {
        this.nowSelect_f = this.nowSelect.filter((g) => {
          return g[0].procedure_identifier.indexOf(val) !== -1;
        });
      },
    },
    allPin:{
      handler(val){
        let c = JSON.parse(JSON.stringify(val))
        for (let i in c){
          this.pindPdfChart.push(c[i])
        }
        this.getPin(this.pindPdfChart)
      }
    },
    u_chart:{
      handler(val){
        this.initUserAirport()
      }
    }
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
      this.$axios
        .get(`https://api.skylineflyleague.cn/EFBData/cycle/available.json?${new Date().getTime()}`)
        .then((res) => {
          this.cycle = res.data.Available_AIRAC_Cycle;
          this.path = res.data.path
          this.setCycleData();
        });
    },
    setCycleData() {
      this.initAirportData();
    },
    initAirportData() {
      // this.$axios.get(`./cycle/${this.cycle}/airport/Airportlist.db`).then((res) => {
      //   let or_data = JSON.parse(dataDecrypt(res.data));
      this.$axios
        .get(
          `https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/airport/List.json?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`
        )
        .then((res) => {
          let d = res.data;
          for (let i = 0; i < d.length; i++) {
            let data = `${d[i].name}(${d[i].icao})`
            this.AirportList.push({ name: data, icao: d[i].icao });
            this.OriList.push({ name: data, icao: d[i].icao });
          }
          this.initUserAirport()
        });
    },
    initUserAirport(){
      //自定义用户航图数据
      if (this.u_chart == null || this.u_chart == [] || this.u_chart.length == 'true') return
      let chart = JSON.parse(JSON.stringify(this.u_chart))//防止ob
      this.AirportList = JSON.parse(JSON.stringify(this.OriList))
      for (let i in chart){
        this.AirportList.push({name:chart[i].label,icao:chart[i].icao,self:'true'})
      }
    },
    getChartBound(t, e, n, i) {
      //获取航图边界
      let bottomLeftX = Math.min(t, n);
      let topRightX = Math.max(t, n);
      let bottomLeftY = Math.max(e, i);
      let topRightY = Math.min(e, i);
      return { bottomLeftX, topRightX, bottomLeftY, topRightY };
    },
    dataURLtoFile(dataurl, filename = 'chart') {
          let arr = dataurl.split(',')
          let mime = arr[0].match(/:(.*?);/)[1]
          let suffix = mime.split('/')[1]
          let bstr = atob(arr[1])
          let n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
          }
          return new File([u8arr], `${filename}.${suffix}`, {
              type: mime
          })
      },
    setAirportChart(e) {
        (this.SelectREF = []),
        (this.SelectARPT = []),
        (this.SelectSID = []),
        (this.SelectSTAR = []),
        (this.SelectAPP = []),
        (this.selectId = e);
      this.NowArpt = this.selectId;
      document.getElementById('chart-load').style.display = 'block'
      let chart = JSON.parse(JSON.stringify(this.u_chart))
      for (let i in chart){
        if (chart[i].icao == e){
          this.setUserChart(e)
          return
        }
      }
      this.$axios
        .get(
          `https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/airport/SKYLINECN/${this.selectId}.db?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`
        )
        .then((res) => {
          let init_data = res.data
          let resdata = JSON.parse(dataDecrypt(init_data.slice(10,init_data.length)))[3]
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
          document.getElementById('chart-load').style.display = 'none'
        });
    },
    setUserChart(e){
      let chart = JSON.parse(JSON.stringify(this.u_chart))
      for (let i in chart){
        if (chart[i].icao == e){
          for (let j in chart[i].children){
            let d = chart[i].children[j]
            //d是该机场每一张航图
            let data = {procedure_identifier:d.label,icao_airport_identifier:this.u_chart[i].icao,index_number:`${this.u_chart[i].icao} - ${parseInt(j)+1}`,data:d.data,type:{section:this.getTypeSection(d.type)}}
            switch (d.type) {
              case 'arpt':
                this.SelectARPT.push([data,'user'])
                break;
              case 'sid':
                this.SelectSID.push([data,'user'])
                break;
              case 'star':
                this.SelectSTAR.push([data,'user'])
                break;
              case 'app':
                this.SelectAPP.push([data,'user'])
                break;
              case 'other':
                this.SelectREF.push([data,'user'])
                break;
              default:
                break;
            }
          }
          break
        }
      }
      document.getElementById('chart-load').style.display = 'none'
      
    },
    getTypeSection(c){
      switch (c) {
        case 'arpt':
          return 'APT'
        case 'sid':
          return 'DEP'
        case 'star':
          return 'ARR'
        case 'app':
          return 'APP'
        default:
          return 'OTHER'
      }
    },
    clickUserChart(c){
      document.getElementById("simlink-warning").style.display = "block";
      for (let i = 0; i < this.vectorData.length; i++) {
        this.vectorData[i].remove();
      }
      this.vectorData = [];
        this.thisBorder = []
          let chart_url = `https://api.skylineflyleague.cn/efb/data/user_main_data/chart_data/${c[0].data}?cycle=${this.cycle}&Access_Token=${this.Access_Token}`
          let img = new Image();
          img.src = chart_url
          img.onload = () => {
            this.width = img.width;
            this.height = img.height;
            this.clientWidth = img.width;
            let long_lat = parseFloat(this.height) / 1000;
            let long_lng = parseFloat(this.width) / 1000;
            let latlng2 = [
              [0, 0],
              [long_lat, long_lng],
            ];
            this.map.setMaxZoom(13)
            this.map.setView([long_lat / 2, long_lng / 2], 9,{animate:false,duration:0});
            this.thiszoom = "9";
            this.vectorData.push(
              this.L.imageOverlay(chart_url, [latlng2])
            );
            let vectorLayer = this.L.layerGroup(this.vectorData);
            this.map.addLayer(vectorLayer);
          };
          document.getElementById('erc').style.display = 'none'     
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
      if (c[1] == 'user'){
        this.clickUserChart(c)
        return
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
        `./pdf/web/viewer.html?file=${this.path}/Chart_data/${this.cycle}/AD/${pdf_path}.pdf`
      );
      p.append(app_iframe);
      let pdfChart = document.getElementsByClassName("chart-iframe")[0];
      pdfChart.onclick = () => {
        document.getElementsByClassName("arpt-list")[0].style.display = "none";
        document.getElementsByClassName("chart-list")[0].style.display = "none";
      };
    },
    showPngCharts(c) {
      document.getElementsByClassName("interact")[0].style.display = "block";
      for (let i = 0; i < this.vectorData.length; i++) {
        this.vectorData[i].remove();
      }
      this.vectorData = [];
      let p = document.getElementById("arpt-chart-display");
      try {
        let iframe = document.getElementsByTagName("iframe")[0];
        p.removeChild(iframe);
      } catch (err) {}
      let data = c;
      if (c[0].planview != undefined) {
        //支持simlink
        document.getElementById("simlink-warning").style.display = "none";
        this.thisBorder = data[0].planview.bbox_geo
        //处理航图边界
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
            this.map.setMaxZoom(15)
            this.map.setView(centerLatlngs, 14.5,{animate:false,duration:0});
            this.thiszoom = "14.5";
            break;
          case "DEP":
            this.map.setMaxZoom(10.5)
            this.map.setView(centerLatlngs, 9,{animate:false,duration:0});
            this.thiszoom = "9";
            break;
          case "ARR":
            this.map.setMaxZoom(10.5)
            this.map.setView(centerLatlngs, 9,{animate:false,duration:0});
            this.thiszoom = "9";
            break;
          case "APP":
             this.map.setMaxZoom(11.5)
            this.map.setView(centerLatlngs, 10,{animate:false,duration:0});
            this.thiszoom = "10";
            break;

          default:
            this.map.setMaxZoom(12)
            this.map.setView(centerLatlngs, 9,{animate:false,duration:0});
            this.thiszoom = "9";
            break;
        }
        this.chartWidth = data[0].bbox_local[2];
        let logo_type = ''
        let lng_l = ''
        let lng_r = ''
        let lat_l = ''
        let lat_r = ''
        let left = []
        let right = []
        let warning_type = ''
        this.vectorData.push(
          this.L.imageOverlay(
            `${this.path}/Chart_data/${this.cycle}/JEEP/SKYLINECN/${data[0].file_day.replace('.png','.chart_data.json')}?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`,
            A
          )
        );
        //设置航图底部/左侧logo
        if (data[0].bbox_local[1]>=data[0].bbox_local[2]){
          //竖版航图
          lng_l = A._southWest.lng
          lng_r = A._northEast.lng
          lat_l = A._southWest.lat+((A._northEast.lat - A._southWest.lat)/45)
          lat_r = A._southWest.lat
          logo_type = h_logo
          warning_type = h_warning
          this.vectorData.push(
            this.L.imageOverlay(
              h_logo,[[lat_l,lng_l],[lat_r,lng_r]]
            )
          )
          //把标语放到底部中央
          let height = ((A._northEast.lat - A._southWest.lat)/45)  //竖版航图的标语高度
          let width = (height/90)*1920  //宽度
          left = [
            A._southWest.lat+height,//纬度
            A._southWest.lng + (A._northEast.lng - A._southWest.lng - width)/2.6
          ]
          right = [
            A._southWest.lat,
            A._northEast.lng - (A._northEast.lng - A._southWest.lng - width)/2.6
          ]
          this.vectorData.push(
            this.L.imageOverlay(h_warning,[left,right])
          )
        }else{
          //横版航图
          lng_l = A._southWest.lng
          lng_r = A._southWest.lng+((A._northEast.lng - A._southWest.lng)/40)
          lat_l = A._northEast.lat
          lat_r = A._southWest.lat
          logo_type = v_logo
          warning_type = v_warning
          this.vectorData.push(
            this.L.imageOverlay(
              v_logo,[[lat_l,lng_l],[lat_r,lng_r]]
            )
          )
          let width = ((A._northEast.lng - A._southWest.lng)/45)
          let height = (width/90)*1920
          left = [
            A._northEast.lat - (A._northEast.lat - A._southWest.lat - height)/1.4,
            A._southWest.lng
          ]
          right = [
            A._southWest.lat + (A._northEast.lat - A._southWest.lat - height)/1.4,
            A._southWest.lng + width
          ]
          this.vectorData.push(
            this.L.imageOverlay(v_warning,[left,right])
          )
        }
        let vectorDataLayergroup = this.L.layerGroup(this.vectorData);
        this.map.addLayer(vectorDataLayergroup);
        if (data[0].type.section != 'APT'){
          this.currentChart = {"data":data,"border":A,"zoom":this.thiszoom,"center":centerLatlngs,"logo_type":logo_type,"logo":[[lat_l,lng_l],[lat_r,lng_r]],"warning_type":warning_type,"warning":[left,right]}
        document.getElementById('erc').style.display = 'block'
        }else{
          document.getElementById('erc').style.display = 'none'
        }
        
      } else {
        //不支持simlink
        document.getElementById("simlink-warning").style.display = "block";
        this.thisBorder = []
        let that = this;
        let chart_url = `${this.path}/Chart_data/${this.cycle}/JEEP/SKYLINECN/${c[0].file_day.replace('.png','.chart_data.json')}?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`;
        let img = new Image();
        img.src = chart_url;
        img.onload = () => {
          that.width = img.width;
          that.height = img.height;
          that.clientWidth = img.width;
          let long_lat = parseFloat(that.height) / 1000;
          let long_lng = parseFloat(that.width) / 1000;
          let latlng2 = [
            [0, 0],
            [long_lat, long_lng],
          ];
          this.map.setMaxZoom(10.5)
          that.map.setView([long_lat / 2, long_lng / 2], 9,{animate:false,duration:0});
          that.thiszoom = "9";
          that.vectorData.push(
            that.L.imageOverlay(chart_url,[latlng2])
          );
          //设置航图底部/左侧logo
          let left = []
          let right = []
        if (long_lat >= long_lng){
          //竖版航图
          let lat_l = (long_lat/45) 
          let lng_l = 0
          let lat_r = 0
          let lng_r = long_lng
          that.vectorData.push(
            that.L.imageOverlay(
            h_logo,
            [[lat_l,lng_l],[lat_r,lng_r]]
          )
          )
          let height = lat_l //竖版航图的标语高度
          let width = (height/90)*1920  //宽度
          left = [
            height,
            (lng_r - width)/2
          ]
          right = [
            0,lng_r - (lng_r - width)/2
          ]
          this.vectorData.push(
            this.L.imageOverlay(h_warning,[left,right])
          )
        }else{
          //横版航图
          let lat_l = 0
          let lng_l = 0
          let lat_r = long_lat
          let lng_r = long_lng/40
          that.vectorData.push(
            that.L.imageOverlay(
            v_logo,
            [[lat_l,lng_l],[lat_r,lng_r]]
          )
          )
          let width = lng_r
          let height = (width/90)*1920
          left = [
            lat_l + (lat_r - height)/2,
            0
          ]
          right = [
            lat_r - (lat_r - height)/2,
            lng_r
          ]
          this.vectorData.push(
            this.L.imageOverlay(v_warning,[left,right])
          )
        }
          let vectorLayer = that.L.layerGroup(that.vectorData);
          that.map.addLayer(vectorLayer);
        };
        document.getElementById('erc').style.display = 'none'
      }
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
        this.$message.error('尚不支持固定机场细则~');
      } else {
        this.pindPdfChart.push(c);
        this.getPin(this.pindPdfChart)
      }
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
    initVectorMap() {
      const map = this.L.map("vector-display", {
        minZoom: 8,
        center: [29.550339, 100.114129],
        zoom: 4.25,
        smoothZoom: true,
        zoomControl: false,
        zoomSnap: 0.001,
        attributionControl:false
      });
      this.map = map;
      this.map.scrollWheelZoom.disable();
      let that = this;
      let zoom = document.getElementsByClassName("zoom")[0];
      this.map.on('drag',()=>[
        that.map.invalidateSize(true)
      ])
      try {
        window.onmousewheel = document.onmousewheel = (e) => {
        try {
          let img = document.querySelectorAll(".leaflet-image-layer");
          let zoom_o = parseFloat(this.thiszoom);
          let zoom_n = this.map.getZoom();
          let scnel = (zoom_n / zoom_o).toFixed(2);
          this.zoom = parseInt(scnel * 100);
          this.map.invalidateSize(true)
          if (
            e.wheelDelta < 0 &&
            document.getElementsByTagName("canvas").length == 0 &&
            e.target.className.indexOf("leaflet-container") != -1
          ) {
            that.map.setZoom(that.map.getZoom() - 0.15);
            zoom.style.display = "block";
          } else if (
            e.wheelDelta > 0 &&
            document.getElementsByTagName("canvas").length == 0 &&
            e.target.className.indexOf("leaflet-container") != -1 &&
            parseInt(img[0].width) <= parseInt(that.chartWidth)
          ) {
            
            that.map.setZoom(that.map.getZoom() + 0.15);
            //that.map.setZoomAround([e.offsetX,e.offsetX],that.map.getZoom() + 0.15)
            zoom.style.display = "block";
          }
          hiddenZoom();
        } catch (error) {}
      };
      } catch (error) {
        
      }
      
      function hiddenZoom() {
        setTimeout(() => {
          zoom.style.display = "none";
        }, 1500);
      }
      this.map.on("click", function () {
        try {
          document.getElementsByClassName("arpt-list")[0].style.display = "none";
        document.getElementsByClassName("chart-list")[0].style.display = "none";
        document.getElementById('simlink-warning').style.left = '24px'
        document.getElementById('border-warning').style.left = '24px'
        document.querySelector('.personal-card').style.display = 'none'
        } catch (error) {
          
        }
        
      });
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
      let c = document.getElementById("canvas");
      if (c != null || c != undefined) {
        return this.$message.error('涂鸦模式下无法缩放航图');
      }
      this.map.setZoom(this.map.getZoom() + 1);
    },
    mapZoomOut() {
      let c = document.getElementById("canvas");
      if (c != null || c != undefined) {
        return this.$message.error('涂鸦模式下无法缩放航图');
      }
      this.map.setZoom(this.map.getZoom() - 1);
    },
    checkSimlink() {
      this.trackSimlinkPlane();
    },
    closeChartListItem(){
      document.getElementsByClassName("chart-list")[0].style.display = "none";
    },
    trackSimlinkPlane() {
      //实际开发情况：根据用户实际登录信息获取对应飞行员编号，在这里没有后端，进行简化
      
      const Icon = L.icon({
        iconUrl: airplane,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      });
      let that = this;
      setInterval(() => {
        let pilot = this.personalData[0]
        if (localStorage.getItem("showFlightLink") == "true") {
          if (this.thisBorder.length != 0){
             that.$axios
            .get("https://map.skylineflyleague.cn/api/online.php")
            .then((res) => {
              for (let i in this.pilotLayer) {
                this.pilotLayer[i].remove();
              }
              this.pilotLayer = [];
              let whazzupData = res.data.split("\n");
              for (let i in whazzupData) {
                let pilotData = whazzupData[i].split(":");
                if (pilot == pilotData[1] && pilotData[3] == "PILOT") {
                  if (parseFloat(pilotData[5]) > this.thisBorder[1] && parseFloat(pilotData[5]) < this.thisBorder[3] && parseFloat(pilotData[6]) > this.thisBorder[0] && parseFloat(pilotData[6]) < this.thisBorder[2]){
                    this.pilotLayer.push(
                    this.L.marker([pilotData[5], pilotData[6]], {
                      icon: Icon,
                      rotationAngle: pilotData[10],
                    })
                  );
                  try {
                    document.getElementById('border-warning').style.display = 'none'
                  } catch (error) {
                    
                  }
                  
                  break;
                  }else{
                    try {
                      document.getElementById('border-warning').style.display = 'block'
                    } catch (error) {
                      
                    }
                    
                  }
                }
              }
              let marker_layergroup = this.L.layerGroup(this.pilotLayer);
              this.map.addLayer(marker_layergroup);
            });
          }else{
            return;
          }
        } else {
          return;
        }
      }, 3200);
    },
    drawinter() {
      this.map.scrollWheelZoom.disable();
      this.map.dragging.disable();
      let c = document.getElementById("canvas");
      if (c != null || c != undefined) {
        //已经创建了
        return this.$message.error('涂鸦面板已经创建了哦~ (￣︶￣)');
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
      //this.map.scrollWheelZoom.enable();
      this.map.dragging.enable();
      let c = document.getElementById("canvas");
      if (c == null || c == undefined) {
        return this.$message.error('尚未创建涂鸦面板~  (￣︶￣)');
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
      document.getElementById('simlink-warning').style.left = '263px'
        document.getElementById('border-warning').style.left = '263px'
      switch (type) {
        case "ARPT":
          this.nowSelect = this.SelectARPT;
          this.nowTitle = "机场图(ARPT)";
          document.getElementById('perview').style.display = 'none'
          break;
        case "SID":
          this.nowSelect = this.SelectSID;
          this.nowTitle = "离场图(DEP)";
          document.getElementById('perview').style.display = 'block'
          break;
        case "STAR":
          this.nowSelect = this.SelectSTAR;
          this.nowTitle = "进场图(ARR)";
          document.getElementById('perview').style.display = 'block'
          break;
        case "APP":
          this.nowSelect = this.SelectAPP;
          this.nowTitle = "进近图(APP)";
          document.getElementById('perview').style.display = 'none'
          break;
        case "REF":
          this.nowSelect = this.SelectREF;
          this.nowTitle = "其他航图(OTHER)";
          document.getElementById('perview').style.display = 'none'
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
        
        this.outputEnroute(d)
        this.$router.push('/Enroute')
    },
    previewSIDSTAR(){
      try {
            let adiv = document.querySelectorAll('.b-items')
            for (let i = 0; i < adiv.length; i++){
                adiv[i].style.color = 'aliceblue'
            }
            document.getElementById('b-enroute').style.color = 'skyblue'
            
        } catch (error) {
            
        }
        let d = this.NowArpt
        let t = this.nowTitle
        
        this.outputSIDSTAR(d,t)
        this.$router.push('/Enroute')
    }
  },

  props:['setWidth','cycle'],
  mounted() {
    this.getCycleData();
    this.checkSimlink();
    this.setWidth()
    this.$nextTick(() => {
      this.initVectorMap();
    });
    
  },
};
</script>

<style scoped lang='less'>
#arpt-outer {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  height: 100%;
  left: 0px;
  background-color: rgb(32, 36, 63);
  // margin-left: 60px;
}

.day-mode > .leaflet-image-layer{
  filter: hue-rotate(20deg) contrast(1.15) brightness(0.95)
}
.night-mode > #vector-display > .leaflet-pane > .leaflet-overlay-pane{
   filter: invert(0%) contrast(100%) brightness(100%);
}
@font-face {
    font-family:list-font;
    src: url(list.woff);
}
.mian-outer{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(39, 39, 39);
  overflow: hidden;
}
#arpt-chart-display {
  position: absolute;
  left: 70px;
  top: 0px;
  height: calc(100% - 50px);
  width: calc(100% - 70px);
  background-color: rgb(39, 39, 39);
  overflow: hidden;
}
#vector-display {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(39, 39, 39);
  
}

#simlink-warning {
  display: none;
  position: relative;
  left: 263px;
  top: 15px;
  font-size: 18px;
  color: red;
  z-index: 99999;
}
#border-warning {
  display: none;
  position: relative;
  left: 263px;
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
  top: 90px;
  z-index: 9999999;
  .inter {
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-top: 12px;
    background-color: rgba(20, 43, 70, 0.5);
    font-size: 24px;
    text-align: center;
    transition-duration: 0.3s;
    color: aliceblue;
  }
  .inter:hover{
    color: rgb(25, 165, 247);
    background: rgba(8, 26, 44, 0.9);
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
    top: 1%;
    text-align: center;
    font-size: 35px;
    color: rgb(130, 132, 134);
  }
  .title {
    position: relative;
    top: 3%;
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
    top: 4%;
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
    top: 5%;
    .items {
      margin-top: 10px;
      text-align: center;
      color: aliceblue;
      cursor: pointer;
      font-size: 18px;
      transition-duration: 0.3s;
      margin-left: 3px;
      margin-right: 3px;
      border-radius: 50%;
      width:64px;
      height: 64px;
      .num {
        position: relative;
        top:10px;
        font-size: 15px;
        color: skyblue;
        font-weight: lighter;
      }
      .tit {
        position: relative;
        top: 20%;
        font-weight: 540;
      }
    }
    .active {
      background-color: rgb(45, 136, 233);
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
  top: calc(4% + 45px);
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
  width: 250px;
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
    .close{
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 22px;
      color: white;
      cursor: pointer;
    }
  }
  .filter {
    position: relative;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 30px;
    margin-right: 30px;
  }
  #chart-load{
    position: relative;
    text-align: center;
    font-size: 20px;
    color: white;
    i{
      font-size: 50px;
      line-height: 50px;
      color:#0ae1d7;
      font-weight: bold;
    }
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
      padding-left: 5px;
      margin-right: 60px;
    }
    .chart-num {
      color: rgba(242, 246, 250, 0.651);
      position: relative;
      padding-left: 5px;
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
#perview{
  display: none;
  position: relative;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
<style lang="less">
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
    left: 60px;
    top: 50px;
    height: calc(100% - 50px);
    cursor: crosshair;
}
.filter .el-input__inner {
  background-color: rgb(59, 70, 138) !important;
  color: aliceblue;
  border: 1px solid rgb(75, 88, 175);
}
.day-mode > #vector-display > .leaflet-pane > .leaflet-overlay-pane{
  filter: hue-rotate(19deg) contrast(1.1)
}
.night-mode > #vector-display > .leaflet-pane > .leaflet-overlay-pane{
   filter: invert(80%) contrast(170%) brightness(95%) hue-rotate(169deg);
}
</style>