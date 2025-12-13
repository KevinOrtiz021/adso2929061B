<?php
// index.php - Sistema simple sin .htaccess
session_start();

// Configurar base path
$base_path = str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
define('BASE_PATH', $base_path . '/');

// Incluir archivos principales
require_once 'application/database.php';
require_once 'application/model.php';
require_once 'application/load.php';
require_once 'application/controller.php';

// Enrutamiento manual sin .htaccess
$request_uri = $_SERVER['REQUEST_URI'];
$script_name = $_SERVER['SCRIPT_NAME'];

// Remover el base path de la URI
$path = str_replace(dirname($script_name), '', $request_uri);
$path = trim($path, '/');

// Parsear la ruta
$segments = $path ? explode('/', $path) : [];

// Si la ruta contiene "index.php", manejarlo
if (!empty($segments) && $segments[0] == 'index.php') {
    array_shift($segments);
}

// Determinar acción e ID
$action = !empty($segments[0]) ? $segments[0] : 'index';
$id = !empty($segments[1]) ? $segments[1] : null;

// Mapear acciones del controlador
$controller = new Controller();

switch ($action) {
    case '':
    case 'index':
        $controller->index();
        break;
    case 'pokemon':
        if ($id) {
            $controller->show($id);
        } else {
            $controller->index();
        }
        break;
    case 'create':
        $controller->create();
        break;
    case 'store':
        $controller->store();
        break;
    case 'edit':
        $controller->edit($id);
        break;
    case 'update':
        $controller->update($id);
        break;
    case 'destroy':
        $controller->destroy($id);
        break;
    case 'show':
        $controller->show($id);
        break;
    default:
        // Si no es una acción reconocida, ver si es un ID
        if (is_numeric($action)) {
            $controller->show($action);
        } else {
            $controller->index();
        }
        break;
}
?>