<?php
class Load
{
    public function view($nameView, $data = null)
    {
        if ($data !== null) {
            extract($data);
        }
        $viewPath = __DIR__ . '/../views/' . $nameView;

        if (file_exists($viewPath)) {
            include $viewPath;
        } else {
            die("View not found: " . $viewPath);
        }
    }
}
?>