//Tatiana Williamson
// date: April 2019

function vennProteinHomo(dummy, data, id) {
	var protein_homo = venn.VennDiagram()
		.width(350)
		.height(350);

	var div_protein_homo = d3.select(id)
	div_protein_homo.datum(data.venn_protein_homo)
		.call(protein_homo);

	var tooltip = d3.select("body").append("div")
		.attr("class", "venntooltip")
		.style("cursor", "pointer");

	div_protein_homo.selectAll("path")
		.style("stroke-opacity", 0)
		.style("stroke", "#fff")
		.style("stroke-width", 3);

	div_protein_homo.selectAll("g")
		.on("mouseover", function (d, i) {
			// sort all the areas relative to the current item
			venn.sortAreas(div_protein_homo, d);

			// Display a tooltip with the current size
			tooltip.transition().duration(400).style("opacity", .9);
			tooltip.text(d.size + '\n' + d.tooltipname);

			// highlight the current path
			var selection = d3.select(this).transition("tooltip").duration(400);
			selection.select("path")
				.style("fill-opacity", d.sets.length == 1 ? .4 : .1)
				.style("stroke-opacity", 1)
				.style("cursor", "pointer");
		})

		.on("mousemove", function () {
			tooltip.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})

		// On click goes to list page
		.on("click", function (d) {
			//console.log(d.data.size); 
			if (d.name == "Proteins") {
				searchProteinsBy({
					"organism": {
						"id": 9606,
						"name": "Homo sapiens"
					}
				});
			} else if (d.name == "Glycoproteins") {
				searchGlycoproteinsBy({
					"organism": {
						"id": 9606,
						"name": "Homo sapiens"
					}
				});
			} else if (d.name == "Enzymes") {
				searchGlycansBy({
					"organism": {
						"id": 9606,
						"name": "Homo sapiens"
					}
				});
			}

		})

		.on("mouseout", function (d, i) {
			tooltip.transition().duration(400).style("opacity", 0);
			var selection = d3.select(this).transition("tooltip").duration(400);
			selection.select("path")
				.style("fill-opacity", d.sets.length == 1 ? .25 : .0)
				.style("stroke-opacity", 0);
		});
}

function vennGlycanHomoMus(dummy, data, id) {
	var glycan_homo_mus = venn.VennDiagram()
		.width(350)
		.height(350);

	var div_glycan_homo_mus = d3.select(id)
	div_glycan_homo_mus.datum(data.venn_glycans_homo_mus)
		.call(glycan_homo_mus);

	var tooltip = d3.select("body").append("div")
		.attr("class", "venntooltip")
		.style("cursor", "pointer");

	div_glycan_homo_mus.selectAll("path")
		.style("stroke-opacity", 0)
		.style("stroke", "#fff")
		.style("stroke-width", 3);

	div_glycan_homo_mus.selectAll("g")
		.on("mouseover", function (d, i) {
			// sort all the areas relative to the current item
			venn.sortAreas(div_glycan_homo_mus, d);

			// Display a tooltip with the current size
			tooltip.transition().duration(400)
				.style("opacity", .9);
			tooltip.text(d.size + '\n' + d.tooltipname);

			// highlight the current path
			var selection = d3.select(this).transition("tooltip").duration(400);
			selection.select("path")
				.style("fill-opacity", d.sets.length == 1 ? .4 : .1)
				.style("stroke-opacity", 1)
				.style("cursor", "pointer");
		})

		.on("mousemove", function () {
			tooltip.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})

		.on("mouseout", function (d, i) {
			tooltip.transition().duration(400).style("opacity", 0);
			var selection = d3.select(this).transition("tooltip").duration(400);
			selection.select("path")
				.style("fill-opacity", d.sets.length == 1 ? .25 : .0)
				.style("stroke-opacity", 0);
		})
		// On click goes to list page
		.on("click", function (d) {
			//console.log(d.size); 
			searchGlycansBy({
				"organism": {
					"id": d.organism.id,
					"name": d.organism.name
				}
			});
		});
}

