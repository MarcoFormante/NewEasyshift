<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type,Authorization');

use App\Models\RequestController\RequestController;
require_once '../controllers/requestController.php';



if (isset($_POST['action'])) {
   $action =  $_POST['action'];
   switch ($action) {

    //Get All Requests (All Requests or User Requests)
    case "getAllRequests":
            $limit = $_POST['limit'];
            $target = $_POST['target'];
            $RequestController = new RequestController();
            try {
                if ($target === "user") {
                    $RequestController->getAllRequests($limit,$target,$user_id = $_POST['user_id']);
                }elseif($target === "all"){
                    $RequestController->getAllRequests($limit,$target,$user_id = null);
                }
            } catch (Exception $e) {
                echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]);
            }
    break;

    case "newRequest" :
       $RequestController =  $RequestController = new RequestController();
       try {
        $RequestController->createRequest();
       } catch (Exception $e) {
        echo json_encode(["status"=>0,"message"=>$e->getMessage()]);
       }
      
    break;

    default:
            echo json_encode(["status"=> 0 ,"message" => "Error: Action is Required"]);
        break;
   }
}


