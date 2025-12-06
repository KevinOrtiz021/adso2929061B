<?php

class Controller
{

    public $load;

    public function __construct()
    {
        $this->load = new Load;

        // Obtener la acción desde la URL
        $action = $_GET['action'] ?? 'home';

        switch ($action) {
            case 'add':
                $this->load->view('add.php');
                break;

            case 'insert':
                require_once 'PokemonModel.php';
                PokemonModel::insert($_POST);
                header("Location: index.php");
                break;

            case 'show':
                require_once 'PokemonModel.php';
                $data = PokemonModel::find($_GET['id']);
                $this->load->view('show.php', $data);
                break;

            case 'edit':
                require_once 'PokemonModel.php';
                $data = PokemonModel::find($_GET['id']);
                $this->load->view('edit.php', $data);
                break;

            case 'update':
                require_once 'PokemonModel.php';
                PokemonModel::update($_POST['id'], $_POST);
                header("Location: index.php");
                break;

            case 'delete':
                require_once 'PokemonModel.php';
                PokemonModel::delete($_GET['id']);
                header("Location: index.php");
                break;

            default:
                require_once 'PokemonModel.php';
                $pokemons = PokemonModel::all();
                $this->load->view('welcome.php', $pokemons);
                break;
        }
    }
}
