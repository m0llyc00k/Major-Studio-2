<template>
  <div class="main-map">
    <Scrollama :offset="0.25" @step-enter="handler">
      <svg
        :height="mapHeight"
        :width="mapWidth"
        class="map-overlay"
        style="padding-top: 50px; padding-bottom: 0px"
      >
        <defs>
          <marker
            id="arrow"
            markerUnits="strokeWidth"
            markerWidth="12"
            markerHeight="12"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #dfdfdf"></path>
          </marker>
        </defs>
      </svg>

      <div class="step" data-step-no="1">
        <div class="step-map">
          <p class="map-text">
            As a result of the overprescription of opioids, overdoses have been
            steadily increasing since the onset of the epidemic. The map below
            shows national
            <b class="emphasize-color-pink"
              >overdose deaths per 100,000 people</b
            >
            from 2010 - 2020.
          </p>
        </div>
      </div>
      <div class="step" data-step-no="2">
        <div class="step-map">
          <div class="flex-container">
            <div class="map-desc">
              <ul>
                <li>
                  <p class="inline-title">
                    MAT Provider vs. Prescription Availability:
                  </p>
                </li>
                <li>
                  <input
                    type="radio"
                    id="radio"
                    value="pills"
                    @change="pillOpacity1"
                    v-model="medication"
                  />
                  <label for="pills">Pills per 100 People [2012]</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="radio"
                    value="mat"
                    @change="matOpacity1"
                    v-model="medication"
                  />
                  <label for="deaths">MAT Treatment Providers [2022]</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="radio"
                    value="deaths"
                    @change="noOpacityButDeath"
                    v-model="medication"
                  />
                  <label for="mat">Remove MAT / Pill Overlay</label>
                </li>
              </ul>
            </div>
            <div class="flex-child">
              <p class="map-desc">
                There is a direct correlation between
                <b class="emphasize-color">pills prescribed per 100 people</b>
                and
                <b class="emphasize-color-pink"
                  >overdose deaths per 100,000 people</b
                >
                from the last decade. In counties where prescriptions were
                higher, overdoses are also more prevelant. Alternatively, we
                would expect <b class="emphasize-color">MAT providers</b> to
                follow the same pattern and be just as available in counties
                that are vulnerable.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="step" data-step-no="3">
        <div class="step-map">
          <p class="map-text">
            As seen in the previous maps, there are not enough MAT centers to
            sufficiently treat vulnerable counties. To make matters worse, while
            providers can apply to treat up to 100 patients,
            <span class="emphasize-color"
              >existing providers can typically only treat 30 patients</span
            >
            each within their state.
          </p>
        </div>
      </div>
      <div class="step" data-step-no="3">
        <div class="step-map">
          <!-- <h2 class="step-title-map">All MAT Providers:</h2> -->
          <p class="provider-text">
            Shown here are all listed MAT providers previously accounted for...
          </p>
          <p class="source">
            Source: Substance Abuse and Mental Health Services Administration
          </p>
        </div>
      </div>
      <div class="step" data-step-no="4">
        <div class="step-map">
          <!-- <h2 class="step-title-map">
            MAT Providers Currently Accepting New Patients:
          </h2> -->
          <p class="provider-text">
            ...and here are the providers who haven't met their patient limit.
          </p>
          <p class="source">
            Source: Substance Abuse and Mental Health Services Administration
          </p>
        </div>
      </div>
      <div class="step" data-step-no="5">
        <div></div>
      </div>

      <div class="step" data-step-no="5"></div>
    </Scrollama>
  </div>
</template>

<script>
import * as d3 from "d3";
import jenks from "./../jenks.js";
import Scrollama from "../../vue-scrollama/src/Scrollama.vue";
import "intersection-observer";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

const MAX_SVG_WIDTH = 1400;
//blues
const colorBlue = d3.scaleQuantile().range([
  "rgb(222,235,247)",
  // "rgb(198,219,239)",
  "rgb(158,202,225)",
  // "rgb(107,174,214)",
  "rgb(66,146,198)",
  // "rgb(33,113,181)",
  "rgb(8,81,156)",
  // "rgb(8,48,107)",
  "rgb(3, 19, 102)",
]);

