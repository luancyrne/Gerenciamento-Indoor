<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');

if(checkAuth()){
    if(isset($_GET['lists'])){
        if(!empty($_GET['lists'])){
            $store = $_GET['lists'];
            $db_selection = mysqli_query($conn, "SELECT * FROM list WHERE `store` = '$store'");
            $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
            echo json_encode($result);
        }else{
            $db_selection = mysqli_query($conn, "SELECT * FROM list");
            $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
            echo json_encode($result);
        }

    }else if(isset($_GET['list'])){
        if(isset($_GET['id']) && isset($_GET['store'])){
            if(!empty($_GET['id'])){
                if(!empty($_GET['store'])){
                    $id = $_GET['id'];
                    $store = $_GET['store'];
                    $db_selection = mysqli_query($conn, "SELECT * FROM list WHERE `id` = '$id' AND `store` = '$store'");
                    $result = mysqli_fetch_assoc($db_selection);
                    echo json_encode($result);
                }else{
                    $id = $_GET['id'];
                    $db_selection = mysqli_query($conn, "SELECT * FROM list WHERE `id` = '$id'");
                    $result = mysqli_fetch_assoc($db_selection);
                    echo json_encode($result);
                }
                
            }else{
                $alert = array('message'=>'Parametros não definidos', 'type'=>'warning');
                echo json_encode($alert);
            }
        }else{
            $alert = array('message'=>'Parametros não definidos', 'type'=>'warning');
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