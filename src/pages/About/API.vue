<template>
  <div class="api-outer">
    <div class="cover">SKYline EFB开放平台 | SKYline EFB API Platform</div>
	<div class="main">
		<el-tabs tab-position="left">
		    <el-tab-pane label="概述 | API总述">
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					SKYline EFB开放平台目的在于加强模拟飞行产品开发技术交流，打造更好的模拟飞行开发环境。请勿将其用于其他任何违规操作！详情请见于 “概述 | 限制”
				</div>
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					EFB API已于2022年10月30日升级为v2版本， <a style="color:rgb(64,158,255);font-weight: bold;cursor: pointer;" @click="()=>{$router.push('/About/APIv1')}">v1版本</a>将于近期停止维护！
				</div>
				<div class="content">
					SKYline EFB主体是一个利用Vue.js框架开发、基于web平台的模拟飞行电子飞行包，为提高模拟飞行玩家创造更好的沉浸式飞行体验而开发。其对应应用程序接口则汇总在SKYline 
					EFB API开放平台中(也就是本文档)。 <br> <br>
					本篇文档将带您使用SKYline EFB的各种API。教程对应代码设计基于axios，实际使用时原理相同，可以提换为其他ajax技术使用接口。
				</div>
			</el-tab-pane>
		    <el-tab-pane label="概述 | 使用说明/功能">
				<div class="content">
					使用SKYline EFB API，可以获取以下数据：获取全球机场的详细数据、全球机场的Jeppesen航图数据、全球航路图、全球航路查询、模拟飞行常用机型飞机性能参数 <br><br>
					本教程的ajax部分基于axios。其他ajax技术原理相同，可以互换。 <br>
					可以使用以下方式安装axios：
						<pre v-highlightA>
						      <code class="html"> html: &lt;script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js"&gt;&lt;/script&gt;</code>
						      <code class="npm"> npm: npm i axios</code>
						  </pre>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="概述 | 限制">
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					请仔细阅读此部分内容，如果违反此部分限制内容造成任何损失，SKYline天际模飞俱乐部不承担任何责任！
				</div>
				<div class="title">1、禁止用于实际飞行</div>
				<div class="content">
					SKYline EFB和相应附属产品均只能被用于模拟飞行，禁止用于一切现实飞行的应用！ <br>
					EFB数据是专为模拟飞行而设计，没有现实运行许可和相应审核保障，加之全部性能数据、航路数据都是根据模拟飞行使用的数据计算得出，与现实数据误差较大，故不可用于现实飞行。
				</div> <br>
				<div class="title">2、遵守第三方应用许可</div>
				<div class="content">
					在EFB开发设计中，我们使用了第三方应用/第三方API许可。如已获得非商业许可、作为EFB主要导航数据来源的Navigraph、航路交互式地图leaflet等。
					请在使用本API前务必同意并遵守其相应许可/限制要求。
				</div> <br>
				<div class="title">3、禁止商业使用</div>
				<div class="content">
					禁止利用SKYline EFB API进行任何形式的商业使用行为。
				</div>
			</el-tab-pane>
		    <el-tab-pane label="授权 | 访问域名">
				<div class="title">概述</div>
				<div class="content">
					为方便SKYline EFB API管理，确保其使用合法性，我们要求对访问域名进行授权。经过授权后的域名将会得到一个access_token，得到后就可以正常使用API。<br>
					如果没有经过授权，服务器将会返回401 Not Authorized <br>
				</div>
				<div class="title">方法</div>
				<div class="content">
					与SKYline技术管理员联系，并附带要是用的服务、域名、申请人在平台的cid编号等信息，审核处理通过后我们将会发放给您一个user_certificate证书文件。格式为字符串，示例如下 <br>
					<pre v-highlightA>
						<code class="js">wrprX76ry5mpfxkQmqbNxuZaCtApNnDRKj8RBMtiWWzXPp+j2WSORAGokAoeXCsDemOvOvDVV4TAxL/z9p09V70555uuEyENXJZRlZz/hqbbkLG0CrM8UHMdeLlehE0x6nqb4KCRqm014huq/d8HszhdVBsCG10klgxvFJk6W7yYLlvXyW+2sNRPi/tAA/Wtjn7+RojvOpxAJs2BH/2mjYjq3LjEX/P/BzKpchhugYt6trOubro8coq3cTgJIN+ykB9CBkn2BfdkQeE622ee3/SAPo80RhS+OU6UHSroeNk=</code>
					</pre>
					之后，请访问如下链接来生成访问令牌信息
					<pre v-highlightA>
						<code class="url">https://api.skylineflyleague.cn/efb_api_v2/token?user_certificate={域名的证书文件}</code>
					</pre>
					如果成功，则会返回以下信息
					<pre v-highlightA>
						<code class="json">{
    "msg": "token generate successful",
    "type": "JWK",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0VGltZSI6MTY2NzEwMTE1OTY3NSwiZG9tYWluIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwLyIsImZ1bmN0aW9uYWxUeXBlIjoiYWNjb3VudF9jaGFydF9haXJwb3J0X2Vucm91dGVfbmF2ZGF0YSIsInVzZXJDaWQiOiIyMjg3Iiwic2lnbmVkIjoiamtjMzMwMjE0LiIsInNpZ25hdHVyZSI6IkNKOS9pNTRYVVpIcERPWnJPdXpkVytWcjN4WmxKNUsxUUFraXZiNXBFUElRck9CcCIsImlhdCI6MTY2NzEwOTAyNywiZXhwIjoxNjY3MTA5MzI3fQ.suWXdkgV038NG4t7wHCcN2sYBuACsJG5SHjhPTo-t_o",
    "expiresIn": 1800
}</code>
					</pre>
					access_token为JWK（JsonWebToken）格式，每个access_token的有效期只有30分钟，所以需要每隔30分钟向服务器申请新的token
					之后的每次访问中，请添加请求头部信息
					<pre v-highlightA>
						<code class="js">Authorization : Bearer {access_token}</code>
					</pre>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="数据 | 数据类别">
				<div class="title">1、机场数据库表设计</div>
				<div class="content">
					<el-table
					      :data="airport_db"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="表项"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="type"
					        label="类型"
					        width="180">
					      </el-table-column>
						  <el-table-column
					        prop="data"
					        label="数据示例"
					        width="180">
					      </el-table-column>
					</el-table>
				</div>
				<div class="title">2、航图列表数据库表设计</div>
				<div class="content">
					<el-table
					      :data="chart_list_db"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="表项"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="type"
					        label="类型"
					        width="180">
					      </el-table-column>
						  <el-table-column
					        prop="data"
					        label="数据示例"
					        width="180">
					      </el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="数据 | 数据样式">
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					本区域下载的数据仅限研究目的，仅供开发使用！
				</div>
				<div class="content">
					这里有SKYline EFB各个数据库文件（demo），可以选择下载研究 <br>
					其中机场数据库表、航图列表数据库表在“数据 | 数据样式”一栏已经表设计结构<br><br>
					<el-button type="primary"><a target='_black' href="https://db.api.skylineflyleague.cn/efb/sql/demo/airport_demo.sql">机场数据库</a></el-button> <br><br>
					<el-button type="primary"><a target='_black' href="https://db.skylineflyleague.cn/efb/sql/demo/airport_chart_list_demo.sql">航图列表数据库</a></el-button> <br><br>
					<el-button type="primary"><a target='_black' href="https://db.skylineflyleague.cn/efb/sql/demo/aircraft_data_dmeo.sql">主流模拟飞行机型性能数据库</a></el-button> <br><br>
					<el-button type="primary"><a target='_black' href="https://db.skylineflyleague.cn/efb/sql/demo/global_route.sql">全球导航数据/航路数据库</a></el-button> <br><br>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="接口使用 | 机场图">
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					此小节部分API数据依赖第三方软件，请确认遵守其相应许可/限制后方可使用！
				</div>
				<div class="title">1、获取机场列表</div>
				<div class="content">
					访问此接口，将得到全球机场的列表数据
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airport`)</code>
					</pre>
				</div>
				<div class="title">2、获取机场信息</div>
				<div class="content">
					访问此接口，将得到指定机场的信息，包括机场数据(db url)、进离场程序(json arrary)，表结构见于上方数据介绍
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/airportData`)</code>
					</pre>
					参数列表：
					<el-table
					      :data="airport_data_value"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="参数列表"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="data"
					        label="说明/示例"
					        width="180">
					      </el-table-column>
					    </el-table>
				</div>
				<div class="title">2、获取航图列表</div>
				<div class="content">
					访问此接口，将得到指定机场的详细航图列表(db url)，表结构见于上方数据介绍
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/chartlist`)</code>
					</pre>
					参数列表：
					<el-table
					      :data="airport_data_value"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="参数列表"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="data"
					        label="说明/示例"
					        width="180">
					      </el-table-column>
					    </el-table>
				</div>
				<div class="title">3、获取机场航图url地址</div>
				<div class="content">
					访问此接口，将得到指定航图的url地址，引入该地址即可显示此航图。航图url数据来自Navigraph，请见于”概述“
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/charturl`)</code>
					</pre>
					参数列表：
					<el-table
					      :data="chart_url_value"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="参数列表"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="data"
					        label="说明/示例"
					        width="180">
					      </el-table-column>
					    </el-table>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="接口使用 | 航路图">
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					此小节部分API数据依赖第三方软件，请确认遵守其相应许可/限制后方可使用！
				</div>
				<div class="title">1、获取当前航路图</div>
				<div class="content">
					SKYline EFB航路图依赖互动式地图组件(如leaflet)和第三方航图数据供应(Navigraph)。 <br>
					发送以下请求获取当前航路图信息
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/currentAIRAC`)</code>
					</pre>
					返回数据示例如下：
					<pre v-highlightA>
						<code class="json">{
    "airac": "2210",
    "enrouteTileId": "f757ebef98af",
    "effective": "2022年10月6日"
}</code>
					</pre>
				</div>
				<div class="title">2、加载当前航路图</div>
				<div class="info-panel">
					<i class="el-icon-warning"></i> <br>
					Navigraph开发者限制规定，非商业运行环境下Navigraph航路图仅限使用，不能用于下载。 <br>
					如需要下载对应航路图瓦片，需提供Navigraph授权与signed_cookies <br>
					而SKYline EFB在Navigraph仅拥有非商业授权许可证，故不提供相应下载服务。若您需要下载，请向Navigraph申请个人许可授权，此操作与SKYline天际模飞俱乐部无关！
				</div>
				<div class="content">
					以leaflet为例，在已经初始化的map中使用以下方式添加图层
					<pre v-highlightA>
						<code class="js">L.tileLayer(`https://enroute.charts.api.navigraph.com/${Current_Id}/${Map_Type}/{z}/{x}/{y}.png`).addTo(map)</code>
					</pre>
					其中，Current_Id是刚才获取当前航路图时返回的enrouteTileId，Map_Type为瓦片地图种类。尺寸为256x256的高空图对应如下：hd-1x，尺寸为512x512的高空图对应如下：hd-2x
				</div>
				
			</el-tab-pane>
		    <el-tab-pane label="接口使用 | 导航数据/航路">
				<div class="title">1、查询航路</div>
				<div class="content">
					使用此接口，可以获取两机场间的航路（系统生成）
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/route`)</code>
					</pre>
					参数列表：
					<el-table
					      :data="route_search_value"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="参数列表"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="data"
					        label="说明/示例"
					        width="180">
					      </el-table-column>
					    </el-table>
				</div>
				<div class="title">2、解析航路</div>
				<div class="content">
					使用此接口，可以对输入的航路进行解析，获取沿途航点具体信息、航路距离等内容
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/parseRoute`)</code>
					</pre>
					参数列表：
					<el-table
					      :data="route_parse_value"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="参数列表"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="data"
					        label="说明/示例"
					        width="180">
					      </el-table-column>
					    </el-table>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="接口使用 | 其他">
				<div class="title">1、航路图搜索信息</div>
				<div class="content">
					使用此接口，可以根据输入的数据搜索出符合的机场、航路点、航路、空域等信息
					<pre v-highlightA>
						<code class="js">axios.get(`https://api.skylineflyleague.cn/efb_api_v2/search`)</code>
					</pre>
					参数列表：
					<el-table
					      :data="search_value"
					      style="width: 100%">
					      <el-table-column
					        prop="key"
					        label="参数列表"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="data"
					        label="说明/示例"
					        width="180">
					      </el-table-column>
					    </el-table>
				</div>
			</el-tab-pane>
		  </el-tabs>
		  
	</div>
    
  </div>
