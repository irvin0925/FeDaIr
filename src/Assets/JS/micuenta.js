(function () {
    'use-strict';
    document.getElementById('tarj').setAttribute("style","display:none");
    document.getElementById('historial').setAttribute("style","display:none");
    document.getElementById('pagos');
    var btnGuardarTarjeta = document.getElementById('btnGuardarTarjeta');
    var btnUno = document.getElementById('uno');
    var btnDos = document.getElementById('dos');
    var tarjeta = document.getElementById('tarjeta');
    var tipo = document.getElementsByName('tipo');
    

    btnUno.addEventListener('click', areaTarjetas);
    btnDos.addEventListener('click', areaHistorial);
    btnGuardarTarjeta.addEventListener('click', guardarTarjeta);
    btnGuardarTarjeta.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            guardarTarjeta();
        }
    });
    
    function guardarTarjeta() {
        for (i = 0; i < tipo.length; i++) {
            if (tipo[i].checked) {
                //var memory=memo[i].checked;
                var tip = tipo[i].value;
            }
        }
        var data = 'addTarjeta=1&tarjeta=' + tarjeta.value + '&tipo=' + tip;
        console.log(data);
        postAjaxRequest(apiURL, data, function (result) {
            if (result != 'Error' || result != '[]') {
                var json = JSON.parse(result);
                if (json.add == '1') {
                    mostrarTarjetas();
                } else {
                    var loginForm = document.getElementById('loginForm');
                    errorMessage('Error al Insertar', loginForm);
                }
            }
        });
    }

    function mostrarTarjetas(){
        var tabla = document.getElementById("tarjetaBody");
        tabla.innerHTML = "";
        var data = 'addTarjeta=2';
        console.log(data);
        postAjaxRequest(apiURL, data, function (result) {
            if (result != 'Error' || result != '[]') {
                var json = JSON.parse(result);
                console.log(json.length);
                if(json.error == 1){
                    var fila = document.createElement("tr");
                        var celda1 = document.createElement("td");
                        var textoCelda1 = document.createTextNode("Sin Registros");
                        celda1.appendChild(textoCelda1);
                        fila.appendChild(celda1);
                        tabla.appendChild(fila);
                }else{
                    for (var i = 0; i < json.length; i++) 
                    {
                        var fila = document.createElement("tr");
                        var celda1 = document.createElement("td");
                        var celda2 = document.createElement("td");
                        var textoCelda1 = document.createTextNode(json[i].numeroTarjeta);
                        var textoCelda2 = document.createTextNode(json[i].tipo);
                        celda1.appendChild(textoCelda1);
                        celda2.appendChild(textoCelda2);
                        fila.appendChild(celda1);
                        fila.appendChild(celda2);
                        tabla.appendChild(fila);
                    }
                   
                }
                
               
            }else
            {

            }
        });
    }

    function mostrarHistorial(){
        var tabla = document.getElementById("historialBody");
        tabla.innerHTML = "";
        var data = 'historial=1';
        console.log(data);
        postAjaxRequest(apiURL, data, function (result) {
                var json = JSON.parse(result);
                console.log(json.length);
                if(json.error == 1){
                        var fila = document.createElement("tr");
                        var celda1 = document.createElement("td");
                        var textoCelda1 = document.createTextNode("Sin Registros");
                        celda1.appendChild(textoCelda1);
                        fila.appendChild(celda1);
                        tabla.appendChild(fila);
                }else{
                    for (var i = 0; i < json.length; i++) 
                    {
                        var fila = document.createElement("tr");
                        var celda1 = document.createElement("td");
                        var celda2 = document.createElement("td");
                        var celda3 = document.createElement("td");
                        var celda4 = document.createElement("td");
                        var textoCelda1 = document.createTextNode(json[i].idFacturaEncabezado);
                        var textoCelda2 = document.createTextNode(json[i].fecha);
                        var textoCelda3 = document.createTextNode(json[i].subTotal);
                        var textoCelda4 = document.createTextNode(json[i].total);
                        celda1.appendChild(textoCelda1);
                        celda2.appendChild(textoCelda2);
                        celda3.appendChild(textoCelda3);
                        celda4.appendChild(textoCelda4);
                        fila.appendChild(celda1);
                        fila.appendChild(celda2);
                        fila.appendChild(celda3);
                        fila.appendChild(celda4);
                        tabla.appendChild(fila);
                    }
                   
                }
        });
    }

    function areaTarjetas(){
        document.getElementById('tarj').setAttribute("style","display:inline");
        document.getElementById('historial').setAttribute("style","display:none");
    }

    function areaHistorial(){
        document.getElementById('tarj').setAttribute("style","display:none");
        document.getElementById('historial').setAttribute("style","display:inline");
    }
    mostrarTarjetas();
    mostrarHistorial();

})();