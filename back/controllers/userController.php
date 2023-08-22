<?php 

namespace App\Controllers\UserController;
require_once '../models/UserModel.php';
use App\Models\UserModel\UserModel;

 
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

    public function getUserTotalRequests(int $userId):void{
            $UserModel = new UserModel();
            $UserModel->getUserTotalRequests($userId);
    }

    public function getAllUsers(int $page):void{
        $UserModel = new UserModel();
        $UserModel->getAllUsers($page);
    }

    public function validateUser(int $value, int $userId):void{
        $UserModel = new UserModel();
        $UserModel->validateUser($value,$userId);
    }
}