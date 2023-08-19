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


    public function sendNotification( $userId = null,int $fromUserId,int $requestId = null,string $message):void{
        $NotificationModel = new NotificationModel();
        $NotificationModel->sendNotification($userId,$fromUserId,$requestId,$message);
    }

    public function sendNotificationAfterPostDeletetion():void{
        if (isset($_POST['fromUserId'])  && isset($_POST['message']) && isset($_POST['userId'])) {
            $fromUserId = $_POST['fromUserId'];
            $message = $_POST['message'];  
            $userId = $_POST['userId'];
            $NotificationModel = new NotificationModel();
            $NotificationModel->sendNotificationAfterPostDeletetion($fromUserId,$message,$userId);
        }else{
            throw new Exception("Error Processing Request");
        
        }
    }


    public function markNotificationAsViewed():void{
        if (isset($_POST['notificationId'])) {
            $notificationId = $_POST['notificationId'];
            $NotificationModel = new NotificationModel();
            $NotificationModel->markNotificationAsViewed($notificationId);
        }
    }


    public function checkNotifications():void{
        if (isset($_POST['userId'])) {
            $userId = $_POST['userId'];
            $NotificationModel = new NotificationModel();
            $NotificationModel->checkNotifications($userId);
        }
    }
}