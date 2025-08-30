<?php
    $title = '08- Oper Comparison';
    $description = 'Compare values and return boolean results';

    include 'template/header.php';

    echo "<section>";
?>
   
<table>
    <thead>
        <th>Operator</th>
        <th>Description</th>
        <th>Example</th>
    </thead>
    <tbody>
        <tr>
            <td>==</td>
            <td>Is Equal</td>
            <td><?php echo '5==8 | '; var_dump(5==8) ?></td>
        </tr>
        <tr>
            <td>!=</td>
            <td>Is Not Equal</td>
            <td><?php echo '5!=8 | '; var_dump(5!=8) ?></td>
        </tr>
        <tr>
            <td><></td>
            <td>Is Different</td>
            <td><?php echo '5<>8 | '; var_dump(5<>8) ?></td>
        </tr>
        <tr>
            <td>></td>
            <td>Is Greater Than</td>
            <td><?php echo '5>8 | '; var_dump(5>8) ?></td>
        </tr>
        <tr>
            <td><</td>
            <td>Is Less Than</td>
            <td><?php echo '5<8 | '; var_dump(5<8) ?></td>
        </tr>
        <tr>
            <td>>=</td>
            <td>Is Greater Than or Equal To</td>
            <td><?php echo '5>=8 | '; var_dump(5>=8) ?></td>
        </tr>
        <tr>
            <td><=</td>
            <td>Is Less Than or Equal To</td>
            <td><?php echo '5<=8 | '; var_dump(5<=8) ?></td>
        </tr>

    </tbody>
</table>     

<?php include 'template/footer.php';

