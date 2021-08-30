<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
include_once 'conexao.php';
$SQLKEY="secret";

if(isset($_POST['nome']) && isset($_POST['key']) && isset($_POST['senha'])){
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];
    $loja = $_POST['loja'];

    if($_POST['key']===$SQLKEY){
        $verifyuser = mysqli_query($conn, "SELECT nome FROM usuarios WHERE nome = '$nome' LIMIT 1");
        $pesquisa = mysqli_fetch_assoc($verifyuser);
        if($pesquisa){
            $alert = array('mensagem'=>'Usuário já existe', 'tipo'=>'warning');
            echo json_encode($alert);
        }else{
            mysqli_query($conn, 'INSERT INTO usuarios (id, nome, senha, loja) VALUES (id, "'.$nome.'", "'.password_hash($senha, PASSWORD_DEFAULT).'", "'.$loja.'")');
            $alert = array('mensagem'=>'Usuário adicionado ao sistema', 'tipo'=>'success');
            echo json_encode($alert);
        }
    }else{
        $alert = array('mensagem'=>'Token de API invalido', 'tipo'=>'warning');
        echo json_encode($alert);
    }
}else{
    $alert = array('mensagem'=>'Preencha todos os campos', 'tipo'=>'info');
    echo json_encode($alert);
}

?>