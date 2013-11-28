
  var map = L.map('leaflet').setView([51.5002981,0.0035886], 14);

// disables scrolling - will have to test usablility
map.touchZoom.disable();
map.scrollWheelZoom.disable();
// removes double click to zoom 	map.doubleClickZoom.disable();


  var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg');
  var watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg');

  map.addLayer(watercolor);
  
  // change marker icon 
  
var myIcon = L.icon({
    iconUrl: 'images/icon.png',
    iconRetinaUrl: 'images/icon@2x.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [10, 10],

});

// disables marker creation on click // window.markers = L.layerGroup().addTo(map) 
  
  var clue1 = [51.5002981,0.0035886]
 
  var clue1marker = L.marker([51.5002981,0.0035886]);
 
  var clue1Cold = L.circle(clue1,200);
  
  var clue1Warm = L.circle(clue1,100,{fillColor:"#ffea00", color:"#ffea00"});
  
  var clue1Warmer = L.circle(clue1,50,{fillColor:"#FA7832", color:"#FA7832"});

  var clue1Hot = L.circle(clue1,5,{fillColor:"#ff0000", color:"#ff0000"});

//	window.markers.addLayer(clue1marker);
  
//	window.markers.addLayer(clue1Cold);
  
//	window.markers.addLayer(clue1Warm);

//	window.markers.addLayer(clue1Warmer);
  
//	window.markers.addLayer(clue1Hot);
  

   map.on('click', function (evt) {
     console.log('click', evt)
     var marker = L.marker(evt.latlng)
     window.markers.addLayer(marker)
   })
   
   function goto(position){
    var latlng = [
      position.coords.latitude,
      position.coords.longitude
    ];

    L.marker(latlng , {icon: myIcon}).addTo(map);
    
    map.panTo(latlng);
    
    console.log("ohhh hey");
    
    var isCold = clue1Cold.getBounds().contains(latlng);
    
    var isWarm = clue1Warm.getBounds().contains(latlng);

    var isWarmer = clue1Warm.getBounds().contains(latlng);
    
    var isHot = clue1Hot.getBounds().contains(latlng);
    
    var mapContainer = $(".map")
    
    mapContainer.removeClass("hot warm warmer cold")
    
    console.log("is cold",isCold);
    
    if(isHot) { 
	    mapContainer.addClass("hot");
    }
    
    else if(isWarmer) {
	    mapContainer.addClass("warmer");
    }

    else if(isWarm) {
	    mapContainer.addClass("warm");
    }
    
    else if(isCold) { 
	    mapContainer.addClass("cold");
    }
    
    
    
  }

  navigator.geolocation.watchPosition(goto); 
  
  
