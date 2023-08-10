<?php 

namespace App\Models\NotificationModel;


use App\Models\DBConnection\DBConnection;
use Exception;
use PDO;

require_once 'DBConnection.php';
class NotificationModel {
    use DBConnection;

    public function getUserNotifications(int $userId):void{
        if ($this->pdo) {
            $query = "SELECT users.username,notifications.id,user_id,request_id,message,viewed,from_user_id FROM notifications
             INNER JOIN users ON users.id  = notifications.from_user_id
             WHERE user_id = :userId";
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
}