</template>

<script>
export default {
  name:'API',
  data(){
	  return {
		  auth_temp_key_value:[
			  {"name":"temp_Key","data":"本次有效的Temp_Key"},
			  {"name":"expire","data":"失效时间"}
		  ],
		  auth_temp_token_value:[
			  {"name":"connect_session","data":"此次用户连接唯一标识url"},
			  {"name":"message","data":"连接状态"},
			  {"name":"token","data":"访问temp_token"}
		  ],
		  airport_db:[
			  {"key":"id",type:'INT','data':'自增'},
			  {"key":"icao",type:'char(4)','data':'ZUCK'},
			  {"key":"iata",type:'char(3)','data':'CKG'},
			  {"key":"name",type:'varchar','data':'重庆/江北'},
			  {"key":"lat",type:'float','data':'29.72'},
			  {"key":"long",type:'float','data':'106.64'},
			  {"key":"longest_runway",type:'INT','data':'3780'},
			  {"key":"elevation",type:'INT','data':'416'},
		  ],
		  chart_list_db:[
			  {"key":"id",type:'INT','data':'自增'},
			  {"key":"label",type:'varchar','data':'GUTVI, PINAB, SOSLI & UNRIX 3Y RNAV DEPS'},
			  {"key":"index_number",type:'varchar','data':'10-3B'},
			  {"key":"url_number",type:'varchar','data':'zuck10-3b_d'},
			  {"key":"url_token",type:'varchar','data':'7sg6326stwffz6s862cs52cs8'},
			  {"key":"map_availale",type:'INT','data':'1'},
			  {"key":"geography_boundary",type:'text','data':'[[30.899,108.561],[28.141,106.037]]'},
			  {"key":"type",type:'char(3)','data':'SID'},
			  {"key":"global_jeppesen",type:'INT','data':'1'}
		  ],
		  airport_data_value:[
			  {key:'airport',data:'对应机场的ICAO代码'}
		  ],
		  airport_url_value:[
			  {key:'airport',data:'查询机场的ICAO代码'},
			  {key:'chart_name',data:'对应航图名称(详见于航图数据库表)'}
		  ],
		  chart_url_value:[
			  {key:'chart_name',data:'指定航图的名称（详见于数据库表url_number）'},
			  {key:'airport',data:'机场ICAO代码'},
		  ],
		  route_search_value:[
			  {key:'dep',data:'起飞机场ICAO'},
			  {key:'arr',data:'到达机场ICAO'},
		  ],
		  route_parse_value:[
			  {key:'route',data:'具体的航路信息'},
		  ],
		  search_value:[
			  {key:'searchWord',data:'要搜索的信息(大于2位)'},
		  ],
	  }
  }
}
</script>

