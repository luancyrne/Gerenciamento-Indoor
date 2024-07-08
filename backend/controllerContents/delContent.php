<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');
include_once('../method.php');

if(checkAuth()){
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $db_selection = mysqli_query($conn, "SELECT * FROM contents WHERE id = '$id'");
        $result = mysqli_fetch_assoc($db_selection);
        $file = $result['link'];
        unlink('../uploads/'.$file);
        $db_selection = mysqli_query($conn, "DELETE FROM contents WHERE id = '$id'");
        $alert = array('message'=>'Conteúdo deletado', 'type'=>'success');
        echo json_encode($alert);
    }else{
        $alert = array('message'=>'Nenhum conteúdo selecionado', 'type'=>'info');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>