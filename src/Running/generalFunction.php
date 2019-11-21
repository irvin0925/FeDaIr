<?php

function isAccepted($usu, $pass)
{
    try {
        $sql = "select count(*) as valido from Usuario where usuario = $usu and contra = md5($pass)";
        return getData($sql)->num_rows >= 1;
    } catch (PDOException $ex) {
        return false;
    }
}
