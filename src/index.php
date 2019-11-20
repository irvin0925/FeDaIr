<?php

include './Models/models.php';
$connection = new Connection();
$connection->getConexion();
include './Running/dataBaseGeneral.php';

include './Views/Partials/headerClient.php';

$data = $_POST;
if (isset($data['save'])) {
    $values = "'" . $data['nombre'] . "'," . $data['puntos'] . ',' . $data['hacks'];
    $dml = "insert into equipo (nombre,puntos,hacks) values ($values)";
    $result = runDml($dml);
    echo $result;
}




include './Views/temp.php';
?>

<table class=" d-block table table-dark wpx-50">
    <thead>
        <th>#</th>
        <th>Nombre</th>
        <th>Puntos</th>
        <th>Hacks</th>
    </thead>
    <tbody>
        <?php
        $sql = "select * from equipo";
        foreach (getData($sql) as $row) {
            echo '<tr>';
            echo '<td class="table-id">' . $row['idEquipo'] . '</td>';
            echo '<td>' . $row['nombre'] . '</td>';
            echo '<td>' . $row['puntos'] . '</td>';
            echo '<td>' . $row['hacks'] . '</td>';
            echo '</tr>';
        }
        ?>
    </tbody>
</table>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<?php
$connection->closeConnection();
include './Views/Partials/footerClient.php';
