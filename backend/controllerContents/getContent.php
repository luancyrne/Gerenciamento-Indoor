<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');

if(checkAuth()){
    if(isset($_GET['contents'])){
        $listid = $_GET['contents'];
        $db_selection = mysqli_query($conn, "SELECT * FROM contents WHERE `listid` = '$listid'");
        $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
        echo json_encode($result);
    }else if(isset($_GET['content'])){
        if(isset($_GET['id'])){
            if(!empty($_GET['id'])){
                $id = $_GET['id'];
                $db_selection = mysqli_query($conn, "SELECT * FROM contents WHERE id = '$id' LIMIT 1");
                $result = mysqli_fetch_assoc($db_selection);
                echo json_encode($result);
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