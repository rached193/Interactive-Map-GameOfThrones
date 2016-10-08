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
            vm.slides = angular.copy(initData);
            vm.slides[vm.currentIndex]['ticked'] = true;
        };

        vm.nextSlide = function () {
            vm.currentIndex = (vm.currentIndex > 0) ? --vm.currentIndex : vm.slides.length - 1;
            vm.slides = angular.copy(initData);
            vm.slides[vm.currentIndex]['ticked'] = true;
        };


        function init() {
            vm.slides = angular.copy(initData);
            vm.slides[0]['ticked'] = true;
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
