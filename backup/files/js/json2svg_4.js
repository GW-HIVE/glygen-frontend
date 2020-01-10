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


function getNprocessData(theURL) {
  // alert("sending request: " + theURL);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // alert(this.responseText);
       processData(JSON.parse(this.responseText));
    }
  };
  var jsonURL = theURL;
  xhttp.open("GET", jsonURL, true);
  xhttp.send();
}
  
function handleResidueNode(thisNID) {
  // nodes is an array of svg "gnode" objects - nodes is declared globally in the javascript code 
  //   that uses the methods defined in this API
  var t2 = "class: " + nodes[thisNID].getAttribute("class") + "\n";
  // alert("nodes is array of svg elements\n" + t2);

  nodes[thisNID].style.stroke = "#AAAAAA"; 
  nodes[thisNID].style['stroke-width'] = "5px"; 
  nodes[lastNID].style.stroke = "#000000";
  nodes[lastNID].style['stroke-width'] = "2px";
  
  //  prepare string to show this DOM object's propertieds when it is clicked
  // nn is an array of DOM objects in the tree specified by the json object "structure"
  txt = "<center><h2>Residue properties:</h2></center>";
  // the next line demonstrates access to svg object attributes
  // txt += "Node fill: " + nodes[thisNID].getAttribute("fill") + "<br>";
  txt += "<p>Name: " + nn[thisNID].name + "<br>";
  if (nn[thisNID].anomer === "a") {
     txt += "Anomeric Configuration: &#945;<br>";
  }
  if (nn[thisNID].anomer === "b") {
     txt += "Anomeric Configuration: &#946;<br>";
  }
  txt += "Absolute Configuration: " + nn[thisNID].absolute + "<br>";
  txt += "Ring Form: " + nn[thisNID].ring + "<br>";
  txt += "GlycO residue: " + nn[thisNID].fullName + " (<b>" + nn[thisNID].residue_id + "</b>)<br>";
  // alert("It is " + nn[thisNID].pubChem);
  var pcURL = "https://pubchem.ncbi.nlm.nih.gov/compound/" + nn[thisNID].pubChem;
  txt += "<a href='" + pcURL + "'  target='_blank'>PubChem Record</a><br>"; 
  var loopLength = nn[thisNID].enzymes.length;
  // need loop of this length to show enzymes
  for (var k=0; k< loopLength; k++) {
     txt += "Enzyme: "
                  + "<a href='https://www.ncbi.nlm.nih.gov/nuccore/" + nn[thisNID].enzymes[k].RefSeq
       + "' target='_blank'>" + nn[thisNID].enzymes[k].RefSeq + "</a><br>";
  }
  txt += "</p>";    
    
  infoDiv.innerHTML = txt;
  lastNID = thisNID;
}
  
function itsAleaf(node) {
  // document.body.innerHTML += "<br>node " + node.name + " has NO CHILDREN";
  node.hi = 0;
  node.lo = 0;
  node.cCount = 0;
  node.gap = 0;
  node.nfc = 0;
  // alert("node " + node.name + ": set hi to " + node.hi);
}
  
