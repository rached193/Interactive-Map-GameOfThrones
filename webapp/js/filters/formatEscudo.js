(function () {

    'use strict';

    angular.module('app').filter('formatEscudo', formatEscudo);
    formatEscudo.$inject = [];

    function formatEscudo() {
        return function (input) {
            return input.toLowerCase().replace(/ /g,"_")+'.png';
        }
    }
})();