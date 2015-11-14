(function () {
    'use strict';

    angular.module('angitmo.components').config(config);

    function config($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/',
                templateUrl: '/app/components/home/home.html'
            });
    }
})();        