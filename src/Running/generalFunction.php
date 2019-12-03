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
    $sql = "select * from CategoriaProducto where" .
        " descripcion like '%" . $filter . "%'";
    return getJson($sql);
}

function showProducts($filter)
{
    global $session;
    $sqlPlus = '';
    if (!empty($_SESSION['idUser'])) {
        $sqlPlus = ',(select count(*) from carrito where idProducto = p.idProducto and idUsuario = ' . $session->getIdUser() . ') as onCart';
    }
    $sql = "select idProducto,nombre,descripcion,precio,cantidadDisponible,cantCompras,urlImg,idCategoriaProducto " . $sqlPlus . " from Producto p where" .
        " (nombre like '%" . $filter['filter'] . "%'
             or descripcion like '%" . $filter['filter'] .
        "%' or precio like '%" . $filter['filter'] . "%') " . $filter['category'];
    return getJson($sql);
}

function addToCart($product)
{
    try {
        global $session;
        if (cantExistencia($product) >= $product['cant']) {
            $values = $product['idProduct'] . "," . $session->getIdUser() . ',' . $product['cant'];
            $dml = "insert into Carrito (idProducto,idUsuario,cant) values ($values)";
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
    global $session;
    $sql = "select idLineaCarrito,p.idProducto as idProducto,urlImg,nombre,cant,precio 
    from carrito c, producto p where (c.idProducto = p.idProducto) and idUsuario = " . $session->getIdUser();
    return getJson($sql);
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

//Facturacion
function beforePurchase()
{
    try {
        global $session;
        $sql = "select 
        round(sum(p.precio * c.cant),2) as subTotal,
        round((sum(p.precio * c.cant)* 0.13),2) as iva,
        round((sum(p.precio * c.cant)* 0.13) + sum(p.precio * c.cant),2) as total
        from Carrito c, Producto p where (c.idProducto = p.idProducto) and idUsuario = " . $session->getIdUser();
        return getJson($sql);
    } catch (mysqli_sql_exception $th) {
        return json_encode(['subTotal' => -1, 'iva' => -1, 'total' => -1]);
    }
}

function moveToPurchase()
{
    try {
        global $session;
        $dml = "insert into FacturaDetalle (idFacturaEncabezado,cant,idProducto) 
            select (select max(idFacturaEncabezado) from FacturaEncabezado where idUsuario = " . $session->getIdUser() . "),cant,idProducto
            from Carrito where idUsuario = " . $session->getIdUser();
        $result = runDml($dml);
        if ($result) {
            if (updateInvetary()) {
                $dml = "delete from Carrito where idLineaCarrito > 0 and idUsuario = " . $session->getIdUser();
                $result = runDml($dml);
                return $result;
            }
        }
        return false;
    } catch (mysqli_sql_exception $th) {
        return false;
    }
}

function updateInvetary()
{
    try {
        $json = showCarrito();
        $carrito = json_decode($json, true);
        foreach ($carrito as $item) {
            $json = cantInventoryByProduct($item);
            $current = json_decode($json, true);
            $dml = "update Producto set cantidadDisponible = " . ($current[0]['cantidadDisponible'] - $item['cant']) . ', cantCompras = ' . ($current[0]['cantCompras'] + $item['cant']) . ' where idProducto = ' . $item['idProducto'];
            runDml($dml);
        }
        return true;
    } catch (mysqli_sql_exception $th) {
        return false;
    }
}

function cantInventoryByProduct($product)
{
    try {
        $sql = "select cantidadDisponible,cantCompras from Producto where idProducto = " . $product['idProducto'];
        return getJson($sql);
    } catch (mysqli_sql_exception $ex) {
        return null;
    }
}

function makePurchase($filter)
{
    try {
        global $session;
        $formaPago = $filter['idFormaPago'];
        if ($filter['idFormaPago'] < 0) {
            $formaPago = 'null';
        }
        $json = beforePurchase();
        $calculos = json_decode($json, true);
        if ($calculos[0]['subTotal'] != '-1' && $calculos[0]['total'] != '-1' && $calculos[0]['iva'] != '-1') {
            $dml = "insert into FacturaEncabezado (fecha,subTotal,total,impuesto,
                idUsuario,idFormapago,referencia)
                values (CURDATE()," . $calculos[0]['subTotal'] . ',' . $calculos[0]['total'] . ',' . $calculos[0]['iva'] .
                ',' . $session->getIdUser() . ',' . $formaPago . ',' . $filter['referencia'] . ')';
            $result = runDml($dml);
            if ($result) {
                $result = moveToPurchase();
                return $result;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (mysqli_sql_exception $th) {
        return false;
    }
}


/*TEMP*/

function listCards()
{
    global $session;
    $sql = "select idFormaPago,right(numeroTarjeta,4) as numeroTarjeta from formaPago where idUsuario = " . $session->getIdUser();
    return getJson($sql);
}
