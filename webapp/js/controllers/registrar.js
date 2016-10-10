(function () {

    'use strict';

    angular.module('app').controller('ControladorSignUp', ControladorSignUp);


    ControladorSignUp.$inject = ['$scope', '$http', '$location', '$rootScope', 'mainFactory'];
    function ControladorSignUp($scope, $http, $location, $rootScope, mainFactory) {
        var vm = this;
        $rootScope.situacion = "Login";

        vm.registar = registrar;

        function registrar(user) {
            if (user.password == user.password_val) {
                var info = {
                    name: user.name,
                    email: user.email,
                    password: user.password
                };
                mainFactory.registar(info).then(function () {
                    var usuario = {username:user.name};

                    $location.path("/index");
                }, alert("Nombre o email ya registrado."))
            } else {
                alert("Las contraseñas no coinciden");
            }
        }

    }
})();