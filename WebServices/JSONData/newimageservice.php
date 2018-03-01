<?php

// This is the API to possibility show the Glycan list, and show a specific details by action.
header("Access-Control-Allow-Origin: *");
header("Content-Type: image/png");

function get_user_by_id($image)
{
  $user_info = array();
  switch ($image){
    case G89290XU:
   // $user_info = file_get_contents('/var/www/html/service/Glygenimages/GOG5.jpg');
    $attachment_location = '/var/www/html/service/Glygenimages/GOG5.jpg';
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
   // var_dump($attachment_location);
printf('<img src="data:image/png;base64,%s" />', $attachment_location);
      break;
    case G82348BZ:
    $attachment_location = '/var/www/html/service/Glygenimages/GOG7.jpg';
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
printf('<img src="data:image/png;base64,%s" />', $attachment_location);
      break;
    default:
    $attachment_location = '/var/www/html/service/Glygenimages/imagenotfound.png';
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
printf('<img src="data:image/png;base64,%s" />', $attachment_location);
    break;
  }

  return $user_info;
}


header('Content-Type: image/png');
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


?>
