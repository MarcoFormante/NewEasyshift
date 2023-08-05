<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods: GET, POST');

require_once '../controllers/UserController.php';
use App\Controllers\UserController\UserController;


if (isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        //create Account

        case 'createAccount':
            $username = $_POST['username'];
            $password = $_POST['password'];
            $role = $_POST['role'];
            $UserController = new UserController();
            try {
                $UserController->createAccount($username,$password,$role);
            } catch (Exception $e) {
                if (preg_match("/Duplicate entry '$username'/",$e->getMessage())) {
                    echo json_encode(["status"=> 0 ,"message" => "Error: This name has already been taken"]);
                }else{
                    echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]);
                }
            }
            break;

            //Login

            case 'login':
                $username = $_POST['username'];
                $password = $_POST['password'];
                $UserController = new UserController();
                $UserController->login($username,$password);
                break;
        
        default:
            echo json_encode(["status"=> 0 ,"message" => "Error: The Action is Required"]);
            break;
    }
}

 if (isset($_POST["createAccount"]) && isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["role"])) {
    
   
   
    
   
 }

 
 if (isset($_POST['login']) && isset($_POST['username']) && isset($_POST['password'])) {
    
 }