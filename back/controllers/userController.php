<?php 

namespace App\Controllers\UserController;
require_once '../models/UserModel.php';
use App\Models\UserModel\UserModel;
use Exception;

class UserController{

    public function createAccount(string $username,string $password,int $role):void{
        $UserModel = new UserModel();
        $UserModel->createAccount($username,$password,$role);
    }

    public function login(string $username,string $password){
        $UserModel = new UserModel();
        $UserModel->login($username,$password);
    }


    public function deleteAccount(string $username,string $password,int $userId):void{
        $UserModel = new UserModel();
        $UserModel->deleteAccount($username,$password,$userId);
    }


    public function deleteUser(int $userId):void{
        $UserModel = new UserModel();
        $UserModel->deleteUser($userId);
    }

    public function getUserTotalRequests(int $userId):void{
            $UserModel = new UserModel();
            $UserModel->getUserTotalRequests($userId);
    }

    public function getAllUsers(int $page):void{
        $UserModel = new UserModel();
        $UserModel->getAllUsers($page);
    }

    public function adminLogin(string $username, string $password, string $secretCode){
        $UserModel = new UserModel();
        $UserModel->adminLogin($username, $password, $secretCode);
    }


    public function validateUser(int $value, int $userId):void{
        $UserModel = new UserModel();
        $UserModel->validateUser($value,$userId);
    }


    public function updateUser(int $userId, string $username, string $password, int $role, string $secretCode):void{
        if ($secretCode === getenv("SecretCodeEasyshift")) {
            $UserModel = new UserModel();
            $UserModel->updateUser($userId, $username,  $password,  $role, $secretCode);
        }else{
            throw new Exception("Error Processing Request (ce)");
        }
       
    }
}