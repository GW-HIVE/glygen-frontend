<?php

// This is the API to possibility show the Glycan list, and show a specific details by action.

function get_user_by_id($image)
{
  $user_info = array();
  switch ($image){
    case 1:
      $user_info = array("id" => 1, "img" => "GOG5.jpg"); //Query component
      break;
    case 2:
      $user_info = array("id" => 2, "img" => "GOG7.jpg");
      break;
    case 3:
      $user_info = array("id" => 3, "img" => "GOG9.jpg");
      break;
  }

  return $user_info;
}

function get_user_list()
{
  $user_list = array(array("id" => 1, "query_type" => "find_glycogene"), array("id" => 2, "query_type" => "find_glycan"), array("id" => 3, "query_type" => "find_glycogen"));

  return $user_list;
}

$possible_url = array("get_user_list", "get_user");

$value = "An error has occurred";

if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
{
  switch ($_GET["action"])
    {
      case "get_user_list":
        $value = get_user_list();
        break;
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
