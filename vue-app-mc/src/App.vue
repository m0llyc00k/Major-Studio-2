<template>
  <div>
    <h1>Opioid Timeline</h1>
    <div class="recommendation-group"></div>
    <arcTimeline :data="data" :height="2000" :width="1300" class="arc" />
    <div id="chart"></div>
  </div>
</template>

<script>
import arcTimeline from "./components/arcTimeline.vue";

import data from "../data.json";

export default {
  name: "App",
  components: {
    arcTimeline,
  },

  data() {
    return {
      data: data,
    };
  },
  computed: {},

  mounted() {
    console.log("i am mounted");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