function donutChartGlycan(dummy, data, id) {
	var text = "",
		widthD = 150,
		heightD = 150,
		donutWidth = 20,
		duration = 750,
		margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		radiusD = Math.min(widthD, heightD) / 2,
		radiusD2 = radiusD - donutWidth,
		colorD = d3.scaleOrdinal(d3.schemeCategory10),
		colorD2 = d3.scaleOrdinal(d3.schemeCategory10);

	var canvas = d3.select(id)
		.append("svg")
		.attr('class', 'pie')
		.style('width', '80%')
		.style('margin-bottom', '20px')
		//		.attr('width', width)
		//		.attr('height', height);
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox',
			'0 0 ' +
			(widthD + margin.left + margin.right) +
			' ' +
			(heightD + margin.top + margin.bottom)
		);
	var group = canvas.append("g")
		.attr('transform', 'translate(' + (widthD / 2) + ',' + (heightD / 2) + ')');

	var group2 = canvas.append("g")
		.attr('transform', 'translate(' + (widthD / 2) + ',' + (heightD / 2) + ')');

	var arc = d3.arc()
		.innerRadius(radiusD - donutWidth)
		.outerRadius(radiusD);

	var arc2 = d3.arc()
		.innerRadius(radiusD2 - donutWidth)
		.outerRadius(radiusD2);

	var pie = d3.pie()
		.value(function (d) {
			return d.size;
		})
		.sort(null);

	var theArc = group.selectAll(".arc")
		.data(pie(data.glycan_homo))
		.enter()
		.append("g")
		.attr("class", "arc")
		// On click goes to list page
		.on("click", function (d) {
			searchGlycansBy({
				"organism": {
					"id": d.data.organism.id,
					"name": d.data.organism.name
				},
				"glycan_type": d.data.glycan_type
			});
		})
		.on("mouseover", function (d) {
			let group = d3.select(this)
				.append("g")
				.attr("class", "text-group")

			group.append("text")
				.attr("class", "name-text")
				.text(`${d.data.name}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '-1.2em');

			group.append("text")
				.attr("class", "value-text")
				.text(`${d.data.size}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '.6em');
		})
		.on("mouseout", function (d) {
			d3.select(this)
				.style("cursor", "none")
				.style("fill", colorD(this._current))
				.select(".text-group").remove();
		})
		.append('path')
		.attr('d', arc)
		.attr('fill', (d, i) => colorD(i))
		.on("mouseover", function (d) {
			d3.select(this).transition()
				.duration('50')
				.attr('opacity', '.65')
				.style("cursor", "pointer");
		})
		.on("mouseout", function (d) {
			d3.select(this).transition()
				.duration('50')
				.attr('opacity', '1')
				.style("cursor", "none");
		})
		.each(function (d, i) {
			this._current = i;
		});

	var theArc2 = group2.selectAll(".arc")
		.data(pie(data.glycan_mus))
		.enter()
		.append("g")
		.attr("class", "arc")
		// On click goes to list page
		.on("click", function (d) {
			//console.log(d.data.name); 
			searchGlycansBy({
				"organism": {
					"id": d.data.organism.id,
					"name": d.data.organism.name
				},
				"glycan_type": d.data.glycan_type
			});
		})
		.on("mouseover", function (d) {
			let group2 = d3.select(this)
				.append("g")
				.attr("class", "text-group")

			group2.append("text")
				.attr("class", "name-text")
				.text(`${d.data.name}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '-1.2em');

			group2.append("text")
				.attr("class", "value-text")
				.text(`${d.data.size}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '.6em');
		})
		.on("mouseout", function (d) {
			d3.select(this)
				.style("cursor", "none")
				.style("fill", colorD2(this._current))
				.select(".text-group").remove();
		})
		.append('path')
		.attr('d', arc2)
		.attr('fill', (d, i) => colorD2(i))
		.on("mouseover", function (d) {
			d3.select(this).transition()
				.duration('50')
				.attr('opacity', '.65')
				.style("cursor", "pointer");
		})
		.on("mouseout", function (d) {
			d3.select(this).transition()
				.duration('50')
				.attr('opacity', '1')
				.style("cursor", "none");
		})
		.each(function (d, i) {
			this._current = i;
		});
}

