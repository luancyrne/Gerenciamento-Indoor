<?php
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once '../conexao.php';
include_once('../method.php');

if (checkAuth()) {
    



    if (isset($_POST['id'])) {
        $infosSucc = 0;
    $infosErro = 0;
    $errors;
    $successs;
        $id = $_POST['id'];
        if (isset($_POST['name'])) {
            if (!empty($_POST['name'])) {
                $name = $_POST['name'];
                $db_selection = mysqli_query($conn, "SELECT * FROM users WHERE `name` = '$name' LIMIT 1");
                $result = mysqli_fetch_assoc($db_selection);
                if ($result) {
                    $db_selection = mysqli_query($conn, "SELECT * FROM users WHERE `name` = '$name' AND `id`='$id' LIMIT 1");
                    $result = mysqli_fetch_assoc($db_selection);
                    if ($result) {
                        $db_selection = mysqli_query($conn, "UPDATE users SET `name` = '$name' WHERE id = '$id'");
                        $successs = $infosSucc + 1;
                    } else {
                        $errors = $infosErro + 1;
                    }
                } else {
                    $db_selection = mysqli_query($conn, "UPDATE users SET `name` = '$name' WHERE id = '$id'");
                    $successs = $infosSucc + 1;
                }
            } else {
                $alert = array('message' => 'Nome não pode estar vazio', 'type' => 'info');
                echo json_encode($alert);
            }
        }

        if (isset($_POST['password'])) {
            if (!empty($_POST['password'])) {
                $password = $_POST['password'];
                $db_selection = mysqli_query($conn, "UPDATE users SET `password` = '" . password_hash($password, PASSWORD_DEFAULT) . "' WHERE `id` = '$id'");
                $successs = $infosSucc + 1;
            } else {
                $errors = $infosErro + 1;
            }
        }

        if (isset($_POST['store'])) {
            if (!empty($_POST['store'])) {
                $store = $_POST['store'];
                $db_selection = mysqli_query($conn, "UPDATE users SET `store` = '$store' WHERE `id` = '$id'");
                $successs = $infosSucc + 1;
            } else {
                $errors = $infosErro + 1;
            }
        }

        if (isset($_POST['type'])) {
            if (!empty($_POST['type'])) {
                $type = $_POST['type'];
                $db_selection = mysqli_query($conn, "UPDATE users SET `type` = '$type' WHERE `id` = '$id'");
                $successs = $infosSucc + 1;
            } else {
                $errors = $infosErro + 1;
            }
        }

        if($errors === 1){
            $alert = array('message'=>'Algumas informações não foram atualizadas, pois já existe um usuário com as mesmas informação', 'type'=>'warning');
            echo json_encode($alert);
        }else if($successs === 1){
            $alert = array('message'=>'Algumas informações foram atualizadas', 'type'=>'success');
            echo json_encode($alert);
        }
    } else {
        $alert = array('message' => 'Usuário não selecionado', 'type' => 'info');
        echo json_encode($alert);
    }
} else {
    $alert = array('message' => 'Sessão não iniciada', 'type' => 'warning');
    echo json_encode($alert);
}
