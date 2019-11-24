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
        echo '{ "status":1 }';
        $session->setUser($dataPOST['user'], $dataPOST['pass']);
    } else {
        echo '{ "status":0 }';
    }
}


/*
if (empty($_SESSION['user'])) {
    echo 'http://' . $_SERVER['HTTP_HOST'] . '/Views/login.php';
} else {
    echo isAccepted($session->getUser(), $session->getPassword()) ? 'http://' . $_SERVER['HTTPS_HOST'] . '/Views/micuenta.php' : 'http://' . $_SERVER['HTTPS_HOST'] . '/Views/login.php';
} ?>" class="d-block text-white w-100 h-100">
<?php
if (empty($_SESSION['user'])) {
    echo 'Inciar sesion';
} else {
    echo isAccepted($session->getUser(), $session->getPassword()) ? 'Mi cuenta' : 'Iniciar sesion';
} ?></a></li>
*/
