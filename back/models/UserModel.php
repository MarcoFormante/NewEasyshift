<?php 


namespace App\Models\UserModel;
require_once 'DBConnection.php';
use App\Models\DBConnection\DBConnection;
use PDO;
use Exception;
use stdClass;

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
            $validateAccountCode = 0;
            $query = "SELECT * from users WHERE username = :username";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":username",$username,PDO::PARAM_STR);
            if ($stmt->execute()) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($stmt->rowCount() > 0) {
                    $userPassword = $user['password'];
                    if (password_verify($password,$userPassword)) {
                        if ($user["is_validate"] === $validateAccountCode) {
                            $userInfo = [
                                "id"=>$user['id'],
                                "username"=>$user['username'],
                                "role_id"=> $user['role_id'],
                                "is_validate" => $user['is_validate']
                            ];
                            require_once '../helpers/JWT/Jwt.php';
                            $token = JWTEncode($userInfo);
                        echo json_encode(["status"=>1,"user"=> $userInfo,"token"=> $token]);
                         
                        }else{
                            throw new Exception("Error: Your account has not been validated yet");
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


    public function deleteAccount(string $username,string $password,int $userId){
        
        if ($this->pdo) {
            $query = "SELECT username,password from users WHERE id = :userId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $userInfo = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    if (password_verify($password,$userInfo['password']) && $username === $userInfo['username']) {
                        $stmt = null;
                       $query = "DELETE FROM users 
                       WHERE id = :userId";
                        $stmt = $this->pdo->prepare($query);
                        $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
                        if ($stmt->execute()) {
                            echo json_encode(['status'=>1]);
                        }else{
                            throw new Exception("Error: it is impossible to delete your account (Request can't execute)");
                        }
                    }else{
                        throw new Exception("Username or Password is not correct");
                    }
                }else{
                    throw new Exception("Username or Password is not correct");
                }
                
                
                
            }
        }
    }
}