function gtLayout(data, node, rCount) { 
  // recursive tree traversal method
  // define and set initial value of gap for this node
  
  node.cCount = 0;
  // count children of this node
  for (var j = 0; j < rCount; j++) {
    if (data.residues[j].parent == node.residue_id) {
      node.cCount++; // node.cCount was previously called node.s
    }
  }
  // make array node.children for this node
  node.children = new Array(node.cCount);
  var k = 0;
  for (var j = 0; j < rCount; j++) {
    if (data.residues[j].parent == node.residue_id) {
      node.children[k] = data.residues[j];
      k++;
    }
  }

  node.gap = 0;

  if (node.cCount == 0) {
    itsAleaf(node);
  } else {  
    node.nfc = node.cCount; // number of non-fucosyl children, may be modified in i-loop
    var lastLo = 0;
    var lastHi = 0;
    var upFlag = 0;
    var downFlag = 0;
    var firstNonFuc = 0;
    var lastNonFuc = node.cCount - 1;
    for (var i = 0; i < node.cCount; i++) {
      gtLayout(data, node.children[i], rCount);

      if (node.children[i].shape === "triangle") {
        node.nfc--; // decrement the number of non-fucosyl children
        if (i === 0) firstNonFuc = 1;
        if (i === (node.cCount - 1)) lastNonFuc = node.cCount - 2;
        // alternate way to calculate node.hi when residue bears a fucose at O6
        if (node.children[i].site === '6') downFlag = -1; 
        // or at another site
             else upFlag = 1; 
      } else {
        // document.body.innerHTML += "<br>" + node.name + " has a child [" + i + "] " + node.children[i].name;
        // node.gap defines the (equalized) space between arms of the subtree rooted at node
        if (i > 0) node.gap = Math.max(node.gap, 1 - lastLo + node.children[i].hi);
        // document.body.innerHTML += "<br>for residue " + node.name + ",  lastHi is " + lastHi 
        // + " and child[" + i + "],named " + node.children[i].name + ", lo is "
        //    + node.children[i].lo + " #### current value of gap is " + node.gap; 
        lastHi = node.children[i].hi;
        lastLo = node.children[i].lo;
      }
    }
    if (node.nfc < 2) node.gap = 0;

    // calculate node.hi and node.lo using gap and node.cCount and first and last children hi and lo
    // if residue bears a fucose, select one of 2 methods to calculate hi and lo

    if (node.nfc > 0) { // residue has at least 1 non-fucosyl substituent
      node.hi = Math.max(upFlag, 0.5 * (node.nfc - 1) * node.gap + node.children[firstNonFuc].hi);
      node.lo = Math.min(downFlag, -0.5 * (node.nfc - 1) * node.gap + node.children[lastNonFuc].lo);
    } else { // residue bearing fucosyl substituent has no other substituents
      node.hi = upFlag;
      node.lo = downFlag;
    }
  }

/*********
  alert("Laid out node[" + node.residue_id + "]: " + node.cCount + " children"
          + "\ngap = " + node.gap
          + "\nhi = " + node.hi
          + "\nlo = " + node.lo
          + "\nupFlag = " + upFlag
          + "\ndownFlag = " + downFlag);
*********/
}

function renderLines(node, xCoord, yCoord, level) {
  // recursive tree traversal method, sets node coordinates and draws lines
  node.x = xCoord;
  node.y = yCoord;
  // top is the y-coordinate of the first residue in the non-fucosyl substituent list for this node
  var top = node.y + 0.5 * (node.nfc - 1) * node.gap * yScale; 
  var place = 0; // place is current index for the non-fucosyl substituent list for this node
  for (var i = 0; i < node.cCount; i++) {
    if (node.children[i].shape === "triangle") {
      // position the fucosyl residue immediately above its parent
      xChild = level * xScale;
      if (node.children[i].site === "6") {
         yChild = node.y - yScale;
      } else {
         yChild = node.y + yScale;
      }
    } else {  // child residue is NOT fucose so render at usual position ...
      xChild = (level + 1) * xScale;
      yChild = top - place * node.gap * yScale;
      place++;  // incremented only for non-fucosyl substituents
    }
// alert("nid for line is " + nid);
   //  alert("Drawing lines for node " + node.residue_id + " xChild is " + xChild + " and yChild is " + yChild);
    svgStr += "<line class='glink' stroke='black' x1='" + (width - margin - node.x) + "' y1='" + (margin + node.y) + "' x2='" + (width - margin - xChild) + "' y2='" + (margin + yChild) + "' id='Edge" + nid + "'/>\n";
    
    // label edges
    xSpan = (node.x - xChild); 
    ySpan = (yChild - node.y);
    // the x and y test offsets depend on the angle of the line connecting the nodes
    xOffset = Math.round(0.2 * xScale * Math.sin(-Math.atan2(ySpan, xSpan)));
    yOffset = Math.round(0.2 * yScale * Math.cos(Math.atan2(ySpan, xSpan)));
	tx = width - margin - node.x + 0.5 * xSpan + xOffset;
	ty = margin + node.y + 0.5 * ySpan + yOffset;
	xx = width - margin - node.x;
	xxc = width - margin - xChild;
	yy = margin + node.y;
	yyc = margin + yChild;
	// document.body.innerHTML += "<br>" + node.children[i].name + " [" 
	//      + xxc + "," + yyc + "] to " 
	//      + node.name + " [" + xx + "," + yy + "] has label at ["
	//      + tx + "," + ty + "]";
	if (node.children[i].anomer === 'a') txt = '&#x3b1;' + node.children[i].site
      else if (node.children[i].anomer === 'b') txt = '&#x3b2;' + node.children[i].site
		else txt = node.children[i].site;
	svgStr += "<text class='gtext' text-anchor='middle' dominant-baseline='central' x='"
	            + tx + "' y='" + ty + "' id='Label" + nid + "'>" + txt + "</text>\n"; 


    nid++;
    renderLines(node.children[i], xChild, yChild, level + 1);
  }
}

