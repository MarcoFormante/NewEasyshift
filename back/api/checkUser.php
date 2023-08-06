<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type,Authorization');

require_once '../helpers/JWT/Jwt.php';
$auth = explode(" ",apache_request_headers()['Authorization'])[1];
$decodeUser = JWTDecode($auth);
$userInfo = json_decode(($_POST['userInfo']));

if ($decodeUser->id === $userInfo->userID && $decodeUser->username === $userInfo->username && $decodeUser->role_id === $userInfo->role) {
    echo json_encode(["status"=>1]);
}else{
    echo json_encode(["status"=> 0]);
}