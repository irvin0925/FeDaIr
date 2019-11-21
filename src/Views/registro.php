<?php
include './Partials/headerClient.php';
?>

<div class="mt-2 mb-2 box-center-h box-register text-accent border-solid border-w-1">
    <h2 class="text-center mb">Completa la informacion</h2>
    </p>
    <div class="form-group">
        <label for="ced" class="text-accent">Cedula<p class="text-danger d-inline">*</p></label>
    </div>
    <div class="form-group">
        <input type="text" name="ced" id="ced" class="form-content d-block w-100" placeholder="Ingresa tu cedula">
    </div>
    <div class="form-group">
        <label for="nombre" class="text-accent">Nombre</label>
    </div>
    <div class="form-group">
        <input type="text" name="nombre" id="nombre" class="form-content d-block w-100" placeholder="Ingresa una contrasena">
    </div>
    <div class="form-group">
        <label for="usuario" class="text-accent">Usuario<p class="text-danger d-inline">*</p></label>
    </div>
    <div class="form-group">
        <input type="text" name="usuario" id="usuario" class="form-content d-block w-100" placeholder="Ingresa una contrasena">
    </div>
    <div class="form-group">
        <label for="telefono" class="text-accent">Telefono</label>
    </div>
    <div class="form-group">
        <input type="text" name="telefono" id="telefono" class="form-content d-block w-100" placeholder="Ingresa una contrasena">
    </div>
    <div class="form-group">
        <label for="password" class="text-accent">Contrasena<p class="text-danger d-inline">*</p></label>
    </div>
    <div class="form-group">
        <input type="password" name="password" id="password" class="form-content d-block w-100" placeholder="Ingresa una contrasena">
    </div>
    <div class="form-group">
        <label for="password_confirmation" class="text-accent">Confirmacion<p class="text-danger d-inline">*</p></label>
    </div>
    <div class="form-group">
        <input type="password" name="password_confirmation" id="password_confirmation" class="form-content d-block w-100" placeholder="Ingresa una contrasena">
    </div>
    <div class="form-group">
        <input type="button" value="Registrase" class="btn btn-primary d-block w-100 mb-0">
    </div>
    <div class="form-group">
        <p class="text-center d-block text-accent">Ya tiene cuenta?</p><a class="text-primary" href="http://<?= $_SERVER['HTTP_HOST']; ?>/Views/login.php">&nbsp; Inicia sesion</a>
    </div>
</div>

<?php
include './Partials/footerClient.php';
?>