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
        <arcTimeline class="arc" />
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
import "intersection-observer";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

export default {
  name: "App",
  components: {
    arcTimeline,
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
  background: rgba(50, 47, 49, 0.95);
}
</style>

