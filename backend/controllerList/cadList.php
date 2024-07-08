<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');

if(checkAuth()){
    if(isset($_POST['name']) && isset($_POST['store'])){
        if(!empty($_POST['name']) && !empty($_POST['store'])){
            $name = $_POST['name'];
            $store = $_POST['store'];
            $db_selection = mysqli_query($conn, "SELECT * FROM list WHERE `name` = '$name' AND `store` = '$store'");
            $result = mysqli_fetch_assoc($db_selection);
            if($result){
                $alert = array('message'=>'Já existe uma lista com este nome para esta loja', 'type'=>'warning');
                echo json_encode($alert);        
            }else{
                $db_selection = mysqli_query($conn, "INSERT INTO list (id, `name`, `store`) VALUES (id, '$name', '$store')");
                $alert = array('message'=>'Lista criada com sucesso', 'type'=>'success');
                echo json_encode($alert);    
            }
        }else{
            $alert = array('message'=>'Preencha todos os campos vazios', 'type'=>'info');
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