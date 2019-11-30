(function () {
    'use-stric';

    /*<div class="cart-item p-1 mb">
        <div class="cart-item-delete"></div>
        <div class="cart-item-img"
            style="background: url(/Assets/IMG/temp_pc.png) no-repeat;background-size: contain;background-position: center center;">
        </div>
        <p class="cart-item-name">Computadora todo en 1, monitor y componentes </p>
        <div class="cart-item-cant-control">
            <div class="cart-item-cant-control-less p-2"></div>
            <div class="cart-item-cant-control-value">1</div>
            <div class="cart-item-cant-control-plus p-2"></div>
        </div>
        <div class="cart-item-price">1234567890.12</div>
    </div>*/

    var resumenContainer = document.getElementById('resumen-cart');

    function newResumenItem(data) {
        var divCartItem = newDOM('div');
        divCartItem.setAttribute('class', 'cart-item p-1 mb');
        divCartItem.setAttribute('id', 'cart-item-' + data.idProducto);
        var btnDeleteCartItem = newDOM('div');
        btnDeleteCartItem.setAttribute('class', 'cart-item-delete');// as parent
        //Event
        btnDeleteCartItem.addEventListener('click', function () {
            postAjaxRequest(apiURL, 'cart=2&idProduct=' + data.idProducto, function (json) {
                if (json != 'Error') {
                    json = JSON.parse(json);
                    if (json.delete == '1') {
                        removeMSG('cart-item-' + data.idProducto);
                    } else {
                        dialogError('Error al eliminar este elemento');
                    }
                }
            });
        });
        divCartItem.appendChild(btnDeleteCartItem);
        var imgCartItem = newDOM('div');
        imgCartItem.setAttribute('class', 'cart-item-img'); //as parent
        imgCartItem.setAttribute('style', 'background: url(/Assets/IMG/' + data.urlImg + ') no-repeat;background-size: contain;background-position: center center;');
        divCartItem.appendChild(imgCartItem);
        var cartItemName = newDOM('p');
        cartItemName.setAttribute('class', 'cart-item-name'); //as parent
        cartItemName.appendChild(newTextNode(data.nombre));
        divCartItem.appendChild(cartItemName);
        var divControlCartItem = newDOM('div'),
            btnPlus = newDOM('div'),
            value = newDOM('div'),
            btnLess = newDOM('div');
        divControlCartItem.setAttribute('class', 'cart-item-cant-control'); // as parent
        btnLess.setAttribute('class', 'cart-item-cant-control-less p-2');
        value.setAttribute('class', 'cart-item-cant-control-value');
        value.appendChild(newTextNode(data.cant));
        btnPlus.setAttribute('class', 'cart-item-cant-control-plus p-2');
        //Event
        btnLess.addEventListener('click', function () {
            if (value.innerHTML > 1) {
                calcularCantidad({ name: "btn-less", idProduct: data.idProducto }, function (json) {
                    if (json.error == 0) {
                        value.innerHTML = '';
                        value.appendChild(newTextNode(json.cant));
                    } else {
                        dialogError(json.msg);
                    }
                });
            } else {
                dialogError('El minimo de elementos es 1');
            }
        });
        //END Event
        //Event
        btnPlus.addEventListener('click', function () {
            calcularCantidad({ name: "btn-plus", idProduct: data.idProducto }, function (json) {
                if (json.error == 0) {
                    value.innerHTML = '';
                    value.appendChild(newTextNode(json.cant));
                } else {
                    dialogError(json.msg);
                }
            });
        });
        //END Event
        divControlCartItem.appendChild(btnLess);
        divControlCartItem.appendChild(value);
        divControlCartItem.appendChild(btnPlus);
        divCartItem.appendChild(divControlCartItem);
        var priceCartItem = newDOM('div');
        priceCartItem.setAttribute('class', 'cart-item-price'); //as parent
        priceCartItem.appendChild(newTextNode(data.precio));
        divCartItem.appendChild(priceCartItem);
        return divCartItem;
    }

    function calcularCantidad(e, cb) {
        if (e.name == 'btn-less') {
            postAjaxRequest(apiURL, 'cart=4&idProduct=' + e.idProduct, function (json) {
                console.log(json);
                if (json != 'Error') {
                    json = JSON.parse(json);
                    cb(json);
                }
            });
        } else if (e.name == 'btn-plus') {
            postAjaxRequest(apiURL, 'cart=3&idProduct=' + e.idProduct, function (json) {
                console.log(json);
                if (json != 'Error') {
                    json = JSON.parse(json);
                    cb(json);
                }
            });
        }
    }

    function listCartResumen() {
        postAjaxRequest(apiURL, 'cart=1', function (json) {
            console.log(json);
            if (json != 'Error') {
                json = JSON.parse(json);
                resumenContainer.innerHTML = '';
                for (i = 0; i < json.length; i++) {
                    var cartItem = newResumenItem(json[i]);
                    resumenContainer.appendChild(cartItem);
                }
            }
        });
    }

    listCartResumen();
})();