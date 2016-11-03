

app.controller("ControladorLogin", ['$scope', '$http', '$location', '$cookies', '$rootScope', function ($scope, $http, $location, $cookies, $rootScope) {
    $rootScope.tab = 4;

    $scope.submitLogin = function () {
        var user = {
            name: $scope.nombre,
            password: $scope.pass,
        };
        $http.post('/api/v1/login', user)
            .success(function (data, status, headers, config) {
                $cookies.user = data.nickname;
                $cookies.casa = data.casa;
                $cookies.personaje = data.personaje;
                if (data.sexo == "hombre") {
                    $cookies.sexo = "Lord";
                } else if (data.sexo == "mujer") {
                    $cookies.sexo = "Lady";
                }
                $location.path("/index");
            })
            .error(function () {
                alert("Usuario o contraseña Incorrectas");
            })
    };

}]);