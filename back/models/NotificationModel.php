<?php 

namespace App\Models\NotificationModel;


use App\Models\DBConnection\DBConnection;
use Exception;
use PDO;
use PDOException;

require_once 'DBConnection.php';
class NotificationModel {
    use DBConnection;

    public function getUserNotifications(int $userId):void{
        if ($this->pdo) {
            $query = "SELECT users.username,notifications.id,user_id,request_id,message,viewed,from_user_id FROM notifications
              JOIN users ON users.id  = notifications.from_user_id
             WHERE user_id = :userId
             ORDER BY notifications.id DESC";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                $notifications = [];
                if ($stmt->rowCount() > 0) {
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $notifications[] = $row;
                    }
                    echo json_encode(['status'=> 1,"notifications"=> $notifications]);
                }
            }
        }else{
            throw new Exception("Error Processing Request, Unable to access the database");
        }
    }


    public function getAllNotifications(int $limit):void{
        if ($this->pdo) {
            $query = "SELECT users.username,notifications.id,notifications.created_on,user_id,request_id,message,viewed,from_user_id FROM notifications
            JOIN users ON users.id  = notifications.from_user_id
            ORDER BY notifications.id DESC
            LIMIT :limit,10";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":limit",$limit,PDO::PARAM_INT);
            if ($stmt->execute()) {

                $notifications = [];
               
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $notifications[] = $row;
                }
                echo json_encode(['status'=> 1,"notifications"=> $notifications]);
               
            }else{
                throw new PDOException("Error : Unable to execute the request");
            }
        }else{
            throw new PDOException("Error Processing Request, Unable to access the database");
        }
    }


    public function deleteNotification(int $notificationId):void{
        if ($this->pdo) {
          
            $query = "DELETE FROM notifications WHERE id = :notificationId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":notificationId",$notificationId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                 echo json_encode(['status'=> 1,"message"=> "The notification has been deleted"]);
            }else{
                throw new Exception("Error Processing Request, Unable to delete this notification");
            }
        }else{
            throw new Exception("Error Processing Request, Unable to access the database");
        }
    }

    public function sendNotification(int $userId = null ,int $fromUserId,int $requestId,string $message):void{
        if ($userId !== null) {
            $query = "INSERT INTO notifications(user_id,request_id,message,from_user_id) 
            VALUES(:userId,:requestId,:message,:from_userId)";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':userId',$userId,PDO::PARAM_INT);
        }else{
            $query = "INSERT INTO notifications(user_id,request_id,message,from_user_id) 
            VALUES((SELECT user_id from requests WHERE id = :requestId),:requestId,:message,:from_userId)";
            $stmt = $this->pdo->prepare($query);
        }
        
        $stmt->bindValue(':from_userId',$fromUserId,PDO::PARAM_INT);
        $stmt->bindValue(':requestId',$requestId,PDO::PARAM_INT);
        $stmt->bindValue(':message',$message,PDO::PARAM_STR);
        $stmt->execute();
    }

    public function sendNotificationAfterPostDeletetion(int $fromUserId, string $message,int $userId):void{
        $query = "INSERT INTO notifications(user_id,request_id,message,from_user_id) 
        VALUES(:userId,-1,:message,:from_userId)";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':userId',$userId,PDO::PARAM_INT);
        $stmt->bindValue(':from_userId',$fromUserId,PDO::PARAM_INT);
        $stmt->bindValue(':message',$message,PDO::PARAM_STR);
        $stmt->execute();
    }


    public function markNotificationAsViewed(int $notificationId):void{
        if ($this->pdo) {
            $query = "UPDATE notifications SET viewed = 1 WHERE id = :notificationId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":notificationId",$notificationId,PDO::PARAM_INT);
            $stmt->execute();
        }
    }


    public function checkNotifications(int $userId):void{
        if ($this->pdo) {
            $query = "SELECT notifications.id  FROM notifications 
            INNER JOIN users ON users.id = :userId
            WHERE notifications.viewed = 0 AND notifications.user_id = :userId";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            if ($stmt->execute()) {
                $totalNotifications = $stmt->fetchColumn();
                echo json_encode(['status'=> 1,"totalNotifications"=> $totalNotifications]);
            }else{
                throw new Exception("Error Processing Request");
            }
                
        }else{
            throw new Exception("Error Processing Request");
        }
    }
}