<template>
  <div class="div">
    <div id="enroute" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" :class="showNightMode()">
    <!-- 右侧overlay操作列表 -->
    <div id="overlay">
      <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="窗口展示"
              placement="left"
            >
              <i @click="chartWindow" class="el-icon-monitor"></i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="关闭预览"
              placement="left"
            >
              <i @click="chartClose" class="el-icon-circle-close"></i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="设置透明度为90%"
              placement="left"
            >
              <i @click="chartSet90" style="font-size: 14px;line-height: 35px;">90%</i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="设置透明度为80%"
              placement="left"
            >
              <i @click="chartSet80" style="font-size: 14px;line-height: 35px;">80%</i>
            </el-tooltip>
          </div>
          <div class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="设置透明度为70%"
              placement="left"
            >
              <i @click="chartSet70" style="font-size: 14px;line-height: 35px;">70%</i>
            </el-tooltip>
          </div>
    </div></div>
    <div v-drag class="preview">
      <div class="title">{{perview.icao}}-{{perview.ch_type}}程序预览</div>
      <div @click="closePreview" class="close"><i class="el-icon-circle-close"></i></div>
      <el-select @change="drawPreview" no-data-text="数据加载中..." id="pre-sel" auto-complete="false" v-model="perview.value" placeholder="请选择">
    <el-option
      v-for="(item,index) in perview.runway"
      :key="index"
      :label="item.name"
      :value="item.value"
      >
    </el-option>
  </el-select>
    </div>
    <div v-drag class="select">
      <div class="title">选择{{select.icao}}-{{select.ch_type}}程序</div>
      <div @click="closeSelect" class="close"><i class="el-icon-circle-close"></i></div>
      <el-select no-data-text="数据加载中..." @change="changeSelectRwy" id="pro-sel" auto-complete="false" v-model="select.runwayvalue" placeholder="选择跑道">
    <el-option
      v-for="(item,index) in select.runway"
      :key="index"
      :label="item.name"
      :value="item.value"
      >
    </el-option>
  </el-select>
  <br><br>
  <el-select no-data-text="数据加载中..." @change="changeSelectPro" id="pro-sel-in" auto-complete="false" v-model="select.selectvalue" placeholder="选择程序">
    <el-option
      v-for="(item,index) in select.route"
      :key="index"
      :label="item.name"
      :value="item.name"
      
      >
      <span style="float: left">{{ item.name }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.type }}</span>
    </el-option>
    
  </el-select>
  <br>
    </div>
    <el-button class="button" @click="showForm" type="success"
      ><i class="el-icon-circle-plus-outline"></i>创建飞行计划
    </el-button>
    <div class="r-main" id="r-main">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item required label="航班号">
          <el-input v-model="form.callsign" placeholder="飞行航班号"></el-input>
        </el-form-item>
        <el-form-item required label="起飞机场">
          <el-input
            minlength="4"
            maxlength="4"
            v-model="form.dep"
            placeholder="起飞机场"
          ></el-input>
        </el-form-item>
        <el-form-item required label="落地机场">
          <el-input
            minlength="4"
            maxlength="4"
            v-model="form.arr"
            placeholder="落地机场"
          ></el-input>
        </el-form-item>
        <el-form-item required label="机型">
          <el-select v-model="form.type" placeholder="选择机型">
            <el-option label="A318" value="A318"></el-option>
            <el-option label="A319" value="A319"></el-option>
            <el-option label="A320" value="A320"></el-option>
            <el-option label="A321" value="A321"></el-option>
            <el-option label="A330-200" value="A330-200"></el-option>
            <el-option label="A340-300" value="A340-300"></el-option>
            <el-option label="A350-941" value="A350-941"></el-option>
            <el-option label="A380-800" value="A380-800"></el-option>
            <el-option label="B737-300" value="B737-300"></el-option>
            <el-option label="B737-500" value="B737-500"></el-option>
            <el-option label="B737-700" value="B737-700"></el-option>
            <el-option label="B737-800" value="B737-800"></el-option>
            <el-option label="B737-900" value="B737-900"></el-option>
            <el-option label="B737 MAX" value="B737 MAX"></el-option>
            <el-option label="B747-400" value="B747-400"></el-option>
            <el-option label="B747-8" value="B747-800"></el-option>
            <el-option label="B757-200" value="B757-200"></el-option>
            <el-option label="B777-200LR" value="B777-200"></el-option>
            <el-option label="B777-300ER" value="B777-300"></el-option>
            <el-option label="B787-800" value="B787-800"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="最终报告单位">
          <el-select v-model="form.unit" placeholder="选择单位">
            <el-option label="千克" value="kg"></el-option>
            <el-option label="磅" value="lib"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划巡航高度">
          <el-input
            v-model="form.crz"
            maxlength="5"
            type="number"
            placeholder="巡航高度(英尺)"
          ></el-input>
        </el-form-item>
        <el-form-item label="计划备用燃油">
          <el-input
            v-model="form.rev"
            placeholder="计划备用燃油(分钟)"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="Cost Index">
          <el-input
            v-model="form.ci"
            maxlength="3"
            type="number"
            placeholder="成本指数"
          ></el-input>
        </el-form-item>
        <el-form-item label="旅客人数">
          <el-input
            v-model="form.passenger"
            type="number"
            maxlength="3"
            placeholder="旅客人数"
          ></el-input>
        </el-form-item>
        <el-form-item label="配载货物重量">
          <el-input
            v-model="form.load"
            type="number"
            placeholder="计划配载货物重量(吨)"
          ></el-input> </el-form-item
        ><br />
        <el-form-item label="自定义航路(仅限国内)">
          <el-input type="textarea" v-model="userTempRoute" placeholder="自定义航路数据[请不要填写起落机场和进离场程序]"></el-input>
        </el-form-item><br>
        <el-form-item>
          <el-button @click="showResult" id="sub" type="primary"
            >一键生成航路、燃油、气象数据</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 航班计划表 -->
    <div class="report-outer">
      <div @click="changeDisplay" id="r-change">
        <i class="el-icon-arrow-up"></i>
      </div>
      <div class="top-info">
        <span class="callsign">{{ route.callsign.toUpperCase() }}</span>
        <span class="arpt">{{ route.dep }} → {{ route.arr }}</span>
        <span class="distant">{{ route.distance }}NM</span>
      </div>
      <div class="route-info">
        <div id="scrollable">
          <div v-for="(d, index) in route.eachroute" :key="index" class="items">
          <div @click="showWptDetail($event.target)" :awyData="awyData(index)" :route="d.name" :class="d.type">
            <i :class="getIcon(d.type)" :awyData="awyData(index)" :route="d.name"></i> {{ d.name }}
          </div>
        </div>
        </div>
          
      </div>
      <div id="r-info">
        <div class="simlink-info">
          <div>
            <span class="s-1">状态：{{ connectSimlink }}</span>
            <span class="s-3">高度：{{ simlink.alt }}ft</span><br>
            <span class="s-1">地速：{{ simlink.gs }}kts</span>
            <span class="s-3">航向：{{ simlink.heading }}°</span><br>
            <span class="s-1">机型：{{ simlink.type }}</span>
            <span class="s-3">应答机：{{ simlink.squawk }}</span><br>
            <span class="s-1">经度：{{ simlink.lat }}°</span>
            <span class="s-3">纬度：{{ simlink.lng }}°</span><br>
            <br />
          </div>
        </div>
        <div class="action-info">
          <el-button class="ab" @click="d_route" type="primary"
            >详细航路</el-button
          >
          <el-button class="ab" @click="d_weather" type="success"
            >气象资料</el-button
          >
          <el-button class="ab" @click="d_report" type="info"
            >飞行报告</el-button
          >
          <el-button class="ab" @click="d_file" type="danger"
            >文件下载</el-button
          >
          <el-button class="ab" @click="pinAllCharts" type="success"
            >固定航图</el-button
          >
          <el-button class="ab" @click="d_unload" type="info"
            >结束航班</el-button
          >
        </div>
      </div>
    </div>
    <!-- 详情信息表 -->
    <div class="detail">
      <div id="d-route">
        <div class="airway-outer">
          <div class="top-route">计划航路信息</div>
          <div class="route-show">
            <span id="dep">{{ route.dep }} </span><span id="sid">{{route.filsid}} </span
            ><span id="route">{{ route.route }} </span
            ><span id="star">{{route.filstar}} </span><span id="arr">{{ route.arr }}</span>
          </div>
          <div class="top-route">联飞提交航路</div>
          <div class="route-show online">
            <span>{{ route.route }}</span>
          </div>
          <div class="top-route">详细航路信息</div>
          <!-- <span style="position:relative;left:10%">【Tip】: 航路信息列表可以进行增加航点、删除航点等编辑哦~</span> -->
          <br /><br />
          <el-table
            :data="routeData"
            border
            style="width: 80%; left: 10%; border-radius: 4px"
          >
            <el-table-column prop="name" label="航点名称"> </el-table-column>
            <el-table-column prop="lat" label="纬度"> </el-table-column>
            <el-table-column prop="lng" label="经度"> </el-table-column>
          </el-table>
          <br />
          <br />
        </div>
      </div>
      <div id="d-weather">
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
          <div class="iframe-outer" style="height: 450px">
            <iframe
              class="windy-detail"
              width="100%"
              :src="`https://embed.windy.com/embed2.html?lat=${route.deplat}&amp;lon=${route.deplng}&amp;zoom=5&amp;level=surface&amp;overlay=windy&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;detailLat=${route.deplat}&amp;detailLon=${route.deplng}&amp;metricWind=kt&amp;metricTemp=%C2%B0C&amp;radarRange=-1`"
              frameborder="0"
            ></iframe>
            <iframe
              class="windy-detail"
              width="100%"
              :src="`https://embed.windy.com/embed2.html?lat=${route.arrlat}&amp;lon=${route.arrlng}&amp;zoom=5&amp;level=surface&amp;overlay=windy&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;detailLat=${route.arrlat}&amp;detailLon=${route.arrlng}&amp;metricWind=kt&amp;metricTemp=%C2%B0C&amp;radarRange=-1`"
              frameborder="0"
            ></iframe>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      <div id="d-report">
        <div class="airway-outer">
          <div class="top-route" style="padding-left: 5%">飞行计划报告单</div>
          <div class="report">
            <div class="container">
              <!-- 中文 -->
              <br />
              <div class="r-title">
                SKYline Flyleague - 飞行计划报告单 --- {{ getDate() }} 已生成
                <br />
                仅供模拟飞行使用，请勿在现实世界使用
              </div>
              <div class="r-title">
                ===================================================
              </div>
              <div>== 飞行计划单开始 ==</div>
              <div>【数据信息】</div>
              <div>单位：{{runit}}</div>
              <br />
              <div>机载导航数据库：SKY_TE_R3_DATABASE</div>
              <br />
              <div>
                签派程序数据库：SKYline Database - AIRAC - ICAO -GEN398 -R2
              </div>
              <br />
              <div>数据校准：已完成 No:A3-124</div>
              <div class="r-title">
                ===================================================
              </div>
              <div>【航班信息】</div>
              <div>
                航班号 &nbsp; &nbsp; 机型 &nbsp; &nbsp; 起飞/降落 &nbsp; &nbsp;
                机场运行 &nbsp; &nbsp; 签派注册号
              </div>
              <div>
                {{ route.callsign.toUpperCase() }} &nbsp; {{ form.type }} &nbsp;
                {{ route.dep }}/{{ route.arr }} &nbsp; 正常/正常 &nbsp; S25Q-1C
              </div>
              <br />
              <div>航班计划航路</div>
              <div>{{ route.route }}</div>
              <br />
              <div>航路里程</div>
              <div>{{ route.distance }}</div>
              <br />
              <div>放行时间/计划起飞时间</div>
              <div>..... UTC / ...... UTC</div>
              <br />
              <div>航线重要运行提示</div>
              <div>无/None</div>
              <div>
                ..................................
              </div>
              <div>【配载及燃油信息】</div>
              <div>
                乘客人数/重量
                .......................{{
                  pass_num
                }}/{{ pass_weight }}
              </div>
              <div>
                装载货物类型
                ....................普通货物
              </div>
              <div>
                装载货物总重
                ....................{{
                  load_weight
                }}
              </div>

              <div>
                人货总重..........................
                {{ all_weight }}
              </div>
              <div>
                飞行器重量 ..................
                {{ acft_weight }}
              </div>
              <div>
                零燃油重量 ....................
                {{ zfw_weight }}
              </div>
              <br />
              <div>
                ...........................
              </div>
              <br />
              <div>
                计划添加油量 .......................
                {{ plan_fuel }}
              </div>
              <div>
                实际起飞重量 .......................
                {{ tkof_weight }} / MAX {{ tkof_weight_max }}
              </div>
              <div>
                实际燃油消耗 .......................
                {{ trip_fuel }}
              </div>
              <div>
                备用燃油量
                ..........................
                {{ rev }}
              </div>
              <div>
                实际着陆重量 ......................
                {{ land_weight }} / MAX {{ land_weight_max }}
              </div>
              <div>
                成本指数 .....................
                {{ ci }}
              </div>
              <br />
              <div>备注信息</div>
              <div>无</div>
              <br />
              <div class="r-title">
                =========================================
              </div>
              <div>签派员</div>
              <div>{{personalData[0]}}</div>
              <br />
              <div>备注信息</div>
              <div>航线一切顺畅，飞行愉快~</div>
              <br />
              <div class="r-title">
                ======================================
              </div>
              <div>== 飞行计划单结束 ==</div>
              <br />
            </div>
          </div>
          <div class="report">
            <div class="container">
              <!-- 中文 -->
              <br />
              <div class="r-title">
                SKYLINE FLYLEAGUE - FLIGHT PLAN --- {{ getDate() }} GENERATED
                <br />
                ONLY FOR FLIGHT SIMULATION USE, DO NOT USE IN REAL WORLD
              </div>
              <div class="r-title">
                =============================================
              </div>
              <div>== REPORT START ==</div>
              <div>【DATA INFO】</div>
              <div>ALL WEIGHTS IN {{runit_en}}</div>
              <br />
              <div>AIRCRAFT DATABASE：sky_TE_R3_DATABASE</div>
              <br />
              <div>
                DISPATCH DATABASE：SKYline Database - AIRAC - ICAO -GEN398 -R2
              </div>
              <br />
              <div>APPROVED：TRUE No:A3-124</div>
              <div class="r-title">
                ============================================
              </div>
              <div>【FLIGHT INFO】</div>
              <div>
                FLIGHT NUMBER &nbsp; &nbsp; AIRCRAFT &nbsp; &nbsp; FROM/TO
                &nbsp; &nbsp;&nbsp; &nbsp; ARPT STATUS &nbsp; &nbsp; DISPATCH
                REG
              </div>
              <div>
                {{ route.callsign.toUpperCase() }} &nbsp; {{ form.type }} &nbsp;
                {{ route.dep }}/{{ route.arr }} &nbsp; NORMAL/NORMAL &nbsp;
                S25Q-1C
              </div>
              <br />
              <div>FLIGHT PLAN ROUTE</div>
              <div>{{ route.route }}</div>
              <br />
              <div>DISTANCE</div>
              <div>{{ route.distance }}</div>
              <br />
              <div>OFF BLOCK TIME / TAKE OFF TIME</div>
              <div>..... UTC / ...... UTC</div>
              <br />
              <div>ENROUTE NOTAM</div>
              <div>None</div>
              <div>
                ..........................
              </div>
              <div>【LOAD AHD FUEL】</div>
              <div>
                PASSENGER
                NUM/WEIGHT .............
                {{ pass_num }}/{{ pass_weight }}
              </div>
              <div>
                CARGO TYPE .............
                NORMAL CARGO
              </div>
              <div>
                CARGO WEIGHT
                .............
                {{ load_weight }}
              </div>

              <div>
                TOTAL TRAFFIC WEIGHT .............
                {{ all_weight }}
              </div>
              <div>
                DRY OPERATING WEIGHT
                ............. {{ acft_weight }}
              </div>
              <div>
                ZERO FUEL WEIGHT
                ...............
                {{ zfw_weight }}
              </div>
              <br />
              <div>
                ..................
              </div>
              <br />
              <div>
                BLOCK FUEL
                .............
                {{ plan_fuel }}
              </div>
              <div>
                TAKE OFF FUEL ACTUAL ........
                {{ tkof_weight }} / MAX {{ tkof_weight_max }}
              </div>
              <div>
                TRIP FUEL .............
                {{ trip_fuel }}
              </div>
              <div>
                FINAL RESV
                ..............
                {{ rev }}
              </div>
              <div>
                LANDING FUEL ACTUAL .........
                {{ land_weight }} / MAX {{ land_weight_max }}
              </div>
              <div>
                COST INDEX
                ..........
                {{ ci }}
              </div>
              <br />
              <div>REMAEK</div>
              <div>None</div>
              <br />
              <div class="r-title">
                ================================
              </div>
              <div>DISPATCHER</div>
              <div>{{personalData[0]}}</div>
              <br />
              <div>REMARK</div>
              <div>Wooh! Take off~</div>
              <br />
              <div class="r-title">
                ==============================
              </div>
              <div>== REPORT END ==</div>
              <br />
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
      <div id="d-file">
        <div class="airway-outer">
          <div class="download-items">
            <span class="nane">Aerosoft A320/330</span>
            <el-button class="button" @click="toCompanyRoute('as320')" type="success" round>下载</el-button>
          </div>
          <div class="download-items">
            <span class="nane">PMDG 737/747/777</span>
            <el-button class="button" @click="toCompanyRoute('pmdg')" type="success" round>下载</el-button>
          </div>
          <div class="download-items">
            <span class="nane">QualityWings 787</span>
            <el-button class="button" @click="toCompanyRoute('qw787')" type="success" round>下载</el-button>
          </div>
          <div class="download-items">
            <span class="nane">Toliss 319/321/340</span>
            <el-button class="button" @click="toCompanyRoute('xp11')" type="success" round>下载</el-button>
          </div>
          <div class="download-items">
            <span class="nane">Zibo 738</span>
            <el-button class="button" @click="toCompanyRoute('xp11')" type="success" round>下载</el-button>
          </div>
          <div class="download-items">
            <span class="nane">FlightFactor 320/350</span>
            <el-button class="button" @click="toCompanyRoute('ff320')" type="success" round>下载</el-button>
          </div>
        </div>
      </div>
      <br />
      <el-button @click="iKnow" class="r-button" type="success"
        >知道了\(^o^)/~</el-button
      >
      <br /><br />
    </div>
    
  </div>
