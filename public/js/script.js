var xhttp = new XMLHttpRequest();
var searchInput = document.getElementById("search-input");
var suggestionsDiv = document.getElementById("suggestions");
var suggestionsUl = document.getElementById("suggestions-list");

suggestionsDiv.style.display = "none";

function processInput() {
  if(searchInput.value.length >= 2) {
    xhttp.open("GET", "http://localhost:8080/api/event/" + searchInput.value.toLowerCase(), true);
    xhttp.send();
  }
  else {
    suggestionsDiv.style.display = "none";
  }
}

xhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    var results = JSON.parse(this.responseText);
    var deventsNames = [];
    results.forEach(function(devent) {
      deventsNames.push(devent.dEvent);
    });

    clearLis();

    deventsNames.forEach(function(deventName, index) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(deventName));
      suggestionsUl.appendChild(li);
    });

    suggestionsDiv.style.display = "";

  }
  else {
    suggestionsDiv.style.display = "none";
  }
};


function clearLis() {
  while(suggestionsUl.firstChild) {
    suggestionsUl.removeChild(suggestionsUl.firstChild);
  }
}
