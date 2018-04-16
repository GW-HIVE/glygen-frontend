    function myFunction(){
        $('#loading_image').fadeIn();
        var data = {
         //   formvalues: document.getElementById("myForm")
           Mass: document.getElementById("Mass"),
            Glycan_type:  document.getElementById("Glycan_type"),
            Glycan_subtype: document.getElementById("Glycan_subtype"),        
            Organism:  document.getElementById("Organism"),
            ProteinID:  document.getElementById("ProteinID"),
            Enzyme:  document.getElementById("Enzyme"),
            GlycanMotif:  document.getElementById("GlycanMotif"),
            GlycanID:  document.getElementById("GlycanID")
        };
   // var formData = JSON.stringify($("#myForm").serializeArray());
    $.post("http://glycomics.ccrc.uga.edu/ggtest/service/searchpage.php", {formvalues: data},function(response){
        $('#loading_image').fadeOut();
    });
    }