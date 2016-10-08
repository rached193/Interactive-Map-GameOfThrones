(function () {

    'use strict';

    angular.module('app').controller('ControladorSignUp', ControladorSignUp);


    ControladorSignUp.$inject = ['$scope', '$http', '$location', '$cookies', '$rootScope'];
    function ControladorSignUp($scope, $http, $location, $cookies, $rootScope) {
        var vm = this;
        vm.tab = 3;

        $scope.update = function (user) {
            if (user.pass == user.repass) {
                var checkuser = {
                    name: $scope.user.name,
                    email: $scope.user.email,
                    passw: $scope.user.pass
                };
                $http.post("/api/v1/signup", checkuser)
                    .success(function (user) {
                        $cookies.user = $scope.user.name;
                        $location.path("/index");
                    })
                    .error(function () {
                        alert("Nombre o email ya registrado.");
                    })
            } else {
                alert("Las contraseñas no coinciden");
            }
        };

    }
})();