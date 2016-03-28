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

# Docker

Plik `Dockerfile` zawiera konfigurację umożliwiającą uruchomienie aplikacji korzystając z wirtualizacji Docker. Na podstawie `Dockerfile` budujemy obraz systemu,
na bazie którego uruchamiany jest kontener. W czasie budowania obrazu Docker zapamiętuje stan kolejnych poleceń dzięki czemu przy ponownym budowaniu obrazu, jeśli istnieje
taka możliwość, pobierane są zapamiętane dane. Przykładowo w załączonym pliku `Dockerfile` wywoływana jest sekwencja:

```
COPY package.json package.json
RUN npm install
```

Kopiujemy plik zawierający konfigurację projektu a następnie żądamy aktualizacji pakietów w katalogu `node_modules`. W czasie budowania obrazu jeśli zawartość pliku
`package.json` nie zmieniła się od ostatniego tworzenia obrazu Docker pobierze efekt wykonania polecenia `RUN npm install` z pamięci podręcznej. Oczywiście jeśli
chcemy zawsze kopiować do obrazu kod razem z katalogiem `node_modules` to możemy powyższe linie zakomentować.

Polecenie `WORKDIR /app` poinformuje Docker, iż katalog o ścieżce bezwzględnej `/app` będzie domyślnym miejscem docelowym dla pozostałych komend. Dzięki temu zamiast 

```
COPY package.json /app/package.json

COPY . /app
```
 
można napisać

```
COPY package.json package.json

COPY . .
```

Utworzenie obrazu o nazwie `angitmo` ustanawiamy poleceniem:

```
docker build -t angitmo .
```

W celu uruchomienia obrazu jako kontener wykonujemy komendę:

```
docker run -p 3000:3000 -d --name angitmo angitmo
```

Musimy poinformować Docker (parameter `-p`) jaki port maszyny hosta (w przypadku systemu Windows będzie to maszyna wirtualna w ramach VirtualBox) umożliwi nam dostęp do
zadeklarowanego portu w pliku `Dockerfile`. Dzięki parametrowi `-d` kontener zostanie uruchomiony w tle. Korzystamy również z możliwości nadania nazwy kontenerowi do czego
służy parametr `--name`. Dzięki temu np. przy zatrzymywaniu kontenera będziemy mogli skorzystać z nazwy a nie z wartości `CONTENER ID` nadawanej automatycznie przez Docker:

```
docker stop angitmo
```

Zauważmy, iż fakt udostępnienia tylko portu 3000 uniemożliwia nam bezpośredni dostęp do aplikacji WEB (http://localhost:3001) oraz API (np. http://localhost:3002/api/store/albums/genre/pop).

W przypadku uruchamiania Docker w systemie Windows lub Mac OS X nie możemy do kontenera odwołać się poprzez http://localhost:3000. W tych systemach Docker
uruchamiany jest bowiem w ramach maszyny wirtualnej i to adres IP tej maszyny jest adresem kontenera. Aby pobrać ten adres możemy skorzystać z polecenia:

```
docker-machine ip
```

lub sprawdzić konfigurację w aplikacji Kitematic (dla systemu Windows lub Mac OS X).

# Historia zmian

* v1.0 - aplikacja w części klienta oparta o [Semantic UI](http://semantic-ui.com/), [AngularJS](https://angularjs.org/) w wersji 1.5 oraz [hapi](http://hapijs.com/) i 
[http-proxy](https://github.com/nodejitsu/node-http-proxy) po stronie serwera;
* v1.1 - dodanie pliku `Dockerfile` umożliwiającego wirtualizację aplikacji.