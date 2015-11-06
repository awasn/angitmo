'use strict';

exports.register = function (server, options, next) {

    return next();
};

exports.register.attributes = {
    name: 'shoppingCart',
    version: '1.0.0'
}; 