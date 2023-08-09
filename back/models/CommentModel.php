<?php 
namespace App\Models\CommentModel;
use Exception;
use PDO;
use App\Models\DBConnection\DBConnection;
require_once 'DBConnection.php';
class CommentModel{
    use DBConnection;
    
        public function getComments(int $requestId){
            if ($this->pdo) {
                $query = "SELECT * FROM comments WHERE request_id = :requestId";
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
        public function sendComment(int $userId,int $requestId,string $comment){
            if ($this->pdo) {
                $query= "INSERT INTO comments(user_id,request_id,comment) VALUES(:userId,:requestId,:comment)";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':userId',$userId,PDO::PARAM_INT);
                $stmt->bindValue(':requestId',$requestId,PDO::PARAM_INT);
                $stmt->bindValue(':comment',$comment,PDO::PARAM_STR);
                if ($stmt->execute()) {
                    echo json_encode(['status'=>1,'message'=>"The comment has been sent"]);
                }else{
                    throw new Exception("Error: it is no possible to execute your request");
                }
            }else{
                throw new Exception("Error: It is no possible to send comments. Unable to access the database");
            }
        }

    
        public function deleteComment(){
    
        }
    
    }