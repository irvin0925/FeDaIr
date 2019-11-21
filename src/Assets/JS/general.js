(function () {
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

    btnAction.addEventListener('click', function () {
        if (!responsiveDesing) {
            toggle(navList);
        } else {
            alert('Carrito');
        }
    });

    setInterval(init, 10);
})();