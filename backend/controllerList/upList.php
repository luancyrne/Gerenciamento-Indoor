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
            if(isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['store'])){
                $name = $_POST['name'];
                $store = $_POST['store'];
                $dbselection = mysqli_query($conn, "SELECT * FROM list WHERE `name` = '$name' AND `store` = '$store' LIMIT 1");
                $result = mysqli_fetch_assoc($dbselection);
                if($result){
                    $dbselection = mysqli_query($conn, "SELECT * FROM list WHERE `name` = '$name AND id = '$id'");
                    $result = mysqli_fetch_assoc($dbselection);
                    if($result){
                        $dbselection = mysqli_query($conn, "UPDATE list SET `name` = '$name', `store` = '$store' WHERE id = '$id'");
                        $alert = array('message'=>'Informações de lista atualizadas', 'type'=>'success');
                        echo json_encode($alert);
                    }else{
                        $alert = array('message'=>'Já existe uma lista com este nome cadastrado em uma loja', 'type'=>'warning');
                        echo json_encode($alert);
                    }
                }else{
                    $dbselection = mysqli_query($conn, "UPDATE list SET `name` = '$name', `store` = '$store' WHERE id = '$id'");
                    $alert = array('message'=>'Informações de lista atualizadas', 'type'=>'success');
                    echo json_encode($alert);
                }
            }
        }else{
            $alert = array('message'=>'Parametros não definidos', 'type'=>'info');
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