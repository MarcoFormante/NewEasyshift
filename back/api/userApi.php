<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type');
header('Access-Control-Allow-Methods: GET, POST');


require_once '../controllers/userController.php';
use \App\Controllers\UserController\UserController;

if (isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        
        //create Account
        case 'createAccount':
                $username = $_POST['username'];
                $password = $_POST['password'];
                $role = $_POST['role'];
                $UserController =  new UserController;
                try {
                    $UserController->createAccount($username,$password,$role);
                } catch (\Exception $e) {
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
                    $UserController =   new UserController;
                    try {
                        $UserController->login($username,$password);
                    } catch (\Exception $e) {
                        echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]); 
                    }
            break;


            case 'deleteAccount':
                $username = $_POST['username'];
                $password = $_POST['password'];
                $userId = $_POST['userId'];
                $UserController = new UserController;
                try {
                    $UserController->deleteAccount($username,$password,$userId);
                } catch (Exception $e) {
                    echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]); 
                }
            break;


            case 'adminDeleteUser':
                $userId = $_POST['id'];
                $UserController = new UserController;
                try {
                    $UserController->deleteUser($userId);
                } catch (Exception $e) {
                    echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]); 
                }
            break;



            case 'getUserTotalRequests':
                $userId = $_POST['userId'];
                $UserController = new UserController;
                try {
                    $UserController->getUserTotalRequests($userId);
                } catch (Exception $e) {
                    echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]); 
                }
            break;


            case 'getAllUsers':
                $UserController = new UserController;
                try {
                    $page = $_POST['page'];
                   $UserController->getAllUsers($page);
                } catch (Exception $e) {
                    echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]); 
                }
            break;


            case 'validateUser':
                $userId = $_POST['userId'];
                $value = $_POST['value'];
                $UserController = new UserController;
                try {
                   $UserController->validateUser($value,$userId);
                } catch (Exception $e) {
                    echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]); 
                }
            break;
           
        
        default:
            echo json_encode(["status"=> 0 ,"message" => "Error: Action is Required"]);
            break;
    }
}

