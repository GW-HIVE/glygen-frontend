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
//  All lines that use svg.js are preceeded with the comment "@svg.js@"

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

  // arcIndex (GLOBAL)  is incremented as the hierarchy tree is traversed and assigned to each arc and corresponding json object
  var arcIndex = 0;

  // groups is a (GLOBAL) array of elements held in the json object being parsed in fetchData()
  var groups = new Array();

    
  // processArcs takes a json object specifying a hierarchy of objects, their names and populations,
  //  calculates the parameters of the corresponding arcs, renders them, and sets up arrays to access them
  function processArcs(jsonData) {
    // @svg.js@
    var draw = SVG('svgArcs').size(svgW, svgH);

    // for the initial call to caclulateArc, the groupAngleSpan should be 2*pi (360 degrees)
    calculateArc(jsonData, 0, 0, 2 * pi, "black", coreRadius, draw);          
  }  // end function processArcs
     


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
        
        drawArc(arcX, arcY, angle1, angle2-gap, r, arcThickness, arcColor, ai, draw);
        
        // calculateArc is a RECURSIVE function that traverses hierarchy tree (depth first) 
        calculateArc(group.subtypes[i], level+1, angle1, angle2-angle1, arcColor, core, draw);

        angle1 = angle2;
    }
  }  // end function calculateArc
 


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

      //  the following lines REFERENCE svg.min.js
      // @svg.js@
      var aa = draw.path(dataStr);
      // note that stroke-width must be quoted (it contains a dash character)
      // @svg.js@
      aa.attr({stroke: color, fill: 'none', 'stroke-width': thickness});
      aa.addClass('popArc');
      aa.attr('arcID', index); 

      // mouse events ... methods are defined in a <script> in the enclosing html file
      // @svg.js@
      aa.click(function() {  
          mClick(index);
      });
      aa.dblclick(function() {
          mDbl(index);
      });
      aa.mouseover(function() {
          mOver(index);
      });
      aa.mouseout(function() { 
          mLeave(index);
      });
      
  } // end function drawArc
