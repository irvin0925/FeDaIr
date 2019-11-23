<?php
include '../Running/dataBaseGeneral.php';

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
