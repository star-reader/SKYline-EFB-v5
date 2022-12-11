<template>
  <div id="chart-content-weaper" >
    <div id="enroute-chart-viewer"></div>
    <div id="airport-chart-viewer">
		<!-- 航图提示信息 -->
		<div class="chart-warning">
		    <div id="link-warning">此航图不支持FlightLink</div>
		    <div id="border-warning">当前飞机不在航图范围内</div>
		</div>
	</div>
    <div class="zoom">{{ zoom }}%</div>
    <!-- 机场图互动面板 -->
    <div class="interact">
        <div @click="closeChartViewer" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="关闭航图"
              placement="left"
            >
              <i style="color:red" class="el-icon-circle-close"></i>
            </el-tooltip>
          </div>
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
              <i class="el-icon-document-delete"></i>
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
    <!-- 航路图互动面板 -->
    <div class="overlay">
          <!-- <div @click="chartWindow"  class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="窗口预览"
              placement="left"
            >
              <i class="el-icon-monitor"></i>
            </el-tooltip>
          </div> -->
		  <div @click="chartClose" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="关闭预览"
              placement="left"
            >
              <i style="line-height:38px" class="el-icon-circle-close"></i>
            </el-tooltip>
          </div>
          <div @click="chartSet90" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="设置透明度为90%"
              placement="left"
            >
              <i style="font-size: 16px">90%</i>
            </el-tooltip>
          </div>
          <div @click="chartSet80" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="设置透明度为80%"
              placement="left"
            >
              <i style="font-size: 16px">80%</i>
            </el-tooltip>
          </div>
          <div @click="chartSet70" class="inter">
            <el-tooltip
              class="item"
              effect="dark"
              content="设置透明度为70%"
              placement="left"
            >
              <i style="font-size: 16px">70%</i>
            </el-tooltip>
          </div>
    </div>
    <!-- 左侧主搜索区域 -->
    <div id="search-result-panel">
      <div class="main-title">{{search.keyword}}搜索结果
            <span @click="closeSearch" class="close"><i class="el-icon-circle-close"></i></span>
        </div>
      <el-tabs v-model="search.activeItem">
    <el-tab-pane label="机场" name="airport">
      <div class="search-panel-load" id="search-panel-load-airport">
        <i class="el-icon-loading"></i><br>
        搜索中 ... 
      </div>
        <!-- 每一项结果 -->
        <!-- 机场 -->
        <div class="empty-result" id="empty-result-airport">无搜索结果</div>
        <div v-for="(d) in search.result" :key="d.presentation" @click="clickSearch(d,'point',$event)" class="search-items">
            <i class="el-icon-position"></i>
                <div @click="openArptChart(d,$event)" title="打开机场图" v-if="d.charts" class="open"><i class="el-icon-right"></i></div>
            <div class="content">{{getAirportName(d.icao_code,d.presentation_text)}}</div>
        </div>
        <div v-for="(d) in search.self" :key="d.label" @click="openArptChart(d,$event)" class="search-items">
            <i class="el-icon-folder-opened"></i>
            <div class="content airport">{{d.label.slice(0,32)}}</div>
        </div>
        <div class="footer" style="height:80px;"></div>
    </el-tab-pane>
    <el-tab-pane label="导航台" name="navdata">
      <div class="search-panel-load" id="search-panel-load-navdata">
        <i class="el-icon-loading"></i><br>
        搜索中 ... 
      </div>
        <div class="empty-result" id="empty-result-navdata">无搜索结果</div>
        <div v-for="(d) in search.navid" :key="d.id" @click="clickSearch(d,'point',$event)" class="search-items">
            <i class="el-icon-place"></i>
            <!-- 需要四个参数：识别码，名称，纬度，经度。以此判断是否为国内导航台 -->
            <!-- <div class="content">{{d.presentation_text}}</div> -->
            <div class="content">{{getNavidName(d.ident,d.presentation_text,d.latitude,d.longitude)}} ({{d.ident}})</div>
        </div>
        <div class="footer" style="height:80px;"></div>
    </el-tab-pane>
    <el-tab-pane label="航点" name="waypoint">
      <div class="search-panel-load" id="search-panel-load-waypoint">
        <i class="el-icon-loading"></i><br>
        搜索中 ... 
      </div>
        <div class="empty-result" id="empty-result-waypoint">无搜索结果</div>
        <div v-for="(d) in search.wpt" :key="d.id" @click="clickSearch(d,'point',$event)" class="search-items">
            <i class="el-icon-aim"></i>
            <div class="content">{{d.presentation_text}}</div>
        </div>
        <div class="footer" style="height:80px;"></div>
    </el-tab-pane>
    <el-tab-pane label="航路" name="airway">
      <div class="search-panel-load" id="search-panel-load-airway">
        <i class="el-icon-loading"></i><br>
        搜索中 ... 
      </div>
        <div class="empty-result" id="empty-result-airway">无搜索结果</div>
        <div v-for="(d) in search.airway" :key="d.id" @click="clickSearch(d,'airway',$event)" class="search-items">
            <i class="el-icon-share"></i>
            <div class="content">{{d.presentation_text}}</div>
        </div>
        <div class="footer" style="height:80px;"></div>
    </el-tab-pane>
    <el-tab-pane label="空域" name="airspace">
      <div class="search-panel-load" id="search-panel-load-airspace">
        <i class="el-icon-loading"></i><br>
        搜索中 ... 
      </div>
        <div class="empty-result" id="empty-result-airspace">无搜索结果</div>
        <div v-for="(d) in search.airspace" :key="d.presentation_text" @click="clickSearch(d,'geojson',$event)" class="search-items">
            <i class="el-icon-discover"></i>
            <div class="content">{{d.presentation_text}}</div>
        </div>
        <div class="footer" style="height:80px;"></div>
    </el-tab-pane>
    <el-tab-pane label="限制区" name="restrict">
      <div class="search-panel-load" id="search-panel-load-restrict">
        <i class="el-icon-loading"></i><br>
        搜索中 ... 
      </div>
        <div class="empty-result" id="empty-result-restrict">无搜索结果</div>
        <div v-for="(d) in search.restrict" :key="d.id" @click="clickSearch(d,'geojson',$event)" class="search-items">
            <i class="el-icon-coordinate"></i>
            <div class="content">{{d.presentation_text}}</div>
        </div>
        <div class="footer" style="height:80px;"></div>
    </el-tab-pane>
  </el-tabs>
        
    </div>
    <!-- 左侧机场图列表 -->
    <div class="nav-left-sidebar">
        <div @click="showCopyInfo" class="icon"><i class="el-icon-s-promotion"></i></div>
        <div class="arpt" @click="showArptInfo">{{chart.target_icao}}</div>
        <div class="list">
            <div class="line"></div>
            <div class="items" id="list-arpt" @click="openChartList('arpt')">机场图
                <div class="num">{{chart.arpt.length}}</div>
            </div>
            <div class="items" id="list-sid" @click="openChartList('sid')">离场图
                <div class="num">{{chart.sid.length}}</div>
            </div>
            <div class="items" id="list-star" @click="openChartList('star')">进场图
                <div class="num">{{chart.star.length}}</div>
            </div>
            <div class="items" id="list-app" @click="openChartList('app')">进近图
                <div class="num">{{chart.app.length}}</div>
            </div>
            <div class="items" id="list-other" @click="openChartList('other')">其他
                <div class="num">{{chart.other.length}}</div>
            </div>
        </div>
        
    </div>
    <!-- 航图列表 -->
    <div class="chart-main-list">
        <div class="top">
            <div class="title">{{chart.target_icao}} - {{chart.target_type}}</div>
            <div @click="closeArptList" class="close"><i class="el-icon-circle-close"></i></div>
            <div class="filter">
        <el-input
          placeholder="输入航图名称以筛选"
          suffix-icon="el-icon-search"
          v-model="chart_filter"
        >
        </el-input>
        <div id="perview">
        <el-button @click="EnroutePreview"  type="success">在航路图预览程序</el-button>
      </div>
      </div>
        </div>
        <div class="main-display">
             <div id="chart-list-load">
                <i class="el-icon-loading"></i><br>
                加载中 ... 
            </div>
            <div
        @click="clickChart(c, $event)"
        v-for="(c, index) in chart.select_filter"
        :key="index"
        :title="c[0].procedure_identifier"
        class="items"
      >
        <div title="把航图固定在列表栏" @click="pinChart(c,$event)" class="pin">
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
        <div class="footer"></div>
    </div>
    <!-- 浮动说明页面 -->
    <div class="info-layer-float">
        <div class="title">EFB数据信息</div>
        <div class="sp"></div>
        <div class="content">
            EFB内置导航数据数据版本:{{cycle.airac}} <br>
            导航数据来自Navigraph API。<br>
			(API非商业使用许可) <br>
            本EFB系统仅限模拟飞行使用,禁止用于真实飞行。 <br>
            系统开发:SKYline天际模飞俱乐部开发组 <br>
            Copyright &copy; 2020-2022 SKYline Flyleague. All rights reserved <br>
        </div>
    </div>
    <!-- 机场说明页面 -->
    <div class="arpt-layer-float">
        <div class="title">{{chart.target_icao}}机场信息</div>
        <div class="sp"></div>
        <div class="content">
            机场名称：{{getAirportName(chart.all_data.icao_code,chart.all_data.presentation_text)}} <br>
            机场ICAO:{{chart.all_data.icao_code}} <br>
            机场IATA:{{chart.all_data.iata_code}} <br>
            经度: {{chart.all_data.longitude.toFixed(2)}}°  <br>
            纬度: {{chart.all_data.latitude.toFixed(2)}}°  <br>
            最长跑道:{{(chart.all_data.longest_runway*0.3048).toFixed(0)}} m <br>
            机场标高:{{(chart.all_data.elevation*0.3048).toFixed(0)}} m
        </div>
    </div>
    <!-- 程序预览页面 -->
    <div v-drag class="preview-float">
      <div class="title">{{chart.target_icao}}-{{preview.type}}程序预览</div>
      <div @click="closePreview" class="close"><i class="el-icon-circle-close"></i></div>
      <el-select @change="drawPreview" no-data-text="数据加载中..." id="pre-sel" auto-complete="false" v-model="preview.value" placeholder="请选择">
		<el-option
		  v-for="(item,index) in preview.runway"
		  :key="index"
		  :label="item.runway_identifier"
		  :value="item.runway_identifier"
		  >
		</el-option>
		</el-select>
	</div>
    <!-- 选择进离场 -->
	<div v-drag class="select">
	    <div class="title">选择{{select.icao}}-{{select.type}}程序</div>
	    <div @click="closeSelect" class="close"><i class="el-icon-circle-close"></i></div>
	    <el-select no-data-text="数据加载中..." @change="changeSelectRwy" id="pro-sel" auto-complete="false" v-model="select.runwayvalue" placeholder="选择跑道">
	  <el-option
	    v-for="(item,index) in select.rwy"
	    :key="index"
	    :label="item.runway_identifier"
	    :value="item.runway_identifier"
	    >
		</el-option>
		</el-select>
		<br><br>
		<el-select no-data-text="数据加载中..." @change="changeSelectPro" id="pro-sel-in" auto-complete="false" v-model="select.provalue" placeholder="选择程序">
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
    <br><br>
		<el-select :disabled="this.select.type != '进近'" no-data-text="请先选择进近程序" @change="changeSelectTrans" id="pro-sel-in" auto-complete="false" v-model="select.transvalue" placeholder="选择过渡点">
	  <el-option
	    v-for="(item,index) in select.trans"
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
	<!-- 创建飞行计划页面 -->
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
        <el-form-item label="自定义航路">
          <el-input type="textarea" v-model="form.userTempRoute" placeholder="自定义航路数据[请不要填写起落机场和进离场程序]"></el-input>
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
        <span class="callsign">{{ form.callsign.toUpperCase() }}</span>
        <span class="arpt">{{ route.dep.icao.toUpperCase() }} → {{ route.arr.icao.toUpperCase() }}</span>
        <span class="distant">{{ route.distance }}NM</span>
      </div>
      <div class="route-info">
        <div id="scrollable">
			<div id="route-data-load">
			    <i class="el-icon-loading"></i><br>
			    加载中 ... 
			</div>
          <div v-for="(d, index) in route.eachRoute" :key="index" class="items">
          <div @click="showWptDetail(d)" :class="d.type">
            <i :class="getIcon(d.type)"></i> {{ d.label }}
          </div>
        </div>
        </div>
      </div>
      <div id="r-info">
        <div class="simlink-info">
          <div>
            <span class="s-1">状态：{{ simlink.suatus }}</span>
            <span class="s-3">高度：{{ simlink.alt }}ft</span><br>
            <span class="s-1">地速：{{ simlink.gs }}kts</span>
            <span class="s-3">航向：{{ simlink.heading }}°</span><br>
            <span class="s-1">机型：{{ simlink.actype }}</span>
            <span class="s-3">应答机：{{ simlink.squawk }}</span><br>
            <span class="s-1">经度：{{ simlink.lat }}°</span>
            <span class="s-3">纬度：{{ simlink.lng }}°</span><br>
            <br />
          </div>
        </div>
        <div class="action-info">
          <el-button class="ab" @click="d_report" type="primary"
            >飞行报告</el-button
          > <br>
          <el-button class="ab" @click="d_allchart" type="success"
            >固定航图</el-button
          > <br>
          <el-button class="ab" @click="d_unload" type="danger"
            >结束航班</el-button
          >
        </div>
      </div>
    </div>
	<!-- OFP详细列表 -->
	<div style="resize: both;" class="ofp-detail">
		<div class="close"><i class="el-icon-circle-close" @click="closeOfp"></i></div>
		<el-tabs v-model="tabs">
			<el-tab-pane label="飞行报告" name="report">
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
				          {{ form.callsign.toUpperCase() }} &nbsp; {{ form.type }} &nbsp;
				          {{ route.dep.icao }}/{{ route.arr.icao }} &nbsp; 正常/正常 &nbsp; S25Q-1C
				        </div>
				        <br />
				        <div>航班计划航路</div>
				        <div>{{ route.searched }}</div>
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
				        <div>{{personalData.cid}}</div>
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
				          {{ form.callsign.toUpperCase() }} &nbsp; {{ form.type }} &nbsp;
				          {{ route.dep.icao }}/{{ route.arr.icao }} &nbsp; NORMAL/NORMAL &nbsp;
				          S25Q-1C
				        </div>
				        <br />
				        <div>FLIGHT PLAN ROUTE</div>
				        <div>{{ route.searched }}</div>
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
				        <div>{{personalData.cid}}</div>
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
			</el-tab-pane>
		    <el-tab-pane v-model="tabs" label="航路信息" name="route">
				<br>
				<div>飞行航路：</div>
				<div class="route-display-span">{{route.searched}}</div><br>
				<div>联飞提交航路</div>
				<div class="route-display-span">{{route.searched.replace(` STAR ${route.arr.icao}`,'').replace(`${route.dep.icao} SID `,'')}}</div><br>
				<div>详细航路</div>
				<el-table
				  :data="route.routeData"
				  border
				  style="width: 80%; left: 10%; border-radius: 4px"
				>
				  <el-table-column prop="name" label="航点名称"> </el-table-column>
				  <el-table-column prop="lat" label="纬度"> </el-table-column>
				  <el-table-column prop="lng" label="经度"> </el-table-column>
				</el-table>
				<br>
			</el-tab-pane>
		    <el-tab-pane label="气象资料" name="weather">
				<div class="airway-outer">
				  <div class="top-route">风图</div>
				  <br />
          <div>选择显示地区</div>
          <el-select v-model="weatherChartValue" @change="this.changeWeatherChart" placeholder="选择风图显示区域">
              <el-option value="https://www.aviationweather.gov/data/iffdp/2101.gif" label="US (A)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2103.gif" label="EUR-SAM (B)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2104.gif" label="EUR-AFR (C)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2105.gif" label="EUR-C ASIA (D)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2106.gif" label="ASIA-AUS (E)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2107.gif" label="EUR-ASIA (G)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2108.gif" label="NAM-EUR (H)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2109.gif" label="S AFR-AUS (K)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2128.gif" label="PACIFIC (M)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2129.gif" label="AMERICAS (A)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2130.gif" label="AMER-AFR (B1)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2131.gif" label="PACIFIC (F)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2132.gif" label="N ATLANTIC (H)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2133.gif" label="N PACIFIC (I)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2134.gif" label="S PACIFIC (J)"></el-option>
              <el-option value="https://www.aviationweather.gov/data/iffdp/2135.gif" label="N ATLANTIC"></el-option>
          </el-select>
          <br>
          <br>
				  <img
            id="weather-chart-insert"
            src="https://www.aviationweather.gov/data/iffdp/2105.gif"
				    width="95%"
				    alt="WindData"
				  />
				  <div class="top-route">Windy气象资料</div>
				  <div class="iframe-outer" style="height: 450px">
				    <iframe
				      class="windy-detail"
				      width="100%"
				      :src="`https://embed.windy.com/embed2.html?lat=${route.dep.latlng[0]}&amp;lon=${route.dep.latlng[1]}&amp;zoom=5&amp;level=surface&amp;overlay=windy&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;detailLat=${route.deplat}&amp;detailLon=${route.deplng}&amp;metricWind=kt&amp;metricTemp=%C2%B0C&amp;radarRange=-1`"
				      frameborder="0"
				    ></iframe>
				    <iframe
				      class="windy-detail"
				      width="100%"
				      :src="`https://embed.windy.com/embed2.html?lat=${route.arr.latlng[0]}&amp;lon=${route.arr.latlng[1]}&amp;zoom=5&amp;level=surface&amp;overlay=windy&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;detailLat=${route.arrlat}&amp;detailLon=${route.arrlng}&amp;metricWind=kt&amp;metricTemp=%C2%B0C&amp;radarRange=-1`"
				      frameborder="0"
				    ></iframe>
				  </div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="导出文件" name="file">
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
			</el-tab-pane>
		  </el-tabs>
	</div>
  </div>