</template>

<script>
import { dataDecrypt } from "@/utils/cryptoJS";
import Arpt from "@/assets/icon/arpt.png";
import VOR from "@/assets/icon/vor.png";
import NDB from "@/assets/icon/ndb.png";
import Wpt from "@/assets/icon/wpt.png";
import { downloadFile } from "@/utils/download";
import airplane from "@/assets/airplane.png";
import marker_point from '@/assets/marker-point.png'
import waypoint from '@/assets/waypoint.png'
import vor from '@/assets/vor.png'
import ndb from '@/assets/ndb.png'
import airport from '@/assets/airport.png'
import { getRandomString } from '@/utils/num';
//导入航路图所需内容
export default {
  name: "Enroute",
  data() {
    return {
      personalData:[],
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
      enroute_layer: [],
      user:{
                arpt:[],
                wpt:[],
                awy:[],
                chart:[]
            },
      connectSimlink: "false",
      tiandutu_API_Key: "9a516b0f2a8179bb68f73172cff4bd22",
      wptData: [],
      marker: [],
      polyline: [],
      sidLayer:[],
      starLayer:[],
      latlngs: [],
      zoomlevel: 6,
      border:{_northEast:{lat:50,lng:130},_southWest:{lat:5,lng:70}},
      pilotLayer:[],
      target_map:'jeepesen',
      overlayChart:[],
      userWptLayer:[],
      u_wptLayer:[],
      u_wptNameLayer:[],
      u_arptLayer:[],
      u_awyLayer:[],
      u_awyNameLayer:[],
      depmetar:'暂无数据',
      arrmetar:'暂无数据',
      userTempRoute:'',
      uploadTempRoute:null,
      connectSimlink:'未连接',
      enroute_data: {
        arpt: {},
      },
      form: {
        callsign: "",
        dep: "",
        arr: "",
        type: "",
        ci: "",
        rev: "",
        crz: "",
        unit: "",
        load: "",
        passenger: "",
      },
      routeData: [],
      clickType:'',
      clickLayer:[],
      index_num:'',
      route: {
        callsign: "",
        dep: "",
        arr: "",
        route: "",
        distance: "",
        depname: "",
        arrname: "",
        eachroute: [],
        deplat: "",
        deplng: "",
        arrlat: "",
        arrlng: "",
        filsid:'SID',
        filstar:'STAR',
        oriroute:[],
      },
      simlink: {
        alt: "---",
        gs: "---",
        heading: "---",
        type: "---",
        squawk: "---",
        lat:'---',
        lng:'---'
      },
      unit: "",
      pass_num: "",
      pass_weight: "",
      load_weight: "",
      all_weight: "",
      acft_weight: "",
      zfw_weight: "",
      plan_fuel: "",
      trip_fuel: "",
      tkof_weight: "",
      land_weight: "",
      tkof_weight_max: "",
      land_weight_max: "",
      dep_metar:'',
      arr_metar:'',
      runit:'千克(kg)',
      runit_en:"KILOGRAMS",
      ci: "",
      rev: "",
      perview:{
        runway:[],
        icao:'ICAO',
        ch_type:'undefined',
        type:'',
        selectData:'',
        value:'',
        route_line:[],
      },
      select:{
        ch_type:'undefined',
        type:'',
        runway:[],
        selectvalue:'',
        runwayvalue:'',
        landrunway:'',
        pro:'',
        route:[],
        allData:'',
        layer:[],
        pickData:[],
      },
      colors:['#FF0000','	#FF4500','#FFA500','#FFD700','#32CD32',
      '#40E0D0','#1E90FF','#FF1493','#4169E1','#708090',
      '#3CB371','#DAA520','#D2691E','#FA8072','	#008B8B']
    };
  },
    props:['setWidth','cycle'],
  watch:{
    Enroute:{
      deep:true,
      handler(val){
          for (let i in this.overlayChart){
          this.overlayChart[i].remove()
        }
        this.overlayChart = []
        let data = val
        this.overlayChart.push(
          this.L.imageOverlay(
            `${this.path}/Chart_data/${this.cycle}/JEEP/SKYLINECN/${data.data[0].file_day.replace('.png','.chart_data.json')}?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','').replace(' ','')}`,
            data.border,{
              opacity:0.8,
              alt:'this.overlay.ChartLayer[undefined]'
            }
          )
        )
        this.overlayChart.push(
          this.L.imageOverlay(
              data.logo_type,data.logo
            )
        )
        this.overlayChart.push(
          this.L.imageOverlay(
            data.warning_type,data.warning
          )
        )
        this.e_map.setView(data.center,data.zoom)
        let layergroup = this.L.layerGroup(this.overlayChart)
        this.e_map.addLayer(layergroup)
        //let chartArea = document.querySelectorAll('#enroute .leaflet-overlay-pane > img')[0]
        document.getElementById('overlay').style.display = 'block'
        }
        
      },
      Perview:{
        deep:true,
        handler(val){
          for (let i in this.perview.route_line){
        this.perview.route_line[i].remove()
      }
      this.perview.route_line = []
          this.perview.value = ''
          document.getElementsByClassName('preview')[0].style.display = 'block'
          this.perview.icao = val.icao
          this.perview.type = val.type
          this.$axios.get(`https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/airport/SKYLINECN/${this.perview.icao}.db?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`).then((res)=>{
            let resdata = res.data
            let data = JSON.parse(dataDecrypt(res.data.slice(10,resdata.length)))//把解密的数据转换为json
            let all_runway = data[2]  //跑道数据
            this.perview.runway = []
            for (let i in all_runway){
              this.perview.runway.push({
                "name":`跑道${all_runway[i].runway_identifier.replace('RW','')}`,
                "value":all_runway[i].runway_identifier
              })
            }
            //设置标牌提示信息和函数备用数据
            if (this.perview.type == 'DEP'){
              this.perview.ch_type = '离场'
              this.perview.selectData = data[0]
            }else if (this.perview.type == 'ARR'){
              this.perview.ch_type = '进场'
              this.perview.selectData = data[1]
            }
          })
        }
      },
      u_wptData:{
        deep:true,
        handler(){
          this.loadNavData()
          if (document.querySelector('.report-outer').style.display != 'block'){
            this.initTempRoute()
          }
        }
      },
      u_newAwyData:{
        deep:true,
        handler(){
          this.loadNavData()
        }
      },
      u_arptData:{
        deep:true,
        handler(){
          this.loadNavData()
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
    drawPreview(){
      for (let i in this.perview.route_line){
        this.perview.route_line[i].remove()
      }
      this.perview.route_line = []
      let data = JSON.parse(JSON.stringify(this.perview.selectData))
      //筛选合适的程序
      let filter = []
      for (let i in data){
        for (let j in data[i].runways){
          if (this.perview.value == data[i].runways[j]){
            filter.push(data[i].legs)
          }
        }
      }
      //开始绘制程序线条
      let latlngs = []
      for (let i in filter){
        latlngs = []
        let num = Math.floor(Math.random() * (14 - 0 + 1) ) + 0;
        let color = this.colors[num]
        let d = filter[i]//d就是每一条程序
        let route_name = d[0].identifier
        for (let j in d){
          //每一条程序经过的不同航点部分
          let fix_data = JSON.parse(d[j].geometry).coordinates
          for (let s in fix_data){
            latlngs.push([
              fix_data[s][1],fix_data[s][0]
            ])
          }
        }
        this.perview.route_line.push(
          this.L.polyline(latlngs,{color:color,weight:8,smoothFactor:7}).bindTooltip(route_name,{
            permanent: true,
            className: "preview-tag",
            opacity: 0.7
          })
        )
        
      }
      this.e_map.setView(latlngs[0],this.e_map.getZoom())
      document.getElementsByClassName('leaflet-tile-pane')[0].setAttribute('id','leaflet-preview')
      let layergroup = this.L.layerGroup(this.perview.route_line)
      this.e_map.addLayer(layergroup)
    },
    closePreview(){
      document.getElementsByClassName('preview')[0].style.display = 'none'
      for (let i in this.perview.route_line){
        this.perview.route_line[i].remove()
      }
      document.getElementsByClassName('leaflet-tile-pane')[0].setAttribute('id','')
      this.perview.route_line = []
    },
    changeSelectRwy(){
      this.select.selectvalue = ''
      this.select.route = []
      let runway = this.select.runwayvalue
      for (let p in this.select.allData){
        //p：每一个程序
        for (let r in this.select.allData[p].runways){
          //r：程序使用的跑道
          if (runway == this.select.allData[p].runways[r]){
            let parserou = this.route.route.split(' ')
            if (this.select.ch_type == '离场'){
              if (this.select.allData[p].identifier.slice(0,2) == parserou[0].slice(0,2)){
              //检测推荐跑道
            this.select.route.push({
              "name":this.select.allData[p].identifier,
              "type":'推荐使用',
              "order":1
            })
            }else{
            this.select.route.push({
              "name":this.select.allData[p].identifier,
              "type":'',
              "order":2
            })
            }
            }else{
              if (this.select.allData[p].identifier.slice(0,2) == parserou[parserou.length-2].slice(0,2)){
              //检测推荐跑道
            this.select.route.push({
              "name":this.select.allData[p].identifier,
              "type":'推荐使用',
              "order":1
            })
            }else{
              //检测推荐跑道
            this.select.route.push({
              "name":this.select.allData[p].identifier,
              "type":'',
              "order":2
            })
            }
            this.select.landrunway = this.select.runwayvalue
            }
            continue
          }
        }
      }
      this.select.route.sort(function(a, b){return a.order - b.order});
      
    },
    changeSelectPro(){
      let latlngs = []
      let select = this.select.selectvalue
        
       //绘制图
      for (let i in this.select.allData){
        if (this.select.allData[i].identifier == select){
          
          for (let u in this.select.allData[i].legs){
            let fix_data = JSON.parse(this.select.allData[i].legs[u].geometry).coordinates
          for (let s in fix_data){
             latlngs.push([
              fix_data[s][1],fix_data[s][0]
            ])
          }
          if (this.select.ch_type == '离场'){
            for (let i in this.sidLayer){
              this.sidLayer[i].remove()
           }
            this.sidLayer = []
            this.sidLayer.push(
            this.L.polyline(latlngs,{
              color:'rgb(245,108,108)',
              weight:15,
              opacity:0.5,
              smoothFactor:7
            })
          )
          
          this.route.eachroute[1].name = select
          this.route.filsid = select
          this.e_map.addLayer(this.L.layerGroup(this.sidLayer))
          
          }else if (this.select.ch_type == '进场'){
            for (let i in this.starLayer){
              this.starLayer[i].remove()
            }
            this.starLayer = []
            this.starLayer.push(
            this.L.polyline(latlngs,{
              color:'rgb(245,108,108)',
              weight:15,
              opacity:0.5,
              smoothFactor:7
            })
          )
          let f = this.route.eachroute
          f[f.length-2].name = select
          this.route.filstar = select
           this.e_map.addLayer(this.L.layerGroup(this.starLayer))
          }
          }
          break
        }
      }
    },
    pinAllCharts(){
      this.select.pickData = []
      if (this.route.filsid == 'SID' || this.route.filstar == 'STAR'){
        return this.$message.error('此功能只有选择进离场程序后才可用哦~');
      }
      let sid = this.route.filsid
      let star = this.route.filstar
      let runway = this.select.landrunway.replace('RW','')
      this.$axios.get(`${this.path}/cycle/${this.cycle}/airport/SKYLINECN/${this.route.dep}.db?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`).then((res)=>{
        let resdata = res.data
        let data = JSON.parse(dataDecrypt(res.data.slice(10,resdata.length)))[3].charts
        //遍历该机场航图
        for (let i in data){
          if (data[i].std_visibility == true || data[i].cao_visibility == false){
            if (data[i].procedure_identifier == 'AIRPORT' ||
           data[i].procedure_identifier == 'AIRPORT, AIRPORT INFO, TAKE-OFF MNMS'){
             this.select.pickData.push([data[i],1])
           }else if (data[i].type.section == 'DEP'){
             for (let j in data[i].procedure_code){
               if (sid == data[i].procedure_code[j]){
                 this.select.pickData.push([data[i],2])
                 break
               }
             }
           }
          } 
        }
      })
      this.$axios.get(`${this.path}/cycle/${this.cycle}/airport/SKYLINECN/${this.route.arr}.db?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`).then((res)=>{
        let resdata = res.data
        let data = JSON.parse(dataDecrypt(res.data.slice(10,resdata.length)))[3].charts
        for (let k in data){
          if (data[k].std_visibility == true || data[k].cao_visibility == false){
            if (data[k].procedure_identifier == 'AIRPORT' ||
           data[k].procedure_identifier == 'AIRPORT, AIRPORT INFO, TAKE-OFF MNMS'){
             this.select.pickData.push([data[k],5])
           }else if (data[k].type.section == 'ARR'){
             for (let j in data[k].procedure_code){
               if (star == data[k].procedure_code[j]){
                 this.select.pickData.push([data[k],4]) 
                 break
               }
             }
           }else if (data[k].type.section == 'APP' && data[k].runway[0] == runway){
             //优先匹配ILS
             if (data[k].type.details.indexOf('ILS') != -1){
             if (data[k].type.precision == 'Z'){
               this.select.pickData.push([data[i],3])
               break
             }else if (data[k].type.precision == 'Y'){
               this.select.pickData.push([data[k],3])
               break
             }else if (data[k].type.precision == 'X'){
               this.select.pickData.push([data[k],3])
               break
             }
             }else if (data[k].type.details.indexOf('VOR') != -1){
               this.select.pickData.push([data[k],3])
               break
             }else if (data[k].type.details.indexOf('NDB') != -1){
               this.select.pickData.push([data[k],3])
               break
             }
            }
          } 
        }
      })
      this.enroutePin(this.select.pickData)
      this.getPin(this.select.pickData)
    },
    chartWindow(){
      this.$router.push('/Airport')
        try {
            let adiv = document.querySelectorAll('.b-items')
            for (let i = 0; i < adiv.length; i++){
                adiv[i].style.color = 'aliceblue'
            }
            document.getElementById('b-arpt').style.color = 'skyblue'
            
        } catch (error) {
            
        }
    },
    chartClose(){
      for (let i in this.overlayChart){
          this.overlayChart[i].remove()
        }
        this.overlayChart = []
        document.getElementById('overlay').style.display = 'none'
    },
    chartSet90(){
      document.querySelectorAll('#enroute .leaflet-overlay-pane > img')[0].style.opacity = '0.9'
    },
    chartSet80(){
      document.querySelectorAll('#enroute .leaflet-overlay-pane > img')[0].style.opacity = '0.8'
    },
    chartSet70(){
      document.querySelectorAll('#enroute .leaflet-overlay-pane > img')[0].style.opacity = '0.7'
    },
    parseCoode(_lat, _lng) {
      //把精确到度.小数的坐标转化为精确到度分.小数的坐标
      let lat_data = _lat.split(".");
      let lat_du = lat_data[0];
      let a = (lat_data[1] * 0.00006).toFixed(1) + "";
      let lat_fen = a.split(".")[0];
      let lat_xiao = a.split(".")[1];
      let lng_data = _lng.split(".");
      let lng_du = lng_data[0];
      let b = (lng_data[1] * 0.00006).toFixed(1) + "";
      let lng_fen = b.split(".")[0];
      let lng_xiao = b.split(".")[1];
      return `N${lat_du} ${lat_fen}.${lat_xiao} E${lng_du} ${lng_fen}.${lng_xiao}`;
    },
    getCenter(lat1, lng1, lat2, lng2) {
      let lat = ((parseFloat(lat1) + parseFloat(lat2)) / 2).toFixed(4);
      let lng = ((parseFloat(lng1) + parseFloat(lng2)) / 2).toFixed(4);
      let latlng = [lat, lng];
      //console.log(latlng);
      return latlng;
    },
    getDistance(dep_lat, dep_lng, co_lat, co_lng) {
      let radLat1 = (dep_lat * Math.PI) / 180.0;
      let radLat2 = (co_lat * Math.PI) / 180.0;
      let a = radLat1 - radLat2;
      let b = (dep_lng * Math.PI) / 180.0 - (co_lng * Math.PI) / 180.0;
      var s1 =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s1 = s1 * 6378.137;
      s1 = Math.round(s1 * 10000) / 10000;
      return [parseInt(s1), parseInt(s1 * 0.54)];
    },
    bearing(_lat1, _lng1, _lat2, _lng2) {
      let rad = Math.PI / 180,
        lat1 = _lat1 * rad,
        lat2 = _lat2 * rad,
        lon1 = _lng1 * rad,
        lon2 = _lng2 * rad;
      const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const b =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

      return this.radiansToDegrees(Math.atan2(a, b));
    },
    getComputedHeading(lat1, lng1, lat2, lng2){
      let _heading = this.bearing(lat1, lng1, lat2, lng2);
        if (_heading < 0) {
          _heading += 360
        }
        let heading = _heading + 90;
        if (heading > 180) {
          heading = heading - 180
        }
        if (heading > 180) {
          heading = heading - 180
        }
        if (heading > 180) {
          heading = heading - 180
        }
        //console.log(heading)
        let fixedHeading = heading
        if (heading > 90 && heading < 180) {
          fixedHeading = heading + 180
        }
        if (heading > 180 && heading < 270) {
          fixedHeading = heading - 180
        }
        return fixedHeading
    },
    //弧度转换为角度
    radiansToDegrees(radians) {
      const degrees = radians % (2 * Math.PI);
      return (degrees * 180) / Math.PI;
    },
    awyData(index){
      if (index == 0 || index == this.route.eachroute.length -1){
        return 'view-route'
      }else {
        return `${this.route.eachroute[index-1].name}-${this.route.eachroute[index+1].name}`
      }
    },
    getIcon(t) {
      switch (t) {
        case "arpt":
          return "el-icon-position";
          break;
        case "sid":
          return "el-icon-price-tag";
          break;
        case "wpt":
          return "el-icon-place";
          break;
        case "dct":
          return "el-icon-video-play";
          break;
        case "awy":
          return "el-icon-share";
          break;
        case "vor":
          return "el-icon-aim";
          break;
        case "ndb":
          return "el-icon-aim";
          break;
        case "star":
          return "el-icon-price-tag";
          break;
        default:
          return "el-icon-place";
          break;
      }
    },
    getRandom(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getType(p){
      if (p.length == 4 && p != "STAR" && !new RegExp("[0-9]").test(p)) {
              return 'arpt'
            } else if (p.length == 5 && !new RegExp("[0-9]").test(p)) {
              return 'wpt'
            } else if (
              p.length == 3 &&
              p != "DCT" &&
              p != "SID" &&
              !new RegExp("[0-9]").test(p)
            ) {
              return 'vor'
            } else if (p == "DCT") {
              return 'dct'
            } else if (p == "SID") {
              return 'sid'
            } else if (p == "STAR") {
              return 'star'
            } else if (p.length == "2" && !new RegExp("[0-9]").test(p)) {
              return 'ndb'
            }else if (p.split('')[0] == 'P'){
              return 'wpt'
            } else {
              return 'awy'
            }
    },
    getDate() {
      let d = new Date();
      let y = d.getFullYear();
      let m = parseInt(d.getMonth()) + 1;
      let day = d.getDate();
      let h = d.getHours();
      let mi = d.getMinutes();
      let s = d.getSeconds();
      return `${y}-${m}-${day} ${h}:${mi}:${s}`;
    },
    initEnrouteMap() {
       const e_map = this.L.map("enroute", {
        minZoom: 5,
        maxZoom: 10,
        center: [29.550339, 100.114129],
        zoom: 6,
        zoomControl:true,
      });
      this.e_map = e_map;
      let that = this;
      if (localStorage.getItem('mapZoom')!= null && localStorage.getItem('mapCenter')!=null){
        let latlng = localStorage.getItem('mapCenter').replace(')','').replace(' ','').replace('LatLng(','').split(',')
        this.e_map.setView([latlng[0],latlng[1]],localStorage.getItem('mapZoom'))
      }
      this.e_map.on("click", function () {
        try {
          document.getElementById("r-main").style.display = "none";
          document.getElementsByClassName("detail")[0].style.display = "none";
          document.querySelector('.personal-card').style.display = 'none'
        } catch (error) {
          
        }
      for (let i in that.clickLayer){
        that.clickLayer[i].remove()
      }
      that.clickLayer = []
      });
      this.e_map.on("zoom", function () {
        that.zoomlevel = that.e_map.getZoom();
        localStorage.setItem('mapZoom',that.e_map.getZoom())
        localStorage.setItem('mapCenter',that.e_map.getCenter())
        that.e_map.invalidateSize(true)
        that.loadNavData()
      });
      this.e_map.on("drag", function () {
        localStorage.setItem('mapZoom',that.e_map.getZoom())
        localStorage.setItem('mapCenter',that.e_map.getCenter())
        that.e_map.invalidateSize(true)
      });
      this.zoomlevel = this.e_map.getZoom()
      this.loadEnrouteMap();
    },
    loadEnrouteMap() {
      // if (localStorage.getItem('map') == null || localStorage.getItem('map') == 'aip'){
      //   this.L.tileLayer(`https://enroute.charts.api.navigraph.com/${this.cycleId}/hd-1x/{z}/{x}/{y}.png`,{tms:true}).addTo(this.e_map)
      // }
      if (localStorage.getItem('map') == null || localStorage.getItem('map') == 'aip'){
        this.map_layer = this.L.tileLayer(
        `https://api.skylineflyleague.cn/EFBData/Tile_Map/AIP_Default_Layer/${this.cycle}_All_Enroute/{z}/{x}/{y}.png?Access_Token=${this.Access_Token.replace(' ','')}`,{
        }
      ).addTo(this.e_map);
      this.e_map.setMaxBounds([
        [65.5, 50.5],
        [0, 145.5],
      ]);
      }
      else if (localStorage.getItem('map') == 'vfr'){
        this.map_layer = this.L.tileLayer(
        //`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,
        `https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`,
      ).addTo(this.e_map);
      }
    },
    loadNavData(){
      //清除历史遗留信息
      for (let i in this.u_arptLayer){
        this.u_arptLayer[i].remove()
      }
      this.u_arptLayer = []
      for (let i in this.u_wptLayer){
        this.u_wptLayer[i].remove()
      }
      this.u_wptLayer = []
      for (let i in this.u_wptNameLayer){
        this.u_wptNameLayer[i].remove()
      }
      this.u_wptNameLayer = []
      for (let i in this.u_awyLayer){
        this.u_awyLayer[i].remove()
      }
      this.u_awyLayer = []
      for (let i in this.u_awyNameLayer){
        this.u_awyNameLayer[i].remove()
      }
      this.u_awyNameLayer = []
      //添加自定义航点
      const wptIcon = this.L.icon({
        iconUrl:waypoint,
        iconSize:[8,8],
        iconAnchor:[4,4]
      })
      const vorIcon  = this.L.icon({
        iconUrl:vor,
        iconSize:[14,14],
        iconAnchor:[7,7]
      })
      const ndbIcon  = this.L.icon({
        iconUrl:ndb,
        iconSize:[14,14],
        iconAnchor:[7,7]
      })
      const arptIcon = this.L.icon({
        iconUrl:airport,
        iconSize:[24,24],
        iconAnchor:[12,12]
      })
        //根据缩放等级和坐标调整适时添加进的marker
        //机场图标分情况加载
        let zl = this.zoomlevel
        for (let i in this.u_arptData){
            this.u_arptLayer.push(
            this.L.marker([this.u_arptData[i].lat,this.u_arptData[i].lng],{icon:arptIcon}),
          )
          if (zl > 5){
            const arptNameIcon = this.L.divIcon({
            html:`${this.u_arptData[i].name}<br>${this.u_arptData[i].ICAO}`,
            className:'arptName'
          })
            this.u_arptLayer.push(
            this.L.marker([this.u_arptData[i].lat,this.u_arptData[i].lng],{icon:arptNameIcon})
          )
          }
        }
        //分批加载航点图标
        if (zl > 5){
          for (let i in this.u_wptData){
              //判断类型
          if (this.u_wptData[i].name.length ==  3 && !new RegExp("[0-9]").test(this.u_wptData[i].name)){
            //是VOR
            this.u_wptLayer.push(
            this.L.marker([this.u_wptData[i].lat,this.u_wptData[i].lng],{icon:vorIcon}),
          )
          }else if (this.u_wptData[i].name.length ==  2 && !new RegExp("[0-9]").test(this.u_wptData[i].name)){
            //是NDB
            this.u_wptLayer.push(
            this.L.marker([this.u_wptData[i].lat,this.u_wptData[i].lng],{icon:ndbIcon}),
          )
          }else {
            this.u_wptLayer.push(
            this.L.marker([this.u_wptData[i].lat,this.u_wptData[i].lng],{icon:wptIcon}),
          )
          }
            if (zl > 6){
              const wptNameIcon = this.L.divIcon({
            html:`${this.u_wptData[i].name}`,
            className:'wptName'
          })
          this.u_wptNameLayer.push((
            this.L.marker([this.u_wptData[i].lat,this.u_wptData[i].lng],{icon:wptNameIcon})
          ))
            }
        }
        //分批加载航线的线段和文字
        //添加航路信息
        if (zl >= 6){
          let latlngs = []
        for (let i = 0; i < this.u_newAwyData.length; i++){
          if (i+1 != this.u_newAwyData.length){
            let a = this.u_newAwyData[i]
            let b = this.u_newAwyData[i+1]
            
            if (a.name == b.name){
              if (zl > 7){
              const awyNameIcon = this.L.divIcon({
                html:`${a.name}`,
                className:'awyName'
              })
              this.u_awyNameLayer.push(this.L.marker(this.getCenter(a.lat,a.lng,b.lat,b.lng),{
                icon:awyNameIcon,
                rotationAngle:this.getComputedHeading(a.lat,a.lng,b.lat,b.lng)
              }))
            }
              latlngs.push([a.lat,a.lng])
            }else{
              latlngs.push([a.lat,a.lng])
              this.u_awyLayer.push(this.L.polyline(latlngs,{
                color:'rgb(36,73,117)',
                weight:1.8
              }))
              latlngs = []
            }
          }else{
            //最后一个航点
            let a = this.u_newAwyData[i]
            latlngs.push([a.lat,a.lng])
            this.u_awyLayer.push(this.L.polyline(latlngs,{
                color:'rgb(36,73,117)',
                weight:1.8
              }))
          }
        }
        }
        
        }
        try {
          this.e_map.addLayer(this.L.layerGroup(this.u_arptLayer))
      this.e_map.addLayer(this.L.layerGroup(this.u_wptLayer))
      this.e_map.addLayer(this.L.layerGroup(this.u_wptNameLayer))
      this.e_map.addLayer(this.L.layerGroup(this.u_awyLayer))
      this.e_map.addLayer(this.L.layerGroup(this.u_awyNameLayer))
        } catch (error) {
          
        }
      
    },
    
    showResult() {
      document.getElementById("sub").innerHTML = "数据查询中，请稍后 ... ";
      document.getElementById("sub").style.cursor = "not-allowed";
      if (
        this.form.callsign == "" ||
        this.form.dep == "" ||
        this.form.arr == "" ||
        this.form.type == "" ||
        this.form.unit == ""
      ) {
        this.$message.error('您输入的信息不完整，请注意带*的为必填项');
        document.getElementById("sub").innerHTML =
          "一键生成航路、燃油、气象数据 ... ";
        document.getElementById("sub").style.cursor = "pointer";
      } else {
        this.getRoute('from');
        setTimeout(() => {
          document.getElementById("r-main").style.display = "none";
          document.getElementById("sub").innerHTML =
            "一键生成航路、燃油、气象数据 ... ";
          document.getElementById("sub").style.cursor = "pointer";
          document.getElementsByClassName("report-outer")[0].style.display =
            "block";
          //document.getElementById('r-report').style.display = 'block'
        }, 2500);
      }
    },
    getRoute(gettype) {
      if (gettype == 'from'){
        if (this.userTempRoute == ''){
        this.$axios.post(`https://api.skylineflyleague.cn/route/searchRoute/route?token=${getRandomString(24)}`, {
          dep: this.form.dep.toUpperCase() + "",
          arr: this.form.arr.toUpperCase() + "",
        })
        .then((res) => {
          if (res.data.route == null){
            return this.$message({
                    type: 'error',
                    message: '航路查询失败！'
                  }); 
          }
          this.uploadTempRoute = res.data
          this.uploadRoute()
        }).catch(()=>{
          this.$message({
            type: 'error',
            message: '航路查询失败！'
          }); 
        })
      
      }else{
        if (this.userTempRoute.indexOf(' DCT ') != -1 || this.userTempRoute.indexOf(' dct ') != -1){
          return this.$message({
            type:'error',
            message:'暂不支持含有DCT的航路'
          })
        }else{
          this.parseTempRoute()
        }
      }
      }
      
    },
    parseTempRoute(){
      //this.$axios.post(`http://localhost:8021/route/parseRoute?token=${getRandomString(24)}`,{
      this.$axios.post(`https://api.skylineflyleague.cn/route/parseRoute?token=${getRandomString(24)}`,{
            data:{
                    route:this.userTempRoute.toUpperCase(),
                    self_awy:JSON.stringify(this.u_newAwyData),
                    self_arpt:JSON.stringify(this.u_arptData),
                    dep: this.form.dep.toUpperCase() + "",
                    arr: this.form.arr.toUpperCase() + "",
                },
          }).then((res)=>{
            if (JSON.parse(res.data.route).nodeinformation.length > 100){
              return this.$message({
                type:'error',
                message:'出现了亿些小小的问题~，使用此选项最好配合自定义数据哦~'
              })
            }
            this.uploadTempRoute = res.data
            this.uploadRoute()
            this.userTempRoute = ''
          })
    },
    initTempRoute(){
      if (this.personalData[10] != 'true') return 
        this.$axios.get(`https://api.skylineflyleague.cn/efb/data/user_main_data/tempdata/${this.personalData[0]}?token=${getRandomString(24)}`).then((res)=>{
          this.form = JSON.parse(res.data.form)
          try {
             document.getElementsByClassName("report-outer")[0].style.display ="block";
          } catch (error) {
          }
          this.parseRoute(JSON.parse(res.data.route))
        })
    },
    uploadRoute(){
      this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/temproute.php?username=${this.personalData[0]}&token=${getRandomString(24)}`,{'route':JSON.stringify(this.uploadTempRoute),'form':JSON.stringify(this.form)}).then(
      ).then((res)=>{
        if (res.data.code != '1000'){
          return this.$message({
            'type':'error',
            'message':'航路数据保存失败！'
          })
        }
      })
      this.parseRoute(this.uploadTempRoute)
    },
    parseRoute(res){
      let resdata = JSON.parse(res.route);
      //传过来的res一定是和py生成的数据一致，解析res.route后一定为主航路信息
          this.route.callsign = this.form.callsign.toUpperCase();
          this.route.distance = (parseInt(resdata.distance) * 0.54).toFixed(1);
          this.route.dep = this.form.dep.toUpperCase();
          this.route.arr = this.form.arr.toUpperCase();
          this.route.route = resdata.route
            .replace(` STAR ${this.route.arr}`, "")
            .replace(`${this.route.dep} SID `, "")
            .replace("HUR W64 ", "");
          this.route.arrname = resdata.airportName[1];
          this.route.depname = resdata.airportName[0];
          let d = resdata.nodeinformation;
          this.route.deplat = d[0][1];
          this.route.arrlat = d[d.length - 1][1];
          this.route.deplng = d[0][2];
          this.route.arrlng = d[d.length - 1][2];
          //分部输出航点信息
          this.routeData = [];
          for (let i = 0; i < d.length; i++) {
            this.routeData.push({
              name: d[i][0],
              lat: d[i][1],
              lng: d[i][2],
            });
          }
          //输出不同类型的点
          this.route.eachroute = [];
          this.route.oriroute = [];
          let processRoute = resdata.route.trim().replace("HUR W64 ", "").split(" ");
          for (let i = 0; i < processRoute.length; i++) {
            let p = processRoute[i];
            // {"name":"ZYMD","type":"arpt"}
            if (p.length == 4 && p != "STAR" && !new RegExp("[0-9]").test(p)) {
              //四位数，是机场
              this.route.oriroute.push({ name: p, type: "arpt" });
            } else if (p.length == 5 && !new RegExp("[0-9]").test(p)) {
              //是航路点
              this.route.oriroute.push({ name: p, type: "wpt" });
            } else if (
              p.length == 3 &&
              p != "DCT" &&
              p != "SID" &&
              !new RegExp("[0-9]").test(p)
            ) {
              //是VOR
              this.route.oriroute.push({ name: p, type: "vor" });
            } else if (p == "DCT") {
              //是航路点
              this.route.oriroute.push({ name: p, type: "dct" });
            } else if (p == "SID") {
              //是离场
              this.route.oriroute.push({ name: p, type: "sid" });
            } else if (p == "STAR") {
              //是进场
              this.route.oriroute.push({ name: p, type: "star" });
            } else if (p.length == "2" && !new RegExp("[0-9]").test(p)) {
              //是NDB
              this.route.oriroute.push({ name: p, type: "vor" });
            } else if (p.split('')[0] == 'P' && new RegExp("[0-9]").test(p.split('')[p.split('').length -1])) {
              //是P点
              this.route.oriroute.push({ name: p, type: "wpt" });
            } else {
              this.route.oriroute.push({ name: p, type: "awy" });
            }
          }
          
          //处理航路信息
          for (let i = 0; i < this.route.oriroute.length; i++){
            if (this.route.oriroute[i].type != 'awy'){
              this.route.eachroute.push(this.route.oriroute[i])
            }else{
              let prev = this.route.oriroute[i-1].name
              let next = this.route.oriroute[i+1].name
              let prev_num = 0
              let next_num = 0
              for (let j = 0; j < this.routeData.length; j++){
                if (prev == this.routeData[j].name){
                  prev_num = j
                  continue
                }else if (next == this.routeData[j].name){
                  next_num = j
                  continue
                }
              }
              for (let k = prev_num+1; k < next_num ; k++){
                this.route.eachroute.push({
                  "name":this.route.oriroute[i].name,
                  "type":"awy"
                },{
                  "name":this.routeData[k].name,
                  "type":this.getType(this.routeData[k].name)
                }
                )
              }
              this.route.eachroute.push({
                  "name":this.route.oriroute[i].name,
                  "type":"awy"
                }
              )
            }
          }
          //添加每一个航点的layergroup
          this.wptData = [];
          for (let i = 0; i < resdata.nodeinformation.length; i++) {
            let d = resdata.nodeinformation[i];
            if (d[0].length == "4" && !new RegExp("[0-9]").test(d[0])) {
              this.wptData.push({
                name: d[0],
                type: "arpt",
                lat: d[1],
                lng: d[2],
              });
            } else if (d[0].length == "3" && !new RegExp("[0-9]").test(d[0])) {
              this.wptData.push({
                name: d[0],
                type: "vor",
                lat: d[1],
                lng: d[2],
              });
            } else if (d[0].length == "2" && !new RegExp("[0-9]").test(d[0])) {
              this.wptData.push({
                name: d[0],
                type: "ndb",
                lat: d[1],
                lng: d[2],
              });
            } else {
              this.wptData.push({
                name: d[0],
                type: "wpt",
                lat: d[1],
                lng: d[2],
              });
            }
          }
          this.route.filsid = 'SID'
          this.route.filstar = 'STAR'
          //绘制data
          this.drawRouteData();
          this.getAcftData();
          //end axios
    },
    drawRouteData() {
      for (let i in this.marker) {
        this.marker[i].remove();
      }
      for (let i in this.polyline) {
        this.polyline[i].remove();
      }
      for (let i in this.clickLayer){
        this.clickLayer[i].remove()
      }
      for (let i in this.sidLayer){
        this.sidLayer[i].remove()
      }
      for (let i in this.starLayer){
        this.starLayer[i].remove()
      }
      this.clickLayer = []
      this.marker = [];
      this.polyline = [];
      this.latlngs = [];
      this.sidLayer = []
      this.starLayer = []
      const ArptIcon = L.icon({
        iconUrl: Arpt,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const WptIcon = L.icon({
        iconUrl: Wpt,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const VORIcon = L.icon({
        iconUrl: VOR,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const NDBIcon = L.icon({
        iconUrl: NDB,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      //绘制航路航点
      for (let i = 0; i < this.wptData.length; i++) {
        let d = this.wptData[i];
        const icon = this.L.divIcon({
            html:` ${d.name} `,
            className:'enrouteIcon'
          })
        //添加marker
        if (d.type == "arpt") {
            this.marker.push(
              this.L.marker([d.lat, d.lng], { icon: ArptIcon, opacity: 0.5 })
            );
        } else if (d.type == "vor") {
          this.marker.push(
            this.L.marker([d.lat, d.lng], { icon: VORIcon, opacity: 0.5 }),
            this.L.marker([d.lat, d.lng], { icon: icon, opacity: 0.6 })
          );
        } else if (d.type == "ndb") {
          this.marker.push(
            this.L.marker([d.lat, d.lng], { icon: NDBIcon, opacity: 0.5 }),
            this.L.marker([d.lat, d.lng], { icon: icon, opacity: 0.6 })
          );
        } else if (d.type == "wpt") {
          
            this.marker.push(
              this.L.marker([d.lat, d.lng], { icon: WptIcon, opacity: 0.5 }),
              this.L.marker([d.lat, d.lng], { icon: icon, opacity: 0.6 })
            );
        }
      }
      for (let i = 1; i < this.wptData.length-1; i++){
        let d = this.wptData[i];
        //添加polyline
        this.latlngs.push([d.lat, d.lng]);
      }
        this.polyline.push(
          this.L.polyline(this.latlngs, {
            color: "rgb(26,213,254)",
            opacity: 0.5,
            weight: 15,
          })
        );
      this.sidLayer.push(this.L.polyline([
        [this.wptData[0].lat,this.wptData[0].lng],
        [this.wptData[1].lat,this.wptData[1].lng]
      ],{
        color:'rgb(245,108,108)',
        opacity:0.5,
        weight:15
      })   
      )
      this.starLayer.push(this.L.polyline([
        [this.wptData[this.wptData.length-2].lat,this.wptData[this.wptData.length-2].lng],
        [this.wptData[this.wptData.length-1].lat,this.wptData[this.wptData.length-1].lng]
      ],{
        color:'rgb(245,108,108)',
        opacity:0.5,
        weight:15
      })   
      )

      let markergroup = this.L.layerGroup(this.marker);
      let polylinegroup = this.L.layerGroup(this.polyline);
      this.e_map.addLayer(markergroup);
      this.e_map.addLayer(polylinegroup);
      this.e_map.addLayer(this.L.layerGroup(this.sidLayer))
      this.e_map.addLayer(this.L.layerGroup(this.starLayer))
    },
    getCycleData() {
      this.$axios
        .get(
          `https://api.skylineflyleague.cn/EFBData/cycle/available.json?${new Date().getTime()}`
        )
        .then((res) => {
          let cycle = res.data.Available_AIRAC_Cycle;
          this.cycle = cycle;
          this.path = res.data.path
          this.cycleId = res.data.cycleId
          this.initEnrouteMap(cycle);
          if (
        localStorage.getItem("cycle") == null ||
        localStorage.getItem("cycle") != this.cycle
      ) {
        this.$notify({
          title: "数据更新说明",
          message: `EFB系统导航数据已更新至${this.cycle}期！导航数据只可用于模拟飞行，切勿在真实飞行中使用`,
          type: "warning",
          duration: 0,
        });
      }
      localStorage.setItem("cycle", this.cycle);
        });
    },
    getAcftData() {
      //计算油量和配载信息
      this.$axios
        .get(
          `https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/Aircraft/Aircraft.db?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`
        )
        .then((res) => {
          let resdata = JSON.parse(dataDecrypt(res.data));
          for (let i = 0; i < resdata.length; i++) {
            if (this.form.type == resdata[i].type) {
              let d = resdata[i];
              //乘客信息
              if (this.form.passenger == "") {
                this.pass_num = this.getRandom(130, 40);
                this.pass_weight = parseInt(this.pass_num) * 65;
              } else {
                this.pass_num = parseInt(this.form.passenger);
                this.pass_weight = parseInt(this.pass_num) * 60;
              }
              //配载信息
              if (this.form.load == "") {
                this.load_weight = this.getRandom(d.load[0], d.load[1]);
              } else if (this.form.load > d.load[1]) {
                //输入值超过最大配载
                this.load_weight = d.load[1];
              }else {
                this.load_weight = (parseFloat(this.form.load)*1000).toFixed(1)
              }
              this.all_weight = this.pass_weight + parseInt(this.load_weight);
              this.acft_weight = d.weight;
              this.zfw_weight = parseInt(this.acft_weight) + this.all_weight;
              if (this.form.ci == "") {
                this.ci = this.getRandom(70, 40);
              } else {
                if (this.form.ci < 20){
                  this.ci = 20
                }else if (this.form.ci > 100){
                  this.ci = 100
                }else {
                   this.ci = this.form.ci;
                }
               
              }
              //燃油信息
              let init_fuel = parseInt(
                parseFloat(d.init) +
                  parseFloat(d.each) * parseFloat(this.route.distance)
              );
              let cn_c = this.ci - 50
              if (cn_c < 0){
                init_fuel = parseInt(init_fuel - ((-cn_c)*2) )
              }else{
                init_fuel = parseInt(init_fuel + (cn_c)*2)
              }
              init_fuel = init_fuel - 300
              if (this.form.rev == "") {
                let time = this.getRandom(90, 40);
                this.rev = parseInt((time / 2) * 98.33);
              } else {
                if (this.form.rev > 100){
                  this.rev = (100 / 2) * 98.33;
                }else {
                  this.rev = (parseInt(this.form.rev) / 2) * 98.33;
                }
                
              }
              this.plan_fuel = init_fuel;
              this.trip_fuel = init_fuel - parseInt(this.rev);
              this.tkof_weight =
                parseInt(this.zfw_weight) + parseInt(init_fuel);
              this.land_weight =
                parseInt(this.tkof_weight) - parseInt(this.trip_fuel);
              this.tkof_weight_max = d.maxtk;
              this.land_weight_max = d.maxld;
              
            }
          }
          if (this.form.unit == "lib") {
            //算出来的kg转lib
            let arr = [
              this.pass_weight,
              this.load_weight,
              this.all_weight,
              this.acft_weight,
              this.zfw_weight,
              this.plan_fuel,
              this.trip_fuel,
              this.rev,
              this.tkof_weight,
              this.land_weight,
              this.tkof_weight_max,
              this.land_weight_max,
            ];
            let v = this.kgToLib(arr);
            this.pass_weight = v[0];
            this.load_weight = v[1];
            this.all_weight = v[2];
            this.acft_weight = v[3];
            this.zfw_weight = v[4];
            this.plan_fuel = v[5];
            this.trip_fuel = v[6];
            this.rev = v[7];
            this.tkof_weight = v[8];
            this.land_weight = v[9];
            this.tkof_weight_max = v[10];
            this.land_weight_max = v[11];
          }
        });
    },
    kgToLib(arr) {
      this.runit = '磅(Lbs)'
      this.runit_en = 'POUNDS'
      let result = []; //创建空数组保存转换后的数据
      for (let i = 0; i < arr.length; i++) {
        let d = parseInt(arr[i]) * 2.2;
        result.push(parseInt(d));
      }
      return result;
    },
    showForm() {
      document.getElementById("r-main").style.display = "block";
    },
    changeDisplay() {
      let button = document.getElementById("r-change");
      let main = document.getElementById("r-info");
      let route = document.querySelector('.route-info')
      if (main.style.display != "none") {
        main.style.display = "none";
        route.style.display = 'none'
        button.innerHTML = `<i class="el-icon-arrow-down"></i>`;
        document.querySelector('.report-outer').style.height = '55px'
      } else {
        main.style.display = "block";
        route.style.display = 'block'
        button.innerHTML = `<i class="el-icon-arrow-up"></i>`;
        document.querySelector('.report-outer').style.height = '98.85%'
      }
    },
    iKnow() {
      document.getElementsByClassName("detail")[0].style.display = "none";
    },
    d_route() {
      document.getElementsByClassName("detail")[0].style.display = "block";
      document.getElementById("d-route").style.display = "block";
      document.getElementById("d-weather").style.display = "none";
      document.getElementById("d-report").style.display = "none";
      document.getElementById("d-file").style.display = "none";
    },
    d_weather() {
      document.getElementsByClassName("detail")[0].style.display = "block";
      document.getElementById("d-route").style.display = "none";
      document.getElementById("d-weather").style.display = "block";
      document.getElementById("d-report").style.display = "none";
      document.getElementById("d-file").style.display = "none";
    },
    d_report() {
      document.getElementsByClassName("detail")[0].style.display = "block";
      document.getElementById("d-route").style.display = "none";
      document.getElementById("d-weather").style.display = "none";
      document.getElementById("d-report").style.display = "block";
      document.getElementById("d-file").style.display = "none";
    },
    d_file() {
      document.getElementsByClassName("detail")[0].style.display = "block";
      document.getElementById("d-route").style.display = "none";
      document.getElementById("d-weather").style.display = "none";
      document.getElementById("d-report").style.display = "none";
      document.getElementById("d-file").style.display = "block";
    },
    d_unload() {
      let flag = false
       this.$confirm('确认取消当前飞行计划', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '手滑了',
          type: 'warning'
        }).then(() => {
          flag = true
          document.getElementsByClassName("detail")[0].style.display = "none";
      document.getElementById("d-route").style.display = "none";
      document.getElementById("d-weather").style.display = "none";
      document.getElementById("d-report").style.display = "none";
      document.getElementById("d-file").style.display = "none";
      document.getElementsByClassName('report-outer')[0].style.display = 'none'
      for (let i in this.marker) {
        this.marker[i].remove();
      }
      for (let i in this.polyline) {
        this.polyline[i].remove();
      }
      for (let i in this.clickLayer){
        this.clickLayer[i].remove()
      }
      for (let i in this.sidLayer){
        this.sidLayer[i].remove()
      }
      for (let i in this.starLayer){
        this.starLayer[i].remove()
      }
      this.clickLayer = []
      this.marker = [];
      this.polyline = [];
      this.latlngs = [];
      this.sidLayer = []
      this.starLayer = []
      if (flag){
        this.unloadTemp()
      }
      this.$message({
            type: 'success',
            message: '已取消计划'
          });  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    unloadTemp(){
      this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/unload.php?username=${this.personalData[0]}`).then((res)=>{
        if (res.data.code != '1000'){
          return this.$message({
            type: 'error',
            message: '貌似有些东西出错了~'
          });
        }
      })
    },
    trackSimlinkPlane() {
      const Icon = L.icon({
        iconUrl: airplane,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      });
      
      let that = this;
      setInterval(() => {
        let pilot = this.personalData[0]
        if (localStorage.getItem("showFlightLink") == "true") {
          that.$axios
            .get("https://map.skylineflyleague.cn/api/online.php")
            .then((res) => {
              for (let i in this.pilotLayer) {
                this.pilotLayer[i].remove();
              }
              let latlng = [];
              this.pilotLayer = [];
              let whazzupData = res.data.split("\n");
              let flag = false
              for (let i in whazzupData) {
                let pilotData = whazzupData[i].split(":");
                if (pilot == pilotData[1] && pilotData[3] == "PILOT") {
                  flag = true
                  this.connectSimlink = '执飞中'
                  this.simlink.alt = pilotData[7]
                  this.simlink.gs = pilotData[8]
                  this.simlink.heading = pilotData[10]
                  this.simlink.squawk = pilotData[15]
                  this.simlink.type = pilotData[9]
                  this.simlink.lat = parseFloat(pilotData[5]).toFixed(2)
                  this.simlink.lng = parseFloat(pilotData[6]).toFixed(2)
                  latlng = [pilotData[5], pilotData[6]];
                  if (parseFloat(pilotData[5])>5 && parseFloat(pilotData[5])<57 && parseFloat(pilotData[6])>70 && parseFloat(pilotData[6])<138){
                    this.pilotLayer.push(
                    this.L.marker([pilotData[5], pilotData[6]], {
                      icon: Icon,
                      rotationAngle: pilotData[10],
                    })
                  );          
                  }
                }
              }
              if (!flag){
                this.connectSimlink = '未连接'
                this.alt = "---"
                this.gs = "---"
                this.heading = "---"
                this.type = "---"
                this.squawk = "---"
                this.lat = '---'
                this.lng = '---'
              }
              let marker_layergroup = this.L.layerGroup(this.pilotLayer);
              this.e_map.addLayer(marker_layergroup);
            });
        } else  {
          for (let i in this.pilotLayer) {
                this.pilotLayer[i].remove();
              }
              this.pilotLayer = [];
            for (let i in this.other_pilotLayer) {
                this.other_pilotLayer[i].remove();
              }
              this.other_pilotLayer = [];
        }
      }, 3200);
    },
    showWptDetail(p1){
      let p = p1.getAttribute('route')
      for (let i in this.clickLayer){
        this.clickLayer[i].remove()
      }
      this.clickLayer = []
      const pointIcon = this.L.icon({
        iconUrl:marker_point,
        iconSize:[32,53],
        iconAnchor:[16,50]
      })
      if (p.length == 4 && p != 'STAR' && !new RegExp("[0-9]").test(p)){
        this.clickType = '机场'
        for (let i in this.routeData){
          if (p == this.routeData[i].name){
            let d = this.routeData[i]
            let latlngs = [d.lat,d.lng]
            this.e_map.flyTo(latlngs)
            this.clickLayer.push(
              this.L.marker(latlngs,{
                icon:pointIcon
              })
            )
            break
          }
        }
      }else if (p.length == 3 && p!= 'SID' && p!= 'DCT' && !new RegExp("[0-9]").test(p)){
        this.clickType = 'VOR'
        for (let i in this.routeData){
          if (p == this.routeData[i].name){
            let d = this.routeData[i]
            let latlngs = [d.lat,d.lng]
            this.e_map.flyTo(latlngs)
            this.clickLayer.push(
              this.L.marker(latlngs,{
                icon:pointIcon
              })
            )
            break
          }
        }
      }else if (p.length == 5 || p.length == 2 && !new RegExp("[0-9]").test(p)){
        switch (p.length) {
          case 5:
            this.clickType = '航路点'
            break;
          case 2:
            this.clickType = 'NDB'
            break;
          default:
            this.clickType = 'undefined'
            break;
        }
        for (let i in this.routeData){
          if (p == this.routeData[i].name){
            let d = this.routeData[i]
            let latlngs = [d.lat,d.lng]
            this.e_map.flyTo(latlngs)
            this.clickLayer.push(
              this.L.marker(latlngs,{
                icon:pointIcon
              })
            )
            break
          }
        }
      }else if (p.split('')[0] == 'P' && new RegExp("[0-9]").test(p.split('')[p.split('').length -1])){
          for (let i in this.routeData){
          if (p == this.routeData[i].name){
            let d = this.routeData[i]
            let latlngs = [d.lat,d.lng]
            this.e_map.flyTo(latlngs)
            this.clickLayer.push(
              this.L.marker(latlngs,{
                icon:pointIcon
              })
            )
            break
          }
        }
        }else  if (p == this.route.filsid){
        this.select.runwayvalue = ''
        this.select.runway = []
        this.select.route = []
        this.select.selectvalue = ''
        //离场
        document.getElementsByClassName('select')[0].style.display = 'block'
        this.select.ch_type = '离场'
        this.select.icao = this.route.dep
        //添加data和跑道数据
        for (let i in this.sidLayer){
          this.sidLayer[i].remove()
        }
        this.$axios.get(`https://api.skylineflyleague.cn/efb_api/&&Access_Token=${this.Access_Token.replace(' ','')}`).then((res)=>{
          let resdata = res.data
          let data = JSON.parse(dataDecrypt(res.data.slice(10,resdata.length)))
          let all_runway = data[2]
          this.select.runway = []
          for (let i in all_runway){
            this.select.runway.push({
              "name":`跑道${all_runway[i].runway_identifier.replace('RW','')}`,
                "value":all_runway[i].runway_identifier
            }
            )
          }
          this.select.allData = data[0]
        })
      }else if (p == this.route.filstar){
        this.select.runwayvalue = ''
        this.select.runway = []
        this.select.route = []
        this.select.selectvalue = ''
        //离场
        document.getElementsByClassName('select')[0].style.display = 'block'
        this.select.ch_type = '进场'
        this.select.icao = this.route.arr
        //添加data和跑道数据
        this.$axios.get(`https://api.skylineflyleague.cn/EFBData/cycle/${this.cycle}/airport/SKYLINECN/${this.select.icao}.db?cycle=${this.cycle}&&Access_Token=${this.Access_Token.replace(' ','')}`).then((res)=>{
          let resdata = res.data
          let data = JSON.parse(dataDecrypt(res.data.slice(10,resdata.length)))
          let all_runway = data[2]
          this.select.runway = []
          for (let i in all_runway){
            this.select.runway.push({
              "name":`跑道${all_runway[i].runway_identifier.replace('RW','')}`,
                "value":all_runway[i].runway_identifier
            }
            )
          }
          this.select.allData = data[1]
        })
      }else if (p.length < 5 && new RegExp("[0-9]").test(p)){
        this.clickType = '航路'
        //是航路
        let index1 = p1.getAttribute('awyData').split('-')[0]
        let index2 = p1.getAttribute('awyData').split('-')[1]
        let latlngs = []
        let center = []
        for (let i in this.routeData){
          if (index1 == this.routeData[i].name){
            latlngs.push([
              this.routeData[i].lat,
              this.routeData[i].lng
            ] 
            )
            center.push(
              this.routeData[i].lat,
              this.routeData[i].lng
            )
            continue
          }else if (index2 == this.routeData[i].name){
            latlngs.push(
              [
                 this.routeData[i].lat,
                this.routeData[i].lng
              ]
             
            )
            break
          }
        }
        this.e_map.flyTo(center)
      this.clickLayer.push(
        this.L.polyline(latlngs,{
          color:'gold',
          weight:15,
          opacity:0.75
        })
      )
      }
      else{
        this.$message.error('不知道你在点啥`${this.route.clickSelectData}`'+p);
      }
      this.e_map.addLayer(this.L.layerGroup(this.clickLayer))
      },
      closeSelect(){
        document.getElementsByClassName('select')[0].style.display = 'none'
      },
      downloadData(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.click();
      },
      //下载文件的函数
      toCompanyRoute(type){
        switch (type) {
          case 'as320':
            let datastr = `[CoRte]
ArptDep=${this.route.dep}
ArptArr=${this.route.arr}
`
      if (this.route.filsid != 'SID'){
        datastr += `SID=${this.route.filsid}
`
      }
      if (this.route.filstar != 'STAR'){
        datastr +=  `STAR=${this.route.filstar}
`
      }
      let awy_num = 1
      let routedata = this.route.route.split(' ')
      for (let i = 0; i < routedata.length-1; i++){
        if (i == 1 || i%2 == 1){
          datastr += `Airway${awy_num}=${routedata[i]}
Airway${awy_num}FROM=${routedata[i-1]}
Airway${awy_num}TO=${routedata[i+1]}
`
 awy_num++
        }
       
      }
      this.downloadData(`${this.route.dep}${this.route.arr}01.flp`,datastr)
            break;
        
          
          case 'pmdg':
            
            let datastr2 = `Generated by SKYline EFB System

${this.routeData.length}
`
let length = this.routeData.length-1
            datastr2 +=`
${this.routeData[0].name}
1
DIRECT
1 N ${parseFloat(this.routeData[0].lat).toFixed(3)} E ${parseFloat(this.routeData[0].lng).toFixed(3)} 100
-----
1
0

1
12
-
-1000000
-1000000
`
            for (let i = 1; i < this.routeData.length-1; i++){
              datastr2 +=`
${this.routeData[i].name}
5
DIRECT
1 N ${parseFloat(this.routeData[i].lat).toFixed(3)} E ${parseFloat(this.routeData[i].lng).toFixed(3)}
0
0
0
              `
            }
            datastr2 +=`
${this.routeData[length].name}
1
DIRECT
1 N ${parseFloat(this.routeData[length].lat).toFixed(3)} E ${parseFloat(this.routeData[length].lng).toFixed(3)} 100
-----
1
0

1
12
-
-1000000
-1000000
`
            this.downloadData(`${this.route.dep}${this.route.arr}01.rte`,datastr2)
            break

          case 'qw787':
            
            let length2 = this.routeData.length-1
            let datastr3 = `[FlightPlan]   
`
            datastr3 += `${this.routeData[0].name}             ${this.routeData[0].lat}  ${this.routeData[0].lng}  APT ---
`
            for (let i = 1; i < this.routeData.length-1 ; i ++){
              datastr3 += `${this.routeData[i].name}            ${this.routeData[i].lat}   ${this.routeData[i].lng}   WPT ---
`
            }
            datastr3 += `${this.routeData[length2].name}             ${this.routeData[length2].lat}  ${this.routeData[length2].lng}  APT ---
`
            this.downloadData(`${this.route.dep}${this.route.arr}01.RTE`,datastr3)
           break

            case 'xp11':
              let length4 = this.routeData.length -1
              let datastr4 = `I
1100 Version
CYCLE ${this.cycle}
ADEP ${this.route.dep}
ADES ${this.route.arr}
NUMENR 82
`
datastr4 += `1 ${this.route.dep} ADEP 12.000000 ${this.routeData[0].lat} ${this.routeData[0].lng}
`
              for (let i = 1; i < this.routeData.length-1; i++){
                datastr4 +=`11 ${this.routeData[i].name} DRCT 0.000000 ${this.routeData[i].lat} ${this.routeData[i].lng}
`
              }
              datastr4 += `1 ${this.route.arr} ADEP 12.000000 ${this.routeData[length4].lat} ${this.routeData[length4].lng}
`
              this.downloadData(`${this.route.dep}${this.route.arr}01.fms`,datastr4)
              break
              case 'ff320':
                let datastr5 = `RTE ${this.route.dep}${this.route.arr} ${this.route.dep} DCT ${this.route.route}DCT ${this.route.arr}`
                this.downloadData(`${this.route.dep}${this.route.arr}01.in`,datastr5)
              break
                 default:
                break;
        //end switch
        }
      }
  },
  mounted() {
    this.trackSimlinkPlane();
    this.setWidth()
    this.pubsub.subscribe('personalData',(name,data)=>{
            this.personalData = data
            this.user.arpt = data[7]
            this.user.wpt = data[5]
            this.user.awy = data[8]
            this.user.chart = data[9]
            this.$$nextTick(()=>{
              this.getCycle()
            })
            // if (
            //     typeof(this.user.arpt) == 'object' &&
            //     typeof(this.user.wpt) == 'object' &&
            //     typeof(this.user.awy) == 'object'
            // ){
            // }
        })
    if (localStorage.getItem('map') != null){
      this.target_map = localStorage.getItem('map')
    }else{
      localStorage.setItem('map','aip')
    }
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
         } 
      }
    }
  },
};

