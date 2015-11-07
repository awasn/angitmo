# angitmo

Szablon serwera zwracającego dane dla sklepu muzycznego. Główne zadanie to dostarczenie informacji do klienta napisanego w [AngularJS](https://angularjs.org/). 
Przykładowe dane pobrane zostały z aplikacji [aspnet/MusicStore](https://github.com/aspnet/MusicStore/blob/master/src/MusicStore/Models/SampleData.cs). Zaimplementowano
jedynie zwracanie informacji dla usługi sklepu:

* Albumy;
* Artyści;
* Rodzaj muzyki.

# Architektura

Kod uruchamiający aplikację znajduje się w `server/app.js`. Jako serwer wykorzystano [hapi](http://hapijs.com/), który startuje w dwóch instancjach:

* API - serwer obsługujący żądania REST (domyślnie port 3002);
* WEB - serwer zwracający stronę główną (katalog `server/web/index.html`) oraz zawartość statyczną katalogu `client` (domyślnie port 3001).

Żądania do instancji przekierowuje [http-proxy](https://github.com/nodejitsu/node-http-proxy) (domyślnie port 3000).

Jeśli chodzi o serwer API to delikatnie zasugerowane jest wykorzystanie wzorca **microservices**. Dane przechowywane są w plikach json. 
Nie ma utrzymanych adresów z przykładów MusicStore ponieważ nie wydawały się spójne i poprawne.

Przykłady wywołań REST:

* http://localhost:3000/api/store/genres
* http://localhost:3000/api/store/albums/1
* http://localhost:3000/api/store/albums/genre/pop

Przykład wywołania WEB:

* http://localhost:3000 

# Uruchomienie

Po pobraniu kodu aplikacji należy pobrać moduły zależne zdefiniowane w pliku **package.json**. W tym celu w konsole NodeJS wpisujemy

```
npm install
```

Po pobraniu kodu możemy uruchomić serwery. W tym celu w konsoli wpisujemy

```
npm start
```

Jeśli korzystamy z Visual Studio Code wystarczy wybrać przycisk F5.