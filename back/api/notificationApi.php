<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type');

use App\Controllers\NotificationController\NotificationController;
require '../controllers/notificationController.php';


if (isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'getUserNotifications':
            try {
                $notificationController = new NotificationController();
                $notificationController->getUserNotifications();
            } catch (Exception $e) {
                echo json_encode(['status'=>0 ,"message"=> $e->getMessage()]);
            }
        break; 

        case 'deleteNotification':
            try {
                $notificationController = new NotificationController();
                $notificationController->deleteNotification();
            } catch (Exception $e) {
                echo json_encode(['status'=>0 ,"message"=> $e->getMessage()]);
            }
            break;

            case 'markNotificationAsViewed':
                try {
                    $notificationController = new NotificationController();
                    $notificationController->markNotificationAsViewed();
                } catch (Exception $e) {
                    echo json_encode(['status'=>0 ,"message"=> $e->getMessage()]);
                }
                break;

                
                case 'sendNotificationAfterPostDeletetion':
                        // try {
                        //     $notificationController = new NotificationController();
                        //     $notificationController->sendNotificationAfterPostDeletetion();
                        // } catch (Exception $e) {
                        //     echo json_encode(['status'=>0 ,"message"=> $e->getMessage()]);
                        // }
                    break;

                    
                    case 'checkNotifications':
                        try {
                            $notificationController = new NotificationController();
                            $notificationController->checkNotifications();
                        } catch (Exception $e) {
                            echo json_encode(['status'=>0 ,"message"=> $e->getMessage()]);
                        }
                        break;
                    
        default:
            echo json_encode(['status'=>0 ,"message"=> "An Action is required"]);
            break;
    }
}