</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>>
</style>

<style scoped lang="less" >
@font-face {
    font-family:list-font;
    src: url(main.ttc);
}
.div {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-family: list-font;
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  left: 0px;
  overflow-y: auto;
}

#enroute {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 50px;
  width: 100%;
  height: 100%;
  background-color: rgb(39,39,39);
}

.button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.r-main {
  z-index: 10;
  display: none;
  top: 50px;
  position: absolute;
  width: 50%;
  left: 25%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: rgb(54, 61, 105);
  border-radius: 5px;
  text-align: center;
  animation: route-show 0.4s;
}

@keyframes route-show {
  0% {
    transform: scale(0.3);
    opacity: 0.3;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.preview{
  display: none;
  position: absolute;
  right: 15%;
  top: 40%;
  width: 220px;
  height: 110px;
  background-color: rgb(59,70,138);
  border-radius: 4px;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 10;
  cursor: grab;
  .title{
    color: white;
    font-size: 18px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .close{
    position: absolute;
    right: 6px;
    top: 6px;
    font-size: 20px;
    cursor: pointer;
    color: aliceblue;
  }
  #pre-sel{
    display: inline-block;
  }
}
.select{
  display: none;
  position: absolute;
  left: 15%;
  top: 30%;
  width: 220px;
  height: 170px;
  background-color: rgb(59,70,138);
  border-radius: 4px;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 10;
  cursor: grab;
  .title{
    color: white;
    font-size: 18px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .close{
    position: absolute;
    right: 6px;
    top: 6px;
    font-size: 20px;
    cursor: pointer;
    color: aliceblue;
  }
  #pro-sel{
    display: inline-block;
  }
}
.report-outer {
  position: absolute;
  top: 0;
  width: 300px;
  left: 0px;
  /* padding-left: 70px; */
  display: none;
  height: 98.85%;
  font-weight: lighter;
  z-index: 9;
  background-color: rgb(43, 49, 90);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: lighter;
  overflow: hidden auto;
  padding-bottom: 10px;
  animation: showreport 0.4s;
  .top-info {
    padding-top: 8px;
    padding-bottom: 5px;
    color: aliceblue;
    height: 10px;
    position: relative;
    top: -10px;
    font-size: 20px;
    padding-left: 30px;
    font-weight: lighter;
    .gen {
      font-size: 20px;
    }

    .callsign {
      font-size: 14px;
      position: absolute;
      left: 5%;
    }

    .arpt {
      font-size: 18px;
      position: absolute;
      left: 26%;
      font-weight: bold;
      line-height: 18px;
    }

    .distant {
      font-size: 14px;
      position: absolute;
      left: 73%;
    }
  }

  .route-info {
    position: relative;
    width: calc(100% + 7px);
    height: 30%;
    background-color: #434b81;
    overflow: hidden auto;
    touch-action: pan-y;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: lighter;
    margin-bottom: 20px;
    .items {
      float: left;
      margin-top: 5px;
      margin-right: 5px;
      margin-bottom: 5px;
      text-align: center;
      height: 30px;
      border-radius: 15px;
      color: white;
      font-weight: lighter;
      cursor: pointer;
    }

    .arpt {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(76, 163, 240);
    }

    .sid {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(223, 165, 57);
    }

    .wpt {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(103,194,58);
    }

    .awy {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(255,147,147);
    }

    .dct {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(131, 138, 139);
    }

    .star {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(64, 155, 240);
    }

    .vor {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(180, 130, 245);
    }
    .ndb {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(180, 130, 245);
    }
    #scrollable{
      position: relative;
      left: 0;
      width: 100%;
      top: 0;
    }
  }
  @keyframes showreport {
    0% {
      left:-400px;
    }
    100% {
      left:0px;
    }
  }
  .simlink-info {
    color: aliceblue;
    text-align: center;

    .s-1 {
      position: absolute;
      left: 30px;
    }
    .s-3 {
      position: absolute;
      right: 50px;
    }
  }

  .action-info {
    margin-top: 10px;
    position: relative;
    text-align: center;

    .ab {
      margin-right: 5px;
      margin-bottom: 15px;
      margin-top: 10px;
    }
  }

  #r-change {
    position: relative;
    width: 120px;
    margin: 0 auto;
    height: 30px;
    background-color: rgb(43, 49, 90);
    color: white;
    text-align: center;
    cursor: pointer;
    transition-duration: 0.3s;
  }

  .change:hover {
    background-color: rgb(70, 79, 136);
  }
}

