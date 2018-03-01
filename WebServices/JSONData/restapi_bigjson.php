<?php
header('Content-Type: application/json');
// This is the API to possibility show the Glycan list, and show a specific details by action.
header("Access-Control-Allow-Origin: *");
function get_user_by_id($id)
{
  $user_info = array();
  switch ($id){
    case 1:
   // $user_info = file_get_contents('/var/www/html/service/Glygenimages/GOG5.jpg');
   $attachment_location = "/var/www/html/service/Glygenjson/big-glycan-list.json";
   if (file_exists($attachment_location)) {

       header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
       header("Cache-Control: public"); // needed for internet explorer
      // header("Content-Type: application/zip");
       header("Content-Transfer-Encoding: Binary");
       header("Content-Length:".filesize($attachment_location));
      // header("Content-Disposition: attachment; filename=file.zip");
       readfile($attachment_location);
       die();        
   } else {
       die("Error: File not found.");
   } 
      break;
    case 2:
    $attachment_location = "/var/www/html/service/Glygenjson/big-glycan-list_2.json";
    if (file_exists($attachment_location)) {

        header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
        header("Cache-Control: public"); // needed for internet explorer
       // header("Content-Type: application/zip");
        header("Content-Transfer-Encoding: Binary");
        header("Content-Length:".filesize($attachment_location));
       // header("Content-Disposition: attachment; filename=file.zip");
        readfile($attachment_location);
        die();        
    } else {
        die("Error: File not found.");
    } 
  break;
      case 3:
    $attachment_location = "/var/www/html/service/Glygenjson/big-glycan-list_1.json";
    if (file_exists($attachment_location)) {

        header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
        header("Cache-Control: public"); // needed for internet explorer
       // header("Content-Type: application/zip");
        header("Content-Transfer-Encoding: Binary");
        header("Content-Length:".filesize($attachment_location));
       // header("Content-Disposition: attachment; filename=file.zip");
        readfile($attachment_location);
        die();        
    } else {
        die("Error: File not found.");
    } 
    break;
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
exit(json_encode($value));
?>