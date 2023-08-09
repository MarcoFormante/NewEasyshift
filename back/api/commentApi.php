<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type');

use App\Controllers\CommentController\CommentController;
require_once '../controllers/commentController.php';

if (isset($_POST['action'])) {
    $action= $_POST['action'];
    switch ($action) {
        case 'sendComment':
            try {
                $CommentController = new CommentController();
                $CommentController->sendComment();
            } catch (Exception $e) {
               echo json_encode(['status'=>0,'message'=>$e->getMessage()]);
            }
            break;

            case 'getComments':
                try {
                    $CommentController = new CommentController();
                    $CommentController->getComments();
                } catch (Exception $e) {
                   echo json_encode(['status'=>0,'message'=>$e->getMessage()]);
                }
                break;
        
        default:
            echo json_encode(['status'=> 0, "message"=> "Error: Action is required"]);
            break;
    }
}