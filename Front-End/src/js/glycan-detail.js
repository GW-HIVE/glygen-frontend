
//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
//@Date:19th Feb 2018. with dummy web service
//@update: 3-April 2018. with real web service
//@update: June 26-2018- with web service changes





/**
 * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success

 
 */
function ajaxSuccess(data) {
  var template = $('#item_template').html();
  data.hasMotifs = (data.motifs && (data.motifs.length > 0));
  data.hasGlycosylate = (data.glycosylate && (data.glycosylate.length > 0));

  data.imagePath = getWsUrl('glycan_image', data.glycan_ac);

  //var glyco = row.glycoct.replace(/ /g, '\n');
  var html = Mustache.to_html(template, data);
  var $container = $('#content');

  $container.html(html);

  $container.find('.open-close-button').each(function (i, element) {
    $(element).on('click', function () {
      var $this = $(this);
      var buttonText = $this.text();

      if (buttonText === '+') {
        $this.text('-');
        $this.parent().next().show();
      } else {
        $this.text('+');
        $this.parent().next().hide();
      
        $('#error-message').hide();
      }
    });
  });

}

/**
 * @param {data} the callback function to GWU service if fails
 */
//  * Returns the GWU services fails.

function ajaxFailure() {
  $('#error-message').show();
}


/**
 * @param {id} the LoadData function to configure and start the request to GWU  service
 */
//  * Returns the GWU services.
//

function LoadData(glycan_ac) {

  var ajaxConfig = {
    dataType: "json",
    url: getWsUrl("glycan_detail", glycan_ac),
    // data: getDetailPostData(id),
    method: 'POST',
    success: ajaxSuccess,
    error: ajaxFailure
  };

  
  // calls the service
  $.ajax(ajaxConfig);

}
//getParameterByName function to extract query parametes from url
/**
 * @param {name} string for the name of the variable variable to extract from query string
 * @param {url}string with the complete url with query string values
 */
//  * Returns the GWU services.
//


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {
  var glycan_ac = getParameterByName('glycan_ac');
  LoadData(glycan_ac);
});