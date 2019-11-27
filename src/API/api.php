<?php
include '../Models/models.php';
include '../Running/dataBaseGeneral.php';
include '../Running/generalFunction.php';
$connection = new Connection();
$session = new Session();
$dataPOST = $_POST;
$dataGET = $_GET;

/* API LOGIN*/
if (isset($dataPOST['login']) && $dataPOST['login'] == '1') {
    if (isAccepted($dataPOST['user'], $dataPOST['pass'])) {
        $session->setUser($dataPOST['user'], $dataPOST['pass']);
        echo '{ "status":1 }';
    } else {
        echo '{ "status":0 }';
    }
} else if (isset($dataPOST['product'])) {
    if ($dataPOST['product'] == '1') {
        echo showProducts($dataPOST['filter']);
    }
}
