<?php 
namespace App\Models\RequestController;
use App\Models\RequestModel\RequestModel;
require_once '../models/RequestModel.php';
use Exception;
Class RequestController{
 
    //GET ALL REQUESTS OR USER REQUESTS ($target,$limit,$user_id = null)
    public function getAllRequests():void{
        if (isset($_POST['target']) && isset($_POST['limit']) && isset($_POST['limit2'])) {
                $limit = $_POST['limit'];
                $limit2 = $_POST['limit2'];
                $target = $_POST['target'];
                if ($target === "all") {
                    $RequestModel = new RequestModel();
                    $RequestModel->getAllRequests($limit,$limit2);
                }elseif($target === "user"){
                    $RequestModel = new RequestModel();
                    $this->getMyRequests($limit,$_POST['user_id']);
                }else{
                    throw new Exception("Error: Target is missing for this request");
                }
            }else{
                throw new Exception("Error: Error during request execution.");
            }
        }

//CREATES NEW REQUEST ($userId,$date,$shiftStart,$shiftEnd,$request)
    public function createRequest(){
        if(isset($_POST['userId']) && isset($_POST['date']) && isset($_POST['shiftStart']) && isset($_POST['shiftEnd']) && isset($_POST['request']) ){
            $userId = $_POST['userId'];
            $date = $_POST['date'];
            $shiftStart = $_POST['shiftStart'];
            $shiftEnd = $_POST['shiftEnd'];
            $request = $_POST['request'];
            $RequestModel = new RequestModel();
            $RequestModel->createRequest($userId,$date,$shiftStart,$shiftEnd,$request);
        }else{
           throw new Exception("Error: Request properties are missed, new request can't be created");
        }
    }



//GET USER REQUESTS ($limit,$user_id)
    public function getMyRequests(int $limit, int $userId):void{
        $RequestModel = new RequestModel();
        try {
            $RequestModel->getMyRequests($limit,$userId);
        } catch (Exception $e) {
            echo json_encode(["status"=>0 ,"message"=>$e->getMessage()]);
        }
     
    }

//GET locked user id in request entity
    public function getLockedUserid(){
        if (isset($_POST['requestId'])) {
            $RequestModel = new RequestModel();
            $RequestModel->getLockedUserid($_POST['requestId']);
        }
    }


    public function viewPost():void{
        if (isset($_POST['requestId'])) {
            $RequestModel = new RequestModel();
            $RequestModel->viewPost($_POST['requestId']);
        }
    }

    public function deleteRequest(){
        if (isset($_POST['requestId'])) {
            $RequestModel = new RequestModel();
            $RequestModel->deleteRequest($_POST['requestId']);
        }else{
            throw new Exception("Error Processing Request, request id is missing");
        }
    }
}