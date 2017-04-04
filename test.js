
var xhr = new XMLHttpRequest();
xhr.open("GET", , false);
xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);

var Httpreq = new XMLHttpRequest();
Httpreq.open("GET", "https://localhost:8080",false);
Httpreq.send(null);
console.log(Httpreq.responseText);