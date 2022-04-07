<template>
  <div>
    <div class="intro">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, at
        velit sint facere ipsam doloremque placeat vel impedit sapiente alias.
      </p>
      <p>SCROLL TO CONTINUE</p>
    </div>

    <div class="main">
      <div class="main__graphic">{{ currStep }}</div>
      <Scrollama
        :debug="true"
        :offset="0.5"
        @step-enter="({ element }) => (currStep = element.dataset.stepNo)"
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
import "intersection-observer";
import Scrollama from "vue-scrollama";

export default {
  name: "Scroll",
  components: {
    Scrollama,
  },
  data() {
    return {
      currStep: null,
    };
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

/* // your elements styles */
.main__graphic {
  height: 100%;
  margin: 0 3rem;
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step {
  padding: 20vh 0;
  margin: 0 3rem;
  margin-bottom: 10vh;
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