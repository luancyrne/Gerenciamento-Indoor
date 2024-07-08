<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');
include_once('../method.php');

if(checkAuth()){
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        if(isset($_POST['name'])){
            if(!empty($_POST['name'])){
                $name = strtolower($_POST['name']);
                $db_selection = mysqli_query($conn, "SELECT * FROM stores WHERE `name` = '$name' AND `id` = '$id' LIMIT 1");
                $result = mysqli_fetch_assoc($db_selection);
                if($result){
                    $db_selection = mysqli_query($conn, "UPDATE stores SET `name` = '$name' WHERE id = '$id'");
                    $alert = array('message'=>'Informações de loja atualizada', 'type'=>'success');
                    echo json_encode($alert);
                }else{
                    $db_selection = mysqli_query($conn, "SELECT * FROM stores WHERE `name` = '$name' LIMIT 1");
                    $result = mysqli_fetch_assoc($db_selection);
                    if($result){
                        $alert = array('message'=>'Existe uma loja já cadastrada com este nome', 'type'=>'warning');
                        echo json_encode($alert);
                    }else{
                        $db_selection = mysqli_query($conn, "UPDATE stores SET `name` = '$name' WHERE id = '$id'");
                    $alert = array('message'=>'Informações de loja atualizada', 'type'=>'success');
                    echo json_encode($alert);
                    }
                }
                
                
            }else{
                $alert = array('message'=>'Nome não pode estar vazio', 'type'=>'info');
                echo json_encode($alert);    
            }
        }else{
            $alert = array('message'=>'Nenhum parametro atualizado', 'type'=>'info');
            echo json_encode($alert);
        }
    }else{
        $alert = array('message'=>'Loja não selecionada', 'type'=>'info');
        echo json_encode($alert);    
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>