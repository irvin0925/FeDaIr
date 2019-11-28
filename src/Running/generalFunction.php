<?php

/* Login */
function isAccepted($user, $pass)
{
    try {
        global $session;
        $sql = "select count(*) as valido,idUsuario from Usuario where usuario = '$user' and contra = md5('$pass') group by idUsuario";
        $result = getData($sql);
        if ($result != null) {
            if ($result->num_rows >= 1) {
                foreach ($result as $data) {
                    $session->setIdUser($data['idUsuario']);
                    return $data['valido'];
                }
            }
        }
        return false;
    } catch (PDOException $ex) {
        return false;
    }
}

/* Productos */
function showCategories($filter)
{
    try {
        $sql = "select * from CategoriaProducto where" .
            " descripcion like '%" . $filter . "%'";
        $result = getData($sql);
        $json = [];
        if ($result != null && $result->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $json[] = $row;
            }
        }
        return json_encode($json);
    } catch (PDOException $ex) {
        return "false";
    }
}

function showProducts($filter)
{
    try {
        global $session;
        $sqlPlus = '';
        if (!empty($_SESSION['idUser'])) {
            $sqlPlus = ',(select count(*) from carrito where idProducto = p.idProducto and idUsuario = ' . $session->getIdUser() . ') as onCart';
        }
        $sql = "select idProducto,nombre,descripcion,precio,cantidadDisponible,cantCompras,urlImg,idCategoriaProducto " . $sqlPlus . " from Producto p where" .
            " (nombre like '%" . $filter['filter'] . "%'
             or descripcion like '%" . $filter['filter'] .
            "%' or precio like '%" . $filter['filter'] . "%') " . $filter['category'];
        $result = getData($sql);
        $json = [];
        if ($result != null && $result->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $json[] = $row;
            }
        }
        return json_encode($json);
    } catch (PDOException $ex) {
        return "false";
    }
}

function addToCart($product)
{
    try {
        global $session;
        if (cantExistencia($product) >= $product['cant']) {
            $dml = '';
            if (alreadyOnCart($product)) {
                $values = $product['idProduct'] . "," . $session->getIdUser() . ',' . $product['cant'];
                $dml = "update Carrito set ";
            } else {
                $values = $product['idProduct'] . "," . $session->getIdUser() . ',' . $product['cant'];
                $dml = "insert into Carrito (idProducto,idUsuario,cant) values ($values)";
            }
            $result = runDml($dml);
            return $result;
        }
        return false;
    } catch (PDOException $ex) {
        return false;
    }
}

function alreadyOnCart($product)
{
    try {
        global $session;
        $sql = "select count(*) as alreadyOnCart from Carrito where idUsuario = " . $session->getIdUser() . " and idProducto = " . $product['idProduct'];
        $result = getData($sql);
        if ($result != null) {
            if ($result->num_rows >= 1) {
                foreach ($result as $data) {
                    return $data['alreadyOnCart'] == 1;
                }
            }
        }
        return false;
    } catch (PDOException $ex) {
        return false;
    }
}

function cantExistencia($product)
{
    try {
        global $session;
        $sql = "select cantidadDisponible from Producto where idProducto = " . $product['idProduct'];
        $result = getData($sql);
        if ($result != null) {
            if ($result->num_rows >= 1) {
                foreach ($result as $data) {
                    return $data['cantidadDisponible'];
                }
            }
        }
        return 0;
    } catch (PDOException $ex) {
        return 0;
    }
}
