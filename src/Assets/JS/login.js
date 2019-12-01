(function () {
    var btnLogin = document.getElementById('btnLogin');
    var user = document.getElementById('user'), pass = document.getElementById('pass');

    btnLogin.addEventListener('click', login);
    user.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            login();
        }
    });
    pass.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            login();
        }
    });

    function login() {
        var data = 'login=1&user=' + user.value + '&pass=' + pass.value;
        postAjaxRequest(apiURL, data, function (result) {
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