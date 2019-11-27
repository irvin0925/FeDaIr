<?php

/* Login */
function isAccepted($usu, $pass)
{
    try {
        $sql = "select count(*) as valido from Usuario where usuario = '$usu' and contra = md5('$pass')";
        $result = getData($sql);
        if ($result != null) {
            if ($result->num_rows >= 1) {
                foreach ($result as $data) {
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
function showProducts($filter)
{
    try {
        $sql = "select * from Producto where" .
            " nombre like '%" . $filter . "%'
             or descripcion like '%upper(" . $filter .
            ")' or precio like '%" . $filter . "%'";
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
