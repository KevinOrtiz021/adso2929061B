<?php
$title = '01-Class';
$description = 'Blueprint for creating objects with shared properties and behaviors.';
include 'template/header.php';
echo '<section>';

class Vehicle{
    # Attributes 
    public $brand;
    public $refer;
    public $color;
    public $model;

    # Methods
    public function setAttributes($b, $r, $c, $m) {
        $this->brand = $b;
        $this->refer = $r;
        $this->color = $c;
        $this->model = $m;
    }
    public function getAttributes(){
        return "<ul>
                    <li>Brand: $this->brand</li>
                    <li>Refer: $this->refer</li>
                    <li>Color: $this->color</li>
                    <li>Model: $this->model</li>
                </ul>";
    }
}

$vh1 = new Vehicle;
$vh1->setAttributes('Volkswagen', 'Golf', 'Black', 2020);
echo $vh1->getAttributes();

$vh2 = new Vehicle;
$vh2->setAttributes('Nissan', 'Murano', 'Black', 2022);
$vh2->refer = 'GTR R33';
echo $vh2->getAttributes();

$vh3 = new Vehicle;
$vh3->brand = 'lamborghini';
$vh3->refer = 'SVJ';
$vh3->color = 'Green';
$vh3->model = 2021;
echo $vh3->getAttributes();
include 'template/footer.php';
