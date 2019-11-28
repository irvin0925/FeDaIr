"use stric";
var screenWidth = screen.width, responsiveDesing = screenWidth > 1100, change = responsiveDesing;
var btnAction = document.getElementById('btn-action');
var navList = document.getElementById('nav-list');
var apiURL = '../API/api.php';

function init() {
    screenWidth = screen.width;
    responsiveDesing = screenWidth > 1100;
    if (responsiveDesing) {
        navList.style = 'display:flex;';
        change = true;
    } else if (change && navList.style.display == 'flex') {
        change = false;
        navList.style.display = 'none';
    }
};

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function toggle(element) {
    //Hace que el elemento se oculte con animacion
    if (element.style.display != 'none') {
        var i = 100;
        var hide = setInterval(() => {
            if (i >= 0) {
                element.style.opacity = i / 100;
                i = i - 1;
            } else {
                element.style = "display: none;";
                clearInterval(hide);
            }
        }, 5);
    }
    //Hace que el elemento se aparezca con animacion
    else {
        var i = 0;
        element.style.opacity = 0;
        element.style.display = "block";
        var hide = setInterval(() => {
            if (i <= 100) {
                element.style.opacity = i / 100;
                i = i + 1;
            } else {
                element.style = "display:block;";
                clearInterval(hide);
            }
        }, 5);
    }
}

function removeMSG(idElement) {
    if (document.getElementById(idElement) != undefined || document.getElementById(idElement) != null) {
        var element = document.getElementById(idElement);
        element.parentNode.removeChild(element);
    }
}

/*<div class="dialog-error-back position-relative d-none" id="dialog-error">
    <div class="dialog-error box-center-fixed position-relative">
        <div class="dialog-error-header"></div>
        <h3 class="dialog-error-msg">Error!</h3>
        <div class="dialog-error-actions">
            <input type="button" value="Aceptar" class="btn btn-danger dialog-error-btn-accept">
        </div>
    </div>
</div>  */

function dialogError(text) {
    var body = document.getElementById('body');
    var divBG = newDOM('div');
    divBG.setAttribute('class', 'dialog-error-back position-relative');
    divBG.setAttribute('id', 'dialog-error');
    var divDialog = newDOM('div');
    divDialog.setAttribute('class', 'dialog-error box-center-fixed position-relative');
    var divHeader = newDOM('div');
    divHeader.setAttribute('class', 'dialog-error-header');
    var title = newDOM('h5');
    title.setAttribute('class', 'dialog-error-msg');
    title.appendChild(newTextNode(text));
    var divAction = newDOM('div'),
        input1 = newDOM('input');
    divAction.setAttribute('class', 'dialog-error-actions');
    input1.setAttribute('class', 'btn btn-danger dialog-error-btn-accept');
    input1.setAttribute('type', 'button');
    input1.setAttribute('value', 'Aceptar');
    input1.addEventListener('click', function () {
        removeMSG('dialog-error');
    });

    divAction.appendChild(input1);
    divDialog.appendChild(divHeader);
    divDialog.appendChild(title);
    divDialog.appendChild(divAction);
    divBG.appendChild(divDialog);

    body.appendChild(divBG);
}

function dialogConfirm(text, cb) {
    var body = document.getElementById('body');
    var divBG = newDOM('div');
    divBG.setAttribute('class', 'dialog-confirm-back position-relative');
    divBG.setAttribute('id', 'dialog-confirm');
    var divDialog = newDOM('div');
    divDialog.setAttribute('class', 'dialog-confirm box-center-fixed position-relative');
    var divHeader = newDOM('div');
    divHeader.setAttribute('class', 'dialog-confirm-header');
    var title = newDOM('h5');
    title.setAttribute('class', 'dialog-confirm-msg');
    title.appendChild(newTextNode(text));
    var divAction = newDOM('div'),
        input1 = newDOM('input'),
        input2 = newDOM('input');
    divAction.setAttribute('class', 'dialog-confirm-actions');
    input1.setAttribute('class', 'btn btn-danger dialog-confirm-btn-accept');
    input1.setAttribute('type', 'button');
    input1.setAttribute('value', 'Cancelar');
    input1.addEventListener('click', function () {
        cb(false);
    });
    input2.setAttribute('class', 'btn btn-success dialog-confirm-btn-accept');
    input2.setAttribute('type', 'button');
    input2.setAttribute('value', 'Aceptar');
    input2.addEventListener('click', function () {
        cb(true);
    });

    divAction.appendChild(input1);
    divAction.appendChild(input2);
    divDialog.appendChild(divHeader);
    divDialog.appendChild(title);
    divDialog.appendChild(divAction);
    divBG.appendChild(divDialog);

    body.appendChild(divBG);
}

function successMessage(text) {
    alert(text);
}

function errorMessage(text, parent) {
    removeMSG('error-msg');
    var error_msg = document.createElement('div');
    var textNode = document.createTextNode(text);
    var btnExit = document.createElement('input');
    error_msg.setAttribute('class', 'error-msg border-r-8 p-1');
    error_msg.setAttribute('id', 'error-msg');
    error_msg.appendChild(textNode);
    btnExit.addEventListener('click', function () {
        removeMSG('error-msg');
    });
    btnExit.setAttribute('class', 'error-msg-btn');
    btnExit.setAttribute('value', 'X');
    btnExit.setAttribute('type', 'button');
    error_msg.appendChild(btnExit);
    parent.insertBefore(error_msg, parent.childNodes[0]);
}

/* Funcion general de ajax*/
function postAjaxRequest(url, data, callFunction) {
    var ajax = new XMLHttpRequest();
    ajax.open('POST', url, true);
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (typeof callFunction === 'function') {
                callFunction(this.responseText);
            } else {
                callFunction("Error");
            }
        }
    };
    ajax.send(data);
}

function getAjaxRequest(url, data, callFunction) {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url + '?' + data, true);
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (typeof callFunction === 'function') {
                callFunction(this.responseText);
            } else {
                callFunction("Error");
            }
        }
    };
    ajax.send();
}

function newDOM(type) {
    return document.createElement(type);
}

function newTextNode(text) {
    return document.createTextNode(text);
}

function accepted(cb) {
    postAjaxRequest(apiURL, 'login=2', function (json) {
        if (json != 'Error') {
            json = JSON.parse(json);
            if (json.accept == '1') {
                cb(true);
            } else {
                dialogConfirm('Inicia sesion primero', function (result) {
                    if (result) {
                        loginRedirect();
                    } else {
                        removeMSG('dialog-confirm');
                    }
                });
            }
        } else {
            dialogError('Error de comunicacion!');
        }
    });
}

function loginRedirect() {
    window.location.href = "/Views/login.html";
}

btnAction.addEventListener('click', function () {
    if (!responsiveDesing) {
        toggle(navList);
    } else {
        alert('Carrito');
    }
});

setInterval(init, 10);