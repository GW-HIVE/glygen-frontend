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

   // $user_info = file_get_contents('/var/www/html/service/Glygenimages/GOG5.jpg');
   $attachment_location = "/var/www/html/service/Glygenjson/detailpageminimum.json";
   if ($id==G82348BZ) {
      // header("Content-Disposition: attachment; filename=file.zip");
       readfile($attachment_location);
} else {
    readfile("/var/www/html/service/Glygenjson/detailpage.json");
   } 
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
