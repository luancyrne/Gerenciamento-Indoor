<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
include_once 'conexao.php';

if(!empty($_POST['nome']) && !empty($_POST['senha'])){
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    $search = mysqli_query($conn, "SELECT * FROM usuarios WHERE nome = '$nome' LIMIT 1");
    $result = mysqli_fetch_assoc($search);
    if($result){
        if(password_verify($senha, $result['senha'])){
            $alert = array('mensagem'=>'logado com sucesso', 'tipo' => 'success');

            echo json_encode($alert);
        }else{
            $alert = array('mensagem'=>'Usuário ou senha incorretos', 'tipo'=>'warning');
            echo json_encode($alert);
        }
    }else{
        $alert = array('mensagem'=>'Usuário ou senha incorretos', 'tipo'=>'warning');
        echo json_encode($alert);
    }
    

}else{
    $alert = array('mensagem'=>'Preencha todos os campos', 'tipo'=>'info');
    echo json_encode($alert);
}


?>