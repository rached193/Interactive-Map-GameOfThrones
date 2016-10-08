var app = angular.module('app', [
    'ngRoute', 'ngCookies', 'ngAnimate',
    "isteven-multi-select", "ngLodash"
]);


//Constantes
var partial = "view/";

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when("/mapa", {
                templateUrl: partial + "partialMapa.html",
                controller: "ControladorMapa"
            })
            .when("/index", {
                templateUrl: partial + "partialHistoria.html",
                controller: "ControladorHistoria"
            })
            .when("/chat", {
                templateUrl: partial + "partialChat.html",
                controller: "ControladorChat"
            })
            .when("/mensajes", {
                templateUrl: partial + "partialPrivados.html",
                controller: "ControladorPrivados"
            })
            .when("/login", {
                templateUrl: partial + "partiallogin.html",
                controller: "ControladorLogin"
            })
            .when("/casas", {
                templateUrl: partial + "partialSeleccionarCasa.html",
                controller: "ControladorCasas as casasVM",
                resolve: {
                    initData: initCasas
                }
            })
            .when("/signup", {
                templateUrl: partial + "partialsignupsimple.html",
                controller: "ControladorSignUp"
            })
            .when("/usuarios", {
                templateUrl: partial + "partialusuarios.html",
                controller: "ControladorListado"
            })
            .when("/personaje", {
                templateUrl: partial + "partialformPersonaje.html",
                controller: "ControladorPersonaje"
            })
            .when("/perritos/:userID", {
                templateUrl: partial + "partialListadoFichas.html",
                controller: "ControladorFichaUsuario"
            })
            .otherwise({redirectTo: "/index"});
    }]);


angular.module('app').factory('initCasas', initCasas);

initCasas.$inject = ['$http', '$q', 'lodash'];


function initCasas($http, q, lodash) {

    var defered = q.defer();
    var promise = defered.promise;

    $http.get('/api/v1/seleccionar')
        .success(function (data) {
            lodash.forEach(data, function (item, index) {
                data[index]['pic'] = '<img src="casas/' + item.nombre.toLowerCase().replace(/ /g,"_") + '.png"/>';
                data[index]['indice'] = index;
            });
            defered.resolve(data);
        }).error(function (err) {
        defered.reject(err)
    });
    return promise;
}
