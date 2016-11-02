(function () {

    'use strict';

    angular.module('app').controller('ControladorSignUp', ControladorSignUp);


    ControladorSignUp.$inject = ['$scope', '$http', '$location', '$rootScope', 'mainFactory'];
    function ControladorSignUp($scope, $http, $location, $rootScope, mainFactory) {
        var vm = this;
        $rootScope.situacion = "Login";

        vm.registrar = registrar;
        vm.gatetes = "Miau";
        vm.pruebas = pruebas;

        function pruebas() {
            console.log("EUUU");
        }

        function registrar(user) {
            console.log(user);
             console.log("miauu");
            if (user.password == user.re_password) {
                var info = {
                    name: user.name,
                    email: "test",
                    password: user.password
                };
                console.log(info);
                mainFactory.registrar(info).then(function () {
                    var usuario = {username: user.name};

                    /** Guardar usuario en LocalStorage **/
                    $location.path("/index");
                }, alert("Nombre o email ya registrado."))
            } else {
                alert("Las contraseñas no coinciden");
            }
        }

    }
})();