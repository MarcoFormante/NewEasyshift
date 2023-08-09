<?php 
namespace App\Models\RequestModel;
require_once 'DBConnection.php';
use App\Models\DBConnection\DBConnection;
use Exception;
use PDO;

Class RequestModel{
use DBConnection;

//GET ALL REQUESTS ($limit)
    public function getAllRequests(int $limit){
        if ($this->pdo) {
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,created_on,locked_user_id,
			(SELECT COUNT(*) FROM comments WHERE comments.request_id = requests.id) as total_comments
            FROM requests
            INNER JOIN users ON users.id = requests.user_id
            ORDER BY requests.id DESC
            LIMIT :limit,6" ; 
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":limit",$limit,PDO::PARAM_INT);
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $requests = [];
                   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $requests[] = $row;
                   }
                   echo json_encode(["status"=>1 ,"request"=>$requests]);
                }else{
                    //handle requests = 0 
                   throw new Exception("Error : You have no requests at the moment");
                }
            }else{
                //handle not execute
                throw new Exception("Error: It is not possible to get requests. Error during request execution.");
            }
        }else{
            //handle database error
            throw new Exception("Error: Unable to access the database.");
        }
    }

//CREATES NEW REQUEST ($userId,$date,$shiftStart,$shiftEnd,$request)
    public function createRequest(int $userId, string $date,string $shiftStart,string $shiftEnd,string $request){
        if ($this->pdo) {
            $query = "INSERT INTO requests(user_id,shift_start,shift_end,request,date)
            VALUES(:userId,:shiftStart,:shiftEnd,:request,:date)";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            $stmt->bindValue(":shiftStart",$shiftStart,PDO::PARAM_STR);
            $stmt->bindValue(":shiftEnd",$shiftEnd,PDO::PARAM_STR);
            $stmt->bindValue(":request",$request,PDO::PARAM_STR);
            $stmt->bindValue(":date",$date,PDO::PARAM_STR);

            if ($stmt->execute()) {
                echo json_encode(["status"=>1 ,"message"=>"New Request created!"]);
            }else{
                throw new Exception("Error: New Request can't create ,try again (statement execute error)");
            }
        }else{
            throw new Exception("Error: New Request can't create ,try again");
        }
    }

//GET USER REQUESTS ($limit,$userId)   
    public function getMyRequests(int $limit, int $userId):void{
        if ($this->pdo) {
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,created_on,locked_user_id,
			(SELECT COUNT(*) FROM comments WHERE comments.request_id = requests.id) as total_comments
            FROM requests
           
            INNER JOIN users ON users.id = :userId
            ORDER BY requests.id DESC
            LIMIT :limit,6
          " ; 
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":limit",$limit,PDO::PARAM_INT);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $requests = [];
                   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $requests[] = $row;
                   }
                   echo json_encode(["status"=>1 ,"request"=>$requests]);
                }else{
                    //handle requests = 0 
                   throw new Exception("Error : There are no requests at the moment");
                }
            }else{
                //handle not execute
                throw new Exception("Error: It is not possible to get requests. Error during request execution.");
            }
            
        }else{
            //handle database error
            throw new Exception("Error: Unable to access the database.");
       }
    }


    public function getLockedUserid(int $requestId){
        if ($this->pdo) {
            $query = "SELECT locked_user_id FROM  requests WHERE id = :requestId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':requestId',$requestId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                $id = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode(['status'=>1,'lockedUserId'=>$id['locked_user_id']]);
            }else{
                 //handle not execute
                 throw new Exception("Error: It is not possible to get locked_user_id. Error during request execution.");
            }

        }else{
           //handle database error
           throw new Exception("Error: Unable to access the database.");  
        }
    
    }
}