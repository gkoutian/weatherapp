  
var tempAct;
var dia = [];
var tempM = [];
var tempL = [];
var code = [];

var callbackFunction = function(data) {
	var datos = data.query.results.channel.item;
  console.log(datos);
  	tempAct = datos.condition.temp;
  	for (var i = 0; i <= 5; i++) {
  		dia[i] = datos.forecast[i].day;
  		tempM[i] = datos.forecast[i].high;
  		tempL[i] = datos.forecast[i].low;
      code[i] = datos.forecast[i].code;
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

function escribirDatos () {
  document.getElementById("dia1").innerHTML = dia[1];
  document.getElementById("dia2").innerHTML = dia[2];
  document.getElementById("dia3").innerHTML = dia[3];
  document.getElementById("dia4").innerHTML = dia[4];
  document.getElementById("dia5").innerHTML = dia[5];
  document.getElementById("tempM1").innerHTML = tempM[1] + "°";
  document.getElementById("tempM2").innerHTML = tempM[2] + "°";
  document.getElementById("tempM3").innerHTML = tempM[3] + "°";
  document.getElementById("tempM4").innerHTML = tempM[4] + "°";
  document.getElementById("tempM5").innerHTML = tempM[5] + "°";
  document.getElementById("tempL1").innerHTML = tempL[1] + "°";
  document.getElementById("tempL2").innerHTML = tempL[2] + "°";
  document.getElementById("tempL3").innerHTML = tempL[3] + "°";
  document.getElementById("tempL4").innerHTML = tempL[4] + "°";
  document.getElementById("tempL5").innerHTML = tempL[5] + "°";
  document.getElementById("logo1").className = "wi wi-yahoo-" + code[1];
  document.getElementById("logo2").className = "wi wi-yahoo-" + code[2];
  document.getElementById("logo3").className = "wi wi-yahoo-" + code[3];
  document.getElementById("logo4").className = "wi wi-yahoo-" + code[4];
  document.getElementById("logo5").className = "wi wi-yahoo-" + code[5];
};

function darColor () {
for (var i = 1; i <= 5; i++) {
  if (code[i] == 19 || code[i] == 31 || code[i] ==  32 || code[i] ==  33 || code[i] ==  34 || code[i] ==  36 || code[i] ==  44) {
      document.getElementById("dia" + i).className = "naranja";
      document.getElementById("tempM" + i).className = "naranja";
      document.getElementById("tempL" + i).className = "naranja";
      document.getElementById("logo" + i).className += " naranja";
  } else if (code[i] == 0 || code[i] == 2 || code[i]  == 13 || code[i] == 14 || code[i] == 15 || code[i] == 16 || code[i] == 20 || code[i] == 21 || code[i] == 22 || code[i] == 23 || code[i] == 24 || code[i] == 26 || code[i] == 27 || code[i] == 28 || code[i] == 29 || code[i] == 30 ) {
      document.getElementById("dia" + i).className = "gris";
      document.getElementById("tempM" + i).className = "gris";
      document.getElementById("tempL" + i).className = "gris";
      document.getElementById("logo" + i).className += " gris";
  } else {
      document.getElementById("dia" + i).className = "azul";
      document.getElementById("tempM" + i).className = "azul";
      document.getElementById("tempL" + i).className = "azul";
      document.getElementById("logo" + i).className += " azul";
  }
}
};

setTimeout(function () {
	cambiarDias();
  escribirDatos();
  darColor();
}, 2000);



