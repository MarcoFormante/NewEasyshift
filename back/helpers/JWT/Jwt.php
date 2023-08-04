<?php 
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function JWTEncode(string $username,int $role):string{
    $key = getenv("JWTKEY");
    $payload = [
        "username" => $username,
        "role" => $role,
        "code" => "easyshift2023" 
    ];

    $encodedJWT = JWT::encode($payload,$key,'HS256');

    return $encodedJWT;
}


function JWTDecode(string $token):stdClass{
    $key = getenv("JWTKEY");
    $decodedJWT = JWT::decode($token,new Key($key,'HS256'));
    return $decodedJWT;
}
