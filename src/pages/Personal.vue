<template>
  <div class="per-outer"  v-loading.fullscreen.lock="fullscreenLoading">
        <div class="self-data">
          <div class="main-title">
      本功能仅用于提升飞行规划的灵活性和交互性，请勿将其用于违法违规操作，否则后果自负! <br>
      受性能影响，建议添加数据不超过300个，否则可能引起卡顿等情况 <br>
      AIP导航数据仅限中国境内，其他地区数据请自行添加
    </div>
          <div class="title">自定义机场</div>
           <el-table
           :data="userArpt"
    style="width: 95%;left: 2.4%;border-radius: 4px"
    max-height="300px">
    <el-table-column
      label="ICAO代码"
      prop="ICAO">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="纬度"
      prop="lat">
    </el-table-column>
    <el-table-column
      label="经度"
      prop="lng">
    </el-table-column>
    <el-table-column
      align="right" style="width:40%">
          <template slot="header">
      <el-button
          size="mini"
          type="success"
          @click="addAirport">新增</el-button>
    </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'arpt')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br>
          <div class="title">自定义航路点</div>
           <el-table
           :data="userWpt"
    style="width: 95%;left: 2.4%;border-radius: 4px"
    max-height="300px">
    <el-table-column
      label="名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="纬度"
      prop="lat">
    </el-table-column>
    <el-table-column
      label="经度"
      prop="lng">
    </el-table-column>
    <el-table-column
      align="right" style="width:40%">
          <template slot="header">
      <el-button
          size="mini"
          type="success"
          @click="addWaypoint">新增</el-button>
    </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'wpt')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br>
   <div class="title">自定义航路</div>
   <el-table
           :data="userAwy"
    style="width: 95%;left: 2.4%;border-radius: 4px"
    max-height="300px">
    <el-table-column
      label="名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="起始"
      prop="start">
    </el-table-column>
    <el-table-column
      label="结束"
      prop="end">
    </el-table-column>
    <el-table-column
      align="right">
          <template slot="header">
      <el-button
          size="mini"
          type="success"
          @click="addAirway">新增</el-button>
    </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row,'awy')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="title">自定义机场图</div>
  <div class="action">
    <el-button @click="addChartName" type="primary">添加机场</el-button>
    <el-button @click="addChartData" type="success">添加航图</el-button>
  </div>
   
  <br>
  <div class="custom-tree-container">
    <el-tree
        :data="userChart"
        node-key="id"
        accordion
        :expand-on-click-node="true"
        :render-content="renderContent">
      </el-tree>
  </div>
    <div class="title">X-Plane导航数据在线转换为Fenix数据</div>
  <div class="action">
    <el-button @click="addXPData" type="success">开始转换</el-button>
    <div>历史记录</div>
     <el-table
           :data="history"
    style="width: 95%;left: 2.4%;border-radius: 4px"
    max-height="300px">
    <el-table-column
      label="文件名称"
      prop="name">
    </el-table-column>
    <el-table-column
      align="right" style="width:40%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="downloadFinalFile(scope.row.name,scope.row.url)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <br>
  <el-button @click="uploadData" id="upload-action" type="success">保存数据</el-button>
        </div>
        <div id="ed-wpt" class="add">
          <div @click="closeAddPanel('ed-wpt')" class="close"><i class="el-icon-circle-close"></i></div>
          <div>请注意，经纬度单位与AIP航路图保持一致，如34°21.12'，不要使用度分秒格式。<br> 输入成功后系统会自动转换为地图识别的小数模式如(34.325)</div><br>
          名称
          <el-input v-model="addWpt.name" style="position:relative;width:60%" class="input-items" placeholder="航路点名称"></el-input>
          <br><br>
          纬度
          <el-input v-model="addWpt.lat_d" class="input-items" placeholder="°" style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addWpt.lat_m" class="input-items" placeholder="‘" style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addWpt.lat_s" class="input-items" placeholder="." style="width:80px" type="number"></el-input>&nbsp;
          <br><br>
          经度
          <el-input v-model="addWpt.lng_d" class="input-items" placeholder="°"  style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addWpt.lng_m" class="input-items" placeholder="‘"  style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addWpt.lng_s" class="input-items" placeholder="." style="width:80px" type="number"></el-input>&nbsp;
          <br><br>
          <el-button @click="uploadWpt" type="success">添加数据</el-button>
        </div>
        <div id="ed-arpt" class="add">
          <div @click="closeAddPanel('ed-arpt')" class="close"><i class="el-icon-circle-close"></i></div>
          <div>请注意，经纬度单位与AIP航路图保持一致，如34°21.12'，不要使用度分秒格式。<br> 输入成功后系统会自动转换为地图识别的小数模式如(34.325)</div><br>
          ICAO代码
          <el-input v-model="addArpt.ICAO" style="position:relative;width:60%" class="input-items" placeholder="机场ICAO代码"></el-input>
          <br><br>
          机场名称
          <el-input v-model="addArpt.name" style="position:relative;width:60%" class="input-items" placeholder="机场名称"></el-input>
          <br><br>
          纬度
          <el-input v-model="addArpt.lat_d" class="input-items" placeholder="°" style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addArpt.lat_m" class="input-items" placeholder="‘" style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addArpt.lat_s" class="input-items" placeholder="." style="width:80px" type="number"></el-input>&nbsp;
          <br><br>
          经度
          <el-input v-model="addArpt.lng_d" class="input-items" placeholder="°"  style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addArpt.lng_m" class="input-items" placeholder="‘"  style="width:80px" type="number"></el-input>&nbsp;
          <el-input v-model="addArpt.lng_s" class="input-items" placeholder="." style="width:80px" type="number"></el-input>&nbsp;
          <br><br>
          <el-button @click="uploadArpt" type="success">添加数据</el-button>
        </div>
        <div id="ed-awy" class="add">
          <div @click="closeAddPanel('ed-awy')" class="close"><i class="el-icon-circle-close"></i></div>
          <div>请将航线沿途航点按顺序填入，以空格分隔。对于中国AIP数据库以外的航点，请先在上方“自定义航路点”中添加，然后使用本功能</div><br>
          <div>航线输入示例：EKUTI UNDPR ZHG SAKUI</div>
          名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="addAwy.name" style="position:relative;width:60%" class="input-items" placeholder="航路名称"></el-input>
          <br><br>
          沿途航点
          <el-input type="textarea" v-model="addAwy.route" style="position:relative;width:60%" class="input-items" placeholder="经过的航点，空格分隔"></el-input>
          <br><br>
          <el-button @click="uploadAwy" type="success">添加数据</el-button>
        </div>
        <div id="ed-chart-name" class="add">
          <div @click="closeAddPanel('ed-chart-name')" class="close"><i class="el-icon-circle-close"></i></div>
          <div>添加自定义航图所在的机场，添加成功后对应内容及文件将会显示在机场图列表中</div><br>
          机场名称
          <el-input v-model="addChart.name" style="position:relative;width:60%" class="input-items" placeholder="机场名称"></el-input>
          <br><br>
          机场ICAO
          <el-input v-model="addChart.icao" style="position:relative;width:60%" class="input-items" placeholder="机场ICAO"></el-input>
          <br><br>
          <el-button @click="uploadChartName" type="success">添加数据</el-button>
        </div>
        <div id="ed-xplane" class="add">
          <div @click="closeAddPanel('ed-xplane')" class="close"><i class="el-icon-circle-close"></i></div>
          <div>点击上传您X-Plane的导航数据文件(.dat后缀),并输入其中的航点信息</div>
          <div>不保证转换后数据完善性</div> <br>
          上传文件
          <el-upload
          class="input-items"
          style="position:relative;width:60%"
          drag
          accept=".dat"
          :before-upload="getX_PlaneData"
          action="https://upload.api.skylineflyleague.cn/encrypted?type=1"
          :limit="1">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" style="color:white" slot="tip">只能上传dat类型的文件,且不超过3M</div>
        </el-upload>
          航点信息
          <el-input type="textarea" v-model="xplane.wpt" style="position:relative;width:60%" class="input-items" placeholder="航路点信息"></el-input> <br><br>
          ID自增点
          <el-input type="number" min="0" max="9999999" v-model="xplane.startpoint" style="position:relative;width:60%"  class="input-items" placeholder="输入0-9999999内的数字"></el-input> <br><br>
          机场ICAO
          <el-input type="textarea" v-model="xplane.airport" style="position:relative;width:60%" class="input-items" placeholder="机场ICAO"></el-input> <br> <br>
          <!-- 转换文件类型
           <el-select style="position:relative;width:60%" class="input-items" v-model="xplane.format" filterable placeholder="请选择转换后文件类型">
            <el-option label="xls" value="xls"></el-option>
            <el-option label="xlsx" value="xlsx"></el-option>
            <el-option label="csv" value="csv"></el-option>
          </el-select>
          <br><br>  -->
          <el-button @click="getFinexFile" type="success">立即转换</el-button>
        </div>
        <div id="ed-chart-file" class="add">
          <div @click="closeAddPanel('ed-chart-file')" class="close"><i class="el-icon-circle-close"></i></div>
          <div>上传航图仅支持图片格式的文件，如需上传pdf请提前利用工具转换为png后上传。</div>
          <div>如需更新航图，直接输入相同名称覆盖即可</div>
          <div>将航图文件上传到指定航图列表中，上传需要一定时间</div><br>
          对应机场
          <el-select style="position:relative;width:60%" class="input-items" v-model="file_value" filterable placeholder="请选择对应机场">
            <el-option
              v-for="item in userChart"
              :key="item.id"
              :label="item.label"
              :value="item.icao">
            </el-option>
          </el-select>
          <br><br>
          航图名称
          <el-input v-model="addChartFile.name" style="position:relative;width:60%" class="input-items" placeholder="航图名称"></el-input> <br><br>
          航图类型
          <el-select style="position:relative;width:60%" class="input-items" v-model="addChartFile.type" filterable placeholder="请选择航图对应类型">
            <el-option label="机场图" value="arpt"></el-option>
            <el-option label="离场图" value="sid"></el-option>
            <el-option label="进场图" value="star"></el-option>
            <el-option label="进近图" value="app"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
          <br><br>
          上传文件
          <el-upload
          class="input-items"
          style="position:relative;width:60%"
          drag
          accept="image/*"
          :before-upload="getChartFile"
          action="https://upload.api.skylineflyleague.cn/encrypted?type=1"
          :limit="1">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" style="color:white" slot="tip">只能上传图片类型的文件,且不超过3M</div>
        </el-upload>
          <br><br>
          <el-button @click="uploadChartData" type="success">上传数据</el-button>
        </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { downloadRes } from '@/utils/download';
