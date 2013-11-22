
  var map = L.map('leaflet').setView([51.30168,0.01542], 14);
  
  var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg');
  var watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg');

  map.addLayer(watercolor);

  window.markers = L.layerGroup().addTo(map)
  
  var clue1 = [51.30168,0.01542]


// was originally var clue1marker = L.marker([51.502098,0.005048]); 
//google maps station point +51°30'1.68", +0°0'15.42"

  var clue1marker = L.marker([51.30168,0.01542]);
 
  
 
  var clue1Cold = L.circle(clue1,500);
  
  var clue1Warm = L.circle(clue1,300,{fillColor:"#ffea00", color:"#ffea00"});
  
  var clue1Hot = L.circle(clue1,100,{fillColor:"#ff0000", color:"#ff0000"});

  // window.markers.addLayer(clue1marker);
  
  // window.markers.addLayer(clue1Cold);
  
  // window.markers.addLayer(clue1Warm);
  
  // window.markers.addLayer(clue1Hot);
  

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
    
    var isHot = clue1Hot.getBounds().contains(latlng);
    
    var mapContainer = $(".map")
    
    mapContainer.removeClass("hot warm cold")
    
    console.log("is cold",isCold);
    
    if(isHot) { 
	    mapContainer.addClass("hot");
    }
    
    else if(isWarm) {
	    mapContainer.addClass("warm");
    }
    
    else if(isCold) { 
	    mapContainer.addClass("cold");
    }
    
    
    
  }

  navigator.geolocation.watchPosition(goto); 
  
  
  

