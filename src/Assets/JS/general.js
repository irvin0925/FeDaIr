"use stric";
var screenWidth = screen.width, responsiveDesing = screenWidth > 1100, change = responsiveDesing;
var btnAction = document.getElementById('btn-action');
var navList = document.getElementById('nav-list');

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

/*Demo de llamada
getAjaxRequest('http://fidestore.cf/API/api.php', '?test=1', function (result) {
    alert(result);
});
postAjaxRequest('http://fidestore.cf/API/api.php', 'test=1', function (result) {
    alert(result);
});*/

btnAction.addEventListener('click', function () {
    if (!responsiveDesing) {
        toggle(navList);
    } else {
        alert('Carrito');
    }
});

setInterval(init, 10);