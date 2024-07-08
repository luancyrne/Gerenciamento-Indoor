<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once '../conexao.php';


if(checkAuth()){
    if(isset($_POST['name'])){
        $name = strtolower($_POST['name']);
        $db_selection = mysqli_query($conn, "SELECT * FROM stores WHERE `name` = '$name' LIMIT 1");
        $filter = mysqli_fetch_assoc($db_selection);
        if(!empty($_POST['name'])){
            if($filter){
                $alert = array('message'=>'Loja já cadastrada', 'type'=>'warning');
                echo json_encode($alert);
            }else{
                mysqli_query($conn, "INSERT INTO stores (id, name) VALUES (id, '$name')");
                $alert = array('message'=>'Loja cadastrada com sucesso', 'type'=>'success');
                echo json_encode($alert);
            }
        }else{
            $alert = array('message'=>'Preencha todos os campos', 'type'=>'info');
            echo json_encode($alert);
        }
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>