
app.controller("ControladorChat", ['$scope', '$cookies', '$http', '$window', '$rootScope', function ($scope, $cookies, $http, $window, $rootScope) {
    $rootScope.tab = 3;
    $http.get('/api/v1/Chat/' + $cookies.user)
        .success(function (data, status, headers, config) {
            $scope.msgs = data;
        });

    $scope.escribir = function (texto) {
        if ($cookies.personaje != null) {
            $http.post('/api/v1/Chat/' + $cookies.user, {
                pjmsg: $cookies.sexo + " " + $cookies.personaje + " " + $cookies.casa,
                msg: texto
            })
                .success(function (data, status, headers, config) {
                    $window.location.reload();
                })
                .error(function () {
                    alert("Fallo en conexion");
                })
        } else {
            alert("Registra Personaje");
        }
    };

}]);


app.controller("ControladorPrivados", ['$scope', '$cookies', '$http', '$window', '$rootScope', function ($scope, $cookies, $http, $window, $rootScope) {
    $rootScope.tab = 8;
    $http.get('/api/v1/Privado/' + $cookies.casa)
        .success(function (data, status, headers, config) {
            $scope.msgs = data;
        });

    $http.get('/api/v1/Personaje')
        .success(function (data, status, headers, config) {
            $scope.myData = data;
        });

    $scope.escribir = function (mensaje) {
        if ($cookies.personaje != null) {
            $http.post('/api/v1/Privado/' + mensaje.destinatario, {remitente: $cookies.casa, mensaje: mensaje.text})
                .success(function (data, status, headers, config) {
                    $window.location.reload();
                })
                .error(function () {
                    alert("Fallo en conexion");
                })
        } else {
            alert("Registra Personaje");
        }
    };

}]);

app.controller("ControladorListado", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $rootScope.tab = 2;

    $http.get('/api/v1/Personaje')
        .success(function (data, status, headers, config) {
            $scope.myData = data;
        });
    $scope.mySelections = [];


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{field: 'name', displayName: 'Nombre'}, {field: 'casa', displayName: 'Casa'}],
        multiSelect: false,
        selectedItems: $scope.mySelections
    };

}]);


app.controller("ControladorHistoria", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $rootScope.tab = 1;
}]);

app.controller("ControladorFichaUsuario", ['$scope', '$http', '$rootScope', '$location', '$cookies', '$routeParams', function ($scope, $http, $rootScope, $location, $cookies, $routeParams) {

    $http.get('/api/v1/Personaje/' + $routeParams.userID).success(function (data, status, headers, config) {
        $scope.usuario = data;
    });

}]);

app.controller("ControladorPersonaje", ['$scope', '$http', '$rootScope', '$location', '$cookies', function ($scope, $http, $rootScope, $location, $cookies, $routeParams) {
    $rootScope.tab = 6;

    $scope.update = function (user) {
        OneSignal.push(["registerForPushNotifications"], {modalPrompt: true});
        OneSignal.push(["getIdsAvailable", function (ids) {
            console.log(ids)
            $http.post("/api/v1/Dispositivo/" + $cookies.user, {api: ids.userId})
                .success(function () {


                })
        }]);
        var checkuser = {
            name: $scope.user.name,
            gender: $scope.user.gender,
            edad: $scope.user.edad,
            apariencia: $scope.user.apariencia,
            historia: $scope.user.historia,
        };

        $http.post("/api/v1/Personaje/" + $cookies.user, checkuser)
            .success(function (user) {
                $cookies.personaje = $scope.user.name;
                if ($scope.user.gender == "hombre") {
                    $cookies.sexo = "Lord";
                } else if ($scope.user.gender == "mujer") {
                    $cookies.sexo = "Lady";
                }
                OneSignal.push(["registerForPushNotifications"], {modalPrompt: true});
                OneSignal.push(["getIdsAvailable", function (ids) {
                    console.log("getIdsAvailable:"
                        + "\nUserID: " + ids.userId
                        + "\nRegistration ID: " + ids.registrationId);
                }]);

                $location.path("/index");
            })
            .error(function (data, status) {
                alert("Error al Crear Personaje.");
            })
    };


}]);

app.animation('.slide-animation', function () {
    return {
        addClass: function (element, className, done) {
            if (className == 'ng-hide') {
                TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done});
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                TweenMax.set(element, {left: element.parent().width()});
                TweenMax.to(element, 0.5, {left: 0, onComplete: done});
            }
            else {
                done();
            }
        }
    };
});
