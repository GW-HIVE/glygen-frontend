//Tatiana Williamson
// date: April 2019

function donutChart(data) {
//	d3.json("data/donut.json", function (error, data) {
//		if (error) throw error;

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
//				.style("cursor", "pointer")
//				.style("fill", "black")
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
//				.style("fill", "#888");
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
//				.style("cursor", "pointer")
//				.style("fill", "black")
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
