<template>
  <div class="outer" :class="showNightMode()"  >
   <iframe src="enroute_chart/enroute.html" frameborder="0"></iframe>
  </div>
</template>
    
    <script>

export default {
  name: "Index",
  methods: {
    
    showNightMode() {
      if (localStorage.getItem("nightMode") == "true") {
        return "night-mode";
      } else {
        return "day-mode";
      }
    },
    
  },

};
</script>

<style scoped >
.outer {
  z-index: -1;
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  left: 0px;
}
iframe{
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.night-mode {
  filter: invert(90%) contrast(150%) brightness(80%) hue-rotate(180deg);
}
.day-mode {
  filter: invert(0%) contrast(100%) brightness(100%);
}
</style>