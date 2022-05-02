<template>
  <Scrollama :offset="0.8" @step-enter="handlerProvider">
    <div class="step" data-step-no="1">
      <div class="step-map-provider">
        <p class="map-text">
          As seen, there are not enough MAT centers to sufficiently treat
          vulnerable counties. To make matters worse, existing providers can
          only treat about 30 patients within their state, building another
          barrier to treatment.
        </p>
      </div>
    </div>
  </Scrollama>
</template>

<script>
import * as d3 from "d3";
import Scrollama from "../../vue-scrollama/src/Scrollama.vue";
import "intersection-observer";

<style src="vue-scrollama/dist/vue-scrollama.css"></style>;

const MAX_SVG_WIDTH = 1400;
var noDataColor = "#253040";

const url =
  "https://raw.githubusercontent.com/m0llyc00k/Thesis-2022/main/mainland_counties.json";

export default {
  name: "providerMap",
  components: {
    Scrollama,
  },

  data() {
    return {
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

    drawBaseMap() {
      var baseMap = d3
        .select(".map-overlay")
        .append("svg")
        .attr("width", this.mapWidth)
        .attr("height", this.mapHeight)
        .attr("id", "providers-overlay");

      var providerGroup = baseMap.append("g").attr("id", "pill-group");

      providerGroup
        .selectAll("path")
        .data(this.geoData)
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("stroke", "none")
        .attr("fill", noDataColor)
        .attr("id", "providers-overlay");

      d3.selectAll("#providers-overlay").attr("opacity", 0);
    },

    baseMapOpacity1() {
      d3.selectAll("#providers-overlay").attr("opacity", 1);
    },

    handlerProvider(element, index, direction) {
      if (direction === "down") element.classList.add("active");
      if (index == 0) this.baseMapOpacity1();
      console.log(index);
    },

    onResize() {
      this.mapWidth = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.onResize);
    },
  },
};
</script>

<style>
.step-map-provider {
  max-width: 70%;
  border-radius: 10px;
  background: #212b38;
  backface-visibility: inherit;
  padding: 0px 10px 15px 10px;
  pointer-events: all;
  font-family: "Inter var", sans-serif;
  /* border: 0.5px solid rgba(169, 169, 169, 0.2); */
  background: #151c24;
}
</style>
