
    function LoadDetails(id) {
      var template = $('#item_template').html();
      var serviceUrl = "http://glycomics.ccrc.uga.edu/ggtest/service/detailpage.php?action=get_user&id=" + id;

      // calls the service
      $.getJSON(serviceUrl, function (data) {
        // data from the service
        console.log(data);

        data.hasMotifs = (data.motifs.length > 0);

        // data after changes
        console.log(data);

        // I'm just replacing all the content in #content. The template below is just to get one var from the data set
        var html = Mustache.to_html(template, data);

        $('#content').html(html);
      });
    }

    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $(document).ready(function(){
      var id = getParameterByName('id');
      LoadDetails(id);
    });

    
 