<?php



?>

<form action="http://<?= $_SERVER['HTTP_HOST'] ?>" class="box-center-h w-em-50 mb-2" method="POST">
    <h2 class="text-center mb">Ingresa la informacion</h2>
    <div class="dblock w-em-50">
        <label for="nombre" class="text-accent">Nombre:</label>
        <input type="text" name="nombre" id="nombre" class="form-content w-100">
    </div>
    <div class="dblock w-em-50">
        <label for="nombre" class="text-accent">Puntos:</label>
        <input type="text" name="puntos" id="puntos" class="form-content w-100">
    </div>
    <div class="dblock w-em-50">
        <label for="nombre" class="text-accent">Hacks:</label>
        <input type="text" name="hacks" id="hacks" class="form-content w-100">
    </div>
    <input type="submit" value="Guardar" name="save" class="btn btn-success w-100">
</form>