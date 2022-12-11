<template>
  <div class="cklist-outer">
  <el-tabs id="ck-tab" type="border-card" class="tab" v-model="activeName">
    <el-tab-pane class="it"  label="A319/320/321" name="A320">
      <el-tabs class="item" tab-position="left">
    <el-tab-pane label="开车前">
        <div class="items uncomplete" v-for="(i,index) in data[0][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="允许推出">
      <div class="items uncomplete" v-for="(i,index) in data[0][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div> </el-tab-pane>
    <el-tab-pane label="开车后"> 
      <div class="items uncomplete" v-for="(i,index) in data[0][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="起飞前(线上)">
      <div class="items uncomplete" v-for="(i,index) in data[0][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="起飞前(线下)">
      <div class="items uncomplete" v-for="(i,index) in data[0][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="起飞后/爬升(1)">
      <div class="items uncomplete" v-for="(i,index) in data[0][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="起飞后/爬升(2)">
      <div class="items uncomplete" v-for="(i,index) in data[0][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="巡航">
      <div class="items uncomplete" v-for="(i,index) in data[0][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="进近">
      <div class="items uncomplete" v-for="(i,index) in data[0][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="着陆">
      <div class="items uncomplete" v-for="(i,index) in data[0][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="着陆后">
      <div class="items uncomplete" v-for="(i,index) in data[0][10]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="停机">
      <div class="items uncomplete" v-for="(i,index) in data[0][11]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
    <el-tab-pane label="离机安全">
      <div class="items uncomplete" v-for="(i,index) in data[0][12]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
    </el-tab-pane>
  </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="A330" name="A330">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="启动前">
          <div class="items uncomplete" v-for="(i,index) in data[1][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="允许推出">
          <div class="items uncomplete" v-for="(i,index) in data[1][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="启动后">
          <div class="items uncomplete" v-for="(i,index) in data[1][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前(线上)">
          <div class="items uncomplete" v-for="(i,index) in data[1][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前(线下)">
          <div class="items uncomplete" v-for="(i,index) in data[1][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后/爬升(1)">
          <div class="items uncomplete" v-for="(i,index) in data[1][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后/爬升(2)">
          <div class="items uncomplete" v-for="(i,index) in data[1][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[1][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[1][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆后">
          <div class="items uncomplete" v-for="(i,index) in data[1][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="停机">
          <div class="items uncomplete" v-for="(i,index) in data[1][10]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="离机">
          <div class="items uncomplete" v-for="(i,index) in data[1][11]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="A350" name="A350">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="启动前">
          <div class="items uncomplete" v-for="(i,index) in data[2][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="允许推出">
          <div class="items uncomplete" v-for="(i,index) in data[2][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="启动后">
          <div class="items uncomplete" v-for="(i,index) in data[2][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前(线上)">
          <div class="items uncomplete" v-for="(i,index) in data[2][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前(线下)">
          <div class="items uncomplete" v-for="(i,index) in data[2][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后/爬升(1)">
          <div class="items uncomplete" v-for="(i,index) in data[2][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后/爬升(2)">
          <div class="items uncomplete" v-for="(i,index) in data[2][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[2][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[2][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆后">
          <div class="items uncomplete" v-for="(i,index) in data[2][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="停机">
          <div class="items uncomplete" v-for="(i,index) in data[2][10]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="离机">
          <div class="items uncomplete" v-for="(i,index) in data[2][11]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it" label="A380" name="A380">
      <el-tabs class="item" tab-position="left">
      <el-tab-pane label="启动前">
          <div class="items uncomplete" v-for="(i,index) in data[3][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="允许推出">
          <div class="items uncomplete" v-for="(i,index) in data[3][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="启动后">
          <div class="items uncomplete" v-for="(i,index) in data[3][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前(线上)">
          <div class="items uncomplete" v-for="(i,index) in data[3][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前(线下)">
          <div class="items uncomplete" v-for="(i,index) in data[3][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后/爬升(1)">
          <div class="items uncomplete" v-for="(i,index) in data[3][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后/爬升(2)">
          <div class="items uncomplete" v-for="(i,index) in data[3][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[3][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[3][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆后">
          <div class="items uncomplete" v-for="(i,index) in data[3][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="停机">
          <div class="items uncomplete" v-for="(i,index) in data[3][10]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="离机">
          <div class="items uncomplete" v-for="(i,index) in data[3][11]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="B737-800/737 MAX" name="B737">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="飞行前">
          <div class="items uncomplete" v-for="(i,index) in data[4][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="启动前">
          <div class="items uncomplete" v-for="(i,index) in data[4][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="滑行前">
          <div class="items uncomplete" v-for="(i,index) in data[4][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前">
          <div class="items uncomplete" v-for="(i,index) in data[4][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后">
          <div class="items uncomplete" v-for="(i,index) in data[4][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进入RVSM空域前">
          <div class="items uncomplete" v-for="(i,index) in data[4][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="下降">
          <div class="items uncomplete" v-for="(i,index) in data[4][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[4][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[4][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="关车">
          <div class="items uncomplete" v-for="(i,index) in data[4][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="安全离机">
          <div class="items uncomplete" v-for="(i,index) in data[4][10]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="B747" name="B747">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="引擎启动前">
          <div class="items uncomplete" v-for="(i,index) in data[5][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="后推前">
          <div class="items uncomplete" v-for="(i,index) in data[5][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="引擎启动后/滑行">
          <div class="items uncomplete" v-for="(i,index) in data[5][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前">
          <div class="items uncomplete" v-for="(i,index) in data[5][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后">
          <div class="items uncomplete" v-for="(i,index) in data[5][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[5][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="最终进近">
          <div class="items uncomplete" v-for="(i,index) in data[5][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="驻机">
          <div class="items uncomplete" v-for="(i,index) in data[5][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="B777" name="B777">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="飞行前">
          <div class="items uncomplete" v-for="(i,index) in data[6][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="启动前">
          <div class="items uncomplete" v-for="(i,index) in data[6][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="滑行前">
          <div class="items uncomplete" v-for="(i,index) in data[6][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前">
          <div class="items uncomplete" v-for="(i,index) in data[6][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后">
          <div class="items uncomplete" v-for="(i,index) in data[6][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="下降">
          <div class="items uncomplete" v-for="(i,index) in data[6][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[6][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[6][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="关车">
          <div class="items uncomplete" v-for="(i,index) in data[6][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="安全离机">
          <div class="items uncomplete" v-for="(i,index) in data[6][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="B787 " name="B787">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="飞行前">
          <div class="items uncomplete" v-for="(i,index) in data[7][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="启动前">
          <div class="items uncomplete" v-for="(i,index) in data[7][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="滑行前">
          <div class="items uncomplete" v-for="(i,index) in data[7][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前">
          <div class="items uncomplete" v-for="(i,index) in data[7][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后">
          <div class="items uncomplete" v-for="(i,index) in data[7][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="下降">
          <div class="items uncomplete" v-for="(i,index) in data[7][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[7][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[7][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="关车">
          <div class="items uncomplete" v-for="(i,index) in data[7][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="安全离机">
          <div class="items uncomplete" v-for="(i,index) in data[7][9]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane class="it"  label="C172 " name="C172">
      <el-tabs class="item" tab-position="left">
        <el-tab-pane label="预先准备">
          <div class="items uncomplete" v-for="(i,index) in data[8][0]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="开车前">
          <div class="items uncomplete" v-for="(i,index) in data[8][1]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="滑行前">
          <div class="items uncomplete" v-for="(i,index) in data[8][2]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞前">
          <div class="items uncomplete" v-for="(i,index) in data[8][3]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="起飞后">
          <div class="items uncomplete" v-for="(i,index) in data[8][4]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="巡航">
          <div class="items uncomplete" v-for="(i,index) in data[8][5]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="进近">
          <div class="items uncomplete" v-for="(i,index) in data[8][6]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="着陆">
          <div class="items uncomplete" v-for="(i,index) in data[8][7]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
        <el-tab-pane label="关车">
          <div class="items uncomplete" v-for="(i,index) in data[8][8]" :key="index" @click="check"><i class="el-icon-circle-close uncomplete"></i><i class="el-icon-circle-check complete"></i>
        <span class="c">{{i[0]}} ..................... {{i[1]}}</span></div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { dataDecrypt, dataEncrypt } from '@/utils/cryptoJS';
