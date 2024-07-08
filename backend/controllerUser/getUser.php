<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
include_once '../conexao.php';
require_once('../verifyToken.php');



if(checkAuth()){
    if(isset($_GET['users'])){
        $search = mysqli_query($conn, "SELECT * FROM users");
        $return_users = mysqli_fetch_all($search, MYSQLI_ASSOC);
        echo json_encode($return_users);
    }else if(isset($_GET['user'])){
        if(isset($_GET['id'])){
            if(!empty($_GET['id'])){
                $id = $_GET['id'];
                $search = mysqli_query($conn, "SELECT * FROM users WHERE `id` = '$id'");
                $result = mysqli_fetch_assoc($search);
                echo json_encode($result);
            }else{
                $alert = array('message'=>'Falha ao efetuar requisição do sistema', 'type'=>'warning');
                echo json_encode($alert);
            }
        }else{
            $alert = array('message'=>'Falha ao efetuar requisição do sistema', 'type'=>'warning');
            echo json_encode($alert);
        }
    }else{
        $alert = array('message'=>'Falha ao efetuar requisição do sistema', 'type'=>'warning');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>