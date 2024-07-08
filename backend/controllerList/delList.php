<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');
include_once('../method.php');

if(checkAuth()){
    if(isset($_POST['id'])){
        if(!empty($_POST['id'])){
            $id = $_POST['id'];
            $db_selection = mysqli_query($conn, "DELETE FROM contents WHERE `listid` = '$id'");
            $db_selection = mysqli_query($conn, "DELETE FROM list WHERE id = '$id'");
            $alert = array('message'=>"Lista '$id' deletada ", 'type'=>'success');
            echo json_encode($alert); 
        }else{
            $alert = array('message'=>'Parametros não definidos', 'type'=>'warning');
            echo json_encode($alert);    
        }
    }else{
        $alert = array('message'=>'Parametros não definidos', 'type'=>'warning');
        echo json_encode($alert);    
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);    
}

?>