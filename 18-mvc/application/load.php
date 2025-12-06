<?php 

class Load {
    public function view($nameView, $data = null) {
        if ($data !== null)
            extract(['data' => $data]);

        include 'views/' . $nameView;
    }
}