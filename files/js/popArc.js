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

  // global variables - these can be reset in the html file that invokes this javascript code
  var arcX = 250;
  var arcY = 250;
  var pi = Math.PI;
  var gap = pi / 180;
  var colors = ["green", "blue", "orange", "red"];
  var spacing = 40;
  var coreRadius = 50;
  var arcThickness = Math.round(0.9 * spacing);

  // arcIndex is incremented as the hierarchy tree is traversed and assigned to each arc and corresponding json object
  var arcIndex = 0;

  // groups is a (GLOBAL) array of elements held in the json object being parsed in fetchData()
  var groups = new Array();

  // popArcs is a (GLOBAL) array of svg arcs, using indices that map to the "groups" objects
  var popArcs = new Array();
    

  // processArcs takes a json object specifying a hierarchy of objects, their names and populations,
  //  calculates the parameters of the corresponding arcs, renders them, and sets up arrays to access them
  function processArcs(jsonData) {
    // svgStr is a local variable, passed to and modified by calculateArc()
    var svgStr = "\n<svg id=\"svgPopArc\" width=\"500\" height=\"500\" xmlns=\"http://www.w3.org/2000/svg\">";
    var totalCount = jsonData.count;
    // var info = document.getElementById("infoDiv");
    // info.innerHTML = "total count is " + totalCount;
    // info.innerHTML += "<br><br>level i group.subtypes.length groupStartAngle groupAngleSpan angle1 angle2 r arcColor";
      
    // for the initial call to caclulateArc, the groupAngleSpan should be 2*pi (360 degrees)
    svgStr = calculateArc(jsonData, 0, 0, 2 * pi, "black", coreRadius, svgStr); 
      
    svgStr += "\n</svg>";
     
    // showSVG MUST be implemented in the script in the html file so asynchronous functions work properly
    setUpSVG(svgStr);
  }
     
  // calculateArc is a recursive fnction that does a depth-first traversal of the hierarchy tree, 
  //   calculates the angle subtended by each arc, and calls the drawArc function for each arc
  function calculateArc(group, level, groupStartAngle, groupAngleSpan, col, core, svgStr) {
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
        
        var segment = drawArc(arcX, arcY, angle1, angle2-gap, r, arcThickness, arcColor, ai);
        // alert(segment);
        svgStr += segment;
        
        // calculateArc is a RECURSIVE function that traverses hierarchy tree (depth first) 
        svgStr = calculateArc(group.subtypes[i], level+1, angle1, angle2-angle1, arcColor, core, svgStr);
        // alert("in recursion\n" + svgStr);
        angle1 = angle2;
    }
    return(svgStr);
  }
     
  // drawArc generates svg code for arcs specified by the arguments passed
  function drawArc(cx, cy, startAngle, endAngle, radius, thickness, color, index) {
      // angles are expressed in radians
      var lac = 0;
      if ((endAngle - startAngle) > pi) lac = 1;
      var startx = cx + radius * Math.sin(startAngle);
      var starty = cy - radius * Math.cos(startAngle);
      var endx = cx + radius * Math.sin(endAngle);
      var endy = cy - radius * Math.cos(endAngle);
      var arcStr = "\n<path class=\"popArc\" d=\"M " + startx + " " + starty + " " + 
          "A " + radius + " " + radius + " 0 " + lac + " 1 " + endx + " " + endy + "\"" +
          " stroke=\"" + color + "\" fill=\"none\" stroke-width=\"" + thickness + "\" " +
          " arcID=\"" + index + "\"/>";
      return(arcStr);
  } 

 // setUpSVG takes a completes svgStr, invokes code external to this js . file to render it in a web page,
 //   and sets up arrays that facilitate mapping between the json objects describing the hierarchy and
 //    the SVG elements (arcs)
 function setUpSVG(svgStr) {
    // showSVG is not called until the END of processData() function in popArc.js, ensuring proper order
    //  showSVG is implemented in the html page that uses this javascript code.  It should nclude things 
    //   like the object where the svg structure is rendered, etc
    showSVG(svgStr);
    
    // The following will work ONLY after the SVG is rendered (i.e., the svg object is instantiated)
    
     // populate the array (popArcs) of population arcs that are specified in the json file
     //   These arcs are all of class "popArc"
    var svgDoc = document.getElementById('svgPopArc');
    var tempArray = svgDoc.getElementsByClassName("popArc");
    // alert("tempArray length is " + tempArray.length);

    // for each arc, addEventListeners, specifying a function that sets a variable (ni)
    //     and calls a method that is defined in the methods section below
    //     Additional event listeners can be instantiated here as well
    // see https://www.w3schools.com/jsref/obj_mouseevent.asp
    // see https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    for (var i = 0; i < tempArray.length; i++) {
        var ni = tempArray[i].getAttribute("arcid");
        popArcs[ni] = tempArray[i];
        popArcs[ni].addEventListener("click",
                function() {
                    ni = this.getAttribute("arcid");
                    mClick(ni);
                },
                false);
        popArcs[ni].addEventListener("mouseover",
                function() {
                    ni = this.getAttribute("arcid");
                    mOver(ni);
                },
                false);
        popArcs[ni].addEventListener("mouseleave",
                function() {
                    ni = this.getAttribute("arcid");
                    mLeave(ni);
                },
                false);
        popArcs[ni].addEventListener("dblclick",
                function() {
                    ni = this.getAttribute("arcid");
                    dblClick(ni);
                },
                false);
    }
  }