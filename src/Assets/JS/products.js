(function () {
    'use-strict';

    //Local data
    var productShowing = [];
    // Componentes de html
    var listaProducts = document.getElementById('products-list');
    var listaCategories = document.getElementById('categories-list');
    var filterProducts = document.getElementById('filterProducts');
    var filterCategories = document.getElementById('filterCategories');
    // Datos para el filtrado
    var categoriesFiler = [];
    var styleSelectedCategorie = 'background-image: url(/Assets/IMG/check.png);background-repeat: no-repeat;background-size: 25px 25px;background-position: 95%;';

    //Resetear datos
    function resetListProducts() {
        listaProducts.innerHTML = '<li class="product-item-list"></li><li class="product-item-list" ></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li>';
    }

    function resetListCategory() {
        listaCategories.innerHTML = '';
    }

    //New DOM

    /*<div class="view-more-back box-center-fixed" id="view-more">
        <div class="position-relative view-more-content">
            <div class="view-more-img" style="
        background: url(/Assets/IMG/temp_pc.png) no-repeat;
        background-size: contain;
        background-position: center;">
            </div>
            <div class="view-more-info pt-2">
                <h5>Descripcion</h5>
                <p class="pl-1 mt-1 view-more-text">Computadora todo en 1, monitor y componentes</p>
            </div>
            <div class="view-more-action">
                <input type="button" value="Agregar al carrito" class="stat stat-add view-more-agregar">
            </div>
            <div class="view-more-close"></div>
        </div>
    </div> */

    function newViewMore(i, reference) {
        var body = document.getElementById('body');
        var divViewMoreBack = newDOM('div');//as parent
        divViewMoreBack.setAttribute('class', 'view-more-back box-center-fixed');
        divViewMoreBack.setAttribute('id', 'view-more');
        var viewMoreContent = newDOM('div');//as parent
        viewMoreContent.setAttribute('class', 'position-relative view-more-content');
        var viewMoreImg = newDOM('div');//as parent
        viewMoreImg.setAttribute('class', 'view-more-img');
        viewMoreImg.setAttribute('style', 'background: url(/Assets/IMG/' + productShowing[i].urlImg + ') no-repeat;background-size: contain;background-position: center;');
        var viewMoreInfo = newDOM('div'),//as parent
            title = newDOM('h5'),
            descripcion = newDOM('p');
        viewMoreInfo.setAttribute('class', 'view-more-info pt-2');
        title.appendChild(newTextNode(productShowing[i].nombre));
        descripcion.setAttribute('class', 'pl-1 mt-1 view-more-text');
        descripcion.appendChild(newTextNode(productShowing[i].descripcion));
        viewMoreInfo.appendChild(title);
        viewMoreInfo.appendChild(descripcion);
        var viewMoreAction = newDOM('div'),//as parent
            input = newDOM('input');
        viewMoreAction.setAttribute('class', 'view-more-action');
        input.setAttribute('class', 'stat stat-add view-more-agregar');
        input.setAttribute('type', 'button');
        if (productShowing[i].onCart === undefined || productShowing[i].onCart == '0') {
            input.setAttribute('name', 'agregar-carro');
            input.setAttribute('value', 'Agregar a la compra');
        } else {
            input.setAttribute('name', 'actualizar-carrito');
            input.setAttribute('value', 'Actualizar carrito');
        }
        controlProduct(input, i, reference);
        viewMoreAction.appendChild(input);
        var viewMoreClose = newDOM('div');//as parent
        viewMoreClose.setAttribute('class', 'view-more-close');
        viewMoreClose.addEventListener('click', function () {
            removeMSG(divViewMoreBack.id);
        });
        //Appends
        viewMoreContent.appendChild(viewMoreImg);
        viewMoreContent.appendChild(viewMoreInfo);
        viewMoreContent.appendChild(viewMoreAction);
        viewMoreContent.appendChild(viewMoreClose);
        divViewMoreBack.appendChild(viewMoreContent);
        body.appendChild(divViewMoreBack);
    }

    function newCategory(data) {
        var liCategory = newDOM('li');
        liCategory.setAttribute('class', 'category-item pl-2 pt-1 pb-1');
        liCategory.setAttribute('id', data.idCategoriaProducto);
        if (categoriesFiler.includes(data.idCategoriaProducto)) {
            liCategory.style = styleSelectedCategorie;
        }
        liCategory.appendChild(newTextNode(data.descripcion));
        liCategory.addEventListener('click', function () {
            if (categoriesFiler.includes(this.id)) {
                categoriesFiler.splice(categoriesFiler.indexOf(this.id), 1);
                this.style = '';
            } else {
                categoriesFiler.push(this.id);
                this.style = styleSelectedCategorie;
            }
            listComposeProducts();
        });
        return liCategory;
    }

    function newProductDescription(descripcion) {
        var max = 50;
        if (descripcion.length > max) {
            descripcion = descripcion.substring(0, max) + "...";
        }
        return descripcion;
    }

    function newProduct(i) {
        var liProducto = newDOM('li');
        liProducto.setAttribute('class', 'product-item-list');
        var divCarta = newDOM('div');
        divCarta.setAttribute('class', 'carta');
        var divIMG = newDOM('div');
        divIMG.setAttribute('class', 'carta-image');
        divIMG.setAttribute('style', 'background: url(/Assets/IMG/' + productShowing[i].urlImg + ') no-repeat;background-size: contain;background-position: center center;');
        var divBody = newDOM('div'),
            title = newDOM('h4'),
            text = newDOM('p');
        divBody.setAttribute('class', 'carta-text'); // as parent
        /**/
        title.setAttribute('class', 'carta-title');
        title.appendChild(newTextNode(productShowing[i].nombre));
        divBody.appendChild(title);
        //text.setAttribute('class', 'mt-1 pl-1 pr-1');
        //text.appendChild(newTextNode(newProductDescription(productShowing[i].descripcion)));
        //divBody.appendChild(text);
        var divAction = newDOM('div'),
            divStatSee = newDOM('div'),
            divStatAdd = newDOM('div');
        divAction.setAttribute('class', 'card-stats mt-1'); // as parent
        divStatSee.setAttribute('class', 'stat stat-see');
        divStatSee.setAttribute('name', 'ver-mas');
        divStatSee.appendChild(newTextNode('Ver mas'));
        controlProduct(divStatSee, i, divStatAdd);
        divAction.appendChild(divStatSee);
        divStatAdd.setAttribute('class', 'stat stat-add');
        if (productShowing[i].onCart === undefined || productShowing[i].onCart == '0') {
            divStatAdd.setAttribute('name', 'agregar-carro');
            divStatAdd.appendChild(newTextNode('Agregar a la compra'));
        } else {
            divStatAdd.setAttribute('name', 'actualizar-carrito');
            divStatAdd.appendChild(newTextNode('Actualizar carrito'));
        }
        controlProduct(divStatAdd, i);
        divAction.appendChild(divStatAdd);
        // Incluir todo al hijo mayor y luego al padre
        divCarta.appendChild(divIMG);
        divCarta.appendChild(divBody);
        divCarta.appendChild(divAction);
        liProducto.appendChild(divCarta);
        return liProducto;
    }

    //Mostrar informacion
    function listProducts(filterValue) {
        postAjaxRequest(apiURL, filterValue, function (json) {
            if (json.errorBody != 'Error' || json.error != '') {
                productShowing = json;
                resetListProducts();
                for (i = 0; i < productShowing.length; i++) {
                    var product = newProduct(i);
                    listaProducts.insertBefore(product, listaProducts.childNodes[0]);
                }
            }
        });
    }

    function listCategories(filterValue) {
        postAjaxRequest(apiURL, filterValue, function (json) {
            if (json.errorBody != 'Error' || json.error != '') {
                resetListCategory();
                for (i = 0; i < json.length; i++) {
                    var category = newCategory(json[i]);
                    listaCategories.appendChild(category);
                }
            }
        });
    }

    function listComposeProducts() {
        if (categoriesFiler.length > 0) {
            var filterValue = '';
            for (i = 0; i < categoriesFiler.length; i++) {
                filterValue += '&category' + i + '=' + categoriesFiler[i];
            }
            listProducts('product=2&cant=' + categoriesFiler.length + '&filter=' + filterProducts.value + filterValue);
        } else {
            listProducts('product=1&filter=' + filterProducts.value);
        }
    }

    //Controlar la informacion
    function controlProduct(element, i, reference) {
        element.addEventListener('click', function (e) {
            var name = e.target.attributes.name.value;
            if (name == 'ver-mas') {
                if (reference !== undefined && reference !== null) {
                    newViewMore(i, reference);
                } else {
                    newViewMore(i);
                }
            } else if (name == 'agregar-carro') {
                accepted(function (json) {
                    if (json) {
                        agregarAlCarrito(i, function (result) {
                            if (result) {
                                if (reference !== undefined && reference !== null) {
                                    reference.innerHTML = "Actualizar carrito";
                                    reference.setAttribute('value', 'Actualizar carrito');
                                    reference.setAttribute('name', 'actualizar-carrito');
                                }
                                element.innerHTML = "Actualizar carrito";
                                element.setAttribute('value', 'Actualizar carrito');
                                element.setAttribute('name', 'actualizar-carrito');
                                productShowing[i].onCart = '1';
                            } else {
                                dialogError('Error al agregar');
                            }
                        });
                    }
                });
            } else {
                cartRedirect();
            }
        });
    }

    function agregarAlCarrito(i, cb) {
        postAjaxRequest(apiURL, 'addCart=1&cant=1&idProduct=' + productShowing[i].idProducto, function (json) {
            if (json.errorBody != 'Error' || json.error != '') {
                cb(json.add == '1');
            }
        });
    }

    /* Llamado de funciones */
    listComposeProducts();
    listCategories('category=1&filter=' + filterCategories.value);

    filterProducts.addEventListener('keyup', function () {
        if (categoriesFiler.length > 0) {
            listComposeProducts();
        } else {
            listProducts('product=1&filter=' + this.value);
        }
    });

    filterCategories.addEventListener('keyup', function () {
        listCategories('category=1&filter=' + this.value);
    });
})();