.detail {
  resize: both;
  display: none;
  background-color: rgba(15, 74, 201, 0.8);
  top: 20%;
  position: absolute;
  width: 60%;
  left: 20%;
  z-index: 15;
  max-height: 70%;
  overflow-y: auto;
  border-radius: 5px;
  animation: showdetail 0.4s;
  #d-route {
    display: none;
  }

  #d-weather {
    display: none;
  }

  #d-report {
    display: none;
  }

  #d-file {
    display: none;
  }

  .r-button {
    position: relative;
    left: 44%;
    right: 54%;
  }

  .airway-outer {
    border-radius: 5px;
    margin-top: 10px;

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
  .windy-detail {
    position: relative;
    width: 40%;
    left: 10%;
    float: left;
    height: 450px;
    margin-right: 10%;
  }

  .report {
    position: relative;
    width: 48.5%;
    height: 550px;
    overflow-y: auto;
    overflow-x: auto;
    left: 0%;
    margin-right: 1.5%;
    display: inline-block;
    background-color: aliceblue;
    color: black;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 14px;

    .container {
      padding-left: 7px;
      position: absolute;
      width: 500px;

      .r-title {
        padding-left: 7px;
        padding-top: 7px;
      }
    }
  }

  .download-items {
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

    .button {
      position: absolute;
      right: 20px;
      top: 5px;
    }
  }

  .download-items:hover {
    background-color: rgb(12, 98, 168);
  }
}

