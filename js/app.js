(function () {

function updateBoxDimension() {
  var $container = $('.container');
  if ($(window).height() > 650) {
    var containerTop = ($(window).height()) / 2 - ($container.height() / 2);
    $container.css({marginTop: containerTop});
  }
  var containerLeft = (($(window).width()) - ($container.width())) / 2;
  $container.css({marginLeft: containerLeft});
}

$(updateBoxDimension);

$(document).ready(function() {
  $(updateBoxDimension);
  $(window).on('resize', updateBoxDimension);  
});

var lat;
var long;
var tempAct;
var humedad;
var viento;
var ciudad;
var clima;
var d = new Date();
var mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
var sem = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
var dia = [];
var tempM = [];
var tempL = [];
var code = [];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,basicPosition);
} else {
    console.log("Este explorador no soporta geolocalizacion");
    lat = -34.5977063;
    long = -58.4344687;
    iniciar(lat, long);
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  iniciar(lat, long);
  console.log("salio bien")
}

function basicPosition() {
  lat = -34.5977063;
  long = -58.4344687;
  iniciar(lat, long);
  console.log("no se pudo")
}

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
  $("#dia1").text(dia[1]);
  $("#dia2").text(dia[2]);
  $("#dia3").text(dia[3]);
  $("#dia4").text(dia[4]);
  $("#dia5").text(dia[5]);
  $("#tempM1").text(tempM[1] + "°");
  $("#tempM2").text(tempM[2] + "°");
  $("#tempM3").text(tempM[3] + "°");
  $("#tempM4").text(tempM[4] + "°");
  $("#tempM5").text(tempM[5] + "°");
  $("#tempL1").text(tempL[1] + "°");
  $("#tempL2").text(tempL[2] + "°");
  $("#tempL3").text(tempL[3] + "°");
  $("#tempL4").text(tempL[4] + "°");
  $("#tempL5").text(tempL[5] + "°");
  $("#logo1").addClass("wi wi-yahoo-" + code[1]);
  $("#logo2").addClass("wi wi-yahoo-" + code[2]);
  $("#logo3").addClass("wi wi-yahoo-" + code[3]);
  $("#logo4").addClass("wi wi-yahoo-" + code[4]);
  $("#logo5").addClass("wi wi-yahoo-" + code[5]);
  $("#viento").text(viento);
  $("#humedad").text(humedad);
  $("#max-act").text(tempM[0] + "°");
  $("#min-act").text(tempL[0] + "°");
  $("#temp-act").text(tempAct + "°");
  $("#ciudad").text(ciudad);

};

function darColor () {
    for (var i = 1; i <= 5; i++) {
      if (code[i] == 19 || code[i] == 31 || code[i] ==  32 || code[i] ==  33 || code[i] ==  34 || code[i] ==  36 || code[i] ==  44) {
          $("#dia" + i).addClass("naranja");
          $("#tempM" + i).addClass("naranja");
          $("#tempL" + i).addClass("naranja");
          $("#logo" + i).addClass(" naranja");
      } else if (code[i] == 0 || code[i] == 2 || code[i]  == 13 || code[i] == 14 || code[i] == 15 || code[i] == 16 || code[i] == 20 || code[i] == 21 || code[i] == 22 || code[i] == 23 || code[i] == 24 || code[i] == 26 || code[i] == 27 || code[i] == 28 || code[i] == 29 || code[i] == 30 ) {
          $("#dia" + i).addClass("gris");
          $("#tempM" + i).addClass("gris");
          $("#tempL" + i).addClass("gris");
          $("#logo" + i).addClass(" gris");
      } else {
          $("#dia" + i).addClass("azul");
          $("#tempM" + i).addClass("azul");
          $("#tempL" + i).addClass("azul");
          $("#logo" + i).addClass(" azul");
      }
    }
    if (clima == 19 || clima == 31 || clima ==  32 || clima ==  33 || clima ==  34 || clima ==  36 || clima ==  44) {
          $("#ciudad").addClass("naranja");
          $("#actualidad").addClass("naranja");
      } else if (clima == 0 || clima == 2 || clima  == 13 || clima == 14 || clima == 15 || clima == 16 || clima == 20 || clima == 21 || clima == 22 || clima == 23 || clima == 24 || clima == 26 || clima == 27 || clima == 28 || clima == 29 || clima == 30 ) {
          $("#ciudad").addClass("gris");
          $("#actualidad").addClass("gris");
      } else {
          $("#ciudad").addClass("azul");
          $("#actualidad").addClass("azul");
      }
};

function conseguirFecha () {
  $("#actual").text(sem[d.getDay()] + " | " + mes[d.getMonth()] + " " + d.getDate() + " | " + d.getHours() + ":" + d.getMinutes());
};

function iniciar (lat, long) {
  $.ajax({url:'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22(' + lat + '%2C' + long + ')%22)%20and%20u=%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', success: function(json_weather){
  		 var datos = json_weather.query.results.channel.item;
  	    viento = Math.floor(json_weather.query.results.channel.wind.speed - 10);
  	    humedad = json_weather.query.results.channel.atmosphere.humidity;
  	    ciudad = json_weather.query.results.channel.location.city;
  	    clima = datos.condition.code;
  	    tempAct = datos.condition.temp;
  	    for (var i = 0; i <= 5; i++) {
  	        dia[i] = datos.forecast[i].day;
  	        tempM[i] = datos.forecast[i].high;
  	        tempL[i] = datos.forecast[i].low;
  	        code[i] = datos.forecast[i].code;
  	    }
  	    cambiarDias();
   		  escribirDatos();
    		conseguirFecha();
    		darColor(); 
        $("#myNav").height(0);
  	}
  });
}
})();