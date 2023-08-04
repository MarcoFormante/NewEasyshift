<?php 

namespace App\Models\UserModel;
use App\Models\DBConnection\DBConnection;
use PDO;
use Exception;

Class UserModel
{
    use DBConnection;

    //Crete New Account
    public function createAccount(string $username , string $password, int $role) :void {

        if ($this->pdo) {
            $hashedPassword = password_hash($password,PASSWORD_BCRYPT);
            $query = "INSERT INTO users(username,password,role_id) VALUES(:username,:hashedPassword,:role)";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":username",$username,PDO::PARAM_STR);
            $stmt->bindValue(":hashedPassword",$hashedPassword,PDO::PARAM_STR);
            $stmt->bindValue(":role",$role,PDO::PARAM_INT);
            if ($stmt->execute()) {
                    echo json_encode(["status"=> 1,"message"=> "New Account created!"]);
            }else{
                throw new Exception("Error: New account can't create, try again");
            }
        }else{
            throw new Exception("Error: Database Connection Problem");
        }
    }

//Login
    public function login(string $username , string $password):void{

    }
  
}

// $username,$hashedPassword,$role