function pieChartMotif(dummy, data, id) {
	var text = "",
		width = 150,
		height = 150,
		duration = 750,
		margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};

	var radius = Math.min(width, height) / 2;

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var svgP = d3.select(id)
		.append('svg')
		.attr('class', 'piePie')
		.style('width', '80%')
		//		.attr('width', width)
		//		.attr('height', height);
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox',
			'0 0 ' +
			(width + margin.left + margin.right) +
			' ' +
			(height + margin.top + margin.bottom)
		);

	var g = svgP.append('g')
		.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

	var arc = d3.arc()
		.innerRadius(0)
		.outerRadius(radius - 5);

	var pie = d3.pie()
		.value(function (d) {
			return d.size;
		})
		.sort(null);

	var arcLabel = d3.arc()
		.innerRadius(radius - 30)
		.outerRadius(radius - 30);

	//to accumulate all pie elements with size < 1000
	var accWhenLessThan = 1000;
	$.extend(data, {
		"pie_motif_modified": []
	});
	var motifOthers = {
		"name": "Other",
		"size": 0
	}
	$.each(data.pie_motif, function (i, v) {
		if (v.size >= accWhenLessThan) {
			data.pie_motif_modified.push(v);
		} else {
			motifOthers.size += v.size;
		}
	});
	data.pie_motif_modified.push(motifOthers);

	var path = g.selectAll('.piePie')
		.data(pie(data.pie_motif_modified))
		.enter()
		.append('g')
		.attr('class', 'piePie')
		.style('stroke', 'white')
		// On click goes to list page
		.on("click", function (d) {
			//console.log(d.data.size); 
			var motif = d.data.name;
			searchGlycansBy({
				"motif": motif
			});
		})
		.on("mouseover", function (d) {
			//      		d3.selectAll('.piePie')
			if (d.data.name != "Other") {
				d3.select(this)
					.attr('opacity', '.65')
					.style("cursor", "pointer");
			} else {
				d3.select(this)
					.attr('opacity', '.65')
					.style("cursor", "default");
			}
		})
		.on("mouseout", function (d) {
			d3.selectAll('.piePie')
				.attr('opacity', '1')
				.style("cursor", "none");

		})
		.append('path')
		.attr('d', arc)
		.attr('fill', (d, i) => color(i))
		.append("title")
		.text(d => `${d.data.name}:` + '\n' + `${d.data.size.toLocaleString()}`);
}

function barChartMass(dummy, data, id) {
	// set the dimensions and margins of the graph
	var margin = {
			top: 20,
			right: 20,
			bottom: 80,
			left: 30
		},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "toolTip");

	// set the ranges
	var x = d3.scaleBand()
		.range([0, width])
		.padding(0.1);
	var y = d3.scaleLinear()
		.range([height, 0]);

	// append the svg object to the body of the page
	// append a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select(id)
		.append("svg")
		//				.attr("width", width + margin.left + margin.right)
		//				.attr("height", height + margin.top + margin.bottom)
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox',
			'0 0 ' +
			(width + margin.left + margin.right) +
			' ' +
			(height + margin.top + margin.bottom)
		)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//convert bar_mass_ranges to chart compatible format
	var bmr = data.bar_mass_ranges;
	var barData = [];
	var currentRangeStart = 0;
	var skipTickLabels = 4;
	for (var i = 0; i < bmr.data.length; i++) {
		var label = currentRangeStart + bmr.stepsize;
		barData.push({
			"name": label,
			"size": bmr.data[i],
			"range": currentRangeStart + "-" + (currentRangeStart + bmr.stepsize)
		});
		currentRangeStart += bmr.stepsize;
	}
	// format the data
	bmr.data.forEach(function (d) {
		d.size = +d.size;
	});

	// Scale the range of the data in the domains
	x.domain(barData.map(function (d) {
		return d.name;
	}));

	y.domain([0, d3.max(barData, function (d) {
		return d.size;
	})]);
	// append the rectangles for the bar chart
	svg.selectAll(".bar")
		.data(barData)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function (d) {
			return x(d.name);
		})
		.attr("width", x.bandwidth())
		.attr("y", function (d) {
			return y(d.size);
		})
		.attr("height", function (d) {
			return height - y(d.size);
		})
		// On click goes to list page
		.on("click", function (d) {
			//				    console.log(d.size);
			var range = d.range.split("-");
			searchGlycansBy({
				"mass": {
					"mass_min": range[0],
					"mass_max": range[1]
				},
				"mass_type": "Native"
			});
		})
		.on("mousemove", function (d) {
			tooltip
				.style("left", d3.event.pageX - 50 + "px")
				.style("top", d3.event.pageY - 70 + "px")
				.style("display", "inline-block")
				.html("Mass Range:" + " " + (d.name - bmr.stepsize + " " + "Da" + " " + "-" + " " + (d.name)) + " " + "Da" + "<br>" + "<br>" + (d.size) + " " + "Glycans");
		})
		.on("mouseout", function (d) {
			tooltip.style("display", "none");
		});

	// add the x Axis	
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).tickFormat(function (t, i) {
			return (i + 1) % (skipTickLabels + 1) == 0 || i == barData.length - 1 ? t : ""
		}))
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-8px")
		.attr("dy", "-1px")
		.attr("transform", "rotate(-65)");

	// add the y Axis
	svg.append("g")
		.call(d3.axisLeft(y));

	// add text to y Axis
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Frequency");

	// add text to y Axis
	svg.append("text")
		.attr("x", 75)
		.attr("dx", "0.71em")
		.attr("dy", "32em")
		.attr("text-anchor", "end")
		.text("Mass ranges");
}

