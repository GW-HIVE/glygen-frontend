//Tatiana Williamson
// date: April 2019



//------------------------------------------
//	Glycans
//------------------------------------------

/**
 * Venn diagram displayes human and mouse glycans.
 */
function vennGlycanHomoMusRat(dummy, data, id) {
	var glycan_homo_mus_rat = venn.VennDiagram()
		.width(350)
		.height(350);

	var div_glycan_homo_mus_rat = d3.select(id)
	div_glycan_homo_mus_rat.datum(data.venn_glycans_homo_mus_rat)
		.call(glycan_homo_mus_rat);

	var tooltip = d3.select("body").append("div")
		.attr("class", "venntooltip")
		.style("cursor", "pointer");

	div_glycan_homo_mus_rat.selectAll("path")
		.style("stroke-opacity", 0)
		.style("stroke", "#fff")
		.style("stroke-width", 3);

	div_glycan_homo_mus_rat.selectAll("g")
		.on("mouseover", function (d, i) {
			// sort all the areas relative to the current item
			venn.sortAreas(div_glycan_homo_mus_rat, d);

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
					"organism_list": d.organism.organism_list,
					"operation":"or"
				}
			});
		});
}

/**
 * Sunburst glycan chart displayes glycan types and subtypes.
 */
function sunburstGlycanTypeSubtype(dummy, data, id) {
	var width = 350;
    var height = 350;
	var margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20b);

    // Size our <svg> element, add a <g> element, and move translate 0,0 to the center of the element.
    var g = d3.select(id)
//        .attr('width', width)
//        .attr('height', height)
        .append('g')
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.attr('viewBox',
			'0 0 ' +
			(width + margin.left + margin.right) +
			' ' +
			(height + margin.top + margin.bottom)
		)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Create our sunburst data structure and size it.
    var partition = d3.partition()
        .size([2 * Math.PI, radius]);

    // Get the data from our JSON file
    d3.json("data/statistics.json", function(error, data) {
        if (error) throw error;

        // Find the root node of our data, and begin sizing process.
        var root = d3.hierarchy(data.sunburst_glycan_type_subtype)
            .sum(function (d) { return d.size});

        // Calculate the sizes of each arc that we'll draw later.
        partition(root);
        var arc = d3.arc()
            .startAngle(function (d) { return d.x0 })
            .endAngle(function (d) { return d.x1 })
            .innerRadius(function (d) { return d.y0 })
            .outerRadius(function (d) { return d.y1 });


        // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
        // variable calculations. Last, color the lines and the slices.
        g.selectAll('g')
            .data(root.descendants())
            .enter().append('g').attr("class", "node").append('path')
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .style('stroke', '#fff')
            .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });


        // Populate the <text> elements with our data-driven titles.
        g.selectAll(".node")
            .append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
            .attr("dx", "-20") // radius margin
            .attr("dy", ".5em") // rotation align
            .text(function(d) { return d.parent ? d.data.name : "" });

    });


    /**
     * Calculate the correct distance to rotate each label based on its location in the sunburst.
     * @param {Node} d
     * @return {Number}
     */
    function computeTextRotation(d) {
        var angle = (d.x0 + d.x1) / Math.PI * 90;

        // Avoid upside-down labels
        return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
        //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
    }
}

/**
 * Donut glycan chart displayes number of human and mouse glycans.
 */
