<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:Content-Type');

use App\Models\RequestController\RequestController;
require_once '../controllers/requestController.php';


if (isset($_POST['action'])) {
   $action =  $_POST['action'];

   switch ($action) {
    //Get All Requests (All Requests or User Requests)
    case "getAllRequests":
            $RequestController = new RequestController();
            try {
                $RequestController->getAllRequests(); 
            } catch (Exception $e) {
                echo json_encode(["status"=> 0 ,"message" => $e->getMessage()]);
            }
    break;

//Create new Request
    case "newRequest" :
        $RequestController = new RequestController();
        try {
            $RequestController->createRequest();
        } catch (Exception $e) {
            echo json_encode(["status"=>0,"message"=>$e->getMessage()]);
        }
    break;


    case "getLockedUserId" :
            $RequestController = new RequestController();
            try {
            $RequestController->getLockedUserid();
            } catch (Exception $e) {
            echo json_encode(["status"=>0,"message"=>$e->getMessage()]);
            }
     break;

    

    default:
            echo json_encode(["status"=> 0 ,"message" => "Error: Action is Required"]);
        break;
   }
}else{
    echo json_encode(["status"=> 0 ,"message" => "Error: Action is Required"]);
}


