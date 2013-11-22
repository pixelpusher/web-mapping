
  var map = L.map('leaflet').setView([51.5002981,0.0035886], 14);
  
  var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg');
  var watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg');

  map.addLayer(watercolor);

  window.markers = L.layerGroup().addTo(map)
  
  var clue1 = [51.5002981,0.0035886]
 
  var clue1marker = L.marker([51.5002981,0.0035886]);
 
  var clue1Cold = L.circle(clue1,200);
  
  var clue1Warm = L.circle(clue1,100,{fillColor:"#ffea00", color:"#ffea00"});
  
  var clue1Warmer = L.circle(clue1,50,{fillColor:"#FA7832", color:"#FA7832"});

  var clue1Hot = L.circle(clue1,5,{fillColor:"#ff0000", color:"#ff0000"});

  window.markers.addLayer(clue1marker);
  
   window.markers.addLayer(clue1Cold);
  
   window.markers.addLayer(clue1Warm);

   window.markers.addLayer(clue1Warmer);
  
   window.markers.addLayer(clue1Hot);
  

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

    L.marker(latlng).addTo(map);
    
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
  
  
  // change marker icon 
  
  var greenIcon = L.icon({
    iconUrl: '../images/marker.png',
    shadowUrl: '../images/marker-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

