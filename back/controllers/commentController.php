<?php 

namespace App\Controllers\CommentController;

use App\Models\CommentModel\CommentModel;
use Exception;

class CommentController{
//Send Comment to user Request
    public function sendComment(){
        if (isset($_POST["userId"]) && isset($_POST['requestId']) && isset($_POST['comment'])) {
            $userId = $_POST['userId'];
            $requestId = $_POST['requestId'];
            $comment = $_POST['comment'];
            $CommentModel = new CommentModel();
            $CommentModel->sendComment($userId,$requestId,$comment);
        }else{
            throw new Exception("Error: It is no possible to send comments, try again");
        }
    }


    public function getComments(){
        
    }

    

    public function deleteComment(){

    }

}