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
                    if (scope.dummyData[regionId].usuarios.length > 0) {


                        var b = path.getBBox();

                        var x = b.x + b.width / 2;
                        var y = b.y + b.height / 2;

                        // var t = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        var t = document.createElement("icon-pj");

                        t.setAttribute("x", x);
                        t.setAttribute("y", y);
                        t.setAttribute("data-pj", y);
                        t.setAttribute("z-index",'999999999999');

                        // if (regionId == data.localizacion) {
                        //     t.setAttribute("fill", "red");
                        //     t.setAttribute("class", "draggable drag-drop");
                        // } else {
                        //     t.setAttribute("fill", "blue");
                        // }

                        $compile(t)(scope);
                        console.log(t);

                        //<rect id="svg_1" class="ciudad" height="100" width="100" y="79.5" x="84" stroke-width="1.5" stroke="#000" fill="#fff"/>
                        //t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");

                        // t.setAttribute("x", (b.x + b.width / 2));
                        // t.setAttribute("y", (b.y + b.height / 2));

                        //  t.setAttribute("data-x", (b.x + b.width/2));
                        //t.setAttribute("data-y", (b.y + b.height/2));
                        //t.setAttribute("style","transform: translate("+ (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");

                        // t.setAttribute("width", "30");
                        // t.setAttribute("height", "30");
                        // if (regionId == data.localizacion) {
                        //     t.setAttribute("fill", "red");
                        //     t.setAttribute("class", "draggable drag-drop");
                        // } else {
                        //     t.setAttribute("fill", "blue");
                        // }
                        frame[0].appendChild(t);

                    }
                    $compile(regionElement)(scope);

                })

            })


        }
    }
}]);


angular.module('app').directive('iconPj', ['$compile', function ($compile) {
    return {
        templateUrl: 'icon-pj.svg',
        transclude: true,
        replace: true,
        link: function (scope, element, attrs) {
           // element.attr("x", scope.dataX);
           // element.attr("y", scope.dataY);
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
