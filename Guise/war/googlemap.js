var tableid = 260197;
var map;

function initialize(){

  var mapProp = {
    center: new google.maps.LatLng(59.658742,21.920850),
    zoom:7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
  Tallinn = new google.maps.LatLng(59.4339, 24.7549);
  marker = new google.maps.Marker({
      position: Tallinn,
      map: map
  });
  google.maps.event.addListener(marker, 'click', function() {
	  juhtPiirkond("Harjumaa",marker,"");
  });
  
  iconFile = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  marker.setIcon(iconFile);
  
  Tartu = new google.maps.LatLng(58.3706, 26.7157);
  marker2 = new google.maps.Marker({
      position: Tartu,
      map: map
  });
  google.maps.event.addListener(marker2, 'click', function() {
	  juhtPiirkond("Tartumaa",marker2,"");
  });
  
  
  Valga = new google.maps.LatLng(57.7833, 26.0500);
  marker3 = new google.maps.Marker({
      position: Valga,
      map: map
  		});
  google.maps.event.addListener(marker3, 'click', function() {
	  juhtPiirkond("Valgamaa",marker3,"");
  });
  
  Kuressaare = new google.maps.LatLng(58.2564, 22.4989);
  marker4 = new google.maps.Marker({
      position: Kuressaare,
      map: map
  		});
  google.maps.event.addListener(marker4, 'click', function() {
	  juhtPiirkond("Saaremaa",marker4,"");
  });
  
  
  Parnu = new google.maps.LatLng(58.3847, 24.5186);
  marker5 = new google.maps.Marker({
      position: Parnu,
      map: map
  		});
  google.maps.event.addListener(marker5, 'click', function() {
	  juhtPiirkond("P‰rnumaa",marker5,"");
  });
  
  Jogeva = new google.maps.LatLng(58.7461, 26.3971);
  marker6 = new google.maps.Marker({
      position: Jogeva,
      map: map
  		});
  google.maps.event.addListener(marker6, 'click', function() {
	  juhtPiirkond("Jıgevamaa",marker6,"");
  });
  
  Rakvere = new google.maps.LatLng(59.3484, 26.3624);
  marker7 = new google.maps.Marker({
      position: Rakvere,
      map: map
  		});
  google.maps.event.addListener(marker7, 'click', function() {
	  juhtPiirkond("L‰‰ne-Virumaa",marker7,"");
  });
  
  Voru = new google.maps.LatLng(57.8450, 27.0038);
  marker8 = new google.maps.Marker({
      position: Voru,
      map: map
  		});
  google.maps.event.addListener(marker8, 'click', function() {
	  juhtPiirkond("Vırumaa",marker8,"");
  });
  
  Polva = new google.maps.LatLng(58.0531, 27.0517);
  marker9 = new google.maps.Marker({
      position: Polva,
      map: map
  		});
  google.maps.event.addListener(marker9, 'click', function() {
	  juhtPiirkond("Pılvamaa",marker9,"");
  });

  Viljandi = new google.maps.LatLng(58.3658, 25.5981);
  marker10 = new google.maps.Marker({
      position: Viljandi,
      map: map
  		});
  google.maps.event.addListener(marker10, 'click', function() {
	  juhtPiirkond("Viljandimaa",marker10,"");
  });
 
  
  Haapsalu = new google.maps.LatLng(58.9500, 23.5000);
  marker11 = new google.maps.Marker({
      position: Haapsalu,
      map: map
  		});
  google.maps.event.addListener(marker11, 'click', function() {
	  juhtPiirkond("L‰‰nemaa",marker11,"");
  });
  
  Rapla = new google.maps.LatLng(59.0000, 24.8000);
  marker12 = new google.maps.Marker({
      position: Rapla,
      map: map
  		});
  google.maps.event.addListener(marker12, 'click', function() {
	  juhtPiirkond("Raplamaa",marker12,"");
  });
  
  Paide = new google.maps.LatLng(58.8500, 25.5572);
  marker13 = new google.maps.Marker({
      position: Paide,
      map: map
  		});
  google.maps.event.addListener(marker13, 'click', function() {
	  juhtPiirkond("J‰rvamaa",marker13,"");
  });
  
  Johvi = new google.maps.LatLng(59.3596, 27.4167);
  marker14 = new google.maps.Marker({
      position: Johvi,
      map: map
  		});
  google.maps.event.addListener(marker14, 'click', function() {
	  juhtPiirkond("Ida-Virumaa",marker14,"");
  });

  
  Kardla = new google.maps.LatLng(58.99056, 22.74056);
  marker15 = new google.maps.Marker({
      position: Kardla,
      map: map
  		});
  google.maps.event.addListener(marker15, 'click', function() {
	  juhtPiirkond("Hiiumaa",marker15,"");
  });
  
  juhtPiirkond("Harjumaa",marker,"varv");
  juhtPiirkond("Tartumaa",marker2,"varv");
  juhtPiirkond("Valgamaa",marker3,"varv");
  juhtPiirkond("Saaremaa",marker4,"varv");
  juhtPiirkond("P‰rnumaa",marker5,"varv");
  juhtPiirkond("Jıgevamaa",marker6,"varv");
  juhtPiirkond("L‰‰ne-Virumaa",marker7,"varv");
  juhtPiirkond("Vırumaa",marker8,"varv");
  juhtPiirkond("Pılvamaa",marker9,"varv");
  juhtPiirkond("Viljandimaa",marker10,"varv");
  juhtPiirkond("L‰‰nemaa",marker11,"varv");
  juhtPiirkond("Raplamaa",marker12,"varv");
  juhtPiirkond("J‰rvamaa",marker13,"varv");
  juhtPiirkond("Ida-Virumaa",marker14,"varv");
  juhtPiirkond("Hiiumaa",marker15,"varv");
 	
	  // Initialize the layer
	  var layer = new google.maps.FusionTablesLayer(tableid);
	  layer.setMap(map);
	  
	  // Create the legend and display on the map
	  var legendDiv = document.createElement('DIV');
	  var legend = new Legend(legendDiv, map);
	  legendDiv.index = 1;
	  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);

	  
	  
}

function Legend(controlDiv, map) {
	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map
	  controlDiv.style.padding = '5px';

	  // Set CSS for the control border
	  var controlUI = document.createElement('DIV');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '1px';
	  controlUI.title = 'Legend';
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control text
	  var controlText = document.createElement('DIV');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  
	  // Add the text
	  controlText.innerHTML = '<b>Erakonnad</b><br />' +
	  	'<img src="http://maps.google.com/mapfiles/ms/micons/red-dot.png" /> Meeskond<br />' +
	  	'<img src="http://maps.google.com/mapfiles/ms/micons/yellow-dot.png" /> Partei<br />' +
	  	'<img src="http://maps.google.com/mapfiles/ms/micons/green-dot.png" /> Selts<br />' +
	  	'<img src="http://maps.google.com/mapfiles/ms/micons/blue-dot.png" /> Yhing<br />'+
	  	'<img src="http://maps.google.com/mapfiles/ms/micons/orange-dot.png" />-Puudub-<br />';
	  controlUI.appendChild(controlText);
	}

function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
function TestMarker() {
    CentralPark = new google.maps.LatLng(59, 21.4469157);
    addMarker(CentralPark);
 }