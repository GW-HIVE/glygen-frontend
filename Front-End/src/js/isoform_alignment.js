/**
 * Adding function to String prototype to shortcut string to a desire length.
 * @param {int} n - The length of the string
 * @returns {int} -Short String
 */
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
    };


function ajaxAlignSuccess(aln) {
    if (aln.code) {
        console.log(aln.code);
        displayErrorByCode(aln.code);
        activityTracker("error", id, "error code: " + data.code + " (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
    } else{
    function renderSequenceLeadingContent(aln) {
        // container for the leading content
        var line = $('<span class="aln-line-header" />');
        // make a link
        var link = $('<a class="aln-line-link" />');
        // // make a container for the name
        // var name = $('<span class="aln-line-title" />');

        // add content to the link, and a reference
        link.text(aln.id);
        link.attr('href', "#");

        // // adding content to the name
        // name.text(aln.name);

        // add both to the container
        link.appendTo(line);
        // name.appendTo(line);

        return line;
    }

    function renderSequenceValue(aln) {
        var line = $('<span class="aln-line-value" />');
        line.text(aln.string);
        return line;
    }


    function renderSequenceLine(aln) {
        var line = $('<div class="aln-line" />');

        // generate leading content
        renderSequenceLeadingContent(aln).appendTo(line);

        // add aln value
        renderSequenceValue(aln).appendTo(line);

        return line;
    }

    function renderAlignmentLine(sequenceAlignment) {
        var line = $('<div class="aln-line" />');
        // make a container for the name
        var name = $('<div class="aln-line-consensus" />');
        name.text(sequenceAlignment.string);
        name.appendTo(line);
        return line;
    }

    function renderSequence(sequenceObject) {
        // Makes a block to hold all the sequences and consensus
        var block = $('<div class="aln-block" />');

        // for each aln, make a display line
        $(sequenceObject.sequences).each(function (i, obj) {
            // generate the display, add to the block
            renderSequenceLine(obj).appendTo(block);
        });

        // create the consensus display, and add to the block;
        renderAlignmentLine(sequenceObject.consensus).appendTo(block);

        return block;
    }

    function renderSequences (sequenceArray) {
        // for each aln, make a display block
        $(sequenceArray).each(function (i, obj) {
            // generate the display, add block to ui
            renderSequence(obj).appendTo('#sequncealign');
        });
    }
    

    // finds the max length of all sequences or consensus
    function findMaxSequenceLength(sequenceObject) {
        // get length of consensus
        var alignmentLength = sequenceObject.consensus.length;
        // get length of all sequences
        var sequenceLengths = sequenceObject.sequences.map(function (aln) {
            return aln.aln.length;
        });
        // sort aln length, from smallest to largest
        sequenceLengths.sort();
        // get the largest aln length
        var maxSequenceLength = sequenceLengths[sequenceLengths.length-1];
        var uniprot_canonical_ac = getParameterByName("uniprot_canonical_ac");
        //log if consensus not equal to the longest sequence
        activityTracker("error", uniprot_canonical_ac, "Longest seq length=" + maxSequenceLength + ", Consensus length=" + alignmentLength);
        // return whichever is larger
        return Math.max(alignmentLength, maxSequenceLength);
    }

    // this function breaks aln data into blocks with data per line
    function formatSequenceBlocks(sequenceObject, perLine) {
        var sequenceBlocks = [];
        var maxSequenceLength = findMaxSequenceLength(sequenceObject);
        
        // divides length by per line, and rounds up
        // var maxBlocks = Math.ceil(maxSequenceLength / perLine);

        // for (var x = 0; x < maxBlocks; x++) {
        //     sequenceBlocks.push({
        //         start: (x * perLine)
        //     });
        // }

        for (var x = 0; x < maxSequenceLength; x += perLine) {
            var sequenceBlock = {
                // holds each aln peice for the block
                sequences: sequenceObject.sequences.map(function (aln) {
                    return {
                        start: x,
                        id: aln.id,
                        name: aln.name,
                        string: aln.aln.substr(x, perLine)
                    };
                }),
                // consensus data for block
                consensus: {
                    start: x,
                    string: sequenceObject.consensus.substr(x, perLine)
                }
            };

            sequenceBlocks.push(sequenceBlock);
        }

        return sequenceBlocks;
    }

    var perLine = 60;
    var sequenceBlockData = formatSequenceBlocks(aln, perLine);
    renderSequences(sequenceBlockData);
    }
      updateBreadcrumbLinks();
}

function updateBreadcrumbLinks() {
	const proteinacc = getParameterByName("uniprot_canonical_ac") || "";
    const listID = getParameterByName("listID") || "";
    //const listID = "2f5f963be06fd39152da2a54508a9935";
	const globalSearchTerm = getParameterByName("gs") || "";
	var glycanPageType = window.location.pathname.includes("glycoprotein") ?
		"glycoprotein" :
		"protein";

	if (globalSearchTerm) {
		$("#breadcrumb-search").text("General Search");
		$("#breadcrumb-search").attr(
			"href",
			"global_search_result.html?search_query=" + globalSearchTerm
		);
		if (listID)
			$("#breadcrumb-list").attr(
				"href",
				glycanPageType + "_list.html?id=" + listID + "&gs=" + globalSearchTerm
			);
		else $("#li-breadcrumb-list").css("display", "none");
	} else {
		$("#breadcrumb-search").attr(
			"href",
			glycanPageType + "_search.html?id=" + listID
		);
		if (listID && (listID !== 'null'))
			$("#breadcrumb-list").attr(
				"href",
				glycanPageType + "_list.html?id=" + listID
			);
		else $("#li-breadcrumb-list").css("display", "none");
	}
	if (proteinacc) {
		$("#breadcrumb-detail").attr(
			"href",
			glycanPageType +
			"_detail.html?uniprot_canonical_ac=" +
			proteinacc +
			"&listID=" +
			listID +
			"#isoforms"
		);
	} else {
		$("#li-breadcrumb-detail").css("display", "none");
	}
	if (proteinacc) {
		$("#breadcrumb-detailback").attr(
			"href",
			glycanPageType +
			"_detail.html?uniprot_canonical_ac=" +
			proteinacc +
			"&listID=" +
			listID +
			"#isoforms"
		);
	}
	//else {
	//   $("#li-breadcrumb-detailbback").css("display", "none");
	// }
}
/**
 * LoadDataList function to configure and start the request to GWU  service
 * @param {string} id - The protein id to load
 * */
function LoadDataisoAlignment() {
    var uniprot_canonical_ac = getParameterByName('uniprot_canonical_ac');
    var listID = getParameterByName('listID');
    var cluster_type = "isoformset.uniprotkb";
    var aln = {
        dataType: "json",
        url: getWsUrl("protein_alignment"),
        data: getAlignmentPostData(uniprot_canonical_ac, cluster_type),
        method: 'GET',  
        success: ajaxAlignSuccess, 
    };
    // make the server call
    $.ajax(aln);
}
$(document).ready(function () {
    LoadDataisoAlignment();
    updateBreadcrumbLinks();
   
});  
/**
 * getParameterByName function to Extract query parameters from url
 * @param {string} name - The name of the variable to extract from query string
 * @param {string} url- The complete url with query string values
 * @return- A new string representing the decoded version of the given encoded Uniform Resource Identifier (URI) component.
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}