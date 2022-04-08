<template>
  <div id="app">
    <div class="intro">
      <h1>In Crisis, Again</h1>
      <h2>
        Understanding the Endurance of Opioids<br />& Combatting the Modern
        Epidemic
      </h2>

      <p>SCROLL TO CONTINUE</p>
    </div>
    <div class="main">
      <!-- <div class="main__graphic">{{ currStep }}</div> -->
      <arcTimeline :data="data" :height="height" :width="width" class="arc" />
      <Scrollama
        :debug="true"
        :offset="0.5"
        @step-enter="setGraphicContent"
        class="main__scrollama"
      >
        <div :data="data" class="step" data-step-no="1">
          <div class="step-text">{{ this.data.nodes[0].text }}</div>
        </div>
        <div :data="data" class="step" data-step-no="2">
          <div class="step-text">{{ this.data.nodes[0].text }}</div>
        </div>
        <div :data="data" class="step" data-step-no="3">
          <div class="step-text">{{ this.data.nodes[0].text }}</div>
        </div>
        <div :data="data" class="step" data-step-no="4">
          <div class="step-text">{{ this.data.nodes[0].text }}</div>
        </div>
        <div :data="data" class="step" data-step-no="5">
          <div class="step-text">{{ this.data.nodes[0].text }}</div>
        </div>
        <div :data="data" class="step" data-step-no="6">
          <div class="step-text">{{ this.data.nodes[0].text }}</div>
        </div>
      </Scrollama>
    </div>
    <div class="outro">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, at velit
      sint facere ipsam doloremque placeat vel impedit sapiente alias.
    </div>
  </div>
</template>

<script>
import arcTimeline from "./components/arcTimeline.vue";
// import Scroll from "./components/Scroll.vue";
import data from "../data.json";
import "intersection-observer";
// import Scrollama from "vue-scrollama";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

export default {
  name: "App",
  components: {
    arcTimeline,
    // Scrollama,
  },

  data() {
    return {
      data: data,
      currStep: 0,
      height: "100%",
      width: "100%",
    };
  },
  computed: {},

  mounted() {
    console.log("i am mounted");
  },
  methods: {
    stepEnterHandler({ element, index, direction }) {
      // handle the step-event as required here
      console.log({ element, index, direction });
      // use the data attributes if needed
      console.log(element.dataset.step); // a, b or c
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.intro {
  min-height: 100vh;
  text-align: center;
  background-color: darkslategray;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #dfdfdf;
  font-family: monospace;
}
.outro {
  padding: 20vh;
}

.arc {
  /* flex: 4; */
  height: 100vh;
  top: 10vh;
  position: sticky;
  display: relative;
  align-items: center;
  justify-content: center;
  padding: 15vh 0;
  width: 90%;
  margin: 0 auto 30vh;
  display: flex;
}

.step-text {
  max-width: 520px;
  border-radius: 5px;
  background-color: rgba(98, 108, 109, 0.9);
  /* background: rgba(38, 47, 49, 0.932); */
  color: white;
  padding: 25px 30px 25px 35px;
  pointer-events: all;
}

/* .step {
  padding: 15vh 0;
  width: 30%;
  margin: 0 auto 50vh;
  background-color: rgba(149, 165, 166, 0.9);
  color: white;
  font-family: monospace;
  font-size: 18px;
  border: 3px solid darkgray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
} */

.step {
  padding: 0 0;
  height: 100vh;
  position: relative;
  padding: 20vh 0;
  margin: 0 3rem;
  margin-bottom: 10vh;
  margin-left: 20vw;
  margin-right: 20vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: monospace;
  font-weight: 00;
  font-size: 15px;
  pointer-events: none;
}
:last-child {
  margin-bottom: 0;
}

body {
  margin: 0;
  padding: 0;
}
</style>

