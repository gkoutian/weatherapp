  
var tempAct;
var dia = [];
var tempM = [];
var tempL = [];

var callbackFunction = function(data) {
	var datos = data.query.results.channel.item;
  	tempAct = datos.condition.temp;
  	for (var i = 0; i <= 5; i++) {
  		dia[i] = datos.forecast[i].day;
  		tempM[i] = datos.forecast[i].high;
  		tempL[i] = datos.forecast[i].low;
  	}
};

function cambiarDias () {
for (var i = 0; i <= 5; i++) {
  		var dias = dia[i];
  		switch (dias) {
  			case "Mon":
  				dia[i] = "Lunes";
  				break;
  			case "Tue":
  				dia[i] = "Martes";
  				break;
  			case "Wed":
  				dia[i] = "Miercoles";
  				break;
  			case "Thu":
  				dia[i] = "Jueves";
  				break;
  			case "Fri":
  				dia[i] = "Viernes";
  				break;
  			case "Sat":
  				dia[i] = "Sabado";
  				break;
  			case "Sun":
  				dia[i] = "Domingo";
  				break;
  		}
  	}
}

setTimeout(function () {
	cambiarDias();
  var parrafo = document.createElement("p");
  parrafo.innerHTML = "La temperatura de hoy " + dia[0] + " es de " + tempAct + "\nLa maxima es de " + tempM[0] + " y la minima es de " + tempL[0];
  for (var i = 1; i <= 5; i++) {
    parrafo.innerHTML += "\nLas temperaturas del " + dia[i] + " son maxima: " + tempM[i] + " y la minima es " + tempL[i];
  }
  var pre = document.createElement("pre");
  pre.appendChild(parrafo)
  document.body.appendChild(pre);
}, 2000);



