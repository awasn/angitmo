(function () {
    'use strict';

    angular.module('angitmo.components.store').controller('StoreGenreController', StoreGenreController);

    function StoreGenreController(genres) {
        var vm = this;
        
        vm.genres = genres;
    }
})();