const blues = [
  "rgb(222,235,247)",
  // "rgb(198,219,239)",
  "rgb(158,202,225)",
  // "rgb(107,174,214)",
  "rgb(66,146,198)",
  // "rgb(33,113,181)",
  "rgb(8,81,156)",
  // "rgb(8,48,107)",
  "rgb(3, 19, 102)",
];

//pinks
const colorPink = d3
  .scaleQuantile()
  .range(["#e0cedc", "#d8b4d1", "#cf9ac5", "#c780b9", "#be64ac"]);

const pinks = ["#e0cedc", "#d8b4d1", "#cf9ac5", "#c780b9", "#be64ac"];

var noDataColor = "#253040";

const blueLegendWidth = 22;
const blueLegendHeight = 135;
const pinkLegendWidth = 135;
const pinkLegendHeight = 22;

const url =
  "https://raw.githubusercontent.com/m0llyc00k/Thesis-2022/main/mainland_counties.json";

const urlProviders =
  "https://raw.githubusercontent.com/m0llyc00k/Thesis-2022/main/vue-app-mc/MAT_edit.json";

export default {
  name: "matMap",
  components: {
    Scrollama,
  },

  data() {
    return {
      geoData: null,
      providerData: null,
      currStep: 0,
      width: MAX_SVG_WIDTH,
      mapHeight: 630,
      mapWidth: 1200,
      medication: null,
      checked: null,
    };
  },

  mounted() {
    this.getData();
    this.getProviderData();
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
        this.drawBaseMap();

        d3.selectAll("#deaths-overlay").attr("opacity", 0);
        d3.selectAll("#pill-overlay").attr("opacity", 0);
        d3.selectAll("#mat-overlay").attr("opacity", 0);

        if (geojson.features) {
          console.log("Number of features:", geojson.features.length);
          // console.log(geoData);
        }
      });
    },

    async getProviderData() {
      await d3.json(urlProviders).then((json) => {
        const data = json;
        this.providerData = data;
      });
    },

    drawDeaths() {
      var deathGroup = d3
        .select(".map-overlay")
        .append("g")
        .attr("id", "death-group");

      // calculate jenks natural breaks'
      const numberOfClasses = colorPink.range().length;
      const jenksNaturalBreaks = jenks(
        this.geoData.map((d) => d.properties.DEATHSPER),
        numberOfClasses
      );

      // set the domain of the color scale based on our data
      colorPink.domain(jenksNaturalBreaks);

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
            return noDataColor;
          }
        })
        .attr("opacity", 1)
        .attr("id", "deaths-overlay");

      var deathSvg = d3.select(".map-overlay");

      jenksNaturalBreaks.map((d, i) =>
        deathSvg
          .append("text")
          .attr("x", 10)
          .attr("y", i * 24 + 475)
          .text(
            jenksNaturalBreaks[i - 1] === undefined
              ? ""
              : Number(jenksNaturalBreaks[i - 1]) + " - " + d
          )
          .style("fill", "#dfdfdf")
          .style("font-size", "10px")
          .attr("alignment-baseline", "middle")
          .attr("class", "death-legend")
      );

      ///pink legend for deaths
      pinks.map(
        (d, i) =>
          deathSvg
            .append("rect")
            .attr("x", 65)
            .attr("y", i * 22 + 490)
            .attr("width", pinkLegendWidth)
            .attr("height", pinkLegendHeight)
            .style("fill", d)
            .attr("opacity", 0.7)
            .attr("class", "death-legend")
        // .attr("class", "multiplied")
      );

      ///draw arrow///
      deathSvg
        .append("line")
        .attr("x1", 215)
        .attr("y1", 490)
        .attr("x2", 215)
        .attr("y2", 595)
        .attr("stroke", "#dfdfdf")
        .attr("stroke-width", 1)
        .attr("class", "death-legend")

        .attr("marker-end", "url(#arrow)");

      ///title for arrow
      deathSvg
        .append("text")
        .text("High Death Rate")
        .attr("x", -580)
        .attr("y", 227)
        .attr("transform", "rotate(-90)")
        .style("fill", "#dfdfdf")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
        .attr("class", "death-legend");

      d3.selectAll(".death-legend").attr("opacity", 0);
    },

    drawPills() {
      var svgPill = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "pill-overlay");
      // .attr("viewBox", [0, 0, 975, 610]);

      var pillGroup = svgPill.append("g").attr("id", "pill-group");

      // calculate jenks natural breaks'
      const numberOfClasses = colorBlue.range().length;
      const jenksNaturalBreaksPills = jenks(
        this.geoData.map((d) => d.properties.PILLS),
        numberOfClasses
      );

      // set the domain of the color scale based on our data
      colorBlue.domain(jenksNaturalBreaksPills);

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
            return noDataColor;
          }
        })
        .attr("id", "pill-overlay");

      var pillSvg = d3.select(".map-overlay");

      ///legend text
      jenksNaturalBreaksPills.map((d, i) =>
        pillSvg
          .append("text")
          .attr("x", -450)
          .attr("y", i * 24 + 75)
          .attr("transform", "rotate(-90)")
          .text(
            jenksNaturalBreaksPills[i - 1] === undefined
              ? ""
              : Number(jenksNaturalBreaksPills[i - 1]) + " - " + d
          )
          .style("fill", "#dfdfdf")
          .style("font-size", "10px")
          .attr("alignment-baseline", "middle")
          .attr("class", "pill-legend")
      );

      ///create blues
      blues.map((d, i) =>
        pillSvg
          .append("rect")
          // .attr("opacity", 0.3)
          .attr("x", i * 22 + 90)
          .attr("y", 465)
          .attr("width", blueLegendWidth)
          .attr("height", blueLegendHeight)
          .style("fill", d)
          .style("mix-blend-mode", "multiply")
          .attr("class", "pill-legend")
      );
      // .attr("class", "pill-legend");

      ///draw arrow
      pillSvg
        .append("line")
        .attr("x1", 90)
        .attr("y1", 615)
        .attr("x2", 195)
        .attr("y2", 615)
        .attr("stroke", "#dfdfdf")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow)")
        .attr("class", "pill-legend");

      ///title for arrow
      pillSvg
        .append("text")
        .text("High Pill Rate")
        .attr("x", 110)
        .attr("y", 625)
        .style("fill", "#dfdfdf")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
        .attr("class", "pill-legend");

      d3.selectAll(".pill-legend").attr("opacity", 0);
    },

    drawMat() {
      var svgMat = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "mat-overlay");

      var matGroup = svgMat.append("g").attr("id", "mat-group");

      // calculate jenks natural breaks
      const numberOfClasses = colorBlue.range().length;
      const jenksNaturalBreaksMat = jenks(
        this.geoData.map((d) => d.properties.MAT),
        numberOfClasses
      );

      // set the domain of the color scale based on our data
      colorBlue.domain(jenksNaturalBreaksMat);

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
            return noDataColor;
          }
        })
        .attr("id", "mat-overlay");

      jenksNaturalBreaksMat.map((d, i) =>
        svgMat
          .append("text")
          .attr("x", -450)
          .attr("y", i * 24 + 75)
          .attr("transform", "rotate(-90)")
          .text(
            jenksNaturalBreaksMat[i - 1] === undefined
              ? ""
              : Number(jenksNaturalBreaksMat[i - 1]) + " - " + d
          )
          .style("fill", "#dfdfdf")
          .style("font-size", "10px")
          .attr("alignment-baseline", "middle")
          .attr("class", "mat-legend")
      );

      ///blue legend rects
      blues.map((d, i) =>
        svgMat
          .append("rect")
          .attr("opacity", 0.7)
          .attr("x", i * 22 + 90)
          .attr("y", 465)
          .attr("opacity", 0.8)
          .attr("width", blueLegendWidth)
          .attr("height", blueLegendHeight)
          .style("fill", d)
          .style("mix-blend-mode", "multiply")
          .attr("class", "mat-legend")
      );

      svgMat
        .append("line")
        .attr("x1", 90)
        .attr("y1", 610)
        .attr("x2", 195)
        .attr("y2", 610)
        .attr("stroke", "#dfdfdf")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow)")
        .attr("class", "mat-legend");

      ///title for arrow
      svgMat
        .append("text")
        .text("High MAT Rate")
        .attr("x", 110)
        .attr("y", 625)
        .style("fill", "#dfdfdf")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
        .attr("class", "mat-legend");

      // d3.selectAll(".pill-legend").attr("opacity", 0);
      d3.selectAll(".mat-legend").attr("opacity", 0);
    },

    drawBaseMap() {
      var svgProvider = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "provider-overlay");

      var providerGroup = svgProvider.append("g").attr("id", "provider-group");
      providerGroup
        .selectAll("path")
        .data(this.geoData)
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("stroke", "none")
        .attr("fill", noDataColor)
        .attr("id", "provider-overlay");

      d3.selectAll("#deaths-overlay").attr("opacity", 0);
      d3.selectAll("#pill-overlay").attr("opacity", 0);
      d3.selectAll("#mat-overlay").attr("opacity", 0);

      d3.selectAll("#provider-overlay").attr("opacity", 0);
    },

    drawProviders() {
      var svgProvider = d3.select("#provider-overlay");

      svgProvider
        .append("g")
        .selectAll("circle")
        .data(this.providerData)
        .join("circle")
        .attr(
          "transform",
          (d) => "translate(" + this.projection([d.longitude, d.latitude]) + ")"
        )
        .attr("mix-blend-mode", "multiply")
        .attr("r", 1.2)
        .attr("fill", "#be64ac")
        .attr("opacity", 0.6)
        .attr("class", "all-providers");
    },

    drawProvidersAvail() {
      var svgProvider = d3.select("#provider-overlay");
      var allProviders = d3.selectAll(".all-providers");
      var availData = Array.from(
        this.providerData.filter(function (d) {
          return d.reachedPatientLimit === "N";
        })
      );
      allProviders.remove();

      svgProvider
        .append("g")
        .selectAll("circle")
        .data(availData)
        .join("circle")
        .attr(
          "transform",
          (d) => "translate(" + this.projection([d.longitude, d.latitude]) + ")"
        )
        .attr("r", 1.2)
        .attr("fill", "#be64ac")
        .attr("opacity", 0.6)
        .attr("class", "provider-avail");
    },

    providerMap0() {
      d3.selectAll("#provider-overlay").attr("opacity", 0);
      d3.selectAll(".provider-avail").attr("opacity", 0);
      d3.selectAll(".all-providers").attr("opacity", 0);
      d3.selectAll(".pill-legend").attr("opacity", 0);
      d3.selectAll(".mat-legend").attr("opacity", 0);
      d3.selectAll(".death-legend").attr("opacity", 0);
    },

    redrawBasemap() {
      d3.selectAll(".provider-avail").attr("opacity", 0);
      d3.selectAll(".all-providers").attr("opacity", 0);
    },

    deathOpacity1() {
      d3.selectAll("#deaths-overlay").attr("opacity", 1),
        d3.selectAll(".death-legend").attr("opacity", 1);
    },

    deathOpacity0() {
      d3.selectAll("#deaths-overlay").attr("opacity", 0);
      d3.selectAll(".death-legend").attr("opacity", 0);
    },

    noOpacityButDeath() {
      d3.selectAll("#mat-overlay").attr("opacity", 0);
      d3.selectAll("#pill-overlay").attr("opacity", 0);
      d3.selectAll("#deaths-overlay").attr("opacity", 1);
      d3.selectAll(".pill-legend").attr("opacity", 0);
      d3.selectAll(".mat-legend").attr("opacity", 0);
      d3.selectAll(".death-legend").attr("opacity", 1);
    },

    pillOpacity1() {
      d3.selectAll("#mat-overlay").attr("opacity", 0);
      d3.selectAll("#pill-overlay").attr("opacity", 1);
      d3.selectAll(".pill-legend").attr("opacity", 0.8);
      d3.selectAll(".mat-legend").attr("opacity", 0);
    },

    matOpacity1() {
      d3.selectAll("#pill-overlay").attr("opacity", 0);
      d3.selectAll("#mat-overlay").attr("opacity", 1);
      d3.selectAll(".mat-legend").attr("opacity", 0.8);
      d3.selectAll(".pill-legend").attr("opacity", 0);
    },
    basemapOpacity1() {
      d3.selectAll("#provider-overlay").attr("opacity", 1);
    },
    allLegendsInvisible() {
      d3.selectAll(".death-legend").attr("opacity", 0);
      d3.selectAll(".pill-legend").attr("opacity", 0);
      d3.selectAll(".mat-legend").attr("opacity", 0);
    },

    handler({ element, index, direction }) {
      if (index == 0)
        this.deathOpacity1(),
          this.providerMap0(),
          d3.selectAll(".death-legend").attr("opacity", 0.8);
      if (index == 1)
        this.deathOpacity1(),
          this.providerMap0(),
          d3.selectAll(".death-legend").attr("opacity", 0.8);
      if (index == 2)
        this.deathOpacity1(),
          this.providerMap0(),
          d3.selectAll(".death-legend").attr("opacity", 0.8);
      if (index === 3)
        this.basemapOpacity1(),
          this.redrawBasemap(),
          this.allLegendsInvisible();
      if (index === 4)
        this.drawProviders(), this.deathOpacity0(), this.allLegendsInvisible();
      if (index === 5)
        this.drawProvidersAvail(),
          this.deathOpacity0(),
          this.allLegendsInvisible();
      if (index === 6) this.deathOpacity0(), this.allLegendsInvisible();
      if (direction === "down") element.classList.add("active");
      console.log(index);
    },

    // onResize() {
    //   this.mapWidth = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    // },
  },

  // beforeUnmount() {
  //   window.removeEventListener("resize", this.onResize);
  // },
};
</script>


