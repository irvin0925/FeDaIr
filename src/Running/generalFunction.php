<?php

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
