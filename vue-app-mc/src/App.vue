<template>
  <div id="app">
    <div class="intro">
      <p>SCROLL TO CONTINUE</p>
    </div>
    <h1>Opioid Timeline</h1>
    <div class="main">
      <!-- <div class="main__graphic">{{ currStep }}</div> -->
      <arcTimeline :data="data" :height="height" :width="width" class="arc" />

      <Scrollama
        :debug="true"
        :offset="0.5"
        @step-enter="({ element }) => (currStep = element.data.stepNo)"
        class="main__scrollama"
      >
        <div class="step" data-step-no="1">step 1</div>
        <div class="step" data-step-no="2">step 2</div>
        <div class="step" data-step-no="3">step 3</div>
        <div class="step" data-step-no="4">step 4</div>
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
    // Scroll,
    // Scrollama,
  },

  data() {
    return {
      data: data,
      currStep: 1,
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
  margin-top: 60px;
}
.intro,
.outro {
  padding: 20vh;
}

/* // additions and overrides of DOM elements vue-scrollama sets up */
.main {
  display: flex;
}
.main__graphic {
  flex: 1;
  height: 80vh;
  top: 10vh;
  position: sticky;
}
.main__scrollama {
  flex: 1;
}
.arc {
  flex: 4;
  height: 80vh;
  top: 10vh;
  position: sticky;
}
/* // your elements styles */
/* .main__graphic {
  height: 100%;
  margin: 0 3rem;
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
} */

.main__graphic {
  position: sticky;
  top: 20;
  height: 50vh;
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .step {
  padding: 20vh 0;
  margin: 0 3rem;
  margin-bottom: 30vh;
  background-color: beige;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
} */
.step {
  padding: 15vh 0;
  width: 50%;
  margin: 0 auto 30vh;
  background-color: beige;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
:last-child {
  margin-bottom: 0;
}
</style>

