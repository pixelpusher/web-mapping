
  var map = L.map('leaflet').setView([51.505, -0.09], 15);
  
  var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg');
  var watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg');

  map.addLayer(watercolor);

  window.markers = L.layerGroup().addTo(map)

   map.on('click', function (evt) {
     console.log('click', evt)
     var marker = L.marker(evt.latlng)
     window.markers.addLayer(marker)
   })
   
  

