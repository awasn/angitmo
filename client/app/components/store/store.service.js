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