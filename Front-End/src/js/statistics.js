// @author Tatiana Williamson
// @createDate March 11, 2019

/**
const width = 200,
	height = 200,
	maxRadius = (Math.min(width, height) / 2) - 20,
	margin = {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10
	};

const formatNumber = d3.format(',d');

const x = d3.scaleLinear()
	.range([0, 2 * Math.PI])
	.clamp(true);

const y = d3.scaleSqrt()
	.range([maxRadius * .1, maxRadius]);

const color = d3.scaleOrdinal(d3.schemeCategory20);

const partition = d3.partition();

const arc = d3.arc()
	.startAngle(d => x(d.x0))
	.endAngle(d => x(d.x1))
	.innerRadius(d => Math.max(0, y(d.y0)))
	.outerRadius(d => Math.max(0, y(d.y1)));

const middleArcLine = d => {
	const halfPi = Math.PI / 2;
	const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
	const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

	const middleAngle = (angles[1] + angles[0]) / 2;
	const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
	if (invertDirection) {
		angles.reverse();
	}

	const path = d3.path();
	path.arc(0, 0, r, angles[0], angles[1], invertDirection);
	return path.toString();
};

const textFits = d => {
	const CHAR_SPACE = 1;

	const deltaAngle = x(d.x1) - x(d.x0);
	const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
	const perimeter = r * deltaAngle;

	return d.data.name.length * CHAR_SPACE < perimeter;
};

const svg = d3.select('.zoomableSunburst')
	//	.style('width', '400')
	//	.style('height', '400')
	.style('opacity', .8)
	.attr('preserveAspectRatio', 'xMinYMin meet')
	.attr('viewBox',
		'0 0 ' +
		(width + margin.left + margin.right) +
		' ' +
		(height + margin.top + margin.bottom)
	)
	.attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
	.on('click', () => focusOn()); // Reset zoom on canvas click

//var jsonData = d3.json("data/statistics_full.json");
*/

