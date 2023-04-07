var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    lightmap: lightmap
  };
  

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    bikeStations: bikeStations
  };

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  let bikeMarkers = [];
  // Loop through the stations array.
  for (station of stations) {
    // For each station, create a marker, and bind a popup with the station's name.
    var newMarker = L.marker([station.lat,station.lon]).bindPopup("<h1>" + station.name + "</h1>");
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(newMarker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);