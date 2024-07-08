<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');

if(checkAuth()){
    if(isset($_GET['screens'])){
        if(!empty($_GET['screens'])){
            $store = $_GET['screens'];
            $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `store` = '$store'");
            $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
            echo json_encode($result);
        }else{
            $store = $_GET['screens'];
            $db_selection = mysqli_query($conn, "SELECT * FROM screens");
            $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
            echo json_encode($result);
            
        }
        
    }else if(isset($_GET['screen'])){
        if(isset($_GET['id'])){
            if(!empty($_GET['id'])){
                $id = $_GET['id'];
                $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `id` = '$id'");
                $result = mysqli_fetch_assoc($db_selection);
                echo json_encode($result);   
            }else{
                $alert = array('message'=>'Parametros não informados', 'type'=>'warning');
                echo json_encode($alert);    
            }
        }else{
            $alert = array('message'=>'Parametros não informados', 'type'=>'warning');
            echo json_encode($alert);    
        }
    }else{
        $alert = array('message'=>'Parametros não informados', 'type'=>'warning');
        echo json_encode($alert);    
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>