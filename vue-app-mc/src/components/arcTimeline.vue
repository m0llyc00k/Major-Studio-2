<template>
  <Scrollama :offset="0.5" @step-enter="arcHandler">
    <svg :height="height" :width="width" class="arc" style="padding-top: 100px">
      <g class="arc"></g>
    </svg>
    <div class="step step-arc" v-for="link in links" :key="link">
      <div class="step-text">
        <h2 class="step-title">{{ link.title }}</h2>
        <div class="flex-container">
          <div class="flex-child">
            <h3 class="year-text">{{ link.year1 }}</h3>
            <p class="timeline-desc">{{ link.text1 }}</p>
          </div>
          <div class="flex-child">
            <h3 class="year-text">{{ link.year2 }}</h3>
            <p class="timeline-desc">{{ link.text2 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="step step-arc">
      <div class="last-step-text">
        <p>
          Pharmaceutical companies blame <em>'recreational users'</em>, framing
          them as criminals,<br />
          while advocating for <em>'medical users'</em>, positioning them as
          victims. <br /><br />This manipulation of fact plays a role in history
          repeating itself, but <br />
          <span class="emphasize-color"
            >what really happens when your brain becomes addicted to
            opioids?</span
          >
        </p>
      </div>
    </div>
    <div class="step step-arc"></div>
  </Scrollama>
</template>

<script>
import * as d3 from "d3";
import data from "../../timeline-data.json";
import Scrollama from "../../vue-scrollama/src/Scrollama.vue";
import "intersection-observer";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

const MAX_SVG_WIDTH = 1300;

const rectWidth = 12;
const rectHeight = 12;
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
        .style("fill", "#b2b2b2")
        .attr("opacity", 0.8)
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
        .attr("fill", "#b2b2b2")
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
        .attr("stop-color", "rgb(66,146,198)"); //light blue

      //Set the color for the end (100%)
      linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ba8ca0"); //light purple

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
        .attr("opacity", 0.9)
        .attr("class", "drawnArc")
        .attr("stroke-width", 2);

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

      return svg.node();
    },

    arcHandler({ element, index, direction }) {
      const currArc = document.getElementsByClassName("drawnArc");
      // let highlightArc = document.getElementsByClassName("highlight-arc");
      console.log(index);
      if (index === 0 && direction === "down") this.drawChart();
      if (index === 10)
        d3.selectAll(".arc").transition().duration(1000).attr("opacity", 0);
      if (index === 9) d3.selectAll(".arc").attr("opacity", 1);

      if (index === index && direction === "down") this.tracePath(index);
      if (direction === "down") element.classList.add("active");
      if (index) {
        let highlightArc = document.getElementsByClassName("highlight-arc");
        if (highlightArc.length == 0) {
          currArc[index - 1].classList.add("highlight-arc");
        } else {
          highlightArc[0].classList.remove("highlight-arc");
          currArc[index - 1].classList.add("highlight-arc");
        }
      }
    },

    // onResize() {
    //   this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    // },
  },

  mounted() {
    console.log("component mounted");
    // this.drawChart();
    console.log("i am mounted");
    // console.log(this.links[0]);
    this.currTitle = this.links[0].title;
    // window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    // window.removeEventListener("resize", this.onResize);
  },
};
</script>


<style>
@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}

.para-text {
  font-size: 1.2em;
}
.step-text {
  max-width: 80%;
  border-radius: 10px;
  background: #151c24;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: "Inter var", sans-serif;
  /* border: 0.5px solid rgba(169, 169, 169, 0.2); */
}

.last-step-text {
  max-width: 75%;
  border-radius: 10px;
  background: #151c24;
  backface-visibility: inherit;
  padding: 15px 25px 30px 25px;
  font-family: "Inter var", sans-serif;
  font-size: 1.2em;
  line-height: 1.5;
  /* border: 0.5px solid rgba(169, 169, 169, 0.2); */

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.134),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.16),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.25);
}

.step-text-intro {
  max-width: 50%;
  border-radius: 10px;
  background: #212b38;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: "Inter var", sans-serif;
  border: 0.5px solid rgba(169, 169, 169, 0.2);
}

.last-step {
  border-radius: 10px;
  background: #212b38;
  max-width: 60%;
  padding: 25vh 0;
  line-height: 1.6;
  /* backface-visibility: inherit; */
  padding: 20px 10px 30px 10px;
  font-size: 18px;
  margin: 0 25rem;
  border: 0.5px solid rgba(169, 169, 169, 0.2);
}

.step-arc {
  padding: 2vh 0;
  /* height: 100vh; */
  /* position: relative; */
  margin: 0 3rem;
  margin-bottom: 100vh;
  margin-left: 5vw;
  margin-right: 5vw;
  display: flex;
  /* align-items: flex-start; */
  font-weight: 00;
  font-size: 15px;
  pointer-events: none;
  /* visibility: hidden; */
  /* opacity: 0; */
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

/* #bacdcd */

.step-title {
  color: #dfdfdf;
  padding-bottom: 5px;
  margin-top: 10px;
  font-size: 20px;
}

.timeline-desc {
  border: 0.5px solid rgba(169, 169, 169, 0.6);
  padding: 15px;
  margin: 12px;
  border-radius: 10px;
  color: #dfdfdf;
  background: #212b38;
}

.year-text {
  padding: 0;
  margin: 0;
  font-family: monospace;
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
  color: #cfbac4;
}

.flex-child:first-child {
  flex: 1;
  /* align-items: flex-start; */
  justify-content: center;
  color: rgb(107, 174, 214);
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
  stroke-width: 5px;
  opacity: 1;
}
</style>
