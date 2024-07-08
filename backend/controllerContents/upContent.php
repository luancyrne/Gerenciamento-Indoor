<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');
include_once('../method.php');

if(checkAuth()){
    if(isset($_PUT['id']) && isset($_PUT['name'])){
        if(!empty($_PUT['name'])){
            $id = $_PUT['id'];
            $name = $_PUT['name'];
            $db_selection = mysqli_query($conn, "SELECT * FROM contents WHERE `name` = '$name' LIMIT 1");
            $result = mysqli_fetch_assoc($db_selection);
            if($result){
                $alert = array('message'=>'Já existe um conteúdo com este nome', 'type'=>'info');
                echo json_encode($alert);
            }else{
                $db_selection = mysqli_query($conn, "UPDATE contents SET `name` = '$name' WHERE id = '$id'");
                $alert = array('message'=>'Nome de conteúdo atualizado', 'type'=>'success');
                echo json_encode($alert);
            }
        }else{
            $alert = array('message'=>'Nome não pode estar vazio', 'type'=>'info');
            echo json_encode($alert);
        }
    }else{
        $alert = array('message'=>'Parametros não definidos', 'type'=>'info');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>