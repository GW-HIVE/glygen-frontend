<?php
header('Content-Type: application/json');
// This is the API to possibility show the Glycan list, and show a specific details by action.
header("Access-Control-Allow-Origin: *");
header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
header("Cache-Control: public"); // needed for internet explorer
header("Content-Transfer-Encoding: Binary");
header("Content-Length:".filesize($attachment_location));
function get_user_by_id($id)
{
  $user_info = array();

   // $user_info = file_get_contents('/Applications/MAMP/htdocs/Glycan/Drwillyork/Glygenjson/Glygen_search_form.json');
   $attachment_location = "http://glycomics.ccrc.uga.edu/ggtest/service/Glygenjson/glygen_proteinid.json";
   
       readfile($attachment_location);
 
return $user_info;
}

$possible_url = array("get_user");
$value = "An error has occurred";
if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
{
  switch ($_GET["action"])
    {      
      case "get_user":
        if (isset($_GET["id"]))
          $value = get_user_by_id($_GET["id"]);
        else
          $value = "Missing argument";
        break;
    }
}
//exit(json_encode($value));

?>
