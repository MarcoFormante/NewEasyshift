<?php 
namespace App\Models\RequestController;
use App\Models\RequestModel\RequestModel;
require_once '../models/RequestModel.php';
use Exception;
Class RequestController{
 
    public function getAllRequests(int $limit,string $target,int $user_id = null):void{
        $RequestModel = new RequestModel();
        $RequestModel->getAllRequests($limit);
    }

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
}