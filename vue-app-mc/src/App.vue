<template>
  <div class="main">
    <div id="app">
      <Scrollama
        :offset="0.85"
        @step-enter="pillHandler"
        @step-exit="resetContent"
      >
        <div class="intro">
          <div id="intro-title">
            <h1 id="in-crisis">In Crisis, Again</h1>
            <h2 id="sub-title">
              Understanding the Endurance of Opioids &<br />Combatting the
              Modern American Epidemic
            </h2>
            <br />
            <div class="line-title-cont"><div class="line-title"></div></div>
            <h3 class="my-name">Molly Cook</h3>
            <p class="italic">Scroll to continue</p>
          </div>
          <stackedPills />
        </div>
      </Scrollama>

      <div>
        <Scrollama :offset="0.5" @step-enter="handler">
          <div class="svg-img-holder">
            <spilledPills />
          </div>
          <div class="step step-app">
            <div class="app-text">
              <p class="para-text">
                Over a century before the mis-marketing of OxyContin dominated
                news outlets, the nation faced its first widespread opioid
                epidemic.
                <br /><br />
                The emergence, exploitation, and eruption of both epidemics
                follow the same arcs in history, yet the de-escalation of the
                19th century epidemic has faded into distant memory and recovery
                from the most recent has yet to be seen.
              </p>
            </div>
          </div>
          <!-- <div class="step step-app">
            <div class="app-text">
              <p class="para-text">
                By 1890, its approximated that several hundred thousand
                Americans had become addicted to opioids.
                <br /><br />
                According to the CDC, more than 500,000 people have died from
                the modern opioid epidemic since 1999.
              </p>
            </div>
          </div> -->
          <div class="step step-app">
            <div class="app-text">
              <h2>Let's draw the connections between both epidemics...</h2>
            </div>
          </div>
          <div class="step step-app"></div>
          <!-- <div class="step step-app"></div> -->
        </Scrollama>
        <Scrollama :offset="0.5" class="slide">
          <div class="sub-intro first-chapter photo-container"></div>
          <div class="chapter-title slide">
            <h3>Chapter 1:</h3>
            <h2>Repeating The Past, Again</h2>
          </div>
        </Scrollama>

        <arcTimeline class="arc" />
      </div>

      <Scrollama :offset="0.5" class="slide">
        <div class="sub-intro second-chapter photo-container"></div>
        <div class="chapter-title slide">
          <h3 class="chapter-num">Chapter 2:</h3>
          <h2 class="chapter-title">Your Brain on Drugs, Actually</h2>
        </div>
      </Scrollama>
      <brain />
      <Scrollama :offset="0.5" class="slide">
        <div class="sub-intro third-chapter photo-container"></div>
        <div class="chapter-title slide">
          <h3 class="chapter-num">Chapter 3:</h3>
          <h2 class="chapter-title">
            The Inaccessibility of MAT Treatment, Unfortunately
          </h2>
        </div>
      </Scrollama>
      <matMap />
      <Scrollama :offset="0.8" @step-enter="restackPillHandler">
        <restackedPills class="stack-container" />
        <div id="outro">
          <div class="flex-container">
            <div id="outro-step slide">
              <div class="resources-container">
                <div class="resource-box">
                  <div id="outro-title" class="resource-group">
                    <p>
                      The gripping effect that opioids have on the brain
                      combined with the inaccessibility of MAT leaves the nation
                      crippled with little chance of recovery.
                    </p>
                    <div class="line-sep-cont">
                      <div class="line-sep"></div>
                    </div>
                    <p>
                      Alleviating future escalation of the modern opioid crisis
                      requires
                      <span class="emphasize-color">understanding</span> the
                      onset of the first opioid epidemic and the stigma it left
                      behind,
                      <span class="emphasize-color">sympathizing</span> with the
                      physiology of addiction, and
                      <span class="emphasize-color"
                        >making MAT treatment accessible.</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scrollama>
      <footer>
        <div class="footer-links">
          <div class="link-container">
            <p class="footer-text">
              <a id="top-btn" @click="toTop">Back to top</a>
            </p>
          </div>
        </div>
      </footer>
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
import restackedPills from "./components/restackedPills.vue";

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
    restackedPills,
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
        // location.reload();
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
      sleep(2000).then(() => {
        location.reload();
      });
    },
    stackedFall() {
      var allPills = d3.selectAll(".pill");

      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
      sleep(1000).then(() => {
        //wait a second and then let pills fall

        allPills
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
        .attr("opacity", 0.05);
    },

    spillOpacity1() {
      d3.select("#spilled-pills").attr("opacity", 1);
    },

    restackPills() {
      var stackedPills = d3.selectAll(".restack-pill");
      console.log("restacking");
      // const sleep = (milliseconds) => {
      //   return new Promise((resolve) => setTimeout(resolve, milliseconds));
      // };
      // sleep(1000).then(() => {
      stackedPills
        .attr("transform", "translate(0,-2000)")
        .transition()
        .duration(3000)
        .delay(function (d, i) {
          (d) => d.reverse();
          return i * 15;
        })
        .attr("transform", function () {
          return "translate(" + this.x + "," + this.y + ")";
        })
        .attr("opacity", 1);
      // });
    },

    pillHandler(index) {
      if (index) this.stackedFall();
    },

    restackPillHandler(index, element) {
      if (index) this.restackPills();
      console.log("restack handler", index, element);
    },

    handler({ element, index, direction }) {
      if (direction === "down") element.classList.add("active");
      if (index === 0)
        this.stackedFall(), d3.selectAll(".restack-pill").attr("opacity", 0);
      if (index === 2) this.spillOpacity0();
      // if (index === 2) this.spillOpacity1();
      if (index === 1) this.spillOpacity1();

      // console.log(event.element);
      // let step = event.element.getAttribute("data-step-no");
      // let subStep = event.element.getAttribute("data-substep");
      // console.log(step);
      // this.currStep = step;
      // this.subStep = subStep;
      // this.scrollDirection = event.direction;

      // if (index === 4) this.restackPills();
      console.log(index);
    },
    resetContent(event) {
      console.log(event.direction);
      console.log(event.element);
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
  min-height: 90vh;
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #dfdfdf;
  /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
  font-family: "Inter var", sans-serif;
  letter-spacing: 3px;
  background-image: linear-gradient(#151c24, #314153, #314153, #151c24);
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
  top: 0;
}

.photo-container {
  height: 100vh;
  position: sticky;
  top: 0;
}

.stack-container {
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 10px;
  bottom: 0px;
}

.slide {
  height: 50vh;
  margin: 0 auto;
  z-index: 10;
  position: relative;
  /* max-width: 300px; */
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
  color: #c3d7f1;
}

#spilled-pills {
  width: 100%;
  z-index: -1;
}

.chapter-num {
  font-size: 1.2em;
}

.chapter-title {
  font-size: 1.5em;
}
.my-name {
  color: #dfdfdf;
  margin-bottom: 100px;
  font-size: 1.3em;
}
.italic {
  font-style: italic;
}

.line-title-cont {
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}

.line-title {
  width: 50px;
  height: 2px;
  background: #dfdfdf;
}

#outro-step {
  font-size: 0.8em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #c3d7f1;
}

#outro {
  background-image: linear-gradient(#151c24, #314153, #314153, #151c24);
  background-position: center;
  background-size: cover;
}
.chapter-text {
  position: sticky;
  bottom: 0;
}

.arc {
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 10vh;
  position: sticky;
  display: relative;
  padding: 15vh 0;
}

:last-child {
  margin-bottom: 0;
}

body {
  margin: 0;
  padding: 0;
  /* background-color: rgba(35, 49, 64); */
  background: #151c24;
  display: flex;
  align-items: center;
  justify-content: center;
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
  /* border: 0.5px solid rgba(169, 169, 169, 0.2); */

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.134),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.16),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.25);
}

