//dataStr = 'M ' + startx + ' ' + starty + ' ' + 'A ' + radius + ' ' + radius + ' 0 ' + lac + ' 1 ' + endx + ' ' + endy;
// Copyright WS York - 2018 
/*
    
License: Attribution 4.0 International (CC BY 4.0) 
    
You are free to:

    Share — copy and redistribute the material in any medium or format
    Adapt — remix, transform, and build upon the material
    for any purpose, even commercially.

This license is acceptable for Free Cultural Works.

    The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

    Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

    No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

Notices:

    You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable exception or limitation.
    No warranties are given. The license may not give you all of the permissions necessary for your intended use. For example, other rights such as publicity, privacy, or moral rights may limit how you use the material.

*/

// This code REFERENCES AND DEPENDS ON SVG.JS
  // global variables - these can be reset in the html file that invokes this javascript code
  var arcX = 250;
  var arcY = 250;
  var pi = Math.PI;
  var gap = pi / 180;
  var colors = ["green", "blue", "orange", "red"];
  var spacing = 40;
  var coreRadius = 50;
  var arcThickness = Math.round(0.9 * spacing);
  var svgW = 500;
  var svgH = 500;

  // arcIndex is incremented as the hierarchy tree is traversed and assigned to each arc and corresponding json object
  var arcIndex = 0;

  // groups is a (GLOBAL) array of elements held in the json object being parsed in fetchData()
  var groups = new Array();

  // popArcs is a (GLOBAL) array of svg arcs, using indices that map to the "groups" objects
  var popArcs = new Array();
    

  // processArcs takes a json object specifying a hierarchy of objects, their names and populations,
  //  calculates the parameters of the corresponding arcs, renders them, and sets up arrays to access them
  function processArcs(jsonData) {
    // The SVG method is defined in svg.min.js
    var draw = SVG('svgArcs').size(svgW, svgH);

    var totalCount = jsonData.count;
    // var info = document.getElementById("infoDiv");
    // info.innerHTML = "total count is " + totalCount;
    // info.innerHTML += "<br><br>level i group.subtypes.length groupStartAngle groupAngleSpan angle1 angle2 r arcColor";
      
    // for the initial call to caclulateArc, the groupAngleSpan should be 2*pi (360 degrees)
    calculateArc(jsonData, 0, 0, 2 * pi, "black", coreRadius, draw); 
           
    setUpSVG(draw);
  }
     
  // calculateArc is a recursive fnction that does a depth-first traversal of the hierarchy tree, 
  //   calculates the angle subtended by each arc, and calls the drawArc function for each arc
  function calculateArc(group, level, groupStartAngle, groupAngleSpan, col, core, draw) {
    //  the "infoDiv" was initially for debugging, but it can be used for other purposes
    // var info = document.getElementById("infoDiv");
    var groupPop = group.count;
    var r = core + level * spacing;
    var angle1 = groupStartAngle;
    for (var i = 0; i < group.subtypes.length; i++) {
        // assign the same arcID to the arc and its json counterpart - arcIndex is a GLOBAL variable
        var ai = arcIndex++;
        //  assign index to json object
        group.subtypes[i].arcID = ai;
        //  include indexed group in group list called "groups"
        groups[ai] =  group.subtypes[i];
        
        // calculate and draw arcs for each subtype of current group
        var angle2 = angle1 + groupAngleSpan * group.subtypes[i].count / groupPop; 
        var arcColor = col;
        // each top-level arc is assigned a new color
        if (level == 0) {
            arcColor = colors[i];
        }

        // info.innerHTML += "<br>" + level + " " + i + " " + group.subtypes.length + " " + 
        //    Math.round(180 * groupStartAngle / pi) + " " + Math.round(180 * groupAngleSpan / pi) + " " + 
        //    Math.round(180 * angle1 / pi) + " " + Math.round(180 * angle2 / pi) + " " + r + " " + " " + arcColor;
        
        drawArc(arcX, arcY, angle1, angle2-gap, r, arcThickness, arcColor, ai, draw);
        
        // calculateArc is a RECURSIVE function that traverses hierarchy tree (depth first) 
        calculateArc(group.subtypes[i], level+1, angle1, angle2-angle1, arcColor, core, draw);
        // alert("in recursion\n" + svgStr);
        angle1 = angle2;
    }
  }
     
  // drawArc uses svg.min.js to generate svg code for arcs specified by the arguments passed
  function drawArc(cx, cy, startAngle, endAngle, radius, thickness, color, index, draw) {
      // angles are expressed in radians
      var lac = 0;
      if ((endAngle - startAngle) > pi) lac = 1;
      var startx = Math.round(cx + radius * Math.sin(startAngle));
      var starty = Math.round(cy - radius * Math.cos(startAngle));
      var endx = Math.round(cx + radius * Math.sin(endAngle));
      var endy = Math.round(cy - radius * Math.cos(endAngle));
      var dataStr = "M " + startx + " " + starty + " " + 
          "A " + radius + " " + radius + " 0 " + lac + " 1 " + endx + " " + endy;
      // alert(dataStr);
      //  the following lines REFERENCE svg.min.js
      var aa = draw.path(dataStr);
      // note that stroke-width must be quoted (it contains a dash character)
      aa.attr({stroke: color, fill: 'none', 'stroke-width': thickness});
      aa.addClass('popArc');
      aa.attr('arcID', index);
  } 

 function setUpSVG(draw) {
    // setUpSVG is not called until the END of processData() function in popArc.js, ensuring proper order   
    // That is, the following will work ONLY after the SVG is rendered (i.e., the svg object is instantiated)
    
     // populate the array (popArcs) of population arcs that are specified in the json file
     //   These arcs are all of class "popArc"
    var svgDoc = document.getElementById('svgArcs');
    // alert(svgDoc);
    var tempArray = svgDoc.getElementsByClassName("popArc");
    // alert("tempArray length is " + tempArray.length);
    // for each arc, addEventListeners, specifying a function that sets a variable (ni)
    //     and calls a method that is defined in the methods section below
    //     Additional event listeners can be instantiated here as well
    // see https://www.w3schools.com/jsref/obj_mouseevent.asp
    // see https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    for (var i = 0; i < tempArray.length; i++) {
        var ni = tempArray[i].getAttribute("arcID");
        popArcs[ni] = tempArray[i];
        popArcs[ni].addEventListener("click",
                function() {
                    ni = this.getAttribute("arcID");
                    mClick(ni); // mClick defined in a <script> in the enclosing html file
                },
                false);
        popArcs[ni].addEventListener("mouseover",
                function() {
                    ni = this.getAttribute("arcID");
                    mOver(ni); // mOver defined in a <script> in the enclosing html file
                },
                false);
        popArcs[ni].addEventListener("mouseleave",
                function() {
                    ni = this.getAttribute("arcID");
                    mLeave(ni); // mLeave defined in a <script> in the enclosing html file
                },
                false);
        popArcs[ni].addEventListener("dblclick",
                function() {
                    ni = this.getAttribute("arcID");
                    dblClick(ni); // dblClick defined in a <script> in the enclosing html file
                },
                false);
    }
  }