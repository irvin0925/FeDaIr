<?php
include '../Models/models.php';
include '../Running/dataBaseGeneral.php';
include '../Running/generalFunction.php';
$connection = new Connection();
$session = new Session();
$dataPOST = $_POST;
$dataGET = $_GET;

/* API LOGIN*/
if (isset($dataPOST['login'])) {
    if ($dataPOST['login'] == '1') {
        if (isAccepted($dataPOST['user'], $dataPOST['pass'])) {
            $session->setUser($dataPOST['pass'], $dataPOST['user']);
            echo '{ "status":1 }';
        } else {
            echo '{ "status":0 }';
        }
    } else if ($dataPOST['login'] == '2') {
        if (!empty($_SESSION['user']) && !empty($_SESSION['pass'])) {
            if (isAccepted($session->getUser(), $session->getPassword())) {
                echo '{ "accept":1 }';
            } else {
                echo '{ "accept":0 }';
            }
        } else {
            echo '{ "accept":0 }';
        }
    }
} else if (isset($dataPOST['product'])) {
    if ($dataPOST['product'] == '1') {
        $filter = ['filter' => $dataPOST['filter'], 'category' => ''];
        echo showProducts($filter);
    } else if ($dataPOST['product'] == '2') {
        $category = ' and (';
        for ($i = 0; $i < $dataPOST['cant']; $i++) {
            if ($category == ' and (') {
                $category .= 'idCategoriaProducto = ' . $dataPOST['category' . $i];
            } else {
                $category .= ' or idCategoriaProducto = ' . $dataPOST['category' . $i];
            }
        }
        $category .= ')';
        $filter = ['filter' => $dataPOST['filter'], 'category' => $category];
        echo showProducts($filter);
    }
} else if (isset($dataPOST['category']) && $dataPOST['category'] == '1') {
    echo showCategories($dataPOST['filter']);
} else if (isset($dataPOST['addCart'])) {
    if ($dataPOST['addCart'] == '1') {
        $product = [
            "cant" => $dataPOST['cant'],
            "idProduct" => $dataPOST['idProduct']
        ];
        if (addToCart($product)) {
            echo '{ "add": 1 }';
        } else {
            echo '{ "add": 0 }';
        }
        //addCart=1&idProducto=

    } else { }
}
