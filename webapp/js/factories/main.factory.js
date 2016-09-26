(function () {

    'use strict';

    angular.module('app').factory('mainFactory', mainFactory);

    mainFactory.$inject = ['$scope', '$rootScope', '$http', '$q'];


    function mainFactory($scope, $rootScope, $http, q) {

      var factory = {
            getCasas: _getCasas()
        };
        function _getCasas() {
            var defered = q.defer();
            var promise = defered.promise;

            $http.get('/api/v1/Personaje')
                .success(function (data, status, headers, config) {
                    console.log(data);
                     defered.resolve(data);
                }) .error(function(err) {
                defered.reject(err)
            });
            return promise;
        }

            return factory;
    }

})();