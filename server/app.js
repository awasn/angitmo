'use strict';

var fs = require('fs');
var path = require('path');
var Hapi = require('hapi');

// ==============================================
// Konfiguracja serwera API
// ==============================================

var apiPort = process.env.API_PORT || 3002;
var apiServer = new Hapi.Server();

apiServer.connection({ port: apiPort, labels: ['storeService'] });
apiServer.register({ register: require('./api/storeService/storeRoutes') }, {
    select: ['storeService'],
    routes: { prefix: '/api/store' }
}, function (err) {
    if (err) {
        console.error('Nie można zarejestrować usługi store');
        throw err;
    }
});


// kolejne microservices - można zdefiniować listę z definicją połączeń, będzie łatwiej w pętli tworzyć...

// apiServer.connection({ port: NUMER_PORTU, labels: ['shoppingCartService'] });
// apiServer.register({ register: require('./api/shoppingCartService/shoppingCartRoutes') }, {
//     select: ['shoppingCartService'],
//     routes: { prefix: '/api/shoppingCart' }
// }, function (err) {
//     if (err) {
//         console.error('Nie można zarejestrować usługi shoppingCart');
//         throw err;
//     }
// });

apiServer.start(function (err) {
    if (err) {
        console.error('Nie można uruchomić serwera API');
        throw err;
    }
    console.log('Serwer API uruchomiony');
});

// ==============================================
// Konfiguracja serwera WEB
// ==============================================

var webPort = process.env.API_PORT || 3001;
var webServer = new Hapi.Server();
webServer.connection({ port: webPort })

webServer.register(require('inert'), function (err) {
    if (err) {
        console.error('Nie można zarejestrować wtyczki treści statycznych serwera WEB');
        throw err;
    }

    function getDirectories(path) {
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path + '/' + file).isDirectory();
        });
    }

    webServer.route({
        method: 'GET',
        path: '/{index*}',
        handler: {
            file: path.join(__dirname, '/web/index.html')
        }
    });

    // udostępniamy zawartość folderu client
    let clientPath = path.join(__dirname, '../client');
    let directories = getDirectories(clientPath);
    for (let index = 0; index < directories.length; index++) {
        let directory = directories[index];
        webServer.route(
            {
                method: 'GET',
                path: `/${directory}/{assets*}`,
                handler: {
                    directory: {
                        path: path.join(clientPath, directory)
                    }
                }
            });
    }
});

webServer.start(function (err) {
    if (err) {
        console.error('Nie można uruchomić serwera WEB');
        throw err;
    }
    console.log('Serwer WEB uruchomiony: ' + webServer.info.uri);
});


// ==============================================
// Uruchomienie serwera proxy
// ==============================================

var http = require('http');
var httpProxy = require('http-proxy');

var proxyPort = process.env.PORT || 3000;
var proxy = httpProxy.createProxyServer({});
var proxyServer = http.createServer(function (request, response) {
    if (request.url.startsWith('/api/store')) {
        // żądanie API
        proxy.web(request, response, { target: `http://localhost:${apiPort}` });
    } else {
        // żądanie WEB
        proxy.web(request, response, { target: `http://localhost:${webPort}` });
    }
});

proxyServer.listen(proxyPort, function (err) {
    if (err) {
        console.error('Nie można uruchomić serwera PROXY');
        throw err;
    }
    console.log('Serwer PROXY uruchomiony: ' + proxyPort);
});

module.exports = {
    apiServer: apiServer,
    webServer: webServer,
    proxyServer: proxyServer
}