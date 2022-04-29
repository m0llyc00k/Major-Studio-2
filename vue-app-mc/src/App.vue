<template>
  <div class="main">
    <div id="app">
      <div class="intro">
        <h1>In Crisis, Again</h1>
        <h2>
          Understanding the Endurance of Opioids<br />& Combatting the Modern
          American Epidemic
        </h2>
        <p>SCROLL TO CONTINUE</p>
      </div>
      <div>
        <div class="sub-intro first-chapter">
          <div class="chapter-title">
            <h2>Chapter 1: Repeating The Past, Again</h2>
          </div>
        </div>
        <Scrollama :offset="0.8" @step-enter="handler">
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
        </Scrollama>
        <arcTimeline class="arc" />
      </div>
      <div>
        <div class="sub-intro second-chapter">
          <div class="chapter-title">
            <h2>Chapter 2: Your Brain on Drugs, Actually</h2>
          </div>
        </div>
        <brain />
      </div>
      <div>
        <div class="sub-intro third-chapter">
          <div class="chapter-title">
            <h2>Chapter 3: Inaccessibility to MAT Treatment, Unfortunately</h2>
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
import arcTimeline from "./components/arcTimeline.vue";
import brain from "./components/brain.vue";
import matMap from "./components/matMap.vue";
import "intersection-observer";
import Scrollama from "../vue-scrollama/src/Scrollama.vue";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

export default {
  name: "App",
  components: {
    arcTimeline,
    brain,
    matMap,
    Scrollama,
  },

  methods: {
    handler({ element, index, direction }) {
      if (direction === "down") element.classList.add("active");
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
  background-color: #3d546b;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #dfdfdf;
  /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
  font-family: "Inter var", sans-serif;

  letter-spacing: 3px;
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
  font-family: monospace;
  vertical-align: baseline;
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
</style>

