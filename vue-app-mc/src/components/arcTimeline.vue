<template>
  <Scrollama :offset="0.8" @step-enter="handler">
    <svg :height="height" :width="width" class="arc">
      <g class="arc"></g>
    </svg>
    <div class="step" data-step-no="1" v-for="link in links" :key="link">
      <div class="step-text">
        <h2 class="step-title">{{ link.title }}</h2>
        <div class="flex-container">
          <div class="flex-child">
            <h3>{{ link.year1 }}</h3>
            <p class="timeline-desc">{{ link.text1 }}</p>
          </div>
          <div class="flex-child">
            <h3>{{ link.year2 }}</h3>
            <p class="timeline-desc">{{ link.text2 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="1"></div>
    <div class="step last-step" data-step-no="1">
      <p>
        Pharmaceutical companies blame 'recreational users', framing them as
        criminals, and advocate for 'medical users'. <br />This manipulation of
        fact plays a role in history repeating itself, but
        <b>what really happens when your brain becomes addicted to opioids?</b>
      </p>
      <p>BRAIN IMAGE/ SNEAK PEAK/ BUTTON</p>
    </div>
    <!-- <v-btn block> Block Button </v-btn> -->
  </Scrollama>
</template>

<script>
import * as d3 from "d3";
import data from "../../timeline-data.json";
import Scrollama from "../../vue-scrollama/src/Scrollama.vue";
import "intersection-observer";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

const MAX_SVG_WIDTH = 1400;

const rectWidth = 30;
const rectHeight = 2;
var margin = { top: 20, right: 30, bottom: 20, left: 30 };

export default {
  name: "arcTimeline",
  components: {
    Scrollama,
  },

  data() {
    return {
      links: data.links,
      nodes: data.nodes,
      currStep: 0,
      currLink: data.links.target,
      width: MAX_SVG_WIDTH,
      height: 800,
      drawnLinks: [],
      arcNumber: 9,
    };
  },
  props: {
    data: {
      nodes: Array,
      links: Array,
    },
  },

  methods: {
    drawChart() {
      var allNodes = this.nodes.map(function (d) {
        return d.name;
      });

      var x = d3
        .scalePoint()
        .range([0, this.width - margin.right - margin.left])
        .domain(allNodes);

      var svg = d3
        .select(".arc")
        .selectAll("g.arc")
        .attr("width", this.width - margin.right - margin.left)
        .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg
        .selectAll("mynodes")
        .data(this.nodes)
        .enter()
        .append("rect")
        .attr("id", "rects")
        .attr("y", 0)
        .attr("x", function (d) {
          return x(d.name) - rectWidth / 2;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .style("fill", "darkgray")
        .attr("id", (d) => d.id)
        .transition()
        .ease(d3.easeBounce)
        .duration((d, i) => i * 200)
        .attr("y", this.height - 752)
        .attr("class", "timelineNodes");

      // And give them a label
      svg
        .selectAll("mylabels")
        .data(this.nodes)
        .enter()
        .append("text")
        .attr("y", 30)
        .attr("x", function (d) {
          return x(d.name);
        })
        .text(function (d) {
          return d.name;
        })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("font-family", "monospace")
        .style("font-size", "16px")
        // .style("font-weight", 100)
        .attr("fill", "#dfdfdf")
        .attr("class", "timelineNodes");

      //add gradient color to paths
      var defs = svg.append("defs");
      var linearGradient = defs
        .append("linearGradient")
        .attr("id", "linear-gradient");
      linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      //Set the color for the start (0%)
      linearGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "cornsilk"); //light blue

      //Set the color for the end (100%)
      linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#9eb4ca"); //dark blue

      // Add links between nodes. Here is the tricky part.
      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      var idToNode = {};
      this.nodes.forEach(function (n) {
        idToNode[n.id] = n;
      });

      // Add the links
      function buildArc(d) {
        const start = x(idToNode[d.source].name); // X position of start node on the X axis
        const end = x(idToNode[d.target].name);

        // X position of end node
        const arcPath = [
          "M",
          start,
          50, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
          "A", // This means we're gonna build an elliptical arc
          (start - end) / 4,
          ",", // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
          (start - end) / 4,
          0,
          0,
          ",",
          end < start ? 0 : 0,
          end,
          ",",
          50,
        ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
          .join(" ");
        return arcPath;
      }

      const arcs = svg
        .selectAll("arcs")
        .data(this.links)
        .enter()
        .append("path")
        .style("fill", "none")
        .attr("d", (d) => buildArc(d))
        .attr("opacity", 0.1)
        .attr("stroke-width", 1);

      // do the animation; see the posts on arc animation for explanation
      arcs
        // hide the arcs
        .attr("stroke-dasharray", function () {
          return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function () {
          return this.getTotalLength();
        })
        .attr("stroke", "url(#linear-gradient")

        // reveal the arcs
        .transition()
        .duration(4000)
        .attr("stroke-dashoffset", 0);

      // console.log(selectedArc);

      // // hide them again
      // .transition()
      // .attr("stroke-dasharray", function () {
      //   return this.getTotalLength();
      // })
      // .attr("stroke-dashoffset", function () {
      //   return this.getTotalLength();
      // });

      return svg.node();
    },

    tracePath(index) {
      var allNodes = this.nodes.map(function (d) {
        return d.name;
      });

      var x = d3
        .scalePoint()
        .range([0, this.width - margin.right - margin.left])
        .domain(allNodes);

      var svg = d3
        .select(".arc")
        .selectAll("g.arc")
        .attr("width", this.width - margin.right - margin.left)
        .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //add gradient color to paths
      var defs = svg.append("defs");
      var linearGradient = defs
        .append("linearGradient")
        .attr("id", "linear-gradient");
      linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      //Set the color for the start (0%)
      linearGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "cornsilk"); //cornsilk

      //Set the color for the end (100%)
      linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#9eb4ca"); //light blue

      // Add links between nodes. Here is the tricky part.
      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      var idToNode = {};
      this.nodes.forEach(function (n) {
        idToNode[n.id] = n;
      });

      // Add the links
      function buildArc(d) {
        const start = x(idToNode[d.source].name); // X position of start node on the X axis
        const end = x(idToNode[d.target].name);

        // X position of end node
        const arcPath = [
          "M",
          start,
          50, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
          "A", // This means we're gonna build an elliptical arc
          (start - end) / 4,
          ",", // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
          (start - end) / 4,
          0,
          0,
          ",",
          end < start ? 0 : 0,
          end,
          ",",
          50,
        ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
          .join(" ");
        return arcPath;
      }

      const arcs = svg
        .selectAll("arcs")
        .data(this.links.slice(index - 1, index))
        .enter()
        .append("path")
        .style("fill", "none")
        .attr("d", (d) => buildArc(d))
        .attr("stroke-width", 2)
        .attr("opacity", 0.6)
        .attr("class", "drawnArc")
        .attr("id", function (d, i) {
          return "arc-no-" + i;
        });

      // do the animation; see the posts on arc animation for explanation
      arcs
        // hide the arcs
        .attr("stroke-dasharray", function () {
          return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function () {
          return this.getTotalLength();
        })
        .attr("stroke", "url(#linear-gradient")
        .attr("id", function (d, i) {
          return "arc-no-" + i;
        })
        // reveal the arcs
        .transition()
        .duration(4000)
        .attr("stroke-dashoffset", 0);

      // hide them again
      // .transition()
      // .attr("stroke-dasharray", function () {
      //   return this.getTotalLength();
      // })
      // .attr("stroke-dashoffset", function () {
      //   return this.getTotalLength();
      // });

      return svg.node();
    },

    handler({ element, index, direction }) {
      if (index === 0 && direction === "down") this.drawChart();
      if (index === index && direction === "down") this.tracePath(index);
      if (direction === "down") element.classList.add("active");
      else element.classList.remove("active"); //comment this if you want reveals only while scrolling down
      console.log(index);
    },

    onResize() {
      this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
  },

  mounted() {
    console.log("component mounted");
    // this.drawChart();
    console.log("i am mounted");
    // console.log(this.links[0]);
    this.currTitle = this.links[0].title;
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>


<style>
.step-text {
  max-width: 100%;
  border-radius: 15px;
  color: white;
  padding: 15px 15px 15px 15px;
  pointer-events: all;
}

.step-text {
  max-width: 75%;
  border-radius: 10px;
  background: #283544;
  backface-visibility: inherit;
  color: white;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: monospace;
}

.step-title {
  background: -webkit-linear-gradient(left, cornsilk, #9eb4ca);
  background: -o-linear-gradient(right, cornsilk, #9eb4ca);
  background: -moz-linear-gradient(right, cornsilk, #9eb4ca);
  background: linear-gradient(to right, cornsilk, #9eb4ca);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0;
  margin-top: 5px;
}
.timeline-desc {
  border: 1px solid darkgray;
  padding: 15px;
  margin: 12px;
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
  padding: 1vh 0;
  /* height: 100vh; */
  /* position: relative; */
  margin: 0 3rem;
  margin-bottom: 100vh;
  margin-left: 5vw;
  margin-right: 5vw;
  display: flex;
  /* align-items: flex-start; */
  font-family: monospace;
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
  position: sticky;
  top: 0;
}

.step.active {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  position: -webkit-sticky;
}

.timeline {
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

.highlight-arc {
  stroke-width: 6px;
}
</style>
