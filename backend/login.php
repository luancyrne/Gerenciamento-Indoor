<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
include_once 'conexao.php';

if (!empty($_POST['name']) && !empty($_POST['password']) && !empty($_POST['store'])) {
    $name = $_POST['name'];
    $password = $_POST['password'];
    $store = $_POST['store'];


    $search = mysqli_query($conn, "SELECT * FROM stores WHERE `name` = '$store' LIMIT 1");
    $result = mysqli_fetch_assoc($search);
    if ($result) {
        $search = mysqli_query($conn, "SELECT * FROM users WHERE `name` = '$name' LIMIT 1");
        $result = mysqli_fetch_assoc($search);
        if ($result) {
            if ($store === $result['store']) {
                if (password_verify($password, $result['password'])) {
                    $key = 'secret';

                    $header = [
                        'typ' => 'JWT',
                        'alg' => 'HS256'
                    ];

                    $payload = [
                        'exp' => (new DateTime("now"))->getTimestamp(),
                        'name' => $name,
                        'store' => $store,
                    ];

                    //JSON
                    $header = json_encode($header);
                    $payload = json_encode($payload);

                    //Base 64
                    $header = base64_encode($header);
                    $payload = base64_encode($payload);

                    //Sign
                    $sign = hash_hmac('sha256', $header . "." . $payload, $key, true);
                    $sign = base64_encode($sign);

                    //Token
                    $token = $header . '.' . $payload . '.' . $sign;

                    $infos = array('token' => $token, 'user' => $name, 'store' => $store, 'type' => $result['type'], 'id' => $result['id']);
                    $alert = array('message' => 'logado com sucesso', 'type' => 'success', 'infos' => $infos);
                    echo json_encode($alert);
                } else {
                    $alert = array('message' => 'Usuário ou senha incorretos', 'type' => 'warning');
                    echo json_encode($alert);
                }
            } else {
                $alert = array('message' => 'Usuário não cadastrado a esta loja', 'type' => 'warning');
                echo json_encode($alert);
            }
        } else {
            session_destroy();
            $alert = array('message' => 'Usuário ou senha incorretos', 'type' => 'warning');
            echo json_encode($alert);
        }
    } else {
        $alert = array('message' => 'Loja não cadastrada', 'type' => 'warning');
        echo json_encode($alert);
    }
} else if (!empty($_POST['name']) && !empty($_POST['password']) && isset($_POST['admin'])) {
    $name = $_POST['name'];
    $password = $_POST['password'];

    $search = mysqli_query($conn, "SELECT * FROM users WHERE `name` = '$name' AND `type` = 'admin' LIMIT 1");
    $result = mysqli_fetch_assoc($search);
    if ($result) {
        $search = mysqli_query($conn, "SELECT * FROM users WHERE `name` = '$name' LIMIT 1");
        $result = mysqli_fetch_assoc($search);
        if ($result) {
            if (password_verify($password, $result['password'])) {
                $key = 'secret';

                $header = [
                    'typ' => 'JWT',
                    'alg' => 'HS256'
                ];

                $payload = [
                    'exp' => (new DateTime("now"))->getTimestamp(),
                    'name' => $name,
                    'store' => $store,
                ];

                //JSON
                $header = json_encode($header);
                $payload = json_encode($payload);

                //Base 64
                $header = base64_encode($header);
                $payload = base64_encode($payload);

                //Sign
                $sign = hash_hmac('sha256', $header . "." . $payload, $key, true);
                $sign = base64_encode($sign);

                //Token
                $token = $header . '.' . $payload . '.' . $sign;

                $infos = array('token' => $token, 'user' => $name, 'store' => $result['store'], 'type' => $result['type'], 'id'=>$result['id']);
                $alert = array('message' => 'logado com sucesso', 'type' => 'success', 'infos' => $infos);
                echo json_encode($alert);
            } else {
                $alert = array('message' => 'Usuário ou senha incorretos', 'type' => 'warning');
                echo json_encode($alert);
            }
        } else {
            session_destroy();
            $alert = array('message' => 'Usuário ou senha incorretos', 'type' => 'warning');
            echo json_encode($alert);
        }
    } else {
        $alert = array('message' => 'Usuário não e administrador', 'type' => 'warning');
        echo json_encode($alert);
    }
} else {
    $alert = array('message' => 'Preencha todos os campos', 'type' => 'info');
    echo json_encode($alert);
}
?>