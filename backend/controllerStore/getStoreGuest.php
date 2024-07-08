<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
include_once('../conexao.php');

if(isset($_GET['token'])){
    if(!empty($_GET['token'])){
        $secretToken = '64EFE0FDBB5AE140C69C221D70A4D2949733DEEF1F2EE4DB1119A3C89C39CC4F';
        $token = $_GET['token'];
        if($token === $secretToken){
            $db_selection = mysqli_query($conn, "SELECT * FROM stores");
            $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
            echo json_encode($result);
            mysqli_close($conn);
        }else{
            $alert = array('message'=>'Token invalido', 'type'=>'warning');
            echo json_encode($alert);
        }
    }else{
        $alert = array('message'=>'Token não configurado', 'type'=>'warning');
        echo json_encode($alert);
    }
}else{
    $alert = array('message'=>'Parametros de API não definidos pelo sistema', 'type'=>'warning');
    echo json_encode($alert);
}

?>