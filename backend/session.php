<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
include_once 'verifyToken.php';

if(checkAuth()){
    echo json_encode(array('authenticated'=>true));
}else{
    echo json_encode(array('authenticated'=>false));
}

?>