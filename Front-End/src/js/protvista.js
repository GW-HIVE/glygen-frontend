/* @author:Rupali Mahadik.
 @description: UO1 Version-1.1. 
 @date:17 June 2019
 */

var uniprot_canonical_ac = "";

// to set data in datapoint variable
function setupProtvista(data) {
  var allTrackData = {};
  var colors = ["red", "blue", "green", "black"];
  var typeToColor = {};
  var colorPtr = -1;
  var shapes = ["catFace", "triangle", "circle"];
  var typeToShape = {};
  var shapePtr = -1;
  var displayStart = 1;
  var displayEnd = 730;
  var highlightStart = 10;

  $.each(data.glycosylation, function(i, glycosylationData) {
    if (!(glycosylationData.type in allTrackData)) {
      allTrackData[glycosylationData.type] = {};
      colorPtr += 1;
      typeToColor[glycosylationData.type] = colors[colorPtr];
      shapePtr += 1;
      typeToShape[glycosylationData.type] = shapes[shapePtr];
    }

    var key = glycosylationData.position;
    var tooltip = "";

    if (glycosylationData.glytoucan_ac) {
      tooltip =
        "<img src='" +
        "https://api.glygen.org/glycan/image/" +
        glycosylationData.glytoucan_ac +
        "' />";
    } else {
      tooltip =
        "<span>Glycosylation site without reported glycan at " +
        key +
        " </span>";
    }
    var dataPoint = {
      accession: data.uniprot.uniprot_canonical_ac,
      start: glycosylationData.position,
      end: glycosylationData.position,
      color: typeToColor[glycosylationData.type],
      shape: typeToShape[glycosylationData.type],
      tooltipContent: tooltip,
      type: "Position",
      tooltipCount: 1
    };

    if (key in allTrackData[glycosylationData.type]) {
      var existingPoint = allTrackData[glycosylationData.type][key];
      if (existingPoint.tooltipCount < 1) {
        existingPoint.tooltipContent += dataPoint.tooltipContent
          ? "<br><br>" + dataPoint.tooltipContent
          : "";
      } else if (existingPoint.tooltipCount == 1) {
        existingPoint.tooltipContent +=
          "<br><br><span class=marker>Click marker show more</span>";
      }
      if (dataPoint.tooltipContent) {
        existingPoint.tooltipCount += 1;
      }
    } else {
      allTrackData[glycosylationData.type][key] = dataPoint;
    }
  });
  $.each(allTrackData, function(key, value) {
    allTrackData[key] = Object.values(allTrackData[key]);
  });

  var allTrackDataM = {};
  var colorsM = ["green", "red", "green", "black"];
  var typeToColorM = {};
  var colorPtrM = 1;
  var shapesM = ["catFace", "diamond", "triangle"];
  var typeToShapeM = {};
  var shapePtrM = 1;
  var displayStartM = 1;
  var displayEndM = 150;
  var highlightStartM = 100;
  $.each(data.mutation, function(i, mutationData) {
    var fixedType = mutationData.type.replace(/ /g, "-");

    if (!(fixedType in allTrackDataM)) {
      allTrackDataM[fixedType] = [];
      colorPtrM += 1;
      typeToColorM[fixedType] = colorsM[colorPtrM];
      shapePtrM += 1;
      typeToShapeM[fixedType] = shapesM[shapePtrM];
    }

    var dataPoint = {
      accession: data.uniprot.uniprot_canonical_ac,
      start: mutationData.start_pos,
      end: mutationData.end_pos,
      color: typeToColorM[fixedType],
      shape: typeToShapeM[fixedType],
      type: "Mutation",
      tooltipContent: "<span>annotation " + mutationData.annotation + "</span>"
    };
    allTrackDataM[fixedType].push(dataPoint);
  });

  var navHTML =
    "<protvista-navigation length='" +
    data.uniprot.length +
    "' displaystart='" +
    displayStart +
    "' displayend='" +
    displayEnd +
    "' ></protvista-navigation>";
  $(navHTML).appendTo("#manager");

  var seqHTML =
    "<protvista-sequence id='seq1' class='nav-track 'length='" +
    data.uniprot.length +
    "' displaystart='" +
    displayStart +
    "' displayend='" +
    displayEnd +
    "' sequence='" +
    data.sequence.sequence +
    "'></protvista-sequence>";
  $(seqHTML).appendTo("#manager");

  var glycoHTML =
    "<protvista-track id='glycotrack'  class='nav-track ' length='" +
    data.uniprot.length +
    "' displaystart='" +
    displayStart +
    "' displayend='" +
    displayEnd +
    "' highlightStart='" +
    highlightStart +
    "'></protvista-track>";
  $(glycoHTML).appendTo("#manager");

  var mergedData = [];
  $.merge(mergedData, allTrackData["O-linked"] ? allTrackData["O-linked"] : []),
    $.merge(  mergedData,allTrackData["N-linked"] ? allTrackData["N-linked"] : [] ),
    (document.querySelector("#glycotrack").data = mergedData);
  var glycoHTML1 =
    "<protvista-track id='glycotrack1'   class='nav-track hidden ' length='" +
    data.uniprot.length +
    "' displaystart='" +
    displayStart +
    "' displayend='" +
    displayEnd +
    "' highlightStart='" +
    highlightStart +
    "'></protvista-track>";
  $(glycoHTML1).appendTo("#manager");

  var ntrachtml =
    "<protvista-track class='nav-track hidden' id='track_narray' length='" +
    data.uniprot.length +
    "' displaystart='" +
    displayStart +
    "' displayend='" +
    displayEnd +
    "' highlightStart='" +
    highlightStart +
    "' ></protvista-track>";
  $(ntrachtml).appendTo("#manager");

  document.querySelector("#track_narray").data = allTrackData["N-linked"]
    ? allTrackData["N-linked"]
    : [];
  var otrachtml =
    "<protvista-track class='nav-track hidden' id='track_oarray' length='" +
    data.uniprot.length +
    "' displaystart='" +
    displayStart +
    "' displayend='" +
    displayEnd +
    "' highlightStart='" +
    highlightStart +
    "' ></protvista-track>";
  $(otrachtml).appendTo("#manager");

  document.querySelector("#track_oarray").data = allTrackData["O-linked"]
    ? allTrackData["O-linked"]
    : [];
  $.each(allTrackDataM, function(trackTypeM, trackDataM) {
    var trackHTMLM =
      "<protvista-track  class='nav-track'id='track_" +
      trackTypeM +
      "' length='" +
      data.uniprot.length +
      "' displaystart='" +
      displayStartM +
      "' displayend='" +
      displayEndM +
      "' highlightStart='" +
      highlightStartM +
      "' ></protvista-track>";
    $(trackHTMLM).appendTo("#manager");
    document.querySelector("#track_" + trackTypeM).data = trackDataM;
  });

  var features = $("g .feature-group");
  features.css("cursor", "pointer");
  features.on("click", function() {
    var start = $("#glycotrack").attr("highlightstart");
    window.location.href = "./site_view.html?q=position " + start;
  });
}