import { getRandomString } from '@/utils/num';
import { dataDecrypt } from '@/utils/cryptoJS';
export default {
    name:'Personal',
    props:['setWidth','cycle'],
    data(){
        return {
            personalData:[],
            getUser:'',
            fullscreenLoading: false,
            file_value:'',
            history:[],
            userWpt:[],
            userAwy:[],
            userArpt:[],
            userNewAwy:[],
            userChart:[],
            aip_awy:[],
            formated:[],
            haveload:[],
            addWpt:{
              name:'',
              lat_d:'',
              lat_m:'',
              lat_s:'',
              lng_d:'',
              lng_m:'',
              lng_s:''
            },
            addAwy:{
              name:'',
              route:''
            },
           addArpt:{
            ICAO:'',
            name:'',
            lat_d:'',
            lat_m:'',
            lat_s:'',
            lng_d:'',
            lng_m:'',
            lng_s:''
           },
           addChart:{
            name:'',
            icao:''
           },
           addChartFile:{
            name:'',
            file_name:'',
            type:'',
            file:''
           },
           xplane:{
            wpt:'',
            startpoint:'',
            airport:'',
            file:'',
            format:''
           },
           
        }
    },
    methods:{
    renderContent(h, { node, data}) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="danger" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      },
       remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      downloadHistory(index, row){
        console.log([index,row])
      },
      getExchangeHistory(){
       this.$axios.get(`https://api.skylineflyleague.cn/efb/NavExchanger/Controller/GetUserFile.php?username=${this.personalData.cid}&token=${getRandomString(20)}`).then((res)=>{
        if (typeof(res.data) == 'string') return
        for (let i = 0; i < res.data.total; i++){
          this.history.push({"name":res.data[i][i],"url":res.data[i].url} )
        }
       })
      },
    initNavData(){
      this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/Enroute_Database/v2/awy.db?cycle=${this.cycle}`).then((res)=>{
        let resdata = res.data
        let data = JSON.parse(dataDecrypt(resdata.slice(10,resdata.length)))
        this.aip_awy = data
      })

    },
    getX_PlaneData(e){
      if (e.name.indexOf('.dat') == -1) return this.$message({
                                                                type: 'error',
                                                                message: '请上传.dat后缀的文件'
                                                              }); 
      if (e.size > 3151601) return this.$message({
                                                                type: 'error',
                                                                message: '文件体积过大'
                                                              }); 
      
      this.xplane.file = e
        this.$message({
                  type: 'success',
                  message: '文件添加成功'
                })
    },
    getChartFile(e){

      if (e.type.indexOf('image/') == -1) return this.$message({
                                                                type: 'error',
                                                                message: '请上传图片类型的文件'
                                                              }); 
      if (e.size > 3151601) return this.$message({
                                                                type: 'error',
                                                                message: '文件体积过大'
                                                              });
      this.addChartFile.file = e
      this.addChartFile.file_name = e.name
    },
    getFinexFile(){
      if (this.xplane.airport.length != 4) return this.$message({
                                                                type: 'error',
                                                                message: '机场ICAO为四位'
                                                              })
      if (this.xplane.startpoint < 0 || this.xplane.startpoint > 9999999) return this.$message({
                                                                type: 'error',
                                                                message: 'ID自增数值不合法'
                                                              })
      this.fullscreenLoading = true;
      this.$axios.post(`https://api.skylineflyleague.cn/efb/NavExchanger/Controller/SendNavdata.php?Wpt=${this.xplane.wpt}&startpoint=${this.xplane.startpoint}&airport=${this.xplane.airport.toUpperCase()}`,this.xplane.file).then((res)=>{

      }).then(()=>{
        let url = `https://api.skylineflyleague.cn/efb/NavExchanger/output/${this.personalData.cid}/${this.xplane.airport.toUpperCase()}.xls?token=${getRandomString(15)}`
        let name = `${this.xplane.airport.toUpperCase()}.xls`
        this.downloadFinalFile(name,url)
      }).catch(()=>{
        this.fullscreenLoading = false;
        return this.$message({
                        type: 'error',
                        message: '转换失败'
                      })
      })
    },
    downloadFinalFile(name,url){
     this.$axios({
        method: 'get',
        url: url,
        responseType: 'blob'
    }).then((res)=>{
        this.fullscreenLoading = false;
        let url = window.URL.createObjectURL(new Blob([res.data]))
        downloadRes(name,url)
         this.xplane = {
            wpt:'',
            startpoint:'',
            airport:'',
            file:'',
            format:''
           }
    })
    },
    initUserData(){
      if (this.personalData.waypoint){
           this.userWpt = JSON.parse(JSON.stringify(this.personalData.waypoint))
      }
      if (this.personalData.airway){
          this.userAwy = JSON.parse(JSON.stringify(this.personalData.airway))
      }
      if (this.personalData.airport){
          this.userArpt = JSON.parse(JSON.stringify(this.personalData.airport))
      }
      if (this.personalData.fixedJSONAirway){
          this.userNewAwy = JSON.parse(JSON.stringify(this.personalData.fixedJSONAirway))
      }
      if (this.personalData.charts){
          this.userChart = JSON.parse(JSON.stringify(this.personalData.charts))
      }
    },
      handleDelete(index, row,type) {
        switch (type) {
          case 'arpt':
            this.userArpt.splice(index,1)
            break;
          case 'wpt':
            this.userWpt.splice(index,1)
            break;
          case 'awy':
             this.userAwy.splice(index,1)
             let data = row.name
             for (let i = 0; i<this.userNewAwy.length; i++){
              if (data == this.userNewAwy[i].name){
                this.userNewAwy.splice(i,1)
                i--
              }
             }
            break;
          default:
            break;
        }
      },
      addWaypoint(){
        document.getElementById('ed-wpt').style.display = 'block'
      },
      addAirway(){
        document.getElementById('ed-awy').style.display = 'block'
      },
      addAirport(){
        document.getElementById('ed-arpt').style.display = 'block'
      },
      addXPData(){
        document.getElementById('ed-xplane').style.display = 'block'
      },
      addChartName(){
        document.getElementById('ed-chart-name').style.display = 'block'
      },
      addChartData(){
        document.getElementById('ed-chart-file').style.display = 'block'
      },
      closeAddPanel(ele){
        document.querySelector(`#${ele}`).style.display = 'none'
      },
      uploadArpt(){
        if (!this.addArpt.lat_d || !this.addArpt.lng_d) return this.$message.error('数据填写不完整！')
        let data = {"ICAO":this.addArpt.ICAO.toUpperCase(),"name":this.addArpt.name,"lat":this.formatData('lat','arpt'),"lng":this.formatData('lng','arpt')}
        this.userArpt.push(data)
        this.addArpt = {
            ICAO:'',
            name:'',
            lat_d:'',
            lat_m:'',
            lat_s:'',
            lng_d:'',
            lng_m:'',
            lng_s:''
           }
        document.getElementById('ed-arpt').style.display = 'none'
      },
      uploadWpt(){
        if (!this.addWpt.lat_d || !this.addWpt.lng_d) return this.$message.error('数据填写不完整！')
        let data = {"name":this.addWpt.name.toUpperCase(),"lat":this.formatData('lat','wpt'),"lng":this.formatData('lng','wpt')}
        this.userWpt.push(data)
        this.addWpt = {
              name:'',
              lat_d:'',
              lat_m:'',
              lat_s:'',
              lng_d:'',
              lng_m:'',
              lng_s:''
            },
        document.getElementById('ed-wpt').style.display = 'none'
      },
      uploadChartName(){
        let data = {"id":`${getRandomString(6)}`,'label':`${this.addChart.name}(${this.addChart.icao.toUpperCase()})`,'icao':this.addChart.icao.toUpperCase(),'children':[]}
        this.userChart.push(data)
        this.addChart = {
          name:'',
          icao:''
        }
        document.getElementById('ed-chart-name').style.display = 'none'
      },
      uploadChartData(){
        //axios上传数据 ?username&airport&filename , {base64}
        this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/chartupload.php?username=${this.personalData.cid}&airport=${this.file_value}&filename=${this.addChartFile.file_name}`,this.addChartFile.file).catch(()=>{
          this.$message({
            type:'error',
            message:'航图文件上传失败！'
          })
        })
        //整合到机场列表的children里面
        for (let i in this.userChart){
          if (this.userChart[i].icao == this.file_value){
            this.userChart[i].children.push(
              {'id':`${getRandomString(5)}`,'label':this.addChartFile.name,'data':`${this.personalData.cid}/${this.file_value}/${this.addChartFile.file_name}.png`,'type':this.addChartFile.type}
            )
          }
        }
        this.addChartFile = {
            name:'',
            file_base64:'',
            file_name:''
           }
        document.getElementById('ed-chart-file').style.display = 'none'
      }, 
      uploadAwy(){
        let data = this.addAwy.route.trim().split(' ')
        let result = this.checkAwy(data)
        if (result == 'no_filter'){
          return this.$message({
            type:'error',
            message:'貌似有未识别的航点'
          })
        }
        this.userNewAwy = result
        let t = this.addAwy.route.toUpperCase().split(' ')
        this.userAwy.push({"name":this.addAwy.name.toUpperCase(),"start":t[0],"end":t[t.length -1]})
        this.addAwy.name = ''
        this.addAwy.route = ''
        document.getElementById('ed-awy').style.display = 'none'
      },
      checkAwy(data){
        let array = JSON.parse(JSON.stringify(this.userNewAwy))
        let leng = 0
        //逐一检查每个航点的坐标信息
        //返回json：{"name":"H24","point":"P98","lat":"23.445","lng":"124.78"}
        for (let i in data){
          let flag = false
          for (let j in this.userWpt){
            //自定义数据优先
            let d = this.userWpt[j]
            if (data[i].toUpperCase() == d.name){
              array.push(
                {"name":this.addAwy.name.toUpperCase(),"point":d.name,"lat":d.lat,"lng":d.lng}
              )
              leng++
              flag = true
              break
            }
          }
          if (!flag){
            //自定义数据没有，开始读取AIP数据库
            for (let j in this.aip_awy){
              let d = this.aip_awy[j]
              if (data[i].toUpperCase() == d.point){
                array.push({"name":this.addAwy.name.toUpperCase(),"point":d.point,"lat":d.lat,"lng":d.lng})
                leng++
                break
              }
            }
          }
        }
        return leng == data.length ? array : 'no_filter'
      },
      uploadData(){
         this.fullscreenLoading = true;
        document.getElementById('upload-action').innerHTML = '数据上传中...'
        document.getElementById('upload-action').style.cursor = 'not-allowed'
          this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/userwpt.php?username=${this.personalData.cid}`,this.userWpt).then((res)=>{
            this.haveload.push('1')
          })
          this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/userawy.php?username=${this.personalData.cid}`,this.userAwy).then((res)=>{
            this.haveload.push('2')
          })
          this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/usernewawy.php?username=${this.personalData.cid}`,this.userNewAwy).then((res)=>{
            this.haveload.push('3')
          })
          this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/userarpt.php?username=${this.personalData.cid}`,this.userArpt).then((res)=>{
             this.haveload.push('4')
          })
          this.$axios.post(`https://api.skylineflyleague.cn/efb/data/main/userchart.php?username=${this.personalData.cid}`,this.userChart).then((res)=>{
            this.haveload.push('5')
          })

      },
      formatData(type,el){
        if (el == 'wpt'){
          if (type == 'lat'){
          let xiaoshu = parseFloat(`${this.addWpt.lat_m}.${this.addWpt.lat_s}`)/60
          let result = (parseInt(this.addWpt.lat_d)+xiaoshu).toFixed(4)
          return result
        }else if (type == 'lng'){
          let xiaoshu = parseFloat(`${this.addWpt.lng_m}.${this.addWpt.lng_s}`)/60
           let result = (parseInt(this.addWpt.lng_d)+xiaoshu).toFixed(4)
           return result
        }
        }else if (el == 'arpt'){
          if (type == 'lat'){
          let xiaoshu = parseFloat(`${this.addArpt.lat_m}.${this.addArpt.lat_s}`)/60
          let result = (parseInt(this.addArpt.lat_d)+xiaoshu).toFixed(4)
          return result
        }else if (type == 'lng'){
          let xiaoshu = parseFloat(`${this.addArpt.lng_m}.${this.addArpt.lng_s}`)/60
           let result = (parseInt(this.addArpt.lng_d)+xiaoshu).toFixed(4)
           return result
        }
        }
        
      }
    },
    mounted(){
      this.initUserData()
      this.initNavData()
      this.getExchangeHistory()
      this.setWidth()
      this.pub1 = this.pubsub.subscribe('personalData',(name,data)=>{
            this.personalData = data
            if (data.airport){
              this.userArpt = data.airport
            }
            if (data.waypoint){
              this.userWpt = data.waypoint
            }
            if (data.airway){
              this.userAwy = data.airway
            }
            if (data.fixedJSONAirway){
              this.userNewAwy = data.fixedJSONAirway
            }
            if (data.charts){
              this.userChart = data.charts
            }
        })
      this.pub2 = this.pubsub.subscribe('getUser',(name,data)=>{
        this.getUser = data
      })
    },
    beforeDestroy(){
      this.pubsub.unsubscribe(this.pub1)
      this.pubsub.unsubscribe(this.pub2)
    },
    watch:{
      personalData:{
        deep:true,
        handler(){
          this.initUserData()
        }
      },
      u_newAwyData:{
        deep:true,
        handler(){
          this.initUserData()
        }
      },
      haveload:{
        handler(val){
          if (val.length >= 5){
            this.getUser(1,1,1,1,1,this.personalData.cid)
            this.fullscreenLoading = false
          }
        }
      }
    }
}
</script>

