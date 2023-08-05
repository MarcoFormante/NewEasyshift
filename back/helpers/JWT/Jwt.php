<?php 
require_once '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function JWTEncode(array $userInfo):string{
    $key = getenv("JWTKEY");
    $payload = $userInfo;

    $encodedJWT = JWT::encode($payload,$key,'HS256');

    return $encodedJWT;
}


function JWTDecode(string $token):stdClass{
    $key = getenv("JWTKEY");
    $decodedJWT = JWT::decode($token,new Key($key,'HS256'));
    return $decodedJWT;
}