<style>
.big-bold {
  font-size: 1.2em;
  font-weight: 500;
  line-height: 2;
}

/* input[type="radio"]:checked + label {
  background: #2196f3;
  color: #fff;
  border-color: #2196f3;
} */

#bivariate-legend {
  position: sticky;
}
.emphasize-color {
  /* color: #8097b5; */
  color: #adcdf6;
}

.emphasize-color-pink {
  color: #d8b4d1;
}

.inline-title {
  padding: 0;
  margin: 0 auto;
  line-height: 2.5;
  font-weight: 600;
  font-size: 1.2em;
  text-decoration: underline #8097b5 2px;
  letter-spacing: 1.3px;
}

ul {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
  line-height: 1.6;
  margin-left: 0;
  letter-spacing: 1.3px;
}

.radio-text {
  line-height: 3;
  font-size: 1.1em;
  align-items: center;
  margin: 0 auto;
  padding: 0px;
  flex-direction: column;
  align-items: center;
}

label {
  margin: 6px;
}

.step-map {
  max-width: 80%;
  border-radius: 10px;
  background: #212b38;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: "Inter var", sans-serif;
  background: #151c24;
  z-index: 10000000;
}

.step-title-map {
  color: #dfdfdf;
  padding-bottom: 5px;
  margin-top: 10px;
  font-size: 20px;
}

.map-desc {
  padding: 5px 5px 0px 5px;
  margin: 12px;
  border-radius: 10px;
  color: #dfdfdf;
  line-height: 1.4;
  text-align: left;
  font-size: 0.9 em;
}

.map-text {
  padding: 10px;
  margin: 12px;
  /* border-radius: 10px; */
  color: #dfdfdf;
  font-size: 1.2em;
  line-height: 1.5;
  text-align: left;
}

.provider-text {
  padding: 15px;
  margin: 12px;
  font-size: 1.3em;
}

.flex-container {
  display: flex;
  justify-content: left;
  /* align-items: top; */
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
  pointer-events: none;
  /* visibility: hidden; */
  /* opacity: 0; */
  transform: scale(0.8);
  transition: all 1000ms;
  transform: translateY(60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  /* z-index: 1999999; */
}

.step.active {
  /* visibility: visible; */
  opacity: 1;
  transform: translateY(50);
  position: -webkit-sticky;
  z-index: 10000000;
}

.multiplied {
  mix-blend-mode: multiply;
  opacity: 0.7;
}

.notMultiplied {
  mix-blend-mode: normal;
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

.source {
  font-size: 0.7em;
  font-style: italic;
}
</style>