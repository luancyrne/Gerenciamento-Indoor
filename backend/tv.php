<?php
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Access-Control-Allow-Headers: *');
include_once 'conexao.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciador de Media Indoor</title>
    <style>
        @font-face {
            font-family: RegularFont;
            src: url('./RegularFont.woff');
        }

        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        html,
        body {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #horizontal {
            height: 100vh;
            width: 100vw;
        }

        #horizontal>div>img {
            height: 100vh;
            width: 100vw;
        }

        #vertical {
            height: 100%;
            width: 100%;
        }

        #vertical>div>img {
            height: 100vw;
            width: 100vh;
            transform: rotate(270deg);
        }

        .mySlides {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .text {
            color: #f2f2f2;
            font-size: 15px;
            padding: 8px 12px;
            position: absolute;
            bottom: 8px;
            width: 100%;
            text-align: center;
        }

        /* Number text (1/3 etc) */
        .numbertext {
            color: #f2f2f2;
            font-size: 12px;
            padding: 8px 12px;
            position: absolute;
            top: 0;
        }

        /* The dots/bullets/indicators */
        .dot {
            /* height: 15px; */
            /* width: 15px; */
            /* margin: 0 2px; */
            background-color: #bbb;
            border-radius: 50%;
            display: none;
            transition: background-color 0.6s ease;
        }

        .active {
            background-color: #717171;
        }

        /* Fading animation */
        .fade {
            -webkit-animation-name: fade;
            -webkit-animation-duration: 1.5s;
            animation-name: fade;
            animation-duration: 1.5s;
        }

        @-webkit-keyframes fade {
            from {
                opacity: .4
            }

            to {
                opacity: 1
            }
        }

        @keyframes fade {
            from {
                opacity: .4
            }

            to {
                opacity: 1
            }
        }

        /* On smaller screens, decrease text size */
        @media only screen and (max-width: 300px) {
            .text {
                font-size: 11px
            }
        }

        .error {
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            font-family: RegularFont;
            align-items: center;
            justify-content: center;
            background: linear-gradient(90deg, rgba(255, 119, 59, 1) 0%, rgba(255, 142, 36, 1) 35%, rgba(255, 84, 67, 1) 100%);
        }

        .error>img {
            margin-bottom: 20px;
            animation: pulse 3s infinite;
        }

        .error>label {
            font-size: 35px;
        }

        @keyframes pulse {
            0% {
                transform: scale(1.0);
            }

            50% {
                transform: scale(1.1);
            }

            100% {
                transform: scale(1.0);
            }
        }
    </style>
</head>

<body>
    <?php
    $listimg;
    $divel;
    $rotation;
    $list_temp;
    $temp_img;
    $dateStart;
    $dateEnd;
    if (isset($_GET['view'])) {
        if (!empty($_GET['view'])) {
            $link = $_GET['view'];
            $db_selection = mysqli_query($conn, "SELECT `list_id`, `rotation`, `list_temp`, `dateStart`, `dateEnd` FROM `screens` WHERE `link` = '$link' LIMIT 1 ");
            $result = mysqli_fetch_assoc($db_selection);
            if ($result) {
                $rotation = $result['rotation'];
                $listid = $result['list_id'];
                $list_temp = $result['list_temp'];
                $dateStart = $result['dateStart'];
                $dateEnd = $result['dateEnd'];
                if ($list_temp === null) {
                    $db_selection = mysqli_query($conn, "SELECT `id` FROM `list` WHERE `id` = '$listid' LIMIT 1 ");
                    $result = mysqli_fetch_assoc($db_selection);
                    if ($result) {
                        $listid = $result['id'];
                        $db_selection = mysqli_query($conn, "SELECT * FROM `contents` WHERE `listid` = '$listid'");
                        $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
                        $countImgs = count($result, COUNT_NORMAL);
                        $divel = "<div id=" . $rotation . " class='slideshow-container'>";
                        $listimg = $result;
                    } else {
                        echo '<div class="error"><img src="./whiteLogo.png"></img><label style="font-family:RegularFont;">Programação não disponível</label></div>';
                    }
                } else {
                    $db_selectionTemp = mysqli_query($conn, "SELECT `id` FROM `list` WHERE `id` = '$list_temp' LIMIT 1 ");
                    $resultTemp = mysqli_fetch_assoc($db_selectionTemp);
                    $db_selection = mysqli_query($conn, "SELECT `id` FROM `list` WHERE `id` = '$listid' LIMIT 1 ");
                    $result = mysqli_fetch_assoc($db_selection);
                    if ($result) {
                        $listid = $result['id'];
                        $db_selectionTemp = mysqli_query($conn, "SELECT * FROM `contents` WHERE `listid` = '$list_temp'");
                        $resultTemp = mysqli_fetch_all($db_selectionTemp, MYSQLI_ASSOC);
                        $db_selection = mysqli_query($conn, "SELECT * FROM `contents` WHERE `listid` = '$listid'");
                        $result = mysqli_fetch_all($db_selection, MYSQLI_ASSOC);
                        $countImgs = count($result, COUNT_NORMAL);
                        $divel = "<div id=" . $rotation . " class='slideshow-container'>";
                        $listimg = $result;
                        $temp_img = $resultTemp;
                    } else {
                        echo '<div class="error"><img src="./whiteLogo.png"></img><label style="font-family:RegularFont;">Programação não disponível</label></div>';
                    }
                }
            } else {
                echo '<div class="error"><img src="./whiteLogo.png"></img><label style="font-family:RegularFont;">Programação não disponível</label></div>';
            }
        } else {
            echo '<div class="error"><img src="./whiteLogo.png"></img><label style="font-family:RegularFont;">Programação não disponível</label></div>';
        }
    } else {
        echo '<div class="error"><img src="./whiteLogo.png"></img><label style="font-family:RegularFont;">Programação não disponível</label></div>';
    }
    ?>

    <?php
    echo $divel;
    ?>

    <?php
    if (strtotime($dateStart) < strtotime(date('Y-m-d'))) {
        if (strtotime($dateEnd) > strtotime(date('Y-m-d'))) {
            foreach ($temp_img as $key => $value) {
                echo "<div class='mySlides fade'>
                <img src='http://localhost/api/uploads/" . $value['link'] . "'>
              </div>";
            }
        }else{
            echo null;
        }
    } else {
        echo null;
    }

    ?>

    <?php
    foreach ($listimg as $key => $value) {
        echo "<div class='mySlides fade'>
        <img src='http://localhost/api/uploads/" . $value['link'] . "'>
      </div>";
    }
    ?>

    <div style="text-align:center; visibility:hidden; display:none;">
        <?php
        foreach ($listimg as $key => $value) {
            echo "<span class='dot' style='visibility:hidden; display:none'></span>";
        }
        foreach ($temp_img as $key => $value) {
            echo "<span class='dot' style='visibility:hidden; display:none'></span>";
        }
        ?>
    </div>

    <?php
    echo "</div>"
    ?>
    <script>
        var slideIndex = 0;
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "flex";
            dots[slideIndex - 1].className += " active";
            setTimeout(showSlides, 8000);
        }
    </script>
</body>

</html>