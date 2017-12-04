<?php

// This is the API to possibility show the Glycan list, and show a specific details by action.

function get_user_by_id($id)
{
  $user_info = array();

  // make a call in db later.
  switch ($id){
    case 1:
      $user_info = array("query_type" => "find_glycogene", "mass" => "1056.4", "glycan_type" => "N-linked","organism"=>"mus musculus","GlyGenID"=>"G89290XU","Motif_list"=>"motif"); //Query component
      break;
    case 2:
      $user_info = array("query_type" => "find_glycan", "mass" => "1896.4", "glycan_type" => "N-linked","organism"=>"mus musculus","GlyGenID"=>"G82348BZ","Motif_list"=>"motif");
      break;
    case 3:
      $user_info = array("query_type" => "find_glycogen", "mass" => "2056.4", "glycan_type" => "N-linked","organism"=>"mus musculus","GlyGenID"=>"G823499Z","Motif_list"=>"motif");
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
