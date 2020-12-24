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

    //saving values from the ajax into the var below
    var nodes = global_var.nodes; //stores the data of nodes
    var radius = 15;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var nodeWidth = 140;  //width of node
    var nodeHeight = 40; //height of node
    var node2Width = 60;
    var node2Height = (nodeHeight/2);

    //nodes = nodes.map((node)=> {node.name =  nodeData.find((n) => node.id === n.id).label; return node});
    // nodes = nodes.map((node)=> {node.name =  "Click to see list page"; return node});
    //var values = nodeData.map((node) => {return {name: node.label, count: Number(999999).toLocaleString('en-US'), ind: ind }});
    //var values = nodeData.map((node) => {return {name: node.label, count: Number(node.record_count).toLocaleString('en-US'), listID: nodes.filter((n) => node.id === n.id)[0].listID}});

    nodes = nodes.map((node)=> {var nodeTemp =  nodeData.find((n) => node.id === n.id);  node.name = nodeTemp.label; node.count = Number(nodeTemp.record_count).toLocaleString('en-US'); node.xCord = node.x; node.yCord = node.y; return node;});


    var svg = select("#mapSVG")

    var numnodes = svg.selectAll(".svg-numnode")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "svg-numnode")
        .on("mouseover", mouseover)
        .on("mouseout",mouseout)
        .attr("transform", function(d) {
            return "translate(" + ((d.x)+1.8*node2Width) +"," + ((d.y)-0.5*node2Height) + ")";
            //return "translate(" + ((d.x)) +"," + ((d.y)) + ")";
        });

        numnodes
        .append("rect")
        .attr("class", ((d) => d.listID === 1 ? "svg-numnode" : "svg-numnode-nl"))
        .attr("width", node2Width)
        .attr("height", node2Height)
        .attr("rx", 5)
        .attr("ry", 5)
        // .attr("fill","#fff")
        // .style("stroke","#2F78B7")
        // .style("stroke-width",stkwidth2)

        //appending text on numeric nodes
        numnodes.append("text")
        .data(nodes)
          .text(function(d) {
            return d.count;
          })
          .attr("class", ((d) => d.listID  === 1 ? "svg-numnode-text" : "svg-numnode-text-nl"))
          // .style("fill", "#000")
          // .style("font-family","Tahoma")
          // .style("font-size", "11px")
          // .style("font-style","normal")
          // .style("font-weight","bold")
          .attr("x", node2Width/2)
          .attr("y", node2Height/2)
          .attr("dy", "0.35em")
          // .attr("text-anchor", "middle");
         
          // numnodes.append("title")
          //     .text(function(d) {
          //     return  d.ind % 2 === 0 ? d.name : "";
          // });

          function stkwidth2(d){
            if(d.group == "1"){
              return "1.5px";
            }
            else{
              return "0px";
                }
          }

          // var ScaleX = scaleLinear() 
          //     .domain([44, 840]) 
          //     .range([40, 830]);

          // var ScaleY = scaleLinear() 
          //     .domain([40.5, 457.5]) 
          //     .range([40, 450]);

              var scaleX = scaleLinear() 
              //.domain([47.2982, 813.3746]) 
              .domain([50, 810]) 
              .range([50, 810]);

          var scaleY = scaleLinear() 
              //.domain([46.4820, 453.2967]) 
              .domain([50, 450]) 
              .range([50, 450]);

          function mouseover(d) {
            if (d.listID === 1) {
              console.log(d)
                let tooltip = document.getElementById("tooltip"); 
                let tooltipText = document.getElementById("tooltip-text");
                tooltipText.innerHTML = "Click to see list page.";
                //tooltip.style.left = Number(ScaleX(d.x) + nodeWidth + node2Width / 4 + 2) + 'px';
                //tooltip.style.top = Number(ScaleY(d.y) + nodeHeight + node2Height + 2) + 'px';
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

    //saving values from the ajax into the var below
    var nodes = global_var.nodes; //stores the data of nodes
    var links = global_var.links;//stores the data of the links
    var edges = [];

    nodes = nodes.map((node)=> {node.name =  nodeData.find((n) => node.id === n.id).label; node.xCord = node.x; node.yCord = node.y; return node});

    links.forEach(function(e) { 
        // Get the source and target nodes
        var linkName = e.linkName;
        var sourceNode = nodes.filter(function(n) { return n.id === e.source; })[0],
            targetNode = nodes.filter(function(n) { return n.id === e.target; })[0];
        // Add the edge to the array
        edges.push({sourceOffset: e.sourceOffset, targetOffset: e.targetOffset, dasharray: e.dasharray, rotate: e.rotate, x: e.x, y: e.y, linkid: e.linkid, source: sourceNode, target: targetNode,linkName :linkName,group : e.group});
    });

    //initializing the values so that it can be changed in future of needed

    var radius = 15;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var nodeWidth = 140;  //width of node
    var nodeHeight = 40; //height of node
    var node2Width = 60;
    var node2Height = (nodeHeight/2);
    /*
    var originalState = $("#contents").html();
    */


    //setting basic d3 properties
    var force = forceSimulation()
    .force("charge", forceManyBody().strength(-5))
    .force("link", forceLink().id(function(d) { return d.id; }).distance(200))
    .nodes(nodes);
    //appending on the div and rendering the graph on it
    //var svg = d3.select("#mapSVG")
    var svg = select("#mapSVG")
    //init();//.append("svg")
    // svg = svg.selectAll("*").remove()
       
    //Links
    //this builds the links
    var link = svg.selectAll(".svg-link")
        .data(edges)
        .enter()
        .append("g")
        .attr("class", "svg-link")
        .append("polyline")
        .attr("class", "svg-link")
        .style("stroke-dasharray", function(d) {
            return d.dasharray;
        })
        // .style("stroke-width", function(d) {
        //     return Math.sqrt(d.value);
        // })
        .attr("points", function(d) { 
          return (d.source.x+(nodeWidth / 2) + d.sourceOffset) + "," + (d.source.y+(nodeHeight / 2) + d.sourceOffset) + " " +
          (d.target.x+(nodeWidth / 2) + d.targetOffset) + "," + (d.target.y+(nodeHeight / 2) + d.targetOffset); })

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
                var trans = "translate(" + d.x + "," + d.y + ")" + " rotate(" +  d.rotate + ")";
                return trans;
            })


    //appending the regular nodes
    var node = svg.selectAll(".svg-node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "svg-node")
    // .on("dblclick", dblclick)
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    })
    //highlghts the node and iterates the list to append the accession
    .on("click", function(d){
        selectAll(".svg-node")
        .style("stroke-width", "0px")
        select(this).select("rect")
        .style("stroke-width", "3px")

        var data = select(this).select("rect").data();
        props.setSelectedNode(data[0].id);
        console.log(data[0].name);
        
        /*
        $("#contents").html(originalState);
        $("#contents").load('form');
        var createdForm = d.list;
        var schema = createdForm.schema;
        console.log(createdForm);
        $('form').jsonForm({
            schema, onSubmit: function(error,values){
                if(values){
                formSubmit(values);

                }
            },formSubmit  //formSubmit Function is called  
        
        });
        */
        //
        
        
        
        //storing the length of the accession list
        /* var data1=d.name+"<br>";     //storing all the accession list in data1
        for(i=0 ; i<length; i++){
        //document.getElementById("contents").innerHTML = d.list[i].accession;
        
        data1=data1+ "  " +d.list[i].accession +"<br>";
        document.getElementById("display").innerHTML = data1;
        }*/
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
        // .attr("fill", function(d) { return (d.nodecol); })
        // .style("stroke", "#afd9fd")
        // .style("stroke-width", "0px");

//appending text on the main nodes
      node.append("text")
        .text(function(d) {
            return d.name;
        })
        // .style("fill", "#fff")
        // .style("font-size", "13px")
        // .style("font-weight","bold")
        .attr("class", "svg-node-text")
        .on("mouseover", mouseover)
        .on("mouseout",mouseout)
        .attr("x", (nodeWidth/2))
        .attr("y",(nodeHeight/2))
        .attr("dy", ".35em")
        // .attr("text-anchor", "middle")
        // node.append("title")
        //     .text(function(d) {
        //     return d.name;
        // });


        updateNumnodesSVG(nodeData);

        /***
        select("#mapSVG").selectAll(".svg-numnode").remove();

        var numnodes = svg.selectAll(".svg-numnode")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "svg-numnode")
        //.on("mouseover", mouseover)
        //.on("mouseout",mouseout)
        .attr("transform", function(d) {
            return "translate(" + ((d.x)+1.8*node2Width) +"," + ((d.y)-0.5*node2Height) + ")";
            //return "translate(" + ((d.x)) +"," + ((d.y)) + ")";
        });

        numnodes
        .append("rect")
        .attr("class",".svg-numnode")
        .attr("width", node2Width)
        .attr("height", node2Height)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill","#fff")
        .style("stroke","#2F78B7")
        .style("stroke-width",stkwidth2)

        //appending text on numeric nodes
        numnodes.append("text")
        .data(values)
          .text(function(d) {
            return d.count;
          })
          .attr("class",".svg-numnode-text")
          .style("fill", "#000")
          .style("font-family","Tahoma")
          .style("font-size", "11px")
          .style("font-style","normal")
          .style("font-weight","bold")
          .attr("x", node2Width/2)
          .attr("y", node2Height/2)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle");
          numnodes.append("title")
              .text(function(d) {
              return d.name;
          });
          ***/

//the code for the numeric nodes
/*
        function showInput() {
          var value = document.getElementById("user_input").value; //Displays the value that is searched
          var result = "result_type";                              //To send the data according to the input of the webservice
          var json = JSON.stringify({result_type:value});          //Saving in json format
          console.log(json);
//Calling the webservice and getting data from post method
          var settings = {
            "url": "http://127.0.0.1:5000/commonSearch",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json"
            },
            "data": json
          }
        console.log("hello")
          $.ajax(settings).done(function (response) {
        console.log(response);




          var values  = response.values;// saving the data in var values
          console.log(values);
        var numnodes = svg.selectAll(".numnodes")
        .data(nodes)
        .enter()
        .append("g")
        //.on("mouseover", mouseover)
        //.on("mouseout",mouseout)
        .attr("transform", function(d) {
            return "translate(" + ((d.x)+2.3*node2Width) +"," + ((d.y)-0.5*node2Height) + ")";
        });

        numnodes.append("rect")
        .attr("class",numnodes)
        .attr("width", node2Width)
        .attr("height", node2Height)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill","#fff")
        .style("stroke","#0F9D58")
        .style("stroke-width",stkwidth2)

//appending text on numeric nodes
        numnodes.append("text")
        .data(values)

          .text(function(d) {
            return d.values;
          })
          .style("fill", "#000")
          .style("font-family","Tahoma")
          .style("font-size", "11px")
          .style("font-style","normal")
          .attr("x", node2Width/2)
          .attr("y", node2Height/2)
          .attr("dy", "0.35em")

        .attr("text-anchor", "middle");

          numnodes.append("title")
              .text(function(d) {
              return d.name;
          });

});//end of ajax for webservice
}
*/

//this is the code which builds the arrow.

        /*** 
        svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "2 -5 10 10") //.attr("viewBox", "2 -5 10 10")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight",10)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");
        ***/

      /*force.on("tick", function() {
        link.attr("x1", function(d) {
                return d.source.x + (nodeWidth / 2);
            })
            .attr("y1", function(d) {
                return d.source.y + (nodeHeight / 2);
            })
            .attr("x2", function(d) {
                return d.target.x + (nodeWidth / 2);
            })
            .attr("y2", function(d) {
                return d.target.y + (nodeHeight / 2);
            });*/
//calculations to place the arrows in the middle


            force.on("tick", function() {
            
            // link.attr("points", function(d) {
            // return (d.source.x+(nodeWidth / 2)) + "," + (d.source.y+(nodeHeight / 2)) + " " +
            // ((d.target.x+ d.source.x+nodeWidth)/2) + "," + ((d.target.y+ d.source.y+nodeHeight)/2) +" "+
            // (d.target.x+(nodeWidth / 2)) + "," + (d.target.y+(nodeHeight / 2)); });

              //check commented
              // link.attr("points", function(d) { 
              //     return (d.source.x+(nodeWidth / 2) + d.sourceOffset) + "," + (d.source.y+(nodeHeight / 2) + d.sourceOffset) + " " +
              //     (d.target.x+(nodeWidth / 2) + d.targetOffset) + "," + (d.target.y+(nodeHeight / 2) + d.targetOffset); });

              //check commented
              // node.attr("transform", function(d) {
              //     return "translate(" + d.x + "," + d.y + ")";
              // });


//code to place the text of the links in the center
            // linkText
            //         .attr("x", function(d) {
            //             return ((d.source.x + d.target.x)/1.72);
            //         })
            //         .attr("y", function(d) {
            //             return ((d.source.y + d.target.y)/1.96);
            //         });
});


      // function init() {
      //   svg.attr('height','100%');
      //   svg.attr('width','100%');
      //   // initialisation stuff here
      // }

      var scaleX = scaleLinear() 
      // .domain([44, 840]) 
      // .range([40, 830]);
      .domain([50, 450]) 
      .range([50, 450]);

      var scaleY = scaleLinear() 
      // .domain([40.5, 457.5]) 
      // .range([40, 450]);
      .domain([50, 450]) 
      .range([50, 450]);

      function mouseover(d) {
        console.log(d)

        let tooltip = document.getElementById("tooltip"); 
        let tooltipText = document.getElementById("tooltip-text");
        tooltipText.innerHTML = "Click to see search properties.";
        tooltip.style.left = Number(d.xCord + nodeWidth - node2Width/4 + 2) + 'px';
        tooltip.style.top = Number(d.yCord + nodeHeight + nodeHeight + node2Height/2) + 'px';
        tooltip.style.display = "inline";

        // select(this).select("rect").transition()
        //   .duration(750)
        //   .attr("width", 70)
        //   .attr("height", 25);
        //   select(this).select("text").transition()
        //   .duration(750)
        //   .style("fill", "#000")
        //   .attr("x", 35)
        //   .attr("y", 2)
        //   .style("font-size", "14px");
      }

      function mouseout(d) {
          var tooltip = document.getElementById("tooltip");
          tooltip.style.display = "none";

        // select(this).select("rect").transition()
        //   .duration(750)
        //   .attr("width", 50)
        //   .attr("height", 15)
        //   .style("stroke-width", "1.5px");
        //   select(this).select("text").transition()
        //   .duration(750)
        //   .style("fill", "#000")
        //   .attr("x", 25)
        //   .attr("y", 0)
        //   .style("font-size", "11px");
      }

      /*function onClick(){
        document.getElementById("contents").textContent =
        graph.nodes["8"].list[1].accession;
      }*/

      function linkcolor(d){
        if(d.group == "1"){
          return "#2B60DE";
        }
        else {
          return "black";
        }
      }

      function txtcolor(d){
        if(d.group == "1"){
          return "#2B60DE";
        }
        else {
          return "red";
        }
      }


      function dblclick() {
        select(this).select("rect").transition()
        .style("stroke-width", "0px");

        console.log(select(this));
        //alert("Double Click");
      }
//for regular nodes
      function stkwidth(d){
        if(d.group == "1"){
          return "3px";
        }
        else{
          return "0px";
            }
      }
//for numeric nodes
      function stkwidth2(d){
        if(d.group == "1"){
          return "1.5px";
        }
        else{
          return "0px";
            }
      }
      // setNodeData(node);
      // setSVGData(svg);
    }
    return (
		<>    
            {/* <div style={{height:"50px", width:"1600px", textAlign:"center"}}>       
            <h3><center>Click on a node to get its properties</center><br></br></h3>
            </div>  */}
            <div class="row" style={{height:"600px", width:"1300px", textAlign:"center"}}>    

            <div style={{height:"550px", width:"300px", textAlign:"center"}}>    
            </div> 
            <div class="col">
            <div style={{height:"50px", width:"1000px", textAlign:"center"}}>       
            <h3><center>Click on a node to get its properties</center><br></br></h3>
            </div>

            <div id="tooltip" class="svg-tooltip" style={{position: "absolute", display: "none"}}>
              <div id="svg-arrow" class="svg-arrow-up"/>
              <div id="tooltip-text" class="svg-tooltip-text"/>
            </div>
            {/* <Tooltip
              disableTouchListener
              arrow
              placement={props.placement ? props.placement : 'bottom-start'}
              classes={{
                  tooltip : 'gg-tooltip'
              }}
              title={"Click to see list page"}
              >           
              <div id="tooltip" display="block" style={{position: "absolute", display: "block"}}></div>
              </Tooltip> */}

            <div style={{height:"550px", width:"1000px", textAlign:"center"}} id= "first">
                <svg id="mapSVG" height={"100%"} width={"100%"} viewbox={"0 0 1000 550"} ></svg>
            </div>
            </div>
            </div> 
        </>
	);
};

export default SuperSearchSVG;