/**
 * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success
 */
function ajaxSuccess(data) {
  setupProtvista(data);
  // to change the svg position
  document.querySelectorAll("g.sequence-features").forEach(x => {
    x.setAttribute("transform", "translate(0, -15)");
  });
}


// hide and show n-glycan and o-glycan separate track or combined track
function navglycoclick() {
  if ($("#nglyco").hasClass("hidden")) {
    $("#nglyco").removeClass("hidden");
    $("#oglyco").removeClass("hidden");
    $("#track_narray").removeClass("hidden");
    $("#track_oarray").removeClass("hidden");
    $("#glycotrack1").removeClass("hidden");
    $("#glycotrack").addClass("hidden");
  } else {
    $("#nglyco").addClass("hidden");
    $("#oglyco").addClass("hidden");
    $("#track_narray").addClass("hidden");
    $("#track_oarray").addClass("hidden");
    $("#glycotrack1").addClass("hidden");
    $("#glycotrack").removeClass("hidden");
  }
}

$(document).ready(function() {
  uniprot_canonical_ac = getParameterByName("uniprot_canonical_ac");
  $("#title_protein").html(uniprot_canonical_ac);

  LoadData(uniprot_canonical_ac);

  updateBreadcrumbLinks();
});

//set up breadcrumb for navigation

function updateBreadcrumbLinks() {
  const proteinacc = getParameterByName("uniprot_canonical_ac") || "";
  const listID = getParameterByName("listID") || "";
  const globalSearchTerm = getParameterByName("gs") || "";
  var glycanPageType = window.location.pathname.includes("glycoprotein")
    ? "glycoprotein"
    : "protein";

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
    if (listID)
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
        "#sequence"
    );
  } else {
    $("#li-breadcrumb-detail").css("display", "none");
  }
  if (proteinacc) {
    $("#breadcrumb-details").attr(
      "href",
      glycanPageType +
        "_detail.html?uniprot_canonical_ac=" +
        proteinacc +
        "&listID=" +
        listID +
        "#sequence"
    );
  } else {
    $("#li-breadcrumb-details").css("display", "none");
  }
}


function LoadData(uniprot_canonical_ac) {
  var ajaxConfig = {
    dataType: "json",
    url: getWsUrl("protein_detail", uniprot_canonical_ac),
    method: "GET",
    timeout: 1000,
    success: ajaxSuccess
  };

  // calls the service
  $.ajax(ajaxConfig);
}

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
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
