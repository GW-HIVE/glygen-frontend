//Tatiana Williamson
// date: April 2019

function donutChart(dummy, data, id) {
		var text = "",
			widthD = 350,
			heightD = 350,
			donutWidth = 45,
			duration = 750,
			margin = {top: 10, right: 10, bottom: 10, left: 10},
			radiusD = Math.min(widthD, heightD) / 2,
			radiusD2 = radiusD - donutWidth,
			colorD = d3.scaleOrdinal(d3.schemeCategory10),
			colorD2 = d3.scaleOrdinal(d3.schemeCategory10),
			padAngle, // effectively dictates the gap between slices
        	cornerRadius; // sets how rounded the corners are on each slice

		var canvas = d3.select("#donut_chart")
			.append("svg")
			.attr('class', 'pie')
			.attr("width", widthD)
			.attr("height", heightD);

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
			.value(function (d) { return d.size; })
			.sort(null);

		var theArc = group.selectAll(".arc")
			.data(pie(data.donut))
			.enter()
			.append("g")
			.attr("class", "arc")
			.on("mouseover", function(d) {
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
			.on("mouseout", function(d) {
				d3.select(this)
				.style("cursor", "none")  
				.style("fill", colorD(this._current))
				.select(".text-group").remove();
			})
			.append('path')
			.attr('d', arc)
			.attr('fill', (d,i) => colorD(i))
			.on("mouseover", function(d) {
				d3.select(this).transition()
            	.duration('50')
            	.attr('opacity', '.65')     
				.style("cursor", "pointer");
			})
			.on("mouseout", function(d) {
				d3.select(this).transition()
            	.duration('50')
            	.attr('opacity', '1')
				.style("cursor", "none");  
//				.style("fill", colorD(this._current));
			})
			.each(function(d, i) { this._current = i; });
	
		var theArc2 = group2.selectAll(".arc")
			.data(pie(data.donut2))
			.enter()
			.append("g")
			.attr("class", "arc")
			.on("mouseover", function(d) {
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
			.on("mouseout", function(d) {
				d3.select(this)
				.style("cursor", "none")  
				.style("fill", colorD2(this._current))
				.select(".text-group").remove();
			})
			.append('path')
			.attr('d', arc2)
			.attr('fill', (d,i) => colorD2(i))
			.on("mouseover", function(d) {
				d3.select(this).transition()
            	.duration('50')
            	.attr('opacity', '.65')     
				.style("cursor", "pointer");
//				.style("fill", "#888");
			})
			.on("mouseout", function(d) {
				d3.select(this).transition()
            	.duration('50')
            	.attr('opacity', '1')
				.style("cursor", "none");  
//				.style("fill", colorD2(this._current));
			})
			.each(function(d, i) { this._current = i; });

	}


function pieChart(dummy, data, id) {
	var text = "";
	var width = 350;
	var height = 350;
	var thickness = 40;
	var duration = 750;
	
	var radius = Math.min(width, height) / 2;
	
	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var svgP = d3.select(id)
		.append('svg')
		.attr('class', 'piePie')
		.attr('width', width)
		.attr('height', height);

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
	
	var path = g.selectAll('.piePie')
		.data(pie(data.pie_motif))
		.enter()
		.append('g')
		.attr('class', 'piePie')
		.style('stroke', 'white')
		.on("mouseover", function(d) {
//      		d3.selectAll('.piePie')

      		d3.select(this) 
        	.attr('opacity', '.65') 
			.style("cursor", "pointer"); 
			
    	})
		.on("mouseout", function(d) {           
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

function barChart(dummy, data, id){
	// set the dimensions and margins of the graph
	var margin = {top: 20, right: 20, bottom: 80, left: 30},
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
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
	  		.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//convert bar_mass_ranges to chart compatible format
	var bmr = data.bar_mass_ranges;
	var barData = [];
	var currentRangeStart = 0;
	var skipTickLabels = 4;
	for(var i=0; i<bmr.data.length; i++) {
		var label = currentRangeStart + bmr.stepsize;
		barData.push({"name": label, "size": bmr.data[i]});
		currentRangeStart += bmr.stepsize;
	}
	// format the data
	bmr.data.forEach(function(d) {
		d.size = +d.size;
	});

	// Scale the range of the data in the domains
	x.domain(barData.map(function(d) { return d.name; }));
	
	y.domain([0, d3.max(barData, function(d) { return d.size; })]);
	 	// append the rectangles for the bar chart
	 	svg.selectAll(".bar")
			.data(barData)
			.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return x(d.name); })
				.attr("width", x.bandwidth())
				.attr("y", function(d) { return y(d.size); })
				.attr("height", function(d) { return height - y(d.size); })
				.on("mousemove", function(d){
					tooltip
					  .style("left", d3.event.pageX - 50 + "px")
					  .style("top", d3.event.pageY - 70 + "px")
					  .style("display", "inline-block")
					  .html("Mass Range:" + " " + (d.name-bmr.stepsize + " " + "Da" + " " + "-" + " " +(d.name)) + " " + "Da" + "<br>" + (d.size) + " " +"Glycans");
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});

		// add the x Axis	
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x).tickFormat(function(t, i) {return (i+1)%(skipTickLabels+1)==0 || i==barData.length-1? t: ""}))
			.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-8px")
				.attr("dy", "-1px")
				.attr("transform", "rotate(-65)" );
		
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