function barChartSugar(dummy, data, id) {
	// set the dimensions and margins of the graph
	var margin = {
			top: 20,
			right: 20,
			bottom: 70,
			left: 30
		},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "toolTip");

	// set the ranges
	var x = d3.scaleBand()
		.range([0, width])
		.padding(0.1);
	var y = d3.scaleLinear()
		.range([height, 0]);

	// append the svg object to the body of the page
	// append a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select(id)
		.append("svg")
		//				.attr("width", width + margin.left + margin.right)
		//				.attr("height", height + margin.top + margin.bottom)

		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox',
			'0 0 ' +
			(width + margin.left + margin.right) +
			' ' +
			(height + margin.top + margin.bottom)
		)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//convert bar_mass_ranges to chart compatible format
	var bsr = data.bar_sugar_ranges;
	var barData = [];
	var currentRangeStart = 0;
	var skipTickLabels = 0;
	for (var i = 0; i < bsr.data.length; i++) {
		var label = currentRangeStart + bsr.stepsize;
		barData.push({
			"name": label,
			"size": bsr.data[i],
			"range": currentRangeStart + "-" + (currentRangeStart + bsr.stepsize)
		});
		currentRangeStart += bsr.stepsize;
	}

	// format the data
	bsr.data.forEach(function (d) {
		d.size = +d.size;
	});

	// Scale the range of the data in the domains
	x.domain(barData.map(function (d) {
		return d.name;
	}));

	y.domain([0, d3.max(barData, function (d) {
		return d.size;
	})]);
	// append the rectangles for the bar chart
	svg.selectAll(".bar")
		.data(barData)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function (d) {
			return x(d.name);
		})
		.attr("width", x.bandwidth())
		.attr("y", function (d) {
			return y(d.size);
		})
		.attr("height", function (d) {
			return height - y(d.size);
		})
		// On click goes to list page
		.on("click", function (d) {
			var range = d.range.split("-");
			searchGlycansBy({
				"sugar": {
					"sugar_min": range[0],
					"sugar_max": range[1]
				}
			});
		})
		.on("mousemove", function (d) {
			tooltip
				.style("left", d3.event.pageX - 50 + "px")
				.style("top", d3.event.pageY - 70 + "px")
				.style("display", "inline-block")
				.html("Sugar Range:" + " " + (d.name - bsr.stepsize + " " + "-" + " " + (d.name)) + "<br>" + "<br>" + (d.size) + " " + "Glycans");
		})
		.on("mouseout", function (d) {
			tooltip.style("display", "none");
		});

	// add the x Axis	
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).tickFormat(function (t, i) {
			return (i + 1) % (skipTickLabels + 1) == 0 || i == barData.length - 1 ? t : ""
		}))
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "3px")
		.attr("dy", "6px");
	//.attr("transform", "rotate(-65)" );

	// add the y Axis
	svg.append("g")
		.call(d3.axisLeft(y));

	// add text to y Axis
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Frequency");

	// add text to y Axis
	svg.append("text")
		.attr("x", 75)
		.attr("dx", "0.71em")
		.attr("dy", "32em")
		.attr("text-anchor", "end")
		.text("Sugar ranges");
}

