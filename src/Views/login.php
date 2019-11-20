<?php
include './Partials/headerClient.php';
?>

<div class="mt-2 box-center-h box-login text-accent border-solid border-w-1">
    <h2 class="text-center mb">Iniciar sesion</h2>
    <div class="form-group">
        <label for="user">Usuario</label>
    </div>
    <div class="form-group">
        <input type="text" name="user" id="user" class="form-content" placeholder="Ingresa un usuario">
    </div>
    <div class="form-group">
        <label for="pass">Contrasena</label>
    </div>
    <div class="form-group">
        <input type="password" name="pass" id="pass" class="form-content" placeholder="Ingresa una contrasena">
    </div>
    <div class="form-group">
        <input type="button" value="Inicia sesion" class="btn btn-success d-block w-100 mb-0">
    </div>
    <div class="form-group">
        <p class="text-center d-block">Aun no tienes cuenta?</p><a href="http://<?= $_SERVER['HTTP_HOST']; ?>/Views/registro.php">&nbsp; Crea una</a>
    </div>
</div>

<?php
include './Partials/footerClient.php';
?>