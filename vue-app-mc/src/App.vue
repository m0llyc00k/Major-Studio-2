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
      <Scrollama :offset="0.8" @step-enter="handler">
        <arcTimeline :data="data" :height="height" :width="width" class="arc" />
        <div :data="data" class="step" data-step-no="1">
          <div class="step-text">
            <h2 class="step-title">{{ this.data.links[0].title }}</h2>
            <div class="flex-container">
              <div class="flex-child">
                <h3>{{ this.data.links[0].year1 }}</h3>
                <p>{{ this.data.links[0].text1 }}</p>
              </div>
              <div class="flex-child">
                <h3>{{ this.data.links[0].year2 }}</h3>
                <p>{{ this.data.links[0].text2 }}</p>
              </div>
            </div>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="2">
          <div class="step-text">
            <h2>{{ this.data.links[1].title }}</h2>
            <h3>{{ this.data.links[1].year1 }}</h3>
            <p>{{ this.data.links[1].text1 }}</p>
            <h3>{{ this.data.links[1].year2 }}</h3>
            <p>{{ this.data.links[1].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="3">
          <div class="step-text">
            <h2>{{ this.data.links[2].title }}</h2>
            <h3>{{ this.data.links[2].year1 }}</h3>
            <p>{{ this.data.links[2].text1 }}</p>
            <h3>{{ this.data.links[2].year2 }}</h3>
            <p>{{ this.data.links[2].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="4">
          <div class="step-text">
            <h2>{{ this.data.links[3].title }}</h2>
            <h3>{{ this.data.links[3].year1 }}</h3>
            <p>{{ this.data.links[3].text1 }}</p>
            <h3>{{ this.data.links[3].year2 }}</h3>
            <p>{{ this.data.links[3].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="5">
          <div class="step-text">
            <h2>{{ this.data.links[4].title }}</h2>
            <h3>{{ this.data.links[4].year1 }}</h3>
            <p>{{ this.data.links[4].text1 }}</p>
            <h3>{{ this.data.links[4].year2 }}</h3>
            <p>{{ this.data.links[4].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="6">
          <div class="step-text">
            <h2>{{ this.data.links[5].title }}</h2>
            <h3>{{ this.data.links[5].year1 }}</h3>
            <p>{{ this.data.links[5].text1 }}</p>
            <h3>{{ this.data.links[5].year2 }}</h3>
            <p>{{ this.data.links[5].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="6">
          <div class="step-text">
            <h2>{{ this.data.links[6].title }}</h2>
            <h3>{{ this.data.links[6].year1 }}</h3>
            <p>{{ this.data.links[6].text1 }}</p>
            <h3>{{ this.data.links[6].year2 }}</h3>
            <p>{{ this.data.links[6].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="6">
          <div class="step-text">
            <h2>{{ this.data.links[7].title }}</h2>
            <h3>{{ this.data.links[7].year1 }}</h3>
            <p>{{ this.data.links[7].text1 }}</p>
            <h3>{{ this.data.links[7].year2 }}</h3>
            <p>{{ this.data.links[7].text2 }}</p>
          </div>
        </div>
        <div :data="data" class="step" data-step-no="6">
          <div class="step-text">
            <h2>{{ this.data.links[8].title }}</h2>
            <h3>{{ this.data.links[8].year1 }}</h3>
            <p>{{ this.data.links[8].text1 }}</p>
            <h3>{{ this.data.links[8].year2 }}</h3>
            <p>{{ this.data.links[8].text2 }}</p>
          </div>
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
import data from "../data.json";
import "intersection-observer";
import Scrollama from "../vue-scrollama/src/Scrollama.vue";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

export default {
  name: "App",
  components: {
    arcTimeline,
    Scrollama,
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
    this.drawChart();
    // this.handler();
  },
  methods: {
    handler({ element, index, direction }) {
      console.log("hello world");
      console.log(element, index, direction);
      if (direction === "down") element.classList.add("active");
      // else element.classList.remove("active"); //comment this if you want reveals only while scrolling down
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
  color: #dfdfdf;
  /* margin-top: 60px; */
}
.intro {
  min-height: 100vh;
  text-align: center;
  background-color: #3d546b;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #dfdfdf;
  font-family: monospace;
}
.outro {
  padding-top: 50vh;
  padding-bottom: 20vh;
}

.arc {
  /* flex: 4; */
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 10vh;
  position: sticky;
  display: relative;
  padding: 15vh 0;
  width: 90%;
  margin: 0 auto 30vh;
  /* display: flex; */
}

.step-text {
  max-width: 100%;
  border-radius: 15px;
  /* background-color: rgba(98, 108, 109, 0.9); */
  background-color: rgba(35, 49, 64, 0.932);
  /* background: rgba(38, 47, 49, 0.932); */
  color: white;
  padding: 25px 30px 25px 35px;
  pointer-events: all;
}

.step-title {
  background: -webkit-linear-gradient(left, cornsilk, #9eb4ca);
  background: -o-linear-gradient(right, cornsilk, #9eb4ca);
  background: -moz-linear-gradient(right, cornsilk, #9eb4ca);
  background: linear-gradient(to right, cornsilk, #9eb4ca);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  border: 2px solid darkgray;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
}
.flex-container {
  display: flex;
  justify-content: center;
  align-items: top;
}

.flex-child {
  flex: 1;
  /* align-items: flex-start; */
  justify-content: center;
  color: #eaeff4;
}

.flex-child:first-child {
  flex: 1;
  /* align-items: flex-start; */
  justify-content: center;
  color: cornsilk;
}

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
  /* align-items: flex-start; */
  /* justify-content: center; */
  font-family: monospace;
  font-weight: 00;
  font-size: 15px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.8);
  transition: all 800ms;
  transform: translateY(60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.step.active {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

:last-child {
  margin-bottom: 0;
}

body {
  margin: 0;
  padding: 0;
  background-color: #2c3e50;
}
</style>

