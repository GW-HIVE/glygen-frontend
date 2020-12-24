import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';
import '../../css/Search.css';
import stringConstants from '../../data/json/stringConstants';
import global_var from '../../data/json/superSearchSVGData';
import {select, selectAll, forceSimulation, forceManyBody, forceLink, scaleLinear } from 'd3';

/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearchSVG = (props) => {

  //saving values from the ajax into the var below
  var svgNodes = global_var.nodes; //stores the data of nodes
  var svgLinks = global_var.links;//stores the data of the links
  
  //initializing the values so that it can be changed in future of needed
  var nodeWidth = 140;  //width of node
  var nodeHeight = 40; //height of node
  var node2Width = 60;
  var node2Height = (nodeHeight/2);

  useEffect(() => {
    loadSVG(props.nodeData);
    console.log("SuperSearchSVG" + props.nodeData);
  }, [props.nodeData])

  useEffect(() => {
    updateNumnodesSVG(props.nodeData);
    console.log("SuperSearchSVG" + props.nodeData);
  }, [props.countData])

  function updateNumnodesSVG(nodeData) {
    select("#mapSVG").selectAll(".svg-numnode").remove();
    var nodes = svgNodes.map((node)=> {var nodeTemp =  nodeData.find((n) => node.id === n.id);  
                                        node.name = nodeTemp.label; node.count = Number(nodeTemp.record_count).toLocaleString('en-US'); 
                                        return node;});
    var svg = select("#mapSVG")

    var numnodes = svg.selectAll(".svg-numnode")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "svg-numnode")
        .on("mouseover", mouseover)
        .on("mouseout",mouseout)
        .attr("transform", function(d) {
            return "translate(" + ((d.xCord)+1.8*node2Width) +"," + ((d.yCord)-0.5*node2Height) + ")";
        });

        numnodes
        .append("rect")
        .attr("class", ((d) => d.listID === 1 ? "svg-numnode" : "svg-numnode-nl"))
        .attr("width", node2Width)
        .attr("height", node2Height)
        .attr("rx", 5)
        .attr("ry", 5)

        //appending text on numeric nodes
        numnodes.append("text")
        .data(nodes)
          .text(function(d) {
            return d.count;
          })
          .attr("class", ((d) => d.listID  === 1 ? "svg-numnode-text" : "svg-numnode-text-nl"))
          .attr("x", node2Width/2)
          .attr("y", node2Height/2)
          .attr("dy", "0.35em")

      function mouseover(d) {
        if (d.listID === 1) {
          console.log(d)
            let tooltip = document.getElementById("tooltip"); 
            let tooltipText = document.getElementById("tooltip-text");
            tooltipText.innerHTML = "Click to see list page.";
            tooltip.style.left = Number(d.xCord + 2.6 * node2Width + 2) + 'px';
            tooltip.style.top = Number(d.yCord + 3 * node2Height) + 'px';
            tooltip.style.display = "inline";
        }
      }

      function mouseout(d) {
        if (d.listID === 1) {
            var tooltip = document.getElementById("tooltip");
            tooltip.style.display = "none";
        }
      }
  }

  function loadSVG(nodeData){
    // Empty svg
    select("#mapSVG").selectAll("*").remove();
    var nodes = svgNodes.map((node)=> {node.name =  nodeData.find((n) => node.id === n.id).label; return node});
    var edges = svgLinks.map((e) => { 
                // Get the source and target nodes
                var linkName = e.linkName;
                var sourceNode = nodes.filter(function(n) { return n.id === e.source; })[0],
                    targetNode = nodes.filter(function(n) { return n.id === e.target; })[0];
                return {sourceOffset: e.sourceOffset, targetOffset: e.targetOffset, dasharray: e.dasharray, rotate: e.rotate, 
                        xCord: e.xCord, yCord: e.yCord, linkid: e.linkid, source: sourceNode, target: targetNode, linkName: linkName};
            });

    //setting basic d3 properties
    var force = forceSimulation()
                .force("charge", forceManyBody().strength(-5))
                .force("link", forceLink().id(function(d) { return d.id; }).distance(200))
                .nodes(nodes);
    //appending on the div and rendering the graph on it
    var svg = select("#mapSVG")
       
    //Links
    //this builds the links
    var link = svg.selectAll(".svg-link")
                .data(edges)
                .enter()
                .append("g")
                .attr("class", "svg-link")
                .append("polyline")
                .style("stroke-dasharray", function(d) {
                    return d.dasharray;
                })
                .attr("points", function(d) { 
                  return (d.source.xCord+(nodeWidth / 2) + d.sourceOffset) + "," + (d.source.yCord+(nodeHeight / 2) + d.sourceOffset) + " " +
                  (d.target.xCord+(nodeWidth / 2) + d.targetOffset) + "," + (d.target.yCord+(nodeHeight / 2) + d.targetOffset); })

    //appending Name of the Links on them
    var linkText = svg.selectAll(".svg-link")
                    .data(edges)
                    .append("text")
                    .attr("class", "svg-link-text")
                    .attr("dy", "1.8em")
                    .text(function(d) {
                        return d.linkName;
                    })
                    .attr("transform", function(d) {
                        var trans = "translate(" + d.xCord + "," + d.yCord + ")" + " rotate(" +  d.rotate + ")";
                        return trans;
                    })


    //appending the regular nodes
    var node = svg.selectAll(".svg-node")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "svg-node")
                .attr("transform", function(d) {
                    return "translate(" + d.xCord + "," + d.yCord + ")";
                })
    
    //highlghts the node and iterates the list to append the accession
    .on("click", function(d) {
        selectAll(".svg-node")
        .style("stroke-width", "0px")
        select(this).select("rect")
        .style("stroke-width", "3px")

        var data = select(this).select("rect").data();
        props.setSelectedNode(data[0].id);
        console.log(data[0].name);
    });
    
    //appending the node
    node.append("rect")
        .attr("class", "svg-node")
        .on("mouseover", mouseover)
        .on("mouseout",mouseout)
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 5)
        .attr("ry", 5)

      //appending text on the main nodes
      node.append("text")
          .text(function(d) {
              return d.name;
          })
          .attr("class", "svg-node-text")
          .on("mouseover", mouseover)
          .on("mouseout",mouseout)
          .attr("x", (nodeWidth/2))
          .attr("y",(nodeHeight/2))
          .attr("dy", ".35em")

        updateNumnodesSVG(nodeData);

      function mouseover(d) {
        let tooltip = document.getElementById("tooltip"); 
        let tooltipText = document.getElementById("tooltip-text");
        tooltipText.innerHTML = "Click to see search properties.";
        tooltip.style.left = Number(d.xCord + 0.9 * nodeWidth) + 'px';
        tooltip.style.top = Number(d.yCord + 2.25 * nodeHeight) + 'px';
        tooltip.style.display = "inline";
      }

      function mouseout(d) {
          var tooltip = document.getElementById("tooltip");
          tooltip.style.display = "none";
      }

      // setNodeData(node);
      // setSVGData(svg);
    }

    return (
		<>    
            <div className="row" style={{height:"600px", width:"1300px", textAlign:"center"}}>    
              <div style={{height:"550px", width:"300px", textAlign:"center"}}/>    
              <div className="col">
                <div style={{height:"50px", width:"1000px", textAlign:"center"}}>       
                  <h3><center>Click on a node to get its properties</center><br></br></h3>
                </div>

                <div id="tooltip" className="svg-tooltip" style={{position: "absolute", display: "none"}}>
                  <div id="svg-arrow" className="svg-arrow-up"/>
                  <div id="tooltip-text" className="svg-tooltip-text"/>
                </div>

                <div style={{height:"550px", width:"1000px", textAlign:"center"}} id= "first">
                    <svg id="mapSVG" height={"100%"} width={"100%"} viewBox={"0 0 1000 550"} ></svg>
                </div>
              </div>
            </div> 
        </>
	);
};

export default SuperSearchSVG;