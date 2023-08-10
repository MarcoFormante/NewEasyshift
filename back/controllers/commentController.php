<?php 

namespace App\Controllers\CommentController;

use App\Models\CommentModel\CommentModel;
require_once '../models/CommentModel.php';
use Exception;

class CommentController{
//Send Comment to user Request ($userId,$requestId,$comment)
    public function sendComment(){
        if (isset($_POST["userId"]) && isset($_POST['requestId']) && isset($_POST['comment']) && isset($_POST['requestUserID'])) {
            $userId = $_POST['userId'];
            $requestId = $_POST['requestId'];
            $comment = $_POST['comment'];
            $requestUserId = $_POST['requestUserID'];
            $CommentModel = new CommentModel();
            $CommentModel->sendComment($userId,$requestId,$comment,$requestUserId);
        }else{
            throw new Exception("Error: It is no possible to send comments, try again");
        }
    }

//Get All Comments ($requestId)
    public function getComments(){
        if (isset($_POST['requestId'])) {
           $requestId = $_POST['requestId'];
           $CommentModel = new CommentModel();
            $CommentModel->getComments($requestId);
        }
    }

    

    public function deleteComment(){
        if (isset($_POST['commentId']) && isset($_POST['username']) && isset($_POST['requestId']) && isset($_POST['userId'])) {
            $requestId = $_POST['requestId'];
            $commentId = $_POST['commentId'];
            $username = $_POST['username'];
            $userId = $_POST['userId'];
            $CommentModel = new CommentModel();
            $CommentModel->deleteComment($requestId,$commentId,$username,$userId);
        }else{
            throw new Exception("Error: It is no possible to delete this comments, try again");
        }
    }

}