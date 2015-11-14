'use strict';

var _ = require('lodash');
var Joi = require('joi');

var albums = require('./db/albums');
var artists = require('./db/artists');
var genres = require('./db/genres');

exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/genres',
            handler: (request, reply) => { return reply(genres); }
        },
        {
            method: 'GET',
            path: '/albums/genre/{name}',
            handler: (request, reply) => { return reply(_.filter(albums, album => album.genre = request.params.name)); },
            config: {
                validate: {
                    params: {
                        name: Joi.string().required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/albums/{id}',
            handler: (request, reply) => { return reply(albums[request.params.id - 1]); },
            config: {
                validate: {
                    params: {
                        id: Joi.number().integer().required().min(1).max(albums.length)
                    }
                }
            }
        }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'store',
    version: '1.0.0'
}; 