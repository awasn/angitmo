# Obraz bazujący na dystrybucji Alpine Linux
FROM iron/node:dev

# Ustalenie i utworzenie katalogu, w którym będą wykonywane polecenia. W tym miejscu zostanie umieszczony kod aplikacji.
# Po wykonaniu polecania 'docker run -it angitmo sh' będzie to nasz bieżący katalog.
WORKDIR /app

# Zapamiętanie przez Docker pakietów npm w pamięci podręcznej (aktualizacja nastąpi jedynie w przypadku zmiany package.json)
COPY package.json package.json
RUN npm install

# Skopiowanie kodu aplikacji do obrazu. Operacje tą wykonujemy dopiero po instalacji pakietów zależnych w katalogu node_modules.
# Dzięki czemu jeśli zajdą zmiany tylko w kodzie aplikacji bez zmian w package.json w procesie przygotowywania obrazu Docker
# pobierze dane do node_modules z pamięci podręcznej
COPY . .

# Udostępnienie portu na połączenia HTTP. Udostępniamy tylko port serwera proxy. Dzięki temu chronimy dostęp do serwera WEB i API
EXPOSE 3000

# Uruchomienie aplikacji. CMD ["npm", "start"] = CMD ["node", "server/app.js"]
CMD ["npm", "start"]