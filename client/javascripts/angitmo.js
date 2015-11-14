(function () {
    'use strict';

    angular.module('angitmo.components.store', []);
})();
(function () {
    'use strict';

    angular.module('angitmo.components.store').controller('StoreGenreController', StoreGenreController);

    function StoreGenreController(genres) {
        var vm = this;
        
        vm.genres = genres;
    }
})();
(function () {
    'use strict';

    angular.module('angitmo.components.store').factory('storeService', StoreService);

    function StoreService($log, $http) {
        return {
            findGenres: function () {
                return $http.get('/api/store/genres').then(
                    function (result) {
                        return result.data;
                    },
                    function (error) {
                        $log.error(angular.toJson(error)); // 'Nie można pobrać rodzajów muzyki'
                    });
            },
            findAlbumsByGenre: function (genre) {
                return $http.get('/api/store/albums/genre/' + genre).then(
                    function (result) {
                        return result.data;
                    },
                    function (error) {
                        $log.error(angular.toJson(error)); // 'Nie można pobrać albumów dla rodzaju muzyki'
                    });
            },
            findAlbumById: function (id) {
                return $http.get('/api/store/albums/' + id).then(
                    function (result) {
                        return result.data;
                    },
                    function (error) {
                        $log.error(angular.toJson(error)); // 'Nie można pobrać albumu'
                    });
            }
        }
    }

})();    
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
(function () {
    'use strict';

    angular.module('angitmo.components', [
        'angitmo.components.store'
    ]);

})();        
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
(function () {
    'use strict';

    angular.module('angitmo', [
		'ui.router',
		'angitmo.components'
	])
		.config(['$locationProvider', function ($locationProvider) {
			// https://docs.angularjs.org/error/$location/nobase
			$locationProvider
				.html5Mode(true) // usuwamy znak #, który pojawia przy każdym adresie
				.hashPrefix('!');
		}])
		.run(function ($rootScope, $log) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				var title = toState.data.title;
				$rootScope.title = title;
                var pageTitle = 'angitmo';
                if (title && title.length) {
                    pageTitle = title + ' - ' + pageTitle;
                }
                $rootScope.pageTitle = pageTitle;
			});

			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				$log.info('stateChangeStart');
				console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
			});
			$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				$log.info('stateChangeError');
				$log.error(error);
				$log.error(JSON.stringify(error));
				console.log('$stateChangeError - fired when an error occurs during transition.');
				console.log(arguments);
			});
			$rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
				$log.info('stateNotFound');
				console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
				console.log(unfoundState, fromState, fromParams);
			});

		});
})();	
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