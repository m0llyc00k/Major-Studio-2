<template>
  <Scrollama :offset="0.8" @step-enter="handler">
    <!-- <Scrollama :offset="0.8"> -->
    <svg :height="mapHeight" :width="mapWidth" class="map-overlay"></svg>
    <!-- <div class="step" data-step-no="1"></div> -->
    <div class="step" data-step-no="2">
      <div class="step-map">
        <h2 class="step-title-map"></h2>
        <div class="flex-container">
          <div class="flex-child">
            <p class="map-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="3">
      <div class="step-map">
        <h2 class="step-title-map"></h2>
        <div class="flex-container">
          <div class="flex-child">
            <p class="map-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="4">
      <div class="step-map">
        <h2 class="step-title-map"></h2>
        <div class="flex-container">
          <div class="flex-child">
            <p class="map-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="5">
      <div class="step-map">
        <h2 class="step-title-map"></h2>
        <div class="flex-container">
          <div class="flex-child">
            <p class="map-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="6">
      <div class="step-map">
        <h2 class="step-title-map"></h2>
        <div class="flex-container">
          <div class="flex-child">
            <p class="map-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="7"></div>
    <div class="step last-step" data-step-no="8">
      <p>outro</p>
      <!-- <p>BRAIN IMAGE/ SNEAK PEAK/ BUTTON</p> -->
    </div>
    <!-- <v-btn block> Block Button </v-btn> -->
    <jenks />
  </Scrollama>
</template>

<script>
import * as d3 from "d3";
// import * as jenks from "./../jenks.js";
// import data from "../../../mainland_counties.json";
// import jenks from "./jenks.vue";
import Scrollama from "../../vue-scrollama/src/Scrollama.vue";
import "intersection-observer";
// import axios from "axios";
// import { defineComponent, onMounted, ref } from "vue";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

const MAX_SVG_WIDTH = 1400;
const url =
  "https://raw.githubusercontent.com/m0llyc00k/Thesis-2022/main/mainland_counties.json";

