<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods: GET, POST');
 require_once '../models/user.php';

//create Account

 if (isset($_POST["createAccount"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["role"])) {
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];
    $user = new User();
    try {
        $user->createAccount($username,$password,$role);
    } catch (Exception $e) {
        if (preg_match("/Duplicate entry '$username'/",$e->getMessage(),)) {
            echo json_encode(["status"=> 0 ,"message" => "Error: This name has already been taken"]);
        }else{
            echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]);
        }
    }
   
 }