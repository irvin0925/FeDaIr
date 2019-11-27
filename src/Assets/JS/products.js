(function () {
    'use-strict';

    var listaProducts = document.getElementById('products-list');
    var filter = document.getElementById('filterProducts');

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
        text.appendChild(newTextNode(data.descripcion));
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

    function listProducts() {
        postAjaxRequest('../API/api.php', 'product=1&filter=' + filter.value, function (json) {
            if (json != 'Error') {
                json = JSON.parse(json);
                for (i = 0; i < json.length; i++) {
                    var product = newProduct(json[i]);
                    console.log(product);
                    listaProducts.insertBefore(product, listaProducts.childNodes[0]);
                }
            }
        });
    }

    listProducts();
})();