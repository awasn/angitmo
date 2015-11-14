(function () {
    'use strict';

    angular.module('angitmo').config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('');
        
        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
                template: '<ui-view/>',
                data: {}
            });
    }
})();        