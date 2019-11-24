(function () {
    var btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', login);

    function login() {
        var user = document.getElementById('user').value, pass = document.getElementById('pass').value;
        var data = 'login=1&user=' + user + '&pass=' + pass;
        postAjaxRequest('../API/api.php', data, function (result) {
            var json = JSON.parse(result);
            if (json.status == '1') {
                successMessage('Has iniciado sesion ' + json.user + " and " + json.pass);
            } else {
                errorMessage('Error al iniciar sesion');
            }
        });
    }
})();