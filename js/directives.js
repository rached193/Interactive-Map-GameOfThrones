angular.module('app-web').directive('svgMap', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    templateUrl: 'westeros.svg',
    link: function (scope, element, attrs) {
      var regions = element[0].querySelectorAll('.nopower');
      angular.forEach(regions, function (path, key) {
        var regionElement = angular.element(path);
        regionElement.attr("region", "");
        regionElement.attr("dummy-data", "dummyData");
        $compile(regionElement)(scope);
      })
    }
  }
}]);
angular.module('app-web').directive('region', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    scope:  {
      dummyData: "="
    },
    link: function (scope, element, attrs) {
      scope.elementId = element.attr("id");
      scope.regionClick = function () {
        alert(scope.dummyData[scope.elementId].name);
      };
      element.attr("ng-click", "regionClick()");
      element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}"); //<--- THIS BIT!
      element.removeAttr("region"); //Region
      $compile(element)(scope);
    }
  }
}]);
