<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');

if (checkAuth()) {
    if (isset($_FILES['file']) && isset($_POST['name']) && isset($_POST['list'])) {
        if (!empty($_FILES['file']) && !empty($_POST['name']) && !empty($_POST['list'])) {
            $file = $_FILES['file'];
            $name = $_POST['name'];
            $list = $_POST['list'];
            $extension = explode("/", $file['type']);
            $extensionjs = strval($extension[1]);
            $new_name = md5(time());
            $newnameexten = "$new_name" . '.' . "$extensionjs";
            $directory = '../uploads/';
            $db_selection = mysqli_query($conn, "SELECT * FROM contents WHERE `name` = '$name' AND `listid` = '$list' LIMIT 1");
            $result = mysqli_fetch_assoc($db_selection);
            if ($result) {
                $alert = array('message' => 'Já existe um arquivo com este nome', 'type' => 'info');
                echo json_encode($alert);
            } else {

                switch ($extensionjs) {
                    case 'png':
                        move_uploaded_file($_FILES['file']['tmp_name'], $directory . $newnameexten);
                        $db_selection = mysqli_query($conn, "INSERT INTO contents (`id`, `name`, `link`, `listid`) VALUES (id, '$name', '$newnameexten', '$list')");
                        if ($db_selection) {
                            $alert = array('message' => 'Conteúdo salvo com sucesso', 'type' => 'success', 'teste' => $newnameexten);
                            echo json_encode($alert);
                        } else {
                            $alert = array('message' => 'Falha ao salvar conteúdo no servidor', 'type' => 'warning');
                            echo json_encode($alert);
                        }
                        break;

                    case 'jpg':
                        move_uploaded_file($_FILES['file']['tmp_name'], $directory . $newnameexten);
                        $db_selection = mysqli_query($conn, "INSERT INTO contents (`id`, `name`, `link`, `listid`) VALUES (id, '$name', '$newnameexten', '$list')");
                        if ($db_selection) {
                            $alert = array('message' => 'Conteúdo salvo com sucesso', 'type' => 'success', 'teste' => $newnameexten);
                            echo json_encode($alert);
                        } else {
                            $alert = array('message' => 'Falha ao salvar conteúdo no servidor', 'type' => 'warning');
                            echo json_encode($alert);
                        }
                        break;

                    case 'jpeg':
                        move_uploaded_file($_FILES['file']['tmp_name'], $directory . $newnameexten);
                        $db_selection = mysqli_query($conn, "INSERT INTO contents (`id`, `name`, `link`, `listid`) VALUES (id, '$name', '$newnameexten', '$list')");
                        if ($db_selection) {
                            $alert = array('message' => 'Conteúdo salvo com sucesso', 'type' => 'success', 'teste' => $newnameexten);
                            echo json_encode($alert);
                        } else {
                            $alert = array('message' => 'Falha ao salvar conteúdo no servidor', 'type' => 'warning');
                            echo json_encode($alert);
                        }
                        break;

                    case 'svg':
                        move_uploaded_file($_FILES['file']['tmp_name'], $directory . $newnameexten);
                        $db_selection = mysqli_query($conn, "INSERT INTO contents (`id`, `name`, `link`, `listid`) VALUES (id, '$name', '$newnameexten', '$list')");
                        if ($db_selection) {
                            $alert = array('message' => 'Conteúdo salvo com sucesso', 'type' => 'success', 'teste' => $newnameexten);
                            echo json_encode($alert);
                        } else {
                            $alert = array('message' => 'Falha ao salvar conteúdo no servidor', 'type' => 'warning');
                            echo json_encode($alert);
                        }
                        break;

                    case 'webp':
                        move_uploaded_file($_FILES['file']['tmp_name'], $directory . $newnameexten);
                        $db_selection = mysqli_query($conn, "INSERT INTO contents (`id`, `name`, `link`, `listid`) VALUES (id, '$name', '$newnameexten', '$list')");
                        if ($db_selection) {
                            $alert = array('message' => 'Conteúdo salvo com sucesso', 'type' => 'success', 'teste' => $newnameexten);
                            echo json_encode($alert);
                        } else {
                            $alert = array('message' => 'Falha ao salvar conteúdo no servidor', 'type' => 'warning');
                            echo json_encode($alert);
                        }
                        break;

                    default:
                        $alert = array('message' => 'Formato não aceito', 'type' => 'info');
                        echo json_encode($alert);
                        break;
                }
            }
        } else {
            $alert = array('message' => 'Nome e arquivo não podem estar vazios', 'type' => 'info');
            echo json_encode($alert);
        }
    } else {
        $alert = array('message' => 'Preencha os campos vazios', 'type' => 'infos');
        echo json_encode($alert);
    }
} else {
    $alert = array('message' => 'Sessão não iniciada', 'type' => 'warning');
    echo json_encode($alert);
}