<style scoped lang="less">
    .per-outer{
        position: fixed;
        left: 0px;
        width: 100%;
        top: 50px;
        height: calc(100% - 50px);
        background-color: rgb(39,39,39);
        overflow:auto;
        
        .self-data{
          float: left;
          top: 4%;
          min-width: 430px;
          position: relative;
          left: 10%;
          width: 80%;
          padding: 10px;
          padding-top: 5px;
          margin: 20px;
          background-color: rgb(41, 46, 88);
          border: 3px solid rgb(51, 57, 112);
          .main-title{
          position: relative;
          font-size: 20px;
          text-align: center;
          color: aliceblue;
        }
          .title{
            padding: 10px;
            font-size: 26px;
            color: aliceblue;
            text-align: center;
          }
        }
        @keyframes showself {
          0%{
            opacity: 0.3;
            transform: scale(0.3);
          }
          100%{
            opacity: 1;
            transform: scale(1);
          }
          
        }
        .add{
          animation: showself 0.2s;
          display: none;
          top: 10%;
          position: fixed;
          left: 20%;
          width: 60%;
          padding: 20px;
          z-index: 2;
          opacity: 0.96;
          background-color: rgb(55, 79, 182);
          border-radius: 8px;
          color: aliceblue;
          line-height: 25px;
          .input-items{
            position: relative;
            left: 10%;
            text-align: center;
          }
          .close{
            position: absolute;
            right: 5px;
            top: 3px;
            font-size: 20px;
            cursor: pointer;
          }
        }
        .action{
          position: relative;
          background-color: white;
          border-radius: 5px;
          text-align: center;
          padding: 10px;
        }
    }
   
</style>
<style>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .el-tree-node {
    white-space: nowrap;
    outline: 0;
    padding: 10px;
}
.el-upload-dragger .el-icon-upload{
  line-height: 0px;
}
.el-upload-dragger{
  height: 100px;
}
</style>