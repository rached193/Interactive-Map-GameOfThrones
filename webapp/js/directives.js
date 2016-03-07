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

        var regionId = regionElement.attr("id");

        //Colocar Perosnajes
        if(regionId == scope.ciudadinicial){
        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var b = path.getBBox();
        t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");
        t.textContent = "a";
        t.setAttribute("fill", "red");
        t.setAttribute("font-size", "14");
        path.parentNode.insertBefore(t, path.nextSibling);

      }
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
      element.attr("class", "dropzone");
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

        regionElement.attr("class", "dropzone");
        //regionElement.attr("class", "draggable drag-drop dropzone");
        $compile(regionElement)(scope);
      })
    }
  }
}]);
