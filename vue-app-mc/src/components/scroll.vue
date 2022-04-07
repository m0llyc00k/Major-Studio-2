<template>
  <Scrollama @step-enter="stepEnterHandler">
    <div class="step-1" data-step="a">...</div>
    // classes like .step-1 may be used to adjust the style and dimensions of a
    step
    <div class="step-2" data-step="b">...</div>
    // data-* attributes can be helpful to store instructions to be used in
    handlers
    <div class="step-3" data-step="c">...</div>
  </Scrollama>
</template>

<script>
import "intersection-observer"; // for cross-browser support
import Scrollama from "vue-scrollama"; // local registration in this example, can also be globally registered

export default {
  components: {
    Scrollama, // local registration in this example, can also be globally registered
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