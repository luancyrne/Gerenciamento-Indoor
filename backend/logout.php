<?php

header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');

    if(checkAuth()){
        $alert = array('message'=>'Sessão finalizada', 'type'=>'success', 'token'=>'');
        echo json_encode($alert);
    }else{
        $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
        echo json_encode($alert);
    }
?>