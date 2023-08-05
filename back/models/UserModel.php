<?php 


namespace App\Models\UserModel;
require_once 'DBConnection.php';
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
        if ($this->pdo) {
            $query = "SELECT * from users WHERE username = :username";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":username",$username,PDO::PARAM_STR);
            if ($stmt->execute()) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($stmt->rowCount() > 0) {
                    $userPassword = $user->password;
                    if (password_verify($password,$userPassword)) {
                        if ($user->is_validate === 1) {
                           echo json_encode(["status"=>1,"user"=> $user]);
                        }
                    }else{
                        throw new Exception("Error: Username or Password isn't valid");
                    }
                }else{
                    throw new Exception("Error: Username or Password isn't valid");
                }
            }else{
                throw new Exception("Error: Unable to log in , try again");
            }
        }else{
            throw new Exception("Error: Unable to log in, Connection problem");
        }

    }
  
}

