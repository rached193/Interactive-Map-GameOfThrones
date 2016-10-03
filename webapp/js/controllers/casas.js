(function () {

    'use strict';

    angular.module('app').controller('ControladorCasas', ControladorCasas);
    ControladorCasas.$inject = ['$scope', '$http', '$location', '$rootScope', 'initData'];

    function ControladorCasas($scope, $http, $location, $rootScope, initData) {
        var vm = this;
        $rootScope.tab = 4;


        vm.out = [];

        vm.pick = function (data) {
            vm.setCurrentSlideIndex(data.indice);
        };


        vm.currentIndex = 0;

        vm.setCurrentSlideIndex = function (index) {
            vm.currentIndex = index;


        };

        vm.isCurrentSlideIndex = function (index) {
            return vm.currentIndex === index;
        };

        vm.prevSlide = function () {
            vm.currentIndex = (vm.currentIndex < vm.slides.length - 1) ? ++vm.currentIndex : 0;
            var casas = initData;
            casas[vm.currentIndex]['ticked'] = true;
            vm.slides = casas;
            vm.out = [];
        };

        vm.nextSlide = function () {
            vm.currentIndex = (vm.currentIndex > 0) ? --vm.currentIndex : vm.slides.length - 1;
            var casas = initData;
            casas[vm.currentIndex]['ticked'] = true;
            vm.slides = casas;
            vm.out = [];
        };


        function init() {
            var casas = initData;
            casas[0]['ticked'] = true;
            vm.slides = casas;
        }

        init();
        // vm.registrar = function () {
        //     $http.post('/api/v1/seleccionar', {user: $cookies.user, casa: $scope.slides[$scope.currentIndex].nombre})
        //         .success(function (data, status, headers, config) {
        //             $cookies.casa = $scope.slides[$scope.currentIndex].nombre;
        //             $location.path("/index");
        //             alert("Casa Registrada con exito");
        //         })
        //         .error(function () {
        //             alert("Casa no disponible");
        //         })
        // };


    }
})();