<style lang="less" scoped>
  .api-outer{
    position: relative;
    left: 0;
    top: 50px;
	margin-right: 100px;
    //overflow: hidden auto;
	min-width: 800px;
    .cover{
      position: sticky;
      left: 0;
      top: 0px;
      z-index: 7;
      width: 100%;
      background-color: rgb(45, 84, 124);
      color: white;
      padding-left: 100px;
      line-height: 70px;
      text-align: left;
      font-size: 24px;
    }
	.main{
		text-align: left;
		position: relative;
		top: 0px;
		height: calc(100% - 80px);
		width:100%;
	}
	.info-panel{
		position: relative;
		margin: 15px;
		padding: 15px;
		border: 2px solid rgb(24, 124, 212);
		transition-duration: 0.5s;
		border-radius: 10px;
		background-color: rgba(253,245,159,0.7);
		i{
			color: rgb(230,162,60);
			font-size: 35px;
		}
	}
	.info-panel:hover{
		border: 2px solid rgb(34, 204, 255);
	}
	.content{
		font-size: 18px;
		padding: 10px;
		margin: 20px;
		line-height: 28px;
		a{
			color: white;
			text-decoration: none;
		}
	}
	.title{
		font-size: 25px;
		font-weight: bold;
	}
    }
</style>
<style>
pre{
	margin: 0;
	padding: 0;
}

</style>