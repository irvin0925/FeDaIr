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
