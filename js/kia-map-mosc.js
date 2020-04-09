$(function() {
    //Переменная для включения/отключения индикатора загрузки
    var spinner = jQuery('.dealer-map2').children('.loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    var myMapTemp, myPlacemarkTemp;

    //Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
    function init() {
        var myMapTemp = new ymaps.Map("map2", {
            center: [53.2487, 50.2155], // координаты центра на карте
            zoom: 17, // коэффициент приближения карты
        });
        myMapTemp.behaviors.disable('scrollZoom');

        var myPlacemarkTemp = new ymaps.Placemark(
            [53.2487, 50.2155], {
                balloonContentHeader: 'КИА Центр на Московском',
                balloonContentBody: '<a href="tel:+78462059999" class="dealer-phone">+7 (846) 205-99-99</a><br><a href="mailto:client@kia-na-moskovskom.ru" class="dealer-email">client@kia-na-moskovskom.ru</a><br><br>\
                    <a href="https://yandex.ru/maps/?z=17&ll=50.2155,53.24869999999764&l=map&rtext=~53.2487,50.2155&origin=jsapi_2_1_76&from=api-maps"  target="_blank" class="dealer-phone">Как добраться</a><br>',
                balloonContentFooter: 'пн — вс: 8:00 — 20:00',
                hintContent: 'КИА Центр на Московском'
            }, {
                preset: 'islands#blueAutoIcon',
                iconColor: '#bb162a'
            });
        myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = myMapTemp.layers.get(0).get(0);

        // Решение по callback-у для определния полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            jQuery('.dealer-map2').children('.loader').removeClass('is-active');
        });
    }

    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function(resolve, reject) {
            var tc = getTileContainer(layer),
                readyAll = true;
            tc.tiles.each(function(tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
                    layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback) {
        var script = document.createElement("script");

        if (script.readyState) { // IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { // Другие браузеры
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
    var ymap = function() {
        jQuery('.dealer-map2').mouseenter(function() {
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                jQuery('.dealer-map2').children('.loader').addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&loadByRequire=1", function() {
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
                    ymaps.load(init);
                });
            }
        });
    }

    //Запускаем основную функцию
    ymap();
});