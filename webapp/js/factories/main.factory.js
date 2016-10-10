(function () {

    'use strict';

    angular.module('app').factory('mainFactory', mainFactory);

    mainFactory.$inject = ['$http', '$q'];


    function mainFactory($http, q) {

        var factory = {
            getCasas: _getCasas,
            registrar: _registrar
        };

        function _getCasas() {
            var deferred = q.defer();
            var promise = deferred.promise;

            $http.get('/api/v1/seleccionar')
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                deferred.reject(err)
            });
            return promise;
        }

        function _registrar(dataPost) {
            var deferred = q.defer();
            var promise = deferred.promise;

            $http.post('/api/v1/signup',dataPost)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                deferred.reject(err)
            });
            return promise;
        }


        return factory;
    }

})();