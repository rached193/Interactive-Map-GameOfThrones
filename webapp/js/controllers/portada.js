(function () {

    'use strict';

    angular.module('app-web').controller('ControladorPortada', ControladorPortada);

    ControladorPortada.$inject = ['$scope', '$cookies', '$rootScope'];

    function ControladorPortada($scope, $cookies, $rootScope) {
        var vm = this;
        vm.pruebas = "gatitos";
        $scope.isLogged = function () {
            $scope.Usuario = $cookies.user;
            $scope.Casa = $cookies.casa;
            return !angular.isUndefined($cookies.user);
        };

        $scope.isRegister = function () {
            return !angular.isUndefined($cookies.user) && $cookies.personaje != "null";
        };

        $scope.isSelected = function (checkTab) { //Sobrara
            return $rootScope.tab === checkTab;
        };

        $scope.logOut = function () {
            delete $cookies["user"];
            delete $cookies["casa"];
            delete $cookies["personaje"];
            delete $cookies["sexo"];
        };
    }


})();