<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

use App\Models\RequestModel\RequestModel;


if (isset($_GET["getAllRequests"]) && isset($_POST['limit'])) {
    $request = new RequestModel();
    $request->getAllRequests($_POST['limit']);
}
