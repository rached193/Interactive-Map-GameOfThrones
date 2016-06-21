(function () {

    'use strict';


    angular.module('app-web').controller('ControladorMapa', ControladorMapa);


    ControladorMapa.$inject = ['$http', '$scope', '$cookies', '$rootScope', '$q'];
    function ControladorMapa($http, $scope, $cookies, $rootScope, $q) {
        var vm = this;
        $rootScope.tab = 7;

        $scope.dameLocalizacion = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('/api/v1/Mapa/' + $cookies.user)
                .success(function (data, status, headers, config) {
                    defered.resolve(data);
                }).error(function (err) {
                defered.reject(err)
            });
            return promise;
        };
        $scope.sitio = "Fuera";

        $scope.ciudadinicial = "win";

        $scope.mueveLocalizacion = function (movimiento) {
            $http.post('/api/v1/Mapa/' + $cookies.user, {movimiento: movimiento})
                .success(function (data, status, headers, config) {
                    console.log(data);
                }).error(function (err) {
                alert("Algo exploto");
            });

        };


        $scope
            .CargarMapa = function () {
            var dataTemp = {};
            angular.forEach($scope.Region, function (province, key) {
                dataTemp[province.provinces] = {
                    name: province.nombresProvincia,
                    color: province.coloresProvincia,
                    usuarios: province.usuarios
                }
            });
            $scope.dummyData = dataTemp;
        };
    }
})();