<template>
  <div class="main">
    <div id="app">
      <Scrollama :offset="0.8" @step-enter="pillHandler">
        <div class="intro">
          <div id="intro-title">
            <h1 id="in-crisis">In Crisis, Again</h1>
            <h2>
              Understanding the Endurance of Opioids &<br />Combatting the
              Modern American Epidemic
            </h2>
            <br />
            <p>Molly Cook</p>
            <p>SCROLL TO CONTINUE</p>
          </div>
          <stackedPills />
        </div>
      </Scrollama>

      <div>
        <Scrollama :offset="0.8" @step-enter="handler">
          <div class="svg-img-holder">
            <spilledPills />
          </div>
          <div class="step step-app">
            <div class="app-text">
              <p class="para-text">
                The United States faced what would be the first national opioid
                crisis a century before the infamous mismarketing of OxyContin
                devastated communities with widespread opioid addiction.
                <br /><br />The onset of both crises follow similar arcs in
                history, yet the first epidemic has faded into distant memory
                and recovery from the current crisis has yet to be seen.
              </p>
            </div>
          </div>
          <div class="step step-app">
            <div class="app-text">
              <h2>Let's draw the connections between both epidemics</h2>
            </div>
          </div>
          <div class="step step-app"></div>
          <div class="sub-intro first-chapter">
            <div class="chapter-title">
              <h3>Chapter 1:</h3>
              <h2>Repeating The Past, Again</h2>
            </div>
          </div>
        </Scrollama>

        <arcTimeline class="arc" />
      </div>
      <div class="step">
        <p>
          Pharmaceutical companies blame <em>'recreational users'</em>, framing
          them as criminals,<br />
          while advocating for <em>'medical users'</em>, positioning them as
          victims. <br />This manipulation of fact plays a role in history
          repeating itself, but <br />
          <b
            >what really happens when your brain becomes addicted to opioids?</b
          >
        </p>
        <!-- <p>BRAIN IMAGE/ SNEAK PEAK/ BUTTON</p> -->
      </div>
      <div>
        <div class="sub-intro second-chapter">
          <div class="chapter-title">
            <h3>Chapter 2:</h3>
            <h2>Your Brain on Drugs, Actually</h2>
          </div>
        </div>
        <brain />
      </div>
      <div>
        <div class="sub-intro third-chapter">
          <div class="chapter-title">
            <h3>Chapter 3:</h3>
            <h2>The Inaccessibility of MAT Treatment, Unfortunately</h2>
          </div>
        </div>
        <matMap />
      </div>
      <div class="outro">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, at
        velit sint facere ipsam doloremque placeat vel impedit sapiente alias.
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import arcTimeline from "./components/arcTimeline.vue";
import brain from "./components/brain.vue";
import matMap from "./components/matMap.vue";
import "intersection-observer";
import Scrollama from "../vue-scrollama/src/Scrollama.vue";
import stackedPills from "./components/stackedPills.vue";
import spilledPills from "./components/spilledPills.vue";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

export default {
  name: "App",
  components: {
    arcTimeline,
    brain,
    matMap,
    Scrollama,
    stackedPills,
    spilledPills,
  },

  methods: {
    stackedFall() {
      // var allPillsStacked = d3.selectAll(
      //   ".cls-1-stack, .cls-2-stack, .cls-3-stack, .cls-4-stack, .cls-5-stack, .cls-6-stack"
      // );
      // var svgSpillPill = d3.select("#spilled-pills");
      var whitePill = d3.selectAll(".pill");
      // var bluePill = d3.selectAll(".cls-3-stack, .cls-4-stack, .cls-5-stack");
      // var bluePillGroup = bluePill.append("g")

      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
      sleep(300).then(() => {
        //do stuff

        whitePill
          .attr("opacity", 1)
          .transition()
          .delay(function (d, i) {
            (d) => d.reverse();
            return i * 15;
          })
          .duration(3000)
          // .ease(d3.easeExp)
          // .attr("opacity", 0);
          .attr("transform", "translate(0,1100)");
      });
    },

    spillOpacity0() {
      d3.select("#spilled-pills")
        .attr("opacity", 1)
        .transition()
        .duration(3000)
        .attr("opacity", 0.2);
    },

    pillHandler(index) {
      if (index) this.stackedFall();
    },

    handler({ element, index, direction }) {
      if (direction === "down") element.classList.add("active");
      if (index === 0) this.stackedFall();
      if (index === 4) this.spillOpacity0();
      console.log(index);
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
  /* background: #151c24; */
  background: #a0a0a0;
  /* background-color: #3d546b; */
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #dfdfdf;
  /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
  font-family: "Inter var", sans-serif;
  letter-spacing: 3px;
  background-image: url("title-blank-texture.jpg");
  background-position: center;
  background-size: cover;
}

.sub-intro {
  min-height: 100vh;
  text-align: center;
  background-color: #1b242e;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #dfdfdf;
  font-family: "Inter var", sans-serif;
  font-size: 1.3em;
  letter-spacing: 3px;
  vertical-align: baseline;
}
#in-crisis {
  font-size: 3.5em;
  color: #dfdfdf;
}
#intro-title {
  font-size: 0.8em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bfe6e3;
}
.outro {
  padding-top: 50vh;
  padding-bottom: 20vh;
}

.chapter-text {
  position: sticky;
  bottom: 0;
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
  /* width: 90%; */
  /* margin: 0 auto 30vh; */
  /* display: flex; */
}

:last-child {
  margin-bottom: 0;
}

body {
  margin: 0;
  padding: 0;
  /* background-color: rgba(35, 49, 64); */
  background: #151c24;
}

.step-app {
  padding: 2vh 0;
  height: 100vh;
  margin: 0 3rem;
  margin-bottom: 50vh;
  margin-left: 5vw;
  margin-right: 5vw;
  display: flex;
  /* align-items: flex-start; */
  font-weight: 00;
  font-size: 15px;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.8);
  transition: all 1000ms;
  transform: translateY(60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* top: 50; */
}

.app-text {
  max-width: 60%;
  padding: 20px;
  border-radius: 10px;
  background: #151c24;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: "Inter var", sans-serif;
  border: 0.5px solid rgba(169, 169, 169, 0.2);
}

.para-text {
  font-size: 1.4em;
  padding: 10px 10px 15px 10px;
}

.first-chapter {
  background-image: url("chp-1-title-v2.jpg");
  background-position: center;
  background-size: cover;
}

.second-chapter {
  background-image: url("chp2-title.jpg");
  background-position: center;
  background-size: cover;
}

.third-chapter {
  background-image: url("chp3-title.jpg");
  background-position: center;
  background-size: cover;
}

.svg-img-holder {
  width: 100vw;
  height: 100vh;
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 10px;
}
</style>

