(function () {
    var btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', login);

    function login() {
        var user = document.getElementById('user'), pass = document.getElementById('pass');
        var data = 'login=1&user=' + user.value + '&pass=' + pass.value;
        postAjaxRequest('../API/api.php', data, function (result) {
            if (result != 'Error' || result != '[]') {
                var json = JSON.parse(result);
                if (json.status == '1') {
                    window.location.href = "/Views/productos.html";
                } else {
                    user.style = "border: #ff0000 solid 1px;";
                    pass.style = "border: #ff0000 solid 1px;";
                    var loginForm = document.getElementById('loginForm');
                    errorMessage('Error al iniciar sesion', loginForm);
                }
            }
        });
    }
})();