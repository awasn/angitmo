# angitmo

Szablon serwera zwracającego dane dla sklepu muzycznego. Główne zadanie to dostarczenie informacji do klienta napisanego w [AngularJS](https://angularjs.org/). 
Dane pobrane zostały z aplikacji [aspnet/MusicStore](https://github.com/aspnet/MusicStore/blob/master/src/MusicStore/Models/SampleData.cs). Zaimplementowano
jedynie zwracanie danych dla usługi sklepu:

* Albumy;
* Artyści;
* Rodzaj muzyki.

# Architektura

Kod uruchamiający aplikację znajduje się w `server/app.js`. Jako serwer wykorzystano [hapi](http://hapijs.com/), które uruchamiamy w dwóch instancjach:

* API - serwer obsługujący żądania REST;
* WEB - serwer zwracający stronę główną (katalog `server/web/index.html`) oraz zawartość statyczną katalogu `client`.

Żądania do instancji przekierowuje [http-proxy](https://github.com/nodejitsu/node-http-proxy).

Jeśli chodzi o serwer API to delikatnie zasugerowane wykorzystanie wzorca **microservices**. Dane przechowywane są w plikach json. 
Nie trzymam się adresów z przykładów MusicStore ponieważ nie wydały mi się one spójne i poprawne.

Przykłady wywołań REST:

* http://localhost:3000/api/store/genres
* http://localhost:3000/api/store/albums/1
* http://localhost:3000/api/store/albums/genre/pop 

# Uruchomienie

Z poziomu konsoli wpisujemy

```
npm start
```

Jeśli korzystamy z Visual Studio Code wystarczy wybrać przycisk F5.