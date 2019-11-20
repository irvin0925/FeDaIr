<?php

function runDml($dml)
{
    global $connection;
    try {
        $result = $connection->getConexion()->query($dml);
        return $result;
    } catch (PDOException $ex) {
        return false;
    }
}


function getData($sql)
{
    global $connection;
    try {
        $result = $connection->getConexion()->query($sql);
        if ($result->num_rows > 0) {
            return $result;
        }
    } catch (PDOException $ex) {
        return false;
    }
}
