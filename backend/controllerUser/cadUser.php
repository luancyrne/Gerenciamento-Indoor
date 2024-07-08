<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once '../conexao.php';

if(checkAuth()){
    if(isset($_POST['name']) && isset($_POST['password']) && isset($_POST['type'])){
        $name = $_POST['name'];
        $password = $_POST['password'];
        $store =strtolower($_POST['store']);
        $type = $_POST['type'];
    
        if(!empty($_POST['name']) && !empty($_POST['password']) && !empty($_POST['store']) && !empty($_POST['type'])){
            $verifyuser = mysqli_query($conn, "SELECT `name` FROM users WHERE `name` = '$name' LIMIT 1");
            $search = mysqli_fetch_assoc($verifyuser);
            if($search){
                $alert = array('message'=>'Usuário já existe', 'type'=>'warning');
                echo json_encode($alert);
            }else{
                mysqli_query($conn, 'INSERT INTO users (`id`, `name`, `password`, `store`, `type`) VALUES (id, "'.$name.'", "'.password_hash($password, PASSWORD_DEFAULT).'", "'.$store.'", "'.$type.'")');
                $alert = array('message'=>'Usuário adicionado ao sistema', 'type'=>'success');
                echo json_encode($alert);
            }
            }else{
                $alert = array('message'=>'Preencha todos os campos', 'type'=>'info');
                echo json_encode($alert);
            }
    }else{
        $alert = array('message'=>'Preencha todos os campos', 'type'=>'info');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}


?>