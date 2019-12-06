(function () {
    var btnRegistro = document.getElementById('btnRegistro');
    var cedula = document.getElementById('ced');
    var nombre = document.getElementById('nombre'); 
    var usuario = document.getElementById('usuario');
    var telefono = document.getElementById('telefono');
    var pass = document.getElementById('password');

    btnRegistro.addEventListener('click', registro);
    btnRegistro.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            registro();
        }
    });
    
    function registro() {
        var data = 'addUsers=1&cedula=' + cedula.value + '&usuario=' + usuario.value + '&contra=' + pass.value + '&nombre=' + nombre.value + '&telefono=' + telefono.value;
        console.log(data);
        postAjaxRequest(apiURL, data, function (result) {
            if (result != 'Error' || result != '[]') {
                var json = JSON.parse(result);
                if (json.add == '1') {
                    window.location.href = "/Views/login.html";
                } else {
                    var loginForm = document.getElementById('loginForm');
                    errorMessage('Error al Registrarse', loginForm);
                }
            }
        });
    }
})();