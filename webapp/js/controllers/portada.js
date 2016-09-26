(function () {

    'use strict';

    angular.module('app').controller('ControladorPortada', ControladorPortada);

    ControladorPortada.$inject = ['$scope', '$cookies', '$rootScope','mainFactory'];

    function ControladorPortada($scope, $cookies, $rootScope,mainFactory) {
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

        $scope.logOut = function () { //Sustituir por Local Storage
            delete $cookies["user"];
            delete $cookies["casa"];
            delete $cookies["personaje"];
            delete $cookies["sexo"];
        };

        // function init() {
        //     mainFactory.getCasas().then(function (response) {
        //         console.log(response);
        //     });
        // }
        //     init();
    }



})();