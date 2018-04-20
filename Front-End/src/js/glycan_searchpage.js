//  @author: Pradeep Kumar Ragu Chanthar
//  @description: UO1 Version-1.1
//  @Date: 19th Feb 2018
 
//Functions to auto complete and retrieve the values from JSON
  
        var test = 'http://localhost:8888/Glycan/Drwillyork/templates/g_searchpage_proteinid.php?action=get_user&id=1';
        $.getJSON('http://localhost:8888/Glycan/Drwillyork/templates/g_searchpage_proteinid.php?action=get_user&id=1', function (data) {
            //data is the JSON string
            //  document.getElementById("demo").innerHTML = data;
            $(function () {
                $(".proteinid").autocomplete({
                    source: function (request, response) {
                        var results = $.ui.autocomplete.filter(data, request.term);
                        response(results.slice(0, 5));
                    }
                });
            });
        });
  
        var test = 'http://localhost:8888/Glycan/Drwillyork/templates/g_searchpage_motif.php?action=get_user&id=1';
        $.getJSON('http://localhost:8888/Glycan/Drwillyork/templates/g_searchpage_motif.php?action=get_user&id=1', function (data) {
            //data is the JSON string
            //  document.getElementById("demo").innerHTML = data;
            $(function () {
                $(".motif").autocomplete({
                    source: function (request, response) {
                        var results = $.ui.autocomplete.filter(data, request.term);
                        response(results.slice(0, 5));
                    }
                });
            });
        });
   
        var test = 'http://localhost:8888/Glycan/Drwillyork/templates/g_searchpage_enzyme.php?action=get_user&id=1';
        $.getJSON('	http://localhost:8888/Glycan/Drwillyork/templates/g_searchpage_enzyme.php?action=get_user&id=1', function (data) {
            //data is the JSON string
            //  document.getElementById("demo").innerHTML = data;
            $(function () {
                $(".enzyme").autocomplete({
                    source: function (request, response) {
                        var results = $.ui.autocomplete.filter(data, request.term);
                        response(results.slice(0, 5));
                    }
                });
            });
        });
 
// functions for range slider

        // var mini={};
        // var maxi={};
        // $.getJSON("http://localhost:8888/Glycan/Drwillyork/templates/formsearch.php?action=get_user&id=1", function (result) {
        //         mini = result.glycan_mass.min;
        //         maxi = result.glycan_mass.max;
        //     });
        var nonLinearSlider1 = document.getElementById('slider1');
        noUiSlider.create(nonLinearSlider1, {
            connect: true,
            behaviour: 'tap',
            start: [0, 10000],
            range: {
                'min': [0],
                'max': [10000]
            }
        });
        var nodes1 = [
            document.getElementById('lower-value1'), // 0
            document.getElementById('upper-value1')  // 1
        ];
        // Display the slider value and how far the handle moved
        // from the left edge of the slider.
        nonLinearSlider1.noUiSlider.on('update', function (values, handle) {
            nodes1[handle].innerHTML = values[handle];
            //  alert(values[handle]);
            //  var values = $(nodes1[handle].innerHTML).val();
            //document.write(values[0]);        
        });
  
//second range function
  
        var nonLinearSlider = document.getElementById('slider');
        noUiSlider.create(nonLinearSlider, {
            connect: true,
            behaviour: 'tap',
            start: [0, 10000],
            range: {
                'min': [0],
                'max': [10000]
            }
        });
        var nodes = [
            document.getElementById('lower-value'), // 0
            document.getElementById('upper-value')  // 1
        ];
        // Display the slider value and how far the handle moved
        // from the left edge of the slider.
        nonLinearSlider.noUiSlider.on('update', function (values, handle) {
            nodes[handle].innerHTML = values[handle];
        });

    

// functions for dropdowns organism 
    
        $(document).ready(function () {
            $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {
                $(".organism").append("<option>" + result.organism[0] + "</option>");
                $(".organism").append("<option>" + result.organism[1] + "</option>");

            });
        });
    
//functions for dropdowns glycan type
  
        $(document).ready(function () {
            $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {

                $(".ddl").append("<option>" + result.glycan_type[0].name + "</option>");
                // $(".ddl").append("<option>" + result.glycan_type[1].name + "</option>");

            });
        });

//glycan sub type dropdown function based on type field

        function configureDropDownLists(ddl1, ddl2) {
            var nglycan;
            var oglycan;
            // var nglycan={};
            $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {
                nglycan = result.glycan_type[0].subtype;
                // oglycan = result.glycan_type[1].subtype;
                dataReady();
            });
            function dataReady() {
                //document.write(nglycan);
                switch (ddl1.value) {
                    case 'N-glycan':
                        ddl2.options.length = 0;
                        for (i = 0; i < nglycan.length; i++) {
                            createOption(ddl2, nglycan[i], nglycan[i]);
                        }
                        // alert(nglycan)
                        break;
                    case 'O-glycan':
                        ddl2.options.length = 0;
                        for (i = 0; i < oglycan.length; i++) {
                            createOption(ddl2, oglycan[i], oglycan[i]);
                        }
                        break;
                    default:
                        ddl2.options.length = 0;
                        break;
                }
            }
        }
        function createOption(ddl, text, value) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.text = text;
            ddl.options.add(opt);
        }

// converting form submit to JSON
      //  var json = {};
      //  var jsonform = {};
       // var formObject = {};
        // var formjson = $("#myForm").serialize();
        $(document).on('click', "#submit", function () {
            var json = $("#myForm").serialize();
            var Glycansearch = $("#myForm").serializeArray();
            var jsonform = JSON.stringify(Glycansearch);
            var data = JSON.parse(jsonform);
            var organism = document.getElementById("organism").value;
            var glycantype = document.getElementById("ddl").value;
            var glycansubtype = document.getElementById("ddl2").value;
            // var sugarmin = document.getElementById("lower-value").value;
            // var sugarmax = document.getElementById("higher-value").value;
            var proteinid = document.getElementById("proteinid").value;
            var enzyme = document.getElementById("enzyme").value;
            var motif = document.getElementById("motif").value;
            var formObject = {
                query_type: "search_glycan",
                glycan_id: data[0].value,
                organism: organism,
                glycantype: glycantype,
                glycansubtype: glycansubtype,
                enzyme: enzyme,
                proteinid: proteinid,
                motif: motif
            };
           var json = JSON.stringify(formObject);
           event.preventDefault();
          redirect(json)
         // var listpage = reload(json)
       // alert(json)
        });  
        
//           $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search?query="+json, function (result) {
//           alert(result.search_results_id) 
//           window.location = 'http://glygen-vm-tst.biochemistry.gwu.edu/listpage.html?id' + result.search_results_id;

// });
        function redirect(obj) {
        $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search?query="+obj, function (result) {
       // alert(result.search_results_id) 
        window.location = 'http://glygen-vm-tst.biochemistry.gwu.edu/listpage.html?id=' + result.search_results_id;
            
});
      }
