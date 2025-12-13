<?php
class Model extends DataBase
{
    protected $db;

    public function __construct()
    {
        $this->db = DataBase::connect();
    }

    // Métodos para Pokémon
    public function listPokemons()
    {
        $stmt = $this->db->query("SELECT * FROM pokemons ORDER BY id ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findPokemon($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM pokemons WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function insertPokemon($data)
    {
        $sql = "INSERT INTO pokemons (name, type, strength, staming, speed, accuracy, trainer_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
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

    public function updatePokemon($id, $data)
    {
        $sql = "UPDATE pokemons SET name=?, type=?, strength=?, staming=?, speed=?, accuracy=?, trainer_id=?
                WHERE id=?";
        $stmt = $this->db->prepare($sql);
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

    public function deletePokemon($id)
    {
        $stmt = $this->db->prepare("DELETE FROM pokemons WHERE id=?");
        return $stmt->execute([$id]);
    }

    public function getAllTypes()
    {
        return [
            'Water',
            'Fire',
            'Grass',
            'Electric',
            'Normal',
            'Poison',
            'Ghost',
            'Dragon',
            'Rock',
            'Psychic',
            'Fighting',
            'Flying',
            'Ground',
            'Ice',
            'Bug',
            'Steel',
            'Dark',
            'Fairy'
        ];
    }

    public function getBadgeClass($type)
    {
        $badges = [
            'Water' => 'badge-info',
            'Fire' => 'badge-error',
            'Grass' => 'badge-success',
            'Electric' => 'badge-warning',
            'Normal' => 'badge-ghost',
            'Poison' => 'badge-secondary',
            'Ghost' => 'badge-accent',
            'Dragon' => 'badge-primary',
            'Rock' => 'badge-neutral',
            'Psychic' => 'badge-secondary',
            'Fighting' => 'badge-error',
            'Flying' => 'badge-info',
            'Ground' => 'badge-warning',
            'Ice' => 'badge-info',
            'Bug' => 'badge-success',
            'Steel' => 'badge-neutral',
            'Dark' => 'badge-neutral',
            'Fairy' => 'badge-secondary'
        ];

        return $badges[$type] ?? 'badge-ghost';
    }

    public function getAllTrainers()
    {
        $stmt = $this->db->query("SELECT * FROM trainers ORDER BY id ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findTrainer($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM trainers WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function calculatePercentage($value)
    {
        $max_value = 1000;
        return min(($value / $max_value) * 100, 100);
    }
}
?>