<?php

class Connection
{

    private $host;
    private $usu;
    private $pass;
    private $url;
    private $conn;

    public function Connection()
    {
        $this->host = ['host' => '25.18.99.248', 'dbname' => 'FeDaIr'];
        $this->usu = 'user';
        $this->pass = 'pass';
        $this->url = 'mysql:host=' . $this->host['host'] . ';dbname=' . $this->host['dbname'];
    }


    public function createConnection()
    {
        try {
            //$this->conn = new PDO($this->url, $this->usu, $this->pass);
            $this->conn = new mysqli($this->url, $this->usu, $this->pass);
            //$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo 'Conectados';
            return $this->conn;
        } catch (PDOException $exc) {
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
        oci_close($this->conn);
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
