(function () {
    'use-strict';

    // Componentes de html
    var listaProducts = document.getElementById('products-list');
    var listaCategories = document.getElementById('categories-list');
    var filterProducts = document.getElementById('filterProducts');
    var filterCategories = document.getElementById('filterCategories');
    // Datos para el filtrado
    var categoriesFiler = [];
    var styleSelectedCategorie = 'background-image: url(/Assets/IMG/check.png);background-repeat: no-repeat;background-size: 25px 25px;background-position: 95%;';


    function newProductDescription(descripcion) {
        var max = 50;
        if (descripcion.length > max) {
            descripcion = descripcion.substring(0, max) + "...";
        }
        return descripcion;
    }

    function newProduct(data) {
        var liProducto = newDOM('li');
        liProducto.setAttribute('class', 'product-item-list');
        var divCarta = newDOM('div');
        divCarta.setAttribute('class', 'carta');
        var divIMG = newDOM('div');
        divIMG.setAttribute('class', 'carta-image');
        divIMG.setAttribute('style', 'background: url(/Assets/IMG/' + data.urlImg + ') no-repeat;background-size: contain;background-position: center center;');
        var divBody = newDOM('div'), title = newDOM('h4'), text = newDOM('p');
        divBody.setAttribute('class', 'carta-text'); // as parent
        /**/
        title.setAttribute('class', 'carta-title');
        title.appendChild(newTextNode(data.nombre));
        divBody.appendChild(title);
        text.setAttribute('class', 'mt-1 pl-1 pr-1');
        /* Hacer la corroboracion de caracteres*/
        text.appendChild(newTextNode(newProductDescription(data.descripcion)));
        divBody.appendChild(text);
        var divAction = newDOM('div'),
            divStatSee = newDOM('div'),
            divTextSee = newDOM('div'),
            divStatAdd = newDOM('div'),
            divTextAdd = newDOM('div');
        divAction.setAttribute('class', 'card-stats mt-1'); // as parent
        divStatSee.setAttribute('class', 'stat stat-see');
        divTextSee.appendChild(newTextNode('Ver mas'));
        divStatSee.appendChild(divTextSee);
        divAction.appendChild(divStatSee);
        divStatAdd.setAttribute('class', 'stat stat-add');
        divTextAdd.appendChild(newTextNode('Agregar a la compra'));
        divStatAdd.appendChild(divTextAdd);
        divAction.appendChild(divStatAdd);
        // Incluir todo al hijo mayor y luego al padre
        divCarta.appendChild(divIMG);
        divCarta.appendChild(divBody);
        divCarta.appendChild(divAction);
        liProducto.appendChild(divCarta);
        return liProducto;
    }

    function listProducts(filterValue) {
        postAjaxRequest('../API/api.php', filterValue, function (json) {
            console.log(json);
            if (json != 'Error') {
                json = JSON.parse(json);
                resetListProducts();
                for (i = 0; i < json.length; i++) {
                    var product = newProduct(json[i]);
                    listaProducts.insertBefore(product, listaProducts.childNodes[0]);
                }
            }
        });
    }

    function resetListProducts() {
        listaProducts.innerHTML = '<li class="product-item-list"></li><li class="product-item-list" ></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li><li class="product-item-list"></li>';
    }

    function resetListCategory() {
        listaCategories.innerHTML = '';
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

    function listCategories(filterValue) {
        postAjaxRequest('../API/api.php', filterValue, function (json) {
            if (json != 'Error') {
                json = JSON.parse(json);
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

    listProducts('product=1&filter=' + filterProducts.value);
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