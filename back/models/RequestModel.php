<?php 
namespace App\Models\RequestModel;
require_once 'DBConnection.php';
use App\Models\DBConnection\DBConnection;
use PDO;

Class RequestModel{
use DBConnection;

    public function getAllRequests(int $limit){
        if ($this->pdo) {
            $query = "SELECT requests.id ,users.id AS user_id,users.username,users.role_id,date,shift_start,shift_end,request,created_on,locked_user_id,
			(SELECT COUNT(*) FROM comments WHERE comments.request_id = id) as total_comments
            FROM requests
            INNER JOIN users ON users.id = requests.user_id
            LIMIT :limit,6" ; 
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":limit",$limit,PDO::PARAM_INT);
            
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $requests = [];
                   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $requests[] = $row;
                   }
                   echo json_encode(["status"=>1 ,"request"=>$requests]);
                }else{
                    echo json_encode(["status"=>0 ,"request"=>"no data"]);
                }
            }else{
                //handle not execute
                echo "not execute";
            }
        }else{
            //Handle Error PDO
        }
    }
}