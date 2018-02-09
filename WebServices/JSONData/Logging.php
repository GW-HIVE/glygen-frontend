<?php
// header("Access-Control-Allow-Origin:*");
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
        exit(json_encode($response));
    }
}
elseif(isset($_POST["log"])){        //&& $_POST["action"]=="logging"
    $log_data = $_POST[log];
    if ($log_data != null)
    {
        $filename = "myfile.json";              
        $file = @fopen($filename, 'r+');        // read the file if present
        if ($file == null){                     // create the file if needed
            $file = fopen($filename, 'w+');
        }
        if ($file)
        {
            fseek($file, 0, SEEK_END);        // seek to the end
            if (ftell($file) > 0)             // if the file already has some data
            {
                fseek($file, -1, SEEK_END);   // move back a byte to overwrite the "]" following the last entry
                fwrite($file, ',', 1);        // add the trailing comma
                fwrite($file, json_encode($log_data) . ']');
            }
            else{                    // file is empty
                fwrite($file, json_encode(array($log_data)));
            }
            fclose($file);
        }
    }
}
?>