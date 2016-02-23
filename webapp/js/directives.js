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
      element.attr("ng-attr-fill", "{{dummyData[elementId].color}}"); //<--- THIS BIT!
      element.removeAttr("region"); //Region
      $compile(element)(scope);
    }
  }
}]);

angular.module('app-web').directive('mapTest', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    templateUrl: 'pruebas.svg',
    link: function (scope, element, attrs) {
      var regions = element[0].querySelectorAll('.ciudad');
      angular.forEach(regions, function (path, key) {
        var regionElement = angular.element(path);
        //regionElement.attr("region", "");
        //x-lvl-draggable='true' x-lvl-drop-target="true" x-on-drop="dropped(dragEl, dropEl)"
        regionElement.attr("x-lvl-draggable", "true");
        regionElement.attr("x-lvl-drop-target", "true");
        regionElement.attr("x-on-drop", "dropped()");
        //class="slot"
        regionElement.attr("class", "slot ciudad");
        $compile(regionElement)(scope);
      })
    }
  }
}]);