export default {
  name: "matMap",
  components: {
    Scrollama,
    // jenks,
  },
  data() {
    return {
      //   geoData: data.features,
      geoData: null,
      currStep: 0,
      width: MAX_SVG_WIDTH,
      mapHeight: 600,
      mapWidth: 1000,
    };
  },
  mounted() {
    this.getData();
    window.addEventListener("resize", this.onResize);
  },

  props: {
    data: {
      data: Array,
      //   deathAccessor: Array,
      mapHeight: Number,
      mapWidth: Number,
    },
  },

  //   computed: {
  //     projection() {
  //       return d3
  //         .geoAlbersUsa()
  //         .translate([this.mapWidth / 2, this.mapHeight / 2])
  //         .scale([1300]);
  //     },
  //     path() {
  //       return d3.geoPath().projection(this.projection());
  //     },
  //   },

  methods: {
    async getData() {
      await d3.json(url).then((geojson) => {
        const geoData = geojson.features;
        this.geoData = geoData;

        // Asynchronous JavaScript waiting for data promise to complete before moving on to .then()
        if (geojson.features) {
          console.log("Number of features:", geojson.features.length);
          console.log(geoData);
          //   objects = geojson;
        }
      });
    },

    jenks(data, n_classes) {
      function getMatrices(data, n_classes) {
        var lower_class_limits = [],
          variance_combinations = [],
          i,
          j,
          variance = 0;

        for (i = 0; i < data.length + 1; i++) {
          var tmp1 = [],
            tmp2 = [];
          for (j = 0; j < n_classes + 1; j++) {
            tmp1.push(0);
            tmp2.push(0);
          }
          lower_class_limits.push(tmp1);
          variance_combinations.push(tmp2);
        }

        for (i = 1; i < n_classes + 1; i++) {
          lower_class_limits[1][i] = 1;
          variance_combinations[1][i] = 0;

          for (j = 2; j < data.length + 1; j++) {
            variance_combinations[j][i] = Infinity;
          }
        }

        for (var l = 2; l < data.length + 1; l++) {
          var sum = 0,
            sum_squares = 0,
            w = 0,
            i4 = 0;

          for (var m = 1; m < l + 1; m++) {
            var lower_class_limit = l - m + 1,
              val = data[lower_class_limit - 1];

            w++;

            sum += val;
            sum_squares += val * val;

            variance = sum_squares - (sum * sum) / w;

            i4 = lower_class_limit - 1;

            if (i4 !== 0) {
              for (j = 2; j < n_classes + 1; j++) {
                if (
                  variance_combinations[l][j] >=
                  variance + variance_combinations[i4][j - 1]
                ) {
                  lower_class_limits[l][j] = lower_class_limit;
                  variance_combinations[l][j] =
                    variance + variance_combinations[i4][j - 1];
                }
              }
            }
          }

          lower_class_limits[l][1] = 1;
          variance_combinations[l][1] = variance;
        }

        return {
          lower_class_limits: lower_class_limits,
          variance_combinations: variance_combinations,
        };
      }

      function breaks(data, lower_class_limits, n_classes) {
        var k = data.length - 1,
          kclass = [],
          countNum = n_classes;

        kclass[n_classes] = data[data.length - 1];
        kclass[0] = data[0];

        while (countNum > 1) {
          kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2];
          k = lower_class_limits[k][countNum] - 1;
          countNum--;
        }

        return kclass;
      }

      if (n_classes > data.length) return null;

      data = data.slice().sort(function (a, b) {
        return a - b;
      });

      var matrices = getMatrices(data, n_classes),
        lower_class_limits = matrices.lower_class_limits;

      return breaks(data, lower_class_limits, n_classes);
    },

    drawDeaths() {
      var projection = d3
        .geoAlbersUsa()
        .translate([this.mapWidth / 2, this.mapHeight / 2])
        .scale([1300]);

      var path = d3.geoPath().projection(projection);

      var deathGroup = d3.select(".map-overlay").append("g");

      //pinks
      const colorPink = d3
        .scaleQuantile()
        .range(["#e0cedc", "#d8b4d1", "#cf9ac5", "#c780b9", "#be64ac"]);

      // calculate jenks natural breaks'
      // const colorVariable = pillAccessor;
      const numberOfClasses = colorPink.range().length;
      const jenksNaturalBreaks = this.jenks(
        this.geoData.map((d) => d.properties.DEATHSPER),
        numberOfClasses
      );
      console.log("numberOfClasses", numberOfClasses);
      console.log("jenksNaturalBreaks", jenksNaturalBreaks);

      // set the domain of the color scale based on our data
      colorPink.domain(jenksNaturalBreaks);

      var nullColor = "none";

      deathGroup
        .selectAll("path")
        .data(this.geoData)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "none")
        .attr("fill", function (d) {
          if (d.properties.DEATHSPER != null) {
            return colorPink(d.properties.DEATHSPER);
          } else {
            return nullColor;
          }
        })
        .attr("opacity", 1)
        .attr("id", "deaths-overlay");
    },

    drawPills() {
      var projection = d3
        .geoAlbersUsa()
        .translate([this.mapWidth / 2, this.mapHeight / 2])
        .scale([1300]);

      var path = d3.geoPath().projection(projection);
      var svgPill = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "pill-overlay");
      // .attr("viewBox", [0, 0, 975, 610]);

      var pillGroup = svgPill.append("g");

      const colorBlue = d3
        .scaleQuantile()
        .range([
          "rgb(222,235,247)",
          "rgb(198,219,239)",
          "rgb(158,202,225)",
          "rgb(107,174,214)",
          "rgb(66,146,198)",
          "rgb(33,113,181)",
          "rgb(8,81,156)",
          "rgb(8,48,107)",
          "rgb(3,19,43)",
        ]);

      //green/ blues
      //   const colorTurq = d3
      //     .scaleQuantile()
      //     .range(["#cee2e2", "#b3dcdc", "#97d6d6", "#7acfcf", "#5ac8c8"]);

      // calculate jenks natural breaks'
      const numberOfClasses = colorBlue.range().length - 2;
      const jenksNaturalBreaks = this.jenks(
        this.geoData.map((d) => d.properties.PILLS),
        numberOfClasses
      );
      console.log("numberOfClasses", numberOfClasses);
      console.log("jenksNaturalBreaks", jenksNaturalBreaks);

      // set the domain of the color scale based on our data
      colorBlue.domain(jenksNaturalBreaks);

      var nullColor = "none";

      pillGroup
        .selectAll("path")
        .data(this.geoData)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", function (d) {
          if (d.properties.PILLS != null && d.properties.DEATHSPER == null) {
            return "notMultiplied";
          } else {
            return "multiplied";
          }
        })
        .attr("stroke", "none")
        .attr("fill", function (d) {
          if (d.properties.PILLS != null) {
            return colorBlue(d.properties.PILLS);
          } else {
            return nullColor;
          }
        })
        .attr("id", "pill-overlay");
    },

    drawMat() {
      d3.selectAll("#pill-overlay").remove();

      var projection = d3
        .geoAlbersUsa()
        .translate([this.mapWidth / 2, this.mapHeight / 2])
        .scale([1300]);

      var path = d3.geoPath().projection(projection);
      var svgMat = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "mat-overlay");
      // .attr("viewBox", [0, 0, 975, 610]);

      var matGroup = svgMat.append("g");

      const colorBlue = d3
        .scaleQuantile()
        .range([
          "rgb(222,235,247)",
          "rgb(198,219,239)",
          "rgb(158,202,225)",
          "rgb(107,174,214)",
          "rgb(66,146,198)",
          "rgb(33,113,181)",
          "rgb(8,81,156)",
          "rgb(8,48,107)",
          "rgb(3,19,43)",
        ]);

      // calculate jenks natural breaks'
      // const colorVariable = pillAccessor;
      const numberOfClasses = colorBlue.range().length - 2;
      const jenksNaturalBreaks = this.jenks(
        this.geoData.map((d) => d.properties.MAT),
        numberOfClasses
      );
      console.log("numberOfClasses", numberOfClasses);
      console.log("jenksNaturalBreaks", jenksNaturalBreaks);

      // set the domain of the color scale based on our data
      colorBlue.domain(jenksNaturalBreaks);

      var nullColor = "none";

      matGroup
        .selectAll("path")
        .data(this.geoData)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", function (d) {
          if (d.properties.MAT != null && d.properties.DEATHSPER == null) {
            return "multiplied-mat";
          } else {
            return "notMultiplied-mat";
          }
        })
        .attr("stroke", "none")
        .attr("fill", function (d) {
          if (d.properties.MAT != null) {
            return colorBlue(d.properties.MAT);
          } else {
            return nullColor;
          }
        })

        // .attr("opacity", .7)
        .attr("id", "mat-overlay");
    },

    // getData()

    handler({ element, index, direction }) {
      if (index === 0 && direction === "down") this.drawDeaths();
      if (index === 1 && direction === "down") this.drawPills();
      if (index === 2 && direction === "down") this.drawMat();
      if (direction === "down") element.classList.add("active");
      console.log(index);
      console.log(this.geoData[0].properties.DEATHSPER);
    },

    onResize() {
      this.mapWidth = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>


<style>
.step-map {
  max-width: 75%;
  border-radius: 10px;
  background: #212b38;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: monospace;
  border: 0.5px solid rgba(169, 169, 169, 0.2);
}

.step-title-map {
  background: -webkit-linear-gradient(left, #bacdcd, #cfbac4);
  background: -o-linear-gradient(right, #bacdcd, #cfbac4);
  background: -moz-linear-gradient(right, #bacdcd, #cfbac4);
  background: linear-gradient(to right, #bacdcd, #cfbac4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 5px;
  margin-top: 10px;
  font-size: 20px;
}
.map-desc {
  border: 0.5px solid rgba(169, 169, 169, 0.6);
  padding: 15px;
  margin: 12px;
  border-radius: 10px;
  color: #dfdfdf;
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
  color: #bacdcd;
}

.step {
  padding: 2vh 0;
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

.multiplied {
  mix-blend-mode: multiply;
  opacity: 0.7;
}

.notMultiplied {
  mix-blend-mode: multiply;
  opacity: 1;
}

.multiplied-mat {
  mix-blend-mode: multiply;
  opacity: 0;
}

.notMultiplied-mat {
  mix-blend-mode: multiply;
  opacity: 0.7;
}

/* .path-null {
  stroke: white;
  stroke-width: 0.25px;
  fill: gray;
} */

.map-overlay {
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
</style>