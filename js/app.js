var lat;
var long;
var tempAct;
var humedad;
var viento;
var ciudad;
var clima;
var d= new Date();
var mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
var sem = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
var dia = [];
var tempM = [];
var tempL = [];
var code = [];

navigator.geolocation.getCurrentPosition(showPosition)
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
}

setTimeout( function () {
  if (lat == undefined) {
     lat = "40.7141667";
    long = "-74.0063889"  
  }
  var script   = document.createElement("script");
  script.type  = "text/javascript";
  script.src   = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" + lat + "%2C" + long + ")%22)%20and%20u=%22c%22&format=json&callback=callbackFunction";
  document.body.appendChild(script);
}, 1000)




var callbackFunction = function(data) {
  setTimeout(function() {
    var datos = data.query.results.channel.item;
    viento = Math.floor(data.query.results.channel.wind.speed - 10);
    humedad = data.query.results.channel.atmosphere.humidity;
    ciudad = data.query.results.channel.location.city;
    clima = datos.condition.code;
    console.log(data);
      tempAct = datos.condition.temp;
      for (var i = 0; i <= 5; i++) {
        dia[i] = datos.forecast[i].day;
        tempM[i] = datos.forecast[i].high;
        tempL[i] = datos.forecast[i].low;
        code[i] = datos.forecast[i].code;
      }
    }, 500);
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
  document.getElementById("viento").innerHTML = viento;
  document.getElementById("humedad").innerHTML = humedad;
  document.getElementById("max-act").innerHTML = tempM[0] + "°";
  document.getElementById("min-act").innerHTML = tempL[0] + "°";
  document.getElementById("temp-act").innerHTML = tempAct + "°";
  document.getElementById("ciudad").innerHTML = ciudad;

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
    if (clima == 19 || clima == 31 || clima ==  32 || clima ==  33 || clima ==  34 || clima ==  36 || clima ==  44) {
          document.getElementById("ciudad").className = "naranja";
          document.getElementById("actualidad").className = "naranja";
      } else if (clima == 0 || clima == 2 || clima  == 13 || clima == 14 || clima == 15 || clima == 16 || clima == 20 || clima == 21 || clima == 22 || clima == 23 || clima == 24 || clima == 26 || clima == 27 || clima == 28 || clima == 29 || clima == 30 ) {
          document.getElementById("ciudad").className = "gris";
          document.getElementById("actualidad").className = "gris";
      } else {
          document.getElementById("ciudad").className = "azul";
          document.getElementById("actualidad").className = "azul";
      }
};

function conseguirFecha () {
  document.getElementById("actual").innerHTML = sem[d.getDay()] + " | " + mes[d.getMonth()] + " " + d.getDate() + " | " + d.getHours() + ":" + d.getMinutes();
};

setTimeout(function () {
     document.getElementById("myNav").style.height = "0%";
}, 3000);

setTimeout(function () {
	cambiarDias();
  escribirDatos();
  conseguirFecha();
  darColor();  
}, 2000);



