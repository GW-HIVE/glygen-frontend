<?php
header("Content-Type:application/json");
$response = "An error has occured";

function assignID(){
    $time_stamp=(string)time();
    $id=array("user_id" => $time_stamp);
    return $id;
}

if(isset($_GET["action"])){
    if($_GET["action"]=="get_id"){
        $response=assignID();
    }
}
elseif(isset($_POST["action"])){
    //$response=array("user_id" => "123abc");
}

exit(json_encode($response));

?>