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
		});
})();	