let xhttp = new XMLHttpRequest();
let searchInput = document.getElementById("search-input");
let suggestionsDiv = document.getElementById("suggestions");
let suggestionsUl = document.getElementById("suggestions-list");
let deventsNames = []; // Array contendo o nome dos eventos
let currentTwoLetters = ""; // Atuais duas primeiras letras dos nomes dos eventos que estão no array deventsNames

suggestionsDiv.style.display = "none";

function processInput() {
  // Se o input do usário contém 2 caracteres ou mais, e os dois primeiros caracteres do input não correspodem aos atuais dois carecteres dos eventos armazenados
  // no array deventsNames, então precisamos acessar o banco de dados para obter os eventos.
  if(searchInput.value.length >= 2 && searchInput.value.substring(0,2) != currentTwoLetters) {
    xhttp.open("GET", "http://localhost:8080/api/event/search/" + searchInput.value.toLowerCase(), true);
    xhttp.send();
  }
  // Agora, se o input contém 2 caracteres ou mais, porém os dois primeiros caracteres são iguais aos dois primeiros armazenados atualmente, quer dizer
  // que temos os eventos que podem dar match disponíveis no array deventsNames e não precisamos acessar o BD, bastando procurar no próprio array.
  else if(searchInput.value.length >= 2 && searchInput.value.substring(0,2) == currentTwoLetters) {
    var subListDeventsNames = [];
    clearLis();
    deventsNames.forEach(function(deventName) {
      if(deventName.substring(0, searchInput.value.length) == searchInput.value.toLowerCase()) {
        subListDeventsNames.push(deventName);
      }
    });
    if(subListDeventsNames.length > 0) {
      makeList(subListDeventsNames);
      suggestionsDiv.style.display = "";
    }
    else {
      suggestionsDiv.style.display = "none";
    }
  }
  else {
    //currentTwoLetters = "";
    suggestionsDiv.style.display = "none";
  }
}

xhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    deventsNames = [];
    currentTwoLetters = searchInput.value.substring(0,2);
    let results = JSON.parse(this.responseText);
    results.forEach(function(devent) {
      deventsNames.push(devent.dEvent);
    });
    deventsNames = uniq(deventsNames);

    if(deventsNames.length != 0) {
      clearLis();

      makeList(deventsNames);
      suggestionsDiv.style.display = "";
    }

  }
  else {
    suggestionsDiv.style.display = "none";
  }
};

/* Remove todos os itens de uma lista */
function clearLis() {
  while(suggestionsUl.firstChild) {
    suggestionsUl.removeChild(suggestionsUl.firstChild);
  }
}

/* Retorna um outro array sem elementos repetidos */
function uniq(a) {
  return Array.from(new Set(a));
}

function makeList(items) {
  items.forEach(function(i) {
    var str1 = searchInput.value.toLowerCase();
    var str2 = i.substring(searchInput.value.length);
    let strong = document.createElement("strong");
    strong.appendChild(document.createTextNode(str2));
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(str1));
    li.appendChild(strong);
    suggestionsUl.appendChild(li);
  });
}
