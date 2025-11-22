<?php
$title = '06-extends';
$description = 'Keyword for a class to inherit properties and methods from another.';
include 'template/header.php';
echo "<section>";

class Operation {
    protected $num1;
    protected $num2;

    public function __construct($num1, $num2) {
        $this->num1 = $num1;
        $this->num2 = $num2;
    }
}
class Addition extends Operation{
    public function showResult(){
        $result = $this->num1 + $this->num2;
        return "<ul>
                    <li>{$this->num1}+ {$this->num2} = {$result}
                    </li>
                </ul>";
    }
}
class Subtraction extends Operation{
    public function showResult(){
        $result = $this->num1 - $this->num2;
        return "<ul>
                    <li>{$this->num1}- {$this->num2} = {$result}
                    </li>
                </ul>";
    }
}
class Product extends Operation{
    public function showResult(){
        $result = $this->num1 * $this->num2;
        return "<ul>
                    <li>{$this->num1}* {$this->num2} = {$result}
                    </li>
                </ul>";
    }
}
class Division extends Operation{
    public function showResult(){
        $result = $this->num1 / $this->num2;
        return "<ul>
                    <li>{$this->num1}/ {$this->num2} = {$result}
                    </li>
                </ul>";
    }
}
class Pow extends Operation{
    public function showResult(){
        $result = $this->num1 ** $this->num2;
        return "<ul>
                    <li>{$this->num1}** {$this->num2} = {$result}
                    </li>
                </ul>";
    }
}
$op1 = new Addition(512, 256);
echo $op1->showResult();

$op2 = new Subtraction(512, 256);
echo $op2->showResult();

$op3 = new Product(32, 32);
echo $op3->showResult();

$op4 = new Division(2048, 512);
echo $op4->showResult();

$op5 = new Pow(16, 2);
echo $op5->showResult();
include 'template/footer.php';
