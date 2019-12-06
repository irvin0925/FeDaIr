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
    } catch (mysqli_sql_exception $ex) {
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
    } catch (mysqli_sql_exception $ex) {
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
    } catch (mysqli_sql_exception $ex) {
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
    } catch (mysqli_sql_exception $ex) {
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
    } catch (mysqli_sql_exception $ex) {
        return false;
    }
}

function cantExistencia($product)
{
    try {
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
    } catch (mysqli_sql_exception $ex) {
        return 0;
    }
}

/*Carrrito */

function showCarrito()
{
    try {
        global $session;
        $sql = "select idLineaCarrito,p.idProducto as idProducto,urlImg,nombre,cant,precio 
        from carrito c, producto p where (c.idProducto = p.idProducto) and idUsuario = " . $session->getIdUser();
        $result = getData($sql);
        $json = [];
        if ($result != null) {
            if ($result->num_rows >= 1) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $json[] = $row;
                }
            }
            return json_encode($json);
        }
        return json_encode(["error" => 1]);
    } catch (mysqli_sql_exception $ex) {
        return json_encode(["error" => 1]);
    }
}

function deleteItemFromCart($filter)
{
    try {
        global $session;
        $dml = 'delete from Carrito where idProducto = ' . $filter['idProducto'] . ' and idUsuario =' . $session->getIdUser();
        $result = runDml($dml);
        return $result;
    } catch (mysqli_sql_exception $ex) {
        return false;
    }
}

function cambiarCantidad($filter)
{
    try {
        global $session;
        $prev = cantidadActual($filter);
        $cant = $filter['operation'] == '+' ? $prev + 1 : $prev - 1;
        if ($cant <= cantExistencia($filter) && $cant >= 1) {
            $dml = 'update Carrito set cant =' . $cant . ' where idProducto = ' . $filter['idProduct'] . ' and idUsuario =' . $session->getIdUser();
            $result = runDml($dml);
            if ($result) {
                return '{"msg":"","error":0,"cant":' . $cant . '}';
            } else {
                return '{"msg":"","error":0,"cant":' . $prev . '}';
            }
        } else {
            return '{"msg":"Cantidad en existencia insuficiente","error":1}';
        }
    } catch (mysqli_sql_exception $ex) {
        return '{ "msg":"Error al intentar cambiar la cantidad","error":1 }';
    }
}

function cantidadActual($filter)
{
    try {
        global $session;
        $sql = 'select cant from Carrito where idProducto = ' . $filter['idProduct'] . ' and idUsuario =' . $session->getIdUser();
        $result = getData($sql);
        if ($result != null) {
            if ($result->num_rows >= 1) {
                foreach ($result as $data) {
                    return $data['cant'];
                }
            }
        }
        return 0;
    } catch (mysqli_sql_exception $ex) {
        return 0;
    }
}

function addUser($user)
{
    try {
            $dml = '';
                $values = '"'.$user['cedula'] . '","' . $user['usuario'] . '",md5(' . $user['contra']. '),"' . $user['nombre']. '","' . $user['telefono']. '",' . '"1"';
                $dml = "insert into usuario (cedula,usuario,contra,nombre,telefono,idPerfil) values ($values)";
            $result = runDml($dml);
            return $result;

        return false;
    } catch (mysqli_sql_exception $ex) {
        return false;
    }
}

function addTarjeta($tarjeta)
{
    try {
        global $session;
            $dml = '';
                $values = '"'. $session->getIdUser() . '","' . $tarjeta['tarjeta'] . '","' . $tarjeta['tipo']. '"';
                $dml = "insert into formapago (idusuario,numerotarjeta,tipo) values ($values)";
            $result = runDml($dml);
            return $result;

        return false;
    } catch (mysqli_sql_exception $ex) {
        return false;
    }
}

function showTarjeta(){
        global $session;
        $sql = "select idFormaPago,numeroTarjeta, tipo from formaPago where idUsuario = " . $session->getIdUser();
        return getJson($sql);
}

function showHistorial(){
    global $session;
    $sql = "select * from facturaencabezado where idUsuario = " . $session->getIdUser();
    return getJson($sql);
}