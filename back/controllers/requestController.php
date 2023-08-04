<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

require_once '../models/request.php';

if (isset($_GET["getAllRequests"]) && isset($_POST['limit'])) {
    $request = new Request();
    $request->getAllRequests($_POST['limit']);
}