@keyframes showdetail {
  0% {
    opacity: 0.3;
    transform: scale(0.3);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.control {
  padding-top: 15px;
  position: fixed;
  right: 10px;
  width: 40px;
  top: 150px;
  height: 330px;
  z-index: 999;
  background-color: rgb(18, 173, 235);
  .items {
    cursor: pointer;
    position: relative;
    text-align: center;
    img {
      width: 35px;
    }
  }
}
#overlay {
  display: none;
  position: fixed;
  right: 20px;
  width: 35px;
  top: 130px;
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
    color: aliceblue;
  }
}

</style>
<style lang="less">

.preview-tag{
  font-size: 15px;
  border-radius: 5px;
  color: black;
  font-weight: bold;
  padding: 3px;
}
.day-mode#enroute .leaflet-overlay-pane > img{
  filter: hue-rotate(19deg) contrast(1.1)
}
.night-mode#enroute .leaflet-overlay-pane > img{
  filter: invert(90%) contrast(130%) brightness(90%) hue-rotate(180deg);
}
.day-mode#enroute #leaflet-preview.leaflet-tile-pane{
  filter: brightness(0.4)
}
.night-mode .leaflet-tile-pane{
  filter: invert(90%) contrast(130%) brightness(90%) hue-rotate(180deg);
}
.el-form-item__label{
  color: white !important;
}
.myairplane{
  color: orangered;
  font-size: 16px;
  margin-left: 30px !important;
  font-weight: bold;
}
.otherairplane{
  color: rgb(7, 171, 247);
  font-size: 16px;
  margin-left: 30px !important;
  font-weight: bold;
}

.enrouteIcon{
  font-size: 13.5px;
  margin-left: 15px !important;
  width: 55px !important;
  height: 16px !important;
  line-height: 16px;
  text-align: center;
  background-color: rgb(39, 38, 38);
  border-radius: 10px;
  color: white;
}
.leaflet-control-zoom.leaflet-bar.leaflet-control{
  position: fixed;
  right: 4px;
  width: 30px;
  bottom: 22px;
}
</style>