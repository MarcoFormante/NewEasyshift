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
}