d3.json("data/statistics.json", (error, jsonData) => {
	if (error) throw error;
	//	console.log(root);

	var root = d3.hierarchy(jsonData.sunburst);
	root.sum(d => d.size);
/**
	const slice = svg.selectAll('g.slice')
		.data(partition(root).descendants());

	slice.exit().remove();

	const newSlice = slice.enter()
		.append('g').attr('class', 'slice')
		.on('click', d => {
			d3.event.stopPropagation();
			focusOn(d);
		});

	newSlice.append('title')
		.text(d => d.data.name + '\n' + formatNumber(d.value));

	newSlice.append('path')
		.attr('class', 'main-arc')
		.style('fill', d => color((d.children ? d : d.parent).data.name))
		.attr('d', arc);
    
	newSlice.append('path')
		.attr('class', 'hidden-arc')
		.attr('id', (_, i) => `hiddenArc${i}`)
		.attr('d', middleArcLine);

	const text = newSlice.append('text')
		.attr('display', d => textFits(d) ? null : 'none');

	// Add white contour
	text.append('textPath')
		.attr('startOffset', '50%')
		.attr('xlink:href', (_, i) => `#hiddenArc${i}`)
		.text(d => d.data.name)
		.style('fill', 'none')
		.style('stroke', '#fff')
		.style('stroke-width', 2)
		.style('stroke-linejoin', 'round');

	text.append('textPath')
		.attr('startOffset', '50%')
		.attr('xlink:href', (_, i) => `#hiddenArc${i}`)
		.text(d => d.data.name);
	//});

	function focusOn(d = {
		x0: 0,
		x1: 1,
		y0: 0,
		y1: 1
	})

	{
		// Reset to top-level if no data point specified
		const transition = svg.transition()
			.duration(550)
			.tween('scale', () => {
				const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
					yd = d3.interpolate(y.domain(), [d.y0, 1]);
				return t => {
					x.domain(xd(t));
					y.domain(yd(t));
				};
			});

		transition.selectAll('path.main-arc')
			.attrTween('d', d => () => arc(d));

		transition.selectAll('path.hidden-arc')
			.attrTween('d', d => () => middleArcLine(d));

		transition.selectAll('text')
			.attrTween('display', d => () => textFits(d) ? null : 'none');

		moveStackToFront(d);

		//

		function moveStackToFront(elD) {
			svg.selectAll('.slice').filter(d => d === elD)
				.each(function (d) {
					this.parentNode.appendChild(this);
					if (d.parent) {
						moveStackToFront(d.parent);
					}
				})
		}
	}
*/
	//--------------------
	//    Sunburst Bio Molecules. 
	//----------------------
	var bio_molecules = sunburstBioMolecules;
	d3.select('#sunburst_glycan_type_subtype')
		.call(bio_molecules, jsonData, "#sunburstBioMolecules"); // draw chart in div
		
	//-----------------------------
	//    Human & Mouse Glycans Venn Diagram
	//-----------------------------
	var glycanSpecies = vennGlycanSpecies;
	d3.select('#venn_glycan_species')
		.call(glycanSpecies, jsonData, "#venn_glycan_species"); // draw chart in div

	//--------------------
	//    Sunburst glycan chart. Glycan types and subtypes.
	//----------------------
	var glycan_type_subtype = sunburstGlycanTypeSubtype;
	d3.select('#sunburst_glycan_type_subtype')
		.call(glycan_type_subtype, jsonData, "#sunburst_glycan_type_subtype"); // draw chart in div
	
	//-------------------------------
	//    Donut Glycan Chart. Human and mouse glycans.
	//-------------------------------
	var sunburstGlycan = sunburstGlycanOrganismType;
	d3.select('#sunburst_glycan_organism_type')
		.call(sunburstGlycan, jsonData, "#sunburst_glycan_organism_type"); // draw chart in div

	//-------------------------------
	//    Pie Motif Chart. Motifs and their frequencies
	//-------------------------------	
	var donutMotif = donutChartMotif;
	d3.select('#donut_chart_motif')
		.call(donutMotif, jsonData, "#donut_chart_motif"); // draw chart in div

	//-----------------------------------
	//	Bar Chart Mass range
	//--------------------------------
	var barMass = barChartMass;
	d3.select('#bar_chart_mass')
		.call(barMass, jsonData, "#bar_chart_mass"); // draw chart in div

	//-----------------------------------
	//	Bar Chart Sugar range
	//--------------------------------
	var barSugar = barChartSugar;
	d3.select('#bar_chart_sugar')
		.call(barSugar, jsonData, "#bar_chart_sugar"); // draw chart in div

	//--------------------
	//    Proteins Venn Diagram. Human proteins.
	//----------------------
	var protein_species = vennProteinSpecies;
	d3.select('#venn_protein_species')
		.call(protein_species, jsonData, "#venn_protein_species"); // draw chart in div
	
	//-------------------------------
	//  Pie Chart Number of Canonical and Isoforms Proteins. 
	//  Proteins (Human, Mouse and Rat)
	//-------------------------------	
	var sunburstCanonIsofProtein = sunburstProteinCanonicalIsoforms;
	d3.select('#sunburst_canon_isof_prot')
		.call(sunburstCanonIsofProtein, jsonData, "#sunburst_canon_isof_prot"); // draw chart in div

	//-------------------------------
	//  Pie Chart Number of Canonical and Isoforms Proteins. 
	//  Proteins (Human, Mouse and Rat)
	//-------------------------------	
	var pieGlycohydrolasesProtein = pieProteinGlycohydrolases;
	d3.select('#pie_glycosylhydrolases_proteins')
		.call(pieGlycohydrolasesProtein, jsonData, "#pie_glycosylhydrolases_proteins"); // draw chart in div

	//-------------------------------
	//  Pie Chart Number of Glycosyltransferases Proteins. 
	//  Proteins (Human, Mouse and Rat)
	//-------------------------------	
	var pieGlycosyltransferasesProtein = pieProteinGlycosyltransferases;
	d3.select('#pie_glycosyltransferases_proteins')
		.call(pieGlycosyltransferasesProtein, jsonData, "#pie_glycosyltransferases_proteins"); // draw chart in div

	//-------------------------------
	//  Pie Chart Number of Glycosylated Proteins. 
	//  Proteins (Human, Mouse and Rat)
	//-------------------------------	
	var sunbGlycoprotRepPredGlyc = sunburstGlycoprotRepPredGlyc;
	d3.select('#sunb_glycoprot_rep_pred_glyc')
		.call(sunbGlycoprotRepPredGlyc, jsonData, "#sunb_glycoprot_rep_pred_glyc"); // draw chart in div

});
