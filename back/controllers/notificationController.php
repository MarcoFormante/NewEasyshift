<?php 

namespace App\Controllers\NotificationController;

use App\Models\NotificationModel\NotificationModel;
use Exception;

require '../models/NotificationModel.php';

class NotificationController {

    public function getUserNotifications():void{
        if (isset($_POST['userId'])) {
            $NotificationModel = new NotificationModel();
            $NotificationModel->getUserNotifications($_POST['userId']);
        }else{
            //handle no userId
            throw new Exception("Error: it is no possible to get Notifications (userId problem)");
        }
    }


    public function deleteNotification(){
        if (isset($_POST['notificationId'])) {
            $NotificationModel = new NotificationModel();
            $NotificationModel->deleteNotification($_POST['notificationId']);
        }else{
            //handle no userId
            throw new Exception("Error: it is no possible to get Notifications (userId problem)");
        }
    }


    public function sendNotification(int $userId,int $requestId):void{
        $NotificationModel = new NotificationModel();
        $NotificationModel->sendNotification($userId,$requestId);
    }

    public function sendNotificationAfterPostDeletetion():void{
        if (isset($_POST['fromUserId']) && isset($_POST['requestId']) && isset($_POST['message']) && isset($_POST['userId'])) {
            $fromUserId = $_POST['fromUserId'];
            $requestId = $_POST['requestId'];
            $message = $_POST['message'];
            $userId = $_POST['userId'];
            $NotificationModel = new NotificationModel();
            $NotificationModel->sendNotificationAfterPostDeletetion($fromUserId,$requestId,$message,$userId);
        }
    }


    public function markNotificationAsViewed():void{
        if (isset($_POST['notificationId'])) {
            $notificationId = $_POST['notificationId'];
            $NotificationModel = new NotificationModel();
            $NotificationModel->markNotificationAsViewed($notificationId);
        }
    }
}