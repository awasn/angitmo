(function () {
    'use strict';

    angular.module('angitmo.components.store').config(config);

    function config($stateProvider) {
        $stateProvider
            .state('app.store', {
                abstract: true,
                url: '/store',
                template: '<ui-view/>'
            })
            .state('app.store.genres', {
                url: '/genres',
                templateUrl: '/app/components/store/genre/genre.html',
                controller: 'StoreGenreController',
                controllerAs: 'storeGenre',
                data: { title: 'rodzaje muzyki' },
                resolve: {
                    genres: function (storeService) {
                        return storeService.findGenres();
                    }
                }
            });
    }
})();        