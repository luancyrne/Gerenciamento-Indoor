<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');


    function checkAuth()
    {
        
        $http_header = apache_request_headers();

        if (isset($http_header['Authorization']) && $http_header['Authorization'] != null) {
            $bearer = explode (' ', $http_header['Authorization']);
            //$bearer[0] = 'bearer';
            //$bearer[1] = 'token jwt';

            $token = explode('.', $bearer[1]);
            $header = $token[0];
            $payload = $token[1];
            $sign = $token[2];

            //Conferir Assinatura
            $valid = hash_hmac('sha256', $header . "." . $payload, 'secret', true);
            $valid = base64_encode($valid);

            if ($sign === $valid) {
                return true;
            }
        }else{
            return false;

        }

    }
    
    

?>