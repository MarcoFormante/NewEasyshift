<?php 
namespace App\Models\RequestModel;
require_once 'DBConnection.php';

use App\Controllers\NotificationController\NotificationController;
use App\Models\DBConnection\DBConnection;
use Exception;
use PDO;

Class RequestModel{
use DBConnection;

//GET ALL REQUESTS ($limit)
    public function getAllRequests(int $limit,$limit2){
        
        if ($this->pdo) {
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,requests.created_on,locked_user_id,
			(SELECT COUNT(*) FROM comments WHERE comments.request_id = requests.id) as total_comments
            FROM requests
            INNER JOIN users ON users.id = requests.user_id
            ORDER BY requests.id DESC
            LIMIT :limit,6" ; 

        if ($limit2 !== null) {
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,requests.created_on,locked_user_id,
			(SELECT COUNT(*) FROM comments WHERE comments.request_id = requests.id) as total_comments
            FROM requests
            INNER JOIN users ON users.id = requests.user_id
            ORDER BY requests.id DESC
            LIMIT :limit,:limit2" ; 
        }
        
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":limit",$limit,PDO::PARAM_INT);
            if ($limit2 !== null) {
                $stmt->bindValue(":limit2",$limit2,PDO::PARAM_INT);
            }
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $requests = [];
                   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $requests[] = $row;
                   }
                   echo json_encode(["status"=>1 ,"request"=>$requests,"requestLimit"=>$limit2]);
                }else{
                    //handle requests = 0 
                   throw new Exception("Error : no more requests");
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
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,requests.created_on,locked_user_id,
			(SELECT COUNT(*) FROM comments WHERE comments.request_id = requests.id) as total_comments
            FROM requests
            INNER JOIN users ON users.id = :userId
            WHERE requests.user_id = :userId
            LIMIT :limit,6" ; 
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
                    throw new Exception("Error : no more requests");
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

    public function viewPost(int $requestId){
        if ($this->pdo) {
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,requests.created_on,locked_user_id,
			0 as total_comments
            FROM requests
            INNER JOIN users ON users.id = requests.user_id
            WHERE requests.id = :requestId";

            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $request = $stmt->fetch(PDO::FETCH_ASSOC);
                    echo json_encode(['status'=>1,"request"=>[$request],"rowCount"=> $stmt->rowCount()]);
                }else{
                    if (isset($_POST['notificationId'])) {
                        require_once '../controllers/notificationController.php';
                        $NotificationController = new NotificationController;
                        $NotificationController->deleteNotification();
                    }
                    echo json_encode(['status'=>1,"rowCount"=> $stmt->rowCount()]);
                }
            }else{
                throw new Exception("Error: it is no possible to execute this command (viewPost->$requestId) ");
            }
        }else{
             //handle database error
           throw new Exception("Error: Connection Problem");  
        }
    }


    public function deleteRequest(int $requestId):void{
        if ($this->pdo) {
            
            $querySelectRequest = "SELECT locked_user_id FROM requests WHERE id = :requestId"; 
            $stmt = $this->pdo->prepare($querySelectRequest);
            $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
            $lockedUserId = null;
            if ($stmt->execute()) {
                $lockedUserId = $stmt->fetchColumn();
                // if (is_int($lockedUserId)) {
                //     $query = "SELECT user_id FROM requests WHERE requests.id = :requestId";
                //     $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
                //     if ($stmt->execute()) {
                      
                //         $fromUserId = $stmt->fetchColumn();
                //         $query = "INSERT INTO notifications(user_id,message,from_user_id)
                //         VALUES(1,'has delete a post where you were choosen',22)";
                //         if($stmt->execute()){
                //             echo "secondo";
                //         }
                //     }
                // }
            $stmt = null;
            $query = "DELETE FROM requests WHERE id = :requestId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                echo json_encode(['status'=>1,"message"=>"This Post has Been deleted","lockedUserId"=>$lockedUserId]); 
                } 
            }else{
                throw new Exception("Error: it is no possible to execute this command (delete request) ");
            }
        }
    }


    public function lockUserId(int $requestId, $lockedUserId = null){
        $notificationMessage = "";
        
    if ($this->pdo) {
            $query = "";
            $returnValue= null;
            if (json_decode($lockedUserId)[0] === "null") {
                $lockedUserId = json_decode($lockedUserId)[1];
                $query="UPDATE requests SET locked_user_id = null WHERE id = :requestId";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
                $notificationMessage = "no longer wants your shift";
                $returnValue = null;

            }elseif(json_decode($lockedUserId)[0] === "notNull"){
                $lockedUserId = json_decode($lockedUserId)[1];
                $query="UPDATE requests SET locked_user_id = :lockedUserId WHERE id = :requestId";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
                $stmt->bindValue(":lockedUserId",$lockedUserId,PDO::PARAM_INT);
                $notificationMessage ="wants your shift";
                $returnValue = $lockedUserId;
            }
            
                if ($stmt->execute()) {
                    echo json_encode(['status'=> 1,"lockedUserId"=>$returnValue]);
                    if ($_POST['fromUserId']) {
                        $fromUserId = $_POST['fromUserId'];
                       require_once '../controllers/notificationController.php';
                       $NotificationController = new NotificationController;
                       $NotificationController->sendNotification($lockedUserId,$fromUserId,$requestId,$notificationMessage);
                    }
                }else{
                    throw new Exception("Error: it's not possible to lock user at the moment, Please try again later (execution problem)");
                }
            }else{
                throw new Exception("Error: it's not possible to lock user at the moment, Please try again later (pdo problem)");
            }
            
        
        }
}