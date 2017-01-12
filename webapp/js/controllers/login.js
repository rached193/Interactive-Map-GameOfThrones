(function () {

    'use strict';

    angular.module('app').controller('ControladorLogin', ControladorLogin);


    ControladorLogin.$inject = ['$scope', '$http', '$location', '$rootScope'];
    function ControladorLogin($scope, $http, $location, $rootScope) {

        $rootScope.tab = 4;

        $scope.submitLogin = function () {
            var user = {
                name: $scope.nombre,
                password: $scope.pass
            };

            $http.post('/api/v1/login', user)
                .then(function (data, status, headers, config) {
                    var data = data.data;
                    var titulo = "";
                    if (data.sexo == "hombre") {
                        titulo = "Lord";
                    } else if (data.sexo == "mujer") {
                        titulo = "Lady";
                    }
                    var userInfo = {
                        username: $scope.nombre,
                        name: data.nickname,
                        casa: data.casa,
                        personaje: data.personaje,
                        sexo: titulo
                    }
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));


                    $location.path("/index");
                }, function () {
                    alert("Usuario o contraseña Incorrectas");
                });
        };

    }
})();