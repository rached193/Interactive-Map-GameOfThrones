angular.module('app-web').directive('svgMap', ['$compile', function ($compile) {
  return {
      restrict: 'A',
      templateUrl: 'westeros.svg',
      link: function (scope, element, attrs) {
          var regions = element[0].querySelectorAll('.state');
          angular.forEach(regions, function (path, key) {
              var regionElement = angular.element(path);
              regionElement.attr("region", "");
              $compile(regionElement)(scope);
          })
      }
  }
}]);
angular.module('app-web').directive('region', ['$compile', function ($compile) {
  return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
          scope.elementId = element.attr("id");
          scope.regionClick = function () {
              alert(scope.elementId);
          };
          element.attr("ng-click", "regionClick()");
          element.removeAttr("region"); //Region
          $compile(element)(scope);
      }
  }
}]);
