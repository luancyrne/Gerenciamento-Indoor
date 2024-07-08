<?php
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once '../conexao.php';
include_once('../method.php');

if(checkAuth()){
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        mysqli_query($conn, "DELETE FROM users WHERE id = '$id'");
        $alert = array('message'=>"Usuário '$id' deletado", 'type'=>'success');
        echo json_encode($alert);
    }else{
        $alert = array('message'=>'Usuário não selecionado', 'type'=>'info');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>