/**
 * Pie chart displayes number of genes for humans, mouse, and rat data.
 */
function pieProteinGenes(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius - 5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_protein_genes))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchProteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "0em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1em")
     	.text(function(d) { return d.data.size; });
}

/**
 * Pie chart displayes number of canonical proteins for humans, mouse, and rat data.
 */
function pieProteinCanonical(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius - 5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_canonical_proteins))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchProteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "0em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1em")
     	.text(function(d) { return d.data.size; });
}

/**
 * Pie chart displayes number of Canonical and Isoforms Proteins for humans, mouse, and rat data.
 */
function pieProteinCanonicalIsoforms(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius - 5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_canonical_isoforms_proteins))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchProteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "0.15em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1.35em")
     	.text(function(d) { return d.data.size; });
}

/**
 * Pie chart displayes number of Glycohydrolases proteins for humans, mouse, and rat data.
 */
function pieProteinGlycohydrolases(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius - 5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_glycohydrolases_proteins))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchProteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "0.15em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1.35em")
     	.text(function(d) { return d.data.size; });
}

/**
 * Pie chart displayes number of Glycosyltransferases proteins for humans, mouse, and rat data.
 */
function pieProteinGlycosyltransferases(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius - 5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_glycosyltransferases_proteins))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchProteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "0.15em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1.35em")
     	.text(function(d) { return d.data.size; });
}

/**
 * Pie chart displayes number of Glycosylated proteins for humans, mouse, and rat data.
 */
function pieGlycosylatedProtein(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius - 5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_glycosylated_proteins))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchGlycoproteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "0.15em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1.35em")
     	.text(function(d) { return d.data.size; });
}

/**
 * Pie chart displayes number of Glycosylated proteins with reported glycans for humans, mouse, and rat data.
 */
function pieGlycosylProtReportGlyc(dummy, data, id) {
	// set the dimensions and margins of the graph
var width = 150,
	height = 150,
	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select(id)
	.append("svg")
	.attr("class", "arc")
	.style('width', '80%')
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	);
var arc = d3.arc()
    .innerRadius(0)
	.outerRadius(radius-5);

var labelArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });
	
  var g = svg.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var path = g.selectAll(".arc")
    .data(pie(data.pie_glycosyl_prot_report_glyc))
    .enter().append("g")
    .attr("class", "arc")
 	// On click goes to list page
	.on("click", function (d) {
		searchGlycoproteinsBy({
			"organism": {
				"id": d.data.organism.id,
				"name": d.data.organism.name
			},
			"protein_type": d.data.protein_type
		});
	});

 	path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

 	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", ".15em")
     	.text(function(d) { return d.data.name; });
	path.append("text")
    	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    	.attr("dy", "1.35em")
     	.text(function(d) { return d.data.size; });
}

/**
 * hides the loading gif and displays the page after the search_init results are loaded.
 * @author Gaurav Agarwal
 * @date July 25, 2018
 */
$(document).ajaxStop(function () {
	$('#loading_image').fadeOut();
});

/** 
 * On submit, function forms the JSON and submits to the search web services
 */
function searchGlycansBy(param) {
	// displays the loading gif when the ajax call starts
	$('#loading_image').fadeIn();

	var prevListId = getParameterByName("id") || "";
	activityTracker("user", prevListId, "Performing glycan search in Statistics");
	var query_type = "mass_range_glycan_search";
	var formObject = {
		"operation": "AND",
		query_type: query_type,
	};
	var chartId = "";
	if (param.mass) {
		$.extend(formObject, {
			mass: {
				"min": parseInt(param.mass.mass_min),
				"max": parseInt(param.mass.mass_max)
			},
			"mass_type": param.mass_type
			//			"mass_type":"native"
		})
		chartId = "bar_chart_mass";
	} else if (param.sugar) {
		$.extend(formObject, {
			number_monosaccharides: {
				"min": parseInt(param.sugar.sugar_min),
				"max": parseInt(param.sugar.sugar_max)
			}
		})
		chartId = "bar_chart_sugar";
	} else if (param.motif) {
		$.extend(formObject, {
			"glycan_motif": param.motif
		})
		chartId = "pie_chart_motif";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			},
			"glycan_type": param.glycan_type
		})
		chartId = "pie_chart_glycan";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "venn_glycans_homo_mus";
	}

	var json = "query=" + JSON.stringify(formObject);
	$.ajax({
		type: 'post',
		url: getWsUrl("glycan_search"),
		data: json,
		timeout: getTimeout("search_glycan"),
		error: ajaxFailure,
		success: function (results) {
			if (results.error_code) {
				displayErrorByCode(results.error_code, results.field);
				activityTracker("error", "", results.error_code);
				activityTracker("error", "", "Statistics: " + results.error_code + " for " + json);
				$('#loading_image').fadeOut();
			} else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
				displayErrorByCode('no-results-found');
				activityTracker("user", "", "Statistics: no result found for " + json);
				$('#loading_image').fadeOut();
			} else {
				activityTracker("user", prevListId + ">" + results.list_id, "Statistics: Searched with modified parameters");

				window.location = './glycan_list.html?id=' + results.list_id + '&stat=' + chartId;
				$('#loading_image').fadeOut();
			}
		}
	});
}

