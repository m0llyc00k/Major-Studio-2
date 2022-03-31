 /* global d3 */

 async function drawArcDiagram() {
     // set the dimensions and margins of the graph
       var margin = { top: 20, right: 30, bottom: 20, left: 30 },
       width = 1300 - margin.left - margin.right,
       height = 2000 - margin.top - margin.bottom;

   
     // append the svg object to the body of the page
     var svg = d3.select("#my_dataviz")
         .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");

     // Read data
     const data = await d3.json("./data.json")

     // List of node names
     var allNodes = data.nodes.map(function(d) { return d.name })

     // A linear scale to position the nodes on the X axis


     var x = d3.scalePoint()
         .range([0, width])
         .domain(allNodes)

     const rectWidth = 30;
     const rectHeight = 5;

     // Add the rect for the nodes
     svg
         .selectAll("mynodes")
         .data(data.nodes)
         .enter()
         .append("rect")
         .attr("y", 50)
         .attr("x", function(d) { return (x(d.name) - rectWidth / 2) })
         // .attr("r", 8)
         .attr('width', rectWidth)
         .attr('height', rectHeight)
         .style("fill", "darkgray")

     // And give them a label
     svg
         .selectAll("mylabels")

         .data(data.nodes)
         .enter()
         .append("text")
         .attr("y", 30)
         .attr("x", function(d) { return (x(d.name)) })
         .text(function(d) { return (d.name) })
         .style("text-anchor", "middle")
         .style("alignment-baseline", "middle")
         .style("font-family", "monospace")

     // Add links between nodes. Here is the tricky part.
     // In my input data, links are provided between nodes -id-, NOT between node names.
     // So I have to do a link between this id and the name
     var idToNode = {};
     data.nodes.forEach(function(n) {
         idToNode[n.id] = n;
     });
     // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

     // Add the links
     var links = svg
         .selectAll('mylinks')
         .data(data.links)
         .enter()
         .append('path')
         .attr('d', function(d) {
             const start = x(idToNode[d.source].name) // X position of start node on the X axis
             const end = x(idToNode[d.target].name) // X position of end node
             return ['M', start, 50, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                     'A', // This means we're gonna build an elliptical arc
                     (start - end) / 4, ',', // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                     (start - end) / 4, 0, 0, ',',
                     end < start ? 1 : 0, end, ',',  50
                 ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                 .join(' ');
         })
         .style("fill", "none")
         .attr("stroke", "darkgray")
         .attr("stroke-width", 3)
 }

 drawArcDiagram()
 