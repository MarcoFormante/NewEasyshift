<?php 


namespace App\Models\UserModel;
require_once 'DBConnection.php';
use App\Models\DBConnection\DBConnection;
use PDO;
use Exception;
use PDOException;


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
                throw new PDOException("Error: New account can't create, try again");
            }
        }else{
            throw new PDOException("Error: Database Connection Problem");
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
                throw new PDOException("Error: Unable to log in , try again");
            }
        }else{
            throw new PDOException("Error: Unable to log in, Connection problem");
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
                            throw new PDOException("Error: it is impossible to delete your account (Request can't execute)");
                        }
                    }else{
                        throw new Exception("Username or Password is not correct");
                    }
                }else{
                    throw new Exception("Username or Password is not correct");
                } 
            }else{
                throw new PDOException("Error Processing Request(PDO problem)");
            }
        }else{
            throw new PDOException("Error Processing Request(PDO problem)");
        }
    }


    public function getUserTotalRequests(int $userId):void{
        if ($this->pdo) {
            $query = "SELECT COUNT(id) as totalRequests FROM requests WHERE user_id = :userId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                $totalRequests = $stmt->fetchColumn();
                echo json_encode(['status'=>1,"totalRequests"=>$totalRequests]);
            }else{
                throw new PDOException("Error Processing Request(Query Execution)");
            }
        }else{
            throw new PDOException("Error Processing Request(PDO problem)");
        }
    }


    public function getAllUsers(int $page){
        if ($this->pdo) {
            $query = "SELECT * FROM users LIMIT :page,10 ";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":page",$page,PDO::PARAM_INT);
            if ($stmt->execute()){
                    $users = [];
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        $users[] = $row;
                    }
                    echo json_encode(["status" => 1 ,"users" => $users]);
                
            }else{
                throw new PDOException("Error Processing Request (execution)");
            }
        }else{
            throw new PDOException("Error Processing Request (pdo)");
        }
    }


    public function validateUser(int $value, int $userId){
        if ($this->pdo) {
            $query = "UPDATE users SET is_validate = :value WHERE id = :userId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":value",$value,PDO::PARAM_INT);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                echo json_encode(["status"=>1]);
            }else{
                throw new PDOException("Error Processing Request (execution)");
            }
        }else{
            throw new PDOException("Error Processing Request (pdo)");
        }
    }

}