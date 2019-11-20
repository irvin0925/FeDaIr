<?php

include './Models/models.php';
$connection = new Connection();
$connection->getConexion();
include './Running/dataBaseGeneral.php';

include './Views/Partials/headerClient.php';
?>

<?php

$sql = "select * from equipo";
foreach (getData($sql) as $row) {
    echo $row['idEquipo'] . $row['nombre'] . '<br>';
}

?>


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<?php
include './Views/Partials/footerClient.php';
