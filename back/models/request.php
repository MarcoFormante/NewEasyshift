<?php 
require_once 'DBConnection.php';


Class Request{
use DBConnection;

    public function getAllRequests(int $limit){
        if ($this->pdo) {
            $query = "SELECT * FROM requests 
            RIGHT JOIN users 
            ON users.id = requests.user_id 
            LIMIT :limit,10" ; 

            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":limit",$limit,PDO::PARAM_INT);
            
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        echo $row;
                   }
                }else{
                    //handle zero requests
                }
            }else{
                //handle not execute
            }
        }else{
            //Handle Error PDO
        }
    }
}