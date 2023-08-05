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

    }
}