(function () {
    'use-stric';

    //Security redirect
    acceptedEntrance(function (result) {
        if (result) {
            var resumenContainer = document.getElementById('resumen-cart');
            var subtotal = document.getElementById('subTotal');
            var iva = document.getElementById('iva');
            var total = document.getElementById('total');
            var btnComprar = document.getElementById('btn-comprar');
            var btnAddCard = document.getElementById('btn-newAddCard');
            var items = [];

            /* 
            <div class="back-dark d-none">
                <div class="box-center-fixed cart-add-car-back p-1">
                    <h3 class="text-center d-block mt-1">Digita otra tarjeta</h3>
                    <div class="form-group mt-1">
                        <label for="">Numero de tarjeta<p class="text-danger d-inline">*</p>
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Ingresa un numero de tarjeta" class="form-content">
                    </div>
                    <div class="form-group">
                        <label for="">Codigo de seguridad<p class="text-danger d-inline">*</p>
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Ingresa el codigo cvv" class="form-content">
                    </div>
                    <div class="form-group">
                        <input type="button" value="Agregar" class="btn btn-accent d-block w-100">
                    </div>
                    <div class="form-group">
                        <input type="button" value="Cancelar" class="btn btn-danger d-block w-100">
                    </div>
                </div>
            </div>
            */

            function newAddCard() {
                var body = document.getElementById('body');
                var id = 'cart-add-card';
                var divBack = newDOM('div');
                divBack.setAttribute('class', 'back-dark');
                divBack.setAttribute('id', id);
                var divContent = newDOM('div');
                divContent.setAttribute('class', 'box-center-fixed cart-add-car-back p-1');
                var title = newDOM('h3');
                title.setAttribute('class', 'text-center d-block mt-1');
                title.appendChild(newTextNode('Digita otra tarjeta'));
                /**/divContent.appendChild(title);
                var grNumberTitle = newDOM('div'), //as parent
                    labelNumber = newDOM('label'),
                    numAsteric = newDOM('p');
                numAsteric.setAttribute('class', 'text-danger d-inline');
                numAsteric.appendChild(newTextNode('*'));
                //
                grNumberTitle.setAttribute('class', 'form-group mt-1');
                labelNumber.appendChild(newTextNode('Numero de tarjeta'));
                labelNumber.appendChild(numAsteric);
                grNumberTitle.appendChild(labelNumber);
                /**/divContent.appendChild(grNumberTitle);
                var grNumber = newDOM('div'),//as parent
                    inputNumber = newDOM('input');
                grNumber.setAttribute('class', 'form-group');
                inputNumber.setAttribute('type', 'text');
                inputNumber.setAttribute('class', 'form-content');
                inputNumber.setAttribute('placeholder', 'Ingresa un numero de tarjeta');
                grNumber.appendChild(inputNumber);
                /**/divContent.appendChild(grNumber);
                var grCvvTitle = newDOM('div'),//as parent
                    labelCvv = newDOM('label'),
                    cvvAsteric = newDOM('p');
                cvvAsteric.setAttribute('class', 'text-danger d-inline');
                cvvAsteric.appendChild(newTextNode('*'));
                grCvvTitle.setAttribute('class', 'form-group');
                labelCvv.appendChild(newTextNode('Numero de cvv'));
                labelCvv.appendChild(cvvAsteric);//temp
                grCvvTitle.appendChild(labelCvv);
                /**/divContent.appendChild(grCvvTitle);
                var grCvv = newDOM('div'),//as parent
                    inputCvv = newDOM('input');
                grCvv.setAttribute('class', 'form-group');
                inputCvv.setAttribute('type', 'password');
                inputCvv.setAttribute('class', 'form-content');
                inputCvv.setAttribute('placeholder', 'Ingresa el codigo cvv');
                grCvv.appendChild(inputCvv);
                /**/divContent.appendChild(grCvv);
                var grAdd = newDOM('div'),
                    btnAdd = newDOM('input');
                grAdd.setAttribute('class', 'form-group');
                btnAdd.setAttribute('type', 'button');
                btnAdd.setAttribute('value', 'Agregar');
                btnAdd.setAttribute('class', 'btn btn-accent d-block w-100');
                /*Events*/
                btnAdd.addEventListener('click', function () {
                    alert('Agregado'); removeMSG(id);
                });
                grAdd.appendChild(btnAdd);
                /**/divContent.appendChild(grAdd);
                var grCancel = newDOM('div'),
                    btnCancel = newDOM('input');
                grCancel.setAttribute('class', 'form-group');
                btnCancel.setAttribute('type', 'button');
                btnCancel.setAttribute('value', 'Cancelar');
                btnCancel.setAttribute('class', 'btn btn-danger d-block w-100');
                /*Events*/
                btnCancel.addEventListener('click', function () { removeMSG(id); });
                /*END Events*/

                grCancel.appendChild(btnCancel);
                /**/divContent.appendChild(grCancel);
                divBack.appendChild(divContent);
                body.appendChild(divBack);
                return divBack;
            }

            function newResumenItem(data) {
                var divCartItem = newDOM('div');
                divCartItem.setAttribute('class', 'cart-item p-1 mb');
                divCartItem.setAttribute('id', 'cart-item-' + data.idProducto);
                var btnDeleteCartItem = newDOM('div');
                btnDeleteCartItem.setAttribute('class', 'cart-item-delete');// as parent
                //Event
                btnDeleteCartItem.addEventListener('click', function () {
                    var msg = dialogConfirm('Esta segur@ que desea eliminarlo?', function (result) {
                        if (result) {
                            postAjaxRequest(apiURL, 'cart=2&idProduct=' + data.idProducto, function (json) {
                                if (json.errorBody != 'Error' || json.error != '') {

                                    if (json.delete == '1') {
                                        removeMSG('cart-item-' + data.idProducto);
                                        items = items.filter(obj => {
                                            return obj.idProducto != data.idProducto;
                                        });
                                        calcularValores();
                                    } else {
                                        dialogError('Error al eliminar este elemento');
                                    }
                                }
                            });
                        }
                        removeMSG(msg.id);
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
                                var msg = dialogWait('Espere un momento...');
                                value.appendChild(newTextNode(json.cant));
                                items = items.map(obj => {
                                    if (obj.idProducto != data.idProducto) {
                                        return obj;
                                    } else {
                                        data.cant = json.cant;
                                        return data;
                                    }
                                });
                                calcularValores();
                                removeMSG(msg.id);
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
                            var msg = dialogWait('Espere un momento...');
                            value.appendChild(newTextNode(json.cant));
                            items = items.map(obj => {
                                if (obj.idProducto != data.idProducto) {
                                    return obj;
                                } else {
                                    data.cant = json.cant;
                                    return data;
                                }
                            });
                            calcularValores();
                            removeMSG(msg.id);
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
                        if (json.errorBody != 'Error' || json.error != '') {
                            cb(json);
                        }
                    });
                } else if (e.name == 'btn-plus') {
                    postAjaxRequest(apiURL, 'cart=3&idProduct=' + e.idProduct, function (json) {
                        if (json.errorBody != 'Error' || json.error != '') {
                            cb(json);
                        }
                    });
                }
            }

            function listCartResumen() {
                postAjaxRequest(apiURL, 'cart=1', function (json) {
                    if (json.errorBody != 'Error' || json.error != '') {
                        resumenContainer.innerHTML = '';
                        items = json;
                        for (i = 0; i < json.length; i++) {
                            var cartItem = newResumenItem(json[i]);
                            resumenContainer.appendChild(cartItem);
                        }
                        calcularValores();
                    } else {
                        dialogError('Ha ocurrido un error');
                    }
                });
            }

            function calcularValores() {
                var st = 0, iv = 0, tot = 0;
                for (i = 0; i < items.length; i++) {
                    st += items[i].cant * items[i].precio;
                }
                iv = 0.13 * st;
                tot = st + iv;
                subtotal.innerHTML = st;
                iva.innerHTML = iv;
                total.innerHTML = tot;
            }

            listCartResumen();

            btnComprar.addEventListener('click', function () {
                if (items.length > 0) {
                    dialogError('Comprando...');
                } else {
                    var msg = dialogConfirm('Debes agregar producto al carrito primero', function (result) {
                        if (result) {
                            indexRedirect();
                        } else {
                            removeMSG(msg.id);
                        }
                    });
                }
            });

            btnAddCard.addEventListener('click', function () {
                newAddCard();
            });

        } else {
            loginRedirect();
        }
    });

})();