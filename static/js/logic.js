// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'mapbox/streets-v11',
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'mapbox/satellite-streets-v11',
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Satellite: satelliteStreets
};

let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [streets]
})
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "static/js/torontoRoutes.json";
// Accessing the airport GeoJSON URL
let airportData = "static/js/majorAirports.json"

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
};

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      style: myStyle
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3> Airline: " +feature.properties.airline + "</h3> <hr> <h3> Destination: "
          + feature.properties.dst + "</h3>");
      }
      .addTo(map),
});

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
};

// Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);