<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('./verifyToken.php');
include_once('./conexao.php');

if(checkAuth()){
    if(isset($_POST['query']) && !empty($_POST['query'])){
        $query = $_POST['query'];
        $db_selection = mysqli_query($conn, $query);
        $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
        echo json_encode($result);
    }else{
        $alert = array('message'=>'Parametro não definido', 'type'=>'info');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}
?>