.para-text {
  font-size: 1.4em;
  padding: 10px 10px 15px 10px;
}

.first-chapter {
  background-image: url("chp-1-title-may8_v3.jpg");
  background-position: center;
  background-size: cover;
}

.second-chapter {
  background-image: url("brain-may8-v2.jpg");
  background-position: center;
  background-size: cover;
}

.third-chapter {
  background-image: url("chp-3-may8-v3.jpg");
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
  bottom: 0px;
}
footer {
  font-size: 15px;
  min-height: 180px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
}
.footer-text {
  flex-basis: 40%;
  padding: 20px;
  color: rgb(142, 160, 160);
  text-align: center;
}

.footer-links {
  padding: 20px;
  padding-bottom: 0px;
  text-align: center;
}

.footer-links a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 15px;
}
.footer-links a:hover {
  color: #c3d7f1;
}

.link-container {
  margin-bottom: 10px;
  position: relative;
  text-align: center;
}

#top-btn {
  background-color: rgb(197, 197, 197);
  border-radius: 10px;
  padding: 8px 20px;
  color: rgb(37, 45, 46);
  font-size: 15px;
  font-weight: bolder;
  text-decoration: none;
}

#top-btn:hover {
  background: #c3d7f1;
}

.resource-box {
  flex-basis: 40%;
  height: 350px;
  padding: 20px;
  margin: 4%;
  background-color: #151c24;
  color: #c3d7f1;
  border-radius: 10px;

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.134),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.16),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.25);
}

.box-shadow {
  /* flex-basis: 40%; */
  /* height: 350px; */
  padding: 20px;
  margin: 4%;
  background-color: #151c24;
  color: #c3d7f1;
  border-radius: 10px;

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.134),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.16),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.25);
}

.resource-group {
  text-align: center;
  font-weight: 500;
  /* margin-top: 40px; */
  padding: 15px;
  margin-top: 30px;
  margin: 12px;
  /* border-radius: 10px; */
  color: #dfdfdf;
  font-size: 1.1em;
  line-height: 1.5;
  text-align: left;
}

.resource-links a {
  font-weight: 500;
  color: rgb(180, 188, 190);
  text-decoration: none;
}
/* .resource-links a:hover {
    color: #ff784f;
  } */
.resources-container {
  display: flex;
  width: 100vw;
  padding: 0%;
  padding-bottom: 20vw;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  top: 300px;
  z-index: 10;
}

.outro-title {
  padding: 10px;
  margin: 12px;
  /* border-radius: 10px; */
  color: #dfdfdf;
  font-size: 1.2em;
  line-height: 1.5;
  text-align: left;
}

.line-sep-cont-app {
  margin: 0px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}

.line-sep-app {
  width: 50px;
  height: 1px;
  background: #8097b5;
}
</style>