function toggleIDs() {
    if (showIDs == true) {
        showIDs = false;
    } else {
        showIDs = true;
    }
    getNprocessData(document.getElementById('glycan_url').value)
}


function renderNodes(node) {
  // recursive tree traversal method to draw nodes
  // TBD: 
  //   draw each node as a circle, square etc. using css
  //   associate mouse-over and click functionality to each node using data
   var xx = width - margin - node.x;
   var yy = margin + node.y;

   var radius = 0.5 * nodeSize;
   nn[nid] = node;
   // alert("Drawing node " + node.residue_id + " xx is " + xx + " and yy is " + yy);
   
   nodeColor[nid] = node.color;

   // draw the nodes and add functionality to them
   var idStr = "' id='Node" + nid;
   var clickStr = "' onclick='handleResidueNode(" + nid + ")'/>\n";
   var partStr = "";
   switch(node.shape) {
    case "circle":
        partStr = "<circle class='gnode' sugarName='" + node.pubChem + "' stroke='black' r='" + radius + "' cx='" + xx + "' cy='" + yy + "' fill='" + node.color; 
        break;
    case "square":
        xx1 = xx - radius;
        yy1 = yy - radius;
        partStr = "<rect class='gnode' sugarName='" + node.pubChem + "' stroke='black' width='" + nodeSize + "' height='" + nodeSize 
               + "' x='" + xx1 + "' y='" + yy1 + "' fill='" + node.color; 
        break;
    case "triangle":
        // up or down, depending on linkage
        xx1 = xx - radius;
        yy1 = yy + radius;
        xx2 = xx1 + nodeSize;
        yy2 = yy1;
        xx3 = xx1 + radius;
        yy3 = yy1 - nodeSize;
        if (node.site === "6") {
          yy1 = yy - radius;
          yy2 = yy1;
          yy3 = yy1 + nodeSize;
        }
        partStr = "<polygon class='gnode' sugarName='" + node.pubChem + "' stroke='black' points='" + xx1 + ","  + yy1 + " "  + xx2 + ","  + yy2 + " "  
               + xx3 + "," + yy3 + "' fill='" + node.color;
        break;
    case "diamond":
        var xx1 = xx,
        yy1 = yy - radius;
        xx2 = xx1 + radius;
        yy2 = yy1 + radius;
        xx3 = xx1;
        yy3 = yy1 + nodeSize;
        xx4 = xx1 - radius;
        yy4 = yy1 + radius;
        partStr = "<polygon class='gnode' sugarName='" + node.pubChem + "' stroke='black' points='" + xx1 + ","  + yy1 + " "  + xx2 + ","  + yy2 + " "  
               + xx3 + "," + yy3 + " " + xx4 + "," + yy4 + "' fill='" + node.color;
        break;
    case "star":
        var xx1 = xx,
        yy1 = yy - 1 * radius;
        xx2 = xx + 0.95 * radius;
        yy2 = yy - 0.31 * radius;
        xx3 = xx + 0.59 * radius;
        yy3 = yy + 0.81 * radius;
        xx4 = xx - 0.59 * radius;
        yy4 = yy + 0.81 * radius;
        xx5 = xx - 0.95 * radius;
        yy5 = yy - 0.31 * radius;
        partStr = "<polygon class='gnode' sugarName='" + node.pubChem + "' stroke='black' points='" + xx1 + ","  + yy1 + " "  + xx3 + ","  + yy3 + " "  
               + xx5 + "," + yy5 + " " + xx2 + "," + yy2 + " " + xx4 + "," + yy4 + "' fill='" + node.color;
         break;
   default:
        alert("shape (" + node.shape + ") not supported");
        partStr = "<circle class='gnode' sugarName='" + node.pubChem + "' stroke='black' r='" + radius/3 + "' cx='" + xx + "' cy='" + yy + "' fill='black"; 
  }

  // svgStr contains click functionality, svgStrOut does not
  svgStr += partStr + idStr + clickStr;
  svgStrOut += partStr + idStr + "'/>\n";
 
  if (showIDs == true) {
  // label each node with the GlycO "residue-id"
      var gid = node.residue_id.substr(1, 9);
      svgStr += "<text class='gtextIn' text-anchor='middle' dominant-baseline='central' x='"
	            + xx + "' y='" + yy + "' stroke='black'>" + gid + "</text>\n";
  }
    
  nid++;

  // recurse over children	
  for (var i = 0; i < node.cCount; i++) {
    renderNodes(node.children[i]);
  }
  // alert("svgStr is: \n" + svgStr);
  // alert("svgStrOut is: \n" + svgStrOut);

}

