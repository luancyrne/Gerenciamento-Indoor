<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require_once('../verifyToken.php');
include_once('../conexao.php');
include_once('../method.php');

if(checkAuth()){
    if(isset($_POST['id'])){
        $infosSucc = 0;
    $infosErro = 0;
    $errors;
    $successs;
        $id = $_POST['id'];
        if(isset($_POST['name'])){
            if(!empty($_POST['name'])){
                $name = $_POST['name'];
                $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `name` = '$name' LIMIT 1");
                $result = mysqli_fetch_assoc($db_selection);
                if($result){
                    $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `name` = '$name' AND `id`='$id' LIMIT 1");
                    $result = mysqli_fetch_assoc($db_selection);
                    if($result){
                        $db_selection = mysqli_query($conn, "UPDATE screens SET `name` = '$name' WHERE id = '$id'");
                        $successs = $infosSucc + 1;
                    }else{
                        $errors = $infosErro + 1;
                    }
                }else{
                    $db_selection = mysqli_query($conn, "UPDATE screens SET `name` = '$name' WHERE id = '$id'");
                    $successs = $infosSucc + 1; 
                }
                 
            }else{
                $errors = $infosErro + 1;   
            }
        }

        if(isset($_POST['link'])){
            if(!empty($_POST['link'])){
                $link = $_POST['link'];
                $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `link` = '$link' LIMIT 1");
                $result = mysqli_fetch_assoc($db_selection);
                if($result){
                    $db_selection = mysqli_query($conn, "SELECT * FROM screens WHERE `link` = '$link' AND `id` = '$id' LIMIT 1");
                    $result = mysqli_fetch_assoc($db_selection);
                    if($result){
                        $success = $infosSucc + 1;
                    }else{
                        $errors = $infosErro + 1;
                    }
                }else{
                    $db_selection = mysqli_query($conn, "UPDATE screens SET `link` = '$link' WHERE id = '$id'");
                    $successs = $infosSucc + 1;  
                }  
            }else{
                echo json_encode($alert);    
            }
        }
        
        if(isset($_POST['listid'])){
            if(!empty($_POST['listid'])){
                $list = $_POST['listid'];
                $db_selection = mysqli_query($conn, "UPDATE screens SET `list_id` = '$list' WHERE id = '$id'");
                $successs = $infosSucc + 1; 
            }else{
                echo json_encode($alert);    
            }
        }

        if(isset($_POST['rotation'])){
            if(!empty($_POST['rotation'])){
                $rotation = $_POST['rotation'];
                $db_selection = mysqli_query($conn, "UPDATE screens SET `rotation` = '$rotation' WHERE id = '$id'");
                $successs = $infosSucc + 1;
            }
        }
        
        if(isset($_POST['list_temp'])){
            if($_POST['list_temp'] === ''){
                $list_temp = $_POST['list_temp'];
                $dateStart = $_POST['dateStart'];
                $dateEnd = $_POST['dateEnd'];
                $db_selection = mysqli_query($conn, "UPDATE screens SET `list_temp` = null, `dateStart`= null, `dateEnd`= null WHERE id = '$id'");
                $successs = $infosSucc + 1;
            }else{
                $list_temp = $_POST['list_temp'];
                $dateStart = $_POST['dateStart'];
                $dateEnd = $_POST['dateEnd'];
                $db_selection = mysqli_query($conn, "UPDATE screens SET `list_temp` = '$list_temp', `dateStart`= '$dateStart', `dateEnd`= '$dateEnd' WHERE id = '$id'");
                $successs = $infosSucc + 1;
            }
        }

        if(isset($_POST['list_id'])){
            if(!empty($_POST['list_id'])){
                $listmedia = $_POST['list_id'];
                $db_selection = mysqli_query($conn, "UPDATE screens SET `list_id` = '$list_id' WHERE id = '$id'");
                $successs = $infosSucc + 1;
            }
        }
        
        if(isset($_POST['store'])){
            if(!empty($_POST['store'])){
                $store = $_POST['store'];
                $db_selection = mysqli_query($conn, "UPDATE screens SET `store` = '$store' WHERE id = '$id'");
                $successs = $infosSucc + 1;
            }
        }
        
        if($errors === 1){
            $alert = array('message'=>'Algumas informações não foram atualizadas, pois já existe uma tela com as mesmas informações', 'type'=>'warning');
            echo json_encode($alert);
        }else if($successs === 1){
            $alert = array('message'=>'Algumas informações foram atualizadas', 'type'=>'success');
            echo json_encode($alert);
        }
    }else{
        $alert = array('message'=>'Selecione uma tela', 'type'=>'info');
        echo json_encode($alert);    
    }
}else{
    $alert = array('message'=>'Sessão não iniciada', 'type'=>'warning');
    echo json_encode($alert);
}

?>