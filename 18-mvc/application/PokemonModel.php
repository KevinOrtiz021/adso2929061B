<?php
require_once 'database.php';

class PokemonModel extends DataBase {

    public static function all() {
        $db = self::connect();
        $query = $db->query("SELECT * FROM pokemons ORDER BY id ASC");
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id) {
        $db = self::connect();
        $stmt = $db->prepare("SELECT * FROM pokemons WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function insert($data) {
        $db = self::connect();
        $sql = "INSERT INTO pokemons (name, type, strength, staming, speed, accuracy, trainer_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        return $stmt->execute([
            $data['name'],
            $data['type'],
            $data['strength'],
            $data['staming'],
            $data['speed'],
            $data['accuracy'],
            $data['trainer_id']
        ]);
    }

    public static function update($id, $data) {
        $db = self::connect();
        $sql = "UPDATE pokemons SET name=?, type=?, strength=?, staming=?, speed=?, accuracy=?, trainer_id=?
                WHERE id=?";
        $stmt = $db->prepare($sql);
        return $stmt->execute([
            $data['name'],
            $data['type'],
            $data['strength'],
            $data['staming'],
            $data['speed'],
            $data['accuracy'],
            $data['trainer_id'],
            $id
        ]);
    }

    public static function delete($id) {
        $db = self::connect();
        $stmt = $db->prepare("DELETE FROM pokemons WHERE id=?");
        return $stmt->execute([$id]);
    }
}