/** 
 * On submit, function forms the JSON and submits to the search web services
 */
function searchProteinsBy(param) {
	// displays the loading gif when the ajax call starts
	$('#loading_image').fadeIn();

	var prevListId = getParameterByName("id") || "";
	activityTracker("user", prevListId, "Performing protein search in Statistics");

	var query_type = "search_protein";
	var formObject = {
		"operation": "AND",
		query_type: query_type,
	};
	var chartId = "";
	if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "venn_protein_homo";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_protein_genes";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_canonical_proteins";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_canonical_isoforms_proteins";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_glycohydrolases_proteins";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_glycosyltransferases_proteins";
	}

	var json = "query=" + JSON.stringify(formObject);
	$.ajax({
		type: 'post',
		url: getWsUrl("search_protein"),
		data: json,
		timeout: getTimeout("search_protein"),
		error: ajaxFailure,
		success: function (results) {
			if (results.error_code) {
				displayErrorByCode(results.error_code);
				// activityTracker("error", "", results.error_code);
				activityTracker("error", "", "Statistics: " + results.error_code + " for " + json);
				$('#loading_image').fadeOut();
			} else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
				displayErrorByCode('no-results-found');
				activityTracker("user", "", "Statistics: no result found for " + json);
				$('#loading_image').fadeOut();
			} else {
				activityTracker("user", prevListId + ">" + results.list_id, "Statistics: Searched with modified parameters");
				window.location = './protein_list.html?id=' + results.list_id + '&stat=' + chartId;
				$('#loading_image').fadeOut();
			}
		}
	});
}

/** 
 * On submit, function forms the JSON and submits to the search web services
 */
function searchGlycoproteinsBy(param) {
	// displays the loading gif when the ajax call starts
	$('#loading_image').fadeIn();

	var prevListId = getParameterByName("id") || "";
	activityTracker("user", prevListId, "Performing glycoprotein search in Statistics");

	var query_type = "search_protein";
	var formObject = {
		"operation": "AND",
		query_type: query_type,
	};
	var chartId = "";
	if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "venn_protein_homo";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_glycosylated_proteins";
	} else if (param.organism) {
		$.extend(formObject, {
			organism: {
				"id": param.organism.id,
				"name": param.organism.name
			}
		})
		chartId = "pie_glycosyl_prot_report_glyc";
	}
	
	var json = "query=" + JSON.stringify(formObject);
	$.ajax({
		type: 'post',
		url: getWsUrl("search_protein"),
		data: json,
		timeout: getTimeout("search_protein"),
		error: ajaxFailure,
		success: function (results) {
			if (results.error_code) {
				displayErrorByCode(results.error_code);
				activityTracker("error", "", results.error_code);
				activityTracker("error", "", "Statistics: " + results.error_code + " for " + json);
				$('#loading_image').fadeOut();
			} else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
				displayErrorByCode('no-results-found');
				activityTracker("user", "", "Statistics: no result found for " + json);
				$('#loading_image').fadeOut();
			} else {
				activityTracker("user", prevListId + ">" + results.list_id, "Statistics: Searched with modified parameters");
				window.location = './glycoprotein_list.html?id=' + results.list_id + '&stat=' + chartId;
				$('#loading_image').fadeOut();
			}
		}
	});
}

