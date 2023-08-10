<?php 
namespace App\Models\CommentModel;
use Exception;
use PDO;
use App\Models\DBConnection\DBConnection;
use App\Controllers\NotificationController\NotificationController;
require_once '../controllers/notificationController.php';
require_once 'DBConnection.php';
class CommentModel{
    use DBConnection;

  //  GET COMMENTS
        public function getComments(int $requestId){
            if ($this->pdo) {
                $query = "SELECT comments.id,comments.request_id,comments.comment,users.username,users.id as user_id,users.role_id FROM comments
                INNER JOIN users ON users.id = comments.user_id
                 WHERE comments.request_id = :requestId";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(":requestId",$requestId,PDO::PARAM_INT);
                if ($stmt->execute()) {
                    $comments = [];
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $comments[] = $row;
                    }
                    echo json_encode(['status'=>1 ,"rowCount" =>$stmt->rowCount(),"comments" => $comments]);
                   
                }else{
                    throw new Exception("Error: it is no possible to get comments");
                }
            }
        }

    
    // SEND COMMENT 
        public function sendComment(int $userId,int $requestId,string $comment,int $requestUserId){
            if ($this->pdo) {
                $query= "INSERT INTO comments(user_id,request_id,comment) VALUES(:userId,:requestId,:comment)";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':userId',$userId,PDO::PARAM_INT);
                $stmt->bindValue(':requestId',$requestId,PDO::PARAM_INT);
                $stmt->bindValue(':comment',$comment,PDO::PARAM_STR);
                if ($stmt->execute()) {
                    echo json_encode(['status'=>1,'message'=>"The comment has been sent",'commentId'=>$this->pdo->lastInsertId()]);

                  //SEND NOTIFICATION
                    if ($userId !== $requestUserId) {
                        $notificationController =  new NotificationController();
                        $notificationController->sendNotification($userId,$requestId);
                    }
                   
                }else{
                    throw new Exception("Error: it is no possible to execute your request");
                }
            }else{
                throw new Exception("Error: It is no possible to send comments. Unable to access the database");
            }
        }
        

// DELETE COMMENT
        public function deleteComment(int $requestId,int $commentId,string $username,int $userId){
            if ($this->pdo) {
                $query="DELETE FROM comments WHERE id = :commentId ";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':commentId',$commentId,PDO::PARAM_INT);
                if ($stmt->execute()) {
                    echo json_encode(['status'=> 1,'message'=>"The comment has been deleted"]);
                }else{
                    throw new Exception("Error: it is no possible to execute your request");
                }
            }else{
                throw new Exception("Error: It is no possible to delete the comment. Unable to access the database");
            }
        }
    
    }