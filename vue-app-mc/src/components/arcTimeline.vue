<template>
  <div id="container">
    <svg :height="height" :width="width">
      <!-- <rect x="50" y="200" width="50" height="50" /> -->
      <g class="arc"></g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

const rectWidth = 30;
const rectHeight = 5;

var margin = { top: 20, right: 30, bottom: 20, left: 30 },
  width = 1350 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

export default {
  name: "arcTimeline",

  data() {
    return {
      nodes: [
        {
          id: 1,
          name: "1840",
        },
        {
          id: 2,
          name: "1850",
        },
        {
          id: 3,
          name: "1860",
        },
        {
          id: 4,
          name: "1870",
        },
        {
          id: 5,
          name: "1880",
        },
        {
          id: 6,
          name: "1890",
        },
        {
          id: 7,
          name: "1900",
        },
        {
          id: 8,
          name: "1910",
        },
        {
          id: 9,
          name: "1920",
        },
        {
          id: 10,
          name: "1930",
        },
        {
          id: 11,
          name: "1940",
        },
        {
          id: 12,
          name: "1950",
        },
        {
          id: 13,
          name: "1960",
        },
        {
          id: 14,
          name: "1970",
        },
        {
          id: 15,
          name: "1980",
        },
        {
          id: 16,
          name: "1990",
        },
        {
          id: 17,
          name: "2000",
        },
        {
          id: 18,
          name: "2010",
        },
        {
          id: 19,
          name: "2020",
        },
      ],
      links: [
        {
          source: 1,
          target: 16,
          year1: "1846",
          text1:
            "The rapid acceptance of anesthesia in 1846 aided in the secularization of pain. Perception of disease and pain lost religious connotations, gaining more notoriety as biological phenomena which could be treated successfully with drugs such as opium and morphine. (Gaton 498) ",
          year2: "1996",
          text2:
            "The American Pain Society develops 'Pain as the Fifth Vital Sign' to diagnose pain patients. After our nation's first opioid crisis subsided and retreated from modern memory, studies showing inadequate treatment of chronic non-cancer pain by physicians started to surface and pharmaceutical companies motivated and encouraged the questioning of opioid restrictions.",
          title: "Prescribing Pain",
        },
        {
          source: 6,
          target: 16,
          year1: "1898",
          text1:
            "Heroin was created in 1898 and sold commercially by Bayer. It was marketed as a cough suppressant, used in the treatment of pneumonia and tuberculosis, and frequently used in the treatment of morphine addiction. Heroin and morphine were substitutable, although Heroin was much more potent and therefore a smaller dose was required, delaying the onset of addiction. For these reasons, Heroin was seen as the 'non-addictive' alternative to morphine. ",
          year2: "1995",
          text2:
            "OxyContin (oxycodone controlled-release) is approved as first formulation of oxycodone that allowed dosing every 12 hours instead of every 4 to 6 hours, marketing it as non-addictive.",
          title: "'Non-Addictive' Alternatives",
        },
        {
          source: 3,
          target: 16,
          year1: "1898-1924",
          text1:
            "Heroin was marketed as a cough suppressant, used in the treatment of pneumonia and tuberculosis, and frequently used in the treatment of morphine addiction.  the While there was some knowledge and understanding that morphine and opium could be abused, due to lack of alternative treatments, doctors widely prescribed them for a variety of ailments, believing that the relief patients felt outweighed the adverse side effects",
          year2: "1995-2010",
          text2:
            "Just as morphine, opium, and heroin came into widespread use for common ailments, OxyContin was promoted in an extensive national commercial campaign that claimed it was safe for use in moderate to severe pain.  Consequentially, Morphine prescriptions increase by 73%, Hydromorphone increase by 96%, Fentanyl prescriptions increase by a whopping 226%, and Oxycodone prescriptions increase by 402%. OxyContin is reformulated in 2010 after concerns of addiction.",
          title: "Widespread Medical Use of Opiates",
        },
        {
          source: 6,
          target: 17,
          year1: "Late 1800s",
          text1:
            "While concern for addiction and long-term effects escalated for decades, they were brushed aside due to the lack of alternative treatments and absence of necessary, universal education for medical practitioners and communities in distress. Throughout the late 19th century, medical journals filled with warnings about the dangers of addiction.",
          year2: "2001",
          text2:
            "Art Van Zee writes Purdue with his concerns on OxyContin, “…he and others here launched a petition drive in 2001 to convince the F.D.A. to take OxyContin off the market until it could be reformulated and made safer.” (NYT Meier) ",
          title: "Doctor's Raise their Concerns",
        },
        {
          source: 7,
          target: 17,
          year1: "1906",
          text1:
            "The American Medical Association finally sounds an alarm on heroin due the the increase of abuse. (Macy 25) ",
          year2: "2007",
          text2:
            "After years of doctors, communities, and officials 'sounding the alarm' on OxyContin, Purdue admits in trial that it fraudulently marketed OxyContin by falsely claiming that OxyContin was less addictive, less subject to abuse and less likely to cause withdrawal symptoms than other pain medications when there was no supporting medical research and no FDA approval of these claims.",
          title: "Sounding the Alarm",
        },
        {
          source: 8,
          target: 19,
          year1: "1915",
          text1:
            "The Harrison Act severely restricted the sale and possession of heroin and other narcotic drugs but did little else or address the ongoing crisis. An article written in the American Journal of Public Health at the time claimed that this could have been due to the affiliations that patent medicine and doctors had with congress. By 1924, Heroin is outlawed.",
          year2: "2010s - Present Day",
          text2:
            "New guidelines for treating pain outlined by the CDC have been in development for the past 2 decades. Initially, guidelines from 2016 were reactive to the agony that overprescribing caused, limiting the prescription of opioids so much that many medical professionals felt that the pendulum was being swung too far in the opposite direction. Since then, the guidelines have been reformulated and are considering a more middle of the road approach, acknowledging the benefits of certain opioid use while still considering the crisis at hand. (Hoffman, NYT 2022)  Despite this effort, the destruction of the modern epidemic continues.",
          title: "Too Little too Late Legislation",
        },
        {
          source: 6,
          target: 18,
          year1: "1895",
          year2: "2012",
          text1:
            "Opioid prescribing drops due to concern from doctors and state legislation. The demand for opioids was high and only around the peak of the epidemic in 1895 did doctors begin slow prescribing and reduce the use of opiates.",
          text2:
            "Opioid prescribing drops due to public concern over oxycontin's mismarketing, per CDC data https://www.cdc.gov/drugoverdose/rxrate-maps/index.html",
          title: "A Drop in Prescriptions",
        },
        {
          source: 4,
          target: 18,
          year1: "1870-1900",
          text1:
            "Opium smoking spread across the US. 1910, Americans report crushing opioid pills and inhaling them for pleasure.",
          year2: "2010s - Present",
          text2:
            "There is a noticeable shift in the kinds of overdoses being reported—prescription opioids remain a problem, but a large surge in heroin usage also has a hand in addiction rates.",
          title: "Addicts Turn to Illicit Drugs",
        },
        {
          source: 10,
          target: 18,
          year1: "1930",
          text1:
            "The upper- and middle-class addicts had begun to die out and the remaining addicted were reclassified as 'junkies' and 'criminals'. (Macy 25, 26) The stigmatization and disregard for those remaining struggling with an opioid use disorder made room for the devastation caused by the nation's first epidemic to recede from memory.",
          year2: "2001",
          text2:
            "Richard Sackler, president of Purdue Pharma at the time, wrote in an email to his constituents in 2001 that “We have to hammer on abusers in every way possible… They are the culprits and the problem. They are reckless criminals.” (Meier, New York Times 2019) Purdue uses this same stigma born in the 19th century to their advantaged and weaponized the century long discrimination of people with addiction, making false claims that opioid abuse was no fault of the pharmaceutical industry.",
          title: "Blame the Users and Introduce Stigma",
        },
      ],
    };
  },
  props: {
    data: {
      nodes: Array,
      links: Array,
    },
    height: Number,
    width: Number,
  },
  //   computed: {
  // xScale() {
  //   return d3.scalePoint().range([0, width]).domain(allNodes);
  // },
  // },

  methods: {
    drawChart() {
      var allNodes = this.data.nodes.map(function (d) {
        return d.name;
      });

      var x = d3.scalePoint().range([0, width]).domain(allNodes);

      var svg = d3
        .select(".arc")
        .selectAll("g.arc")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // svg
      //   .append("circle")
      //   .attr("cx", 100)
      //   .attr("cy", 100)
      //   .attr("r", 50)
      //   .attr("stroke", "black")
      //   .attr("fill", "#69a3b2");

      svg
        .selectAll("mynodes")
        .data(this.data.nodes)
        .enter()
        .append("rect")
        .attr("id", "rects")
        .attr("y", 50)
        .attr("x", function (d) {
          return x(d.name) - rectWidth / 2;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .style("fill", "darkgray");

      // And give them a label
      svg
        .selectAll("mylabels")
        .data(this.data.nodes)
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
        .attr("fill", "#dfdfdf");

      // Add links between nodes. Here is the tricky part.
      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      var idToNode = {};
      this.nodes.forEach(function (n) {
        idToNode[n.id] = n;
      });
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

      // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

      // Add the links
      var links = svg
        .selectAll("mylinks")
        .data(this.data.links)
        .enter()
        .append("path")
        .attr("d", (d) => {
          const start = x(idToNode[d.source].name); // X position of start node on the X axis
          const end = x(idToNode[d.target].name);
          // const middle =

          // console.log(start)
          // X position of end node
          const firstLine = [
            "M",
            start,
            50, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
            "L", // This means we're gonna build an elliptical arc
            (start - end) / 4,
            ",", // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
            (start - end) / 4,
            0,
            0,
            ",",
            end < start ? 0 : 0,
            end,
            ",",
            800,
            // middle, 0, 0, ',', 50
          ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
            .join(" ");

          return firstLine;
        })
        // .style("opacity", 0)

        .transition()
        // .ease(d3.easeLinear)
        .duration(2000)
        .ease(d3.easeLinear)
        .style("fill", "none")
        .style("opacity", 1)
        .attr("stroke", "url(#linear-gradient")
        .attr("stroke-width", 1);

      links
        .attr("d", (d) => {
          const start = x(idToNode[d.source].name); // X position of start node on the X axis
          const end = x(idToNode[d.target].name);

          // X position of end node
          return [
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
        })
        // .style("opacity", 0.5)

        .transition()
        // .ease(d3.easeLinear)
        .duration(2000)
        .ease(d3.easeLinear)
        .style("opacity", 1)
        .style("fill", "none")
        .attr("stroke", "url(#linear-gradient")
        .attr("stroke-width", 3);
    },
  },
  mounted() {
    console.log("component mounted");
    this.drawChart();
  },
};
</script>

<style>
</style>