function donutGlycanHomoMusRat(dummy, data, id) {
	var text = "",
		widthD = 150,
		heightD = 150,
		donutWidth = 13,
		duration = 750,
		margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		radiusHomo = Math.min(widthD, heightD) / 2,
		radiusMus = radiusHomo - donutWidth,
		radiusRat = radiusMus - donutWidth,
		colorHomo = d3.scaleOrdinal(d3.schemeCategory10),
		colorMus = d3.scaleOrdinal(d3.schemeCategory10),
		colorRat = d3.scaleOrdinal(d3.schemeCategory10);
	
	var chartId = "";
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
	var groupHomo = canvas.append("g")
		.attr('transform', 'translate(' + (widthD / 2) + ',' + (heightD / 2) + ')');

	var groupMus = canvas.append("g")
		.attr('transform', 'translate(' + (widthD / 2) + ',' + (heightD / 2) + ')');
	
	var groupRat = canvas.append("g")
		.attr('transform', 'translate(' + (widthD / 2) + ',' + (heightD / 2) + ')');

	var arcHomo = d3.arc()
		.innerRadius(radiusHomo - donutWidth)
		.outerRadius(radiusHomo);

	var arcMus = d3.arc()
		.innerRadius(radiusMus - donutWidth)
		.outerRadius(radiusMus);
	
	var arcRat = d3.arc()
		.innerRadius(radiusRat - donutWidth)
		.outerRadius(radiusRat);

	var pie = d3.pie()
		.value(function (d) {
			return d.size;
		})
		.sort(null);

	var theArcHomo = groupHomo.selectAll(".arc")
		.data(pie(data.glycan_homo_donut))
		.enter()
		.append("g")
		.attr("class", "arc")
		// On click goes to list page
		.on("click", function (d) {
			searchGlycansBy({
				"organism": {
					organism_list: [
						{
							"id": d.data.organism.id,
							"name": d.data.organism.name
						}
					],
					"operation":"or"
				},
				"glycan_type": d.data.glycan_type
			});
		})
		.on("mouseover", function (d) {
			let groupH = d3.select(this)
				.append("g")
				.attr("class", "text-group")

			groupH.append("text")
				.attr("class", "name-text")
				.text(`${d.data.name}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '-1.2em');

			groupH.append("text")
				.attr("class", "value-text")
				.text(`${d.data.size}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '.6em');
		})
		.on("mouseout", function (d) {
			d3.select(this)
				.style("cursor", "none")
				.style("fill", colorHomo(this._current))
				.select(".text-group").remove();
		})
		.append('path')
		.attr('d', arcHomo)
		.attr('fill', (d, i) => colorHomo(i))
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

	var theArcMus = groupMus.selectAll(".arc")
		.data(pie(data.glycan_mus_donut))
		.enter()
		.append("g")
		.attr("class", "arc")
		// On click goes to list page
		.on("click", function (d) {
			//console.log(d.data.name); 
			searchGlycansBy({
				"organism": {
					organism_list: [
						{
							"id": d.data.organism.id,
							"name": d.data.organism.name
						}
					],
					"operation":"or"
				},
				"glycan_type": d.data.glycan_type
			});
		})
		.on("mouseover", function (d) {
			let groupM = d3.select(this)
				.append("g")
				.attr("class", "text-group")

			groupM.append("text")
				.attr("class", "name-text")
				.text(`${d.data.name}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '-1.2em');

			groupM.append("text")
				.attr("class", "value-text")
				.text(`${d.data.size}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '.6em');
		})
		.on("mouseout", function (d) {
			d3.select(this)
				.style("cursor", "none")
				.style("fill", colorMus(this._current))
				.select(".text-group").remove();
		})
		.append('path')
		.attr('d', arcMus)
		.attr('fill', (d, i) => colorMus(i))
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
	
	var theArcRat = groupRat.selectAll(".arc")
		.data(pie(data.glycan_rat_donut))
		.enter()
		.append("g")
		.attr("class", "arc")
		// On click goes to list page
		.on("click", function (d) {
			//console.log(d.data.name); 
			searchGlycansBy({
				"organism": {
					organism_list: [
						{
							"id": d.data.organism.id,
							"name": d.data.organism.name
						}
					],
					"operation":"or"
				},
				"glycan_type": d.data.glycan_type
			});
		})
		.on("mouseover", function (d) {
			let groupR = d3.select(this)
				.append("g")
				.attr("class", "text-group")

			groupR.append("text")
				.attr("class", "name-text")
				.text(`${d.data.name}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '-1.2em');

			groupR.append("text")
				.attr("class", "value-text")
				.text(`${d.data.size}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '.6em');
		})
		.on("mouseout", function (d) {
			d3.select(this)
				.style("cursor", "none")
				.style("fill", colorRat(this._current))
				.select(".text-group").remove();
		})
		.append('path')
		.attr('d', arcRat)
		.attr('fill', (d, i) => colorRat(i))
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

/**
 * Pie glycan chart displayes motifs and their frequencies.
 */
function pieChartMotif(dummy, data, id) {
	var text = "",
		width = 150,
		height = 150,
		duration = 750,
		donutWidth = 40,
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
		.attr('class', 'pieMotif')
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
		.innerRadius(radius - donutWidth)
		.outerRadius(radius);

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

	var path = g.selectAll('.pieMotif')
		.data(pie(data.pie_motif_modified))
		.enter()
		.append('g')
		.attr('class', 'pieMotif')
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
			let tooltip = d3.select(this)
				.append("g")
				.attr("class", "text-group")
			
			tooltip.append("text")
				.attr("class", "name-text")
				.text(`${d.data.name}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '-1.2em');

			tooltip.append("text")
				.attr("class", "value-text")
				.text(`${d.data.size}`)
				.attr('text-anchor', 'middle')
				.attr('dy', '.6em');
			
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
			d3.select(this)
			//d3.selectAll('.piePie')
				.attr('opacity', '1')
				.style("cursor", "none")
				.style("fill", color(this._current))
				.select(".text-group").remove();
		})
		.append('path')
		.attr('d', arc)
		.attr('fill', (d, i) => color(i))
		//.append("title");
//		.text(d => `${d.data.name}:` + '\n' + `${d.data.size.toLocaleString()}`);
}

/**
 * Bar glycan chart displayes glycan mass range.
 */
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
	
		.on("mouseover", function (d) {
			d3.select(this).transition()
				.duration('50')
				.style("cursor", "pointer");
		})
		
		.on("mouseout", function (d) {
			d3.select(this).transition()
				.duration('50')
				.style("cursor", "none")
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

/**
 * Bar glycan chart displayes glycan sugar range.
 */
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
		.on("mouseover", function (d) {
			d3.select(this).transition()
				.duration('50')
				.style("cursor", "pointer");
		})
		
		.on("mouseout", function (d) {
			d3.select(this).transition()
				.duration('50')
				.style("cursor", "none")
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

//------------------------------------------
//	Proteins
//------------------------------------------

/**
 * Venn diagram displayes number of human proteins, glycoproteins, enzymes.
 */
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
					},
					glycosylated_aa: {
            			"aa_list": ["N","S","T"],
            			"operation":"or"
        			}
				});
			} else if (d.name == "Enzymes") {
				searchGlycansBy({
					"organism": {
						organism_list: [
							{
								"id": 9606,
								"name": "Homo sapiens"
							}
						],
						"operation":"or"
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

/**
 * Pie chart displayes number of protein genes for humans, mouse, and rat data.
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

//------------------------------------------
//	Glycoproteins
//------------------------------------------

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
	var query_type = "search_glycan";
	var formObject = {
		"operation": "AND",
		"query_type": query_type,
		"mass_type": "native"
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
				"organism_list" : param.organism.organism_list,
				"operation":"or"
        	},
			"glycan_type": param.glycan_type
		})
		chartId = "donut_glycan_homo_mus_rat";
	} 	
//	 else if (param.organism) {
//		$.extend(formObject, {
//			organism: {
//				organism_list: [
//					{
//						"id": param.organism.id,
//						"name": param.organism.name
//					}
//				],
//				"operation":"or"
//        	}
//		})
//		chartId = "venn_glycans_homo_mus_rat";
//}

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
			},
			glycosylated_aa: {
				"aa_list": param.glycosylated_aa.aa_list,
				"operation":"or"
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

