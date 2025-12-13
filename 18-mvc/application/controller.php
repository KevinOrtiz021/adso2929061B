<?php
class Controller
{
    public $load;
    public $model;

    public function __construct()
    {
        $this->load = new Load();
        $this->model = new Model();
    }

    public function index()
    {
        $pokemons = $this->model->listPokemons();
        $this->load->view('welcome.php', $pokemons);
    }

    public function show($id = null)
    {
        if (!$id) {
            header('Location: ' . BASE_PATH);
            exit;
        }

        $pokemon = $this->model->findPokemon($id);
        if ($pokemon) {
            $this->load->view('show.php', $pokemon);
        } else {
            $this->notFound();
        }
    }

    public function create()
    {
        $types = $this->model->getAllTypes();
        $trainers = $this->model->getAllTrainers();

        $data = [
            'types' => $types,
            'trainers' => $trainers
        ];

        $this->load->view('add.php', $data);
    }

    public function store()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'name' => $_POST['name'],
                'type' => $_POST['type'],
                'strength' => $_POST['strength'],
                'staming' => $_POST['staming'],
                'speed' => $_POST['speed'],
                'accuracy' => $_POST['accuracy'],
                'trainer_id' => $_POST['trainer_id']
            ];

            if ($this->model->insertPokemon($data)) {
                header('Location: ' . BASE_PATH);
                exit;
            }
        }
        header('Location: ' . BASE_PATH . 'create');
        exit;
    }

    public function edit($id = null)
    {
        if (!$id) {
            header('Location: ' . BASE_PATH);
            exit;
        }

        $pokemon = $this->model->findPokemon($id);
        if ($pokemon) {
            $types = $this->model->getAllTypes();
            $trainers = $this->model->getAllTrainers();

            $data = [
                'pokemon' => $pokemon,
                'types' => $types,
                'trainers' => $trainers
            ];

            $this->load->view('edit.php', $data);
        } else {
            $this->notFound();
        }
    }

    public function update($id = null)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $id) {
            $data = [
                'name' => $_POST['name'],
                'type' => $_POST['type'],
                'strength' => $_POST['strength'],
                'staming' => $_POST['staming'],
                'speed' => $_POST['speed'],
                'accuracy' => $_POST['accuracy'],
                'trainer_id' => $_POST['trainer_id']
            ];

            if ($this->model->updatePokemon($id, $data)) {
                header('Location: ' . BASE_PATH . 'show/' . $id);
                exit;
            }
        }
        header('Location: ' . BASE_PATH);
        exit;
    }

    public function destroy($id = null)
    {
        if ($id) {
            $this->model->deletePokemon($id);
        }
        header('Location: ' . BASE_PATH);
        exit;
    }

    private function notFound()
    {
        http_response_code(404);
        echo '<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">';
        echo '<div class="text-center">';
        echo '<h1 class="text-4xl font-bold text-error mb-4">404 - Pokémon no encontrado</h1>';
        echo '<a href="' . BASE_PATH . '" class="btn btn-primary">Volver al inicio</a>';
        echo '</div></div>';
        exit;
    }
}
?>