import {getRandomString} from '@/utils/num'
export default {
  name:'Checklist',
  data() {
      return {
        personalData:[],
        activeName: 'A320',
        data:[
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        ]
      }
    },
    methods:{
    parseData(){
      this.$axios.get(`https://api.skylineflyleague.cn/EFBNavData/SUP_OTHER_CHECKLIST_Database/v2/checklist.db`).then((res)=>{
        let resdata = res.data
        let data = JSON.parse(JSON.stringify(dataDecrypt(resdata.slice(10,resdata.length))))
        this.data = JSON.parse(JSON.parse(JSON.stringify(data)))
      })
    },
      check(e){
     if (e.target.getAttribute('class') == 'items uncomplete'){
       //完成检查单
       e.target.setAttribute('class','items complete')
     }else if (e.target.getAttribute('class') == 'items complete'){
       //取消弄好的检查单
       e.target.setAttribute('class','items uncomplete')
     }else if (e.target.getAttribute('class') == 'el-icon-circle-close uncomplete'||
     e.target.getAttribute('class') == 'el-icon-circle-check complete' ||
     e.target.getAttribute('class') == 'c'){
       let a = e.target.parentNode.getAttribute('class')
       let ele = e.target.parentNode
       if (a == 'items uncomplete'){
         ele.setAttribute('class','items complete')
       }else if (a == 'items complete'){
         ele.setAttribute('class','items uncomplete')
       }
     }
    }

    },
    props:['setWidth','cycle'],
    mounted(){
    this.setWidth()
    this.parseData()
    this.pubsub.subscribe('personalData',(name,data)=>{
            this.personalData = data
        })
    }
}
</script>

