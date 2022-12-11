<template>
  <div id="other-outer">
    <div class="chart-select">
      <el-select
        class="el-select"
        auto-complete="false"
        v-model="SelectOther"
        filterable
        placeholder="输入航图名称筛选"
      >
        <el-option
          v-for="item in OtherList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div class="wall"></div>
      <el-tabs tab-position="top" v-model="activedChartTab" @tab-click="handleClick">
        <el-tab-pane class="chart-tab" id="tab-ref" label="其他航图 Other Charts" name="OTHER1">
          <div
            class="chart-items"
            v-for="a in OtherList"
            :key="a.id"
            @click="clickChart(a.id, selectId, $event)"
          >
            <div class="title">{{ a.name.slice('0','30') }}</div>
            <div class="tit">其他航图</div>
          </div>
        </el-tab-pane>
        
      </el-tabs>
    </div>
    <div id="chart-display" :class="showNightMode()">
      <iframe frameborder="0"></iframe>
      <div id="vector-display">
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomString } from '@/utils/num';
export default {
  name: "Other",
  data() {
    return {
      width: 0,
      //是
      activedChartTab: "OTHER1",
      SelectOther: "",
      path:'',
      OtherList: [],
      selectId: "",
      arpt_or_data: "",
      SelectOther: [],
      pindPdfChart: [],
      vectorData: [],
      width: "",
      height: "",
	  token:'',
    };
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
    initOtherData() {
      this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/SUP_OTHER_CHECKLIST_Database/other.json?token=${this.token}`).then((res) => {
        let d = res.data
    //   this.$axios
    //     .get(`./cycle/${this.cycle}/sup/sup.json`)
    //     .then((res) => {
          for (let i = 0; i < d.length; i++) {
            this.OtherList.push({ id: d[i].id, name: d[i].label });
          }
        });
    },
    setOtherChart(e) {
      this.selectId = e;
      let that = this;
      this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/SUP_OTHER_CHECKLIST_Database/other.json?token=${this.token}`).then((res) => {
        let d = res.data
          for (let i = 0; i < d.length; i++) {
            this.SelectOther.push(d[i])
          }
        });
    },
    clickChart(a, b, e) {
      //还原其他航图颜色
      let allCharts = document.getElementsByClassName("chart-items");
      for (let i = 0; i < allCharts.length; i++) {
        allCharts[i].setAttribute("class", "chart-items");
      }
      //判断父节点是否为chart-items
      if (e.target.getAttribute("class") == "chart-items") {
        e.target.setAttribute("class", "chart-items active");
        //不是，就继续向上找父节点
      } else if (e.target.parentNode.getAttribute("class") == "chart-items") {
        e.target.parentNode.setAttribute("class", "chart-items active");
      } else if (
        e.target.parentNode.parentNode.getAttribute("class") == "chart-items"
      ) {
        e.target.parentNode.parentNode.setAttribute(
          "class",
          "chart-items active"
        );
      } else {
        //否则，不找了
        this.$notify({
          title: "操作失败",
          message: `无法将事件节点所在元素设置点击效果`,
          type: "error",
        });
      }
      this.$axios
        this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/SUP_OTHER_CHECKLIST_Database/other.json?token=${this.token}`).then((res) => {
        let d = res.data
          for (let i = 0; i < d.length; i++) {
            if (a == d[i].id) {
                this.drawPdfChart(d[i]);
          }
          }
        });
    },
    drawPdfChart(c) {
      try {
        for (let i = 0; i < this.vectorData.length; i++) {
          this.vectorData[i].remove();
        }
        this.vectorData = [];
      } catch (error) {}
      let p = document.getElementById("chart-display");
      try {
        let iframe = document.getElementsByTagName("iframe")[0];
        p.removeChild(iframe);
      } catch (err) {}
      let pdf_path = c.pdfPath;
      let app_iframe = document.createElement("iframe");
      app_iframe.setAttribute("class", "chart-iframe");
      app_iframe.style.zIndex = "99999";
      app_iframe.setAttribute(
        "src",
        `./pdf/web/viewer.html?file=https://api.skylineflyleague.cn/EFBNavData/SUP_OTHER_PDF/OTHER/${pdf_path}.pdf`
      );
      p.append(app_iframe);
    },
    
  },

    props:['setWidth','cycle'],
  mounted() {
	  this.token = getRandomString(24)
    this.setWidth()
    this.initOtherData()
  },
};
</script>

<style scoped lang='less'>
#other-outer {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  height: 100%;
  left: 0px;
  background-color: rgb(32, 36, 63);
}
.night-mode {
  filter: invert(90%) contrast(150%) brightness(80%) hue-rotate(180deg);
}
.day-mode {
  filter: invert(0%) contrast(100%) brightness(100%);
}
.chart-select {
  position: relative;
  left: 0;
  top: 0;
  background-color: rgb(32, 36, 63);
  width: 400px;
  height: calc(100% - 50px);
  z-index: 13;
  overflow-y: auto;
  overflow-x: hidden;
  .el-select {
    margin-top: 15px;
    left: 35px;
    width: 330px;
    margin-bottom: 15px;
  }
  .wall {
    width: 380px;
    margin-left: 10px;
    height: 3px;
    background-color: gray;
  }
}
#chart-display {
  position: absolute;
  left: 400px;
  top: 0px;
  height: calc(100% - 50px);
  width: calc(100% - 400px);
  background-color: aliceblue;
  overflow: hidden;
}
.chart-items {
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
  transition-duration: 0.4s;
  background-color: rgb(44, 51, 94);
  color: white;
  border-radius: 5px;
  .title {
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
    width: 370px;
    overflow: hidden;
  }
  .tit {
    position: absolute;
    bottom: 4px;
    font-size: 14px;
    margin-left: 10px;
    color: gray;
  }
  .fix {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 25px;
    border-radius: 4px;
    width: 30px;
    height: 30px;
    text-align: center;
  }
}
.active {
  background-color: rgb(16, 19, 34);
  border-left: 4px solid sandybrown;
}
.chart-items:hover {
  background-color: rgb(60, 72, 148);
}
</style>
<style lang="less">
.chart-iframe {
  border: 3px solid gray;
  position: relative;
  width: 100%;
  height: 100%;
}
#tab-OTHER1 {
  border-bottom: 7px solid blueviolet;
  width: 400px;
}
#tab-OTHER1.is-active {
  color: black;
  font-weight: bold;
  transition-duration: 0.3s;
  border-bottom: 7px solid blueviolet;
  background-color: blueviolet;
}

</style>