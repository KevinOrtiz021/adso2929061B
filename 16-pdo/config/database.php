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
                $_SESSION['error'] = "Usuario o contraseña incorrectos.";
                return false;
            }

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    // List Pets
    function listPets($conx) {
        try {
            $sql = "SELECT p.id AS id,
                           p.name AS name,
                           p.photo AS photo,
                           s.name AS specie,
                           b.name AS breed
                    FROM pets AS p,
                         species AS s,
                         breeds AS b
                    WHERE s.id = p.specie_id
                    AND b.id = p.breed_id";
            $stmt = $conx->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
 