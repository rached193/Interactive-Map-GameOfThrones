angular.module('app-web').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: '/westeros.svg',
        link: function (scope, element, attrs) {

        }
    }
}]);
