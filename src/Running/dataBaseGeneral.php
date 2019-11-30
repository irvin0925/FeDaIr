<?php

function runDml($dml)
{
    global $connection;
    try {
        $result = $connection->getConexion()->query($dml);
        return $result;
    } catch (mysqli_sql_exception $ex) {
        echo $ex;
        return false;
    }
}


function getData($sql)
{
    global $connection;
    try {
        $result = $connection->getConexion()->query($sql);
        if ($result != null && $result->num_rows > 0) {
            return $result;
        }
    } catch (mysqli_sql_exception $ex) {
        return false;
    }
}
