<?php
    // COnnection to the database
    try {
        $conx = new PDO("mysql:host=$host;dbname=$bdname", $user, $pass);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    
    // Login
    function login($email, $password, $conx){
        try {
            $sql = "SELECT * 
                    FROM users 
                    WHERE email= :email 
                    AND password= :password;
                    LIMIT 1";
            $stmt = $conx->prepare($sql);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $password);
            $stmt->execute();
            
            if($stmt->rowCount() > 0){
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $_SESSION['uid'] = $user['id'];
                return true;
            } else {
                $_SESSION['error'] = "User not registered!";
                return false;
            }

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