<style scoped lang="less">
.night-mode {
  filter: invert(90%) contrast(150%) brightness(80%) hue-rotate(180deg);
}

.day-mode {
  filter: invert(0%) contrast(100%) brightness(100%);
}

  .cklist-outer{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    position: fixed;
    left: 0px;
    width: 100%;
    top: 50px;
    height: 100%;
    background-color: rgb(48,56,124);
    overflow: auto;
  }
  .tab{
    position: absolute;
    width: 100%;
    height: 100%;
    left: -1px;
    border-top: 1px solid rgb(48,56,124);
    border-left: -2px solid rgb(33, 38, 85);
    padding-left: 0px;
    color: aliceblue;
  }
  
</style>
<style lang="less">
@font-face {
  font-family: list;
  src: url(list.woff);
}
.cklist-outer .el-tabs--border-card>.el-tabs__header{
  background-color: rgb(48, 56, 124);
  border: 1px solid rgb(48, 56, 124);
}
.cklist-outer .el-tabs__item {
  font-family: list;
  font-size: 14px;
  padding-left: 15px;
  background-color: rgb(48, 56, 124);
  margin-top: 0 !important;
  padding-right:15px;
  color: aliceblue !important;
}
#tab-A320.is-active{
    background-color:rgb(135, 201, 69);
    border-radius: 6px;
    text-align: center;
  }
#tab-A330.is-active{
    background-color:rgb(231, 127, 90);
    border-radius: 6px;
    text-align: center;
    color: black;
  }
#tab-A350.is-active{
    background-color:rgb(240, 192, 59);
    border-radius: 6px;
    text-align: center;
    color: black;
  }
#tab-A380.is-active{
    background-color:rgb(39, 217, 248);
    border-radius: 6px;
    text-align: center;
    color: black;
  }
#tab-B737.is-active{
    background-color:rgb(218, 127, 16);
    border-radius: 6px;
    text-align: center;
  }
#tab-B747.is-active{
    background-color:rgb(224, 94, 224);
    border-radius: 6px;
    text-align: center;
  }
#tab-B777.is-active{
    background-color:rgb(214, 96, 155);
    border-radius: 6px;
    text-align: center;
  }
#tab-B787.is-active{
    background-color:rgb(98, 192, 247);
    border-radius: 6px;
    text-align: center;
  }
#tab-C172.is-active{
    background-color:rgb(108, 240, 96);
    border-radius: 6px;
    text-align: center;
  }
  .cklist-outer .el-tabs--border-card>.el-tabs__content{
    padding: 0;
  }
 .cklist-outer .el-tabs__content{
    position: absolute;
    height: 100%;
    background-color: rgb(48, 56, 124);
    z-index: 0;
    width: 100%;
  }
.it{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 200% !important;
    .el-tabs__content{
    position: absolute;
    height: calc(100% - 50px);
    left: 200px;
    border-top: 1px solid rgb(29, 46, 92) !important;
    z-index: 100;
    width: 100%;
    background-color:rgb(30, 42, 73);
    color: black;
  }
  .el-tabs__nav-wrap{
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 200px;
  }
    .el-tabs__item{
      height: 50px;
      padding-left: 30px !important;
      line-height: 50px;
      text-align: left !important;
      background-color: rgb(46, 52, 105);
      color: aliceblue;
      font-size: 16px;
      transition-duration: 0.4s;
    }
    .el-tabs__item:hover{
      background-color: rgb(63, 71, 148);
    }
    .el-tabs__item.is-active{
      background-color: rgb(65, 78, 187);
      font-weight: bold;
      color: rgb(14, 221, 248) !important;
    }
  //  样式
  .items{
    padding-left: 15px;
    //background-color: rgb(247, 246, 182);
    color: aliceblue;
    border-radius: 4px;
    margin: 10px 10px;
    width: 40%;
    min-width: 400px;
    font-size: 20px;
    padding-left: 20px;
    transition-duration: 0.3s;
    cursor: pointer;
    i.uncomplete{
      display: inline;
      margin-right: 10px;
      color: orange;
    }
    i.complete{
      display: none;
      margin-right: 10px;
      color: rgb(107, 245, 43);
    }
  }
  .items.uncomplete:hover{
    background-color: rgba(228, 247, 220, 0.2);
    color:aliceblue 
    }
  .items.complete:hover{
    background-color: rgba(114, 240, 55, 0.404);
    color:aliceblue 
    }
  }
  .items.complete{
    background-color: rgba(102, 240, 38, 0.7);
    color: black;
    i.uncomplete{
      display: none;
      margin-right: 10px;
      color: orange;
    }
    i.complete{
      display: inline;
      margin-right: 10px;
      color: rgb(92, 250, 19);
    }
  }
</style>