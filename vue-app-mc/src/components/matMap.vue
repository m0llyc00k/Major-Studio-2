<template>
  <Scrollama :offset="0.8" @step-enter="handler">
    <!-- <Scrollama :offset="0.8"> -->
    <svg :height="mapHeight" :width="mapWidth" class="map-overlay"></svg>

    <div class="step" data-step-no="1">
      <div class="step-map">
        <p class="map-text">
          As a result of the overprescription of opioids, overdoses have been
          steadily increasing since the 1990s. The map below shows national
          <br />
          <b class="big-bold">overdose deaths per 100,000 people</b> <br />from
          2010 - 2020.
        </p>
        <!-- <p class="map-desc">As a result of the overpre</p> -->
      </div>
    </div>
    <div class="step" data-step-no="2">
      <div class="step-map">
        <div class="flex-container">
          <div class="map-desc">
            <input
              type="radio"
              id="pills"
              value="pills"
              @change="pillOpacity1"
              v-model="medication"
            />
            <label for="pills">Pills per person [2012]</label>
            <br /><br />
            <input
              type="radio"
              id="mat"
              value="mat"
              @change="matOpacity1"
              v-model="medication"
            />
            <label for="mat">MAT Treatment Providers [2022]</label>
          </div>
          <div class="flex-child">
            <p class="map-desc">
              There is a direct correlation between
              <b>pills prescribed per person</b> and <b>overdose deaths</b> from
              the last decade. In counties where prescriptions were higher,
              overdoses are also more prevelant. Alternatively, we would expect
              recovery providers to follow the same pattern and be as available
              in counties that are vulnerable to overdose deaths. This
              unfortunately is not the case. Toggle between Pills per person and
              MAT centers to see the difference.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="step" data-step-no="3">
      <div class="step-map">
        <h2 class="step-title-map">Conclusion</h2>
        <div class="flex-container">
          <div class="flex-child">
            <p class="map-desc">
              The gripping effect that opioids have on the brain combined with
              the inaccessibility of MAT leaves the nation crippled with little
              chance of recovery.
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
import jenks from "./../jenks.js";
import Scrollama from "../../vue-scrollama/src/Scrollama.vue";
import "intersection-observer";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

const MAX_SVG_WIDTH = 1400;
//blues
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
//pinks
const colorPink = d3
  .scaleQuantile()
  .range(["#e0cedc", "#d8b4d1", "#cf9ac5", "#c780b9", "#be64ac"]);

const url =
  "https://raw.githubusercontent.com/m0llyc00k/Thesis-2022/main/mainland_counties.json";

export default {
  name: "matMap",
  components: {
    Scrollama,
    jenks,
  },

  data() {
    return {
      //   geoData: data.features,
      geoData: null,
      currStep: 0,
      width: MAX_SVG_WIDTH,
      mapHeight: 600,
      mapWidth: 1000,
      medication: null,
    };
  },

  mounted() {
    this.getData();
    // this.makeOpacity();
    window.addEventListener("resize", this.onResize);
  },
  // created() {
  //   this.getData();
  // },

  props: {
    data: {
      data: Array,
      //   deathAccessor: Array,
      mapHeight: Number,
      mapWidth: Number,
    },
  },

  computed: {
    projection() {
      return d3
        .geoAlbersUsa()
        .translate([this.mapWidth / 2, this.mapHeight / 2])
        .scale([1300]);
    },
    path() {
      return d3.geoPath().projection(this.projection);
    },
  },

  methods: {
    async getData() {
      await d3.json(url).then((geojson) => {
        const geoData = geojson.features;
        this.geoData = geoData;
        this.drawDeaths();
        this.drawPills();
        this.drawMat();

        d3.selectAll("#deaths-overlay").attr("opacity", 0);
        d3.selectAll("#pill-overlay").attr("opacity", 0);
        d3.selectAll("#mat-overlay").attr("opacity", 0);

        if (geojson.features) {
          console.log("Number of features:", geojson.features.length);
          // console.log(geoData);
        }
      });
    },

    deathOpacity1() {
      d3.selectAll("#deaths-overlay").attr("opacity", 1);
    },

    pillOpacity1() {
      d3.selectAll("#mat-overlay").attr("opacity", 0);
      d3.selectAll("#pill-overlay").attr("opacity", 1);
    },

    matOpacity1() {
      d3.selectAll("#pill-overlay").attr("opacity", 0);
      d3.selectAll("#mat-overlay").attr("opacity", 1);
    },

    drawDeaths() {
      // d3.selectAll("#pill-overlay").remove();
      // d3.selectAll("#mat-overlay").remove();

      var deathGroup = d3
        .select(".map-overlay")
        .append("g")
        .attr("id", "death-group");

      // calculate jenks natural breaks'
      // const colorVariable = pillAccessor;
      const numberOfClasses = colorPink.range().length;
      const jenksNaturalBreaks = jenks(
        this.geoData.map((d) => d.properties.DEATHSPER),
        numberOfClasses
      );
      // console.log( this.geoData.map((d) => d.properties.DEATHSPER)
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
        .attr("d", this.path)
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
      // d3.selectAll("#mat-overlay").remove();

      var svgPill = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "pill-overlay");
      // .attr("viewBox", [0, 0, 975, 610]);

      var pillGroup = svgPill.append("g").attr("id", "pill-group");

      // calculate jenks natural breaks'
      const numberOfClasses = colorBlue.range().length - 2;
      const jenksNaturalBreaks = jenks(
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
        .attr("d", this.path)
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
      // d3.selectAll("#pill-overlay").remove();

      var svgMat = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "mat-overlay");
      // .attr("viewBox", [0, 0, 975, 610]);

      var matGroup = svgMat.append("g").attr("id", "mat-group");

      // calculate jenks natural breaks'
      // const colorVariable = pillAccessor;
      const numberOfClasses = colorBlue.range().length - 2;
      const jenksNaturalBreaks = jenks(
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
        .attr("d", this.path)
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
        .attr("id", "mat-overlay");
    },

    handler({ element, index, direction }) {
      if (index === (0 || 1)) this.deathOpacity1();
      // if (index === 2) this.pillOpacity1();
      // if (index === 3) this.matOpacity1();
      if (direction === "down") element.classList.add("active");
      console.log(index);
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
.big-bold {
  font-size: 1.5em;
  font-weight: 500;
  /* line-height: 1.8; */
}
.step-map {
  max-width: 60%;
  border-radius: 10px;
  background: #212b38;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: "Inter var", sans-serif;
  border: 0.5px solid rgba(169, 169, 169, 0.2);
  background: #151c24;
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

.map-text {
  padding: 15px;
  margin: 12px;
  border-radius: 10px;
  color: #dfdfdf;
  font-size: 1.4em;
  line-height: 1.4;
}

.flex-container {
  display: flex;
  justify-content: left;
  align-items: top;
}

.flex-child {
  flex: 1;
  /* align-items: flex-start; */
  justify-content: left;
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