function findRoot(data, rCount) {
  // find the root of the json tree
  for (var j = 0; j < rCount; j++) {
    if ( (data.residues[j].parent == "no_id") || (data.residues[j].parent == "0") ) {
      return(data.residues[j]);
      j = rCount;
    }
  }
  return(0);
}

function processData(jsonData) {
  // All function calls to process json data must be made from within this function 

  // nn is an array of DOM objects in the tree specified by "data.structure"
  // the array nn is populated by renderNodes
  nn = new Array(50);
  nodeColor = new Array(50);
  nid = 0;
  lastNID = 0;
    
  svgStr = "<svg viewbox='0 0 " + width + " " + height + "' xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "<script type=\"text/ecmascript\">\n" +
    "<![CDATA[\n\n" +
    "window.onload=function () {\n" +
    "    var sugarNode = document.getElementsByClassName(\"gnode\");\n" +
    "    for (var i = 0; i < sugarNode.length; i++) {\n" +
    "        sugarNode[i].addEventListener(\"click\", mClick, false);\n" +
    "   }\n" +
    "}\n\n" +

    "function mClick() {\n" +
    "    var useExternalMethod = document.getElementById(\"extFlag\").getAttribute(\"value\");\n" +
    "    if (useExternalMethod == \"0\") {\n" +
    "        var nodeName = this.getAttribute(\"sugarName\");\n" +
    "        window.open(\"https://pubchem.ncbi.nlm.nih.gov/compound/\" + nodeName)\n" +
    "    }\n" +
    "}\n" +
    "]]>\n\n" +
    "</script>\n\n" +

    "<desc value=\"0\" id=\"extFlag\"/>";

  // alert(svgStr);
    
  // the string svgStrOut is for external consumption, and has "no onClick"" functionality
  svgStrOut = "";	
  // nodes is an array of svg "gnode" objects that are sequentially generated by renderNodes
  // Since render nodes generates "gnode" objects in the same order as it parses the DOM objects,
  //   the indices of nodes and nn constitute a map associating the "gnode" objects to the 
  //     corresponding DOM objects.
  //  This is exploited in the method  "handleResidueNode". 
  nodes = new Array();

  // start processing json data
  var residueCount = jsonData.residues.length;
  var root = findRoot(jsonData, residueCount);
  gtLayout(jsonData, root, residueCount);
  
  initialDepth = 1;
  firstX = initialDepth * xScale;
  nid = 1;
  renderLines(root, firstX, height/2, initialDepth);
  svgStrOut = svgStr;
  
  nid = 0;
  renderNodes(root);
  nodes = document.getElementsByClassName("gnode");
  
  svgStr += "</svg>\n";
  svgStrOut += "</svg>\n";
  alert(svgStrOut);

  tailStr = "\n<xmp>" + svgStrOut + "</xmp>\n</body>\n</html>";

  structureDiv.innerHTML = svgStr + "<center><h1>"
    + jsonData.glycan_id + "</h1></center>" 
    + "<h2>Proper rendering of the structure requires css code specifying gnode, glink and gtext classes</h2>" 
    + "<xmp>" + headerStr + "</xmp>"
    + "<h2>Here is the svg encoding of " + jsonData.glycan_id + " that has no \"click\" functionality</h2>" 
    + "<xmp>" + svgStrOut + "</xmp>";
}
