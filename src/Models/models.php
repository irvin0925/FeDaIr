<?php

/* Conexion con la base de datos*/
class Connection
{

    private $host;
    private $usu;
    private $pass;
    private $url;
    private $conn;

    public function Connection()
    {
        $this->host = ['host' => 'sql308.epizy.com', 'dbname' => 'epiz_24797336_fedair'];
        $this->usu = 'epiz_24797336';
        $this->pass = 'vb0KOPl63P09E';
        $this->url = 'mysql:host=' . $this->host['host'] . ';dbname=' . $this->host['dbname'];
    }


    public function createConnection()
    {
        try {
            //error_reporting(E_ERROR | E_PARSE);
            $this->conn = new mysqli($this->host['host'], $this->usu, $this->pass, $this->host['dbname']);
            if ($this->conn != null) {
                $this->conn->set_charset('utf8');
                return $this->conn;
            }
            return null;
        } catch (mysqli_sql_exception $exc) {
            return null;
        }
    }

    public function getConexion()
    {
        if ($this->conn) {
            return $this->conn;
        } else {
            return $this->createConnection();
        }
    }

    public function closeConnection()
    {
        mysqli_close($this->conn);
    }

    public function getUsu()
    {
        return $this->usu;
    }

    public function getPass()
    {
        return $this->pass;
    }

    public function getConn()
    {
        return $this->conn;
    }

    public function setUsu($usu)
    {
        $this->usu = $usu;
    }

    public function setPass($pass)
    {
        $this->pass = $pass;
    }

    function setConn($conn)
    {
        $this->conn = $conn;
    }
}

/* Manejo de sesiones por medio de una clase*/
class Session
{

    function Session()
    {
        session_start();
    }

    public function changeName($name)
    {
        session_name($name);
    }

    public function getHost()
    {
        return $this->host;
    }

    public function setIdUser($idUser)
    {
        $_SESSION['idUser'] = $idUser;
    }

    public function setUser($pass, $usu)
    {
        $_SESSION['user'] = $usu;
        $_SESSION['pass'] = $pass;
    }

    public function setActive($status)
    {
        $_SESSION['Active'] = $status;
    }

    public function getActive()
    {
        return $_SESSION['active'];
    }

    public function setError($error)
    {
        $_SESSION['error'] = $error;
    }

    public function setSuccess($success)
    {
        $_SESSION['success'] = $success;
    }

    public function setOther($other)
    {
        $_SESSION['other'] = $other;
    }

    public function setOther2($other2)
    {
        $_SESSION['other2'] = $other2;
    }

    public function getOther()
    {
        return $_SESSION['other'];
    }

    public function getOther2()
    {
        return $_SESSION['other2'];
    }

    public function getError()
    {
        return $_SESSION['error'];
    }

    public function getSuccess()
    {
        return $_SESSION['success'];
    }

    public function getIdUser()
    {
        return $_SESSION['idUser'];
    }

    public function getUser()
    {
        return $_SESSION['user'];
    }

    public function getPassword()
    {
        return $_SESSION['pass'];
    }

    public function closeSession()
    {
        session_unset();
        session_destroy();
    }
}
