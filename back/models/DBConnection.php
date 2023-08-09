<?php 
namespace App\Models\DBConnection;
use PDO;
use PDOException;
use Exception;

trait DBConnection{
    
    private PDO $pdo;

    public function __construct(){
        require '../config/DB.php';
            try {
                $this->pdo = new PDO("mysql:host=$host;dbname=$dbName",$username,$password);
                 
            }catch (PDOException $e){
                throw new Exception($e->getMessage());
                exit();
            }
    }    
    
     
}
  

