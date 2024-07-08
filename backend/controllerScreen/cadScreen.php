<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');

if (checkAuth()) {
    if (isset($_POST['name']) && isset($_POST['link']) && isset($_POST['list_id']) && isset($_POST['rotation']) && isset($_POST['store'])) {
        if (!empty($_POST['name']) && !empty($_POST['link']) && !empty($_POST['rotation']) && !empty($_POST['store'])) {
            if (isset($_POST['list_temp']) && !empty($_POST['list_temp'])) {
                if (isset($_POST['dateStart']) && isset($_POST['dateEnd']) && !empty($_POST['dateStart']) && !empty($_POST['dateEnd'])) {
                    $name = $_POST['name'];
                    $link = $_POST['link'];
                    $list_id = $_POST['list_id'];
                    $list_temp = $_POST['list_temp'];
                    $rotation = strtolower($_POST['rotation']);
                    $dateStart = $_POST['dateStart'];
                    $dateEnd = $_POST['dateEnd'];
                    $store = $_POST['store'];
                    $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `name` = '$name' LIMIT 1");
                    $result = mysqli_fetch_assoc($db_selection);
                    if ($result) {
                        $alert = array('message' => 'Já existe uma tela com este nome, tente outro', 'type' => 'info');
                        echo json_encode($alert);
                    } else {
                        $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `link` = '$link' LIMIT 1");
                        $result = mysqli_fetch_assoc($db_selection);
                        if ($result) {
                            $alert = array('message' => 'Já existe uma tela com este link, tente outro', 'type' => 'info');
                            echo json_encode($alert);
                        } else {
                            $db_selection = mysqli_query($conn, "INSERT INTO screens (`id`, `name`, `link`, `list_id`, `list_temp`, `rotation`, `store`, `dateStart`, `dateEnd`) VALUES (id, '$name', '$link', '$list_id', '$list_temp', '$rotation', '$store', '$dateStart', '$dateEnd')");
                            $alert = array('message' => 'Tela criada com sucesso', 'type' => 'success');
                            echo json_encode($alert);
                        }
                    }
                } else {
                    $alert = array('message' => 'Preencha todos os campos', 'type' => 'info');
                    echo json_encode($alert);
                }
            } else {
                $name = $_POST['name'];
                $link = $_POST['link'];
                $list_id = $_POST['list_id'];
                $rotation = strtolower($_POST['rotation']);
                $store = $_POST['store'];
                $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `name` = '$name' LIMIT 1");
                $result = mysqli_fetch_assoc($db_selection);
                if ($result) {
                    $alert = array('message' => 'Já existe uma tela com este nome, tente outro', 'type' => 'info');
                    echo json_encode($alert);
                } else {
                    $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `link` = '$link' LIMIT 1");
                    $result = mysqli_fetch_assoc($db_selection);
                    if ($result) {
                        $alert = array('message' => 'Já existe uma tela com este link, tente outro', 'type' => 'info');
                        echo json_encode($alert);
                    } else {
                        $db_selection = mysqli_query($conn, "INSERT INTO screens (`id`, `name`, `link`, `list_id`, `rotation`, `store`) VALUES (id, '$name', '$link', '$list_id', '$rotation', '$store')");
                        $alert = array('message' => 'Tela criada com sucesso', 'type' => 'success');
                        echo json_encode($alert);
                    }
                }
            }
        } else {
            $alert = array('message' => 'Preencha todos os campos', 'type' => 'info');
            echo json_encode($alert);
        }
    } else {
        $alert = array('message' => 'Preencha todos os campos', 'type' => 'info');
        echo json_encode($alert);
    }
} else {
    $alert = array('message' => 'Sessão não iniciada', 'type' => 'warning');
    echo json_encode($alert);
}
