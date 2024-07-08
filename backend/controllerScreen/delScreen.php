<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
require_once('../verifyToken.php');
include_once('../conexao.php');
include_once('../method.php');

if(checkAuth()){
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $db_selection = mysqli_query($conn, "DELETE FROM screens WHERE `id` = '$id'");
        $alert = array('message'=>"Tela '$id' deleta", 'type'=>'success');
        echo json_encode($alert);
    }else{
        $alert = array('message'=>'Parametros não definidos', 'type'=>'warning');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>