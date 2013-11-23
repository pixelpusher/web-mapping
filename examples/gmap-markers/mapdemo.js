/**
 * Google Map functionality
 * by Evan Raskob <evan@flkr.com>
 * http://pixelist.info
 *
 */


var locations = [    
	{
		"title": "Tate Modern",
		"subtitle": "London's greatest visitor attraction",
		"lat": "51.50748705717662",
		"lng": "-0.09952068328857422"
	},
	{
		"title": "Goldsmiths",
		"subtitle": "Another premier place of learning",
		"lat": "51.4730441",
		"lng": "-0.0326718",
	},
	{
		"title": "British Museum",
		"subtitle": "Home to incredible cultural treasures",
		"lat": "51.5186498",
		"lng": "-0.1264136"
	},
	{
		"title": "V&A Museum",
		"subtitle": "A strong design focus here",
		"lat": "51.5028273",
		"lng": "-0.0720073"
	},
	{
		"title": "Design Museum",
		"subtitle": "On the banks of the River Thames",
		"lat": "51.5299388",
		"lng": "-0.1276409"
	},
	{
		"title": "British Library",
		"subtitle": "London's greatest reference library",
		"lat": "51.5299388",
		"lng": "-0.1276409"
	},
	{
		"title": "Ravensbourne",
		"subtitle": "Centre of the digital universe",
		"lat": "51.50142324743367",
		"lng": "0.005536079406738281"
	}
];


var markers = [];

/*
// possible map events
var events = {
	'bounds_changed': 'fired when the viewport bounds have changed.',
	'center_changed': 'fired when the map center property changes.',
	'click': 'fired when the user clicks on the map (but not when they click on a marker or infowindow).',
	'dblclick': 'fired when the user double-clicks on the map. Note that the click event will also fire, right before this one.',
	'drag': 'repeatedly fired while the user drags the map.',
	'dragend': 'fired when the user stops dragging the map.',
	'dragstart': 'fired when the user starts dragging the map.',
	'heading_changed': 'fired when the map heading property changes.',
	'idle': 'fired when the map becomes idle after panning or zooming.',
	'maptypeid_changed': 'fired when the mapTypeId property changes.',
	'mousemove': 'fired whenever the user\'s mouse moves over the map container.',
	'mouseout': 'fired when the user\'s mouse exits the map container.',
	'mouseover': 'fired when the user\'s mouse enters the map container.',
	'projection_changed': 'fired when the projection has changed.',
	'resize': 'Developers should trigger this event on the map when the div changes size: google.maps.event.trigger(map, \'resize\') .',
	'rightclick': 'fired when the DOM contextmenu event is fired on the map container.',
	'tilesloaded': 'fired when the visible tiles have finished loading.',
	'tilt_changed': 'fired when the map tilt property changes.',
	'zoom_changed': 'fired when the map zoom property changes.'
};
*/

function showMap(state) 
{
	// TODO - USE TWEENS to fade in/out

	var mapDiv = document.getElementById('map-canvas');

	if (state === true)
	{		
		mapDiv.style.visibility = "visible";
		document.getElementById('map-button-layer').style.visibility = "visible";
		mapDiv.focus();
	}
	else
	{
		mapDiv.style.visibility = "hidden";		
		document.getElementById('map-button-layer').style.visibility = "hidden";
	}
}

//
// Make a marker (e.g. a pin) on a map object using location data (see above)
// 
function makeMarker(map, location) 
{
	var markerOptions = {map: map, position: new google.maps.LatLng(location.lat, location.lng), title:location.title};
	var marker = new google.maps.Marker(markerOptions);
  
	google.maps.event.addListener(marker, 'click', function() 
	{
		var infowindow = new google.maps.InfoWindow({ content: "<strong>"+location.title +"</strong><p>"+ location.subtitle+"</p>"});
		infowindow.open(map,marker);
	});

	markers.push(marker);
}


function centerMap() 
{
	map.setCenter(markers[markers.length-1].getPosition());
}


function initializeMap() 
{
	console.log("loading map");

	var mapDiv = document.getElementById('map-canvas');
	var map = new google.maps.Map(mapDiv, {
	  center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
	  zoom: 12,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	for (var i = locations.length; i--;) {
		makeMarker(map, locations[i]);
	}

	/* 
	for (eventName in events) {
	  setupListener(map, eventName);
	} 
	*/
	showMap(true);
}

//
// set map to load at start
//
window.addEventListener('load', initializeMap);


