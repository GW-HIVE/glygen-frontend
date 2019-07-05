//Tatiana Williamson
// date: April 2019

function vennGlycanHomoMus(dummy, data, id) {
	var glycan_homo_mus = venn.VennDiagram()
		.width(350)
		.height(350);

	var div_homo_mus = d3.select(id)
	var data = div_homo_mus.datum(data.venn_glycans_homo_mus)
		.call(glycan_homo_mus);

	var tooltip = d3.select("body").append("div")
		.attr("class", "venntooltip")
		.style("cursor", "pointer");

	div_homo_mus.selectAll("path")
		.style("stroke-opacity", 0)
		.style("stroke", "#fff")
		.style("stroke-width", 3)

	div_homo_mus.selectAll("g")
		.on("mouseover", function (d, i) {
			// sort all the areas relative to the current item
			venn.sortAreas(div_homo_mus, d);

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
			if (d.data.glycan_type != "Other") {
				d3.select(this).transition()
					.duration('50')
					.attr('opacity', '.65')
					.style("cursor", "pointer");
			} else {
				d3.select(this)
					.style("cursor", "default");
			}
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
			if (d.data.glycan_type != "Other") {
				d3.select(this).transition()
					.duration('50')
					.attr('opacity', '.65')
					.style("cursor", "pointer");
			} else {
				d3.select(this)
					.style("cursor", "default");
			}
		})
		.on("mouseout", function (d) {
			d3.select(this).transition()
				.duration('50')
				.attr('opacity', '1')
				.style("cursor", "none");
			//				.style("fill", colorD2(this._current));
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
		.outerRadius(radius);

	var pie = d3.pie()
		.value(function (d) {
			return d.size;
		})
		.sort(null);

	var arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

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
				}
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


function searchGlycansBy(param) {
	//    activityTracker("user", "", "Mass Range Search");

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
			}
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
				//                displayErrorByCode(results.error_code, results.field);
				// activityTracker("error", "", results.error_code);
				//                activityTracker("error", "", "Advanced Search: " + results.error_code + " for " + json);
			} else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
				//                displayErrorByCode('no-results-found');
				//                activityTracker("user", "", "Advanced Search: no result found for " + json);
			} else {
				//                activityTracker("user", prevListId + ">" + results.list_id, "Advanced Search: Searched with modified parameters");

				window.location = './glycan_list.html?id=' + results.list_id + '&stat=' + chartId;
			}
		}
	});
}
