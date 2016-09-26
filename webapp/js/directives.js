angular.module('app').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'westeros.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.nopower');
            var frame = element[0].querySelectorAll('.frame');
            var regionInicial = scope.dameLocalizacion();

            regionInicial.then(function (data) {
              scope.Region = data.mapa;
              scope.CargarMapa();
                angular.forEach(regions, function (path, key) {
                    var regionElement = angular.element(path);
                    regionElement.attr("region", "");
                    regionElement.attr("dummy-data", "dummyData");

                    var regionId = regionElement.attr("id");
                    console.log(scope.dummyData[regionId]);
                    console.log(scope.dummyData[regionId].usuarios.length)

                    //if (regionId == data.localizacion) {

                    //Colocar Perosnajes
                    if (scope.dummyData[regionId].usuarios.length>0) {
                        var t = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        var b = path.getBBox();
                        //<rect id="svg_1" class="ciudad" height="100" width="100" y="79.5" x="84" stroke-width="1.5" stroke="#000" fill="#fff"/>
                        //t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");
                        t.setAttribute("x", (b.x + b.width / 2));
                        t.setAttribute("y", (b.y + b.height / 2));
                        //  t.setAttribute("data-x", (b.x + b.width/2));
                        //t.setAttribute("data-y", (b.y + b.height/2));
                        //t.setAttribute("style","transform: translate("+ (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");

                        t.setAttribute("width", "30");
                        t.setAttribute("height", "30");
                        if (regionId == data.localizacion) {
                          t.setAttribute("fill", "red");
                          t.setAttribute("class", "draggable drag-drop");
                        }else{
                          t.setAttribute("fill", "blue");
                        }
                        //t.setAttribute("z-index","999999999");
                        frame[0].appendChild(t);

                    }
                    $compile(regionElement)(scope);

                })

            })
        }
    }
}]);


angular.module('app').directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            dummyData: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
                alert(scope.dummyData[scope.elementId].name);
            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-attr-fill", "{{dummyData[elementId].color}}"); //<--- THIS BIT!
            element.attr("class", "dropzone");
            element.removeAttr("region"); //Region
            $compile(element)(scope);
        }
    }
}]);

angular.module('app').directive('mapTest', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'pruebas.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.ciudad');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                //regionElement.attr("region", "");

                regionElement.attr("class", "dropzone");
                //regionElement.attr("class", "draggable drag-drop dropzone");
                $compile(regionElement)(scope);
            })
        }
    }
}]);