</template>

<script>
import $ from 'jquery'
import { dataDecrypt,dataEncrypt } from "../utils/cryptoJS";
import { getAirportName,getNavidName } from '@/utils/getAirportName';
import airplane from "@/assets/airplane.png";
import marker_point from '@/assets/marker-point.png'
import waypoint from '@/assets/waypoint.png'
import vor from '@/assets/vor.png'
import ndb from '@/assets/ndb.png'
import airport from '@/assets/airport.png'
import Arpt from "@/assets/icon/arpt.png";
import VOR from "@/assets/icon/vor.png";
import NDB from "@/assets/icon/ndb.png";
import Wpt from "@/assets/icon/wpt.png";
import { getRandomString } from '@/utils/num';
import h_logo from '@/assets/h_logo.png'
import v_logo from '@/assets/v_logo.png'
import h_warning from '@/assets/h_warning.png'
import v_warning from '@/assets/v_warning.png'
export default {
    name:'Chart',
    data(){
        return {
            personalData:{
                cid:'skyline',
                email:null,
                avatar: false,
                authorizedUser:false,
                authorizeText:null,
                waypoint: false,
                airway: false,
                airport: false,
                fixedJSONAirway: false,
                charts: false,
                LastSyncedFlight: false
            },
            getAirportName,
            getNavidName,
			      first_load:true,
            h_logo,
            v_logo,
            h_warning,
            v_warning,
            weatherChartValue:'https://www.aviationweather.gov/data/iffdp/2105.gif',
			tabs:'report',
            colors:['#FF0000','	#FF4500','#FFA500','#FFD700','#32CD32',
		  '#40E0D0','#1E90FF','#FF1493','#4169E1','#708090',
		  '#3CB371','#DAA520','#D2691E','#FA8072','	#008B8B'],
            search:{
                result:[],
                keyword:'',
                self:[],
                activeItem:'airport',
                wpt:[],
                navid:[],
                airspace:[],
                restrict:[],
                airway:[],
            },
            search_layer : [],
            worldArpt:[],
            ori_arpt:[],
            pinBoard:[],
			      currentBorder:[],
            haveLeftSide:false,
            zoomlevel:'',
            arpt_zoomlevel:'',
            chart_filter:'',
            zoom:'',
            chartWidth:'',
            chart:{
                target_icao:'ICAO',
                all_data:{
                    latitude:0,
                    longitude:0,
                    longest_runway:0,
                    elevation:0
                },
                arpt:[],
                sid:[],
                star:[],
                app:[],
                other:[],
                select:[],
                select_filter:[],
                target_type:'机场图'
            },
            user:{
                arpt:[],
                wpt:[],
                awy:[],
                chart:[]
            },
            preview:{
                runway:[],
                type:'加载中',
                value:'',
                data:[],
                route_line:[],
            },
			select:{
				rwy:[],
				type:'加载中',
				data:[],
				selectLayer:[],
        appFilter:[],
				icao:'',
				runwayvalue:'',
				provalue:'',
        transvalue:'',
				route:[],
        trans:[],
				landrunway:'',
				sidLayer:[],
				starLayer:[],
        appLayer:[],
				pickData:[],
			},
			//自定义航路图数据leaflet图层
            u_wptLayer:[],
            u_wptNameLayer:[],
            u_arptLayer:[],
            u_awyLayer:[],
            u_awyNameLayer:[],
            //搜索页面/点击事件的leaflet layer
            clickLayer:[],
            vectorData:[],
            routeLayer:[],
			e_pilotLayer:[],
			pilotLayer:[],
            enouteOverlayLayer:[],
            //飞行计划vmodel
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
				userTempRoute:''
            },
            route:{
                //查到的H76 P908 W87 AGUSB格式
                searched:'',
                //显示在左侧的展开航线信息
                eachRoute:[],
				        routeData:[],
                //原始信息
                original:[],
                //SID STAR
                sid_word:'SID',
                star_word:'STAR',
                distance:0,
                dep:{
                    icao:'',
                    name:'',
                    latlng:[0,0]
                },
                arr:{
                    icao:'',
                    name:'',
                    latlng:[0,0]
                }
            },
			simlink:{
				suatus:'未连接',
				alt:'---',
				gs:'---',
				heading:'---',
				actype:'---',
				squawk:'---',
				lat:'---',
				lng:'---',
				fix_lng:'',
			},
			prepare:{
				route_sid:[],
				route_star:[],
				route_dep_runway:[],
				route_arr_runway:[],
        route_arr_app:[],
				search_sid:[],
				search_star:[],
				search_runway:[],
        search_app:[]
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
		}
    },
    props:['setWidth','cycle'],
    methods:{
		
        getCurrent(){
          this.initEnrouteMap(this.cycle.enrouteTileId)
        },
        formatLayerName(layer){
          switch (layer) {
            case 'jeppesen':
              return 'high_layer'
            case 'low':
              return 'low_layer'
            case 'vfr':
              return 'vfr_layer'
            default:
              break;
          }
        },
        initEnrouteMap(id){
            const e_map = this.L.map('enroute-chart-viewer',{
                minZoom: 3,
                maxZoom: 11,
                center: [29.550339, 100.114129],
                zoom: 6
            })
            this.e_map = e_map
            this.e_map.setMaxBounds([[90,-180],[-90,360]])
            this.zoomlevel = this.e_map.getZoom()
            if (localStorage.getItem('mapZoom')!= null && localStorage.getItem('mapCenter')!=null){
                let latlng = localStorage.getItem('mapCenter').replace(')','').replace(' ','').replace('LatLng(','').split(',')
                this.e_map.setView([latlng[0],latlng[1]],localStorage.getItem('mapZoom'))
            }
            this.e_map.on('zoom',()=>{
                localStorage.setItem('mapZoom',this.e_map.getZoom())
                localStorage.setItem('mapCenter',this.e_map.getCenter())
                this.zoomlevel = this.e_map.getZoom()
                this.drawUserNavData(JSON.parse(JSON.stringify(this.user)))
				this.e_map.invalidateSize(true)
            })
            this.e_map.on('drag',()=>{
                localStorage.setItem('mapCenter',this.e_map.getCenter())
				this.e_map.invalidateSize(true)
            })
            this.e_map.on('contextmenu',(e)=>{
                this.rightClick(e.latlng.toString())
            })
            //this.L.polyline([[40,120],[56,176],[52,-170+360]]).addTo(this.e_map)
            this.e_map.on('click',()=>{
              $('#search-result-panel').css('display','none')
                $('#search-input').css('display','none')
                $('.right-main').css('display','none')
                $('.personal-card').css('display','none')
                //$('.search-box').css('display','none')
				        $('.chart-main-list').css('display','none')
                $("#r-main").css('display','none')
                $('.ofp-detail').css('display','none')
                $('.arpt-layer-float').css('display','none')
                $('.info-layer-float').css('display','none')
                for (let i in this.clickLayer){
                this.clickLayer[i].remove()
            }
                for (let i in this.search_layer){
                    this.search_layer[i].remove()
                }
            })
            const high_layer = this.L.tileLayer(`https://enroute.charts.api.navigraph.com/${id}/hd-2x/{z}/{x}/{y}.png`,{tms:true})
            const low_layer = this.map_layer = this.L.tileLayer(`https://enroute.charts.api.navigraph.com/${id}/ld-2x/{z}/{x}/{y}.png`,{tms:true})
            const vfr_layer = this.map_layer = this.L.tileLayer( `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`)
            let current_layer = null
            const layer = {high_layer,low_layer,vfr_layer}
            if (localStorage.getItem('map') == null || localStorage.getItem('map') == 'jeppesen' || localStorage.getItem('map') == 'aip'){
                    this.e_map.addLayer(layer.high_layer)
                    current_layer = 'high_layer'
                }else if (localStorage.getItem('map') == 'low'){
                  this.e_map.addLayer(layer.low_layer)
                  current_layer = 'low_layer'
                }else if (localStorage.getItem('map') == 'vfr'){
                  this.e_map.addLayer(layer.vfr_layer)
                  current_layer = 'vfr_layer'
                }
              
            this.pubsub.subscribe('change_Map',(name,data)=>{
              this.e_map.removeLayer(layer[current_layer])
              this.e_map.addLayer(layer[this.formatLayerName(data)])
              current_layer = this.formatLayerName(data)
            })
            this.initArptData()
            this.initChartViewer()
        },
        initArptData(){
            this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airport?cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
                this.worldArpt = res.data
                this.ori_arpt = res.data
            })
        },
        initChartViewer(){
            const map = this.L.map('airport-chart-viewer',{
                 minZoom: 8,
                zoom: 4.25,
                zoomControl: false,
                zoomSnap: 0.001,
                attributionControl:false
            })
            this.map = map
            this.map.scrollWheelZoom.disable()
            let zoom = document.getElementsByClassName("zoom")[0];
            this.map.on('click',()=>{
                $('.chart-main-list').css('display','none')
                $("#r-main").css('display','none')
            })
            this.map.on('drag',()=>[
                this.map.invalidateSize(true)
            ])
                window.onmousewheel = document.onmousewheel = (e) => {
                try {
                let img = document.querySelectorAll(".airport-chart-vierer .leaflet-image-layer");
                let zoom_o = this.arpt_zoomlevel;
                let zoom_n = this.map.getZoom();
                let scnel = (zoom_n / zoom_o).toFixed(2);
                this.zoom = parseInt(scnel * 100);
				this.map.invalidateSize(true)
                if (
                    e.wheelDelta < 0 &&
                    document.getElementsByTagName("canvas").length == 0 &&
                    e.target.className.indexOf("leaflet-container") != -1 &&
                    this.zoom > 88
                ) {
                    this.map.setZoom(this.map.getZoom() - 0.15);
                    zoom.style.display = "block";
                } else if (
                    e.wheelDelta > 0 &&
                    document.getElementsByTagName("canvas").length == 0 &&
                    e.target.className.indexOf("leaflet-container") != -1 &&
                    this.zoom < 135
                ) {
                    this.map.setZoom(this.map.getZoom() + 0.15);
                    //that.map.setZoomAround([e.offsetX,e.offsetX],that.map.getZoom() + 0.15)
                    zoom.style.display = "block";
                }
                hiddenZoom();
                } catch (error) {}
            };
            
            function hiddenZoom() {
                setTimeout(() => {
                zoom.style.display = "none";
                }, 1500);
            }
        },
        searchInfo(s){
            let loading = this.worldArpt.length < 14700 ? true : false
            if (s.length < 2) return this.$message({'type':'error','message':'至少输入两位字符以搜索'})
            for (let i in this.search_layer){
                this.search_layer[i].remove()
            }
            this.search_layer = []
            this.search.result = []
            this.search.self = []
            $('#search-result-panel').css('display','block')
            if(!loading){
              $('#search-panel-load-airport').css('display','none')
            }else{
              $('#search-panel-load-airport').css('display','block')
            }
            $('.chart-main-list').css('display','none')
            for (let i in this.worldArpt){
                let d = this.worldArpt[i]
                if (d.icao_code.indexOf(s.toUpperCase()) != -1 || getAirportName(d.icao_code,d.presentation_text).indexOf(s.toUpperCase()) != -1){
                    this.search.result.push(d)
                }
            }
            for (let i in this.user.chart){
                let d = this.user.chart[i]
                if (d.icao.indexOf(s.toUpperCase()) != -1 || d.label.indexOf(s.toUpperCase()) != -1){
                    this.search.self.push(d)
                }
            }
            if (!this.search.result.length && !this.search.self.length){
                $('#empty-result-airport').css('display','block')
            }else{
                $('#empty-result-airport').css('display','none')
            }
            //发送请求数据
            this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/search?searchWord=${s}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{

              this.search.wpt = res.data.dataRaw.waypoints
              this.search.navid = res.data.dataRaw.navaids
              this.search.airway = res.data.dataRaw.airways
              this.search.airspace = res.data.dataRaw.airspace
              this.search.restrict = res.data.dataRaw.restriction
              $('#search-panel-load-waypoint').css('display','none')
              $('#search-panel-load-navdata').css('display','none')
              $('#search-panel-load-airway').css('display','none')
              $('#search-panel-load-airspace').css('display','none')
              $('#search-panel-load-restrict').css('display','none')
              if (!this.search.wpt.length){
              $('#empty-result-waypoint').css('display','block')
              }else{
                  $('#empty-result-waypoint').css('display','none')
              }
              if (!this.search.navid.length){
              $('#empty-result-navdata').css('display','block')
              }else{
                  $('#empty-result-navdata').css('display','none')
              }
              if (!this.search.airway.length){
              $('#empty-result-airway').css('display','block')
              }else{
                  $('#empty-result-airway').css('display','none')
              }
              if (!this.search.airspace.length){
              $('#empty-result-airspace').css('display','block')
              }else{
                  $('#empty-result-airspace').css('display','none')
              }
              if (!this.search.restrict.length){
              $('#empty-result-restrict').css('display','block')
              }else{
                  $('#empty-result-restrict').css('display','none')
              }
              if (loading){
                this.search.result = res.data.airports
                $('#search-panel-load-airport').css('display','none')
                if (!this.search.result.dataRaw.length){
                $('#empty-result-airport').css('display','block')
                }else{
                    $('#empty-result-airport').css('display','none')
                }
              }

            })
        },
        rightClick(e){
           let loading = this.worldArpt.length < 14700 ? true : false
            //if (this.worldArpt.length < 14700) return this.$message({'type':'error','message':'请等待机场数据加载完成后搜索!'})
            for (let i in this.search_layer){
                this.search_layer[i].remove()
            }
            this.search_layer = []
            this.search.result = []
            this.search.self = []
            let lat = parseFloat(e.split('LatLng(')[1].split(', ')[0].trim())
            let lng = parseFloat(e.split(', ')[1].split(')')[0])
            //修复lng
            let orlat = lat
            let orlng = lng
            if (lng < 0){
                lng = lng + 360
            }
            if (lng > 180){
                let t = Math.floor(lng / 180)
                lng = lng - t*360
            }
            this.search_layer.push(this.L.circle([orlat, orlng], { radius: 73000, color: "#00CD00", fillColor: "#00EE00", fillOpacity: 0.15 }))
            this.e_map.addLayer(this.L.layerGroup(this.search_layer))
            $('#search-result-panel').css('display','block')
            if(!loading){
              $('#search-panel-load-airport').css('display','none')
            }else{
              $('#search-panel-load-airport').css('display','block')
            }
            $('#search-panel-load-waypoint').css('display','block')
            $('#search-panel-load-navdata').css('display','block')
            $('#search-panel-load-airway').css('display','block')
            $('#search-panel-load-airspace').css('display','block')
            $('#search-panel-load-restrict').css('display','block')
            //$('.search-box').css('display','none')
            $('.chart-main-list').css('display','none')
            for (let i in this.worldArpt){
                let d = this.worldArpt[i]
                if (Math.abs(lat - d.latitude) < 0.8 && Math.abs(lng - d.longitude) < 0.8){
                        this.search.result.push(d)
                }
            }
            if (!this.search.result.length){
                $('#empty-result-airport').css('display','block')
            }else{
                $('#empty-result-airport').css('display','none')
            }
            //发送请求数据
            this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/rightclick?lat=${lat}&lng=${lng}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
              this.search.wpt = res.data.dataRaw.waypoints
              this.search.navid = res.data.dataRaw.navaids
              this.search.airway = res.data.dataRaw.airways
              this.search.airspace = res.data.dataRaw.airspace
              this.search.restrict = res.data.dataRaw.restriction
              $('#search-panel-load-waypoint').css('display','none')
              $('#search-panel-load-navdata').css('display','none')
              $('#search-panel-load-airway').css('display','none')
              $('#search-panel-load-airspace').css('display','none')
              $('#search-panel-load-restrict').css('display','none')
              if (!this.search.wpt.length){
              $('#empty-result-waypoint').css('display','block')
              }else{
                  $('#empty-result-waypoint').css('display','none')
              }
              if (!this.search.navid.length){
              $('#empty-result-navdata').css('display','block')
              }else{
                  $('#empty-result-navdata').css('display','none')
              }
              if (!this.search.airway.length){
              $('#empty-result-airway').css('display','block')
              }else{
                  $('#empty-result-airway').css('display','none')
              }
              if (!this.search.airspace.length){
              $('#empty-result-airspace').css('display','block')
              }else{
                  $('#empty-result-airspace').css('display','none')
              }
              if (!this.search.restrict.length){
              $('#empty-result-restrict').css('display','block')
              }else{
                  $('#empty-result-restrict').css('display','none')
              }
              if (loading){
                this.search.result = res.data.dataRaw.airports
                $('#search-panel-load-airport').css('display','none')
                if (!this.search.result.length){
                $('#empty-result-airport').css('display','block')
                }else{
                    $('#empty-result-airport').css('display','none')
                }
              }

            })
        },
        closeSearch(){
            $('#search-result-panel').css('display','none')
            for (let i in this.search_layer){
                this.search_layer[i].remove()
            }
            this.search_layer = []
        },
        closeArptList(){
            $('.chart-main-list').css('display','none')
        },
        showCopyInfo(){
            let i = $('.info-layer-float')
            if(i.css('display') != 'block'){
                $('.arpt-layer-float').css('display','none')
                i.css('display','block')
            }else{
                i.css('display','none')
            }
        },
        showArptInfo(){
            let i = $('.arpt-layer-float')
            if(i.css('display') != 'block'){
                $('.info-layer-float').css('display','none')
                i.css('display','block')
            }else{
                i.css('display','none')
            }
        },
        getAcftData() {
          //计算油量和配载信息
          this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/aircraft`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then((res) => {
            let r = res.data
            let resdata = JSON.parse(dataDecrypt(r.slice(10,r.length)));
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
		//航图阅读器操作
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
        drawinter() {
            this.map.scrollWheelZoom.disable();
            this.map.dragging.disable();
            let c = document.getElementById("canvas");
            if (c != null || c != undefined) {
                //已经创建了
                return this.$message.error('涂鸦面板已经创建了哦~ (￣︶￣)');
            }
            //canvas面板
            let par = document.getElementById("airport-chart-viewer");
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
            document.getElementById("airport-chart-viewer").removeChild(c);
        },
        closeChartViewer(){
            $('#airport-chart-viewer').css('display','none')
            $('#link-warning').css('display','none')
            $('#border-warning').css('display','none')
            $('.interact').css('display','none')
            let c = document.getElementById("canvas")
            if (c == null || c == undefined) {
                return
            }
            this.map.dragging.enable()
            document.getElementById("airport-chart-viewer").removeChild(c)
        },
        enrouteChart(){
            this.closeChartViewer()
            for (let i in this.enouteOverlayLayer){
                this.enouteOverlayLayer[i].remove()
            }
            this.enouteOverlayLayer = []
            this.enouteOverlayLayer = this.vectorData
            this.e_map.addLayer(this.L.layerGroup(this.enouteOverlayLayer))
            $('.overlay').css('display','block')
            document.querySelectorAll('#enroute-chart-viewer .leaflet-overlay-pane > img')[0].style.opacity = '0.8'
            let latlngs =[this.vectorData[0]._bounds._northEast.lat,this.vectorData[0]._bounds._southWest.lng]
            this.e_map.setView(latlngs,7)
        },
        pinChart(c,e){
            e.cancelBubble = true
            this.pinBoard.push(c)
            this.pubsub.publish('newPin',this.pinBoard)
            $('.app-pin').css('display','block')
        },
        //航路图操作
        chartClose(){
            for (let i in this.enouteOverlayLayer){
                this.enouteOverlayLayer[i].remove()
                }
                this.enouteOverlayLayer = []
                $('.overlay').css('display','none')
        },
        chartSet90(){
            document.querySelectorAll('#enroute-chart-viewer .leaflet-overlay-pane > img')[0].style.opacity = '0.9'
        },
        chartSet80(){
            document.querySelectorAll('#enroute-chart-viewer .leaflet-overlay-pane > img')[0].style.opacity = '0.8'
        },
        chartSet70(){
            document.querySelectorAll('#enroute-chart-viewer .leaflet-overlay-pane > img')[0].style.opacity = '0.7'
        },
        closePreview(){
            $('.preview-float').css('display','none')
            for (let i in this.preview.route_line){
              this.preview.route_line[i].remove()
            }
            this.preview.route_line = []
            document.querySelector('#enroute-chart-viewer .leaflet-tile-pane').removeAttribute('id')
        },
        drawPreview(){
		  for (let i in this.preview.route_line){
		    this.preview.route_line[i].remove()
		  }
		  this.preview.route_line = []
		  let data = this.preview.data
		  //筛选合适的程序
		  let filter = []
      let presentation = []
		  for (let i in data){
		    for (let j in data[i].runways){
		      if (this.preview.value == data[i].runways[j]){
		        filter.push(data[i].legs)
            presentation.push(data[i].presentation_text)
		      }
		    }
		  }
      let latlngs = []
      if (this.preview.type == '进近'){
          for (let i in filter){
            let num = Math.floor(Math.random() * (14 - 0 + 1) ) + 0;
		        let color = this.colors[num]
            let d = filter[i]
            let isFirst = false
            for (let j in d){
              if (d[j].is_missed_approach){
                //是复飞程序
                    this.preview.route_line.push(
                    this.L.geoJSON(JSON.parse(d[j].geometry),{color,weight:6.5,opacity:0.3,smoothFactor:3})
                  )
              }else{
                if (!isFirst){
                    isFirst = true
                    this.preview.route_line.push(
                      this.L.geoJSON(JSON.parse(d[j].geometry),{color,weight:6.5,smoothFactor:3}).bindTooltip(presentation[i],{
                      permanent: true,
                      className: "preview-tag",
                      opacity: 0.7
                    })
                  )
                }else{
                    this.preview.route_line.push(
                    this.L.geoJSON(JSON.parse(d[j].geometry),{color,weight:6.5,smoothFactor:3})
                  )
                }
              }
            }
          }
          let latlngs = JSON.parse(filter[0][0].geometry).coordinates[0]
          this.e_map.setView([latlngs[1],latlngs[0]],11)
      }else{
        //开始绘制程序线条
		  for (let i in filter){
			let geo_data = []
		    let num = Math.floor(Math.random() * (14 - 0 + 1) ) + 0;
		    let color = this.colors[num]
		    let d = filter[i]//d就是每一条程序
			let route_name = d[0].identifier
		    for (let j in d){
				let geo = JSON.parse(d[j].geometry)
		      //每一条程序经过的不同航点部分
		      geo_data.push(geo)
			  latlngs = [
				  geo.coordinates[0][1],
				  (geo.coordinates[0][0])
			  ]
		    }
			this.preview.route_line.push(
			  this.L.geoJSON(geo_data,{color:color,weight:6.5,opacity:0.8,smoothFactor:3}).bindTooltip(route_name,{
			    permanent: true,
			    className: "preview-tag",
			    opacity: 0.6
			  })
			)
		  }
      this.e_map.setView(latlngs,9)
      }
		  document.querySelector('#enroute-chart-viewer .leaflet-tile-pane').setAttribute('id','leaflet-preview')
		  let layergroup = this.L.layerGroup(this.preview.route_line)
		  
		  this.e_map.addLayer(layergroup)
		},
        chartWindow(){
			$('#airport-chart-viewer').css('display','block')
			$('.interact').css('display','block')
			$('.overlay').css('display','none')
		},
		//工具类
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
        radiansToDegrees(radians) {
			const degrees = radians % (2 * Math.PI);
			return (degrees * 180) / Math.PI;
        },
        getTargetType(t){
            let d = t.toLowerCase()
            switch (d) {
                case 'arpt':
                    return '机场图'
                case 'sid':
                    return '离场图'
                case 'star':
                    return '进场图'
                case 'app':
                    return '进近图'
                case 'other':
                    return '其他'
                default:
                    return '其他'
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
        getVectorBorder(data){
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
            return A
        },
        standardizeRoute(route){
            //匹配数字的正则表达式
            const num_reg = new RegExp("[0-9]")
            let data = route.replace('SID ','').replace(' STAR','').split(' ')
            for (let i = 0; i < data.length; i++){
                if (data[i] == ''){
                    data.splice(i,1)
                    i--
                }
                if (data[i] == ' '){
                    data.splice(i,1)
                    i--
                }
            }
            //检测是否是起飞机场
            {if (data[0].length == 4 && !num_reg.test(data[0])){
                data.splice(0,1)
            }}
            //检测是否为落地机场
            let leng = data.length -1
            {if (data[leng].length == 4 && !num_reg.test(data[leng])){
                data.splice(leng,1)
            }}
            //检测是否为离场程序
            { let checkPoint = data[0].split('')
                if (num_reg.test(data[0]) && !num_reg.test(checkPoint[checkPoint.length-1])){
                    data.splice(0,1)
                }}
            //检测是否为进场程序
            {let leng = data.length -1
                let checkPoint = data[leng].split('')
                if (num_reg.test(data[leng]) && !num_reg.test(checkPoint[checkPoint.length-1])){
                    data.splice(leng,1)
                }}
            return data.join(' ')
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
		getIcon(t) {
			switch (t) {
            case "arpt":
            return "el-icon-position"
            case "sid":
            return "el-icon-price-tag"
            case "wpt":
            return "el-icon-place"
            case "dct":
            return "el-icon-video-play"
            case "awy":
            return "el-icon-share"
            case "vor":
            return "el-icon-aim"
            case "ndb":
            return "el-icon-aim"
            case "star":
            return "el-icon-price-tag"
            default:
            return "el-icon-place"
			}
        },
		fixLeafletLng(lng){
			let data = parseFloat(lng)
			return data < -30 ? data + 360 : data
		},
		iKnow() {
		  document.getElementsByClassName("detail")[0].style.display = "none";
		},
		getRandom(max, min) {
		  return Math.floor(Math.random() * (max - min)) + min;
		},
    changeWeatherChart(){
      $('#weather-chart-insert').attr('src',this.weatherChartValue)
    },
		d_report() {
		  $('.ofp-detail').css('display','block')
		},
		d_file() {
		  document.getElementsByClassName("detail")[0].style.display = "block";
		  document.getElementById("d-route").style.display = "none";
		  document.getElementById("d-weather").style.display = "none";
		  document.getElementById("d-report").style.display = "none";
		  document.getElementById("d-file").style.display = "block";
		},
		d_allchart(){
			this.select.pickData = []
			if (this.route.sid_word == 'SID' || this.route.star_word == 'STAR'){
			  return this.$message.error('此功能只有选择进离场程序后才可用哦~');
			}
			let sid = this.route.sid_word
			let star = this.route.star_word
			let runway = this.select.landrunway.replace('RW','')
			this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/chartlist?airport=${this.route.dep.icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
			  this.exchangeToUrl(res.data).then(d =>{
          let data = d.charts
          //遍历该机场航图
			  for (let i in data){
			    if (data[i].std_visibility == true || data[i].cao_visibility == false){
			      if (data[i].procedure_identifier == 'AIRPORT' ||
			     data[i].procedure_identifier == 'AIRPORT, AIRPORT INFO, TAKE-OFF MNMS'){
			       this.pinBoard.push([data[i],1])
			     }else if (data[i].type.section == 'DEP'){
			       for (let j in data[i].procedure_code){
			         if (sid == data[i].procedure_code[j]){
			           this.pinBoard.push([data[i],2])
			           break
			         }
			       }
			     }
			    } 
			  }
			  this.pubsub.publish('newPin',this.pinBoard)
        })
			})
			this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/chartlist?airport=${this.route.arr.icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
			  this.exchangeToUrl(res.data).then(d =>{
          let data = d.charts
          for (let k in data){
			    if (data[k].std_visibility == true || data[k].cao_visibility == false){
			      if (data[k].procedure_identifier == 'AIRPORT' ||
			     data[k].procedure_identifier == 'AIRPORT, AIRPORT INFO, TAKE-OFF MNMS'){
			       this.pinBoard.push([data[k],5])
			     }else if (data[k].type.section == 'ARR'){
			       for (let j in data[k].procedure_code){
			         if (star == data[k].procedure_code[j]){
			           this.pinBoard.push([data[k],4]) 
			           break
			         }
			       }
			     }else if (data[k].type.section == 'APP' && data[k].runway[0] == runway){
			       //优先匹配ILS
			       if (data[k].type.details.indexOf('ILS') != -1){
			       if (data[k].type.precision == 'Z'){
			         this.pinBoard.push([data[i],3])
			         break
			       }else if (data[k].type.precision == 'Y'){
			         this.pinBoard.push([data[k],3])
			         break
			       }else if (data[k].type.precision == 'X'){
			         this.pinBoard.push([data[k],3])
			         break
			       }
			       }else if (data[k].type.details.indexOf('VOR') != -1){
			         this.pinBoard.push([data[k],3])
			         break
			       }else if (data[k].type.details.indexOf('NDB') != -1){
			         this.pinBoard.push([data[k],3])
			         break
			       }
			      }
			    } 
			  }
			  this.pubsub.publish('newPin',this.pinBoard)
        })
			})
		},
		d_unload() {
		  let flag = false
		   this.$confirm('确认取消当前飞行计划', '提示', {
		      confirmButtonText: '确定',
		      cancelButtonText: '手滑了',
		      type: 'warning'
		    }).then(() => {
		      flag = true
		      $('.report-outer').css('display','none')
			  $('.ofp-detail').css('display','none')
		  for (let i in this.clickLayer){
		    this.clickLayer[i].remove()
		  }
		  for (let i in this.select.sidLayer){
		    this.select.sidLayer[i].remove()
		  }
		  for (let i in this.select.starLayer){
		    this.select.starLayer[i].remove()
		  }
		  for (let i in this.routeLayer){
			  this.routeLayer[i].remove()
		  }
		  this.clickLayer = []
		  this.select.sidLayer = []
		  this.select.starLayer = []
		  this.routeLayer = []
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
		  this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/unload?${new Date().getTime()}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
		    if (res.data.msg != 'ok'){
		      return this.$message({
		        type: 'error',
		        message: '貌似有些东西出错了~'
		      });
		    }
		  })
		},
		//交互
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
        closeSelect(){
			$('.select').css('display','none')
			for (let i in this.select.selectLayer){
				this.select.selectLayer[i].remove()
			}
			this.select.selectLayer = []
		},
		closeOfp(){
			$('.ofp-detail').css('display','none')
		},
		
		//EFB操作
		drawUserNavData(data){
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
            let zl = this.zoomlevel
            if(data.arpt && data.arpt.length){
              try {
                //根据缩放等级和坐标调整适时添加进的marker
                //机场图标分情况加载
                for (let i in data.arpt){
                    this.u_arptLayer.push(
                    this.L.marker([data.arpt[i].lat,data.arpt[i].lng],{icon:arptIcon}),
                )
                if (zl > 5){
                    const arptNameIcon = this.L.divIcon({
                    html:`${data.arpt[i].name}<br>${data.arpt[i].ICAO}`,
                    className:'arptName'
                })
                    this.u_arptLayer.push(
                    this.L.marker([data.arpt[i].lat,data.arpt[i].lng],{icon:arptNameIcon})
                )
                }
                }
              } catch (error) {
                
              }
               
            }
                //分批加载航点图标
                if (zl > 5){
                  if (data.wpt && data.wpt.length){
                    try {
                      for (let i in data.wpt){
                    //判断类型
                    if (data.wpt[i].name.length ==  3 && !new RegExp("[0-9]").test(data.wpt[i].name)){
                        //是VOR
                        this.u_wptLayer.push(
                        this.L.marker([data.wpt[i].lat,data.wpt[i].lng],{icon:vorIcon}),
                    )
                    }else if (data.wpt[i].name.length ==  2 && !new RegExp("[0-9]").test(data.wpt[i].name)){
                        //是NDB
                        this.u_wptLayer.push(
                        this.L.marker([data.wpt[i].lat,data.wpt[i].lng],{icon:ndbIcon}),
                    )
                    }else {
                        this.u_wptLayer.push(
                        this.L.marker([data.wpt[i].lat,data.wpt[i].lng],{icon:wptIcon}),
                    )
                    }
                        if (zl > 6){
                        const wptNameIcon = this.L.divIcon({
                        html:`${data.wpt[i].name}`,
                        className:'wptName'
                    })
                    this.u_wptNameLayer.push((
                        this.L.marker([data.wpt[i].lat,data.wpt[i].lng],{icon:wptNameIcon})
                    ))
                        }
                    }
                    } catch (error) {
                      
                    }
                    
                  }
                
                //分批加载航线的线段和文字
                //添加航路信息
                if (zl >= 6){
                  if (data.awy && data.awy.length){
                    try {
                      let latlngs = []
                    for (let i = 0; i < data.awy.length; i++){
                    if (i+1 != data.awy.length){
                        let a = data.awy[i]
                        let b = data.awy[i+1]
                        
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
                        let a = data.awy[i]
                        latlngs.push([a.lat,a.lng])
                        this.u_awyLayer.push(this.L.polyline(latlngs,{
                            color:'rgb(36,73,117)',
                            weight:1.8
                        }))
                    }
                    }
                    } catch (error) {
                      
                    }
                    
                  }
                
                }
                }
                if (this.e_map == undefined){
                    setTimeout(() => {
                        this.e_map.addLayer(this.L.layerGroup(this.u_arptLayer))
                        this.e_map.addLayer(this.L.layerGroup(this.u_wptLayer))
                        this.e_map.addLayer(this.L.layerGroup(this.u_wptNameLayer))
                        this.e_map.addLayer(this.L.layerGroup(this.u_awyLayer))
                        this.e_map.addLayer(this.L.layerGroup(this.u_awyNameLayer))
                    }, 4000);
                }else{
                    this.e_map.addLayer(this.L.layerGroup(this.u_arptLayer))
                    this.e_map.addLayer(this.L.layerGroup(this.u_wptLayer))
                    this.e_map.addLayer(this.L.layerGroup(this.u_wptNameLayer))
                    this.e_map.addLayer(this.L.layerGroup(this.u_awyLayer))
                    this.e_map.addLayer(this.L.layerGroup(this.u_awyNameLayer))
                }
           
        },
        addUserArptList(){
            this.worldArpt = null
            this.worldArpt = JSON.parse(JSON.stringify(this.ori_arpt))
            for (let i in this.user.arpt){
                let d = this.user.arpt[i]
                this.worldArpt.push(
                    {"user":"true","icao_code":d.ICAO,"latitude":d.lat,"longitude":d.lng,"presentation_text":d.name}
                )
            }
        },
        clickSearch(d,type,e){
            for (let i in this.clickLayer){
                this.clickLayer[i].remove()
            }
            this.clickLayer = []
            for (let i in this.search_layer){
                this.search_layer[i].remove()
            }
            this.search_layer = []
            const pointIcon = this.L.icon({
                iconUrl:marker_point,
                iconSize:[32,53],
                iconAnchor:[16,50]
            })
            if (e){
            let adiv = document.querySelectorAll("#search-result-panel .search-items");
            for (let i = 0; i < adiv.length; i++) {
                adiv[i].setAttribute("class", "search-items");
            }
            let f = e.target
            if (f.getAttribute("class") == "search-items") {
                f.setAttribute("class", "search-items active");
            } else if (f.parentNode.getAttribute("class") == "search-items") {
                f.parentNode.setAttribute("class", "search-items active");
            } else if (f.parentNode.parentNode.getAttribute("class") == "search-items") {
                f.parentNode.parentNode.setAttribute("class", "search-items active");
            }
            }
            switch (type) {
              case 'point':
              this.clickLayer.push(this.L.marker([d.latitude,this.fixLeafletLng(d.longitude)],{icon:pointIcon}))
              this.e_map.flyTo([d.latitude,this.fixLeafletLng(d.longitude)])
                break;
              case 'airway':
                let latlngs = []
                for (let i in d.segments){
                  let t = d.segments[i]
                  latlngs.push([t.latitude_start,this.fixLeafletLng(t.longitude_start)],[t.latitude_end,this.fixLeafletLng(t.longitude_end)])
                }
                this.clickLayer.push(this.L.polyline(latlngs,{color:'#FF00FF',weight:6,opacity:0.4,smoothFactor:3}))
                this.e_map.flyTo([d.segments[0].latitude_start,this.fixLeafletLng(d.segments[0].longitude_start)])
                break
              case 'geojson':
                this.clickLayer.push(this.L.geoJSON(JSON.parse(d.geometry),{color:'#1E90FF',weight:2,fillColor:'#ADFF2F',opacity:0.8,fillOpacity:0.3}))
                break
              default:
                break;
            }
            
            this.e_map.addLayer(this.L.layerGroup(this.clickLayer))
            
        },
        openArptChart(d,e){
            e.cancelBubble = true
            $('.nav-left-sidebar').css('display','block')
			      $('.report-outer').css('left','70px')
            this.closeSearch()
            $('.chart-main-list').css('display','block')
            $('#chart-list-load').css('display','block')
            this.chart.arpt = []
            this.chart.sid = []
            this.chart.star = []
            this.chart.app = []
            this.chart.other = []
            this.chart.select = []
            this.chart.select_filter = []
            if (!d.label){
                //有航图的机场
            this.prepare.search_runway = []
            this.prepare.search_sid = []
            this.prepare.search_star = []
                this.chart.target_icao = d.icao_code
                this.chart.all_data = JSON.parse(JSON.stringify(d))
                this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/chartlist?airport=${this.chart.target_icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res=>{
                  this.exchangeToUrl(res.data).then(resdata =>{
                  $('#chart-list-load').css('display','none')
                  let id = -1
                  for (let i in resdata.charts) {
                      let d = resdata.charts[i];
                      if (d.std_visibility == true || d.cao_visibility == false) {
                      id++;
                      if (d.procedure_identifier.indexOf("BRIEFING") != -1) {
                          this.chart.other.push([d, id]);
                      } else if (d.type.section == "APT") {
                          this.chart.arpt.push([d, id]);
                      } else if (d.type.section == "DEP") {
                          this.chart.sid.push([d, id]);
                      } else if (d.type.section == "ARR") {
                          this.chart.star.push([d, id]);
                      } else if (d.type.section == "APP") {
                          this.chart.app.push([d, id]);
                      } else {
                          this.chart.other.push([d, id]);
                      }
                      }
                      }
                    this.openChartList('arpt')
                })   
                })
				this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${this.chart.target_icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
					let data = res.data.sqlBase64Data
					this.prepare.search_sid = JSON.parse(JSON.parse(JSON.stringify(dataDecrypt(data.sids))))
          this.prepare.search_star = JSON.parse(JSON.parse(JSON.stringify(dataDecrypt(data.stars))))
					this.prepare.search_runway = JSON.parse(JSON.parse(JSON.stringify(dataDecrypt(data.runways))))
					this.prepare.search_app = JSON.parse(JSON.parse(JSON.stringify(dataDecrypt(data.apps))))
				})
				// this.$axios.get(`https://api.skylineflyleague.cn/efb_api/getAirportData?requireType=star&tempToken=${this.api.temp}&Airport=${this.chart.target_icao}&Access_Token=${this.Access_Token}&User_Certificate=${this.User_Certificate}&Singnature_Id=${this.Singnature_Id}&Temp_Key=${this.Temp_Key}&Expire_At=${localStorage.getItem('tempKeyExpireTime')}&verify=RSA_2048`).then(res =>{
				// 	let r = res.data
				// 	let data = JSON.parse(JSON.parse(JSON.stringify(dataDecrypt(r.slice(10,r.length)))))
				// 	this.prepare.search_star = data[0]
				// 	this.prepare.search_runway = data[1]
				// })
            }else{
                this.clickSelfChart(JSON.parse(JSON.stringify(d)))
            }
        },
        openChartList(type){
            $('.chart-main-list').css('display','block')
            this.chart.target_type = this.getTargetType(type)
            this.chart.select = this.chart[type]
            this.chart.select_filter = this.chart[type]
            this.chart_filter = ''
            let adiv = document.querySelectorAll('.list .items')
            for (let i = 0; i < adiv.length; i++){
                adiv[i].setAttribute('class','items')
            }
            $(`#list-${type}`).attr('class','items active')
            if (type == 'sid' || type == 'star' || type == 'app'){
                $('#perview').css('display','block')
            }else{
                $('#perview').css('display','none')
            }
        },
        clickSelfChart(d){
            this.chart.target_icao = d.icao
            this.chart.all_data = {"user":true,"country_code":"CHN","country_name":"China, PR of","day_light_indicator":false,"elevation":0,"iata_code":"mull","icao_code":d.icao,"ifr_capability":true,"latitude":0,"longest_runway":0,"longitude":0,"magnetic_variation":-10,"name":"TAIPING","public_military_indicator":"C","serving_city":"HARBIN","time_zone":"H","presentation_text":d.label,"charts":0}
            let id =  0
            for (let i in d.children){
                id++
                let t = d.children[i]
                switch (t.type) {
                    case 'arpt':
                        this.chart.arpt.push([{'user_chart':true,'cao_visibility':false,'file_day':t.data,'icao_airport_identifier':d.icao,'index_number':id,'procedure_identifier':t.label,'std_visibility':true,'type':{'session':'APT'}},id])
                        break;
                    case 'sid':
                        this.chart.sid.push([{'user_chart':true,'cao_visibility':false,'file_day':t.data,'icao_airport_identifier':d.icao,'index_number':id,'procedure_identifier':t.label,'std_visibility':true,'type':{'session':'DEP'}},id])
                        break;
                    case 'star':
                        this.chart.star.push([{'user_chart':true,'cao_visibility':false,'file_day':t.data,'icao_airport_identifier':d.icao,'index_number':id,'procedure_identifier':t.label,'std_visibility':true,'type':{'session':'ARR'}},id])
                        break;
                    case 'app':
                        this.chart.app.push([{'user_chart':true,'cao_visibility':false,'file_day':t.data,'icao_airport_identifier':d.icao,'index_number':id,'procedure_identifier':t.label,'std_visibility':true,'type':{'session':'APP'}},id])
                        break;
                    case 'other':
                        this.chart.other.push([{'user_chart':true,'cao_visibility':false,'file_day':t.data,'icao_airport_identifier':d.icao,'index_number':id,'procedure_identifier':t.label,'std_visibility':true,'type':{'session':'REF'}},id])
                        break;
                    default:
                        this.chart.other.push([{'user_chart':true,'cao_visibility':false,'file_day':t.data,'icao_airport_identifier':d.icao,'index_number':id,'procedure_identifier':t.label,'std_visibility':true,'type':{'session':'REF'}},id])
                        break;
                }
            }
            $('#chart-list-load').css('display','none')
            this.openChartList('arpt')
        },
        async exchangeToUrl(url){
          let result = await this.$axios.get(url)
          return result.data
        },
        clickChart(d,e){
            for (let i = 0; i < this.vectorData.length; i++) {
                this.vectorData[i].remove();
            }
            this.vectorData = [];
            if (e){
            let adiv = document.querySelectorAll(".main-display .items");
            for (let i = 0; i < adiv.length; i++) {
                adiv[i].setAttribute("class", "items");
            }
            let f = e.target
            if (f.getAttribute("class") == "items") {
                f.setAttribute("class", "items active");
            } else if (f.parentNode.getAttribute("class") == "items") {
                f.parentNode.setAttribute("class", "items active");
            } else if (f.parentNode.parentNode.getAttribute("class") == "items") {
                f.parentNode.parentNode.setAttribute("class", "items active");
            }
            }
            $('#airport-chart-viewer').css('display','block')
			$('.report-outer').css('left','70px')
            $('.interact').css('display','block')
			if ($('.nav-left-sidebar').css('display') != 'block'){
				$('.nav-left-sidebar').css('display','block')
			}
            let c = d
            if (!c[0].user_chart){
                //系统航图，不是用户航图
				//this.$axios.get(`https://api.skylineflyleague.cn/efb_api/getChartUrl?tempToken=${this.api.temp}&targetChart=${c[0].file_day.replace('.png','')}&Airport=${c[0].icao_airport_identifier}&Access_Token=${this.Access_Token}&User_Certificate=${this.User_Certificate}&Singnature_Id=${this.Singnature_Id}&Temp_Key=${this.Temp_Key}&Expire_At=${localStorage.getItem('tempKeyExpireTime')}&verify=RSA_2048`).then(res =>{
				this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/charturl?airport=${c[0].icao_airport_identifier}&cycle=${this.cycle.airac}&chart_name=${c[0].file_day.replace('.png','')}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
					if (res.data == 'failed'){
						return this.$message({
							'type':'error',
							'message':'航图加载失败，请重新加载'
						})
					}
           for (let i = 0; i < this.vectorData.length; i++) {
                this.vectorData[i].remove();
            }
            this.vectorData = [];
					if (c[0].planview){
					    //支持flight-link
					    $("#link-warning").css('display','none')
					    let B = this.getVectorBorder(d)
						let A = this.L.latLngBounds([B._northEast.lat,this.fixLeafletLng(B._northEast.lng)],[B._southWest.lat,this.fixLeafletLng(B._southWest.lng)])
					    let data = d
						this.currentBorder = [[B._northEast.lat,this.fixLeafletLng(B._northEast.lng)],[B._southWest.lat,this.fixLeafletLng(B._southWest.lng)]]
					    let t = data[0].type.section;
					    let centerLatlngs = [
					    (A._northEast.lat + A._southWest.lat) / 2,
					    (A._northEast.lng + A._southWest.lng) / 2,
					    ];
					    this.chartWidth = A._northEast.lng - A._southWest.lng
					    switch (t) {
					    case "APT":
					        this.map.setView(centerLatlngs, 14.5,{animate:false,duration:0});
					        this.arpt_zoomlevel = "14.5";
					        $('#erc').css('display','none')
					        break;
					    case "DEP":
					        this.map.setView(centerLatlngs, 9,{animate:false,duration:0});
					        this.arpt_zoomlevel = "9";
					        $('#erc').css('display','block')
					        break;
					    case "ARR":
					        this.map.setView(centerLatlngs, 9,{animate:false,duration:0});
					        this.arpt_zoomlevel = "9";
					        $('#erc').css('display','block')
					        break;
					    case "APP":
					        this.map.setView(centerLatlngs, 10,{animate:false,duration:0});
					        this.arpt_zoomlevel = "10";
					        $('#erc').css('display','block')
					        break;
					
					    default:
					        this.map.setView(centerLatlngs, 9,{animate:false,duration:0});
					        this.arpt_zoomlevel = "9";
					        $('#erc').css('display','none')
					        break;
					    }
					    let chartWidth = data[0].bbox_local[2];
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
					        res.data,
					        A
					    )
					    )
					    //设置logo和文字
					    //设置航图底部/左侧logo
					    //if (A._southWest.lat > 0 && A._northEast.lng > 0 && A._northEast.lng < 180){
					        //北半球、东半球
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
					    let height = ((A._northEast.lat - A._southWest.lat)/50)  //竖版航图的标语高度
					    let width = (height/90)*1920  //宽度
					    left = [
					        A._southWest.lat+height,//纬度
					        A._southWest.lng + (A._northEast.lng - A._southWest.lng - width)/2.4
					    ]
					    right = [
					        A._southWest.lat,
					        A._northEast.lng - (A._northEast.lng - A._southWest.lng - width)/2.4
					    ]
					    this.vectorData.push(
					        this.L.imageOverlay(h_warning,[left,right])
					    )
					    }else{
					    //横版航图
					    lng_l = A._southWest.lng
					    lng_r = A._southWest.lng+((A._northEast.lng - A._southWest.lng)/50)
					    lat_l = A._northEast.lat
					    lat_r = A._southWest.lat
					    logo_type = v_logo
					    warning_type = v_warning
					    this.vectorData.push(
					        this.L.imageOverlay(
					        v_logo,[[lat_l,lng_l],[lat_r,lng_r]]
					        )
					    )
					    let width = ((A._northEast.lng - A._southWest.lng)/60)
					    let height = (width/90)*1920
					    left = [
					        A._northEast.lat - (A._northEast.lat - A._southWest.lat - height)/2,
					        A._southWest.lng
					    ]
					    right = [
					        A._southWest.lat + (A._northEast.lat - A._southWest.lat - height)/2,
					        A._southWest.lng + width
					    ]
					    this.vectorData.push(
					        this.L.imageOverlay(v_warning,[left,right])
					    )
					    }
					    //}
						// else if (A._southWest.lat < 0 && (A._northEast.lng < 0 || A._northEast.lng > 180)){
						// 	//南半球，西半球
						// }
					   this.map.addLayer(this.L.layerGroup(this.vectorData))
					}else{
					    $("#link-warning").css('display','block')
					    let chart_url = res.data
					    let img = new Image();
						this.currentBorder = []
					    img.src = chart_url;
					    img.onload = () => {
					    this.width = img.width;
					    this.height = img.height;
					    let long_lat = parseFloat(this.height) / 1000;
					    let long_lng = parseFloat(this.width) / 1000;
					    let latlng2 = [
					        [0, 0],
					        [long_lat, long_lng],
					    ];
					    this.chartWidth = long_lng - long_lat
					    this.map.setView([long_lat / 2, long_lng / 2], 9,{animate:false,duration:0});
					    this.arpt_zoomlevel = "9";
					    $('#erc').css('display','none')
					    this.vectorData.push(
					        this.L.imageOverlay(chart_url,[latlng2])
					    )
					    //设置航图底部/左侧logo
					    let left = []
					    let right = []
					    if (long_lat >= long_lng){
					    //竖版航图
					    let lat_l = (long_lat/45) 
					    let lng_l = 0
					    let lat_r = 0
					    let lng_r = long_lng
					    this.vectorData.push(
					        this.L.imageOverlay(
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
					    let lng_r = long_lng/45
					    this.vectorData.push(
					        this.L.imageOverlay(
					        v_logo,
					        [[lat_l,lng_l],[lat_r,lng_r]]
					    )
					    )
					    let width = lng_r
					    let height = (width/90)*1920
					    left = [
					        lat_l + (lat_r - height)/2.6,
					        0
					    ]
					    right = [
					        lat_r - (lat_r - height)/2.6,
					        lng_r
					    ]
					    this.vectorData.push(
					        this.L.imageOverlay(v_warning,[left,right])
					    )
					    }
					    this.map.addLayer(this.L.layerGroup(this.vectorData))
					    }
					}
				}).catch(()=>{
          setTimeout(this.clickChart(d,e),800)
				})
                
            }else{
                //用户自定义航图
                this.showUserChart(d)
            }

        },
        showUserChart(c){
            $('#link-warning').css('display','block')
			      this.currentBorder = []
            for (let i = 0; i < this.vectorData.length; i++) {
                this.vectorData[i].remove();
            }
            this.vectorData = [];
            this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/userchart?charturl=${c[0].file_day}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
              if (res.data == 'failed') return
                let img = new Image();
                let chart_url = `https://api.skylineflyleague.cn/efb/data/user_main_data/chart_data/${c[0].file_day}?token=${res.data.token}`
                img.src = chart_url
                img.onload = () => {
                    let height = img.height
                    let width = img.width
                    let long_lat = parseFloat(height) / 1000;
                    let long_lng = parseFloat(width) / 1000;
                    let latlng2 = [
                    [0, 0],
                    [long_lat, long_lng],
                    ];
                    this.map.setView([long_lat / 2, long_lng / 2], 9,{animate:false,duration:0});
                    this.arpt_zoomlevel = "9";
                    this.vectorData.push(
                    this.L.imageOverlay(chart_url, [latlng2])
                    )
                    this.map.addLayer(this.L.layerGroup(this.vectorData));
                };
                document.getElementById('erc').style.display = 'none' 
            })   
        },
        EnroutePreview(){
            if (this.chart.all_data.user) return
            this.preview.value = ''
            this.preview.runway = []
            this.preview.data = []
            $('#airport-chart-preview').css('display','none')
            $('.preview-float').css('display','block')
          if (this.chart.target_type == '离场图'){
					if (this.prepare.search_sid.length
					&& this.prepare.search_runway.length){
						this.preview.type = '离场'
						this.preview.data = this.prepare.search_sid
						this.preview.runway = this.prepare.search_runway
					}else{
						this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${this.chart.target_icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(r =>{
							let res = r.data.sqlBase64Data
							this.preview.type = '离场'
							this.preview.data = JSON.parse(dataDecrypt(res.sids))
							this.preview.runway = JSON.parse(dataDecrypt(res.runways))
						})
					}
        }else if (this.chart.target_type == '进场图'){
            if (this.prepare.search_star.length
            && this.prepare.search_runway.length){
              this.preview.type = '进场'
              this.preview.data = this.prepare.search_star
              this.preview.runway = this.prepare.search_runway
            }else{
              this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${this.chart.target_icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(r =>{
                let res = r.data.sqlBase64Data
                this.preview.type = '进场'
                this.preview.data = JSON.parse(dataDecrypt(res.stars))
                this.preview.runway = JSON.parse(dataDecrypt(res.runways))
              })
            }
					}else if (this.chart.target_type == '进近图'){
            if (this.prepare.search_app.length && this.prepare.search_runway.length){
              this.preview.type = '进近'
              this.preview.data = this.prepare.search_app
              this.preview.runway = this.prepare.search_runway
            }else{
              this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${this.chart.target_icao}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(r =>{
                let res = r.data.sqlBase64Data
                this.preview.type = '进近'
                this.preview.data = JSON.parse(dataDecrypt(res.apps))
                this.preview.runway = JSON.parse(dataDecrypt(res.runways))
              })
            }
          }
        },
		showResult(){
			$('#sub').html("数据查询中，请稍后 ... ")
            $('#sub').css('cursor','not-allowed')
            if (
                this.form.callsign == "" ||
                this.form.dep == "" ||
                this.form.arr == "" ||
                this.form.type == "" ||
                this.form.unit == ""
            ) {
                this.$message.error('您输入的信息不完整，请注意带*的为必填项');
                $('#sub').html("一键生成航路、燃油、气象数据 ... ")
                $('#sub').css('cursor','pointer')
            } else {
                if (this.form.userTempRoute != ''){
                    let route = `${this.form.dep.toUpperCase()} SID ${this.standardizeRoute(this.form.userTempRoute)} STAR ${this.form.arr.toUpperCase()}`
                    this.route.searched = route
                    this.parseRoute(route)
                }else{
                    this.getRoute();
                }
                setTimeout(() => {
                $('#r-main').css('display','none')
                $('#sub').html("一键生成航路、燃油、气象数据 ... ")
                $('#sub').css('cursor','pointer')
                }, 2800);
            }
		},
        getRoute(){
			$('#route-data-load').css('display','block')
            this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/route?dep=${this.form.dep.toUpperCase()}&arr=${this.form.arr.toUpperCase()}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
            //this.$axios.get(`https://api.skylineflyleague.cn/efb_api/getRoute?tempToken=${this.api.temp}&Origin=${this.form.dep.toUpperCase()}&Arrival=${this.form.arr.toUpperCase()}&Access_Token=${this.Access_Token}&User_Certificate=${this.User_Certificate}&Singnature_Id=${this.Singnature_Id}&Temp_Key=${this.Temp_Key}&Expire_At=${localStorage.getItem('tempKeyExpireTime')}&verify=RSA_2048`).then(res =>{
                this.route.searched = res.data
                this.parseRoute(this.route.searched)
            })
        },
        parseRoute(route){
			$('.report-outer').css('display','block')
			this.route.eachRoute = []
			$('#route-data-load').css('display','block')
            this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/parseRoute?route=${route}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
                if (res.msg == 'failed'){
                    return this.$message.error('航路查询失败！');
                }
                let data = JSON.parse(dataDecrypt(res.data.sqlBase64Data))
                this.route.original = data
                let eachRoute = []
				        let routeData = []
                this.route.dep.icao = data.departure.icao_code
                this.route.dep.name = data.departure.name
                this.route.dep.latlng = [data.departure.latitude,this.fixLeafletLng(data.departure.longitude)]
                this.route.arr.icao = data.destination.icao_code
                this.route.arr.name = data.destination.name
                this.route.distance = data.route_distance.toFixed(1)
                this.route.arr.latlng = [data.destination.latitude,this.fixLeafletLng(data.destination.longitude)]
                eachRoute.push(
                    {"label":data.departure.icao_code,"type":"arpt","latlngs":this.route.dep.latlng}
                )
				routeData.push(
					{name:data.departure.icao_code,lat:data.departure.latitude,lng:data.departure.longitude}
				)
        if (data.expanded_route_items[0].item_data.airway_ident != 'DCT'){
           eachRoute.push(
                    {"label":"SID","type":"sid"}
                )
        }
                for (let i = 0; i < data.expanded_route_items.length; i++){
                    if (data.expanded_route_items[i].message){
                        continue
                    }
                    if (!data.expanded_route_items[i].is_valid){
                        continue
                    }
                    let d = data.expanded_route_items[i].item_data
                    if (d.airway_ident){
                        let along_route = []
                        if (i == 0){
                            along_route = [
                                this.route.dep.latlng,
                                [data.expanded_route_items[i+1].item_data.latitude,this.fixLeafletLng(data.expanded_route_items[i+1].item_data.longitude)]
                            ]
                        }else if (i == data.expanded_route_items.length - 1){
                            along_route = [
                                [data.expanded_route_items[i-1].item_data.latitude,this.fixLeafletLng(data.expanded_route_items[i-1].item_data.longitude)],
                                this.route.arr.latlng
                            ]
                        }else{
                            along_route = [
                                [data.expanded_route_items[i-1].item_data.latitude,this.fixLeafletLng(data.expanded_route_items[i-1].item_data.longitude)],
                                [data.expanded_route_items[i+1].item_data.latitude,this.fixLeafletLng(data.expanded_route_items[i+1].item_data.longitude)]
                            ]
                        }
                        eachRoute.push(
                            {"label":d.airway_ident,"type":"awy","latlngs":along_route}
                        )
                    }else if(d.object_type == 'waypoint'){
                        eachRoute.push(
                            {"label":d.presentation_text,"type":"wpt","latlngs":[d.latitude,this.fixLeafletLng(d.longitude)]}
                        )
						routeData.push(
							{name:d.presentation_text,lat:d.latitude,lng:d.longitude}
						)
                    }else if (d.object_type == 'vhf_navaid'){
                        eachRoute.push(
                            {"label":d.ident,"type":"vor","latlngs":[d.latitude,this.fixLeafletLng(d.longitude)]}
                        )
						routeData.push(
							{name:d.ident,lat:d.latitude,lng:d.longitude}
						)
                    }else if(d.object_type == 'ndb_navaid'){
                        eachRoute.push(
                            {"label":d.ident,"type":"ndb","latlngs":[d.latitude,this.fixLeafletLng(d.longitude)]}
                        )
						routeData.push(
							{name:d.ident,lat:d.latitude,lng:d.longitude}
						)
                    }
                }
            let length_2 = data.expanded_route_items.length
            if (data.expanded_route_items[length_2 - 1].item_data.airway_ident != 'DCT'){
              eachRoute.push(
                    {"label":"STAR","type":"star"}
                )
            }
            eachRoute.push(
                    {"label":"APP","type":"app"}
                )
                eachRoute.push(
                    {"label":data.destination.icao_code,"type":"arpt","latlngs":this.route.arr.latlng}
                )
				routeData.push(
					{name:data.destination.icao_code,lat:data.destination.latitude,lng:data.destination.longitude}
				)
                if (eachRoute[2].label == 'DCT'){
                    eachRoute.splice(2,1)
                }
                let leng = eachRoute.length - 1
                if (eachRoute[leng - 2] == 'DCT'){
                    eachRoute.splice(leng-2,1)
                }
                this.route.eachRoute = eachRoute
				        this.route.routeData = routeData
                this.drawRouteData()
				        this.saveTempRoute(this.route)
            })
        },
        drawRouteData(){
          this.route.original = []
            for (let i in this.routeLayer){
                this.routeLayer[i].remove()
            }
            this.routeLayer = []
			for (let i in this.select.sidLayer){
                this.select.sidLayer[i].remove()
            }
            this.select.sidLayer = []
			for (let i in this.select.starLayer){
                this.select.starLayer[i].remove()
            }
            this.select.starLayer = []
			
			$('#route-data-load').css('display','none')
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
            for (let i in this.route.eachRoute){
                let d = this.route.eachRoute[i]
                switch (d.type) {
                    case 'arpt':
                        this.routeLayer.push(
                            this.L.marker(d.latlngs,{icon:ArptIcon,opacity: 0.5})
                        )
                        break
                    case 'wpt':
                        this.routeLayer.push(
                            this.L.marker(d.latlngs,{icon:WptIcon,opacity: 0.5})
                        )
                        break
                    case 'vor':
                        this.routeLayer.push(
                            this.L.marker(d.latlngs,{icon:VORIcon,opacity: 0.5})
                        )
                        break
                    case 'ndb':
                        this.routeLayer.push(
                            this.L.marker(d.latlngs,{icon:NDBIcon,opacity: 0.5})
                        )
                        break
                    case 'awy':
                        this.routeLayer.push(
                            this.L.polyline(d.latlngs,{
                                color: "rgb(26,213,254)",
                                opacity: 0.5,
                                weight: 10,
                            })
                        )
                        break
                    default:
                        break;
                }
            }
			try{
				let dep_latlngs = [
				    this.route.eachRoute[0].latlngs,
				    this.route.eachRoute[2].latlngs,
				]
				this.select.sidLayer.push(
				    this.L.polyline(dep_latlngs,{
				    color:'rgb(245,108,108)',
				    opacity:0.5,
				    weight:10
				}))
				let leng = this.route.eachRoute.length - 2
				let arr_latlngs = [
				    this.route.eachRoute[leng - 3].latlngs,
				    this.route.eachRoute[leng].latlngs
				]
				this.select.starLayer.push(
				    this.L.polyline(arr_latlngs,{
				    color:'rgb(245,108,108)',
				    opacity:0.5,
				    weight:10
				}))
			}catch(e){
				//TODO handle the exception
			}
      this.getAcftData()         
			if (this.e_map == undefined){
				setTimeout(()=> {
					this.e_map.addLayer(this.L.layerGroup(this.routeLayer))
					this.e_map.addLayer(this.L.layerGroup(this.select.starLayer))
					this.e_map.addLayer(this.L.layerGroup(this.select.sidLayer))
				}, 4000);
			}else{
				this.e_map.addLayer(this.L.layerGroup(this.routeLayer))
				this.e_map.addLayer(this.L.layerGroup(this.select.starLayer))
				this.e_map.addLayer(this.L.layerGroup(this.select.sidLayer))
			}
				this.addRoutePrepared()
        },
		addRoutePrepared(){
			this.prepare.route_runway = []
			this.prepare.route_sid = []
			this.prepare.route_star = []
			//预存进离场数据
			let rdata = this.route.eachRoute
			this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${rdata[0].label}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
				this.prepare.route_sid = JSON.parse(dataDecrypt(res.data.sqlBase64Data.sids))
				this.prepare.route_dep_runway = JSON.parse(dataDecrypt(res.data.sqlBase64Data.runways))
			})
			this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${rdata[rdata.length - 1].label}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
				this.prepare.route_star = JSON.parse(dataDecrypt(res.data.sqlBase64Data.stars))
				this.prepare.route_arr_runway = JSON.parse(dataDecrypt(res.data.sqlBase64Data.runways))
				this.prepare.route_arr_app = JSON.parse(dataDecrypt(res.data.sqlBase64Data.apps))
			})
		},
        showWptDetail(d){
			for (let i in this.clickLayer){
			    this.clickLayer[i].remove()
			}
			this.clickLayer = []
			const pointIcon = this.L.icon({
			    iconUrl:marker_point,
			    iconSize:[32,53],
			    iconAnchor:[16,50]
			})
			if (d.type == 'arpt' || d.type == 'wpt' || d.type == 'vor' || d.type == 'ndb'){
				this.clickLayer.push(
					this.L.marker(d.latlngs,{icon:pointIcon}))
					this.e_map.flyTo(d.latlngs)
			}else if (d.type == 'awy'){
				this.clickLayer.push(
					this.L.polyline(d.latlngs,{
                    color:'rgb(245,108,108)',
                    opacity:0.8,
                    weight:10
                })
				)
				this.e_map.flyTo(d.latlngs[0])
			}else if (d.type == 'sid'){
				this.select.route = []
				this.select.runway = []
				this.select.runwayvalue = ''
				this.select.provalue = ''
        this.select.transvalue = ''
				$('.select').css('display','block')
				let airport = this.route.dep.icao
				this.select.icao = airport
				this.select.type = '离场'
				if (this.prepare.route_sid.length &&
					this.prepare.route_dep_runway.length
				){
					this.select.rwy = this.prepare.route_dep_runway
					this.select.data = this.prepare.route_sid
				}else{
					this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${airport}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
						this.select.rwy = JSON.parse(dataDecrypt(res.data.sqlBase64Data.runways))
						this.select.data = JSON.parse(dataDecrypt(res.data.sqlBase64Data.sids))
					})
				}
				
			}else if (d.type == 'star'){
				this.select.route = []
				this.select.runway = []
				this.select.runwayvalue = ''
				this.select.provalue = ''
        this.select.transvalue = ''
				$('.select').css('display','block')
				let airport = this.route.arr.icao
				this.select.icao = airport
				this.select.type = '进场'
				if (this.prepare.route_star.length &&
					this.prepare.route_arr_runway.length
				){
					this.select.rwy = this.prepare.route_arr_runway
					this.select.data = this.prepare.route_star
				}else{
					this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${airport}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
						this.select.rwy = JSON.parse(dataDecrypt(res.data.sqlBase64Data.runways))
						this.select.data = JSON.parse(dataDecrypt(res.data.sqlBase64Data.stars))
					})
				}
			}else if (d.type == 'app'){
        this.select.route = []
        this.select.runway = []
        this.select.runwayvalue = ''
        this.select.provalue = ''
        this.select.transvalue = ''
        $('.select').css('display','block')
        let airport = this.route.arr.icao
        this.select.icao = airport
        this.select.type = '进近'
        if (this.prepare.route_arr_app.length && this.prepare.route_arr_runway.length){
          this.select.rwy = this.prepare.route_arr_runway
          this.select.data = this.prepare.route_arr_app
        }else{
          this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData?airport=${airport}&cycle=${this.cycle.airac}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
						this.select.rwy = JSON.parse(dataDecrypt(res.data.sqlBase64Data.runways))
						this.select.data = JSON.parse(dataDecrypt(res.data.sqlBase64Data.apps))
					})
        }
      }
			this.e_map.addLayer(this.L.layerGroup(this.clickLayer))
        },
		saveTempRoute(route){
			this.$axios.post(`https://api.skylineflyleague.cn/efb_api_v2/syncFlight?${new Date().getTime()}`,{
				'route':JSON.stringify(this.route),'form':JSON.stringify(this.form),'Authorization':`Bearer ${localStorage.getItem('access_token')}`
				}).then(res =>{
          if (res.data.msg == 'failed'){
            return this.$message.error(`似乎出了亿些微小的问题~`)
          }
        }).catch(()=>{
				return this.$message.error(`似乎出了亿些微小的问题~`)
			})
		},
		initTempRoute(){
			if (!this.personalData.LastSyncedFlight) return
			this.$axios.get(`https://api.skylineflyleague.cn/efb_api_v2/currentSync?${new Date().getTime()}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('access_token')}`}}).then(res =>{
				this.form = res.data.form
				this.route = res.data.route
				this.drawRouteData()
				$('.report-outer').css('display','block')
			})
		},
    changeSelectTrans(){
      for (let i in this.select.appLayer){
        this.select.appLayer[i].remove()
      }
      this.select.appLayer = []
      for (let i in this.select.appFilter.legs){
        let d = this.select.appFilter.legs[i]
        if (d.is_missed_approach){
          this.select.appLayer.push(
                  this.L.geoJSON(JSON.parse(d.geometry),{
                color:'rgb(46,183,146)',
                weight:10,
                opacity:0.3,
                smoothFactor:3
              })
          )
        }else{
          if (d.transition_identifier == this.select.transvalue || d.transition_identifier == ''){
            this.select.appLayer.push(
                  this.L.geoJSON(JSON.parse(d.geometry),{
                color:'rgb(245,108,108)',
                weight:10,
                opacity:0.5,
                smoothFactor:3
              })
            )
          }
        }
      }
      this.e_map.addLayer(this.L.layerGroup(this.select.appLayer))
    },
		changeSelectPro(){
			let select = this.select.provalue
			 //绘制图
			 let geo_data = []
			for (let i in this.select.data){
			  if (this.select.data[i].identifier == select || this.select.data[i].presentation_text == select){
          if (this.select.type == '进近'){
            for (let i in this.select.appLayer){
              this.select.appLayer[i].remove()
            }
            this.select.appLayer = []
            this.select.trans = []
            this.select.appFilter = this.select.data[i]
            for (let it in this.select.data[i].transition_points){
              this.select.trans.push({name:this.select.data[i].transition_points[it]})
            }
            //console.log(JSON.parse(JSON.stringify(this.select.data[i])))
            for (let j in this.select.data[i].legs){
              let d = this.select.data[i].legs[j]
              if (d.is_missed_approach){
                this.select.appLayer.push(
                  this.L.geoJSON(JSON.parse(d.geometry),{
                color:'rgb(46,183,146)',
                weight:10,
                opacity:0.2,
                smoothFactor:3
              })
                )
              }else{
                this.select.appLayer.push(
                  this.L.geoJSON(JSON.parse(d.geometry),{
                color:'rgb(46,183,146)',
                weight:10,
                opacity:0.23,
                smoothFactor:3
              })
                )
              }
            }
            this.e_map.addLayer(this.L.layerGroup(this.select.appLayer))
            this.route.eachRoute[this.route.eachRoute.length - 2].label = select
          }else{
              for (let u in this.select.data[i].legs){
              geo_data.push(JSON.parse(this.select.data[i].legs[u].geometry))
            if (this.select.type == '离场'){
              for (let i in this.select.sidLayer){
                this.select.sidLayer[i].remove()
            }
              this.select.sidLayer = []
              this.select.sidLayer.push(
              this.L.geoJSON(geo_data,{
                color:'rgb(245,108,108)',
                weight:10,
                opacity:0.5,
                smoothFactor:3
              })
            )
            this.route.eachRoute[1].label = select
            this.route.searched.replace(this.route.sid_word,select)
            this.route.sid_word = select
            this.e_map.addLayer(this.L.layerGroup(this.select.sidLayer))
            
            }else if (this.select.type == '进场'){
              for (let i in this.select.starLayer){
                this.select.starLayer[i].remove()
              }
              this.select.starLayer = []
              this.select.starLayer.push(
              this.L.geoJSON(geo_data,{
                color:'rgb(245,108,108)',
                weight:10,
                opacity:0.5,
                smoothFactor:5
              })
            )
          let r = this.route.eachRoute
          r[r.length-3].label = select
          this.route.searched.replace(this.route.star_word,select)
            this.route.star_word = select
            this.e_map.addLayer(this.L.layerGroup(this.select.starLayer))
            }
            }
            break
          }
          }
			    
			}
		},
		changeSelectRwy(){
			this.select.provalue = ''
      this.select.transvalue = ''
      this.select.trans = []
			this.select.route = []
			let runway = this.select.runwayvalue
      this.select.transvalue = ''
      if (this.select.type == '进近'){
        //后期加入的进近程序
        this.select.data.forEach(runwayItem =>{
          if (runwayItem.runways[0] == runway){
            if (runwayItem.presentation_text.indexOf(' ') != -1){
              this.select.route.push({
              name:runwayItem.presentation_text,
              type:'',
              order:0
            })
          }else{
          }
        }
      })
          }else{
            for (let p in this.select.data){  //p：每一个程序
			  for (let r in this.select.data[p].runways){
			    //r：程序使用的跑道
			    if (runway == this.select.data[p].runways[r]){
			      let parserou = this.route.eachRoute
			      if (this.select.type == '离场'){
			        if (this.select.data[p].identifier.slice(0,2) == parserou[2].label.slice(0,2)){
			        //检测推荐跑道
			      this.select.route.push({
			        "name":this.select.data[p].identifier,
			        "type":'推荐使用',
			        "order":1
			      })
			      }else{
			      this.select.route.push({
			        "name":this.select.data[p].identifier,
			        "type":'',
			        "order":2
			      })
			      }
			      }else{
			        if (this.select.data[p].identifier.slice(0,2) == parserou[parserou.length-3].label.slice(0,2)){
			        //检测推荐跑道
			      this.select.route.push({
			        "name":this.select.data[p].identifier,
			        "type":'推荐使用',
			        "order":1
			      })
			      }else{
			        //检测推荐跑道
			      this.select.route.push({
			        "name":this.select.data[p].identifier,
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
      }
          
			
		},
		showSimlink(){
			const Icon = L.icon({
			  iconUrl: airplane,
			  iconSize: [40, 40],
			  iconAnchor: [20, 20],
			});
			setInterval(()=>{
				let suatus = localStorage.getItem('showFlightLink')
				if (suatus != 'false'){
					this.$axios.get(`https://api.skylineflyleague.cn/map/getOnlinelist?type=pilot&time=${new Date().getTime()}`).then(res =>{
						for (let i in this.pilotLayer) {
						  this.pilotLayer[i].remove()
						}
						this.pilotLayer = []
						for (let i in this.e_pilotLayer) {
						  this.e_pilotLayer[i].remove()
						}
						this.e_pilotLayer = []
						let flag = false
						let d = []
						for (let i in res.data){
							  d = res.data[i]
							if (d.cid == this.personalData.cid){
								flag = true
								this.simlink = {
									suatus:'设备连接',
									alt:d.alt,
									gs:d.gs,
									heading:d.pbh,
									actype:d.aircraft,
									squawk:d.squawk,
									lat:parseFloat(d.lat).toFixed(1),
									lng:parseFloat(d.lng).toFixed(1),
									fix_lng:this.fixLeafletLng(parseFloat(d.lng)).toFixed(1),
								}
								break
							}
						}
						if (!flag){
							this.simlink = {
								suatus:'未连接',
								alt:'---',
								gs:'---',
								heading:'---',
								actype:'---',
								squawk:'---',
								lat:'---',
								lng:'---',
								fix_lng:0,
							}
						}else{
							this.e_pilotLayer.push(
								this.L.marker([d.lat,this.fixLeafletLng(d.lng)],{icon:Icon,rotationAngle:d.pbh})
							)
						}
						//设置机场图
						if (this.currentBorder.length != 0){
							if (
								d.lat > this.currentBorder[1][0] &&
								d.lat < this.currentBorder[0][0] &&
								this.fixLeafletLng(d.lng) > this.currentBorder[1][1] &&
								this.fixLeafletLng(d.lng) < this.currentBorder[0][1]
							){
								$('#border-warning').css('display','none')
								this.pilotLayer.push(
									this.L.marker([d.lat,this.fixLeafletLng(d.lng)],{icon:Icon,rotationAngle:d.pbh})
								)
							}else{
								$('#border-warning').css('display','block')
								for (let i in this.pilotLayer) {
								  this.pilotLayer[i].remove()
								}
								this.pilotLayer = []
							}
						}
						//显示飞机图标
						this.e_map.addLayer(this.L.layerGroup(this.e_pilotLayer))
						this.map.addLayer(this.L.layerGroup(this.pilotLayer))
					})
				}
			},3200)
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
ArptDep=${this.route.dep.icao}
ArptArr=${this.route.arr.icao}
`
		      if (this.route.sid_word != 'SID'){
		        datastr += `SID=${this.route.sid_word}
`
		      }
		      if (this.route.star_word != 'STAR'){
		        datastr +=  `STAR=${this.route.star_word}
`
		      }
		      let awy_num = 1
		      let routedata = this.route.searched.split(' ')
		      for (let i = 0; i < routedata.length-1; i++){
		        if (i == 1 || i%2 == 1){
		          datastr += `Airway${awy_num}=${routedata[i].replace('STAR','DCT').replace('SID','DCT')}
Airway${awy_num}FROM=${routedata[i-1]}
Airway${awy_num}TO=${routedata[i+1]}
`
		 awy_num++
		        }
		       
		      }
		      this.downloadData(`${this.route.dep.icao}${this.route.arr.icao}01.flp`,datastr)
		            break;
		        
		          
		          case 'pmdg':
		            
		            let datastr2 = `Generated by SKYline EFB System
		
${this.route.routeData.length}
`
		let length = this.route.routeData.length-1
		            datastr2 +=`
${this.route.routeData[0].name}
1
DIRECT
1 N ${parseFloat(this.route.routeData[0].lat).toFixed(3)} E ${parseFloat(this.route.routeData[0].lng).toFixed(3)} 100
-----
1
0

1
12
-
-1000000
-1000000
`
		            for (let i = 1; i < this.route.routeData.length-1; i++){
		              datastr2 +=`
${this.route.routeData[i].name}
5
DIRECT
1 N ${parseFloat(this.route.routeData[i].lat).toFixed(3)} E ${parseFloat(this.route.routeData[i].lng).toFixed(3)}
0
0
0
`
		            }
		            datastr2 +=`
${this.route.routeData[length].name}
1
DIRECT
1 N ${parseFloat(this.route.routeData[length].lat).toFixed(3)} E ${parseFloat(this.route.routeData[length].lng).toFixed(3)} 100
-----
1
0

1
12
-
-1000000
-1000000
`
		            this.downloadData(`${this.route.dep.icao}${this.route.arr.icao}01.rte`,datastr2)
		            break
		
		          case 'qw787':
		            
		            let length2 = this.route.routeData.length-1
		            let datastr3 = `[FlightPlan]   
`
		            datastr3 += `${this.route.routeData[0].name}             ${this.route.routeData[0].lat}  ${this.route.routeData[0].lng}  APT ---
`
		            for (let i = 1; i < this.route.routeData.length-1 ; i ++){
		              datastr3 += `${this.route.routeData[i].name}            ${this.route.routeData[i].lat}   ${this.route.routeData[i].lng}   WPT ---
`
		            }
		            datastr3 += `${this.route.routeData[length2].name}             ${this.route.routeData[length2].lat}  ${this.route.routeData[length2].lng}  APT ---
`
		            this.downloadData(`${this.route.dep.icao}${this.route.arr.icao}01.RTE`,datastr3)
		           break
		
		            case 'xp11':
		              let length4 = this.route.routeData.length -1
		              let datastr4 = `I
1100 Version
CYCLE ${this.cycle.airac}
ADEP ${this.route.dep.icao}
ADES ${this.route.arr.icao}
NUMENR ${this.route.routeData.length}
`
		datastr4 += `1 ${this.route.dep.icao} ADEP 12.000000 ${this.route.routeData[0].lat} ${this.route.routeData[0].lng}
`
		              for (let i = 1; i < this.route.routeData.length-1; i++){
		                datastr4 +=`11 ${this.route.routeData[i].name} DRCT 0.000000 ${this.route.routeData[i].lat} ${this.route.routeData[i].lng}
`
		              }
		              datastr4 += `1 ${this.route.arr.icao} ADEP 12.000000 ${this.route.routeData[length4].lat} ${this.route.routeData[length4].lng}
`
		              this.downloadData(`${this.route.dep.icao}${this.route.arr.icao}01.fms`,datastr4)
		              break
		              case 'ff320':
		                let datastr5 = `RTE ${this.route.searched.replace('STAR','DCT').replace('SID','DCT')}`
		                this.downloadData(`${this.route.dep.icao}${this.route.arr.icao}01.in`,datastr5)
		              break
		                 default:
		                break;
		        //end switch
		        }
	},
	},
    mounted(){
        this.setWidth()
        if (this.e_map == undefined && this.cycle != ''){
                    this.$nextTick(()=>{
                        this.getCurrent()
                    })
        }
        this.pubsub.subscribe('personalData',(name,data)=>{
            this.personalData = data
            this.user.arpt = data.airport
            this.user.wpt = data.waypoint
            this.user.awy = data.fixedJSONAirway
            this.user.chart = data.charts
				if (this.first_load){
					this.first_load = false
					this.initTempRoute()
          this.showSimlink()
					this.drawUserNavData(JSON.parse(JSON.stringify(this.user)))
					this.addUserArptList()
				}else{
					this.drawUserNavData(JSON.parse(JSON.stringify(this.user)))
					this.addUserArptList()
				}
        })
        this.pubsub.subscribe('search',(name,data)=>{
            this.searchInfo(data)
        })
        this.pubsub.subscribe('showChart',(name,data)=>{
            this.clickChart(data)
        })
    },
    watch:{
        cycle:{
            handler(val){
                if (this.e_map == undefined && val != ''){
                    this.$nextTick(()=>{
                        this.getCurrent()
                    })
                }
            }
        },
        user:{
            handler(val){
                this.drawUserNavData(JSON.parse(JSON.stringify(val)))
            }
        },
        chart_filter:{
            handler(val){
                this.chart.select_filter = this.chart.select.filter(i => i[0].procedure_identifier.indexOf(val) != -1)
            }
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
}
</script>

<style lang="less" scoped>
@font-face {
    font-family:list-font;
    src: url(list.woff);
}
#chart-content-weaper{
        position: absolute;
        left: 0px;
        top: 50px;
        height: calc(100% - 50px);
        width: calc(100% - 60px);
		overflow: hidden;
}
#enroute-chart-viewer{
        z-index: 0;
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 100%;
}
#airport-chart-viewer{
        z-index: 8;
        position: absolute;
        left: 70px;
        top: 0px;
        height: 100%;
        width: calc(100% - 70px);
        display: none;
        background-color: rgb(39,39,39);
}
.chart-warning{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 16px;
        color: orangered;
        text-align: right;
        z-index: 99999;
        #link-warning{
            display: none;
        }
        #border-warning{
            display: none;
        }
}
#search-result-panel{
        display: none;
        top: 0px;
        position: absolute;
        left: 0px;
        height: 100%;
        overflow-y: auto;
        width: 350px;
        background-color: rgb(59,70,138);
        text-align: center;
        color: aliceblue;
        z-index: 10;
        animation: showpanel 0.4s;
        @keyframes showpanel {
            0%{
                left: -350px;
            }
            100%{
                left: 0px;
            }
        }
		
        .search-panel-load{
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
        .main-title{
            padding-top: 20px;
            position: relative;
            height: 35px;
            color: white;
            font-size:20px ;
            .close{
            float: right;
            position: relative;
            height: 35px;
            line-height: 35px;
            //width:100px;
            right: 8px;
            //left: 190px;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }
        }
        .empty-result{
            display: none;
            color: white;
            font-size: 20px;
            padding-top: 20px;
        }
        .search-items{
            position: relative;
            display: flex;
            width: 100%;
            //height: 70px;
            color: aliceblue;
            background-color: rgb(47, 57, 121);
            transition-duration: 0.4s;
            border-radius: 5px;
            cursor: pointer;
            i{
                position: relative;
                left: 10px;
                font-size: 30px;
                top: 10px;
            }
            .content{
                text-align: left;
                padding-top: 10px;
                position: relative;
                left: 20px;
                overflow: hidden;
                min-height: 36px;
                font-size: 13px;
                width: 260px;
            }
            .open{
                font-size: 25px;
                position: absolute;
                right: 10px;
                line-height: 40px;
                width: 50px;
                height: 60px;
                text-align: center;
				        z-index: 11;
            }
        }
        .search-items.active{
          border-left: 6px solid orange;
        }
        .search-items:hover{
            background-color: rgb(31, 39, 95);
            
        }     
}
@media only screen and (max-width: 700px){
		#search-result-panel{
			width: 240px;
		}
}@media only screen and (max-width: 700px){
		.search-items .content{
			width: 180px !important;
		}
    .search-items .content.arpt{
      width:120px !important;
    }
}
.nav-left-sidebar{
        display: none;
        position: absolute;
        z-index: 2;
        left: 0;
        width: 70px;
        top: 0;
        height: 100%;
        background-color: rgb(54,61,105);
        .icon{
            position: relative;
            top: 25px;
            text-align: center;
            height: 30px;
            width: 100%;
            font-size: 30px;
            color:aliceblue;
            cursor: pointer;
        }
        .arpt{
            position: relative;
            top: 50px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 4px;
            color: aliceblue;
            text-align: center;
            transition-duration: 0.3s;
            padding: 20px 0;
			font-weight: bold;
        }
        .arpt:hover{
            background-color: rgb(34, 44, 124);
        }
        .list{
            position: relative;
            margin: 5px;
            top: 60px;
            height: 300px;
            .items{
                text-align: center;
                color: aliceblue;
                font-size: 18px;
                padding: 10px 0;
                height: 40px;
                cursor: pointer;
                border-radius: 50%;
                transition-duration: 0.4s;
                margin-bottom: 10px;
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
            .num{
                font-size: 14px;
                color: skyblue;
            }
        }
        .line{
            position: absolute;
            left: 20px;
            z-index: -1;
            opacity: 0.5;
            width: 10px;
            background-color: rgb(84, 96, 175);
            height: 100%;
            border-radius: 5px;

        }
}
.info-layer-float{
        display: none;
        position: absolute;
        left: 70px;
        top: 20px;
        width: 250px;
        height: 250px;
        background-color: aliceblue;
        border-radius: 5px;
        padding: 10px;
        z-index: 20;
        .title{
            padding-top: 10px;
            position: relative;
            height: 25px;
            font-size: 17px;
            font-weight: bold;
            color: rgb(64,158,255);
            text-align: center;
            line-height: 23px;
            margin-bottom: 10px;
        }
        .content{
            background-color: rgb(230, 223, 223);
            text-align: center;
            font-size: 15px;
            padding: 10px;
        }
}
.arpt-layer-float{
        display: none;
        position: absolute;
        left: 70px;
        height: 150px;
        width: 250px;
        top: 70px;
        background-color: aliceblue;
        border-radius: 4px;
        z-index: 18;
        .title{
            position: relative;
            height: 24px;
            width: 100%;
            color: rgb(29, 128, 194);
            font-weight: bold;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            padding: 10px;
        }
        .content{
            background-color: rgb(230, 223, 223);
            text-align: center;
            font-size: 15px;
            padding: 10px;
        }
}
.chart-main-list{
        display: none;
        position: absolute;
        left: 70px;
        background-color: rgb(32,36,63);
        top: 0;
        height: 100%;
        text-align: center;
        overflow-x: hidden;
        overflow-y: auto;
        width: 350px;
        animation: showarptlist 0.4s;
        z-index: 10;
        .top{
            padding-top: 10px;
            position: relative;
            .title{
                font-size: 20px;
                color: aliceblue;
            }
            .close{
                position: absolute;
                right: 8px;
                top: 8px;
                cursor: pointer;
                font-size: 20px;
                color: white;
            }
             .filter {
                position: relative;
                margin-top: 5px;
                margin-bottom: 10px;
                margin-left: 30px;
                margin-right: 30px;
            }
            #perview{
                padding: 10px;
            }
        }
        .main-display{
            position: relative;
              .items {
                position: relative;
                padding-top: 5px;
                padding-bottom: 5px;
                width: calc(100% - 10px);
                cursor: pointer;
                background-color: rgb(45, 51, 90);
                transition-duration: 0.4s;
                margin:3px;
                border-radius: 6px;
                text-align: left;
                border-bottom: 1px solid rgb(58, 65, 110);
                .chart-name {
                position: relative;
                color: aliceblue;
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
                .pin{
                position: absolute;
                top: 5px;
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
            .items:hover{
                background-color: rgb(67, 79, 155);
            }
            .active {
                border-left: 4px solid orange;
                width: calc(100% - 14px);
            }
        }
        #chart-list-load{
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
        // .footer{
        //     position: relative;
        //     height: 90px;
        // }
    
@keyframes showarptlist {
        0%{
            left:-300px;
        }100%{
            left:60px
        }
}

}
@media only screen and (max-width: 700px){
		.chart-main-list{
			width: 250px;
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
.interact {
  display: none;
  position: absolute;
  right: 20px;
  width: 35px;
  top: 50px;
  z-index: 9999999;
  .inter {
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-top: 8px;
    background-color: rgba(20, 43, 70, 0.5);
    font-size: 28px;
    text-align: center;
    line-height: 38px;
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
.overlay {
  display: none;
  position: fixed;
  right: 20px;
  width: 35px;
  top: 130px;
  .inter {
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-top: 12px;
    background-color: rgba(20, 43, 70, 0.5);
    font-size: 28px;
    text-align: center;
    color: aliceblue;
  }
}
.preview-float{
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
  height: 215px;
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
  max-height: 75%;
  overflow: hidden auto;
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
.report-outer {
  position: absolute;
  top: 0;
  width: 300px;
  left: 0px;
  /* padding-left: 70px; */
  display: none;
  height: 100%;
  font-weight: lighter;
  z-index: 0;
  background-color: rgb(43, 49, 90);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: lighter;
  overflow: hidden auto;
  padding-bottom: 10px;
  animation: showreport 0.4s;
  button{
	  width: 200px;
  }
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
      font-size: 16px;
      position: absolute;
      left: 29%;
      line-height: 18px;
    }

    .distant {
      font-size: 14px;
      position: absolute;
      left: 73%;
    }
  }
	#route-data-load{
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
    .app {
      line-height: 30px;
      font-size: 17px;
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      border-radius: 15px;
      background-color: rgb(31, 167, 185);
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
@media only screen and (max-width: 700px){
	.report-outer{
		width: 290px;
	}
}
.ofp-detail{
	position: absolute;
	left: 15%;
	width: 70%;
	display: none;
	height: 75%;
	top: 8%;
	z-index: 7;
	background-color: white;
	border-radius: 6px;
	padding: 10px;
	overflow: auto;
	box-shadow: 1px 1px 2px gray;
	animation: showofp 0.4s;
	.close{
		position: absolute;
		right: 8px;
		top: 8px;
		font-size: 20px;
		color: gray;
		cursor: pointer;
		z-index: 8;
	}
	.route-display-span{
		background-color: orange;
		padding: 4px;
		font-size: 18px;
		font-weight: bold;
	}
	.airway-outer {
	  border-radius: 5px;
	  margin-top: 10px;
	  padding-top: 10px;
	  color: black;
	  padding-bottom: 10px;
	  position: relative;
	  width: 90%;
	  left: 5%;
	}
	
	.top-route {
	  padding-top: 10px;
	  position: relative;
	  text-align: left;
	  margin-bottom: 5px;
	  font-size: 20px;
	}
	.report {
	  position: relative;
	  width: 48.5%;
	  height: 600px;
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
	.windy-detail {
	  position: relative;
	  width: 40%;
	  float: left;
	  height: 450px;
	  margin-right: 10%;
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
	  background-color:#54b2ef;
	  color: white;
	  .button {
	    position: absolute;
	    right: 20px;
	    top: 5px;
	  }
	}
	
	.download-items:hover {
	  background-color: #289de9;
	}
}
@keyframes showofp {
	0%{
		opacity: 0.3;
		transform: scale(0.3);
	}
	100%{
		opacity: 1;
		transform: scale(1);
	}
}
</style>
<style lang="less">
.filter .el-input__inner {
  background-color: rgb(59, 70, 138) !important;
  color: aliceblue;
  border: 1px solid rgb(75, 88, 175);
}
.wptName{
  margin-left: 5px !important;
  font-size: 14px;
  color: #2181e5;
  border-radius: 3px;
  font-weight: bold;
  width: 100px !important;
  margin-top: 2px !important;
}
.awyName{
  font-size: 15px;
  font-weight: bold;
  color: #104bef;
  width:  40px !important;
}
.arptName{
  font-size: 12.5px;
  color:rgb(0,180,0);
  width:200px !important;
  margin-left:-70px !important;
  margin-top: 5px !important;
  .sub_icon{
    font-size: 14px;
  }
}
.day-mode #enroute-chart-viewer #leaflet-preview.leaflet-tile-pane{
  filter: brightness(0.2)
}
.day-mode #enroute-chart-viewer #leaflet-preview.leaflet-overlay-pane{
  filter: brightness(0.2)
}
.night-mode #enroute-chart-viewer #leaflet-preview.leaflet-tile-pane{
  filter: invert(90%) contrast(130%) brightness(20%) hue-rotate(180deg);
}
.night-mode #enroute-chart-viewer #leaflet-preview.leaflet-overlay-pane{
  filter: invert(90%) contrast(130%) brightness(20%) hue-rotate(180deg);
}
.night-mode .leaflet-overlay-pane{
   filter: invert(80%) contrast(170%) brightness(95%) hue-rotate(169deg);
}
.day-mode .leaflet-overlay-pane{
   filter: hue-rotate(19deg) contrast(1.1);
}
.night-mode .leaflet-tile-pane{
    filter: invert(90%) contrast(130%) brightness(90%) hue-rotate(180deg);
}
.night-mode #enroute-chart-viewer{
  background-color: rgb(0,19,25);
}
.leaflet-control-zoom.leaflet-bar.leaflet-control{
  position: fixed;
  right: 4px;
  width: 30px;
  bottom: 90px;
}
.night-mode .leaflet-control-zoom.leaflet-bar.leaflet-control a{
  background-color: rgb(39, 44, 77);
  border: 0;
  color: slategray;
}
.r-main label.el-form-item__label{
  color:white;
}
canvas{
z-index: 9999998;
    position: absolute;
    left: 0;
    top: 0;
    cursor: crosshair;
    width: 100%;
    height: 100%;
}

.preview-tag{
  font-size:14px;
  font-weight:bold;
  color:black !important;
}


#search-result-panel{
  .el-tabs__item{
    color: aliceblue;
    padding: 0 10px;
  }
  .el-tabs__item.is-active{
    color: black;
    border-radius: 5px;
    transition-duration: 0.2s;
  }
  .el-tabs__item.is-active#tab-airport{
    background-color: rgb(238, 183, 82);
  }
  .el-tabs__item.is-active#tab-navdata{
    background-color:aquamarine;
  }
  .el-tabs__item.is-active#tab-airway{
    background-color:rgb(215, 235, 105);
  }
  .el-tabs__item.is-active#tab-waypoint{
    background-color:rgb(81, 237, 240);
  }
  .el-tabs__item.is-active#tab-airspace{
    background-color:gold;
  }
  .el-tabs__item.is-active#tab-restrict{
    background-color:rgb(238, 129, 110);
  }
}
</style>