# DESAFIO DITO
https://desafio-dito.herokuapp.com/

API
---
Para o desenvolvimento da API, foram utilizados o Node.js e o MongoDB (sistema de banco de dados). Essa escolha foi baseada na facilidade no desenvolvimento,
sendo possível escrever tanto o código do back-end e do front-end na mesma linguagem. O MongoDB foi escolhido porque, por padrão, ele prioriza a taxa de inserção,
que é a operação que seria mais feita na vida real (já que possivelmente milhões de eventos teriam de ser registrados todos os dias).
<br>
O código da API encontra-se no arquivo app.js.
<br>
A API contém dois endpoints:
- **GET /api/event/search/:str :** Permite executar o método GET para obter os eventos que comecem com os caracteres da variável str
- **POST /api/event/register :** Permite executar o método POST para registrar um evento no banco de dados

AUTOCOMPLETE
---
Para a página de autocomplete, foram utilizados somente HTML, CSS e Javascript puros.
<br>
A página encontra-se em public/index.html e public/css/style.css e o script da funcionalidade de autocomplete encontra-se em public/js/script.js

MOCK DATA
---
Para o teste das funcionalidades, o banco de dados foi populado com 201.399 eventos gerados aleatoriamente através da função seedDB().
<br>
Os eventos têm os seguintes nomes: login, buy, rent, cancel, clickeditem, watchedmovie, watchedseries, watchedconcert, commented, rated, searchedmovie,
searchedseries, searchedconcert
