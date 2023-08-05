<?php 
namespace App\Models\RequestController;
use App\Models\RequestModel\RequestModel;
require_once '../models/RequestModel.php';
Class RequestController{
 
    public function getAllRequests(int $limit,string $target,int $user_id = null):void{
        $RequestModel = new RequestModel();
        $RequestModel->getAllRequests($limit);
    }
}